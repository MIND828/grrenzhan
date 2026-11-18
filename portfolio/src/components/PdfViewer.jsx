import { useCallback, useEffect, useRef, useState } from "react";

const MAX_DPR = 2; // 限制清晰度，避免高分屏占用过多显存
const PRELOAD = "900px 0px"; // 预渲染前后各 900px 的页

/**
 * 基于 PDF.js 的跨设备 PDF 查看器。
 * 用 canvas 逐页渲染，替代 <iframe>——解决 iPad/平板浏览器 iframe 内
 * 原生 PDF 只显示第一页的问题。懒加载，不影响首屏。
 */
export default function PdfViewer({ url }) {
  const scrollRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [pageCount, setPageCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [renderErrors, setRenderErrors] = useState(0);

  const pdfRef = useRef(null);
  const metaRef = useRef([]); // 每页在 scale=1 下的 {w, h}
  const jobsRef = useRef(new Map()); // pageNum -> { task, el }

  // 加载文档 + 采集每页尺寸
  useEffect(() => {
    let cancelled = false;
    let doc = null;
    setStatus("loading");
    setErrorMsg("");
    setRenderErrors(0);

    (async () => {
      try {
        // 从 public/vendor/pdfjs 加载 pdf.js 的 legacy 构建（自带 Map.getOrInsertComputed
        // 等 polyfill，兼容旧浏览器）。用模板字符串拼 URL，避免被 Vite/Rollup 静态解析
        // 和打包——dev 与 prod 都直接使用原始文件，行为完全一致。
        const base = import.meta.env.BASE_URL || "/";
        const pdfjs = await import(/* @vite-ignore */ `${base}vendor/pdfjs/pdf.min.mjs`);
        pdfjs.GlobalWorkerOptions.workerSrc = `${base}vendor/pdfjs/pdf.worker.min.mjs`;

        // wasmUrl 指向部署了 openjpeg.wasm 等解码器的目录——PDF 里的 JPEG2000
        // （/JPXDecode）图片需要 OpenJPEG WASM 解码，不传此项 worker 拿不到解码
        // 器，图片会被静默跳过（页面上只剩底色空块）。
        const task = pdfjs.getDocument({ url, wasmUrl: `${base}vendor/pdfjs/` });
        doc = await task.promise;
        if (cancelled) {
          // dev StrictMode 下 effect 会双调用，PDF.js 可能对相同 URL 复用 doc，
          // 导致 destroy 被重复调用；加判断避免 "destroy is not a function"
          if (typeof doc.destroy === "function") {
            try { doc.destroy(); } catch {}
          }
          return;
        }
        pdfRef.current = doc;

        const meta = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const vp = page.getViewport({ scale: 1 });
          meta.push({ w: vp.width, h: vp.height });
        }
        if (cancelled) return;
        metaRef.current = meta;
        setPageCount(doc.numPages);
        setStatus("ready");
      } catch (e) {
        if (!cancelled) {
          console.error("PDF load failed:", e);
          setErrorMsg(e?.message || "PDF 加载失败");
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      jobsRef.current.forEach(({ task }) => {
        try {
          task.cancel();
        } catch {}
      });
      jobsRef.current.clear();
      if (doc && typeof doc.destroy === "function") {
        try { doc.destroy(); } catch {}
      }
      pdfRef.current = null;
    };
  }, [url]);

  // 把某一页渲染进对应占位容器
  const renderPage = useCallback(async (pageNum) => {
    const pdf = pdfRef.current;
    const meta = metaRef.current[pageNum - 1];
    const scroll = scrollRef.current;
    if (!pdf || !meta || !scroll) return;
    const el = scroll.querySelector(`[data-page="${pageNum}"]`);
    if (!el) return;

    const prev = jobsRef.current.get(pageNum);
    if (prev?.task) {
      try {
        prev.task.cancel();
      } catch {}
    }

    try {
      const page = await pdf.getPage(pageNum);
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cssW = el.clientWidth || 800;
      const scale = (cssW * dpr) / meta.w;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.display = "block";

      const ctx = canvas.getContext("2d");
      const renderTask = page.render({ canvasContext: ctx, viewport });
      jobsRef.current.set(pageNum, { task: renderTask, el });
      await renderTask.promise;

      el.innerHTML = "";
      el.appendChild(canvas);
    } catch (e) {
      // 取消渲染是正常的（切页/卸载），不计为错误
      if (e?.name === "RenderingCancelledException") return;
      console.error(`[PdfViewer] 第 ${pageNum} 页渲染失败:`, e);
      setRenderErrors((n) => n + 1);
    }
  }, []);

  // 监听占位元素进入视口即渲染；容器尺寸变化时重渲染已渲染页
  useEffect(() => {
    if (status !== "ready") return;
    const scroll = scrollRef.current;
    if (!scroll) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            renderPage(Number(e.target.dataset.page));
          }
        }
      },
      { root: scroll, rootMargin: PRELOAD, threshold: 0 }
    );
    scroll.querySelectorAll("[data-page]").forEach((el) => io.observe(el));

    let timer;
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        jobsRef.current.forEach((_, n) => renderPage(n));
      }, 200);
    });
    ro.observe(scroll);

    return () => {
      io.disconnect();
      ro.disconnect();
      clearTimeout(timer);
    };
  }, [status, pageCount, renderPage]);

  return (
    <div className="relative flex h-full w-full flex-col bg-[#e9e9ec]">
      {status === "loading" && (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-3 text-text-dim">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
            <span className="text-sm">正在加载 PDF…</span>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-sm text-text-dim">{errorMsg || "PDF 加载失败"}</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10"
          >
            在新标签页打开
          </a>
        </div>
      )}
      {renderErrors > 0 && status === "ready" && (
        <div className="absolute top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-red-500/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          部分页面渲染失败，可
          <a href={url} target="_blank" rel="noreferrer" className="ml-1 underline">
            在新标签页打开
          </a>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 sm:px-4"
      >
        <div className="mx-auto flex max-w-[920px] flex-col gap-4">
          {metaRef.current.map((m, i) => (
            <div
              key={i}
              data-page={i + 1}
              className="overflow-hidden rounded-sm bg-white shadow-md ring-1 ring-black/5"
              style={{ aspectRatio: `${m.w} / ${m.h}`, width: "100%" }}
            />
          ))}
        </div>
      </div>
      {status === "ready" && pageCount > 1 && (
        <div className="pointer-events-none absolute bottom-3 right-4 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/90">
          共 {pageCount} 页 · 上下滚动查看
        </div>
      )}
    </div>
  );
}

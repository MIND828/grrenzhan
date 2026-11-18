import { useEffect, useRef, useState } from "react";
import { projects } from "../data/content";
import ProfileCard from "./ProfileCard";
import { useMaskTitle, useStaggerChildren, useClipReveal } from "../hooks/useMotion";

export default function Projects() {
  const [activePdf, setActivePdf] = useState(null);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(4);

  const titleRef = useRef(null);
  const trackRef = useRef(null);
  useMaskTitle(titleRef);
  useStaggerChildren(trackRef, { y: 40, stagger: 0.1, start: "top 80%" });
  useClipReveal(trackRef, { selector: ".profile-card__tile", start: "top 88%", duration: 1.0 });

  // 响应式：每行可见卡片数量（桌面 4 / 平板 2 / 手机 1）
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisible(4);
      else if (w >= 768) setVisible(2);
      else setVisible(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, projects.length - visible);

  // 可见数量变化时，把当前索引夹到合法范围
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const go = (delta) =>
    setCurrent((c) => Math.max(0, Math.min(maxIndex, c + delta)));

  // 弹窗打开时锁定背景滚动，并支持 ESC 关闭
  useEffect(() => {
    if (!activePdf) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setActivePdf(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activePdf]);

  return (
    <section id="projects" className="relative py-28 md:py-36 border-t border-white/5">
      <div className="container-page">
        {/* 区块标题 */}
        <div ref={titleRef} className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <div data-title-eyebrow className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-accent tracking-widest">02 / WORKS</span>
              <span className="h-px w-12 bg-accent/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="title-mask">
                <span data-title-line className="block">
                  精选<span className="text-gradient">项目</span>
                </span>
              </span>
            </h2>
            <p data-title-sub className="mt-4 text-text-muted max-w-xl">
              以下为近年主导的代表性项目，覆盖 B 端后台、数据大屏、网页与 APP 设计等方向。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-text-dim font-mono">
              {String(projects.length).padStart(2, "0")} 个精选作品
            </div>
            {/* 左右切换 */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={current === 0}
                aria-label="上一组"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={current >= maxIndex}
                aria-label="下一组"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 项目卡片 - 轮播展示，每行 4 张（响应式降级 2 / 1） */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              data-stagger
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * (100 / visible)}%)` }}
            >
              {projects.map((p, idx) => (
                <div
                  key={p.name}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / visible}%` }}
                >
                  <ProfileCard
                    style={{ "--pc-width": "100%" }}
                    theme="dark"
                    radius={18}
                    holo={0.85}
                    glare={0.5}
                    tiltStrength={10}
                    parallax={8}
                    intro
                    backdropColor={p.accent}
                    name={p.name}
                    title={p.category}
                    handle={p.period}
                    status={p.modules[0]}
                    statusColor={p.accent}
                    contactText=""
                    action={
                      <button
                        type="button"
                        onClick={() => setActivePdf({ name: p.name, url: p.pdf || null })}
                        className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-ink-950 transition-transform duration-200 hover:scale-105 active:scale-95"
                        style={{ background: p.accent }}
                      >
                        查看详情
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </button>
                    }
                  >
                    {/* 项目视觉预览：优先使用真实项目图，无图时回退到渐变占位 */}
                    {p.image ? (
                      <>
                        <img
                          className="h-full w-full"
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          draggable={false}
                        />
                        {/* 序号水印 */}
                        <div className="absolute top-2 right-3 font-display font-bold text-5xl text-white/15 select-none pointer-events-none">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </>
                    ) : (
                      <div
                        className="relative h-full w-full"
                        style={{ background: p.gradient }}
                      >
                        <div className="absolute inset-0 p-4 flex flex-col">
                          {/* 浏览器顶栏 */}
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="w-2 h-2 rounded-full bg-white/40" />
                            <span className="w-2 h-2 rounded-full bg-white/25" />
                            <span className="w-2 h-2 rounded-full bg-white/15" />
                          </div>
                          {/* 界面主体：左侧导航 + 右侧内容 */}
                          <div className="flex-1 flex gap-2">
                            <div className="w-1/3 space-y-1.5">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="h-3 rounded bg-white/20"
                                  style={{ opacity: 1 - i * 0.15 }}
                                />
                              ))}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="grid grid-cols-3 gap-1.5">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="h-10 rounded bg-white/15 flex flex-col justify-end p-1"
                                  >
                                    <div
                                      className="w-1/2 h-1.5 rounded"
                                      style={{ background: "rgba(255,255,255,0.7)" }}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="flex-1 rounded bg-white/10 flex items-end p-1.5 gap-1">
                                {[45, 75, 40, 90, 60, 80, 55].map((h, i) => (
                                  <div
                                    key={i}
                                    className="flex-1 rounded-t"
                                    style={{
                                      height: `${h}%`,
                                      background: "rgba(255,255,255,0.55)",
                                      opacity: 0.5 + (i % 3) * 0.15,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 序号水印 */}
                        <div className="absolute top-2 right-3 font-display font-bold text-5xl text-white/10 select-none">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>
                    )}
                  </ProfileCard>
                </div>
              ))}
            </div>
          </div>

          {/* 分页指示 */}
          {maxIndex > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`第 ${i + 1} 组`}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PDF 预览弹窗 */}
      {activePdf && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActivePdf(null);
          }}
        >
          <div
            className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-ink-900 shadow-2xl ring-1 ring-white/10"
            style={{ height: "88vh" }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                  style={{ background: "rgba(232,118,44,0.18)", color: "#E8762C" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M9 13h6" />
                    <path d="M9 17h6" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{activePdf.name}</p>
                  <p className="text-xs text-text-dim">作品集 PDF 预览</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {activePdf.url && (
                  <a
                    href={activePdf.url}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="M7 10l5 5 5-5" />
                      <path d="M12 15V3" />
                    </svg>
                    下载
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActivePdf(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="关闭"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {activePdf.url ? (
              <iframe
                src={activePdf.url}
                title={`${activePdf.name} - PDF 预览`}
                className="flex-1 w-full bg-white"
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-text-dim">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M12 18v-6" />
                    <path d="M9 15h6" />
                  </svg>
                </span>
                <div>
                  <p className="text-base font-medium text-white">该项目详情 PDF 即将上传</p>
                  <p className="mt-1 text-sm text-text-dim">敬请期待，稍后可在此预览完整作品。</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

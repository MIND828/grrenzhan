import { useEffect } from "react";

// 所有「待入场」元素的选择器：普通 .reveal + GSAP 接管的标题 / stagger 子元素
const HIDDEN_SELECTOR =
  '.reveal, [data-title-line], [data-title-eyebrow], [data-title-sub], [data-stagger] > *';

const prefersReduced = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * 1) 减少动效用户：立刻显示全部内容。
 * 2) 普通 .reveal 且未被 GSAP 接管的元素：用 IntersectionObserver 做 CSS 过渡显现（兜底 / 兼容）。
 * 3) 安全网：任何进入视口超过 STUCK_MS 仍接近不可见的元素，强制显示，
 *    防止 GSAP / observer 因布局、水平位移等漏触发而永久空白。阈值大于所有动画时长，
 *    因此不会打断正在进行的 opening / stagger。
 */
export default function useReveal() {
  useEffect(() => {
    if (prefersReduced()) {
      document.querySelectorAll(HIDDEN_SELECTOR).forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const STUCK_MS = 3500;
    const enteredAt = new WeakMap();

    const inViewport = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0 && r.width > 0 && r.height > 0;
    };
    const isHidden = (el) => {
      const o = parseFloat(window.getComputedStyle(el).opacity);
      return Number.isFinite(o) && o < 0.1;
    };
    const forceShow = (el) => {
      el.classList.add("is-visible");
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    // 普通 reveal（GSAP 未接管）走 IntersectionObserver
    const plain = Array.from(document.querySelectorAll(".reveal")).filter(
      (el) => !el.classList.contains("gsap-driven")
    );

    let io = null;
    if ("IntersectionObserver" in window) {
      const reveal = (el) => {
        if (el.classList.contains("is-visible")) return;
        const delay = Number(el.dataset.delay) || 0;
        window.setTimeout(() => el.classList.add("is-visible"), delay);
      };
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -40px 0px" }
      );
      plain.forEach((el) => io.observe(el));
    } else {
      plain.forEach((el) => el.classList.add("is-visible"));
    }

    // 安全网：进入视口超过 STUCK_MS 仍隐藏 → 强制显示
    const sweep = () => {
      const now = Date.now();
      document.querySelectorAll(HIDDEN_SELECTOR).forEach((el) => {
        if (!inViewport(el)) {
          enteredAt.delete(el);
          return;
        }
        if (!enteredAt.has(el)) enteredAt.set(el, now);
        if (now - enteredAt.get(el) > STUCK_MS && isHidden(el)) {
          forceShow(el);
          enteredAt.delete(el);
        }
      });
    };
    // 高频事件（scroll/resize）会触发 getBoundingClientRect / getComputedStyle，
    // 用 rAF 合并到每帧最多一次，避免滚动时强制同步布局造成卡顿
    let queued = false;
    const scheduleSweep = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        sweep();
      });
    };
    const interval = window.setInterval(sweep, 600);
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep);
    const first = window.setTimeout(sweep, 1000);

    return () => {
      if (io) io.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(first);
      window.removeEventListener("scroll", scheduleSweep);
      window.removeEventListener("resize", scheduleSweep);
    };
  }, []);
}

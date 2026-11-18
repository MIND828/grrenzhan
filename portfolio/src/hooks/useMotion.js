import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "./useReducedMotion";

let registered = false;
function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

const EASE = "power3.out";

/**
 * Hero 首屏完整 opening 时间线。
 * 三行标题从交替的垂直方向错位移入 + 微倾归位（无水平位移），随后徽章 / 段落 /
 * 按钮 / 统计 / 右侧视觉卡片 / 滚动指示依次缓入。整体节奏慢、缓动丝滑。
 *
 * refs 结构：
 *   { badge, lines: [ref, ref, ref], paragraph, buttons, stats, visual, visualImg, scroll }
 * lines 中的 ref 指向遮罩（overflow-hidden）内部的文本 span。
 */
export function useHeroOpening(refs) {
  const reduced = useReducedMotion();

  useGSAP(() => {
    const { gsap } = ensureGsap();
    const all = [
      refs.badge?.current,
      ...(refs.lines || []).map((r) => r?.current),
      refs.paragraph?.current,
      refs.buttons?.current,
      refs.stats?.current,
      refs.visual?.current,
      refs.visualImg?.current,
      refs.scroll?.current,
    ].filter(Boolean);
    all.forEach((el) => el.classList.add("gsap-driven", "will-transform"));

    if (reduced) {
      gsap.set(all, {
        opacity: 1,
        x: 0,
        y: 0,
        yPercent: 0,
        rotate: 0,
        scale: 1,
        clipPath: "inset(0% 0 0 0)",
        clearProps: "transform",
      });
      all.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    all.forEach((el) => el.classList.add("is-visible"));
    const tl = gsap.timeline({
      defaults: { ease: EASE },
      delay: 0.15,
      onComplete: () => gsap.set(all, { clearProps: "transform" }),
    });

    // 右侧视觉卡片：先于文字开始做 clip 揭开 + 轻微缩放归位，与标题并行
    const visual = refs.visual?.current;
    const visualImg = refs.visualImg?.current;
    if (visualImg) {
      gsap.set(visualImg, { clipPath: "inset(100% 0 0 0)", scale: 1.08, opacity: 0 });
      tl.to(
        visualImg,
        { clipPath: "inset(0% 0 0 0)", scale: 1, opacity: 1, duration: 1.4, ease: EASE },
        0.1
      );
    }
    if (visual) {
      gsap.set(visual, { opacity: 0, y: 36 });
      tl.to(visual, { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.2);
    }

    // 三行标题：交替从下方 / 上方错位移入，带微小倾斜后归位
    (refs.lines || []).forEach((lineRef, i) => {
      const line = lineRef?.current;
      if (!line) return;
      const from = i % 2 === 0 ? 118 : -118; // 下 / 上 / 下
      const rot = i % 2 === 0 ? -2.2 : 2.2;
      gsap.set(line, { yPercent: from, opacity: 0, rotate: rot });
      tl.to(
        line,
        { yPercent: 0, opacity: 1, rotate: 0, duration: 1.15, ease: EASE },
        i === 0 ? 0.25 : "-=0.86"
      );
    });

    // 徽章
    if (refs.badge?.current) {
      tl.fromTo(
        refs.badge.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.85, ease: EASE },
        0.3
      );
    }
    // 段落
    if (refs.paragraph?.current) {
      tl.fromTo(
        refs.paragraph.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: EASE },
        "-=0.6"
      );
    }
    // 按钮
    if (refs.buttons?.current) {
      tl.fromTo(
        refs.buttons.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: EASE },
        "-=0.65"
      );
    }
    // 统计数据：逐列 stagger
    if (refs.stats?.current) {
      const cells = Array.from(refs.stats.current.children);
      if (cells.length) {
        gsap.set(cells, { opacity: 0, y: 24 });
        tl.to(
          cells,
          { opacity: 1, y: 0, duration: 0.75, ease: EASE, stagger: 0.1 },
          "-=0.5"
        );
      }
    }
    // 底部滚动指示
    if (refs.scroll?.current) {
      tl.fromTo(
        refs.scroll.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: EASE },
        "-=0.3"
      );
    }
  }, [reduced]);
}

/**
 * 区块标题：eyebrow 滑入 + 多行标题遮罩揭示 stagger + 副标题缓入。
 * 容器内需标记：[data-title-eyebrow]、[data-title-line]（每行一个，置于 overflow-hidden 内）、
 * [data-title-sub]（可选）。
 */
export function useMaskTitle(containerRef, options = {}) {
  const reduced = useReducedMotion();
  const { start = "top 82%" } = options;

  useGSAP(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const root = containerRef.current;
    if (!root) return;

    const eyebrow = root.querySelector("[data-title-eyebrow]");
    const lines = Array.from(root.querySelectorAll("[data-title-line]"));
    const sub = root.querySelector("[data-title-sub]");
    const all = [eyebrow, ...lines, sub].filter(Boolean);
    all.forEach((el) => el.classList.add("gsap-driven", "will-transform"));

    if (reduced) {
      gsap.set(all, {
        opacity: 1,
        x: 0,
        y: 0,
        yPercent: 0,
        rotate: 0,
        clearProps: "transform",
      });
      all.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (eyebrow) gsap.set(eyebrow, { opacity: 0, x: -22 });
    lines.forEach((l) => gsap.set(l, { yPercent: 112, opacity: 0 }));
    if (sub) gsap.set(sub, { opacity: 0, y: 20 });
    all.forEach((el) => el.classList.add("is-visible"));

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: root, start, once: true },
      onComplete: () => gsap.set(all, { clearProps: "transform" }),
    });
    if (eyebrow) tl.to(eyebrow, { opacity: 1, x: 0, duration: 0.8 });
    if (lines.length) {
      tl.to(
        lines,
        { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.12 },
        eyebrow ? "-=0.55" : 0
      );
    }
    if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
  }, [reduced, start]);
}

/**
 * 卡片 / 子元素批量 stagger 入场。
 * selector 为空时取容器的直接子元素。
 */
export function useStaggerChildren(containerRef, options = {}) {
  const reduced = useReducedMotion();
  const {
    selector,
    y = 40,
    stagger = 0.09,
    duration = 0.8,
    start = "top 82%",
  } = options;

  useGSAP(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const root = containerRef.current;
    if (!root) return;
    const kids = selector
      ? Array.from(root.querySelectorAll(selector))
      : Array.from(root.children);
    if (!kids.length) return;
    kids.forEach((k) => k.classList.add("gsap-driven", "will-transform"));

    if (reduced) {
      gsap.set(kids, { opacity: 1, y: 0, clearProps: "transform" });
      kids.forEach((k) => k.classList.add("is-visible"));
      return;
    }

    gsap.set(kids, { opacity: 0, y });
    kids.forEach((k) => k.classList.add("is-visible"));
    gsap.to(kids, {
      opacity: 1,
      y: 0,
      duration,
      ease: EASE,
      stagger,
      scrollTrigger: { trigger: root, start, once: true },
      onComplete: () => gsap.set(kids, { clearProps: "transform" }),
    });
  }, [reduced, selector, y, stagger, duration, start]);
}

/** 单个元素滚动进入时的淡入上移。 */
export function useScrollReveal(ref, options = {}) {
  const reduced = useReducedMotion();
  const { y = 32, duration = 0.9, start = "top 85%", delay = 0 } = options;

  useGSAP(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const el = ref.current;
    if (!el) return;
    el.classList.add("gsap-driven", "will-transform");

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      el.classList.add("is-visible");
      return;
    }
    gsap.set(el, { opacity: 0, y });
    el.classList.add("is-visible");
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: EASE,
      scrollTrigger: { trigger: el, start, once: true },
      onComplete: () => gsap.set(el, { clearProps: "transform" }),
    });
  }, [reduced, y, duration, start, delay]);
}

/** 轻微滚动视差（yPercent 随 scrub 变化），reduced-motion 下不执行。 */
export function useParallax(ref, options = {}) {
  const reduced = useReducedMotion();
  const { speed = 12, start = "top bottom", end = "bottom top" } = options;

  useGSAP(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const el = ref.current;
    if (!el || reduced) return;
    el.classList.add("will-transform");
    gsap.to(el, {
      yPercent: speed,
      ease: "none",
      scrollTrigger: { trigger: el, start, end, scrub: 0.8 },
    });
  }, [reduced, speed, start, end]);
}

/**
 * 批量 clip-path 揭示（从下往上揭开），用于图片 / 卡片视觉层入场。
 * 仅动画 clipPath，不触碰 transform，因此可与元素自身的倾斜 / 位移共存。
 */
export function useClipReveal(containerRef, options = {}) {
  const reduced = useReducedMotion();
  const { selector, start = "top 85%", duration = 1.0 } = options;

  useGSAP(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const root = containerRef.current;
    if (!root || !selector) return;
    const els = Array.from(root.querySelectorAll(selector));
    if (!els.length) return;
    els.forEach((e) => e.classList.add("will-transform"));

    if (reduced) {
      gsap.set(els, { clipPath: "inset(0 0 0 0)" });
      return;
    }
    gsap.set(els, { clipPath: "inset(0 0 100% 0)" });
    els.forEach((el) => {
      gsap.to(el, {
        clipPath: "inset(0 0 0 0)",
        duration,
        ease: EASE,
        scrollTrigger: { trigger: el, start, once: true },
      });
    });
  }, [reduced, selector, start, duration]);
}

/** 图片 / 字体加载后刷新 ScrollTrigger 位置，避免触发点偏移。 */
export function useScrollRefresh() {
  useGSAP(() => {
    const { ScrollTrigger } = ensureGsap();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 400);
    const t2 = window.setTimeout(refresh, 1200);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);
}

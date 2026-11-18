import { useRef } from "react";
import { profile } from "../data/content";
import ParticleBackground from "./ParticleBackground";
import Icon from "./Icon";
import FluidGlass from "./FluidGlass";
import { useHeroOpening, useParallax } from "../hooks/useMotion";
import "./FluidGlass.css";

export default function Hero() {
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const visualRef = useRef(null);
  const visualImgRef = useRef(null);
  const scrollRef = useRef(null);

  useHeroOpening({
    badge: badgeRef,
    lines: [line1Ref, line2Ref, line3Ref],
    paragraph: paragraphRef,
    buttons: buttonsRef,
    stats: statsRef,
    visual: visualRef,
    visualImg: visualImgRef,
    scroll: scrollRef,
  });
  // 右侧主视觉随滚动轻微视差
  useParallax(visualImgRef, { speed: 7, start: "top top", end: "bottom top" });

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden pt-20">
      {/* 粒子层：放最底层 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* 背景图片层：在粒子之上，低透明度提供氛围底图 */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <img
          src="/hero-bg.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-20"
        />
      </div>

      {/* 暗化遮罩层：保证文字可读，叠在背景图之上 */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/65 via-ink-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/30" />
      </div>

      {/* FluidGlass 玻璃折射层：覆盖整个头部，跟随鼠标 */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <FluidGlass
          text=""
          shape="blob"
          size={280}
          refraction={1}
          dispersion={0.35}
          interaction="follow"
        />
      </div>

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 左：文字内容 */}
          <div className="lg:col-span-7">
            {/* 顶部徽章 */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-3 mb-10 reveal gsap-driven"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/30 animate-ping" />
                <span className="relative text-[10px] font-bold text-accent">NEW</span>
              </span>
              <span className="text-sm text-text-muted">
                Available for freelance & full-time · {profile.location}
              </span>
            </div>

            {/* 衬线大标题：每行外层 overflow-hidden 做遮罩揭示，内层做位移+微倾归位 */}
            <h1 className="font-serif font-bold leading-[1.05] text-white">
              <span className="title-mask">
                <span
                  ref={line1Ref}
                  data-title-line
                  className="block text-[clamp(52px,7vw,104px)]"
                >
                  Designing
                </span>
              </span>
              <span className="title-mask">
                <span
                  ref={line2Ref}
                  data-title-line
                  className="block text-[clamp(52px,7vw,104px)] italic text-gradient"
                >
                  interfaces that
                </span>
              </span>
              <span className="title-mask">
                <span
                  ref={line3Ref}
                  data-title-line
                  className="block text-[clamp(52px,7vw,104px)]"
                >
                  actually work.
                </span>
              </span>
            </h1>

            {/* 段落 */}
            <p
              ref={paragraphRef}
              className="mt-8 max-w-xl text-base font-light text-text-muted leading-relaxed reveal gsap-driven"
            >
              {profile.summary}
            </p>

            {/* 双按钮 */}
            <div
              ref={buttonsRef}
              className="mt-10 flex flex-wrap items-center gap-6 reveal gsap-driven"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-accent text-ink-950 font-semibold text-sm hover:bg-accent-soft transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,118,44,0.35)]"
              >
                Explore
                <Icon
                  name="arrowUpRight"
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-2 text-sm text-white hover:text-accent transition-colors"
              >
                Hire me
                <Icon
                  name="arrowUpRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* 统计数据 */}
            <div
              ref={statsRef}
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg reveal gsap-driven"
            >
              {profile.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="font-serif font-bold text-4xl md:text-5xl text-white">
                    {s.value}
                    <span className="text-accent text-2xl">{s.suffix}</span>
                  </div>
                  <div className="mt-1 text-xs text-text-dim tracking-wide uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：视觉卡片 */}
          <div
            ref={visualRef}
            className="lg:col-span-5 relative reveal gsap-driven"
          >
            <div className="relative w-3/4 ml-auto">
              {/* 弥散彩色光晕：位于图片下方，提取宇航员图中的紫/蓝/粉色 */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-[130%] h-48 rounded-full blur-[70px] opacity-70 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(139,92,246,0.55) 0%, rgba(59,130,246,0.4) 35%, rgba(236,72,153,0.3) 65%, transparent 75%)",
                }}
              />
              {/* 主卡片：宇航员图片 */}
              <div className="relative rounded-[20px] overflow-hidden border-[6px] border-white bg-ink-800 shadow-2xl shadow-black/50">
                <img
                  ref={visualImgRef}
                  src="/hero-visual.webp"
                  alt="UI Design Preview"
                  className="w-full h-auto block object-cover will-transform"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部滚动指示 */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 reveal gsap-driven"
      >
        <span className="text-[10px] tracking-[0.3em] text-text-dim uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </section>
  );
}

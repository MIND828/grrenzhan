import { useRef } from "react";
import { profile, contacts } from "../data/content";
import Icon from "./Icon";
import Aurora from "./Aurora";
import { useMaskTitle, useStaggerChildren, useScrollReveal } from "../hooks/useMotion";

export default function Contact() {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  useMaskTitle(titleRef);
  useStaggerChildren(cardsRef, { y: 36, stagger: 0.1, start: "top 80%" });
  useScrollReveal(ctaRef, { y: 30, start: "top 88%" });

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden border-t border-white/5"
    >
      {/* 背景光晕 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(79,227,201,0.07),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(79,227,201,0.02)_50%)] bg-[length:100%_4px] opacity-30" />
      {/* 极光兜底渐变：与 Aurora 同色系，WebGL 不可用时仍保留彩色氛围 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_30%_100%,rgba(232,118,44,0.07),transparent_60%),radial-gradient(ellipse_55%_40%_at_70%_100%,rgba(124,90,160,0.06),transparent_60%)]" />

      {/* Aurora 极光背景（置于内容之下，不拦截交互） */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#4fe3c9", "#e8762c", "#7c5aa0"]}
          amplitude={1}
          blend={0.5}
          speed={1}
          height={0.48}
          scale={1}
          glow={0.5}
          brightness={0.6}
          layers={2}
          direction="bottom"
          mouseInteraction
          opacity={0.32}
        />
      </div>

      <div className="container-page relative z-10 pt-32 pb-12 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-[1400px]">
          {/* 区块标题 + 超大标题（遮罩揭示） */}
          <div ref={titleRef}>
            <div data-title-eyebrow className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-accent tracking-widest">04 / CONTACT</span>
              <span className="h-px w-12 bg-accent/40" />
            </div>
            <h2 className="font-display font-bold leading-[0.95] text-white">
              <span className="title-mask">
                <span data-title-line className="block text-[clamp(48px,7vw,110px)]">
                  有项目想聊？
                </span>
              </span>
              <span className="title-mask">
                <span
                  data-title-line
                  className="block text-[clamp(48px,7vw,110px)] text-gradient italic font-light"
                >
                  Let's make it
                </span>
              </span>
              <span className="title-mask">
                <span data-title-line className="block text-[clamp(48px,7vw,110px)]">
                  <span className="text-accent">real.</span>
                </span>
              </span>
            </h2>
            <p data-title-sub className="mt-8 text-lg text-text-muted max-w-2xl">
              无论是 B 端后台、数据看板还是产品视觉，欢迎随时联系。我会在 24 小时内回复你。
            </p>
          </div>

          {/* 联系方式 */}
          <div
            ref={cardsRef}
            data-stagger
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
          >
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group glass-card rounded-xl p-5 hover:border-accent/40 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-dim font-mono tracking-wider">{c.label}</span>
                  <Icon
                    name="arrowUpRight"
                    size={14}
                    className="text-text-dim group-hover:text-accent transition-colors"
                  />
                </div>
                <div className="text-white font-medium break-all">{c.value}</div>
              </a>
            ))}
          </div>

          {/* 主 CTA */}
          <div ref={ctaRef} className="reveal mt-12">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-ink-950 font-semibold text-base hover:bg-accent-soft transition-all duration-300 hover:shadow-[0_0_50px_rgba(79,227,201,0.4)]"
            >
              <Icon name="mail" size={18} />
              发送邮件
              <Icon
                name="arrowUpRight"
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      {/* 底部页脚 */}
      <footer className="relative z-10 border-t border-white/5 mt-16">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-accent">M.</span>
            <span className="text-sm text-text-dim">
              © {new Date().getFullYear()} {profile.name}. Designed & built with care.
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-text-dim font-mono">
            <span>UI · Visual · Web Designer</span>
            <span className="text-accent">●</span>
            <span>Ningbo</span>
          </div>
          <a
            href="#home"
            className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
          >
            Back to top
            <Icon name="arrowDown" size={14} className="rotate-180" />
          </a>
        </div>
      </footer>
    </section>
  );
}

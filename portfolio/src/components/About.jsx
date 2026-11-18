import { useRef } from "react";
import { profile, workExperience } from "../data/content";
import Icon from "./Icon";
import Lanyard from "./Lanyard";
import SideRays from "./SideRays";
import { useMaskTitle, useScrollReveal, useStaggerChildren } from "../hooks/useMotion";

export default function About() {
  const titleRef = useRef(null);
  const profileRef = useRef(null);
  const rightRef = useRef(null);
  const statsRef = useRef(null);

  useMaskTitle(titleRef);
  useScrollReveal(profileRef, { y: 44, start: "top 82%" });
  useStaggerChildren(rightRef, { y: 36, stagger: 0.14, start: "top 80%" });
  useStaggerChildren(statsRef, { y: 28, stagger: 0.09, start: "top 86%" });

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      {/* 背景光束层：铺满整个 About，置于内容之下 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SideRays
          rayColor1="#F5934A"
          rayColor2="#8B5CF6"
          origin="top-right"
          speed={2}
          intensity={1.4}
          spread={2.2}
          density={5}
          opacity={0.5}
          dust={0.2}
          followMouse={true}
        />
      </div>
      <div className="container-page relative z-10">
        {/* 区块标题 */}
        <div ref={titleRef} className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div data-title-eyebrow className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-accent tracking-widest">01 / ABOUT</span>
              <span className="h-px w-12 bg-accent/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="title-mask">
                <span data-title-line className="block">
                  你好，我是 <span className="text-gradient">{profile.name}</span>
                </span>
              </span>
            </h2>
          </div>
          <p data-title-sub className="text-sm text-text-dim font-mono">// 个人简介</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* 左：头像 + 基础信息卡片 */}
          <div ref={profileRef} className="lg:col-span-4 reveal">
            <div className="glass-card rounded-2xl p-6 sticky top-28">
              {/* 头像 */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 max-w-[88%] mx-auto">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <Lanyard
                    frontImage="/lanyard-portrait.webp"
                    size={0.8}
                    strapLength={0.05}
                    className="absolute inset-0"
                  />
                )}
                {/* 状态徽章 */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-950/80 backdrop-blur border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-white">离职 · 随时入职</span>
                </div>
              </div>

              {/* 基础信息 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-dim">姓名</span>
                  <span className="text-white">{profile.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-dim">年龄</span>
                  <span className="text-white">{profile.age} 岁</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-dim">城市</span>
                  <span className="text-white">{profile.location}</span>
                </div>
                <div className="hairline my-4" />
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors group"
                >
                  <Icon name="mail" size={16} />
                  <span className="truncate">{profile.email}</span>
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors group"
                >
                  <Icon name="phone" size={16} />
                  <span>{profile.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* 右：介绍 + 数据 + 经历 */}
          <div ref={rightRef} data-stagger className="lg:col-span-8 space-y-10">
            {/* 介绍 */}
            <div>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                {profile.summary}
              </p>
            </div>

            {/* 数据统计 */}
            <div ref={statsRef} data-stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.stats.map((s) => {
                // 长文本（如「工业制造」）缩小字号，与短数字卡片的视觉重量保持平衡；短数字维持原尺寸
                const compact = s.value.length > 2;
                return (
                  <div
                    key={s.label}
                    className="glass-card rounded-xl p-5 text-center hover:-translate-y-1"
                  >
                    <div
                      className={`font-display font-bold text-white mb-1 ${
                        compact ? "text-xl md:text-2xl" : "text-3xl md:text-4xl"
                      }`}
                    >
                      {s.value}
                      {s.suffix && (
                        <span className="text-accent text-xl">{s.suffix}</span>
                      )}
                    </div>
                    <div className="text-xs text-text-dim tracking-wide">{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* 工作经历 */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-1 h-5 bg-accent rounded-full" />
                工作经历
              </h3>
              <div className="relative pl-6 border-l border-white/10 space-y-8">
                {workExperience.map((exp) => (
                  <div key={exp.company} className="relative">
                    <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-ink-950 border-2 border-accent" />
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <h4 className="text-lg font-semibold text-white">{exp.company}</h4>
                      <span className="text-accent text-sm">{exp.role}</span>
                      <span className="text-xs text-text-dim font-mono ml-auto">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-text-muted leading-relaxed">
                          <Icon name="check" size={14} className="text-accent mt-1 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

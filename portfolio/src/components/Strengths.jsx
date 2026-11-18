import { useRef } from "react";
import { strengths, skills } from "../data/content";
import Icon from "./Icon";
import BorderGlow from "./BorderGlow";
import { useMaskTitle, useStaggerChildren, useScrollReveal } from "../hooks/useMotion";

export default function Strengths() {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const skillsRef = useRef(null);

  useMaskTitle(titleRef);
  useStaggerChildren(cardsRef, { y: 42, stagger: 0.1, start: "top 80%" });
  useScrollReveal(skillsRef, { y: 36, start: "top 85%" });

  return (
    <section id="strengths" className="relative py-28 md:py-36 border-t border-white/5">
      <div className="container-page">
        {/* 区块标题 */}
        <div ref={titleRef} className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div data-title-eyebrow className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-accent tracking-widest">03 / CAPABILITIES</span>
              <span className="h-px w-12 bg-accent/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="title-mask">
                <span data-title-line className="block">
                  个人<span className="text-gradient">优势</span>
                </span>
              </span>
            </h2>
            <p data-title-sub className="mt-4 text-text-muted max-w-xl">
              从视觉功底到 AI 全链路提效，覆盖设计产出到可运行演示的完整闭环。
            </p>
          </div>
        </div>

        {/* 优势卡片网格 - BorderGlow 边缘光晕 */}
        <div ref={cardsRef} data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {strengths.map((s, idx) => (
            <BorderGlow
              key={s.title}
              className="group hover:-translate-y-1.5 transition-transform duration-300"
              edgeSensitivity={25}
              glowColor="30 90 60"
              backgroundColor="#121017"
              borderRadius={16}
              glowRadius={32}
              glowIntensity={1.0}
              coneSpread={25}
              colors={['#E8762C', '#F59E0B', '#EC4899']}
            >
              <div className="relative p-7 overflow-hidden">
                {/* hover 光晕 */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 rounded-xl border border-accent/30 bg-accent/5 flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-ink-950 transition-all duration-300">
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2.5">{s.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
                <div className="mt-5 text-[11px] font-mono text-text-dim">
                  0{idx + 1} / 0{strengths.length}
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* 技能条带 */}
        <div ref={skillsRef} className="reveal mt-16 glass-card rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-mono text-accent tracking-wider mb-5">设计工具</h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.tools.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/[0.03] hover:border-accent/40 hover:text-accent transition-colors cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-mono text-accent tracking-wider mb-5">核心能力</h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.abilities.map((a) => (
                  <span
                    key={a}
                    className="px-4 py-2 rounded-lg border border-white/10 text-sm text-text-muted bg-white/[0.03] hover:border-accent/40 hover:text-accent transition-colors cursor-default"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

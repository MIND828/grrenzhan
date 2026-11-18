import { useEffect, useState } from "react";
import Icon from "./Icon";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Career", href: "#strengths" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    let last = null;
    // 仅在跨越阈值时 setState，避免每次滚动都触发 React 调度（同值虽 bail 但仍有函数开销）
    const onScroll = () => {
      const next = window.scrollY > 40;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["#home", "#about", "#projects", "#strengths", "#contact"];
    const sections = ids.map((id) => document.querySelector(id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-ink-950/80 border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-[80px]">
        {/* Logo — 衬线 */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group shrink-0"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          <span className="font-bold text-[28px] tracking-tight text-white leading-none">
            Mind<span className="text-accent">.</span>
          </span>
        </a>

        {/* 居中导航 */}
        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative text-[15px] transition-colors pb-1 ${
                active === item.href
                  ? "text-white"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {item.label}
              {active === item.href && (
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent" />
              )}
            </a>
          ))}
        </nav>

        {/* 右侧描边按钮 */}
        <a
          href="#contact"
          className="group flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/25 text-white text-sm font-medium hover:bg-accent hover:border-accent hover:text-ink-950 transition-all duration-300"
        >
          Subscribe
          <Icon
            name="arrowUpRight"
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </header>
  );
}

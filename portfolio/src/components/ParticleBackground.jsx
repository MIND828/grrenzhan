import { useEffect, useRef } from "react";

// Canvas 粒子网络背景 —— 模拟动态科技感视频，无需外部视频文件
const PREFERS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, particles;
    let raf = 0;
    let running = false;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const LINK_DIST = 130;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * DPR));
      canvas.height = Math.max(1, Math.floor(height * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(90, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      const len = particles.length;
      // 连线：先比平方距离剔除远距粒子，避免每对都开方
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(232, 118, 44, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      // 粒子
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.fillStyle = "rgba(232, 118, 44, 0.6)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!running) {
        running = true;
        if (!raf) raf = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();

    // 减少动效：只绘制一帧静止底纹，不启动 rAF 循环
    if (PREFERS_REDUCED_MOTION) {
      draw();
      return () => stop();
    }

    // 视口 / 可见性暂停：滚出视口或切到后台标签页时停止绘制，回到视口恢复
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      resize();
      // 暂停状态下尺寸变化也重绘一帧，避免画布空白/错位
      if (!running) draw();
    };
    window.addEventListener("resize", onResize);

    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 渐变底色 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a120c_0%,_#07070b_70%)]" />
      {/* 粒子画布 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {/* 扫描线光效 */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(232,118,44,0.015)_50%)] bg-[length:100%_4px] opacity-40" />
      {/* 暗角 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#07070b_100%)]" />
    </div>
  );
}

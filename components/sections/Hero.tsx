"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORDS = [
  "Merhaba, ben Özge",
  "—",
  "Yeni şeyler denemeyi",
  "ve keşfetmeyi seven bir",
  "Yazılım Mühendisi",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Neural network particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 90;
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const particles: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
    }));

    const MAX_DIST = 140;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < N; i++) {
        const p = particles[i];
        // Subtle mouse repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
        }

        // Friction + velocity cap
        p.vx *= 0.99;
        p.vy *= 0.99;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx /= speed; p.vy /= speed; }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.55)";
        ctx.fill();

        for (let j = i + 1; j < N; j++) {
          const q = particles[j];
          const ex = p.x - q.x;
          const ey = p.y - q.y;
          const d = Math.sqrt(ex * ex + ey * ey);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Canvas bg */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%), linear-gradient(180deg, transparent 60%, #0B1120 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Scanline reveal text */}
        <div className="mb-6 overflow-hidden">
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={`block ${
                i === 4
                  ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient"
                  : i === 0
                  ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary"
                  : i === 1
                  ? "text-4xl font-display text-accent opacity-70"
                  : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-text-primary"
              }`}
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={
                revealed
                  ? { opacity: 1, clipPath: "inset(0 0% 0 0)" }
                  : {}
              }
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word === "—" ? "\u00A0" : word}
            </motion.span>
          ))}
        </div>

        {/* TÜBİTAK achievement shard */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8 px-4 py-2.5 rounded-full glass border border-accent/30 text-sm"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent-light font-medium">TÜBİTAK 2209-A</span>
          </span>
          <span className="text-text-secondary">Hibrit AI Erken Uyarı Sistemi · Backend &amp; Mikroservis</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            onClick={() => handleNav("#projects")}
            primary
          >
            Projelerimi Gör
          </MagneticButton>
          <MagneticButton onClick={() => handleNav("#contact")}>
            İletişime Geç
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator — pulse radar */}
      <motion.button
        onClick={() => handleNav("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 focus-visible:outline-accent"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
        aria-label="Aşağı kaydır"
      >
        <div className="relative w-6 h-6">
          <span className="absolute inset-0 rounded-full border border-accent/50 animate-[radar_2s_ease-in-out_infinite]" />
          <span className="absolute inset-1 rounded-full border border-accent/30 animate-[radar_2s_ease-in-out_0.4s_infinite]" />
          <span className="absolute inset-[9px] rounded-full bg-accent" />
        </div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          aria-hidden="true"
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1L8 8L15 1" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}

function MagneticButton({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0)";
    ref.current.style.transition = "transform 0.4s ease";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-7 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-accent overflow-hidden group ${
        primary
          ? "bg-accent text-white hover:bg-accent-light shadow-glow-sm hover:shadow-glow-accent"
          : "border border-accent/40 text-accent-light hover:bg-accent/10"
      }`}
      style={{ transition: "background 0.2s, box-shadow 0.2s" }}
    >
      {primary && (
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.12), transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

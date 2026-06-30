"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Wave transition from hero */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#0B1120"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">02</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-xs" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
            Hakkımda
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Particle silhouette */}
          <motion.div
            initial={{ opacity: 0, rotateY: -15, x: -30 }}
            animate={isInView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <ParticleSilhouetteCard />
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              Yazılım geliştirme, web teknolojileri, makine öğrenmesi ve görüntü işleme
              alanlarında kendini geliştiren bir{" "}
              <span className="text-text-primary font-medium">Yazılım Mühendisiyim.</span>{" "}
              Backend geliştirme, veritabanı yönetimi ve modern yazılım mimarileri üzerine
              çalışmalar yürütüyor; ekip çalışmasına uyum sağlayarak proje geliştirme deneyimine sahibim.
            </p>

            {/* Education */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-mono text-accent uppercase tracking-widest">Eğitim</h3>
              <div className="space-y-3">
                <EduItem
                  school="Aksaray Üniversitesi"
                  dept="Yazılım Mühendisliği"
                  years="2022 – 2026"
                  icon="🎓"
                />
                <EduItem
                  school="Oktay Olcay Yurtbay Anadolu Lisesi"
                  dept=""
                  years="2018 – 2022"
                  icon="📚"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-text-muted pt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Zonguldak, Türkiye
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="#0F1729"/>
        </svg>
      </div>
    </section>
  );
}

function EduItem({ school, dept, years, icon }: { school: string; dept: string; years: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border-subtle hover:border-accent/30 transition-colors">
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-text-primary text-sm font-medium">{school}</p>
        {dept && <p className="text-accent-light text-xs">{dept}</p>}
        <p className="text-text-muted text-xs mt-0.5">{years}</p>
      </div>
    </div>
  );
}

function ParticleSilhouetteCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ hovering: false, x: 0, y: 0 });
  const phaseRef = useRef<"forming" | "idle" | "scatter" | "reform">("forming");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 260;
    const H = 320;
    canvas.width = W;
    canvas.height = H;

    // Human bust silhouette points
    function getBustPoints(n: number) {
      const pts: { x: number; y: number }[] = [];
      // Head
      for (let i = 0; i < n * 0.3; i++) {
        const t = (i / (n * 0.3)) * Math.PI * 2;
        pts.push({ x: W / 2 + 42 * Math.cos(t), y: 90 + 48 * Math.sin(t) });
      }
      // Neck
      for (let i = 0; i < n * 0.07; i++) {
        const frac = i / (n * 0.07);
        pts.push({ x: W / 2 + (Math.random() - 0.5) * 22, y: 138 + frac * 28 });
      }
      // Shoulders
      for (let i = 0; i < n * 0.18; i++) {
        const t = (i / (n * 0.18)) * Math.PI;
        pts.push({ x: W / 2 + 80 * Math.cos(t) * (1 - Math.abs(t - Math.PI / 2) * 0.4), y: 168 + 30 * Math.sin(t) * 0.5 });
      }
      // Body
      for (let i = 0; i < n * 0.25; i++) {
        const t = (i / (n * 0.25)) * Math.PI;
        pts.push({ x: W / 2 + 70 * Math.cos(t) * (1 + 0.2 * t), y: 195 + (H - 200) * (i / (n * 0.25)) });
      }
      // Bottom
      for (let i = 0; i < n * 0.2; i++) {
        const t = (i / (n * 0.2)) * Math.PI;
        pts.push({ x: W / 2 - 90 + (i / (n * 0.2)) * 180, y: H - 10 });
      }
      return pts;
    }

    const N = 320;
    const targets = getBustPoints(N);

    type Particle = { x: number; y: number; ox: number; oy: number; tx: number; ty: number; vx: number; vy: number; alpha: number; r: number };
    const particles: Particle[] = targets.map((t) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      ox: t.x,
      oy: t.y,
      tx: t.x,
      ty: t.y,
      vx: 0,
      vy: 0,
      alpha: 0,
      r: Math.random() * 1.6 + 0.5,
    }));

    let startTime = performance.now();

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const elapsed = (now - startTime) / 1000;
      const phase = phaseRef.current;

      particles.forEach((p) => {
        let spring = 0.08;
        let damp = 0.78;

        if (phase === "scatter" || phase === "reform") {
          if (phase === "scatter") {
            // Move toward random scatter
            p.vx += (p.tx - p.x) * 0.04;
            p.vy += (p.ty - p.y) * 0.04;
          } else {
            // Reform to original
            p.vx += (p.ox - p.x) * spring;
            p.vy += (p.oy - p.y) * spring;
          }
        } else {
          // Normal forming / idle
          const ease = phase === "forming" ? Math.min(elapsed / 1.6, 1) : 1;
          p.vx += (p.ox - p.x) * (spring * (0.3 + ease * 0.7));
          p.vy += (p.oy - p.y) * (spring * (0.3 + ease * 0.7));
        }

        p.vx *= damp;
        p.vy *= damp;
        p.x += p.vx;
        p.y += p.vy;
        if (phase === "forming") p.alpha = Math.min(p.alpha + 0.015, 0.85);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    const onMouseEnter = () => {
      phaseRef.current = "scatter";
      particles.forEach((p) => {
        p.tx = p.ox + (Math.random() - 0.5) * 120;
        p.ty = p.oy + (Math.random() - 0.5) * 120;
      });
      setTimeout(() => {
        phaseRef.current = "reform";
      }, 600);
    };
    const onMouseLeave = () => {
      phaseRef.current = "reform";
    };

    const container = containerRef.current;
    container?.addEventListener("mouseenter", onMouseEnter);
    container?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      container?.removeEventListener("mouseenter", onMouseEnter);
      container?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: "800px" }}
      role="img"
      aria-label="Özge Bilici'nin stilize animasyonlu portresi"
    >
      {/* Card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: 280,
          height: 340,
          background: "linear-gradient(135deg, #0F1729 0%, #111827 100%)",
          border: "1px solid rgba(99,102,241,0.2)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)",
        }}
        initial={{ rotateY: -8, rotateX: 4 }}
        whileHover={{ rotateY: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Corner glyph */}
        <div className="absolute top-3 right-3 opacity-40">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke="#6366F1" strokeWidth="1"/>
            <circle cx="10" cy="10" r="3" fill="#6366F1"/>
          </svg>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-text-muted font-mono">aktif</span>
        </div>

        {/* Canvas */}
        <div className="absolute inset-0 flex items-center justify-center mt-4">
          <canvas ref={canvasRef} aria-hidden="true" />
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 p-4"
          style={{ background: "linear-gradient(0deg, rgba(11,17,32,0.9), transparent)" }}>
          <p className="text-xs font-mono text-accent-light">OB::profile_entity</p>
        </div>
      </motion.div>

      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "0 0 40px rgba(99,102,241,0.12)", borderRadius: "16px" }}
        aria-hidden="true"
      />
    </div>
  );
}

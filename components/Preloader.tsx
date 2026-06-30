"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [phase, setPhase] = useState<"forming" | "idle" | "exit">("forming");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = 300);
    const H = (canvas.height = 220);
    const ACCENT = "#6366F1";

    // Cat silhouette target points (simplified minimalist cat)
    function getCatPoints(count: number): { x: number; y: number }[] {
      const pts: { x: number; y: number }[] = [];
      // body ellipse
      for (let i = 0; i < count * 0.4; i++) {
        const t = (i / (count * 0.4)) * Math.PI * 2;
        pts.push({
          x: W / 2 + 60 * Math.cos(t) * (1 + 0.1 * Math.cos(4 * t)),
          y: H * 0.62 + 30 * Math.sin(t),
        });
      }
      // head circle
      for (let i = 0; i < count * 0.25; i++) {
        const t = (i / (count * 0.25)) * Math.PI * 2;
        pts.push({
          x: W / 2 + 28 * Math.cos(t),
          y: H * 0.32 + 24 * Math.sin(t),
        });
      }
      // left ear
      for (let i = 0; i < count * 0.08; i++) {
        const frac = i / (count * 0.08);
        pts.push({
          x: W / 2 - 20 + frac * (-12),
          y: H * 0.32 - 10 - frac * 20,
        });
      }
      // right ear
      for (let i = 0; i < count * 0.08; i++) {
        const frac = i / (count * 0.08);
        pts.push({
          x: W / 2 + 20 + frac * 12,
          y: H * 0.32 - 10 - frac * 20,
        });
      }
      // tail (sine wave)
      for (let i = 0; i < count * 0.19; i++) {
        const frac = i / (count * 0.19);
        pts.push({
          x: W / 2 + 62 + frac * 50,
          y: H * 0.62 + 10 + Math.sin(frac * Math.PI * 3) * 18,
        });
      }
      return pts;
    }

    const N = 260;
    const targets = getCatPoints(N);

    type Particle = {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      alpha: number;
      r: number;
    };

    const particles: Particle[] = targets.map((t) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      tx: t.x,
      ty: t.y,
      vx: 0,
      vy: 0,
      alpha: Math.random(),
      r: Math.random() * 1.5 + 0.6,
    }));

    let tailPhase = 0;
    let startTime = performance.now();
    let isForming = true;
    let formDone = false;

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);
      tailPhase += 0.04;
      const elapsed = (now - startTime) / 1000;

      // Update positions
      particles.forEach((p, i) => {
        if (isForming) {
          const ease = Math.min(elapsed / 1.5, 1);
          const spring = 0.08 + ease * 0.06;
          const damp = 0.75;
          // tail particles: animate sinusoidally after forming
          const isTailParticle = i > N * 0.81;
          if (isTailParticle && elapsed > 1.8) {
            const frac = (i - N * 0.81) / (N * 0.19);
            p.tx =
              W / 2 +
              62 +
              frac * 50;
            p.ty =
              H * 0.62 +
              10 +
              Math.sin(frac * Math.PI * 3 + tailPhase * 2) * 18;
          }
          p.vx = p.vx * damp + (p.tx - p.x) * spring;
          p.vy = p.vy * damp + (p.ty - p.y) * spring;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = Math.min(p.alpha + 0.02, 1);
        }
        // Draw dot
        const isEye =
          i > N * 0.4 &&
          i < N * 0.4 + 4;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (isEye) {
          ctx!.fillStyle = `rgba(129,140,248,${p.alpha})`;
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = "#818CF8";
        } else {
          ctx!.fillStyle = `rgba(99,102,241,${p.alpha * 0.85})`;
          ctx!.shadowBlur = 0;
        }
        ctx!.fill();
        ctx!.shadowBlur = 0;
      });

      // Check if formed
      if (elapsed > 1.8 && !formDone) {
        formDone = true;
        isForming = false;
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    const t1 = setTimeout(() => setPhase("idle"), 2000);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(() => onComplete(), 2900);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0B1120" }}
          exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center gap-4"
          >
            <canvas
              ref={canvasRef}
              width={300}
              height={220}
              style={{ imageRendering: "pixelated" }}
              aria-hidden="true"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-sm text-text-secondary tracking-[0.3em] uppercase font-mono"
            >
              Özge Bilici
            </motion.p>
            {/* Loading bar */}
            <div className="w-48 h-px bg-border-subtle overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg, #6366F1, #818CF8)" }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

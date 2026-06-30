"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "APIG TECH (İTÜ)",
    role: "Software Developer",
    period: "2024",
    active: true,
    bullets: [
      "Görüntü işleme süreçlerinde görev alınmıştır",
      "Takım çalışması içinde backend geliştirme görevleri",
    ],
    tech: [ "Backend", "Git"],
    color: "#6366F1",
  },
  {
    company: "Flovo Inc.",
    role: "Yazılım Geliştirme Stajyeri",
    period: "2024 – 2025",
    active: false,
    bullets: [
      "ASP.NET Core MVC tabanlı çok katmanlı web uygulamaları geliştirme",
      "Entity Framework, Repository Pattern ve Dependency Injection kullanımı",
      "JWT ve ASP.NET Identity ile kimlik doğrulama altyapısı",
      "Docker, MongoDB ve Redis kullanan mikroservis mimarisi",
      "Sipariş, sepet ve kargo takip modülleri geliştirme",
    ],
    tech: ["ASP.NET Core", "Docker", "MongoDB", "Redis"],
    color: "#818CF8",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28"
      style={{ background: "#0F1729" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">03</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-xs" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
            Deneyim
          </h2>
        </motion.div>

        <div className="relative">
          {/* Central timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, transparent, #6366F1, transparent)" }}
            aria-hidden="true"
          />
          {/* Mobile line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, transparent, #6366F1, transparent)" }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.company} exp={exp} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ exp, index, isInView }: {
  exp: typeof experiences[0];
  index: number;
  isInView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative">
      {/* Node on timeline */}
      <motion.div
        className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full items-center justify-center z-10"
        style={{
          background: exp.active ? "#6366F1" : "#1E2D4A",
          border: `2px solid ${exp.active ? "#818CF8" : "#6366F1"}`,
          boxShadow: exp.active ? "0 0 12px rgba(99,102,241,0.6)" : "none",
        }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
        aria-hidden="true"
      >
        {exp.active && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent/40"
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Mobile node */}
      <div className="md:hidden absolute left-5 top-8 -translate-x-1/2 w-3 h-3 rounded-full z-10"
        style={{ background: exp.active ? "#6366F1" : "#1E2D4A", border: "2px solid #6366F1" }}
        aria-hidden="true"
      />

      <motion.div
        className={`md:grid md:grid-cols-2 md:gap-16 pl-12 md:pl-0`}
        initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Card placement */}
        <div className={isLeft ? "md:col-start-1" : "md:col-start-2"}>
          <div
            className="rounded-xl p-6 border border-border-subtle hover:border-accent/30 transition-all duration-300 group"
            style={{ background: "rgba(11,17,32,0.6)", backdropFilter: "blur(8px)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-text-primary font-display font-semibold text-lg">
                    {exp.company}
                  </h3>
                  
                </div>
                <p className="text-accent-light text-sm font-medium">{exp.role}</p>
              </div>
              <span className="text-xs text-text-muted font-mono whitespace-nowrap pt-1">
                {exp.period}
              </span>
            </div>

            {/* Bullets */}
            <ul className="space-y-2 mb-4">
              {exp.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/70 shrink-0" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full text-xs bg-accent/8 border border-accent/20 text-text-muted group-hover:text-accent-light group-hover:border-accent/40 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

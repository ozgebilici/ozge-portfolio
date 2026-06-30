"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const certs = [
  {
    year: "2019",
    title: "Bilgisayar İşletmenliği",
    org: "MEB — Çaycuma Halk Eğitim Merkezi",
    icon: "💻",
  },
  {
    year: "2022",
    title: "Dijital Okuryazarlık",
    org: "Habitat Derneği & Microsoft Türkiye",
    icon: "🌐",
  },
  {
    year: "2022",
    title: "İş Kulübü Eğitimi",
    org: "İŞKUR",
    icon: "💼",
  },
  {
    year: "2023",
    title: "Arduino Programlama",
    org: "Aksaray Bilim Merkezi",
    icon: "⚡",
  },
  {
    year: "2025",
    title: "AR-GE Proje Pazarı",
    org: "Aksaray Üniversitesi II. AR-GE Proje Pazarı",
    icon: "🔬",
  },
];

export default function Certificates() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certificates"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "#0F1729" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">07</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-xs" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
            Sertifikalar
          </h2>
        </motion.div>

        {/* Timeline ribbon */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #6366F1, transparent)" }}
            aria-hidden="true"
          />
          {/* Animated fill */}
          <motion.div
            className="hidden md:block absolute top-12 left-0 h-px"
            style={{ background: "linear-gradient(90deg, #6366F1, #818CF8)", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            aria-hidden="true"
          />

          {/* Desktop: row */}
          <div className="hidden md:flex justify-between gap-4 relative">
            {certs.map((cert, i) => (
              <CertNode key={cert.title} cert={cert} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden relative">
            <div className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg, transparent, #6366F1, transparent)" }}
              aria-hidden="true"
            />
            <div className="space-y-6 pl-14">
              {certs.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="relative"
                >
                  {/* Mobile node */}
                  <div
                    className="absolute -left-[2.1rem] top-3 w-3 h-3 rounded-full border-2 border-accent"
                    style={{ background: "#0F1729" }}
                    aria-hidden="true"
                  />
                  <div className="p-4 rounded-xl border border-border-subtle" style={{ background: "rgba(11,17,32,0.7)" }}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl" role="img" aria-label="">{cert.icon}</span>
                      <div>
                        <p className="text-xs text-accent font-mono mb-1">{cert.year}</p>
                        <p className="text-text-primary text-sm font-medium">{cert.title}</p>
                        <p className="text-text-muted text-xs mt-0.5">{cert.org}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertNode({ cert, index, isInView }: {
  cert: typeof certs[0]; index: number; isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center gap-0 relative cursor-default"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Node */}
      <motion.div
        className="relative w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center z-10 mt-8"
        style={{ background: hovered ? "#6366F1" : "#0F1729" }}
        animate={{ scale: hovered ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <span className="text-xs" role="img" aria-label="">{cert.icon}</span>
        {hovered && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent/50"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            aria-hidden="true"
          />
        )}
      </motion.div>

      {/* Year */}
      <p className="mt-3 text-xs font-mono text-accent">{cert.year}</p>

      {/* Tooltip / card */}
      <motion.div
        className="mt-2 text-center px-3 py-3 rounded-lg border"
        style={{
          background: hovered ? "rgba(99,102,241,0.12)" : "rgba(11,17,32,0.5)",
          borderColor: hovered ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.12)",
          boxShadow: hovered ? "0 4px 20px rgba(99,102,241,0.2)" : "none",
        }}
        animate={{
          y: hovered ? -4 : 0,
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-text-primary text-xs font-medium leading-tight">{cert.title}</p>
        <p className="text-text-muted text-xs mt-1 leading-tight">{cert.org}</p>
      </motion.div>
    </motion.div>
  );
}

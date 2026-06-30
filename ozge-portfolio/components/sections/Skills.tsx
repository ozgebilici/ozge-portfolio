"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    label: "Diller",
    color: "#6366F1",
    skills: ["Python", "C#", "C", "SQL", "JavaScript", "HTML", "CSS", "Flutter"],
  },
  {
    label: "Framework & Kütüphaneler",
    color: "#818CF8",
    skills: ["ASP.NET Core MVC", "Entity Framework", "TensorFlow", "OpenCV", "Scikit-Learn", "NumPy"],
  },
  {
    label: "Veritabanı",
    color: "#A78BFA",
    skills: ["PostgreSQL", "Firebase", "SQL Server", "MongoDB"],
  },
  {
    label: "Araçlar & Cloud",
    color: "#7C3AED",
    skills: ["Docker", "Git", "GitHub", "Google Cloud"],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28"
      style={{ background: "#0F1729" }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#6366F1" }} aria-hidden="true"/>
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-4 blur-3xl pointer-events-none" style={{ background: "#818CF8" }} aria-hidden="true"/>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">05</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-xs" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
            Teknik Beceriler
          </h2>
        </motion.div>

        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.12 + 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color }} aria-hidden="true"/>
                <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <SkillPill key={skill} label={skill} color={group.color} delay={gi * 0.1 + si * 0.04} isInView={isInView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillPill({ label, color, delay, isInView }: {
  label: string; color: string; delay: number; isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="px-3 py-1.5 rounded-full text-sm font-medium cursor-default select-none transition-all duration-200"
      style={{
        background: hovered ? `rgba(99,102,241,0.15)` : "rgba(30,45,74,0.5)",
        border: `1px solid ${hovered ? color : "rgba(99,102,241,0.2)"}`,
        color: hovered ? "#F1F5F9" : "#94A3B8",
        boxShadow: hovered ? `0 4px 16px rgba(99,102,241,0.2)` : "none",
      }}
    >
      {label}
    </motion.span>
  );
}

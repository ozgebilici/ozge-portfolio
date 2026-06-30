"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "Global Hunger Early Warning System",
    subtitle: "TÜBİTAK 2209-A Araştırma Projesi",
    description: "Küresel açlık riskini tahmin eden hibrit yapay zekâ tabanlı erken uyarı sistemi. Çok modlu veri füzyonu ve derin öğrenme modelleri ile gerçek zamanlı risk skorlaması.",
    results: ["%88 F1-Skoru", "Hibrit AI Mimarisi", "TÜBİTAK Kabulü"],
    tech: ["Python", "TensorFlow", "Scikit-Learn", "NumPy", "Pandas","PostgreSQL"],
    github: null,
    private: true,
    accent: "#6366F1",
  },
  {
    title: "BOZGUN",
    subtitle: "Lazer Takip & Bilgisayarlı Görü Sistemi",
    description: "Gerçek zamanlı lazer nokta tespiti ve takibi için geliştirilmiş bilgisayarlı görü sistemi. Yüksek FPS'de düşük gecikme ile hareket analizi.",
    results: ["Gerçek Zamanlı İşleme", "OpenCV Entegrasyonu", "Düşük Gecikme"],
    tech: ["Python", "OpenCV", "NumPy"],
    github: null,
    private: true,
    accent: "#818CF8",
  },
  {
    title: "Dijital Arınma Platformu",
    subtitle: "Farkındalık & Detoks Web Uygulaması",
    description: "Kullanıcıların bağlı oldukları hesapları tespit eden ve KVKK kapsamında veri silme talebi gönderebildikleri bir web sitesi.",
    results: ["İlerleme Takibi","Veri Silme Talepleri","Hesap Yönetimi"],
    tech: ["ASP.NET Core", "MySQL", "Docker"],
    github: null,
    private: true,
    accent: "#A78BFA",
  },
  {
    title: "Alzheimer Bilişsel Eğitim Platformu",
    subtitle: "Sağlık Teknolojisi Uygulaması",
    description: "Alzheimer hastaları için tasarlanmış, bilişsel fonksiyonları destekleyen interaktif egzersizler ve ilerleme analizi sunan platform.",
    results: ["Kişiselleştirilmiş Egzersizler", "İlerleme Analizi", "Doktor Takibi"],
    tech: ["Python", "Firebase", "TensorFlow", "Flutter"],
    github: null,
    private: true,
    accent: "#6366F1",
  },

];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0B1120 0%, #0F1729 50%, #0B1120 100%)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">06</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-xs" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
            Projeler
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isInView }: {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative rounded-xl flex flex-col overflow-hidden"
      style={{
        background: "rgba(15, 23, 42, 0.8)",
        border: "1px solid rgba(99,102,241,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        aria-hidden="true"
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-text-primary font-display font-semibold text-base leading-tight">
              {project.title}
            </h3>
            {project.private && (
              <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                🔒 Yakında
              </span>
            )}
          </div>
          <p className="text-xs text-accent-light">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Results */}
        <div className="flex flex-wrap gap-2">
          {project.results.map((r) => (
            <span
              key={r}
              className="text-xs px-2 py-1 rounded-md font-mono"
              style={{
                background: `${project.accent}15`,
                border: `1px solid ${project.accent}30`,
                color: project.accent,
              }}
            >
              {r}
            </span>
          ))}
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border-subtle">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-border-subtle/50 text-text-muted">
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-accent-light hover:text-white transition-colors focus-visible:outline-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        ) : null}
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 40px ${project.accent}0a` }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

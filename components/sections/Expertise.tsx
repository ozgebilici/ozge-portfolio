"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Backend & Yazılım Mimarisi",
    icon: "⚙️",
    items: ["ASP.NET Core MVC", "Entity Framework", "Repository Pattern", "Dependency Injection", "JWT / ASP.NET Identity"],
    color: "#6366F1",
  },
  {
    id: 2,
    title: "Mikroservis & Cloud",
    icon: "☁️",
    items: ["Docker", "MongoDB", "Redis",  "Google Cloud"],
    color: "#818CF8",
  },
  {
    id: 3,
    title: "Yapay Zekâ & Görüntü İşleme",
    icon: "🧠",
    items: ["TensorFlow", "OpenCV", "Scikit-Learn", "NumPy", "TÜBİTAK 2209-A Projesi"],
    color: "#A78BFA",
  },
  {
    id: 4,
    title: "Veritabanı & Sistem Tasarımı",
    icon: "🗄️",
    items: ["PostgreSQL", "SQL Server", "Firebase", "Ölçeklenebilir Sistem Tasarımı", "Veri Modelleme"],
    color: "#6366F1",
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section id="expertise" ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#6366F1" }} aria-hidden="true"/>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#818CF8" }} aria-hidden="true"/>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">04</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-xs" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
            Yetkinlikler
          </h2>
        </motion.div>

        {/* Desktop: zigzag with SVG line */}
        <div className="hidden md:block relative">
          {/* SVG connecting line */}
          <SkillGraphLine cards={cards} progress={lineProgress} isInView={isInView} />

          <div className="space-y-24">
            {cards.map((card, i) => (
              <ExpertiseCard key={card.id} card={card} index={i} isInView={isInView} progress={lineProgress} />
            ))}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden space-y-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <ExpertiseCardMobile card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGraphLine({ progress, isInView }: { cards: typeof cards; progress: any; isInView: boolean }) {
  // Simple animated vertical line with energy particle
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 w-full"
        style={{
          background: "linear-gradient(180deg, transparent, #6366F1, transparent)",
          scaleY: progress,
          transformOrigin: "top",
          height: "100%",
        }}
      />
      {/* Traveling energy particle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
        style={{
          background: "#818CF8",
          boxShadow: "0 0 10px #818CF8, 0 0 20px rgba(129,140,248,0.5)",
          top: useTransform(progress, [0, 1], ["0%", "100%"]),
        }}
      />
    </div>
  );
}

function ExpertiseCard({ card, index, isInView, progress }: {
  card: typeof cards[0];
  index: number;
  isInView: boolean;
  progress: any;
}) {
  const isLeft = index % 2 === 0;
  const activationPoint = index / (cards.length - 1);

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
      <motion.div
        className={`w-5/12 rounded-xl p-6 border transition-all duration-500 group cursor-default`}
        style={{
          background: "rgba(11,17,32,0.7)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(99,102,241,0.18)",
        }}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(99,102,241,0.5)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(99,102,241,0.15)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl" role="img" aria-label="">{card.icon}</span>
          <h3 className="text-text-primary font-display font-semibold text-lg">{card.title}</h3>
        </div>

        {/* Activation bar */}
        <div className="mb-4 h-px bg-border-subtle overflow-hidden rounded-full">
          <motion.div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${card.color})`,
              scaleX: useTransform(progress, [activationPoint - 0.1, activationPoint + 0.1], [0, 1]),
              transformOrigin: "left",
            }}
          />
        </div>

        <ul className="space-y-2">
          {card.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: card.color }} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function ExpertiseCardMobile({ card }: { card: typeof cards[0] }) {
  return (
    <div
      className="rounded-xl p-5 border border-border-subtle"
      style={{ background: "rgba(11,17,32,0.7)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl" role="img" aria-label="">{card.icon}</span>
        <h3 className="text-text-primary font-semibold">{card.title}</h3>
      </div>
      <ul className="space-y-1.5">
        {card.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: card.color }} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

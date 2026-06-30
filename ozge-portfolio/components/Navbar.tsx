"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hakkımda", href: "#about" },
  { label: "Deneyim", href: "#experience" },
  { label: "Yetkinlikler", href: "#expertise" },
  { label: "Projeler", href: "#projects" },
  { label: "Sertifikalar", href: "#certificates" },
  { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(11, 17, 32, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.12)" : "none",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — data glyph mark */}
        <button
          onClick={() => handleNav("#hero")}
          className="relative group flex items-center gap-2 focus-visible:outline-accent"
          aria-label="Ana sayfaya git"
        >
          <DataGlyphLogo />
          <span className="text-sm font-display font-semibold tracking-wider text-accent-light hidden sm:block">
            Özge Bilici
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`relative px-3 py-2 text-sm transition-colors duration-200 rounded-md focus-visible:outline-accent ${
                    isActive
                      ? "text-accent-light"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, #6366F1, transparent)" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CV button */}
        <a
          href="/cv-ozge-bilici.pdf"
          download
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-accent/40 text-accent-light hover:bg-accent/10 transition-all duration-200 focus-visible:outline-accent"
          rel="noopener noreferrer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          CV İndir
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus-visible:outline-accent"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
        >
          <motion.span
            className="block w-5 h-px bg-text-primary origin-center"
            animate={mobileOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-5 h-px bg-text-primary origin-center"
            animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          />
          <motion.span
            className="block w-5 h-px bg-text-primary origin-center"
            animate={mobileOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(11, 17, 32, 0.96)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left py-3 px-2 text-text-secondary hover:text-text-primary border-b border-border-subtle/30 text-sm transition-colors focus-visible:outline-accent"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <a
                  href="/cv-ozge-bilici.pdf"
                  download
                  className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-md text-sm border border-accent/40 text-accent-light w-full justify-center focus-visible:outline-accent"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  CV İndir
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function DataGlyphLogo() {
  const nodes = [
    { cx: 8, cy: 8 },
    { cx: 22, cy: 6 },
    { cx: 30, cy: 16 },
    { cx: 16, cy: 22 },
    { cx: 6, cy: 20 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2],
  ];

  return (
    <svg
      width="36"
      height="28"
      viewBox="0 0 36 28"
      fill="none"
      className="group-hover:[&_line]:stroke-accent-light transition-all"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#6366F1"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={i === 0 ? 2.5 : 1.8}
          fill={i === 0 ? "#818CF8" : "#6366F1"}
        />
      ))}
    </svg>
  );
}

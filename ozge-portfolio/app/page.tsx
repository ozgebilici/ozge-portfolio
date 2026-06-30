"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Expertise from "@/components/sections/Expertise";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    if (mq.matches) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && !prefersReducedMotion && (
        <Preloader onComplete={() => setLoading(false)} />
      )}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Expertise />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

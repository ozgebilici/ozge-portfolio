'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const navItems = [
  { label: 'Ana Sayfa', href: '#home' },
  { label: 'Hakkımda', href: '#about' },
  { label: 'Deneyim', href: '#experience' },
  { label: 'Yetkinlikler', href: '#expertise' },
  { label: 'Projeler', href: '#projects' },
  { label: 'Sertifikalar', href: '#certificates' },
  { label: 'İletişim', href: '#contact' },
]

function DataGlyphLogo() {
  const [hovered, setHovered] = useState(false)
  const nodes = [
    { cx: 12, cy: 6 },
    { cx: 24, cy: 6 },
    { cx: 6, cy: 18 },
    { cx: 18, cy: 18 },
    { cx: 30, cy: 18 },
    { cx: 12, cy: 30 },
    { cx: 24, cy: 30 },
  ]
  const edges = hovered
    ? [[0,1],[0,2],[0,3],[1,3],[1,4],[2,3],[2,5],[3,4],[3,5],[3,6],[4,6],[5,6]]
    : [[0,1],[0,2],[2,5],[1,4],[4,6],[5,6],[0,3],[3,6]]

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="cursor-pointer select-none"
      whileTap={{ scale: 0.95 }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36">
        <AnimatePresence>
          {edges.map(([a, b], i) => (
            <motion.line
              key={`${a}-${b}-${hovered}`}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
              stroke="#6366F1"
              strokeWidth="1"
              strokeOpacity="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
            />
          ))}
        </AnimatePresence>
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r={hovered ? 2.5 : 2}
            fill={hovered ? '#818CF8' : '#6366F1'}
            animate={{ r: hovered ? 2.5 : 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems.map(n => n.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(11,17,32,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => handleNav('#home')} aria-label="Ana sayfaya git">
            <DataGlyphLogo />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="relative px-4 py-2 text-sm transition-colors duration-200 rounded-md group"
                  style={{ color: isActive ? '#818CF8' : '#94A3B8' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 rounded-full"
                      style={{ background: 'linear-gradient(90deg, transparent, #6366F1, transparent)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(99,102,241,0.06)' }} />
                </button>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="/cv-ozge-bilici.pdf"
              download
              className="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 relative overflow-hidden group"
              style={{
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.35)',
                color: '#818CF8',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">CV İndir</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(99,102,241,0.2)' }} />
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-md"
            style={{ color: '#94A3B8' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-5 h-0.5 rounded-full"
              style={{ background: '#94A3B8' }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 rounded-full"
              style={{ background: '#94A3B8' }}
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 rounded-full"
              style={{ background: '#94A3B8' }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col"
            style={{ background: 'rgba(11,17,32,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-2xl font-display font-light tracking-wide transition-colors"
                  style={{ color: activeSection === item.href.slice(1) ? '#818CF8' : '#94A3B8' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ color: '#F1F5F9', x: 6 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                href="/cv-ozge-bilici.pdf"
                download
                className="mt-4 px-8 py-3 text-sm rounded-xl font-medium"
                style={{
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.4)',
                  color: '#818CF8',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                onClick={() => setMenuOpen(false)}
              >
                CV İndir
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

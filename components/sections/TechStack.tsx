'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const stack = [
  {
    category: 'Diller',
    color: '#6366F1',
    items: ['Python', 'C#', 'C++', 'SQL', 'JavaScript', 'HTML', 'CSS', 'Flutter'],
  },
  {
    category: 'Framework & Kütüphaneler',
    color: '#8B5CF6',
    items: ['ASP.NET Core MVC', 'Entity Framework', 'TensorFlow', 'OpenCV', 'Scikit-Learn', 'NumPy', 'Matplotlib'],
  },
  {
    category: 'Veritabanı',
    color: '#06B6D4',
    items: ['PostgreSQL', 'Firebase', 'SQL Server', 'MongoDB'],
  },
  {
    category: 'Araçlar & Cloud',
    color: '#10B981',
    items: ['Docker', 'Git', 'GitHub', 'Google Cloud'],
  },
]

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  return (
    <section
      id="techstack"
      className="relative py-28 overflow-hidden"
      style={{ background: '#0F172A' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Blobs */}
      {[
        { left: '10%', top: '20%', color: 'rgba(99,102,241,0.07)' },
        { left: '70%', top: '60%', color: 'rgba(139,92,246,0.06)' },
      ].map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: blob.left,
            top: blob.top,
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
      ))}

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="w-8 h-0.5 rounded-full bg-indigo-500" />
          <span className="text-xs tracking-[0.4em] uppercase text-indigo-400">04 · Teknik Beceriler</span>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-medium mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Kullandığım <span className="gradient-text">teknolojiler</span>
        </motion.h2>

        <div className="space-y-10">
          {stack.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <h3 className="text-sm font-medium tracking-wide" style={{ color: '#94A3B8' }}>
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    className="inline-flex items-center px-3.5 py-2 rounded-xl text-sm font-medium cursor-default"
                    style={{
                      background: 'rgba(15,23,42,0.8)',
                      border: `1px solid ${activeCategory === gi ? group.color + '40' : 'rgba(99,102,241,0.15)'}`,
                      color: activeCategory === gi ? '#E2E8F0' : '#94A3B8',
                      transition: 'all 0.2s',
                    }}
                    whileHover={{
                      scale: 1.06,
                      y: -3,
                      color: '#E2E8F0',
                      borderColor: group.color + '80',
                      boxShadow: `0 4px 16px ${group.color}25`,
                      transition: { type: 'spring', stiffness: 400, damping: 20 },
                    }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.05 + ii * 0.04, duration: 0.35 }}
                    onHoverStart={() => setActiveCategory(gi)}
                    onHoverEnd={() => setActiveCategory(null)}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

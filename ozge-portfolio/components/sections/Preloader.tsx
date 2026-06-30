'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<'forming' | 'formed' | 'exit'>('forming')
  const mouseRef = useRef({ x: -999, y: -999 })
  const animFrameRef = useRef<number>(0)
  const phaseRef = useRef<'forming' | 'formed' | 'exit'>('forming')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2 - 30

    // Build cat silhouette points
    const catPoints: Array<{ x: number; y: number }> = []

    // Body ellipse
    for (let i = 0; i < 55; i++) {
      const a = (i / 55) * Math.PI * 2
      catPoints.push({ x: cx + Math.cos(a) * 38, y: cy + 25 + Math.sin(a) * 50 })
    }
    // Head circle
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2
      catPoints.push({ x: cx + Math.cos(a) * 30, y: cy - 52 + Math.sin(a) * 30 })
    }
    // Left ear
    for (let i = 0; i < 10; i++) {
      catPoints.push({ x: cx - 20 + i * 2, y: cy - 78 - (i < 5 ? i * 4 : (10 - i) * 4) })
    }
    // Right ear
    for (let i = 0; i < 10; i++) {
      catPoints.push({ x: cx + 4 + i * 2, y: cy - 78 - (i < 5 ? i * 4 : (10 - i) * 4) })
    }
    // Tail (30 pts, sinusoidal base)
    for (let i = 0; i < 35; i++) {
      catPoints.push({
        x: cx + 38 + (i / 35) * 70,
        y: cy + 30 + Math.sin((i / 35) * Math.PI * 1.5) * 25,
      })
    }

    const N = catPoints.length
    const particles = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      tx: catPoints[i].x,
      ty: catPoints[i].y,
      baseTx: catPoints[i].x,
      baseTy: catPoints[i].y,
      vx: 0,
      vy: 0,
      size: Math.random() * 1.6 + 0.7,
      isTail: i >= 115,
      tailT: i >= 115 ? (i - 115) / 35 : 0,
    }))

    const tailBodyStart = 115
    let startTime = performance.now()
    let tailPhase = 0

    const render = (now: number) => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#0B1120'
      ctx.fillRect(0, 0, W, H)

      const elapsed = (now - startTime) / 1000
      tailPhase += 0.035
      const currentPhase = phaseRef.current

      particles.forEach((p, i) => {
        let targetX = p.baseTx
        let targetY = p.baseTy

        // Animate tail after forming
        if (p.isTail && currentPhase === 'formed') {
          targetX = cx + 38 + p.tailT * 70
          targetY = cy + 30 + Math.sin(p.tailT * Math.PI * 1.5 + tailPhase) * 25
        }

        // Mouse repulsion
        const mdx = p.x - mouseRef.current.x
        const mdy = p.y - mouseRef.current.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 90 && currentPhase === 'formed') {
          const force = ((90 - mdist) / 90) * 2.5
          p.vx += (mdx / mdist) * force
          p.vy += (mdy / mdist) * force
        }

        const progress = currentPhase === 'forming' ? Math.min(elapsed / 1.6, 1) : 1
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        p.vx += (targetX - p.x) * 0.09 * eased
        p.vy += (targetY - p.y) * 0.09 * eased
        p.vx *= 0.87
        p.vy *= 0.87
        p.x += p.vx
        p.y += p.vy

        // Identify eye particles
        const isEyeL = Math.abs(p.baseTx - (cx - 12)) < 10 && Math.abs(p.baseTy - (cy - 54)) < 10
        const isEyeR = Math.abs(p.baseTx - (cx + 12)) < 10 && Math.abs(p.baseTy - (cy - 54)) < 10
        const isEye = (isEyeL || isEyeR) && currentPhase === 'formed'

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + (isEye ? 1.5 : 0), 0, Math.PI * 2)

        if (isEye) {
          ctx.fillStyle = 'rgba(165,180,252,0.95)'
          ctx.shadowBlur = 14
          ctx.shadowColor = '#818CF8'
        } else {
          ctx.fillStyle = `rgba(99,102,241,${0.5 + eased * 0.45})`
          ctx.shadowBlur = 0
        }
        ctx.fill()
        ctx.shadowBlur = 0
      })

      if (elapsed > 1.6 && currentPhase === 'forming') {
        phaseRef.current = 'formed'
        setPhase('formed')
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouse)

    const exitTimer = setTimeout(() => {
      phaseRef.current = 'exit'
      setPhase('exit')
      setTimeout(onComplete, 750)
    }, 3100)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', handleMouse)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[100] overflow-hidden"
        style={{ background: '#0B1120' }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: phase === 'formed' ? 1 : 0, y: phase === 'formed' ? 0 : 8 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.5em] text-indigo-400/70 uppercase font-light">
            Sistem başlatılıyor
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion'

const BG      = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Extract_background_from_image_202606122119-oIaSZ3xENHVAVMzYiLabTkrkR5FsQb.jpeg'
const PORTRAIT = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled34_20260612213314-dtIhJ1Xkh0VMWw2vSq8wFetU1AWmtb.png'
const HAND     = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled33_20260612211425-wCCttcWOweB1NI5h17uUabeR1ROV7V.png'

// SVG noise texture as a data URI for the frosted-glass grit overlay
const NOISE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E`

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Raw mouse motion values (0–1 normalised)
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)

  // Smooth springs — portrait tracks gently, hand tracks faster
  const springCfg = { stiffness: 60, damping: 20, mass: 1 }
  const fastCfg   = { stiffness: 80, damping: 18, mass: 0.8 }

  const smoothX = useSpring(rawX, springCfg)
  const smoothY = useSpring(rawY, springCfg)
  const fastX   = useSpring(rawX, fastCfg)
  const fastY   = useSpring(rawY, fastCfg)

  // ── TUNING BALANCES (Base mouse movement tracking) ──
  const portraitParallaxX = useTransform(smoothX, [0, 1], [-18, 18])
  const portraitParallaxY = useTransform(smoothY, [0, 1], [-18, 18])
  const handParallaxX     = useTransform(fastX, [0, 1], [-36, 36])
  const handParallaxY     = useTransform(fastY, [0, 1], [-36, 36])

  // Scroll-linked frosted pane translation
  const { scrollY } = useScroll()
  const paneY = useTransform(scrollY, [0, 600], [0, -260])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - left) / width)
    rawY.set((e.clientY - top) / height)
  }

  const handleMouseLeave = () => {
    rawX.set(0.5)
    rawY.set(0.5)
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Layer 1: Static backdrop ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      />

      {/* ── Layer 3: Portrait (Shifted Right & Adjustable) ── */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[60%] flex items-end justify-center z-10"
        style={{ 
          x: portraitParallaxX, 
          y: portraitParallaxY,
          // CHANGE THESE TO TWEAK THE PORTRAIT SIZE & POSITION:
          translateX: '50px',  // Positive moves her right, negative moves her left
          translateY: '0px',   // Shifts up/down if needed
          scale: 1.08          // Adjust her visual frame size
        }}
      >
        <img
          src={PORTRAIT}
          alt="Model portrait"
          className="h-[95%] w-auto object-contain object-bottom select-none"
          style={{ mixBlendMode: 'multiply', filter: 'contrast(1.05)' }}
          draggable={false}
        />
      </motion.div>

      {/* ── Layer 4: Hand & Canister (Shifted Left & Adjustable) ── */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[65%] flex items-end justify-center z-20"
        style={{ 
          x: handParallaxX, 
          y: handParallaxY,
          // CHANGE THESE TO TWEAK THE HAND SIZE & POSITION:
          translateX: '-40px', // Negative moves hand left, positive moves hand right
          translateY: '20px',  // Shifts up/down if needed
          scale: 1.12          // Adjust bottle frame scale
        }}
      >
        <img
          src={HAND}
          alt="Hand holding AXIS canister"
          className="h-[90%] w-auto object-contain object-bottom select-none"
          style={{ mixBlendMode: 'multiply', filter: 'contrast(1.1) brightness(0.95)' }}
          draggable={false}
        />
      </motion.div>

      {/* ── Frosted glass pane with scroll-scan ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30"
        style={{ y: paneY }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(
              0% 0%, 100% 0%, 100% 100%, 0% 100%,
              0% 0%,
              20% 15%, 20% 85%, 80% 85%, 80% 15%,
              20% 15%
            )`,
            backdropFilter: 'blur(30px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.1)',
            backgroundColor: 'rgba(8, 10, 15, 0.45)',
          }}
        />

        {/* SVG noise grain on top of the frosted region */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            clipPath: `polygon(
              0% 0%, 100% 0%, 100% 100%, 0% 100%,
              0% 0%,
              20% 15%, 20% 85%, 80% 85%, 80% 15%,
              20% 15%
            )`,
            backgroundImage: `url("${NOISE_SVG}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
          }}
        />

        {/* Sharp border around the clear window */}
        <div
          className="absolute"
          style={{
            left: '20%', top: '15%',
            width: '60%', height: '70%',
            border: '1px solid rgba(255,255,255,0.08)',
            pointerEvents: 'none',
          }}
        />

        {/* AXIS wordmark inside the clear window */}
        <div
          className="absolute"
          style={{ left: '23%', top: '18%' }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-mono mb-1.5">
            Axis Laboratory
          </p>
          <h1
            className="text-[clamp(2.5rem,7vw,6.5rem)] leading-none tracking-[-0.05em] text-white/95 select-none"
            style={{ fontFamily: "'Zen Dots', sans-serif", fontWeight: 400 }}
          >
            AXIS
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mt-2.5">
            Industrial Perfumery
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono">Scroll</span>
          <motion.div
            className="w-px h-8 bg-white/20"
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
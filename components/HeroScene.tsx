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

  // ── Parallax values for the imagery ──
  const portraitParallaxX = useTransform(smoothX, [0, 1], [-18, 18])
  const portraitParallaxY = useTransform(smoothY, [0, 1], [-18, 18])
  const handParallaxX     = useTransform(fastX, [0, 1], [-36, 36])
  const handParallaxY     = useTransform(fastY, [0, 1], [-36, 36])

  // Scroll-linked frosted pane translation
  const { scrollY } = useScroll()
  const paneY = useTransform(scrollY, [0, 600], [0, -120])

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
      {/* ── LAYER 1: HEAVILY BLURRED BACKDROP OVERLAY (The "Frosted Sheet" base) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Blurring the static environment background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ 
            backgroundImage: `url(${BG})`,
            filter: 'blur(32px) brightness(0.95) saturate(1.2)'
          }}
        />

        {/* Blurring the parallax portrait imagery */}
        <motion.div
          className="absolute inset-y-0 right-0 w-[60%] flex items-end justify-center scale-105"
          style={{ 
            x: portraitParallaxX, 
            y: portraitParallaxY,
            translateX: '50px',
            scale: 1.08,
            filter: 'blur(32px) brightness(0.95)'
          }}
        >
          <img src={PORTRAIT} alt="" className="h-[95%] w-auto object-contain object-bottom select-none" />
        </motion.div>

        {/* Blurring the parallax hand and bottle */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[65%] flex items-end justify-center scale-105"
          style={{ 
            x: handParallaxX, 
            y: handParallaxY,
            translateX: '-40px',
            translateY: '20px',  
            scale: 1.12,
            filter: 'blur(32px) brightness(0.95)'
          }}
        >
          <img src={HAND} alt="" className="h-[90%] w-auto object-contain object-bottom select-none" />
        </motion.div>

        {/* Tactile Micro-Grit Noise texture across the entire screen frosting */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `url("${NOISE_SVG}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '140px 140px',
          }}
        />
        
        {/* Ambient Dark Overlay to increase interface readability */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* ── LAYER 2: SHARP INSIDE CONTENT WINDOW (Carved out via clipPath) ── */}
      <div 
        className="absolute inset-0 z-20"
        style={{
          clipPath: 'inset(12% 15% 12% 15%)' // Sharp crop boundaries to create the open view frame
        }}
      >
        {/* Crystal Clear Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG})` }}
        />

        {/* Crystal Clear Portrait */}
        <motion.div
          className="absolute inset-y-0 right-0 w-[60%] flex items-end justify-center"
          style={{ 
            x: portraitParallaxX, 
            y: portraitParallaxY,
            translateX: '50px',
            scale: 1.08          
          }}
        >
          <img src={PORTRAIT} alt="Model portrait" className="h-[95%] w-auto object-contain object-bottom select-none" />
        </motion.div>

        {/* Crystal Clear Hand & Bottle */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[65%] flex items-end justify-center"
          style={{ 
            x: handParallaxX, 
            y: handParallaxY,
            translateX: '-40px',
            translateY: '20px',  
            scale: 1.12          
          }}
        >
          <img src={HAND} alt="Hand holding AXIS canister" className="h-[90%] w-auto object-contain object-bottom select-none" />
        </motion.div>
      </div>

      {/* ── LAYER 3: THE GLASS EDGE BEVEL & TEXT INTERFACE ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30"
        style={{ y: paneY }}
      >
        {/* Beveled Outer Border Outline framing the sharp crop window */}
        <div
          className="absolute"
          style={{
            left: '15%', top: '12%',
            width: '70%', height: '76%',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: `
              0 0 40px rgba(0, 0, 0, 0.6),
              inset 0 0 24px rgba(0, 0, 0, 0.3)
            `, // Casts crisp shadows inwards and outwards along the glass cut lines
          }}
        >
          {/* Top Edge Light Glint reflection line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
            }}
          />

          {/* Left Edge Light Glint reflection line */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-[1px]"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6), transparent, rgba(255, 255, 255, 0.1))'
            }}
          />
        </div>

        {/* Typography Content Overlays */}
        <div
          className="absolute flex flex-col justify-between"
          style={{ left: '18%', top: '16%', width: '64%', height: '68%' }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-mono mb-2">
              Axis Laboratory [System Rev 1.0]
            </p>
            <h1
              className="text-[clamp(3.5rem,10vw,8.5rem)] leading-none tracking-[-0.06em] text-white/95 select-none"
              style={{ fontFamily: "'Zen Dots', sans-serif", fontWeight: 400 }}
            >
              AXIS
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono mt-3">
              Industrial Perfumery Formulation
            </p>
          </div>
        </div>

        {/* Bottom Scroll Context Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono">Scroll Context</span>
          <motion.div
            className="w-px h-10 bg-white/30"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
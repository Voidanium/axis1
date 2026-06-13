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
      {/* ── Layer 1: Static backdrop ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      />

      {/* ── Layer 2: Portrait (Shifted Right & Adjustable) ── */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[60%] flex items-end justify-center z-10"
        style={{ 
          x: portraitParallaxX, 
          y: portraitParallaxY,
          translateX: '50px',
          translateY: '0px',   
          scale: 1.08          
        }}
      >
        <img
          src={PORTRAIT}
          alt="Model portrait"
          className="h-[95%] w-auto object-contain object-bottom select-none"
          style={{ filter: 'contrast(1.05)' }}
          draggable={false}
        />
      </motion.div>

      {/* ── Layer 3: Hand & Canister (Shifted Left & Adjustable) ── */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[65%] flex items-end justify-center z-20"
        style={{ 
          x: handParallaxX, 
          y: handParallaxY,
          translateX: '-40px',
          translateY: '20px',  
          scale: 1.12          
        }}
      >
        <img
          src={HAND}
          alt="Hand holding AXIS canister"
          className="h-[90%] w-auto object-contain object-bottom select-none"
          style={{ filter: 'contrast(1.1) brightness(0.95)' }}
          draggable={false}
        />
      </motion.div>

      {/* ── Layer 4: Central Glass Card (With Top & Left Edge Highlights) ── */}
      <motion.div
        className="absolute z-30 overflow-hidden"
        style={{ 
          y: paneY,
          left: '15%', 
          top: '12%',
          width: '70%', 
          height: '76%',
        }}
      >
        {/* Core Glass Sheet Container */}
        <div
          className="absolute inset-0 rounded-[4px]"
          style={{
            backdropFilter: 'blur(16px) saturate(1.25) brightness(1.02)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.25) brightness(1.02)',
            backgroundColor: 'rgba(255, 255, 255, 0.12)', // Elevated alpha matching your class logic
            border: '1px solid rgba(255, 255, 255, 0.2)',  // Base structural border
            boxShadow:
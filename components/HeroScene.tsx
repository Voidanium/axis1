'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion'

const BG       = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Extract_background_from_image_202606122119-oIaSZ3xENHVAVMzYiLabTkrkR5FsQb.jpeg'
const PORTRAIT = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled34_20260612213314-dtIhJ1Xkh0VMWw2vSq8wFetU1AWmtb.png'
const HAND     = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled33_20260612211425-wCCttcWOweB1NI5h17uUabeR1ROV7V.png'

const NOISE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E`

// ── 🎛️ MANUAL LAYER POSITIONING CONFIGURATION ──
// Adjust these values to position, scale, or push the layers anywhere you want!
const CONF_BG = {
  scale: 1.05,
  positionX: 'center', // CSS background-position values ('center', 'left', '50% 20%', etc.)
  positionY: 'center'
}

const CONF_PORTRAIT = {
  width: '60%',        // Container width bounds
  scale: 1.08,         // Image scaling factor
  translateX: '15px',  // Base horizontal shift position
  translateY: '0px',   // Base vertical shift position
  parallaxX: [-18, 18], // Mouse response range [Min, Max]
  parallaxY: [-18, 18]
}

const CONF_HAND = {
  width: '65%',
  scale: 1.12,
  translateX: '190px',
  translateY: '20px',
  parallaxX: [-36, 36],
  parallaxY: [-36, 36]
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Raw mouse motion values (0–1 normalised)
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)

  // Smooth springs for fluid tracking movement
  const springCfg = { stiffness: 60, damping: 20, mass: 1 }
  const fastCfg   = { stiffness: 80, damping: 18, mass: 0.8 }

  const smoothX = useSpring(rawX, springCfg)
  const smoothY = useSpring(rawY, springCfg)
  const fastX   = useSpring(rawX, fastCfg)
  const fastY   = useSpring(rawY, fastCfg)

  // Parallax value transformations hooked up to the top configs
  const portraitParallaxX = useTransform(smoothX, [0, 1], CONF_PORTRAIT.parallaxX)
  const portraitParallaxY = useTransform(smoothY, [0, 1], CONF_PORTRAIT.parallaxY)
  const handParallaxX     = useTransform(fastX, [0, 1], CONF_HAND.parallaxX)
  const handParallaxY     = useTransform(fastY, [0, 1], CONF_HAND.parallaxY)

  // Scroll dynamics
  const { scrollY } = useScroll()
  const paneY = useTransform(scrollY, [0, 600], [0, -120])
  const counterScrollY = useTransform(scrollY, [0, 600], [0, 120])

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
      {/* ── LAYER 1: FIXED HEAVILY BLURRED FROST BACKGROUND (Set to exactly 25px) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Blurred Base Background */}
        <div
          className="absolute inset-0 bg-cover"
          style={{ 
            backgroundImage: `url(${BG})`,
            backgroundPosition: `${CONF_BG.positionX} ${CONF_BG.positionY}`,
            filter: 'blur(25px) brightness(0.95) saturate(1.2)',
            scale: CONF_BG.scale
          }}
        />

        {/* Blurred Portrait */}
        <motion.div
          className="absolute inset-y-0 right-0 flex items-end justify-center"
          style={{ 
            width: CONF_PORTRAIT.width,
            x: portraitParallaxX, 
            y: portraitParallaxY,
            translateX: CONF_PORTRAIT.translateX,
            translateY: CONF_PORTRAIT.translateY,
            scale: CONF_PORTRAIT.scale * 1.02, // Marginally padded to blend the blur edges smoothly
            filter: 'blur(25px) brightness(0.95)'
          }}
        >
          <img src={PORTRAIT} alt="" className="h-[95%] w-auto object-contain object-bottom select-none" />
        </motion.div>

        {/* Blurred Hand */}
        <motion.div
          className="absolute inset-y-0 left-0 flex items-end justify-center"
          style={{ 
            width: CONF_HAND.width,
            x: handParallaxX, 
            y: handParallaxY,
            translateX: CONF_HAND.translateX,
            translateY: CONF_HAND.translateY,
            scale: CONF_HAND.scale * 1.02,
            filter: 'blur(25px) brightness(0.95)'
          }}
        >
          <img src={HAND} alt="" className="h-[90%] w-auto object-contain object-bottom select-none" />
        </motion.div>

        {/* Tactile Surface Noise grit overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `url("${NOISE_SVG}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '140px 140px',
          }}
        />
        
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* ── LAYER 2: SCROLLING CLEAR VIEWPORT WINDOW ── */}
      <motion.div
        className="absolute z-30"
        style={{ 
          y: paneY,
          left: '15%', 
          top: '12%',
          width: '70%', 
          height: '76%',
        }}
      >
        {/* Core Sharp Cutout Container */}
        <div 
          className="absolute inset-0 overflow-hidden border border-white/15 rounded-[4px]"
          style={{
            boxShadow: `
              0 20px 50px rgba(0, 0, 0, 0.6),
              inset 0 0 24px rgba(0, 0, 0, 0.2)
            `
          }}
        >
          {/* THE MASK ENGINE: Parallax calculations automatically map inside here */}
          <motion.div 
            className="absolute"
            style={{
              y: counterScrollY,
              left: '-21.43%',   // Dynamic 15vw tracking ratio compensation
              top: '-15.78%',    // Dynamic 12vh tracking ratio compensation
              width: '142.85%',  // Maps 70% viewport space perfectly back up to a crisp 100%
              height: '131.57%', // Maps 76% viewport space perfectly back up to a crisp 100%
            }}
          >
            {/* Crystal Clear Background */}
            <div
              className="absolute inset-0 bg-cover"
              style={{ 
                backgroundImage: `url(${BG})`,
                backgroundPosition: `${CONF_BG.positionX} ${CONF_BG.positionY}`
              }}
            />

            {/* Crystal Clear Portrait */}
            <motion.div
              className="absolute inset-y-0 right-0 flex items-end justify-center"
              style={{ 
                width: CONF_PORTRAIT.width,
                x: portraitParallaxX, 
                y: portraitParallaxY,
                translateX: CONF_PORTRAIT.translateX,
                translateY: CONF_PORTRAIT.translateY,
                scale: CONF_PORTRAIT.scale          
              }}
            >
              <img src={PORTRAIT} alt="Model portrait" className="h-[95%] w-auto object-contain object-bottom select-none" />
            </motion.div>

            {/* Crystal Clear Hand & Canister */}
            <motion.div
              className="absolute inset-y-0 left-0 flex items-end justify-center"
              style={{ 
                width: CONF_HAND.width,
                x: handParallaxX, 
                y: handParallaxY,
                translateX: CONF_HAND.translateX,
                translateY: CONF_HAND.translateY,
                scale: CONF_HAND.scale          
              }}
            >
              <img src={HAND} alt="Hand holding AXIS canister" className="h-[90%] w-auto object-contain object-bottom select-none" />
            </motion.div>
          </motion.div>

          {/* Top Edge Reflective Glint line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[1px] z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
            }}
          />

          {/* Left Edge Reflective Glint line */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-[1px] z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6), transparent, rgba(255, 255, 255, 0.1))'
            }}
          />
        </div>

        {/* Typography Interface Content Overlays */}
        <div className="absolute inset-0 p-[7%] flex flex-col justify-between pointer-events-none z-20">
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
      </motion.div>

      {/* Global Bottom Navigation Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono">Scroll Context</span>
        <motion.div
          className="w-px h-10 bg-white/30"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
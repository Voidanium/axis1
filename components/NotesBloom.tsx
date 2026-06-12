'use client'

import { motion } from 'framer-motion'

interface NoteItem {
  id: string
  image: string
  label: string
  offsetX: number
  offsetY: number
  size: number
  rotate?: number
}

interface NotesBloomProps {
  notes: NoteItem[]
  isVisible: boolean
}

export function NotesBloom({ notes, isVisible }: NotesBloomProps) {
  // Calibrated global diffusive glow colors (transparent, highly blended aura)
  const glowCoreColor1 = 'rgba(180, 240, 220, 0.2)'  // Luminous teal/white (Aura 1)
  const glowCoreColor2 = 'rgba(230, 210, 180, 0.15)' // Warm amber/gold (Aura 2)

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        zIndex: 0,
        overflow: 'visible',
      }}
    >
      {/* High-fidelity SVG Filter - Vaporizes black but preserves internal texture contrast */}
      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="perfect-black-remove" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      3 3 3 0 -2.5" 
            />
          </filter>
        </defs>
      </svg>

      {/* ============================================================
        1. THE UNIFIED ORBITING GLOW LAYER (TWO DIFFUSIVE ENTITIES)
        ============================================================
      */}
      <div className="absolute inset-0 z-0 overflow-visible">
        {/* AURA 1: Large Luminous Teal/White Drift */}
        <motion.div
          className="absolute rounded-full blur-[110px]"
          style={{
            width: 260,
            height: 260,
            marginLeft: -130,
            marginTop: -130,
            left: '50%',
            top: '50%',
            background: `radial-gradient(circle, ${glowCoreColor1} 0%, rgba(0,0,0,0) 80%)`,
            mixBlendMode: 'plus-lighter',
            zIndex: 5, // Anchored safely in the middle of the blending stack
            willChange: 'transform',
          }}
          initial={{ opacity: 0, scale: 0.1, x: 0, y: 0 }}
          animate={
            isVisible
              ? {
                  opacity: 1,
                  scale: [1, 1.25, 0.9, 1.1, 1],
                  x: [0, 90, -80, 70, 0], 
                  y: [0, -110, 50, -90, 0],
                }
              : {
                  opacity: 0,
                  scale: 0.1,
                  x: 0,
                  y: 0,
                }
          }
          transition={
            isVisible
              ? {
                  opacity: { duration: 0.5 },
                  scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                }
              : { duration: 0.3, ease: "easeInOut" }
          }
        />

        {/* AURA 2: Medium Amber Warmth Drift */}
        <motion.div
          className="absolute rounded-full blur-[90px]"
          style={{
            width: 210,
            height: 210,
            marginLeft: -105,
            marginTop: -105,
            left: '50%',
            top: '50%',
            background: `radial-gradient(circle, ${glowCoreColor2} 0%, rgba(0,0,0,0) 80%)`,
            mixBlendMode: 'plus-lighter',
            zIndex: 15, // Blends over the top of components natively
            willChange: 'transform',
          }}
          initial={{ opacity: 0, scale: 0.1, x: 0, y: 0 }}
          animate={
            isVisible
              ? {
                  opacity: 1,
                  scale: [1, 1.15, 0.95, 1.05, 1],
                  x: [0, -90, 80, -70, 0],
                  y: [0, 110, -50, 90, 0],
                }
              : {
                  opacity: 0,
                  scale: 0.1,
                  x: 0,
                  y: 0,
                }
          }
          transition={
            isVisible
              ? {
                  opacity: { duration: 0.5 },
                  scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 16, repeat: Infinity, ease: "easeInOut" },
                }
              : { duration: 0.3, ease: "easeInOut" }
          }
        />
      </div>

      {/* ============================================================
        2. THE CRISP GLASS ELEMENTS LAYER (STATIC FRAMING)
        ============================================================
      */}
      <div className="absolute inset-0 z-10 overflow-visible">
        {notes.map((note, index) => {
          const baseRotate = note.rotate ?? 0
          
          return (
            <motion.div
              key={note.id}
              className="absolute flex items-center justify-center"
              style={{
                width: note.size,
                height: note.size,
                marginLeft: -note.size / 2,
                marginTop: -note.size / 2,
              }}
              initial={{ 
                opacity: 0, 
                scale: 0.01, 
                left: '50%',
                top: '50%',
                rotate: baseRotate - 30 
              }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      scale: 1,
                      left: `calc(50% + ${note.offsetX}px)`,
                      top: `calc(50% + ${note.offsetY}px)`,
                      rotate: baseRotate,
                    }
                  : {
                      opacity: 0,
                      scale: 0.01,
                      left: '50%',
                      top: '50%',
                      rotate: baseRotate - 20,
                    }
              }
              transition={
                isVisible
                  ? {
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.05,
                    }
                  : { 
                      duration: 0.3, 
                      ease: "easeInOut",
                      delay: (notes.length - 1 - index) * 0.02 
                    }
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={note.image}
                alt={note.label}
                className="w-full h-full relative z-10"
                style={{
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'url(#perfect-black-remove)',
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
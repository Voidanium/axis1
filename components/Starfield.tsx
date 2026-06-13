'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: string
}

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([])
  const { scrollY } = useScroll()

  // Subtle multi-plane parallax depth limits
  const layerSlow = useTransform(scrollY, [0, 1200], [0, -40])
  const layerMid  = useTransform(scrollY, [0, 1200], [0, -80])

  // Deliberately hide stars on Hero, fade in fully by 500px scroll depth
  const globalOpacity = useTransform(scrollY, [0, 200, 500], [0, 0, 1])

  useEffect(() => {
    const generatedStars = Array.from({ length: 70 }, (_, i) => {
      const sizeRandom = Math.random()
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: sizeRandom > 0.85 ? 1.5 : sizeRandom > 0.4 ? 1.1 : 0.8,
        baseOpacity: Math.random() * 0.25 + 0.1, 
        twinkleSpeed: `${4 + (i % 3) * 2}s` 
      }
    })
    setStars(generatedStars)
  }, [])

  const backgroundStars = stars.filter((_, i) => i % 2 === 0)
  const foregroundStars = stars.filter((_, i) => i % 2 === 1)

  return (
    <motion.div 
      style={{ opacity: globalOpacity }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-transparent mix-blend-screen"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-subtle-twinkle {
          animation: subtleTwinkle var(--twinkle-duration, 6s) ease-in-out infinite;
        }
      `}} />

      {/* Deep Layer */}
      <motion.div style={{ y: layerSlow }} className="absolute inset-0 w-full h-[130vh]">
        {backgroundStars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-neutral-400 rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.baseOpacity,
            }}
          />
        ))}
      </motion.div>

      {/* Mid/Twinkle Layer */}
      <motion.div style={{ y: layerMid }} className="absolute inset-0 w-full h-[130vh]">
        {foregroundStars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-subtle-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.baseOpacity,
              boxShadow: star.size > 1.2 ? '0 0 3px rgba(255, 255, 255, 0.2)' : 'none',
              ['--twinkle-duration' as any]: star.twinkleSpeed,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
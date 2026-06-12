'use client'

import { useEffect, useState } from 'react'

export function HeroSection() {
  const [wordmarkOpacity, setWordmarkOpacity] = useState(1)
  const [wordmarkY, setWordmarkY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const fadeThreshold = 300

      const opacity = Math.max(0, 1 - scrollPos / fadeThreshold)
      setWordmarkOpacity(opacity)
      setWordmarkY(scrollPos * 0.2)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 hero-background z-0" />

      {/* Large Wordmark */}
      <div className="relative z-10 w-full flex justify-center -mb-20 will-change-transform" id="large-wordmark" style={{ opacity: wordmarkOpacity, transform: `translateY(${wordmarkY}px)` }}>
        <h1 className="text-[240px] leading-none tracking-[-0.08em] text-white select-none opacity-95" style={{ fontFamily: "'Zen Dots', sans-serif", fontWeight: 400 }}>
          AXIS
        </h1>
      </div>
    </>
  )
}

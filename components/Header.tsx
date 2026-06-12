'use client'

import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [smallLogoOpacity, setSmallLogoOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const fadeThreshold = 300

      if (scrollPos > 100) {
        setIsScrolled(true)
        setSmallLogoOpacity(Math.min(1, (scrollPos - 100) / (fadeThreshold - 100)))
      } else {
        setIsScrolled(false)
        setSmallLogoOpacity(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`flex justify-between items-center px-12 py-8 w-full fixed top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/40 backdrop-blur-md' : 'bg-black/0'
      }`}
      id="main-header"
    >
      <div className="flex items-center w-1/4">
        <div className="w-10 h-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
            hub
          </span>
        </div>
      </div>

      {/* Central Small Wordmark */}
      <div className="flex justify-center items-center flex-1 axis-small-logo" style={{ opacity: smallLogoOpacity }}>
        <span className="text-2xl text-white tracking-widest" style={{ fontFamily: "'Zen Dots', sans-serif", fontWeight: 400 }}>
          AXIS
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-16 w-1/4 justify-center">
        <a
          className="text-lg lowercase tracking-wider text-on-surface hover:text-white transition-colors"
          href="#"
          style={{ fontFamily: "'Bitcount Grid Single', system-ui", fontVariationSettings: "'slnt' 0, 'CRSV' 0.5, 'ELSH' 0, 'ELXP' 0" }}
        >
          discover
        </a>
        <a
          className="text-lg capitalize tracking-wider text-on-surface hover:text-white transition-colors"
          href="#"
          style={{ fontFamily: "'Bitcount Grid Single', system-ui", fontVariationSettings: "'slnt' 0, 'CRSV' 0.5, 'ELSH' 0, 'ELXP' 0" }}
        >
          Gallery
        </a>
        <a
          className="text-lg capitalize tracking-wider text-on-surface hover:text-white transition-colors"
          href="#"
          style={{ fontFamily: "'Bitcount Grid Single', system-ui", fontVariationSettings: "'slnt' 0, 'CRSV' 0.5, 'ELSH' 0, 'ELXP' 0" }}
        >
          About us
        </a>
      </nav>

      {/* Shopping Bag */}
      <div className="flex items-center justify-end w-1/4">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:border-white/40 transition-all text-white">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
            shopping_bag
          </span>
        </button>
      </div>
    </header>
  )
}

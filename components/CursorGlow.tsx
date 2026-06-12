'use client'

import { useEffect } from 'react'

export function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById('cursor-glow')

    const handleMouseMove = (e: MouseEvent) => {
      if (glow) {
        glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div id="cursor-glow" />
}

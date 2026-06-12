'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  fadeSpeed: number
  targetOpacity: number
}

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    
    // Low density: keep the count minimal so it doesn't crowd your products
    const maxParticles = 22 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (initRandomY = false): Particle => {
      const size = Math.random() * 8 + 4 // Varying sizes for depth-of-field effect
      return {
        x: Math.random() * canvas.width,
        // Spread evenly on first boot, otherwise spawn completely off-screen bottom
        y: initRandomY ? Math.random() * canvas.height : canvas.height + 20,
        size: size,
        speedX: (Math.random() - 0.5) * 0.12, // Lazily drifting sideways
        speedY: -(Math.random() * 0.18 + 0.08), // Ghostly, floating upwards
        opacity: 0,
        targetOpacity: Math.random() * 0.22 + 0.05, // Cap maximum brightness at a ghost-like 27%
        fadeSpeed: 0.002 + Math.random() * 0.003,
      }
    }

    const init = () => {
      resizeCanvas()
      particles = []
      for (let i = 0; i < maxParticles; i++) {
        particles.push(createParticle(true))
      }
    }

    const drawAndUpdate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        // Handle organic fade-in and fade-out states
        if (p.opacity < p.targetOpacity) {
          p.opacity += p.fadeSpeed
        }

        // Float updates
        p.x += p.speedX
        p.y += p.speedY

        // Draw particle with an ultra-soft out-of-focus blur profile
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${p.opacity * 0.4})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Recycle particle seamlessly once it floats past the top edge
        if (p.y < -50 || p.x < -50 || p.x > canvas.width + 50) {
          particles[index] = createParticle(false)
        }
      })

      animationFrameId = requestAnimationFrame(drawAndUpdate)
    }

    window.addEventListener('resize', resizeCanvas)
    init()
    drawAndUpdate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none z-0 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
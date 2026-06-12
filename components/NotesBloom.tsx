'use client'

import { motion } from 'framer-motion'

interface NoteItem {
  id: string
  image: string
  label: string
  // Absolute offsets from center of card image area (positive x = right, positive y = down)
  offsetX: number
  offsetY: number
  size: number
  rotate?: number
  delay?: number
}

interface NotesBloomProps {
  notes: NoteItem[]
  isVisible: boolean
}

export function NotesBloom({ notes, isVisible }: NotesBloomProps) {
  return (
    // Absolute overlay within isolate container
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        zIndex: 15,
        overflow: 'visible',
      }}
    >
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute"
          style={{
            left: `calc(50% + ${note.offsetX}px)`,
            top: `calc(50% + ${note.offsetY}px)`,
            width: note.size,
            height: note.size,
            marginLeft: -note.size / 2,
            marginTop: -note.size / 2,
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, scale: 0.05, rotate: note.rotate ?? 0 }}
          animate={
            isVisible
              ? {
                  opacity: 1,
                  scale: 1,
                  rotate: note.rotate ?? 0,
                  transition: {
                    type: 'spring',
                    damping: 18,
                    stiffness: 160,
                    delay: note.delay ?? 0,
                  },
                }
              : {
                  opacity: 0,
                  scale: 0.05,
                  rotate: note.rotate ?? 0,
                  transition: { duration: 0.18, delay: 0 },
                }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={note.image}
            alt={note.label}
            className="w-full h-full mix-blend-screen"
            style={{
              mixBlendMode: 'screen',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 0 12px rgba(220,220,228,0.5))',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

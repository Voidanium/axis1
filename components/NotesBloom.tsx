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
    // Covers entire card; positioned to center notes over the bottle image area
    <div
      className="pointer-events-none"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '60%' }}>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            style={{
              position: 'absolute',
              // Center of the image area, then offset
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
              style={{
                mixBlendMode: 'lighten',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 0 16px rgba(200,220,255,0.4))',
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

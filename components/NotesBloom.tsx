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
  delay?: number
}

interface NotesBloomProps {
  notes: NoteItem[]
  isVisible: boolean
}

export function NotesBloom({ notes, isVisible }: NotesBloomProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        zIndex: 0,
        overflow: 'visible',
      }}
    >
      {/* Hidden SVG Filter that forces pure black to become transparent */}
      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            {/* This matrix keeps the Red, Green, and Blue channels, but calculates Alpha based on brightness */}
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      1 1 1 0 -0.1" 
            />
          </filter>
        </defs>
      </svg>

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
            className="w-full h-full"
            style={{
              objectFit: 'contain',
              display: 'block',
              filter: 'url(#remove-black)', // Forces the browser to run the transparency filter
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

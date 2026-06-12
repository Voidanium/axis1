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
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        zIndex: 0,
        overflow: 'visible',
      }}
    >
      {/* Our unbreakable transparency filter */}
      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
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

      {notes.map((note, index) => {
        // Base rotation value or 0 if undefined
        const baseRotate = note.rotate ?? 0
        
        return (
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
            initial={{ 
              opacity: 0, 
              scale: 0.1, 
              rotate: baseRotate - 20 // Starts twisted slightly counter-clockwise
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    scale: 1,
                    rotate: baseRotate, // Smoothly twists to final design angle
                    transition: {
                      // Custom cinematic ease-out curve: explosive start, ultra-slow finish
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1], 
                      // Staggers each note by an elegant 60ms sequence based on its index
                      delay: index * 0.06, 
                    },
                  }
                : {
                    opacity: 0,
                    scale: 0.1,
                    rotate: baseRotate - 15,
                    transition: { 
                      duration: 0.25, 
                      ease: "easeInOut",
                      // Closes slightly staggered in reverse
                      delay: (notes.length - 1 - index) * 0.03 
                    },
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
                filter: 'url(#remove-black)',
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
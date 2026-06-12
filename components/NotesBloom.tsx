'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface NoteItem {
  id: string
  image: string
  angle: number
  distance: number
  label: string
}

interface NotesBloomProps {
  notes: NoteItem[]
  isVisible: boolean
}

export function NotesBloom({ notes, isVisible }: NotesBloomProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const noteVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      x: 0,
      y: 0,
    },
    visible: (angle: number) => {
      const radians = (angle * Math.PI) / 180
      const x = Math.cos(radians) * 280
      const y = Math.sin(radians) * 280
      return {
        opacity: 1,
        scale: 1,
        x,
        y,
        transition: {
          type: 'spring',
          damping: 16,
          stiffness: 180,
          mass: 1.2,
        },
      }
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute"
          custom={note.angle}
          variants={noteVariants}
        >
          <div className="relative flex flex-col items-center gap-2">
            <Image
              src={note.image}
              alt={note.label}
              width={120}
              height={120}
              className="w-28 h-28 object-contain"
              style={{
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 20px rgba(220, 220, 228, 0.3))',
              }}
            />
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-light whitespace-nowrap">
              {note.label}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

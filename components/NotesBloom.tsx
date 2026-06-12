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
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  }

  const noteVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
      x: 0,
      y: 0,
    },
    visible: (angle: number) => {
      const radians = (angle * Math.PI) / 180
      const x = Math.cos(radians) * 140
      const y = Math.sin(radians) * 140
      return {
        opacity: 1,
        scale: 1,
        x,
        y,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 1,
        },
      }
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      x: 0,
      y: 0,
      transition: {
        duration: 0.25,
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
          <div className="relative flex flex-col items-center gap-1">
            <div
              style={{
                mixBlendMode: 'screen',
              }}
            >
              <Image
                src={note.image}
                alt={note.label}
                width={100}
                height={100}
                className="w-24 h-24 object-contain drop-shadow-lg"
                priority
              />
            </div>
            <span className="text-[8px] uppercase tracking-widest text-white/30 font-light whitespace-nowrap">
              {note.label}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

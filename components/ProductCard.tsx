'use client'

import { useState } from 'react'
import Image from 'next/image'
import { NotesBloom } from './NotesBloom'

interface ProductCardProps {
  name: string
  type: string
  volume: string
  smallVolume: string
  image: string
  notes?: Array<{
    id: string
    image: string
    label: string
    offsetX: number
    offsetY: number
    size: number
    rotate?: number
    delay?: number
  }>
}

export function ProductCard({ name, type, volume, smallVolume, image, notes }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <div
      className="glass-card-inset rounded-[32px] p-8 flex flex-col min-h-[580px] relative group overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image + Notes container with strict stacking context */}
      <div className="isolate flex-1 flex items-center justify-center mb-6 relative">
        <Image
          alt={name}
          className="h-[320px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 relative z-10"
          src={image}
          width={320}
          height={320}
        />

        {/* Notes bloom - inside isolate container for proper blend context */}
        {notes && <NotesBloom notes={notes} isVisible={isHovered} />}
      </div>

      {/* Product Info */}
      <div className="mt-auto space-y-1 relative z-30">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">{type}</p>
        <h3
          className="text-4xl text-white"
          style={{ fontFamily: "'Bitcount Grid Double', system-ui", fontVariationSettings: "'slnt' 0, 'CRSV' 0.5, 'ELSH' 0, 'ELXP' 0" }}
        >
          {name}
        </h3>

        <div className="flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-light text-white leading-none">
              {volume} <span className="text-sm align-top">ml</span>
            </span>
            <span className="text-[10px] text-white/40 uppercase tracking-tighter">{smallVolume}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`backdrop-blur-md text-white text-[12px] px-6 py-2.5 rounded-full transition-all active:scale-95 font-medium border border-white/10 ${
              isAdded ? 'bg-white text-black' : 'bg-white/30 hover:bg-white/40'
            }`}
          >
            {isAdded ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}


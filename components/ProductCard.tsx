'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { NotesBloom } from './NotesBloom'

interface ProductCardProps {
  name: string
  type: string
  image: string
  prices: { '50ml': string; '100ml': string }
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

export function ProductCard({ name, type, image, prices, notes }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml')

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const currentPrice = prices[selectedSize]

  return (
    <div
      className="glass-card-inset rounded-[32px] p-8 flex flex-col min-h-[580px] relative group overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ isolation: 'isolate' }}
    >
      {/* Image + Notes container */}
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
      <div className="mt-auto space-y-3 relative z-30">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">{type}</p>
        <h3
          className="text-4xl text-white"
          style={{ fontFamily: "'Bitcount Grid Double', system-ui", fontVariationSettings: "'slnt' 0, 'CRSV' 0.5, 'ELSH' 0, 'ELXP' 0" }}
        >
          {name}
        </h3>

        {/* Size Selector - Minimalist pill buttons */}
        <div className="flex gap-2 pt-1">
          {(['50ml', '100ml'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`text-[11px] px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                selectedSize === size
                  ? 'bg-white/40 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Price Row - Animated price with currency symbol */}
        <div className="flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-0.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPrice}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="flex items-baseline gap-0.5"
              >
                <span className="text-2xl font-light text-white leading-none">{currentPrice}</span>
                <span
                  className="text-lg text-white/80 leading-none"
                  style={{ fontFamily: 'Shopvert, system-ui' }}
                >
                  {'\uE900'}
                </span>
              </motion.div>
            </AnimatePresence>
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

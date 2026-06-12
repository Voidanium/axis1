'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { CartItem } from '@/lib/useCart'

interface CartOverlayProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (name: string, size: string, delta: number) => void
  onRemove: (name: string, size: string) => void
  total: number
}

const CurrencySymbol = () => (
  <span style={{ fontFamily: 'Shopvert, system-ui' }}>{'\uE900'}</span>
)

export function CartOverlay({ isOpen, onClose, items, onUpdateQuantity, onRemove, total }: CartOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-2xl bg-black/50"
            onClick={onClose}
          />

          {/* Drifting aura orbs behind the vessel */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(100,180,170,0.07) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ x: [-60, 60, -60], y: [-40, 40, -40] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,160,90,0.06) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ x: [60, -60, 60], y: [40, -40, 40] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Cart Vessel */}
          <motion.div
            className="relative w-full max-w-xl mx-6 rounded-[32px] p-8 flex flex-col gap-6"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Axis Laboratory</p>
                <h2 className="text-sm uppercase tracking-[0.25em] text-white/80 font-medium">Your Selection</h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Close cart"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <p className="text-white/20 text-xs uppercase tracking-[0.2em]">No items selected</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.name}-${item.size}`}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16, height: 0 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="shrink-0 w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="w-12 h-12 object-contain"
                        />
                      </div>

                      {/* Name + size */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-white text-xl tracking-widest truncate"
                          style={{ fontFamily: "'Bitcount Grid Double', system-ui" }}
                        >
                          {item.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-0.5">{item.size}</p>
                      </div>

                      {/* Quantity adjuster */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.name, item.size, -1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors text-lg leading-none"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.name, item.size, 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors text-lg leading-none"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0 w-16">
                        <span className="text-white text-sm font-light">
                          {(parseFloat(item.price) * item.quantity).toFixed(0)}
                          <CurrencySymbol />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/30">Total</span>
                  <span className="text-2xl font-light text-white">
                    {total.toFixed(0)}<CurrencySymbol />
                  </span>
                </div>

                {/* Checkout button */}
                <button
                  className="w-full py-4 rounded-2xl text-[12px] uppercase tracking-[0.3em] font-medium text-white/90 transition-all active:scale-[0.98] hover:brightness-110"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

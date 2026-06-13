'use client'

import { Header } from '@/components/Header'
import { HeroScene } from '@/components/HeroScene'
import { Starfield } from '@/components/Starfield' 
import { ProductCard } from '@/components/ProductCard'
import { ResearchSection } from '@/components/ResearchSection'
import { Footer } from '@/components/Footer'
import { CursorGlow } from '@/components/CursorGlow'
import { CartOverlay } from '@/components/CartOverlay'
import { useCart } from '@/lib/useCart'

export default function Home() {
  const { items, isOpen, setIsOpen, addItem, updateQuantity, removeItem, total } = useCart()
  
  const fiercNotes = [
    {
      id: 'seaweed',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seaweed_sculpted_from_glass_202606120611-yEUlt2U52jtDBSoDaLvw4QmvZG37ye.jpeg',
      label: 'Seaweed',
      offsetX: -77,  
      offsetY: -58, 
      size: 250,     
      rotate: -30,
    },
    {
      id: 'water',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Water_splash_sculpted_glass_ice_202606120628-z4VMzIpbCUQ3mN9MPFzQwlRqv8QBf6.jpeg',
      label: 'Water',
      offsetX: 30,   
      offsetY: -50,
      size: 250,
      rotate: 45,
    },
    {
      id: 'bergamot',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bergamot_sculpted_out_of_glass_202606120609-XQ7XM7tui9wKhfXhFpAjK7nkIhzWmT.jpeg',
      label: 'Bergamot',
      offsetX: 45,  
      offsetY: 170,
      size: 120,
      rotate: -10,
    },
    {
      id: 'musk',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Musk_crystal_sculpted_glass_ice_202606120610-TDKhUwJByZhL89B54dwEevp5quhxHR.jpeg',
      label: 'Musk',
      offsetX: 65,   
      offsetY: 70,
      size: 115,
      rotate: 68,
    },
    {
      id: 'wood',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wood_sculpted_glass_ice_202606120608-yTpB9VT6DLI9tpIK7uu2uCzPBdZYNe.jpeg',
      label: 'Wood',
      offsetX: -57,  
      offsetY: 110,  
      size: 180,     
      rotate: -9
    },
  ]

  const products = [
    {
      name: 'Courage',
      type: 'Extrait de Parfum',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmygsuogGXbpvb2eLy2PJl44pCXzDTj7KlzPQpQOhFyswV1AkayaPyG0PdDI5zp8LjmFkY6qRBhSrz4D13Es8tXnYfBJ1vpWDjk9A1892ktqUGahIAQb-87Q86goJATWxN2zqj0XZOJOFVQq-w49vf07NUgJpUZ0p-UcyQ2tuA_uVYtdf6cgkN7opxWoBAe90UBnE_xCObEgfvDu7X-NWqCot4VkAgkO1JAU8xm8lnO0RdBlcZqoWqKj7t5zvZC3jnjmQMx5U77cO',
      prices: { '50ml': '75', '100ml': '135' },
    },
    {
      name: 'Fierce',
      type: 'Extrait de Parfum',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmygsuogGXbpvb2eLy2PJl44pCXzDTj7KlzPQpQOhFyswV1AkayaPyG0PdDI5zp8LjmFkY6qRBhSrz4D13Es8tXnYfBJ1vpWDjk9A1892ktqUGahIAQb-87Q86goJATWxN2zqj0XZOJOFVQq-w49vf07NUgJpUZ0p-UcyQ2tuA_uVYtdf6cgkN7opxWoBAe90UBnE_xCObEgfvDu7X-NWqCot4VkAgkO1JAU8xm8lnO0RdBlcZqoWqKj7t5zvZC3jnjmQMx5U77cO',
      prices: { '50ml': '75', '100ml': '135' },
      notes: fiercNotes,
    },
    {
      name: 'Serenity',
      type: 'Extrait de Parfum',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmygsuogGXbpvb2eLy2PJl44pCXzDTj7KlzPQpQOhFyswV1AkayaPyG0PdDI5zp8LjmFkY6qRBhSrz4D13Es8tXnYfBJ1vpWDjk9A1892ktqUGahIAQb-87Q86goJATWxN2zqj0XZOJOFVQq-w49vf07NUgJpUZ0p-UcyQ2tuA_uVYtdf6cgkN7opxWoBAe90UBnE_xCObEgfvDu7X-NWqCot4VkAgkO1JAU8xm8lnO0RdBlcZqoWqKj7t5zvZC3jnjmQMx5U77cO',
      prices: { '50ml': '75', '100ml': '135' },
    },
  ]

  return (
    <>
      <CursorGlow />
      <Header />
      
      <main className="relative w-full bg-background overflow-x-hidden">
        <HeroScene />

        <div className="relative w-full flex flex-col items-center pb-24 z-10 isolate">
          
          {/* Background Layer Space */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <Starfield />

            {/* ── 🧪 TEMPORARY ALIGNMENT TEST CROSSHAIR (STRETCHES ALL DIRECTIONS) ── */}
            <div className="absolute inset-0 flex items-center justify-center opacity-90">
              {/* Horizontal line running all the way across the screen */}
              <div className="absolute left-0 right-0 h-[0px] bg-white/100 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              {/* Vertical line stretching top to bottom behind the container heights */}
              <div className="absolute top-0 bottom-0 w-[0px] bg-white/100 shadow-[0_0_8px_rgba(255,255,255,1009)]" />
            </div>
          </div>

          {/* Products Section */}
          <section className="relative z-20 w-full max-w-[1100px] px-6 mt-16">
            <div className="glass-main rounded-[40px] p-8 transform-gpu">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {products.map((product) => (
                  <ProductCard
                    key={product.name}
                    {...product}
                    onAddToCart={addItem}
                  />
                ))}
              </div>
            </div>
          </section>

          <ResearchSection />
        </div>
      </main>
      
      <Footer />

      <CartOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        total={total}
      />
    </>
  )
}
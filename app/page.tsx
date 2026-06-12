'use client'

import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ProductCard } from '@/components/ProductCard'
import { ResearchSection } from '@/components/ResearchSection'
import { Footer } from '@/components/Footer'
import { CursorGlow } from '@/components/CursorGlow'

export default function Home() {
  const fiercNotes = [
    {
      id: 'wood',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wood_sculpted_glass_ice_202606120608-yTpB9VT6DLI9tpIK7uu2uCzPBdZYNe.jpeg',
      angle: 0,
      distance: 280,
      label: 'Wood',
    },
    {
      id: 'seaweed',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seaweed_sculpted_from_glass_202606120611-yEUlt2U52jtDBSoDaLvw4QmvZG37ye.jpeg',
      angle: 72,
      distance: 280,
      label: 'Seaweed',
    },
    {
      id: 'bergamot',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bergamot_sculpted_out_of_glass_202606120609-XQ7XM7tui9wKhfXhFpAjK7nkIhzWmT.jpeg',
      angle: 144,
      distance: 280,
      label: 'Bergamot',
    },
    {
      id: 'musk',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Musk_crystal_sculpted_glass_ice_202606120610-TDKhUwJByZhL89B54dwEevp5quhxHR.jpeg',
      angle: 216,
      distance: 280,
      label: 'Musk',
    },
    {
      id: 'water',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Water_splash_sculpted_glass_ice_202606120628-z4VMzIpbCUQ3mN9MPFzQwlRqv8QBf6.jpeg',
      angle: 288,
      distance: 280,
      label: 'Water',
    },
  ]

  const products = [
    {
      name: 'Courage',
      type: 'Extrait de Parfum',
      volume: '75',
      smallVolume: '50ml',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmygsuogGXbpvb2eLy2PJl44pCXzDTj7KlzPQpQOhFyswV1AkayaPyG0PdDI5zp8LjmFkY6qRBhSrz4D13Es8tXnYfBJ1vpWDjk9A1892ktqUGahIAQb-87Q86goJATWxN2zqj0XZOJOFVQq-w49vf07NUgJpUZ0p-UcyQ2tuA_uVYtdf6cgkN7opxWoBAe90UBnE_xCObEgfvDu7X-NWqCot4VkAgkO1JAU8xm8lnO0RdBlcZqoWqKj7t5zvZC3jnjmQMx5U77cO',
    },
    {
      name: 'Fierce',
      type: 'Extrait de Parfum',
      volume: '75',
      smallVolume: '50ml',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmygsuogGXbpvb2eLy2PJl44pCXzDTj7KlzPQpQOhFyswV1AkayaPyG0PdDI5zp8LjmFkY6qRBhSrz4D13Es8tXnYfBJ1vpWDjk9A1892ktqUGahIAQb-87Q86goJATWxN2zqj0XZOJOFVQq-w49vf07NUgJpUZ0p-UcyQ2tuA_uVYtdf6cgkN7opxWoBAe90UBnE_xCObEgfvDu7X-NWqCot4VkAgkO1JAU8xm8lnO0RdBlcZqoWqKj7t5zvZC3jnjmQMx5U77cO',
      notes: fiercNotes,
    },
    {
      name: 'Serenity',
      type: 'Extrait de Parfum',
      volume: '75',
      smallVolume: '50ml',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmygsuogGXbpvb2eLy2PJl44pCXzDTj7KlzPQpQOhFyswV1AkayaPyG0PdDI5zp8LjmFkY6qRBhSrz4D13Es8tXnYfBJ1vpWDjk9A1892ktqUGahIAQb-87Q86goJATWxN2zqj0XZOJOFVQq-w49vf07NUgJpUZ0p-UcyQ2tuA_uVYtdf6cgkN7opxWoBAe90UBnE_xCObEgfvDu7X-NWqCot4VkAgkO1JAU8xm8lnO0RdBlcZqoWqKj7t5zvZC3jnjmQMx5U77cO',
    },
  ]

  return (
    <>
      <CursorGlow />
      <Header />
      <main className="relative min-h-screen flex flex-col items-center pt-24 pb-12 overflow-hidden z-10">
        <HeroSection />

        {/* Products Section */}
        <section className="relative z-20 w-full max-w-[1100px] px-6 mt-12">
          <div className="glass-main rounded-[40px] p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {products.map((product) => (
                <ProductCard key={product.name} {...product} />
              ))}
            </div>
          </div>
        </section>

        <ResearchSection />
      </main>
      <Footer />
    </>
  )
}

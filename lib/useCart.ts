'use client'

import { useState } from 'react'

export interface CartItem {
  name: string
  type: string
  image: string
  size: '50ml' | '100ml'
  price: string
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name && i.size === item.size)
      if (existing) {
        return prev.map((i) =>
          i.name === item.name && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (name: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.name === name && i.size === size)))
  }

  const updateQuantity = (name: string, size: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.name === name && i.size === size
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    )
  }

  const total = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0)

  return { items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, total }
}

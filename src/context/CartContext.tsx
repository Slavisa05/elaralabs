'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import type { CartState, CartAction, ProductVariant, CartItem } from '@/types/cart'

const MAX_ITEMS = 50

// =====================
// 1. REDUCER
// =====================
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case 'ADD_ITEM': {
      const ukupnoLabela = state.items.reduce(
        (sum, item) => sum + item.quantity, 0
      )

      if (ukupnoLabela >= MAX_ITEMS) {
        return state // ne dodaj više, vrati isti state
      }

      // Provjeri da li varijacija već postoji u korpi
      const existing = state.items.find(
        item => item.variant.id === action.payload.id
      )

      if (existing) {
        // Ako postoji → samo povećaj količinu
        return {
          items: state.items.map(item =>
            item.variant.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }

      // Ako ne postoji → dodaj novi item
      return {
        items: [...state.items, { variant: action.payload, quantity: 1 }]
      }
    }

    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(item => item.variant.id !== action.payload)
      }
    }

    case 'UPDATE_QUANTITY': {
      return {
        items: state.items.map(item =>
          item.variant.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    }

    case 'HYDRATE_CART': {
      return { items: action.payload }
    }

    case 'CLEAR_CART': {
      return { items: [] }
    }

    default:
      return state
  }
}

// =====================
// 2. CONTEXT
// =====================
interface CartContextType {
  items: CartItem[]
  addItem: (variant: ProductVariant) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

// =====================
// 3. PROVIDER
// =====================
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Učitaj iz localStorage pri prvom renderu
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      const parsed: CartItem[] = JSON.parse(saved)
      dispatch({ type: 'HYDRATE_CART', payload: parsed })
    }
  }, [])

  // Sačuvaj u localStorage svaki put kad se items promeni
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  // Izračunaj ukupno
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity, 0
  )

  // Helper funkcije koje su "čitljivije" od dispatch-a
  const addItem = (variant: ProductVariant) =>
    dispatch({ type: 'ADD_ITEM', payload: variant })

  const removeItem = (id: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: id })

  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })

  const clearCart = () =>
    dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Export context za useCart hook
export { CartContext }
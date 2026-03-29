// Jedna varijacija proizvoda (npr. "Crvena", "Plava"...)
export interface ProductVariant {
  id: string
  name: string
  price: number
  image: string
}

// Jedna stavka u korpi = varijacija + količina
export interface CartItem {
  variant: ProductVariant
  quantity: number
}

// Ceo state korpe
export interface CartState {
  items: CartItem[]
}

// Sve akcije koje korpa može da uradi
export type CartAction =
  | { type: 'ADD_ITEM'; payload: ProductVariant }
  | { type: 'REMOVE_ITEM'; payload: string }        // payload = variant.id
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
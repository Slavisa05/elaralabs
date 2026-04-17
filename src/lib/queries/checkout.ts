import { shopifyFetch } from '@/lib/shopify'
import type { CartItem } from '@/types/cart'

const CREATE_CART = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string
      checkoutUrl: string
    }
    userErrors: { message: string }[]
  }
}

export async function createCheckout(items: CartItem[]) {
  const lines = items.map(item => ({
    merchandiseId: item.variant.id,
    quantity: item.quantity,
  }))

  const data = await shopifyFetch<CartCreateResponse>(CREATE_CART, { lines })

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }

  // Dodaj return_to parametar
  const checkoutUrl = new URL(data.cartCreate.cart.checkoutUrl)
  checkoutUrl.searchParams.set(
    'return_to',
    `${process.env.NEXT_PUBLIC_SITE_URL}/naruci`
  )


  return checkoutUrl.toString()
}
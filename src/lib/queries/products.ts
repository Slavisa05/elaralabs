import { shopifyFetch } from '@/lib/shopify'

// GraphQL query za sve proizvode
const PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`

// TypeScript tipovi za Shopify odgovor
interface ShopifyProduct {
  products: {
    edges: {
      node: {
        id: string
        title: string
        variants: {
          edges: {
            node: {
              id: string
              title: string
              price: { amount: string; currencyCode: string }
              image: { url: string; altText: string }
            }
          }[]
        }
      }
    }[]
  }
}

// Dohvati sve proizvode
export async function getProducts() {
  const data = await shopifyFetch<ShopifyProduct>(PRODUCTS_QUERY)

  // Flatten — izvuci varijacije kao flat listu
  return data.products.edges.flatMap(({ node: product }) =>
    product.variants.edges.map(({ node: variant }) => ({
      id: variant.id,
      name: `${product.title} — ${variant.title}`,
      price: parseFloat(variant.price.amount),
      image: variant.image?.url ?? 'https://placehold.co/200',
    }))
  )
}
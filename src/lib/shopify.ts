const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

const endpoint = `https://${domain}/api/2024-01/graphql.json`

// Osnovna fetch funkcija za Shopify GraphQL
export async function shopifyFetch<T>(query: string, variables = {}): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })

  const { data, errors } = await response.json()

  if (errors) {
    console.error('Shopify API greška:', errors)
    throw new Error(errors[0].message)
  }

  return data
}
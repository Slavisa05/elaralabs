import type { Metadata } from "next"
import NaruciClient from "./naruciClient"
import { getProducts } from "@/lib/queries/products"

export const metadata: Metadata = {
  title: "Naruči | Elara Prirodna Labela",
  description: "Naruči Elara prirodnu labelu online. Besplatna dostava iznad 2000 RSD.",
}

export default async function NaruciPage() {
  const proizvodi = await getProducts()

  return <NaruciClient proizvodi={proizvodi} />
}
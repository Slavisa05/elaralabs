import type { Metadata } from "next"
import NaruciClient from "./naruciClient"

export const metadata: Metadata = {
  title: "Naruči | Elara Prirodna Labela",
  description: "Naruči Elara prirodnu labelu online. Besplatna dostava iznad 2000 RSD.",
}

export default function NaruciPage() {
  return <NaruciClient />
}
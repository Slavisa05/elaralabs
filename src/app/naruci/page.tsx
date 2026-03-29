'use client'

import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import Draggable from '@/components/ui/naruci/Draggable'
import Droppable from '@/components/ui/naruci/Droppable'

// Placeholder proizvodi (kasnije će doći sa Shopify-a)
const proizvodi = [
  { id: 'proizvod-1', name: 'Varijacija 1', price: 100, image: 'https://placehold.co/200' },
  { id: 'proizvod-2', name: 'Varijacija 2', price: 100, image: 'https://placehold.co/200' },
  { id: 'proizvod-3', name: 'Varijacija 3', price: 100, image: 'https://placehold.co/200' },
  { id: 'proizvod-4', name: 'Varijacija 4', price: 100, image: 'https://placehold.co/200' },
  { id: 'proizvod-5', name: 'Varijacija 5', price: 100, image: 'https://placehold.co/200' },
]

export default function Naruci() {
  const { addItem, items } = useCart()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    console.log('active:', active.id)
    console.log('over:', over?.id)

    // Provjeri da li je dropovano NA korpu
    if (over?.id === 'korpa') {
      // Pronađi koji proizvod je vučen po id-u
      const proizvod = proizvodi.find(p => p.id === active.id)

      if (proizvod) {
        addItem({
          id: proizvod.id,
          name: proizvod.name,
          price: proizvod.price,
          image: proizvod.image,
        })
        console.log('Dodato u korpu:', proizvod.name)
      }
    }
  }

  return (
    <main className="relative px-[5vw] pt-10 flex flex-col gap-10">
      <Link href="/" className="absolute top-5 left-2.5 flex items-center gap-4">
        <ArrowLeft size={32} />
        <strong className="uppercase">nazad na početnu</strong>
      </Link>

      <DndContext onDragEnd={handleDragEnd}>
        <section>
          <div className="grid grid-cols-2 gap-8 h-screen p-8">

            {/* LEVO — Korpa */}
            <Droppable>
              <h2 className="text-lg font-bold mb-4">Korpa</h2>

              {/* Prikaz stavki u korpi */}
              {items.length === 0 ? (
                <p className="text-gray-400 text-sm">Prevuci proizvod ovde</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {items.map(item => (
                    <li key={item.variant.id} className="flex justify-between text-sm">
                      <span>{item.variant.name}</span>
                      <span>x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Droppable>

            {/* DESNO — Proizvodi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
              {proizvodi.map(proizvod => (
                <div key={proizvod.id} className="flex items-center justify-center">
                  <Draggable
                    id={proizvod.id}
                    imageUrl={proizvod.image}
                    alt={proizvod.name}
                  />
                </div>
              ))}
            </div>

          </div>
        </section>
      </DndContext>
    </main>
  )
}
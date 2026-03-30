'use client'

import { useState, useRef } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useCartAnimation } from '@/hooks/useCartAnimation'
import Link from 'next/link'
import Draggable from '@/components/ui/naruci/Draggable'
import CartBox from '@/components/ui/naruci/CartBox'

const proizvodi = [
  { id: 'proizvod-1', name: 'Varijacija 1', price: 100, image: 'labelo1.webp' },
  { id: 'proizvod-2', name: 'Varijacija 2', price: 100, image: 'labelo2.webp' },
  { id: 'proizvod-3', name: 'Varijacija 3', price: 100, image: 'labelo3.webp' },
  { id: 'proizvod-4', name: 'Varijacija 4', price: 100, image: 'labelo4.webp' },
  { id: 'proizvod-5', name: 'Varijacija 5', price: 100, image: 'labelo5.webp' },
]

export default function Naruci() {
  const { addItem } = useCart()
  const { phase, playAnimation } = useCartAnimation()
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeProizvod = proizvodi.find(p => p.id === activeId)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (over?.id === 'korpa') {
      const proizvod = proizvodi.find(p => p.id === active.id)

      if (proizvod) {
        // 1. Pokreni animaciju
        playAnimation()

        // 2. Dodaj u korpu malo kasnije (kada poklopac bude otvoren)
        await wait(400)
        addItem({
          id: proizvod.id,
          name: proizvod.name,
          price: proizvod.price,
          image: proizvod.image,
        })
      }
    }
  }

  return (
    <main className="relative px-[5vw] pt-10 flex flex-col gap-10">
      <Link href="/" className="absolute top-5 left-2.5 flex items-center gap-4">
        <ArrowLeft size={32} />
        <strong className="uppercase">nazad na početnu</strong>
      </Link>

      <DndContext id='naruci-dnd' onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <section>
          <div className="grid grid-cols-[2fr_1fr] gap-8 pt-8 md:p-8">

            {/* LEVO — Kutija/Korpa */}
            <CartBox phase={phase} />

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

        {/* DragOverlay — kopija koja prati miš */}
        <DragOverlay>
          {activeProizvod && (
            <img
              src={activeProizvod.image}
              alt={activeProizvod.name}
              className="w-24 h-24 md:w-48 md:h-48 object-cover rounded-xl opacity-90 shadow-xl"
            />
          )}
        </DragOverlay>
      </DndContext>
    </main>
  )
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
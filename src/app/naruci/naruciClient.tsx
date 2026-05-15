'use client'

import { useState, useRef, useEffect } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core'
import { ArrowLeft, Gift } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { useCartAnimation } from '@/hooks/useCartAnimation'
import type { ProductVariant } from '@/types/cart'
import Link from 'next/link'
import Draggable from '@/components/ui/naruci/Draggable'
import CartBox from '@/components/ui/naruci/CartBox'
import LabeloParticles from '@/components/ui/naruci/LabeloParticles'
import Modal from '@/components/ui/Modal'

interface FlyingItem {
  image: string
  fromX: number
  fromY: number
  toX: number
  toY: number
}

interface NaruciClientProps {
  proizvodi: ProductVariant[]
}

export default function NaruciClient({ proizvodi }: NaruciClientProps) {
  const { addItem } = useCart()
  const { phase, playAnimation } = useCartAnimation()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [flyingItem, setFlyingItem] = useState<FlyingItem | null>(null)
  const [enteringImage, setEnteringImage] = useState<string | undefined>(undefined)
  const [showTutorial, setShowTutorial] = useState(true)
  const lidRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   // Prikaži tutorial samo prvi put kada korisnik poseti stranicu
  //   const hasSeenTutorial = sessionStorage.getItem('naruci-tutorial-seen')
  //   if (hasSeenTutorial) {
  //     setShowTutorial(false)
  //   }
  // }, [])

  const closeTutorial = () => {
    setShowTutorial(false)
    sessionStorage.setItem('naruci-tutorial-seen', 'true')
  }

  const activeProizvod = proizvodi.find(p => p.id === activeId)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (over?.id === 'korpa') {
      const proizvod = proizvodi.find(p => p.id === active.id)
      if (!proizvod) return

      const translated = active.rect.current?.translated
      const lidRect = lidRef.current?.getBoundingClientRect()

      setEnteringImage(proizvod.image)

      if (translated && lidRect) {
        setFlyingItem({
          image: proizvod.image,
          fromX: translated.left + translated.width / 2,
          fromY: translated.top + translated.height / 2,
          toX: lidRect.left + lidRect.width / 2,
          toY: lidRect.top + lidRect.height / 2,
        })
        // animacija leti ~500ms, zatim pokrenemo box animaciju
        await wait(500)
      }

      playAnimation()
      await wait(400)
      addItem({
        id: proizvod.id,
        name: proizvod.name,
        price: proizvod.price,
        image: proizvod.image,
      })
    }
  }

  return (
    <main className="bg-background relative px-[5vw] pt-10 flex flex-col gap-10">
      {/* Tutorial Modal */}
      <Modal
        isOpen={showTutorial}
        title="Kako Naručiti?"
        onClose={closeTutorial}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 text-2xl">1️⃣</div>
            <div>
              <p className="font-semibold text-sm mb-1">Odaberi Proizvod</p>
              <p className="text-sm text-foreground/70">Klikni na proizvod koji te zanima sa desne strane.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="shrink-0 text-2xl">👆</div>
            <div>
              <p className="font-semibold text-sm mb-1">Prevuci u Korpu</p>
              <p className="text-sm text-foreground/70">Drži proizvod i prevuci ga u kutiju sa leve strane.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="shrink-0 text-2xl">✅</div>
            <div>
              <p className="font-semibold text-sm mb-1">Završi Narudžbu</p>
              <p className="text-sm text-foreground/70">Kada dodaš sve što želiš, nastavi ka plaćanju.</p>
            </div>
          </div>

          <button
            onClick={closeTutorial}
            className="w-full mt-4 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors duration-150"
          >
            Razumeo, Počnimo!
          </button>
        </div>
      </Modal>
      
      <LabeloParticles />
      <Link href="/" className="absolute top-5 left-2.5 flex items-center gap-4">
        <ArrowLeft size={32} />
        <strong className="uppercase">nazad na početnu</strong>
      </Link>

      {/* Leteći thumbnail */}
      <AnimatePresence>
        {flyingItem && (
          <motion.img
            key="flying"
            src={flyingItem.image}
            alt=""
            className="fixed w-20 h-20 object-cover rounded-xl pointer-events-none z-50"
            style={{
              top: flyingItem.fromY,
              left: flyingItem.fromX,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: flyingItem.toX - flyingItem.fromX,
              y: flyingItem.toY - flyingItem.fromY,
              scale: 0.1,
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 1, 1] }}
            onAnimationComplete={() => setFlyingItem(null)}
          />
        )}
      </AnimatePresence>

      <DndContext id='naruci-dnd' onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <section>
          <div className="grid grid-cols-[2fr_1fr] md:grid-cols-2 gap-8 pt-8 md:p-8">

            {/* LEVO — Kutija/Korpa */}
            <CartBox phase={phase} lidRef={lidRef} enteringImage={enteringImage} />

            {/* DESNO — Proizvodi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
              {proizvodi.map(proizvod => (
                <div key={proizvod.id} className="flex flex-col items-center justify-center gap-2">
                  <Draggable
                    id={proizvod.id}
                    imageUrl={proizvod.image}
                    alt={proizvod.name}
                  />
                  <span className="text-sm font-semibold text-center">{proizvod.name}</span>
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
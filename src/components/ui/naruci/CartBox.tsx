'use client'

import { useDroppable } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import { createCheckout } from '@/lib/queries/checkout'
import { useCart } from '@/hooks/useCart'
import { AnimationPhase } from '@/hooks/useCartAnimation'
import { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import HeartParticle from './HeartParticle'
import Button from '../Button'
import Modal from '../Modal'

const srca = [
  { x: -40, delay: 0 },
  { x: -10, delay: 0.1 },
  { x: 20,  delay: 0.05 },
  { x: 50,  delay: 0.15 },
  { x: -25, delay: 0.2 },
]

const PEEK_COUNT = 5
const PEEK_COUNT_MOBILE = 5

interface CartBoxProps {
  phase: AnimationPhase
  lidRef?: React.RefObject<HTMLDivElement | null>
  enteringImage?: string
}

export default function CartBox({ phase, lidRef, enteringImage }: CartBoxProps) {
  const [isPregledOpen, setIsPregledOpen] = useState(false)

  const { setNodeRef, isOver } = useDroppable({ id: 'korpa' })
  const { items, totalPrice, updateQuantity, removeItem } = useCart()

  async function handleCheckout() {
    const url = await createCheckout(items)
    window.location.href = url
  }

  const isShaking = phase === 'shake'
  const showHearts = phase === 'hearts'

  const flatItems = items.flatMap(item =>
    Array.from({ length: item.quantity }, (_, i) => ({
      key: `${item.variant.id}-${i}`,
      image: item.variant.image || 'https://placehold.co/100',
      name: item.variant.name,
    }))
  )

  const peekItems = flatItems.slice(0, PEEK_COUNT)
  const hiddenItems = flatItems.slice(PEEK_COUNT)
  const peekItemsMobile = flatItems.slice(0, PEEK_COUNT_MOBILE)
  const hiddenItemsMobile = flatItems.slice(PEEK_COUNT_MOBILE)

  // Rotacije za fan efekat — 5 labela
  const rotacije = [-10, -5, 0, 5, 10]
  const rotacijeMobile = [-8, 0, 8]

  return (
    <div className="flex flex-col h-full gap-4">

      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="text-foreground/70">* Besplatna dostava na poručenih 5 ili više proizvoda</span>

        <motion.div
          ref={setNodeRef}
          className="relative w-full mx-auto"
          animate={isShaking ? { x: [-6, 6, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >

          {/* === SLOJ 0: Skrivene labele IZA kutije === */}
          {hiddenItems.length > 0 && (
            <div className="hidden md:flex absolute z-0 top-[48%] left-[30%] right-[30%] flex-row flex-wrap gap-1 justify-center">
              {hiddenItems.map(item => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-md object-cover shadow-sm"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'backOut' }}
                />
              ))}
            </div>
          )}
          {hiddenItemsMobile.length > 0 && (
            <div className="md:hidden absolute z-0 top-[48%] left-[26%] right-[26%] flex flex-row flex-wrap gap-1 justify-center">
              {hiddenItemsMobile.map(item => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-9 h-9 rounded-md object-cover shadow-sm"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'backOut' }}
                />
              ))}
            </div>
          )}

          {/* Donji deo — puna slika, iza labela */}
          <img
            src="/kutija.png"
            className="absolute z-5 top-0 left-0 w-full h-auto select-none pointer-events-none"
            draggable={false}
          />

          {/* Placeholder za visinu */}
          <img
            src="/kutija.png"
            className="w-full h-auto opacity-0 pointer-events-none select-none"
            aria-hidden
          />

          {/* Gornji deo — ista slika, ali clipovana na gornju polovinu, ispred labela */}
          <img
            src="/kutija.png"
            className="absolute z-30 top-0 left-0 w-full h-auto select-none pointer-events-none"
            style={{ clipPath: 'inset(48.5% 0 0 0)' }} 
            draggable={false}
          />

          {/* Lid ref */}
          <div
            ref={lidRef}
            className="absolute z-20 top-[32%] left-[25%] right-[25%] h-[5%]"
          />

          {/* Hover glow */}
          <AnimatePresence>
            {isOver && (
              <motion.div
                className="absolute inset-0 z-20 rounded-lg ring-4 ring-teal-400/60 bg-teal-300/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Prazna kutija tekst */}
          {flatItems.length === 0 && (
            <div className="absolute z-20 top-[20%] left-[25%] right-[25%] flex items-center justify-center">
              <p className="text-black bold text-sm md:text-xl text-center select-none drop-shadow-md">
                Prevuci labelu ovde
              </p>
            </div>
          )}

          {/* === SLOJ 20: Labele koje VIRE iz kutije — desktop === */}
          {peekItems.length > 0 && (
            <div
              className="hidden md:flex absolute z-20 left-[20%] right-[20%] flex-row justify-center"
              style={{
                top: '26%',           // koliko su duboko u kutiji
                alignItems: 'flex-end',
              }}
            >
              {peekItems.map((item, i) => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-22 h-100 rounded-lg object-cover"
                  style={{
                    marginLeft: i === 0 ? 0 : '-10px',   // overlap
                    transformOrigin: 'bottom center',     // rotira oko dna
                    zIndex: i === 2 ? 25 : 20,            // srednja labela ispred
                  }}
                  initial={{ opacity: 0, y: -30, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'backOut', delay: i * 0.06 }}
                />
              ))}
            </div>
          )}

          {/* === SLOJ 20: Labele koje VIRE iz kutije — mobile === */}
          {peekItemsMobile.length > 0 && (
            <div
              className="md:hidden flex absolute z-20 left-[18%] right-[18%] flex-row justify-center"
              style={{
                top: '30%',
                alignItems: 'flex-end',
              }}
            >
              {peekItemsMobile.map((item, i) => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-30 rounded-lg object-cover"
                  style={{
                    marginLeft: i === 0 ? 0 : '-20px',
                    transformOrigin: 'bottom center',
                    zIndex: i === 1 ? 25 : 20,
                  }}
                  initial={{ opacity: 0, y: -30, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'backOut', delay: i * 0.06 }}
                />
              ))}
            </div>
          )}

          {/* Broj skrivenih labela — badge */}
          {hiddenItems.length > 0 && (
            <motion.div
              className="hidden md:flex absolute z-30 right-[18%] top-[25%] bg-teal-500 text-white text-xs font-bold w-7 h-7 rounded-full items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
            >
              +{hiddenItems.length}
            </motion.div>
          )}
          {hiddenItemsMobile.length > 0 && (
            <motion.div
              className="md:hidden absolute z-30 right-[16%] top-[25%] bg-teal-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
            >
              +{hiddenItemsMobile.length}
            </motion.div>
          )}

          {/* === SLOJ 30: Leteći item === */}
          <AnimatePresence>
            {phase === 'item-enter' && (
              <motion.div
                className="absolute left-1/2 top-[28%] w-14 h-14 md:w-18 md:h-18 rounded-lg bg-cover bg-center"
                style={{
                  translateX: '-50%',
                  ...(enteringImage ? { backgroundImage: `url(${enteringImage})` } : {}),
                }}
                initial={{ opacity: 1, y: -60, scale: 0.9, zIndex: 30 }}
                animate={{ opacity: 0, y: 60, scale: 0.3, zIndex: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: 'easeIn',
                  zIndex: { duration: 0, delay: 0.15 },
                }}
              />
            )}
          </AnimatePresence>

          {/* === SLOJ 30: Srca === */}
          <div className="absolute z-30 top-[30%] left-1/2">
            <AnimatePresence>
              {showHearts && srca.map((srce, i) => (
                <HeartParticle key={i} x={srce.x} delay={srce.delay} />
              ))}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>

      {/* DONJI DEO — cena i dugmad */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            className="flex flex-col gap-2 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-semibold text-center">
              Ukupno: {totalPrice} RSD
            </p>
            {flatItems.length < 3 && (
              <p className="text-red-500 text-xs text-center">
                Morate dodati najmanje 3 proizvoda u korpu da biste mogli da naručite.
              </p>
            )}
            <Button text='pogledaj korpu' variant='secondary' onClick={() => setIsPregledOpen(true)} />
            <Button text='naruci' onClick={handleCheckout} disabled={flatItems.length < 3} />
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={isPregledOpen} title="Detalji korpe" onClose={() => setIsPregledOpen(false)}>
        <ul className="flex flex-col gap-3 max-h-[55vh] overflow-y-auto">
          {items.map(item => (
            <li key={item.variant.id} className="flex items-center gap-3">
              <img
                src={item.variant.image}
                alt={item.variant.name}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight">{item.variant.name}</p>
                <p className="text-xs opacity-50 mt-0.5">{item.variant.price} RSD / kom</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    item.quantity === 1
                      ? removeItem(item.variant.id)
                      : updateQuantity(item.variant.id, item.quantity - 1)
                  }
                  className="w-7 h-7 rounded-full bg-foreground/10 hover:bg-red-100 flex items-center justify-center transition-colors"
                >
                  {item.quantity === 1
                    ? <Trash2 size={13} className="text-red-500" />
                    : <Minus size={13} />}
                </button>
                <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-foreground/10 flex justify-between items-center">
          <span className="font-semibold text-sm">Ukupno</span>
          <span className="font-bold text-lg">{totalPrice} RSD</span>
        </div>
      </Modal>
    </div>
  )
}
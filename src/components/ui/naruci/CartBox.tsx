'use client'

import { useDroppable } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import { createCheckout } from '@/lib/queries/checkout'
import { useCart } from '@/hooks/useCart'
import { AnimationPhase } from '@/hooks/useCartAnimation'
import { useState } from 'react'
import HeartParticle from './HeartParticle'
import Button from '../Button'
import Modal from '../Modal'
import { Minus, Plus, Trash2 } from 'lucide-react'

const srca = [
  { x: -40, delay: 0 },
  { x: -10, delay: 0.1 },
  { x: 20,  delay: 0.05 },
  { x: 50,  delay: 0.15 },
  { x: -25, delay: 0.2 },
]

// Koliko labela viri iz kutije (prvi red)
const PEEK_COUNT = 5
const PEEK_COUNT_MOBILE = 3

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

  // Podeli na: prvi red (viri) i ostali (skriveni iza kutije)
  const peekItems = flatItems.slice(0, PEEK_COUNT)
  const hiddenItems = flatItems.slice(PEEK_COUNT)
  const peekItemsMobile = flatItems.slice(0, PEEK_COUNT_MOBILE)
  const hiddenItemsMobile = flatItems.slice(PEEK_COUNT_MOBILE)

  return (
    <div className="flex flex-col h-full gap-4">

      <div className="flex-1 flex flex-col items-center justify-center">

        {/* Wrapper za tresenje */}
        <motion.div
          ref={setNodeRef}
          className="relative w-full max-w-100 md:max-w-140 mx-auto"
          animate={isShaking ? {
            x: [-6, 6, -6, 6, -4, 4, 0],
          } : { x: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >

          {/* === SLOJ 0: Skrivene labele — IZA kutije === */}
          {hiddenItems.length > 0 && (
            <div className="hidden md:flex absolute z-0 top-[42%] left-[28%] right-[28%] flex-row flex-wrap gap-1 justify-center">
              {hiddenItems.map(item => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-md object-cover shadow-sm"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'backOut' }}
                />
              ))}
            </div>
          )}
          {hiddenItemsMobile.length > 0 && (
            <div className="md:hidden absolute z-0 top-[42%] left-[24%] right-[24%] flex flex-row flex-wrap gap-1 justify-center">
              {hiddenItemsMobile.map(item => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-md object-cover shadow-sm"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'backOut' }}
                />
              ))}
            </div>
          )}

          {/* === SLOJ 10: Slika kutije === */}
          <img
            src="/kutija.jpg"
            alt="Elara kutija"
            className="relative z-10 w-full h-auto select-none pointer-events-none"
            draggable={false}
          />

          {/* Lid ref — nevidljiva meta za leteći item */}
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
            <div className="absolute z-20 top-[30%] left-[25%] right-[25%] flex items-center justify-center">
              <p className="text-white/60 text-xs md:text-sm text-center select-none drop-shadow-md">
                Prevuci labelu ovde
              </p>
            </div>
          )}

          {/* === SLOJ 20: Labele koje VIRE iz kutije === */}
          {peekItems.length > 0 && (
            <div
              className="hidden md:flex absolute z-20 left-[28%] right-[28%] flex-row gap-2 justify-center"
              style={{ top: '34%', transform: 'translateY(-50%)' }}
            >
              {peekItems.map((item, i) => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-18 lg:w-14 lg:h-20 rounded-lg object-cover shadow-lg border border-white/40"
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: (i % 2 === 0 ? -3 : 3) + (i - 2) * 1.5,
                  }}
                  transition={{ duration: 0.4, ease: 'backOut', delay: i * 0.05 }}
                />
              ))}
            </div>
          )}
          {peekItemsMobile.length > 0 && (
            <div
              className="md:hidden absolute z-20 left-[22%] right-[22%] flex flex-row gap-2 justify-center"
              style={{ top: '34%', transform: 'translateY(-50%)' }}
            >
              {peekItemsMobile.map((item, i) => (
                <motion.img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-16 rounded-lg object-cover shadow-lg border border-white/40"
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: (i % 2 === 0 ? -3 : 3) + (i - 1) * 2,
                  }}
                  transition={{ duration: 0.4, ease: 'backOut', delay: i * 0.05 }}
                />
              ))}
            </div>
          )}

          {/* === SLOJ 30: Leteći item — ulazi u kutiju === */}
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

            <Button text='pogledaj korpu' variant='secondary' onClick={() => setIsPregledOpen(true)} />
            <Button text='naruci' onClick={handleCheckout} />
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
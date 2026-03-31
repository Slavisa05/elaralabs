'use client'

import { useDroppable } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { AnimationPhase } from '@/hooks/useCartAnimation'
import HeartParticle from './HeartParticle'
import Button from '../Button'

// Predefinisane rotacije za stack efekat
const rotacije = [-6, 4, -3, 7, -5]

// Predefinisane pozicije srca
const srca = [
  { x: -40, delay: 0 },
  { x: -10, delay: 0.1 },
  { x: 20,  delay: 0.05 },
  { x: 50,  delay: 0.15 },
  { x: -25, delay: 0.2 },
]

interface CartBoxProps {
  phase: AnimationPhase
  lidRef?: React.RefObject<HTMLDivElement | null>
  enteringImage?: string
}

export default function CartBox({ phase, lidRef, enteringImage }: CartBoxProps) {
  const { setNodeRef, isOver } = useDroppable({ id: 'korpa' })
  const { items, totalPrice } = useCart()

  // Ova funkcija se poziva iz page.tsx kada se nešto dropuje
  // Koristimo useImperativeHandle ili jednostavno ref callback
  // Umesto toga, page.tsx će zvati triggerAnimation direktno

  const isLidOpen = phase === 'lid-open' || phase === 'item-enter'
  const isShaking = phase === 'shake'
  const showHearts = phase === 'hearts'

  // Razvij items×quantity u individualnu listu sa jedinstvenim ključem
  const flatItems = items.flatMap(item =>
    Array.from({ length: item.quantity }, (_, i) => ({
      key: `${item.variant.id}-${i}`,
      image: item.variant.image || 'https://placehold.co/100',
      name: item.variant.name,
    }))
  )

  const N_COLS = 10
  const rows: typeof flatItems[] = []
  for (let i = 0; i < flatItems.length; i += N_COLS) {
    rows.push(flatItems.slice(i, i + N_COLS))
  }

  const N_COLS_MOBILE = 3
  const MAX_ROWS_MOBILE = 4
  const rowsMobile: typeof flatItems[] = []
  for (let i = 0; i < flatItems.length; i += N_COLS_MOBILE) {
    rowsMobile.push(flatItems.slice(i, i + N_COLS_MOBILE))
  }
  const visibleRowsMobile = rowsMobile.slice(0, MAX_ROWS_MOBILE)

  return (
    <div className="flex flex-col h-full gap-4">

      {/* KUTIJA — ceo animirani blok */}
      <div className="flex-1 flex flex-col items-center justify-center">

        {/* Wrapper za tresenje */}
        <motion.div
          className="relative w-full"
          animate={isShaking ? {
            x: [-6, 6, -6, 6, -4, 4, 0],
          } : { x: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >

          {/* POKLOPAC */}
          <motion.div
            ref={lidRef}
            className={`
              relative z-10 w-full h-8 rounded-t-xl flex items-center justify-center
              transition-colors duration-200
              ${isOver ? 'bg-amber-400' : 'bg-amber-600'}
            `}
            animate={{ y: isLidOpen ? -32 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Šraf na poklopcu — dekoracija */}
            <div className="w-16 h-2 bg-amber-800 rounded-full opacity-50" />
          </motion.div>

          {/* TELO KUTIJE */}
          <div
            ref={setNodeRef}
            className={`
              relative w-full h-80 rounded-b-xl rounded-tr-xl p-3
              flex flex-col overflow-hidden
              border-4 transition-colors duration-200
              ${isOver
                ? 'bg-amber-50 border-amber-400'
                : 'bg-amber-100 border-amber-600'
              }
            `}
          >
            {/* Highlight kada se vuče iznad */}
            <AnimatePresence>
              {isOver && (
                <motion.div
                  className="absolute inset-0 bg-amber-300 rounded-b-xl rounded-tr-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>

            {/* PRAZNA KORPA */}
            {flatItems.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-amber-800 text-sm text-center opacity-60 select-none">
                  Prevuci proizvod ovde
                </p>
              </div>
            )}

            {/* GRID PAKOVANJE — redovi odozdo nagore */}
            {rows.length > 0 && (
              <>
                {/* DESKTOP: 10 kolona */}
                <div className="hidden md:flex absolute bottom-2 left-4 right-2 flex-col-reverse gap-1">
                  {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row gap-1">
                      {row.map(item => (
                        <motion.img
                          key={item.key}
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-md object-cover shadow-sm shrink-0"
                          initial={{ opacity: 0, scale: 0.3, y: -20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: 'backOut' }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* MOBILNI: 3 kolone, max 5 redova */}
                <div className="md:hidden absolute bottom-2 left-2 right-2 flex flex-col-reverse gap-1 overflow-hidden">
                  {visibleRowsMobile.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row gap-1">
                      {row.map(item => (
                        <motion.img
                          key={item.key}
                          src={item.image}
                          alt={item.name}
                          className="w-15 h-15 shrink-0 rounded-md object-cover shadow-sm"
                          initial={{ opacity: 0, scale: 0.3, y: -20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: 'backOut' }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Item koji "ulazi" animacija */}
            <AnimatePresence>
              {phase === 'item-enter' && (
                <motion.div
                  className="absolute w-16 h-16 rounded-lg z-50 bg-amber-300 bg-cover bg-center"
                  style={enteringImage ? { backgroundImage: `url(${enteringImage})` } : undefined}
                  initial={{ opacity: 1, y: -60, scale: 0.8 }}
                  animate={{ opacity: 0, y: 20, scale: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeIn' }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* SRCA — izlaze iz kutije */}
          <AnimatePresence>
            {showHearts && srca.map((srce, i) => (
              <HeartParticle key={i} x={srce.x} delay={srce.delay} />
            ))}
          </AnimatePresence>

          {/* Natpis na kutiji */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
              Korpa
            </span>
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

            <Button text='pogledaj korpu' variant='secondary' />
            <Button text='naruci' />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
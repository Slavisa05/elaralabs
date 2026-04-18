'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Image from 'next/image'

const IMAGES = [
  { src: '/original_uspravni.png', alt: 'med' },
  { src: '/uspravna_jagoda.png', alt: 'jagoda' },
  { src: '/uspravna_vanilla.png', alt: 'vanila' },
  { src: '/uspravni_mango.png', alt: 'mango' },
  { src: '/uspravni_mint.png', alt: 'mint' },
]

function seeded(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

interface Particle {
  id: number
  imgIndex: number
  x: number
  y: number
  size: number
  rotate: number
  bobY: number
  duration: number
  delay: number
}

export default function LabeloParticles({ count = 12 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        imgIndex: i % IMAGES.length,
        // divide screen into 4 columns so particles are spread left-to-right
        x: ((i % 4) / 3) * 80 + seeded(i * 7) * 15 + 2,
        y: seeded(i * 13) * 85 + 5,
        size: 70 + seeded(i * 3) * 60,
        rotate: (seeded(i * 17) - 0.5) * 60,
        bobY: 8 + seeded(i * 11) * 8,
        duration: 2.5 + seeded(i * 5) * 2,
        delay: seeded(i * 19) * 2,
      })),
    [count],
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {particles.map(p => {
        const img = IMAGES[p.imgIndex]
        return (
          <motion.div
            key={p.id}
            className="absolute select-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              opacity: 0.18,
              rotate: p.rotate,
            }}
            animate={{ y: [-p.bobY, p.bobY] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </motion.div>
        )
      })}
    </div>
  )
}

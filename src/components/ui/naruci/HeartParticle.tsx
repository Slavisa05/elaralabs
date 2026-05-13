'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface HeartParticleProps {
  x: number      // horizontalni offset od centra
  delay: number  // delay pre nego što srce krene
}

export default function HeartParticle({ x, delay }: HeartParticleProps) {
  const [driftX, setDriftX] = useState(x)

  useEffect(() => {
    setDriftX(x + (Math.random() * 30 - 15))
  }, [x])

  return (
    <motion.div
      className="absolute text-red-500 text-xl pointer-events-none select-none"
      style={{ bottom: '100%', left: '50%' }}
      initial={{
        opacity: 1,
        y: 0,
        x,
        scale: 0.5,
      }}
      animate={{
        opacity: 0,
        y: -80,
        x: driftX,
        scale: 1.2,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
    >
      ❤️
    </motion.div>
  )
}
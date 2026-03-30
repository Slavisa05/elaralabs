'use client'

import { useState } from 'react'

export type AnimationPhase =
  | 'idle'        // ništa se ne dešava
  | 'lid-open'    // poklopac se diže
  | 'item-enter'  // proizvod ulazi
  | 'lid-close'   // poklopac se zatvara
  | 'shake'       // kutija se trese
  | 'hearts'      // srca izlaze

export function useCartAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('idle')
  const [isAnimating, setIsAnimating] = useState(false)

  async function playAnimation() {
    if (isAnimating) return
    setIsAnimating(true)

    // Faza 1 — poklopac se diže
    setPhase('lid-open')
    await wait(400)

    // Faza 2 — proizvod ulazi
    setPhase('item-enter')
    await wait(400)

    // Faza 3 — poklopac se zatvara
    setPhase('lid-close')
    await wait(300)

    // Faza 4 — kutija se trese
    setPhase('shake')
    await wait(500)

    // Faza 5 — srca izlaze
    setPhase('hearts')
    await wait(800)

    // Reset
    setPhase('idle')
    setIsAnimating(false)
  }

  return { phase, isAnimating, playAnimation }
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
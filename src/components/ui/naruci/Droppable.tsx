'use client'

import { useDroppable } from '@dnd-kit/core'

interface DroppableProps {
  children: React.ReactNode
}

export default function Droppable({ children }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'korpa',
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        z-1 w-full h-full rounded-2xl p-4 transition-colors duration-200
        ${isOver ? 'bg-green-100 border-2 border-green-400' : 'bg-gray-100'}
      `}
    >
      {children}
    </div>
  )
}
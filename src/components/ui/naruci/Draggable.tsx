'use client'

import { useDraggable } from '@dnd-kit/core'

interface DraggableProps {
  id: string
  imageUrl: string
  alt: string
}

export default function Draggable({ id, imageUrl, alt }: DraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative cursor-grab active:cursor-grabbing"
      style={{ opacity: isDragging ? 0.3 : 1, touchAction: 'none' }}
    >
      <img src={imageUrl} alt={alt} className="w-24 h-24 md:w-48 md:h-48 object-cover rounded-xl" />
    </div>
  )
}
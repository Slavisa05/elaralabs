'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface DraggableProps {
  id: string
  imageUrl: string
  alt: string
}

export default function Draggable({ id, imageUrl, alt }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab active:cursor-grabbing z-50"
    >
      <img src={imageUrl} alt={alt} className="w-48 h-48 object-cover rounded-xl" />
    </div>
  )
}
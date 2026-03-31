'use client'

import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
    children: ReactNode
}

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center">
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />

                    {/* Modal — slide from bottom */}
                    <motion.div
                        className="relative z-10 w-full max-w-md bg-background rounded-t-3xl sm:rounded-2xl shadow-xl p-6 sm:mx-4"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        {/* Handle — mobilni indikator */}
                        <div className="sm:hidden w-10 h-1 bg-foreground/20 rounded-full mx-auto mb-4" />

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <button
                                onClick={onClose}
                                className="text-foreground/50 hover:text-foreground transition-colors duration-150"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Modal
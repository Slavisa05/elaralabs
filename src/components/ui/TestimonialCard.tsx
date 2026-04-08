"use client";

import { motion } from "motion/react";

interface TestimonialCardProps {
    name: string,
    imageUrl: string,
    paragraph: string,
}

export default function TestimonialCard({ name, imageUrl, paragraph }: TestimonialCardProps) {
    return(
        <div className="mx-[5vw] p-5 rounded-xl shadow-xl flex flex-col gap-6 w-72 md:w-80 shrink-0">
            <div className="flex items-center gap-4 border-b-2 py-3">
                <img 
                    className="w-12 rounded-full"
                    src={imageUrl} 
                    alt="placeholder slika"
                />

                <strong>{name}</strong>
            </div>

            <div>
                <p>{paragraph}</p>
            </div>
        </div>
    )
}
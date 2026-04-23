"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
    return (
        <section
            className="relative min-h-[85vh] pt-[12vh] pb-0 px-[5vw] flex flex-col items-center overflow-hidden bg-accent"
        >
            {/* Hero slika — dole na mobilnom, centrirana na desktopu */}
            <Image
                src="/hero.png"
                alt="Elara hero"
                width={1400}
                height={900}
                priority
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full md:bottom-auto md:w-[70%] h-auto object-contain pointer-events-none select-none z-0"
            />

            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none z-1" />

            {/* Bottom gradient to blend into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-b from-transparent to-background pointer-events-none z-10" />

            {/* Floating images */}
            <motion.div 
                animate={{ y: [-5, 5], rotate: 45 }}
                transition={{ y:{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }, rotate: { duration: 10 },}}
                className="absolute left-[-8vw] md:left-0 top-40 md:top-35 transform-[rotate(45deg)] z-20 w-35 md:w-50">
                <Image 
                    src="/original_uspravni.png"
                    alt="labelo med"
                    width={200}
                    height={200}
                />
            </motion.div>
            
            <motion.div 
                animate={{ y: [-5, 5], rotate: -45 }}
                transition={{ y:{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }, rotate: { duration: 10, delay: 0.5 },}}
                className="absolute right-[-8vw] md:right-0 top-40 md:top-35 transform-[rotate(-45deg)] z-20 w-35 md:w-50">
                <Image 
                    src="/uspravna_jagoda.png"
                    alt="labelo jagoda"
                    width={200}
                    height={200}
                />
            </motion.div>
            
            <motion.div 
                animate={{ y: [-5, 5], rotate: 45 }}
                transition={{ y:{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }, rotate: { duration: 10 },}}
                className="absolute right-[-8vw] md:right-0 bottom-15 transform-[rotate(45deg)] z-20 w-35 md:w-50">
                <Image 
                    src="/uspravna_vanilla.png"
                    alt="labelo vanila"
                    width={200}
                    height={200}
                />
            </motion.div>
            
            <motion.div
                animate={{ y: [-5, 5], rotate: -45 }}
                transition={{ y:{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }, rotate: { duration: 10, delay: 0.5 },}}
                className="absolute left-[-8vw] md:left-0 bottom-15 transform-[rotate(-45deg)] z-20 w-35 md:w-50">
                <Image 
                    src="/uspravni_mango.png"
                    alt="labelo mango"
                    width={200}
                    height={200}
                />
            </motion.div>
            
            <motion.div 
                animate={{ y: [-5, 5] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                className="absolute bottom-15 z-20 w-35 md:w-50">
                <Image 
                    src="/uspravni_mint.png"
                    alt="labelo mint"
                    width={200}
                    height={200}
                />
            </motion.div>

            {/* Main content — tekst gore, slika dole */}
            <div className="w-full relative z-10 flex flex-col items-center justify-center gap-6 pt-9 md:flex-1 md:flex-row md:items-start md:gap-12">

                {/* Text side */}
                <div className="flex flex-col items-center gap-8 md:gap-6 md:flex-1">
                    <motion.h1
                        className="text-center md:text-start text-white drop-shadow-lg uppercase text-3xl md:text-5xl lg:text-6xl"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                    >
                        Prirodno Labelo
                    </motion.h1>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-3 md:gap-4"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    >
                        <Link href="/naruci">
                            <Button text="Naruči odmah" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll bounce arrow */}
            <motion.div
                className="absolute bottom-15 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </section>
    );
}
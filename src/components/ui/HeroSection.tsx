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
            className="relative min-h-screen pt-[12vh] pb-0 px-[5vw] flex flex-col items-center overflow-hidden bg-accent"
        >
            {/* Hero slika — dole na mobilnom, centrirana na desktopu */}
            <Image
                src="/hero.png"
                alt="Elara hero"
                width={1400}
                height={900}
                priority
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:bottom-auto md:w-[70%] h-auto object-contain pointer-events-none select-none z-0"
            />

            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none z-1" />

            {/* Bottom gradient to blend into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-b from-transparent to-background pointer-events-none z-10" />

            {/* Spinning sticker badge */}
            <motion.div
                className="absolute top-[18vh] right-[2vw] md:top-[18vh] md:right-[4vw] z-20 w-16 h-16 md:w-28 md:h-28 rounded-full bg-accent flex items-center justify-center cursor-default select-none shadow-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
                <div className="font-black uppercase text-center leading-tight text-foreground text-[10px] md:text-sm pointer-events-none">
                    5<br />ukusa<br />★
                </div>
            </motion.div>

            {/* Main content — tekst gore, slika dole */}
            <div className="w-full relative z-10 flex flex-col items-center justify-center gap-6 pt-18 md:flex-1 md:flex-row md:items-start md:gap-12">

                {/* Text side */}
                <div className="flex flex-col items-center gap-4 md:gap-6 md:flex-1">
                    <motion.h1
                        className="text-center md:text-start text-white drop-shadow-lg text-3xl md:text-5xl lg:text-6xl"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                    >
                        Prirodno. Ukusno. Naše.
                    </motion.h1>

                    <motion.p
                        className="text-center md:text-start text-white/90 text-base md:text-lg"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    >
                        5 unikatnih ukusa napravljenih od prirodnih sastojaka, bez veštačkih aroma i konzervansa.
                    </motion.p>

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
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60"
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
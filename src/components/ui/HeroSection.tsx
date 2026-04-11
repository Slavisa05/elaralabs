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
            className="relative min-h-screen pt-[15vh] pb-0 px-[5vw] flex flex-col items-center overflow-hidden"
            style={{
                backgroundImage: "url('/planine.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Bottom gradient to blend into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-b from-transparent to-background pointer-events-none z-10" />

            {/* Spinning sticker badge */}
            <motion.div
                className="absolute top-[18vh] right-[2vw] md:right-[8vw] z-20 w-20 h-20 md:w-28 md:h-28 rounded-full bg-accent flex items-center justify-center cursor-default select-none shadow-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
                <div className="font-black uppercase text-center leading-tight text-foreground text-xs md:text-sm pointer-events-none">
                    5<br />ukusa<br />★
                </div>
            </motion.div>

            {/* Main content */}
            <div className="w-full relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pb-32">

                {/* Text side */}
                <div className="flex flex-col items-center gap-6 md:flex-1">
                    <motion.h1
                        className="text-center md:text-start text-white drop-shadow-lg"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                    >
                        Prirodno. Ukusno. Naše.
                    </motion.h1>

                    <motion.p
                        className="text-center md:text-start text-white/90 text-lg"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    >
                        5 unikatnih ukusa napravljenih od prirodnih sastojaka, bez veštačkih aroma i konzervansa.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-4"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    >
                        <Link href="/naruci">
                            <Button text="Naruči odmah" />
                        </Link>
                        <Link href="#proizvod">
                            <Button text="Pogledaj ukuse" />
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

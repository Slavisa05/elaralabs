"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

export default function CTA() {
    return (
        <motion.section
            className="mx-[5vw] relative overflow-hidden rounded-2xl mb-10 px-8 py-16 md:py-32 flex flex-col items-center justify-center text-center gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Pozadinska slika */}
            <Image
                src="/grupna-slika.png"
                alt="cta pozadina"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
            />

            {/* Tamni overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Sadržaj */}
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl text-white">
                <motion.h2
                    className="text-3xl md:text-5xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
                    viewport={{ once: true }}
                >
                    Probajte naše ukuse danas
                </motion.h2>

                <motion.p
                    className="text-white/80 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.28 }}
                    viewport={{ once: true }}
                >
                    Besplatna dostava za sve porudžbine iznad 2000 dinara. Naručite danas i uverite se zašto nas biraju hiljade zadovoljnih kupaca.
                </motion.p>

                <motion.div
                    className="flex flex-wrap items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.42 }}
                    viewport={{ once: true }}
                >
                    <Link href="naruci/">
                        <Button text="Naruči odmah" />
                    </Link>

                    <Link href="#proizvod">
                        <Button text="Pogledaj ukuse" />
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}


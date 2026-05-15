"use client";

import { motion } from "motion/react"
import Link from "next/link";
import Image from "next/image"
import Button from "./Button";

export default function ShowcaseSection() {
    return(
        <section className="relative px-[5vw] pt-15 pb-15 bg-linear-to-b from-background via-background to-accent overflow-hidden">
            {/* <motion.h2
                className="mb-3 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Ukusi po vašoj želji
            </motion.h2>
            
            <motion.p
                className="mb-10 md:mb-15 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
                Pet pažljivo razvijenih ukusa — prirodni sastojci, bez kompromisa.
            </motion.p> */}

            <motion.div
                className="mb-8 md:mb-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="relative overflow-hidden rounded-4xl border border-foreground/10 bg-white/70 p-4 shadow-[0_16px_40px_rgba(23,23,23,0.06)] backdrop-blur-sm md:p-5">
                    <div className="absolute left-1/2 top-3 h-20 w-20 -translate-x-1/2 rounded-full bg-accent/35 blur-2xl" />

                    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-md">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                                Brz put do porudžbine
                            </p>
                            <h3 className="text-foreground">Želiš odmah da poručiš?</h3>
                            <p className="mt-2 text-sm leading-6 text-foreground/70 md:text-base">
                                Klikni na dugme, prevuci proizvode u korpu i naruči!
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link href="/naruci" className="inline-flex">
                                <Button text="Idi na naruči" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-10">
                <motion.div
                    className="w-full flex items-center justify-center"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    <Link href="/naruci">
                        <Image 
                            src="/kutija.png"
                            alt="slika kutije"
                            width={600}
                            height={600}
                            className="mt-5 rounded-xl w-70 md:w-90"
                        />
                    </Link>
                </motion.div>

                <motion.div
                    className="w-full flex items-center justify-between"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    <Image 
                        src="/grupna_slika.png"
                        alt="slika svih labela"
                        width={400}
                        height={400}
                        className="rounded-xl w-full"
                    />
                </motion.div>
            </div>
        </section>
    )
}

"use client";

import Image from "next/image"
import { motion } from "motion/react"

export default function ShowcaseSection() {
    return(
        <section className="relative px-[5vw] pb-15 bg-linear-to-b from-background via-background to-accent overflow-hidden">
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

            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-10">
                <motion.div
                    className="w-full flex items-center justify-center"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    <Image 
                        src="/kutija.png"
                        alt="slika kutije"
                        width={600}
                        height={600}
                        className="rounded-xl w-70 md:w-90"
                    />
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

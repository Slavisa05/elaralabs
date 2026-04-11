"use client"

import { motion } from "motion/react";
import { Leaf, FlaskConical, HandHeart, Recycle } from "lucide-react";
import Image from "next/image";

const tickerItems = [
    "🍯 100% PRIRODNO",
    "🌿 BEZ KONZERVANSA",
    "🤲 RUČNA IZRADA",
    "♻️ EKO PAKOVANJE",
    "🚚 BESPLATNA DOSTAVA iznad 2000 din",
];

const benefits = [
    { icon: Leaf, title: "100% prirodno", desc: "Bez veštačkih aroma i konzervansa" },
    { icon: FlaskConical, title: "Bez hemije", desc: "Samo provereni prirodni sastojci" },
    { icon: HandHeart, title: "Ručna izrada", desc: "Svaki komad pravimo sa pažnjom" },
    { icon: Recycle, title: "Eko ambalaža", desc: "Pakovanje koje brine o planeti" },
];

export default function ZastoMiSection() {
    return (
        <section id="zasto-mi" className="overflow-hidden">

            {/* Scrolling ticker strip */}
            <div className="bg-foreground text-background py-3 overflow-hidden">
                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    style={{ width: "max-content" }}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                    {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                        <span key={i} className="uppercase font-bold text-sm tracking-widest">{item}</span>
                    ))}
                </motion.div>
            </div>

            {/* Main content */}
            <div className="mx-[5vw] py-16 flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="ml-[-5vw]"
                        whileHover={{ scale: 1.03 }}
                    >
                        <Image
                            src="/wa-img.png"
                            alt="3 Elara proizvoda"
                            width={600}
                            height={600}
                            className="object-contain"
                        />
                    </motion.div>

                    {/* Right side */}
                    <div className="flex flex-col gap-6">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Zašto naše labelo?
                        </motion.h2>

                        {/* Benefit cards 2×2 */}
                        <div className="grid grid-cols-2 gap-4">
                            {benefits.map((b, i) => (
                                <motion.div
                                    key={i}
                                    className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-accent"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.06, y: -4 }}
                                >
                                    <b.icon size={32} />
                                    <strong className="font-bold">{b.title}</strong>
                                    <p className="text-sm opacity-75 leading-snug">{b.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

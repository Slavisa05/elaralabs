"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const proizvodi = [
    {
        slug: "original",
        label: "Original",
        bg: "bg-amber-300",
        heading: "Original",
        paragraphs: [
            "sa prirodnim blagim mirisom meda iz pčelinjeg voska za autentičnu negu.",
        ],
        imageUrl: "/original.png",
        cardImage: "/original_uspravni.png",
    },
    {
        slug: "mango",
        label: "Mango",
        bg: "bg-orange-300",
        heading: "Mango",
        paragraphs: [
            "egzotična, topla nota manga sa diskretnom slatkoćom koja unosi osećaj leta i nežne nege.",
        ],
        imageUrl: "/mango.png",
        cardImage: "/uspravni_mango.png",
    },
    {
        slug: "vanila",
        label: "Vanila",
        bg: "bg-yellow-200",
        heading: "Vanila",
        paragraphs: [
            "nežna, kremasta aroma vanile koja umiruje i pruža topao, prijatan osećaj tokom dana.",
        ],
        imageUrl: "/vanilla.png",
        cardImage: "/uspravna_vanilla.png",
    },
    {
        slug: "mint",
        label: "Mint",
        bg: "bg-emerald-300",
        heading: "Mint",
        paragraphs: [
            "osvežavajuća nota mente koja blago hladi usne, daje osećaj čistoće i svežine.",
        ],
        imageUrl: "/mint.png",
        cardImage: "/uspravni_mint.png",
    },
    {
        slug: "jagoda",
        label: "Jagoda",
        bg: "bg-red-400",
        heading: "Jagoda",
        paragraphs: [
            " sveža i sočna aroma jagode koja daje blagu slatkoću i prijatan voćni osećaj na usnama.",
        ],
        imageUrl: "/jagoda.png",
        cardImage: "/uspravna_jagoda.png",
    },
];

export default function ProizvodSection() {
    const [active, setActive] = useState(0);
    const current = proizvodi[active];

    return (
        <section id="proizvod" className="px-[5vw] py-25">
            {/* Header */}
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="uppercase">Naši Ukusi</h2>
                <p className="text-foreground/60 mt-2">Klikni na ukus koji te zanima</p>
            </motion.div>

            {/* Product cards grid */}
            <motion.div
                className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
                {proizvodi.map((p, i) => (
                    <motion.button
                        key={p.slug}
                        onClick={() => setActive(i)}
                        className={`relative rounded-2xl p-3 flex flex-col items-center gap-2 cursor-pointer ${p.bg} border-4 transition-colors duration-200 ${active === i ? "border-foreground" : "border-transparent hover:border-foreground/30"}`}
                        whileHover={{ scale: 1.07, y: -4 }}
                        whileTap={{ scale: 0.93 }}
                        animate={active === i ? { scale: 1.05, y: -4 } : { scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    >
                        <div className="relative w-25 h-15 md:w-40 md:h-32">
                            <Image
                                src={p.cardImage}
                                alt={p.label}
                                fill
                                sizes="(max-width: 768px) 100px, 160px"
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-xs md:text-sm uppercase leading-tight">{p.label}</span>

                        {active === i && (
                            <motion.div
                                className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 600, damping: 15 }}
                            >
                                <span className="text-background text-xs font-bold">✓</span>
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </motion.div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current.slug}
                    className={`rounded-2xl ${current.bg} p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center`}
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                >
                    {/* Bouncing product image */}
                    <motion.div
                        initial={{ rotate: -20, scale: 0.4, opacity: 0 }}
                        animate={{ rotate: -5, scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        whileHover={{ rotate: 0, scale: 1.08 }}
                        className="shrink-0"
                    >
                        <Image
                            src={current.imageUrl}
                            alt={current.heading}
                            width={220}
                            height={220}
                            style={{ width: "auto", height: "auto" }}
                            className="object-contain drop-shadow-xl"
                        />
                    </motion.div>

                    {/* Text */}
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className="uppercase font-black text-foreground">{current.heading}</h3>
                        {current.paragraphs.map((text, i) => (
                            <p key={i} className="text-foreground/80 leading-relaxed">{text}</p>
                        ))}
                        <div className="mt-2">
                            <Link href="/naruci">
                                <Button text="Naruči odmah" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
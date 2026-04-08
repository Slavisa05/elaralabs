"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const proizvodi = [
    {
        slug: "med",
        label: "Med",
        bg: "bg-amber-300",
        heading: "Med",
        paragraphs: [
            "Topao i bogat — ukus meda koji vas vraća u djetinjstvo. Svaki zalogaj donosi prirodnu slatkoću planinskog meda, pažljivo odabranog od lokalnih pčelara koji čuvaju tradiciju od generacije do generacije.",
            "Mekan, aromatičan i neodoljivo privlačan. Savršen za one koji traže prirodnu slatkoću bez kompromisa — čist med, bez aditiva i vještačkih aroma.",
        ],
        imageUrl: "/original.png",
    },
    {
        slug: "mango",
        label: "Mango",
        bg: "bg-orange-300",
        heading: "Mango",
        paragraphs: [
            "Egzotičan i sunčan — ukus manga koji vas odmah prenosi na tropsku plažu. Koristimo zrele, sočne mango plodove čiji intenzivan miris i prirodna slatkoća oduševljavaju već na prvom zalogaju.",
            "Voćan, živahan i osvježavajući. Idealan za tople dane i one koji vole egzotične ukuse — bez vještačkih aroma, samo čisti mango u svakom gramu.",
        ],
        imageUrl: "/mango.png",
    },
    {
        slug: "vanila",
        label: "Vanila",
        bg: "bg-yellow-200",
        heading: "Vanila",
        paragraphs: [
            "Klasičan i neodoljiv — ukus vanile koji nikad ne izlazi iz mode. Koristimo pravu bourbon vanilu, čiji topli i kremasti ton pruža osećaj udobnosti i raskoši u svakom trenutku.",
            "Blag, ali kompleksan. Savršen za one koji cene jednostavnost i kvalitet sirovine iznad svega.",
        ],
        imageUrl: "/vanilla.png",
    },
    {
        slug: "mint",
        label: "Mint",
        bg: "bg-emerald-300",
        heading: "Mint",
        paragraphs: [
            "Svjež i hladan — ukus mente koji budi osjetila. Prirodna menta daje intenzivan, čist i osvježavajući osjećaj koji traje dugo nakon posljednjeg zalogaja.",
            "Savršen balans između osvježenja i slatkoće. Za one koji vole čist, mentolni ukus koji ih vraća u ravnotežu — prirodno, bez kompromisa.",
        ],
        imageUrl: "/mint.png",
    },
    {
        slug: "jagoda",
        label: "Jagoda",
        bg: "bg-red-400",
        heading: "Jagoda",
        paragraphs: [
            "Letnji klasik u svakom zalogaju. Ukus jagode donosi sećanje na sunčane popodne i zrele crvene jagode tek ubrane iz bašte — sladak, svež i neodoljivo mirisav.",
            "Napravljen bez veštačkih boja i aroma, ovaj ukus je dokaz da priroda sama po sebi pruža dovoljno.",
        ],
        imageUrl: "/jagoda.png",
    },
];

export default function ProizvodSection() {
    const [active, setActive] = useState(0);
    const current = proizvodi[active];

    return (
        <motion.section
            id="proizvod"
            className={`bg-[#8BEAF7] mx-[5vw] rounded-2xl overflow-hidden transition-colors duration-500 ${current.bg}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Mobilni tabovi — flex-wrap */}
            <div className="flex md:hidden flex-wrap justify-center gap-2 p-4">
                {proizvodi.map((p, i) => (
                    <button
                        key={p.slug}
                        onClick={() => setActive(i)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                            active === i
                                ? "bg-foreground text-background"
                                : "bg-background/30 text-foreground"
                        }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Glavni layout */}
            <div className="flex flex-col md:flex-row min-h-125">

                {/* Desktop tabovi — vertikalni s leve strane */}
                <div className="hidden md:flex flex-col justify-center gap-1 p-8 border-r border-background/20 min-w-45">
                    {proizvodi.map((p, i) => (
                        <button
                            key={p.slug}
                            onClick={() => setActive(i)}
                            className={`relative text-left px-5 py-4 rounded-xl font-semibold text-lg transition-all duration-200 cursor-pointer ${
                                active === i
                                    ? "bg-foreground/90 text-background shadow-lg scale-[1.03]"
                                    : "hover:bg-background/20 opacity-70 hover:opacity-100"
                            }`}
                        >
                            {active === i && (
                                <motion.span
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl bg-foreground/90 -z-10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Sadržaj */}
                <div className="flex-1 p-6 md:p-12 flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.slug}
                            className="flex flex-col md:flex-row items-center gap-10 w-full"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <div className="flex flex-col gap-4 flex-1">
                                <h2 className="text-4xl font-bold">{current.heading}</h2>
                                {current.paragraphs.map((p, i) => (
                                    <p key={i} className="text-lg leading-relaxed opacity-80">{p}</p>
                                ))}

                                <div className="hidden md:block">
                                    <Link href="naruci/">
                                        <Button text="naruci labelo" variant="secondary" />
                                    </Link>
                                </div>
                            </div>
                            <motion.div 
                                transition={{ duration: 0.6, ease: "easeOut"}}
                                whileHover={{ scale: 1.04, zIndex: 10 }}
                                className="rounded-2xl w-full md:w-120 object-cover"
                                >
                                    <Image 
                                        src={current.imageUrl}
                                        alt={current.heading}
                                        width={800}
                                        height={800}
                                    />
                            </motion.div>

                            <div className="md:hidden">
                                <Link href="naruci/">
                                    <Button text="naruci labelo" variant="secondary" />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    );
}



"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "./Button";

const proizvodi = [
    {
        slug: "malina",
        label: "Malina",
        bg: "bg-pink-400",
        heading: "Malina",
        paragraphs: [
            "Svježa i voćna, malina unosi živost u svaki zalogaj. Ovaj ukus nastao je od pažljivo odabranih malina sa lokalnih farmi, čiji intenzivan miris i prirodna kiselost savršeno balansiraju slatkoću.",
            "Idealan izbor za one koji vole osvježavajuće, lagane ukuse. Bez vještačkih aroma — samo čista malina u svakom gramu.",
        ],
        imageUrl: "https://placehold.co/400",
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
        imageUrl: "https://placehold.co/400",
    },
    {
        slug: "cokolada",
        label: "Čokolada",
        bg: "bg-amber-700",
        heading: "Čokolada",
        paragraphs: [
            "Za prave ljubitelje čokolade. Bogat, dubok ukus nastao od visokokvalitetnog kakaoa sa minimalnom obradom — jer prava čokolada ne treba mnogo da bi bila savršena.",
            "Intenzivan, ali uravnotežen. Svaki zalogaj podseća na gotovo pa toplu čokoladu — gustu, tamnu i zadovoljavajuću.",
        ],
        imageUrl: "https://placehold.co/400",
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
        imageUrl: "https://placehold.co/400",
    },
    {
        slug: "pistac",
        label: "Pistać",
        bg: "bg-green-400",
        heading: "Pistać",
        paragraphs: [
            "Sofisticiran i jedinstven — ukus pistaca privlači one koji traže nešto drugačije. Orašast, blago sladak i izuzetno aromatičan, ovaj ukus je hit među znalcima.",
            "Svaki komad sadrži stvarne komadić pistaca koji daju hrskavu teksturu i autentičan ukus kakav se ne može dobiti od ekstrakta.",
        ],
        imageUrl: "https://placehold.co/400",
    },
];

export default function ProizvodSection() {
    const [active, setActive] = useState(0);
    const current = proizvodi[active];

    return (
        <motion.section
            id="proizvod"
            className={`rounded-2xl overflow-hidden transition-colors duration-500 ${current.bg}`}
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
                                    <Button text="naruci labelo" />
                                </div>
                            </div>
                            <motion.img
                                transition={{ duration: 0.6, ease: "easeOut"}}
                                whileHover={{ scale: 1.04, zIndex: 10 }}
                                className="rounded-2xl shadow-2xl w-full md:w-80 object-cover"
                                src={current.imageUrl}
                                alt={current.heading}
                            />
                            <div className="md:hidden">
                                <Button text="naruci labelo" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    );
}



"use client"

import { motion } from "motion/react";

const imageDirections = [
    { x: -60, y: -60 },
    { x:  60, y: -60 },
    { x: -60, y:  60 },
    { x:  60, y:  60 },
];

const reasons = [
    "Koristimo isključivo prirodne sastojke bez veštačkih aroma, boja ili konzervansa — jer vaše zdravlje nam je na prvom mestu.",
    "Svaki proizvod pravi se ručno u malim serijama, što garantuje svežinu i dosledno visok kvalitet pri svakoj narudžbini.",
    "Radimo sa lokalnim farmerima i dobavljačima kako bismo podržali zajednicu i smanjili ekološki uticaj.",
    "Naša ambalaža je 100% reciklabilna — brinemo o planeti jednako kao i o ukusu.",
];

export default function ZastoMiSection() {
    return(
        <section>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Slike — svaka ulazi iz svog ugla */}
                <div className="grid grid-cols-2 gap-2">
                    {imageDirections.map((dir, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: dir.x, y: dir.y }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.04, zIndex: 10 }}
                            className="relative"
                        >
                            <img className="rounded-xl w-full h-full object-cover" src="https://placehold.co/400" alt="placeholder slika" />
                        </motion.div>
                    ))}
                </div>

                {/* Tekst */}
                <div className="flex flex-col items-center justify-center gap-6">
                    <motion.h2
                        className="text-center mb-4"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        Zašto naše labelo?
                    </motion.h2>

                    {reasons.map((text, i) => (
                        <motion.div
                            key={i}
                            className="flex items-start gap-3 md:w-[85%]"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <p className="text-justify">{text}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const imageVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
};

export default function HeroSection() {
    return (
        <section className="min-h-screen pt-[20vh] pb-10 flex flex-col">

            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center gap-4">
                    <motion.h1
                        className="max-w-[90%] md:max-w-[80%] text-center md:text-start"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                    >
                        Prirodno. Ukusno. Naše.
                    </motion.h1>

                    <motion.p
                        className="max-w-[90%] md:max-w-[80%] text-center md:text-start"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    >
                        Otkrijte 5 unikatnih ukusa napravljenih od prirodnih sastojaka, bez veštačkih aroma i konzervansa. Svaki zalogaj — priča za sebe.
                    </motion.p>

                    <motion.div
                        className="w-[90%] md:w-[80%] flex items-center justify-center gap-4"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    >
                        <Link href="naruci/">
                            <Button text="naruci odmah" />
                        </Link>

                        <Link href="#proizvod">
                            <Button text="pogledaj detaljnije" variant="secondary" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className="flex items-center justify-center"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                
                    < motion.img transition={{ duration: 0.6, ease: "easeOut"}}
                                whileHover={{ scale: 1.04, zIndex: 10 }} 
                                className="rounded-xl" 
                                src="https://placehold.co/600x400" 
                                alt="placeholder slika" 
                    />
                </motion.div>
            </div>
        </section>
    );
}

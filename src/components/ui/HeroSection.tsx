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
        <section
            className="min-h-screen pt-[20vh] md:pt-[30vh] pb-10 px-[5vw] flex flex-col"
            style={{
                backgroundImage: "url('/planine.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >

            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
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
                    className="max-w-[90%] md:max-w-[50%] text-center"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                >
                    Otkrijte 5 unikatnih ukusa napravljenih od prirodnih sastojaka, bez veštačkih aroma i konzervansa. Svaki zalogaj — priča za sebe.
                </motion.p>

                <motion.div
                    className="w-[90%] md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-4"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >

                    <Link href="naruci/">
                        <Button text="naruci 3 proizvoda" />
                    </Link>

                    <Link href="naruci/">
                        <Button text="naruci 5 proizvoda" />
                    </Link>
                    
                    <Link href="naruci/">
                        <Button text="naruci vise proizvoda" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

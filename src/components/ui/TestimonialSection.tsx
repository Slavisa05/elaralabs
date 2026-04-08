"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import TestimonialCard from "./TestimonialCard";

// Brzina: povecaj duration da uspori, smanji da ubrza
const DURATION = 25;

const testimonials = [
    { name: "Slaviša Arsenijević", imageUrl: "https://placehold.co/400", paragraph: "Najbolje labelo koje sam koristio do sada, definitivno ću probati sve ukuse!" },
    { name: "Milica Jovanović", imageUrl: "https://placehold.co/400", paragraph: "Ukus jagode me podseti na detinjstvo. Sveže, prirodno i neverovatno ukusno." },
    { name: "Dragan Petrović", imageUrl: "https://placehold.co/400", paragraph: "Naručujem svake nedelje, moja deca ne žele ništa drugo. Pistać je favorit!" },
    { name: "Ana Nikolić", imageUrl: "https://placehold.co/400", paragraph: "Konačno nešto bez veštačkih sastojaka. Pakovanje je predivno, a ukus još bolji." },
    { name: "Marko Simić", imageUrl: "https://placehold.co/400", paragraph: "Čokolada ukus je savršen. Bogat i intenzivan, baš onako kako treba biti." },
];

export default function TestimonialSection() {
    const controls = useAnimationControls();

    useEffect(() => {
        controls.start({ x: ["0%", "-50%"], transition: { duration: DURATION, repeat: Infinity, ease: "linear", repeatType: "loop" } });
    }, [controls]);

    return (
        <section id="recenzije" className="mx-[5vw]">
            <h2 className="text-center md:text-start mb-10">Pogledajte šta kažu naše mušterije o nama</h2>

            <div className="py-10 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                    className="flex gap-6"
                    style={{ width: "max-content" }}
                    animate={controls}
                >
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <TestimonialCard
                            key={i}
                            name={t.name}
                            imageUrl={t.imageUrl}
                            paragraph={t.paragraph}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
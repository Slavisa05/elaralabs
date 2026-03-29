"use client";

import { motion } from "motion/react";
import Button from "./Button";

const fieldVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

export default function ContactSection() {
    return(
        <section className="py-10">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Levi tekst — slide s leva */}
                <motion.div
                    className="flex flex-col items-center justify-center gap-4"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2>Imate pitanje?</h2>
                    <p className="text-justify md:w-[70%] mb-10">Pošaljite nam poruku i odgovorićemo vam u najkraćem mogućem roku</p>
                </motion.div>

                {/* Forma — polja se pojavljuju jedno po jedno */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <form className="flex flex-col gap-5">
                        {[
                            { label: "Ime i prezime", name: "name", type: "text", placeholder: "Pera Perić", tag: "input" },
                            { label: "Broj telefona", name: "phoneNumber", type: "text", placeholder: "+38164...", tag: "input" },
                            { label: "Poruka", name: "message", type: "text", placeholder: "Zdravo, zanima me...", tag: "textarea" },
                        ].map((field, i) => (
                            <motion.div
                                key={field.name}
                                className="flex flex-col gap-1.5"
                                variants={fieldVariants}
                                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.15 }}
                            >
                                <label>{field.label}</label>
                                {field.tag === "textarea" ? (
                                    <textarea
                                        className="h-40 px-3 py-2 rounded-xl border-none outline-none bg-foreground text-background resize-none"
                                        name={field.name}
                                        placeholder={field.placeholder}
                                    />
                                ) : (
                                    <input
                                        className="px-3 py-2 rounded-xl border-none outline-none bg-foreground text-background"
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </motion.div>
                        ))}

                        <motion.div variants={fieldVariants} transition={{ duration: 0.45, ease: "easeOut", delay: 3 * 0.15 }}>
                            <Button type="submit" text="Pošalji poruku" />
                        </motion.div>
                    </form>
                </motion.div>

            </div>
        </section>
    )
}

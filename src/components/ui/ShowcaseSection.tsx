"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const annotations = [
  {
    id: "top",
    label: "Klikni i naruči",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
        <path d="M16.5 9.4 7.55 4.24"/>
        <polyline points="3.29 7 12 12 20.71 7"/>
        <line x1="12" x2="12" y1="22" y2="12"/>
        <circle cx="18.5" cy="15.5" r="2.5"/>
        <path d="M20.27 17.27 22 19"/>
      </svg>
    ),
    className:
      "absolute -top-4 left-1/2 -translate-x-1/2 z-10",
    arrowClass: "arrow-down",
  },
  {
    id: "left",
    label: "5 ukusa",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    className:
      "absolute top-1/2 -translate-y-1/2 -left-5 z-10",
    arrowClass: "arrow-right",
  },
  {
    id: "right",
    label: "Premium kvalitet",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    className:
      "absolute top-1/2 -translate-y-1/2 -right-5 z-10",
    arrowClass: "arrow-left",
  },
  {
    id: "bottom",
    label: "Prirodni sastojci",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    className:
      "absolute -bottom-4 left-1/2 -translate-x-1/2 z-10",
    arrowClass: "arrow-up",
  },
];

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.55 + i * 0.1, duration: 0.35, ease: "easeOut" as const },
  }),
};

export default function ShowcaseSection() {
  return (
    <section className="relative px-[5vw] pt-15 pb-15 bg-linear-to-b from-background via-background to-accent overflow-hidden">
      {/* Slike */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

        {/* Kutija sa annotacijama */}
        <motion.div
          className="w-full flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <div className="relative inline-flex items-center justify-center">

            {/* Annotation pill — vrh */}
            <motion.div
              className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full border border-foreground/12 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm text-[11.5px] font-medium text-foreground/75 whitespace-nowrap"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pillVariants}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0"/>
                <polyline points="3.29 7 12 12 20.71 7"/>
                <line x1="12" x2="12" y1="22" y2="12"/>
              </svg>
              Klikni i naruči
              {/* strelica prema dolje */}
              <span className="absolute -bottom-2.25 left-1/2 -translate-x-1/2 w-px h-2.25 bg-foreground/20" />
              <span className="absolute -bottom-3.25 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-4 border-l-transparent border-r-transparent border-t-foreground/25" />
            </motion.div>

            {/* Annotation pill — lijevo */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -left-6 z-10 flex items-center gap-1.5 rounded-full border border-foreground/12 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm text-[11.5px] font-medium text-foreground/75 whitespace-nowrap"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pillVariants}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              5 ukusa
              {/* strelica prema desno */}
              <span className="absolute -right-2.25 top-1/2 -translate-y-1/2 h-px w-2.25 bg-foreground/20" />
              <span className="absolute -right-3.25 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-l-4 border-t-transparent border-b-transparent border-l-foreground/25" />
            </motion.div>

            {/* Annotation pill — desno */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -right-6 z-10 flex items-center gap-1.5 rounded-full border border-foreground/12 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm text-[11.5px] font-medium text-foreground/75 whitespace-nowrap"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pillVariants}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Premium kvalitet
              {/* strelica prema lijevo */}
              <span className="absolute -left-2.25 top-1/2 -translate-y-1/2 h-px w-2.25 bg-foreground/20" />
              <span className="absolute -left-3.25 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-r-4 border-t-transparent border-b-transparent border-r-foreground/25" />
            </motion.div>

            {/* Annotation pill — dno */}
            <motion.div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full border border-foreground/12 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm text-[11.5px] font-medium text-foreground/75 whitespace-nowrap"
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pillVariants}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              Prirodni sastojci
              {/* strelica prema gore */}
              <span className="absolute -top-2.25 left-1/2 -translate-x-1/2 w-px h-2.25 bg-foreground/20" />
              <span className="absolute -top-3.25 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-b-4 border-l-transparent border-r-transparent border-b-foreground/25" />
            </motion.div>

            {/* Pulsujući ring ispod slike */}
            <motion.span
              className="absolute inset-0 rounded-xl ring-1 ring-foreground/10 pointer-events-none"
              animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Slika kutije */}
            <Link href="/naruci" className="group block mt-5">
              <Image
                src="/kutija.png"
                alt="slika kutije"
                width={600}
                height={600}
                className="rounded-xl w-70 md:w-90 transition-transform duration-300 ease-out group-hover:scale-[1.03] group-hover:drop-shadow-lg"
              />
              {/* Hover overlay sa pozivom na akciju */}
              <motion.div
                className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              >
                <span className="flex items-center gap-2 rounded-full bg-foreground/85 px-4 py-2 text-xs font-semibold text-background backdrop-blur-sm">
                  Poruči sada
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Grupna slika labela */}
        <motion.div
          className="w-full flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
        >
          <div className="space-y-2 mb-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
              Naši ukusi
            </p>
            <h3 className="text-foreground leading-snug">
              Pet razloga da <br className="hidden md:block" />
              nas zavoliš
            </h3>
            <p className="text-sm leading-6 text-foreground/65 max-w-sm">
              Svaki ukus je pažljivo razvijen od prirodnih sastojaka —
              bez veštačkih boja, bez kompromisa.
            </p>
          </div>

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
  );
}
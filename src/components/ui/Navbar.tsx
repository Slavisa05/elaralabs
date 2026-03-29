"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [lastY, setLastY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setVisible(currentY < lastY || currentY < 10);
            setLastY(currentY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    const links = [
        { href: "/", label: "pocetna" },
        { href: "/o-nama", label: "o nama" },
        { href: "/proizvod", label: "proizvod" },
        { href: "/kontakt", label: "kontakt" },
    ];

    return (
        <header className={`z-1000 w-full backdrop-blur-3xl fixed px-[5vw] py-6 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="w-full flex items-center justify-between">
                <Link href="/" className="uppercase italic text-3xl">LOGO</Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-2">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="group relative uppercase p-2.5">
                            {link.label}
                            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </div>

                {/* Hamburger button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-1"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
            </nav>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-60 pt-4" : "max-h-0"}`}>
                <div className="flex flex-col gap-4">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="uppercase"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
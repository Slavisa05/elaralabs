"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setVisible(currentY < lastY || currentY < 10);
            setLastY(currentY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    return(
        <header className={`w-full bg-transparent backdrop-blur-3xl fixed px-[5vw] py-6 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="w-full flex items-center justify-between">
                <Link href="/" className="uppercase italic text-3xl">LOGO</Link>

                <div className="flex items-center gap-4 ">
                    <Link href="/" className="uppercase">pocetna</Link>
                    <Link href="/" className="uppercase">o nama</Link>
                    <Link href="/" className="uppercase">kontakt</Link>
                    <Link href="/" className="uppercase">naruci proizvod</Link>
                </div>
            </nav>
        </header>
    )
}
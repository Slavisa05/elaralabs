"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

function InstagramIcon({ size = 16 }: { size?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

export default function Footer() {
    return(
        <footer className="w-full px-[5vw] py-20 flex flex-col gap-15">
            <div className="flex flex-col md:flex-row gap-15 justify-between">
                <div className="flex items-center justify-center md:justify-start">
                    <Link href="/" className="uppercase italic text-3xl">
                        <Image src="/logo.svg" alt="Logo" width={120} height={68} priority />
                    </Link>
                </div>

                <div className="flex gap-10">
                    <div className="flex flex-col gap-4">
                        <strong>kontakt</strong>
                        <Link href="mailto:sajt@gmail.com" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                            <Mail size={16} />
                            sajt@gmail.com
                        </Link>
                        <Link href="tel:+381123456789" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                            <Phone size={16} />
                            +381123456789
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <strong>društvene mreže</strong>
                        <Link href="https://instagram.com/riosty1e" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                            <InstagramIcon size={16} />
                            @riosty1e
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full border-t-2 pt-10">
                <p className="text-center">© {new Date().getFullYear()} sajt. Sva prava zadržana.</p>
            </div>
        </footer>
    )
}

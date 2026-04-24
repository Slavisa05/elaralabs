import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elara | Prirodna Ručno Rađena Labela",
  description: "Elara labelo — prirodna, ručno rađena labela bez konzervansa. 5 ukusa: med, mango, vanila, mint, jagoda.",
  keywords: ["labelo", "prirodna labela", "ručno rađena", "bez konzervansa", "elara"],
  openGraph: {
    title: "Elara | Prirodna Ručno Rađena Labela",
    description: "Prirodna labela bez konzervansa. Naruči odmah u 5 različitih ukusa.",
    url: "https://elaralabs.com",
    siteName: "Elara",
    images: [{ url: "/logo.svg", width: 1200, height: 630 }],
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elara | Prirodna Labela",
    description: "Prirodna labela bez konzervansa. 5 ukusa.",
    images: ["/logo.svg"],
  },
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}

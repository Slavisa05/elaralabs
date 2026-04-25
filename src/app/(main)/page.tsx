import { Metadata } from "next";
import HeroSection from "@/components/ui/HeroSection";
import ShowcaseSection from "@/components/ui/ShowcaseSection";
import ProizvodSection from "@/components/ui/ProizvodSection";
import ZastoMiSection from "@/components/ui/ZastoMiSection";
import TestimonialSection from "@/components/ui/TestimonialSection";
import ContactSection from "@/components/ui/ContactSection";
import CTA from "@/components/ui/CTA";

export const metadata: Metadata = {
  title: "Elara | Prirodna Ručno Rađena Labela",
  description: "Elara labelo — prirodna, ručno rađena labela bez konzervansa. 5 ukusa: med, mango, vanila, mint, jagoda.",
};

export default function Home() {
  return (
    <main className="flex flex-col">
        <HeroSection />
        <ShowcaseSection />
        <ProizvodSection />
        <ZastoMiSection />
        {/* <TestimonialSection /> */}
        <ContactSection />
        {/* <CTA /> */}
    </main>
  );
}

import { Metadata } from "next";
import HeroSection from "@/components/ui/HeroSection";
import ShowcaseSection from "@/components/ui/ShowcaseSection";
import ProizvodSection from "@/components/ui/ProizvodSection";
import ZastoMiSection from "@/components/ui/ZastoMiSection";
import TestimonialSection from "@/components/ui/TestimonialSection";
import ContactSection from "@/components/ui/ContactSection";
import CTA from "@/components/ui/CTA";

export const metadata: Metadata = {
  title: "Dariov sajt",
  description: "Prodavnica za labelo",
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

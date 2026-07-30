import { BarbersSection } from "@/components/landing/BarbersSection";
import { BookingSection } from "@/components/landing/BookingSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";
import { location } from "@/data/location";
import { Suspense } from "react";

function SectionFallback() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="h-80 animate-pulse rounded-3xl border border-brand-gold/20 bg-black/40" />
    </section>
  );
}

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "Império Barbearia",
    description: "Império Barbearia em Itapecerica da Serra com agendamento online.",
    image: "/imperio-logo.png",
    telephone: "+55 11 91281-7535",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${location.streetAddress} ${location.neighborhood}`,
      addressLocality: location.city,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: location.openingHours.opens,
        closes: location.openingHours.closes,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base-black text-white">
      <main className="mx-auto flex w-full flex-col">
        <RevealOnScroll>
          <HeroSection />
        </RevealOnScroll>
        <RevealOnScroll delayMs={40}>
          <HowItWorksSection />
        </RevealOnScroll>
        <RevealOnScroll delayMs={50}>
          <GallerySection />
        </RevealOnScroll>
        <RevealOnScroll delayMs={60}>
          <Suspense fallback={<SectionFallback />}>
            <BarbersSection />
          </Suspense>
        </RevealOnScroll>
        <RevealOnScroll delayMs={80}>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
        </RevealOnScroll>
        <RevealOnScroll delayMs={120}>
          <Suspense fallback={<SectionFallback />}>
            <BookingSection />
          </Suspense>
        </RevealOnScroll>
      </main>
      <FooterSection />
      <WhatsAppFab />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </div>
  );
}

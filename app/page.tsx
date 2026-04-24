import { BookingSection } from "@/components/landing/BookingSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { ServicesSection } from "@/components/landing/ServicesSection";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "Império Barbearia",
    description: "Barbearia premium no Centro de São Paulo com agendamento online.",
    image: "/imperio-logo.png",
    telephone: "+55 11 99999-9999",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua das Lâminas, 247",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01000-000",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
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
        <RevealOnScroll delayMs={80}>
          <ServicesSection />
        </RevealOnScroll>
        <RevealOnScroll delayMs={120}>
          <BookingSection />
        </RevealOnScroll>
      </main>
      <FooterSection />

      <a
        href="https://wa.me/5511999999999"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-gold/45 hover:bg-black active:translate-y-0 active:scale-[0.98] md:hidden"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M19.03 4.97A9.9 9.9 0 0 0 12 2a9.96 9.96 0 0 0-8.64 14.95L2 22l5.2-1.35A10 10 0 0 0 12 22a10 10 0 0 0 7.03-17.03Zm-7.03 15.34a8.3 8.3 0 0 1-4.24-1.17l-.3-.18-3.08.8.82-3-.2-.31a8.31 8.31 0 1 1 7 3.86Zm4.56-6.23c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.25-.73-.65-1.23-1.45-1.38-1.69-.14-.25-.02-.38.1-.5.12-.12.25-.31.37-.46.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.88-.2-.47-.41-.4-.57-.4l-.49-.01c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.9 2.4 1.02 2.56.12.17 1.76 2.68 4.27 3.76.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
        </svg>
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </div>
  );
}

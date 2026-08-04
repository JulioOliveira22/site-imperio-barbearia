"use client";

import { getBarberById, getBarberInitials } from "@/data/barbers";
import { getPortfolioByBarberId } from "@/data/portfolio";
import Image from "next/image";
import { useState } from "react";
import { useBookingSelection } from "./BookingSelectionContext";
import { StoryViewer } from "./StoryViewer";

export function PortfolioSection() {
  const { barberId } = useBookingSelection();
  const selectedBarber = getBarberById(barberId);
  const highlights = getPortfolioByBarberId(barberId);

  const [openHighlightIndex, setOpenHighlightIndex] = useState<number | null>(null);

  if (!selectedBarber || highlights.length === 0) return null;

  const initials = getBarberInitials(selectedBarber.name);
  const bookingHref = `/?barbeiro=${selectedBarber.id}#servicos`;

  return (
    <section
      id="portfolio"
      className="mx-auto w-full max-w-6xl snap-start px-5 py-8"
      aria-labelledby="portfolio-title"
    >
      <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
        Destaques
      </p>
      <h2
        id="portfolio-title"
        className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
      >
        Cortes do {selectedBarber.name}
      </h2>
      <p className="mt-2 text-sm text-zinc-300">
        Abre um destaque e dá uma olhada nos cortes dele.
      </p>

      <div className="no-scrollbar -mx-5 mt-5 flex gap-4 overflow-x-auto px-5 pb-1">
        {highlights.map((highlight, index) => {
          const cover = highlight.items[0];

          return (
            <button
              key={highlight.id}
              type="button"
              onClick={() => setOpenHighlightIndex(index)}
              className="group flex w-[4.75rem] shrink-0 touch-manipulation flex-col items-center gap-2"
              aria-label={`Abrir destaque ${highlight.label} de ${selectedBarber.name}`}
            >
              {/* Anel estilo destaque do Instagram, em dourado */}
              <span className="rounded-full bg-[conic-gradient(from_210deg,#d4af37,#f5e08e,#8a6d1d,#d4af37)] p-[2.5px] transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                <span className="block rounded-full bg-black p-[2.5px]">
                  <span className="relative block h-16 w-16 overflow-hidden rounded-full bg-zinc-900">
                    {cover ? (
                      <Image
                        src={cover.type === "video" ? "/portfolio/placeholder-1.svg" : cover.src}
                        alt={`Destaque ${highlight.label}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized={cover.src.endsWith(".svg")}
                      />
                    ) : null}
                  </span>
                </span>
              </span>
              <span className="max-w-full truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-300 group-hover:text-brand-gold">
                {highlight.label}
              </span>
            </button>
          );
        })}
      </div>

      {openHighlightIndex !== null ? (
        <StoryViewer
          barberName={selectedBarber.name}
          barberInitials={initials}
          highlights={highlights}
          startHighlightIndex={openHighlightIndex}
          bookingHref={bookingHref}
          onClose={() => setOpenHighlightIndex(null)}
        />
      ) : null}
    </section>
  );
}

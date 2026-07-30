"use client";

import { getBarberById } from "@/data/barbers";
import { services } from "@/data/services";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  const searchParams = useSearchParams();
  const barberId = searchParams.get("barbeiro");
  const selectedBarber = getBarberById(barberId);

  const categories = useMemo(
    () => Array.from(new Set(services.map((service) => service.category))),
    [],
  );
  const [openCategory, setOpenCategory] = useState<string>("");

  const groupedServices = useMemo(
    () =>
      categories.map((category) => ({
        category,
        items: services.filter((service) => service.category === category),
      })),
    [categories],
  );

  return (
    <section
      id="servicos"
      className="mx-auto w-full max-w-6xl snap-start px-5 py-8"
      aria-labelledby="servicos-title"
    >
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
          Serviços
        </p>
        <h2
          id="servicos-title"
          className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
        >
          Escolha seu serviço
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          {selectedBarber ? (
            <>
              Agendando com{" "}
              <span className="font-semibold text-brand-gold">{selectedBarber.name}</span>
              . Toque na categoria.
            </>
          ) : (
            "Escolha um barbeiro e depois a categoria."
          )}
        </p>
      </div>

      <div className="space-y-2">
        {groupedServices.map(({ category, items }) => {
          const isOpen = openCategory === category;

          return (
            <div
              key={category}
              className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                isOpen
                  ? "border-brand-gold/40 bg-black/50"
                  : "border-white/10 bg-black/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenCategory(isOpen ? "" : category)}
                className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left active:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-brand-gold">
                    {category}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-zinc-500">
                    {items.length} {items.length > 1 ? "opções" : "opção"}
                  </p>
                </div>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm text-brand-gold transition-transform duration-200 ${
                    isOpen
                      ? "rotate-90 border-brand-gold/50 bg-brand-gold/10"
                      : "border-white/15"
                  }`}
                  aria-hidden
                >
                  ›
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 border-t border-white/10 px-2.5 py-2.5">
                    {items.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        barberId={barberId}
                        canBook={Boolean(selectedBarber?.calLinks[service.id])}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

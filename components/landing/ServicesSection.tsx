"use client";

import { services } from "@/data/services";
import { useMemo, useState } from "react";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
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
      className="mx-auto w-full max-w-6xl snap-start px-5 py-10"
      aria-labelledby="servicos-title"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
          Serviços
        </p>
        <h2
          id="servicos-title"
          className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
        >
          Escolha seu serviço
        </h2>
        <p className="mt-3 text-sm text-zinc-300">
          Toque em uma categoria para ver os serviços disponíveis.
        </p>
      </div>

      <div className="space-y-3">
        {groupedServices.map(({ category, items }) => {
          const isOpen = openCategory === category;

          return (
            <div
              key={category}
              className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 transition-colors duration-200 hover:border-brand-gold/40"
            >
              <button
                type="button"
                onClick={() => setOpenCategory(isOpen ? "" : category)}
                className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors duration-200 hover:bg-white/[0.02]"
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-gold">
                    {category}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-zinc-400">
                    {items.length} serviço{items.length > 1 ? "s" : ""}
                  </p>
                </div>
                <span
                  className={`text-xl leading-none text-brand-gold transition-transform duration-200 ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
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
                  <div className="border-t border-white/10 p-4">
                    <div className="relative">
                      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1 min-[780px]:grid min-[780px]:grid-cols-2 min-[780px]:overflow-visible xl:grid-cols-3">
                        {items.map((service) => (
                          <div
                            key={service.id}
                            className="w-[88%] min-w-[280px] shrink-0 min-[780px]:w-auto min-[780px]:min-w-0"
                          >
                            <ServiceCard service={service} />
                          </div>
                        ))}
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent min-[780px]:hidden" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent min-[780px]:hidden" />
                    </div>
                    <div className="mt-3 min-[780px]:hidden">
                      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                        Arraste para o lado
                      </p>
                      <div className="mx-auto mt-2 h-1.5 w-36 rounded-full bg-white/10">
                        <div className="h-full w-14 rounded-full bg-brand-gold/85" />
                      </div>
                    </div>
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

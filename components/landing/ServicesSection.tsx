"use client";

import { getBarberById } from "@/data/barbers";
import {
  buildServiceIdsParam,
  getServiceById,
  getServicesByIds,
  parseServiceIdsParam,
  services,
  summarizeServices,
} from "@/data/services";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const barberId = searchParams.get("barbeiro");
  const selectedBarber = getBarberById(barberId);

  const categories = useMemo(
    () => Array.from(new Set(services.map((service) => service.category))),
    [],
  );

  const selectedIds = useMemo(() => {
    const fromList = parseServiceIdsParam(searchParams.get("servicos"));
    const legacy = searchParams.get("servico");
    if (fromList.length > 0) return fromList;
    return legacy ? [legacy] : [];
  }, [searchParams]);

  // Sempre começa com uma categoria aberta (importante no mobile)
  const [openCategory, setOpenCategory] = useState<string>(categories[0] ?? "Corte");

  const selectedServices = useMemo(() => getServicesByIds(selectedIds), [selectedIds]);
  const summary = useMemo(() => summarizeServices(selectedServices), [selectedServices]);

  const groupedServices = useMemo(
    () =>
      categories.map((category) => ({
        category,
        items: services.filter((service) => service.category === category),
      })),
    [categories],
  );

  function updateSelectedIds(nextIds: string[]) {
    if (!barberId) return;

    const params = new URLSearchParams();
    params.set("barbeiro", barberId);
    const encoded = buildServiceIdsParam(nextIds);
    if (encoded) {
      params.set("servicos", encoded);
    }

    router.replace(`/?${params.toString()}`, { scroll: false });
  }

  function toggleService(serviceId: string) {
    if (!barberId) return;

    const service = getServiceById(serviceId);
    if (!service) return;

    const exists = selectedIds.includes(serviceId);
    if (exists) {
      updateSelectedIds(selectedIds.filter((id) => id !== serviceId));
      return;
    }

    if (service.category === "Corte") {
      const withoutOtherCortes = selectedIds.filter((id) => {
        const current = getServiceById(id);
        return current?.category !== "Corte";
      });
      updateSelectedIds([...withoutOtherCortes, serviceId]);
      return;
    }

    updateSelectedIds([...selectedIds, serviceId]);
  }

  function isServiceBlocked(serviceId: string) {
    if (!barberId) return false;

    const service = getServiceById(serviceId);
    if (!service || service.category !== "Corte") return false;
    if (selectedIds.includes(serviceId)) return false;

    return selectedIds.some((id) => getServiceById(id)?.category === "Corte");
  }

  const bookingHref = barberId
    ? `/?barbeiro=${barberId}${
        selectedIds.length > 0 ? `&servicos=${buildServiceIdsParam(selectedIds)}` : ""
      }#agendamento`
    : "/#barbeiros";

  return (
    <section
      id="servicos"
      className="relative z-10 mx-auto w-full max-w-6xl snap-start px-5 py-8"
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
          Escolha seus serviços
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          {selectedBarber ? (
            <>
              Agendando com{" "}
              <span className="font-semibold text-brand-gold">{selectedBarber.name}</span>
              . Toque para adicionar — em Corte, só uma opção.
            </>
          ) : (
            "Escolha um barbeiro e depois os serviços."
          )}
        </p>
      </div>

      <div className={`space-y-2 ${selectedServices.length > 0 ? "pb-28" : ""}`}>
        {groupedServices.map(({ category, items }) => {
          const isOpen = openCategory === category;
          const selectedInCategory = items.filter((item) =>
            selectedIds.includes(item.id),
          ).length;

          return (
            <div
              key={category}
              className={`rounded-2xl border transition-colors duration-200 ${
                isOpen
                  ? "border-brand-gold/40 bg-black/50"
                  : "border-white/10 bg-black/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenCategory(category)}
                className="flex w-full items-center justify-between gap-3 px-3.5 py-3.5 text-left active:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-brand-gold">
                    {category}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-zinc-500">
                    {items.length} {items.length > 1 ? "opções" : "opção"}
                    {selectedInCategory > 0 ? ` · ${selectedInCategory} selecionado` : ""}
                  </p>
                </div>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm text-brand-gold transition-transform duration-200 ${
                    isOpen
                      ? "rotate-90 border-brand-gold/50 bg-brand-gold/10"
                      : "border-white/15"
                  }`}
                  aria-hidden
                >
                  ›
                </span>
              </button>

              {isOpen ? (
                <div className="space-y-2 border-t border-white/10 px-2.5 py-2.5">
                  {items.map((service) => {
                    const blocked = isServiceBlocked(service.id);

                    return (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        selected={selectedIds.includes(service.id)}
                        disabled={!barberId || blocked}
                        disabledHint={
                          !barberId
                            ? "Escolha o barbeiro"
                            : blocked
                              ? "Já há um corte selecionado"
                              : undefined
                        }
                        onToggle={() => toggleService(service.id)}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {selectedServices.length > 0 && barberId ? (
        <div
          className="fixed inset-x-0 z-40 border-t border-brand-gold/30 bg-black/95 px-4 py-3 backdrop-blur"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="mx-auto flex max-w-6xl items-center gap-3 pr-16">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">
                {selectedServices.length} serviço
                {selectedServices.length > 1 ? "s" : ""}
              </p>
              <p className="mt-0.5 truncate text-[11px] uppercase tracking-[0.08em] text-zinc-400">
                {summary.durationLabel} · {summary.priceLabel}
              </p>
            </div>
            <Link
              href={bookingHref}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-brand-gold px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Agendar
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}

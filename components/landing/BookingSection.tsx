 "use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/data/services";
import { CalEmbed } from "./CalEmbed";

export function BookingSection() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("servico");
  const fallbackCalLink = process.env.NEXT_PUBLIC_CAL_LINK;

  const bookableServices = useMemo(
    () => services.filter((service) => Boolean(service.calLink)),
    [],
  );

  const selectedService = useMemo(
    () => bookableServices.find((service) => service.id === serviceId) ?? bookableServices[0],
    [bookableServices, serviceId],
  );

  const selectedCalLink = selectedService?.calLink ?? fallbackCalLink;

  return (
    <section
      id="agendamento"
      className="mx-auto w-full max-w-6xl snap-start px-5 py-10"
      aria-labelledby="agendamento-title"
    >
      <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">Agendamento</p>
      <h2
        id="agendamento-title"
        className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
      >
        Escolha o melhor horário
      </h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-zinc-300">
        Selecione um serviço na seção “Serviços e preços” e confirme seu atendimento.
      </p>

      <div className="mt-6 rounded-2xl border border-brand-gold/40 bg-gradient-to-r from-brand-gold/10 to-black/40 px-4 py-3 shadow-[0_0_0_1px_rgba(212,175,55,0.15)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
              Serviço selecionado
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{selectedService?.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-zinc-400">
              {selectedService?.duration} · {selectedService?.price}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-brand-gold/60 bg-brand-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-gold">
            ✓ pronto
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-brand-gold/35 bg-gradient-to-b from-base-charcoal to-black p-4 shadow-glow">
        <CalEmbed calLink={selectedCalLink} />
      </div>
    </section>
  );
}

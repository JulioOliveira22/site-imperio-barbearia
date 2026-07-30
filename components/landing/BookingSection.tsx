"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getBarberById, getBarberCalLink, getBarberInitials } from "@/data/barbers";
import { services } from "@/data/services";
import { CalEmbed } from "./CalEmbed";

export function BookingSection() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("servico");
  const barberId = searchParams.get("barbeiro");
  const fallbackCalLink = process.env.NEXT_PUBLIC_CAL_LINK;

  const selectedBarber = getBarberById(barberId);

  const bookableServices = useMemo(() => {
    if (!selectedBarber) return [];
    return services.filter((service) => Boolean(selectedBarber.calLinks[service.id]));
  }, [selectedBarber]);

  const selectedService = useMemo(() => {
    if (!serviceId) return undefined;
    return bookableServices.find((service) => service.id === serviceId);
  }, [bookableServices, serviceId]);

  const selectedCalLink =
    selectedBarber && selectedService
      ? (getBarberCalLink(selectedBarber, selectedService.id) ?? fallbackCalLink)
      : undefined;

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
        Escolha o barbeiro e o serviço para abrir a agenda correta.
      </p>

      {!selectedBarber ? (
        <div className="mt-6 rounded-2xl border border-brand-gold/40 bg-gradient-to-r from-brand-gold/10 to-black/40 px-4 py-5">
          <p className="text-sm font-semibold text-white">Selecione um barbeiro para continuar</p>
          <p className="mt-2 text-sm text-zinc-300">
            Cada profissional tem a própria agenda. Escolha quem vai te atender.
          </p>
          <Link
            href="/#barbeiros"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/15 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition-colors duration-200 hover:bg-brand-gold/20"
          >
            Ver barbeiros
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-3 min-[640px]:grid-cols-2">
            <div className="rounded-2xl border border-brand-gold/40 bg-gradient-to-r from-brand-gold/10 to-black/40 px-4 py-3 shadow-[0_0_0_1px_rgba(212,175,55,0.15)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
                Barbeiro selecionado
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-sm font-bold tracking-[0.08em] text-black">
                  {getBarberInitials(selectedBarber.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{selectedBarber.name}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-gold/40 bg-gradient-to-r from-brand-gold/10 to-black/40 px-4 py-3 shadow-[0_0_0_1px_rgba(212,175,55,0.15)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    Serviço selecionado
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {selectedService?.name ?? "Escolha um serviço"}
                  </p>
                  {selectedService ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-zinc-400">
                      {selectedService.duration} · {selectedService.price}
                    </p>
                  ) : null}
                </div>
                {selectedService ? (
                  <span className="inline-flex items-center rounded-full border border-brand-gold/60 bg-brand-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-gold">
                    ✓ pronto
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-brand-gold/35 bg-gradient-to-b from-base-charcoal to-black p-4 shadow-glow">
            {selectedService ? (
              <CalEmbed calLink={selectedCalLink} />
            ) : (
              <div className="rounded-2xl border border-brand-gold/50 bg-black/50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold">
                  Escolha um serviço
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Selecione um serviço disponível para abrir a agenda de {selectedBarber.name}.
                </p>
                <Link
                  href={barberId ? `/?barbeiro=${barberId}#servicos` : "/#servicos"}
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/15 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition-colors duration-200 hover:bg-brand-gold/20"
                >
                  Ver serviços
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

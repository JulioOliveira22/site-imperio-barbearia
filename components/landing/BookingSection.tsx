"use client";

import { useMemo } from "react";
import Link from "next/link";
import { getBarberById, getBarberInitials } from "@/data/barbers";
import { getServicesByIds, summarizeServices } from "@/data/services";
import { buildBookingNotes, getBarberBookingCalLink } from "@/lib/booking";
import { useBookingSelection } from "./BookingSelectionContext";
import { CalEmbed } from "./CalEmbed";

export function BookingSection() {
  const { barberId, selectedIds } = useBookingSelection();
  const fallbackCalLink = process.env.NEXT_PUBLIC_CAL_LINK;

  const selectedBarber = getBarberById(barberId);
  const selectedServices = useMemo(() => getServicesByIds(selectedIds), [selectedIds]);
  const summary = useMemo(() => summarizeServices(selectedServices), [selectedServices]);

  const selectedCalLink = selectedBarber
    ? getBarberBookingCalLink(selectedBarber, selectedServices, fallbackCalLink)
    : undefined;

  const bookingNotes =
    selectedBarber && selectedServices.length > 0
      ? buildBookingNotes(
          selectedBarber.name,
          selectedServices,
          summary.bookingDurationLabel,
        )
      : undefined;

  return (
    <section
      id="agendamento"
      className="mx-auto w-full max-w-6xl snap-start px-5 py-10"
      aria-labelledby="agendamento-title"
    >
      <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
        Agendamento
      </p>
      <h2
        id="agendamento-title"
        className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
      >
        Escolha o melhor horário
      </h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-zinc-300">
        Escolha o barbeiro e um ou mais serviços para abrir a agenda.
      </p>

      {!selectedBarber ? (
        <div className="mt-6 rounded-2xl border border-brand-gold/40 bg-gradient-to-r from-brand-gold/10 to-black/40 px-4 py-5">
          <p className="text-sm font-semibold text-white">
            Selecione um barbeiro para continuar
          </p>
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
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    {selectedServices.length > 1
                      ? "Serviços selecionados"
                      : "Serviço selecionado"}
                  </p>
                  {selectedServices.length > 0 ? (
                    <>
                      <ul className="mt-2 space-y-1">
                        {selectedServices.map((service) => (
                          <li key={service.id} className="text-sm font-semibold text-white">
                            {service.name}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-400">
                        {summary.durationLabel} · {summary.priceLabel}
                      </p>
                    </>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-white">Escolha os serviços</p>
                  )}
                </div>
                {selectedServices.length > 0 ? (
                  <span className="inline-flex items-center rounded-full border border-brand-gold/60 bg-brand-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-gold">
                    {selectedServices.length}×
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-brand-gold/35 bg-gradient-to-b from-base-charcoal to-black p-4 shadow-glow">
            {selectedServices.length > 0 ? (
              <>
                <p className="mb-4 text-xs leading-relaxed text-zinc-400">
                  Tempo dos serviços:{" "}
                  <span className="text-zinc-200">{summary.durationLabel}</span>
                  {summary.bookingMinutes !== summary.totalMinutes ? (
                    <>
                      {" "}
                      · reservado no Cal:{" "}
                      <span className="text-zinc-200">{summary.bookingDurationLabel}</span>{" "}
                      (arredondado para a duração disponível)
                    </>
                  ) : null}
                  . A lista de serviços vai nas observações do agendamento.
                </p>
                <CalEmbed
                  calLink={selectedCalLink}
                  notes={bookingNotes}
                  durationMinutes={summary.bookingMinutes}
                />
              </>
            ) : (
              <div className="rounded-2xl border border-brand-gold/50 bg-black/50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold">
                  Escolha os serviços
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Selecione um ou mais serviços para abrir a agenda de {selectedBarber.name}.
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

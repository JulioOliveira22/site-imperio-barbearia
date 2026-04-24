import type { Service } from "@/data/services";
import { PrimaryCTA } from "./PrimaryCTA";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const canBookNow = Boolean(service.calLink);

  return (
    <article className="relative h-full overflow-hidden rounded-[1.75rem] border border-brand-gold/25 bg-gradient-to-b from-base-charcoal to-black p-5 shadow-[0_18px_40px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-gold/45">
      <div
        className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand-gold/20 via-brand-gold to-brand-gold/20"
        aria-hidden
      />
      <div className="flex items-start justify-between gap-4">
        <h3 className="max-w-[70%] text-lg font-black uppercase leading-tight tracking-[0.08em] text-white">
          {service.name}
        </h3>
        <p className="rounded-full border border-brand-gold/40 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold">
          {service.duration}
        </p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{service.description}</p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-xl font-extrabold text-brand-gold">{service.price}</p>
        {canBookNow ? (
          <PrimaryCTA
            label="Agendar"
            href={`/?servico=${service.id}#agendamento`}
            variant="secondary"
            className="min-h-11 w-auto rounded-2xl px-4 text-[11px]"
          />
        ) : (
          <span className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-dashed border-white/20 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
            Em breve
          </span>
        )}
      </div>
    </article>
  );
}

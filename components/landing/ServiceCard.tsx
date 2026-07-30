import type { Service } from "@/data/services";
import Link from "next/link";

type ServiceCardProps = {
  service: Service;
  barberId?: string | null;
  canBook?: boolean;
};

export function ServiceCard({ service, barberId, canBook = false }: ServiceCardProps) {
  const bookingHref = barberId
    ? `/?barbeiro=${barberId}&servico=${service.id}#agendamento`
    : "/#barbeiros";

  return (
    <article className="rounded-xl border border-white/10 bg-black/50 px-3 py-3 transition-colors duration-200 hover:border-brand-gold/35">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold uppercase leading-snug tracking-[0.04em] text-white">
            {service.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-400">
            {service.description}
          </p>
        </div>
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-gold/90">
          {service.duration}
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <p className="text-base font-extrabold text-brand-gold">{service.price}</p>

        {!barberId ? (
          <Link
            href="/#barbeiros"
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-brand-gold/45 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold transition-colors hover:bg-brand-gold/10"
          >
            Barbeiro
          </Link>
        ) : canBook ? (
          <Link
            href={bookingHref}
            className="inline-flex min-h-9 items-center justify-center rounded-full bg-brand-gold px-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Agendar
          </Link>
        ) : (
          <span className="inline-flex min-h-9 items-center justify-center rounded-full border border-dashed border-white/15 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
            Em breve
          </span>
        )}
      </div>
    </article>
  );
}

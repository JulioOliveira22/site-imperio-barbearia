"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { barbers, getBarberInitials } from "@/data/barbers";

export function BarbersSection() {
  const searchParams = useSearchParams();
  const selectedBarberId = searchParams.get("barbeiro");

  return (
    <section
      id="barbeiros"
      className="mx-auto w-full max-w-6xl snap-start px-5 py-8"
      aria-labelledby="barbeiros-title"
    >
      <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
        Equipe
      </p>
      <h2
        id="barbeiros-title"
        className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
      >
        Escolha seu barbeiro
      </h2>
      <p className="mt-2 text-sm text-zinc-300">
        Cada um tem a própria agenda.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {barbers.map((barber) => {
          const isSelected = selectedBarberId === barber.id;
          const initials = getBarberInitials(barber.name);

          return (
            <Link
              key={barber.id}
              href={`/?barbeiro=${barber.id}#servicos`}
              aria-current={isSelected ? "true" : undefined}
              className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 active:scale-[0.99] ${
                isSelected
                  ? "border-brand-gold bg-brand-gold/10 shadow-[0_0_0_1px_rgba(212,175,55,0.28)]"
                  : "border-white/10 bg-black/40 hover:border-brand-gold/40"
              }`}
            >
              <div
                className={`relative aspect-[3/4] w-full overflow-hidden ${
                  isSelected ? "bg-brand-gold/15" : "bg-zinc-900"
                }`}
              >
                {barber.photo ? (
                  <Image
                    src={barber.photo}
                    alt={`Foto de ${barber.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold tracking-[0.06em] ${
                        isSelected
                          ? "bg-brand-gold text-black"
                          : "bg-black/50 text-brand-gold ring-1 ring-brand-gold/40"
                      }`}
                    >
                      {initials}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                      Foto em breve
                    </span>
                  </div>
                )}

                {isSelected ? (
                  <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-black">
                    ✓
                  </span>
                ) : null}
              </div>

              <div className="px-3 py-3 text-center">
                <h3 className="text-base font-bold uppercase tracking-[0.08em] text-white">
                  {barber.name}
                </h3>
                <p
                  className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                    isSelected ? "text-brand-gold" : "text-zinc-500"
                  }`}
                >
                  {isSelected ? "Selecionado" : "Escolher"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

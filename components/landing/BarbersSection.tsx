"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  barbers,
  formatWhatsAppDisplay,
  getBarberInitials,
  getInstagramUrl,
  getWhatsAppUrl,
} from "@/data/barbers";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ""}`} aria-hidden>
      <path d="M19.03 4.97A9.9 9.9 0 0 0 12 2a9.96 9.96 0 0 0-8.64 14.95L2 22l5.2-1.35A10 10 0 0 0 12 22a10 10 0 0 0 7.03-17.03Zm-7.03 15.34a8.3 8.3 0 0 1-4.24-1.17l-.3-.18-3.08.8.82-3-.2-.31a8.31 8.31 0 1 1 7 3.86Zm4.56-6.23c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.25-.73-.65-1.23-1.45-1.38-1.69-.14-.25-.02-.38.1-.5.12-.12.25-.31.37-.46.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.88-.2-.47-.41-.4-.57-.4l-.49-.01c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.9 2.4 1.02 2.56.12.17 1.76 2.68 4.27 3.76.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

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

      <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 md:gap-4">
        {barbers.map((barber) => {
          const isSelected = selectedBarberId === barber.id;
          const initials = getBarberInitials(barber.name);

          return (
            <div
              key={barber.id}
              className={`group flex flex-col overflow-hidden rounded-3xl border backdrop-blur transition-all duration-300 ${
                isSelected
                  ? "border-brand-gold/80 bg-gradient-to-b from-brand-gold/[0.14] to-black/60 shadow-[0_0_28px_rgba(212,175,55,0.18),0_0_0_1px_rgba(212,175,55,0.3)]"
                  : "border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 hover:border-brand-gold/45 hover:shadow-[0_0_22px_rgba(212,175,55,0.1)]"
              }`}
            >
              <Link
                href={`/?barbeiro=${barber.id}#servicos`}
                aria-current={isSelected ? "true" : undefined}
                className="relative block active:scale-[0.99]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {barber.photo ? (
                    <Image
                      src={barber.photo}
                      alt={`Foto de ${barber.name}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 320px"
                    />
                  ) : (
                    <>
                      {/* Fundo decorativo do placeholder */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(212,175,55,0.2),transparent_58%)]" />
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.025)_0_1.5px,transparent_1.5px_14px)]" />

                      {/* Marca d'água discreta enquanto não há foto */}
                      <div className="absolute inset-0 flex -translate-y-3 items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-16 w-16 text-brand-gold/[0.16] transition-colors duration-300 group-hover:text-brand-gold/25 md:h-20 md:w-20"
                          aria-hidden
                        >
                          <circle cx="6.5" cy="6.5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
                          <circle cx="6.5" cy="17.5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
                          <path
                            d="M8.8 8.2 20 19M8.8 15.8 20 5M13.4 12.6l1.2 1.15"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </>
                  )}

                  {/* Monograma no canto da moldura */}
                  <span
                    className={`absolute left-2.5 top-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm ${
                      isSelected
                        ? "border-brand-gold/70 bg-gradient-to-b from-brand-gold to-[#b8942c] text-black shadow-[0_4px_14px_rgba(212,175,55,0.4)]"
                        : "border-brand-gold/40 bg-black/60 text-brand-gold"
                    }`}
                  >
                    <span className="font-brand text-sm font-bold">{initials}</span>
                  </span>

                  {/* Nome sobre o retrato */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-3 pb-2.5 pt-10 text-center">
                    <h3 className="font-brand text-lg font-bold uppercase tracking-[0.14em] text-white">
                      {barber.name}
                    </h3>
                    <div className="mx-auto mt-1.5 h-px w-10 bg-brand-gold/50" aria-hidden />
                  </div>

                  {isSelected ? (
                    <span className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-black shadow-[0_4px_14px_rgba(212,175,55,0.45)]">
                      ✓
                    </span>
                  ) : null}
                </div>

                <div className="flex justify-center bg-black/40 pb-3 pt-2">
                  <span
                    className={`inline-flex min-h-7 items-center justify-center gap-1.5 rounded-full px-3.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                      isSelected
                        ? "bg-brand-gold text-black"
                        : "border border-brand-gold/45 text-brand-gold group-hover:bg-brand-gold/10"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
                          <path
                            d="M3 8.5 6.5 12 13 4.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Selecionado
                      </>
                    ) : (
                      "Escolher"
                    )}
                  </span>
                </div>
              </Link>

              <div className="divide-y divide-white/[0.07] border-t border-white/10">
                <a
                  href={getInstagramUrl(barber.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram de ${barber.name}`}
                  className="flex min-h-10 items-center gap-1.5 px-2 transition-colors duration-200 hover:bg-brand-gold/[0.06]"
                >
                  <InstagramIcon className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                  <span className="min-w-0 truncate text-[9.5px] font-medium tracking-tight text-zinc-300">
                    @{barber.instagram}
                  </span>
                </a>
                <a
                  href={getWhatsAppUrl(
                    barber.whatsapp,
                    `Olá, ${barber.name}! Vim pelo site da Império Barbearia.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp de ${barber.name}`}
                  className="flex min-h-10 items-center gap-1.5 px-2.5 transition-colors duration-200 hover:bg-[#25D366]/[0.08]"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 text-[#25D366]" />
                  <span className="min-w-0 truncate text-[10px] font-medium text-zinc-300">
                    {formatWhatsAppDisplay(barber.whatsapp)}
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

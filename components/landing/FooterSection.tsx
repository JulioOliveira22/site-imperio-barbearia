import Image from "next/image";
import { PaymentIcon } from "@/components/icons/PaymentIcon";
import {
  barbers,
  formatWhatsAppDisplay,
  getBarberInitials,
  getWhatsAppUrl,
} from "@/data/barbers";
import { getMapsEmbedUrl, getMapsOpenUrl, location } from "@/data/location";
import { paymentMethods } from "@/data/payments";

export function FooterSection() {
  return (
    <footer className="relative border-t border-brand-gold/25 bg-base-charcoal/70">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-gold/10 to-transparent"
        aria-hidden
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-9">
        <div className="rounded-[1.8rem] border border-brand-gold/25 bg-black/40 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-brand-gold/40 shadow-glow">
              <Image
                src="/imperio-logo.png"
                alt="Logo da Império Barbearia"
                width={120}
                height={120}
                sizes="80px"
                className="h-full w-full scale-[1.2] object-cover object-center"
              />
            </div>
            <div>
              <p className="font-brand text-xl font-semibold uppercase tracking-[0.12em] text-brand-gold">
                Império Barbearia
              </p>
            </div>
          </div>

          <address className="mt-5 not-italic">
            <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                  Endereço
                </p>
                <p className="mt-1 text-sm text-zinc-100">{location.displayAddress}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                  Horário
                </p>
                <p className="mt-1 text-sm text-zinc-100">{location.openingHours.display}</p>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <iframe
                title="Mapa da Império Barbearia"
                src={getMapsEmbedUrl()}
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="border-t border-white/10 px-4 py-3">
                <a
                  href={getMapsOpenUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition-colors hover:text-brand-gold/80"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Contato
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Fale direto com o barbeiro no WhatsApp.
              </p>
              <ul className="mt-3 space-y-2.5">
                {barbers.map((barber) => (
                  <li key={barber.id}>
                    <a
                      href={getWhatsAppUrl(
                        barber.whatsapp,
                        `Olá, ${barber.name}! Vim pelo site da Império Barbearia.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-3 py-3 transition-all duration-200 hover:border-[#25D366]/45 hover:bg-[#25D366]/10 active:scale-[0.99]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-sm font-bold tracking-[0.06em] text-[#25D366] ring-1 ring-[#25D366]/35">
                        {getBarberInitials(barber.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">{barber.name}</p>
                        <p className="mt-0.5 text-xs text-zinc-400">
                          {formatWhatsAppDisplay(barber.whatsapp)}
                        </p>
                      </div>
                      <span className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#25D366] px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                          <path d="M19.03 4.97A9.9 9.9 0 0 0 12 2a9.96 9.96 0 0 0-8.64 14.95L2 22l5.2-1.35A10 10 0 0 0 12 22a10 10 0 0 0 7.03-17.03Zm-7.03 15.34a8.3 8.3 0 0 1-4.24-1.17l-.3-.18-3.08.8.82-3-.2-.31a8.31 8.31 0 1 1 7 3.86Z" />
                        </svg>
                        WhatsApp
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </address>

          <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              Formas de pagamento
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 min-[520px]:grid-cols-4">
              {paymentMethods.map((method) => (
                <li
                  key={method.id}
                  className="flex items-center gap-2 rounded-xl border border-brand-gold/20 bg-black/30 px-3 py-2.5"
                >
                  <PaymentIcon id={method.id} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-100">
                    {method.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white">
          <a
            href="https://www.instagram.com/imperio_barbeariaitap/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 transition-colors duration-200 hover:border-brand-gold/60 hover:bg-brand-gold/10"
          >
            Instagram
          </a>
          <a
            href={getMapsOpenUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 transition-colors duration-200 hover:border-brand-gold/60 hover:bg-brand-gold/10"
          >
            Google Maps
          </a>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col gap-2 text-xs text-zinc-500 min-[620px]:flex-row min-[620px]:items-center min-[620px]:justify-between">
            <p className="tracking-[0.08em]">
              © {new Date().getFullYear()} <span className="text-zinc-300">Império Barbearia</span> -
              Todos os direitos reservados.
            </p>
            <p className="tracking-[0.12em] uppercase text-zinc-400">
              Desenvolvido por <span className="font-semibold text-brand-gold">JulioOliveira</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

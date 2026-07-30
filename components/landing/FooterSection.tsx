import Image from "next/image";
import {
  barbers,
  formatWhatsAppDisplay,
  getWhatsAppUrl,
} from "@/data/barbers";
import { getMapsEmbedUrl, getMapsOpenUrl, location } from "@/data/location";
import { paymentMethods } from "@/data/payments";

function PaymentIcon({ id }: { id: (typeof paymentMethods)[number]["id"] }) {
  const className = "h-5 w-5 shrink-0 text-brand-gold";

  if (id === "credito" || id === "debito") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "pix") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M8.2 5.2 5.2 8.2a2 2 0 0 0 0 2.8l5.4 5.4a2 2 0 0 0 2.8 0l5.4-5.4a2 2 0 0 0 0-2.8l-3-3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8 5.2 18.8 8.2a2 2 0 0 1 0 2.8l-5.4 5.4a2 2 0 0 1-2.8 0L5.2 11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10h4M7 14h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

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
                width={600}
                height={600}
                className="h-full w-full scale-[1.2] object-cover object-center"
              />
            </div>
            <div>
              <p className="font-brand text-xl font-semibold uppercase tracking-[0.12em] text-brand-gold">
                Império Barbearia
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
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
            <ul className="mt-3 space-y-3">
              {barbers.map((barber) => (
                <li key={barber.id} className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white">{barber.name}</span>
                  <a
                    href={getWhatsAppUrl(barber.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#25D366] transition-colors hover:text-[#20ba5a]"
                  >
                    {formatWhatsAppDisplay(barber.whatsapp)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

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

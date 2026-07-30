"use client";

import {
  barbers,
  formatWhatsAppDisplay,
  getBarberInitials,
  getWhatsAppUrl,
} from "@/data/barbers";
import { useEffect, useId, useState } from "react";

const DEFAULT_MESSAGE = "Olá! Vim pelo site da Império Barbearia.";

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Conversar no WhatsApp"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#1da851] bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20ba5a] active:translate-y-0 active:scale-[0.98]"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
          <path d="M19.03 4.97A9.9 9.9 0 0 0 12 2a9.96 9.96 0 0 0-8.64 14.95L2 22l5.2-1.35A10 10 0 0 0 12 22a10 10 0 0 0 7.03-17.03Zm-7.03 15.34a8.3 8.3 0 0 1-4.24-1.17l-.3-.18-3.08.8.82-3-.2-.31a8.31 8.31 0 1 1 7 3.86Zm4.56-6.23c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.25-.73-.65-1.23-1.45-1.38-1.69-.14-.25-.02-.38.1-.5.12-.12.25-.31.37-.46.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.88-.2-.47-.41-.4-.57-.4l-.49-.01c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.9 2.4 1.02 2.56.12.17 1.76 2.68 4.27 3.76.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:px-5">
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md rounded-t-3xl border border-brand-gold/30 bg-base-charcoal p-5 shadow-[0_-12px_40px_rgba(0,0,0,0.5)] sm:rounded-3xl"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 sm:hidden" aria-hidden />

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
                  WhatsApp
                </p>
                <h2 id={titleId} className="mt-1 text-xl font-black uppercase tracking-[0.08em] text-white">
                  Falar com quem?
                </h2>
                <p className="mt-2 text-sm text-zinc-300">
                  Escolha o barbeiro para abrir a conversa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-brand-gold/45 hover:text-brand-gold"
                aria-label="Fechar seletor"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {barbers.map((barber) => (
                <a
                  key={barber.id}
                  href={getWhatsAppUrl(barber.whatsapp, DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 transition-all duration-200 hover:border-[#25D366]/50 hover:bg-[#25D366]/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold tracking-[0.08em] text-white">
                    {getBarberInitials(barber.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white">
                      {barber.name}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {formatWhatsAppDisplay(barber.whatsapp)}
                    </p>
                  </div>
                  <span className="text-sm text-[#25D366]" aria-hidden>
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

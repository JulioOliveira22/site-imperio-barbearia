"use client";

import { useEffect, useRef, useState } from "react";

type CalEmbedProps = {
  calLink?: string;
};

export function CalEmbed({ calLink }: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRenderEmbed, setShouldRenderEmbed] = useState(false);

  if (!calLink) {
    return (
      <div className="rounded-2xl border border-brand-gold/50 bg-black/50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold">
          Configuração pendente do Cal.com
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Defina a variável <code>NEXT_PUBLIC_CAL_LINK</code> para ativar o calendário.
        </p>
        <p className="mt-2 text-xs text-zinc-400">
          Exemplo: <code>NEXT_PUBLIC_CAL_LINK=imperio-barbearia/corte-classico</code>
        </p>
      </div>
    );
  }

  const calendarUrl = `https://cal.com/${calLink}?embed=true&theme=dark&hideEventTypeDetails=false&locale=pt-BR`;

  useEffect(() => {
    setIsLoaded(false);
    setShouldRenderEmbed(false);
  }, [calendarUrl]);

  useEffect(() => {
    if (shouldRenderEmbed) {
      return;
    }

    const target = containerRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldRenderEmbed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRenderEmbed]);

  return (
    <div ref={containerRef} className="relative">
      {!shouldRenderEmbed ? (
        <div className="flex h-[640px] flex-col items-center justify-center rounded-2xl border border-brand-gold/25 bg-black/90 p-5 text-center">
          <div className="w-full max-w-sm space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold/90">
              Agenda otimizada para mobile
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              Toque para carregar os horários com maior estabilidade e melhor performance.
            </p>
            <button
              type="button"
              onClick={() => setShouldRenderEmbed(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/15 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition-colors duration-200 hover:bg-brand-gold/20 active:scale-[0.99]"
            >
              Carregar agenda
            </button>
          </div>
        </div>
      ) : (
        <>
          {!isLoaded ? (
            <div className="absolute inset-0 z-10 flex h-[640px] items-center justify-center rounded-2xl border border-brand-gold/25 bg-black/90">
              <div className="w-full max-w-sm space-y-4 px-5">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold/90">
                  Carregando agenda
                </p>
                <div className="h-3 animate-pulse rounded-full bg-white/10" />
                <div className="h-3 animate-pulse rounded-full bg-white/10 [animation-delay:120ms]" />
                <div className="h-3 animate-pulse rounded-full bg-white/10 [animation-delay:220ms]" />
              </div>
            </div>
          ) : null}

          <iframe
            key={calendarUrl}
            title="Agendamento online Império Barbearia"
            src={calendarUrl}
            className="h-[640px] w-full rounded-2xl border border-brand-gold/25 bg-black"
            loading="lazy"
            style={{ touchAction: "manipulation" }}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  );
}

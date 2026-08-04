"use client";

import type { Highlight } from "@/data/portfolio";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const IMAGE_DURATION_MS = 5000;
const HOLD_THRESHOLD_MS = 220;

type StoryViewerProps = {
  barberName: string;
  barberInitials: string;
  highlights: Highlight[];
  startHighlightIndex: number;
  bookingHref: string;
  onClose: () => void;
};

export function StoryViewer({
  barberName,
  barberInitials,
  highlights,
  startHighlightIndex,
  bookingHref,
  onClose,
}: StoryViewerProps) {
  const [highlightIndex, setHighlightIndex] = useState(startHighlightIndex);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const progressRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pointerDownAtRef = useRef(0);

  const highlight = highlights[highlightIndex];
  const media = highlight?.items[mediaIndex];

  const goNext = useCallback(() => {
    setProgress(0);
    progressRef.current = 0;

    const current = highlights[highlightIndex];
    if (!current) return;

    if (mediaIndex < current.items.length - 1) {
      setMediaIndex(mediaIndex + 1);
      return;
    }
    if (highlightIndex < highlights.length - 1) {
      setHighlightIndex(highlightIndex + 1);
      setMediaIndex(0);
      return;
    }
    onClose();
  }, [highlights, highlightIndex, mediaIndex, onClose]);

  const goPrev = useCallback(() => {
    setProgress(0);
    progressRef.current = 0;

    if (mediaIndex > 0) {
      setMediaIndex(mediaIndex - 1);
      return;
    }
    if (highlightIndex > 0) {
      const previous = highlights[highlightIndex - 1];
      setHighlightIndex(highlightIndex - 1);
      setMediaIndex(Math.max(0, previous.items.length - 1));
    }
  }, [highlights, highlightIndex, mediaIndex]);

  // Timer das imagens (vídeo controla o próprio progresso)
  useEffect(() => {
    if (!media || media.type !== "image" || paused) return;

    const duration = media.durationMs ?? IMAGE_DURATION_MS;
    const startedAt = Date.now();
    const baseProgress = progressRef.current;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const next = baseProgress + (elapsed / duration) * 100;
      if (next >= 100) {
        clearInterval(interval);
        goNext();
        return;
      }
      progressRef.current = next;
      setProgress(next);
    }, 50);

    return () => clearInterval(interval);
  }, [media, paused, goNext]);

  // Pausa/retoma o vídeo junto com o estado
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) {
      video.pause();
    } else {
      void video.play().catch(() => undefined);
    }
  }, [paused, media]);

  // Teclado + trava o scroll da página
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, goNext, goPrev]);

  if (!highlight || !media) return null;

  function handlePointerDown() {
    pointerDownAtRef.current = Date.now();
    setPaused(true);
  }

  function handlePointerUp(direction: "prev" | "next") {
    const heldFor = Date.now() - pointerDownAtRef.current;
    setPaused(false);
    // Toque curto navega; segurar só pausa
    if (heldFor < HOLD_THRESHOLD_MS) {
      if (direction === "next") goNext();
      else goPrev();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Portfólio de ${barberName} — ${highlight.label}`}
    >
      {/* Fecha ao clicar fora (desktop) */}
      <button
        type="button"
        aria-label="Fechar portfólio"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="relative h-dvh w-full overflow-hidden bg-zinc-950 sm:h-[min(92vh,820px)] sm:w-auto sm:aspect-[9/16] sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
        {/* Mídia */}
        <div className="absolute inset-0">
          {media.type === "video" ? (
            <video
              key={media.id}
              ref={videoRef}
              src={media.src}
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                if (!video.duration) return;
                const value = (video.currentTime / video.duration) * 100;
                progressRef.current = value;
                setProgress(value);
              }}
              onEnded={goNext}
            />
          ) : (
            <Image
              key={media.id}
              src={media.src}
              alt={media.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 460px"
              priority
              unoptimized={media.src.endsWith(".svg")}
            />
          )}
        </div>

        {/* Sombras para legibilidade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Barras de progresso */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex gap-1 px-3"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 10px)" }}
        >
          {highlight.items.map((item, index) => (
            <div key={item.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width:
                    index < mediaIndex
                      ? "100%"
                      : index === mediaIndex
                        ? `${progress}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Cabeçalho — acima das zonas de toque */}
        <div
          className="absolute inset-x-0 top-0 z-30 flex items-center gap-2.5 px-3"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)" }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-gold/60 bg-black/60 font-brand text-xs font-bold text-brand-gold">
            {barberInitials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{barberName}</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-zinc-300">
              {highlight.label} · {mediaIndex + 1}/{highlight.items.length}
            </p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            aria-label="Fechar"
            className="relative z-40 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl leading-none text-white transition-colors hover:bg-white/15 active:scale-95"
          >
            ×
          </button>
        </div>

        {/* Zonas de toque (fora do cabeçalho e do CTA) */}
        <div
          className="absolute inset-x-0 z-10 flex"
          style={{
            top: "calc(env(safe-area-inset-top, 0px) + 72px)",
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)",
          }}
        >
          <button
            type="button"
            aria-label="Anterior"
            className="h-full w-1/3 cursor-pointer touch-manipulation select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={() => handlePointerUp("prev")}
            onPointerCancel={() => setPaused(false)}
          />
          <button
            type="button"
            aria-label="Próximo"
            className="h-full flex-1 cursor-pointer touch-manipulation select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={() => handlePointerUp("next")}
            onPointerCancel={() => setPaused(false)}
          />
        </div>

        {/* CTA de agendamento — acima das zonas de toque */}
        <div
          className="absolute inset-x-0 bottom-0 z-30 flex justify-center px-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
        >
          <a
            href={bookingHref}
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-gold px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-black shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition-transform active:scale-[0.98]"
          >
            Agendar com {barberName}
          </a>
        </div>
      </div>
    </div>
  );
}

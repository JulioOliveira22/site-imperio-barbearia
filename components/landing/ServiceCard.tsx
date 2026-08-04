"use client";

import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  selected?: boolean;
  disabled?: boolean;
  disabledHint?: string;
  onToggle?: () => void;
};

export function ServiceCard({
  service,
  selected = false,
  disabled = false,
  disabledHint,
  onToggle,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (disabled) return;
        onToggle?.();
      }}
      aria-pressed={selected}
      aria-disabled={disabled}
      className={`w-full touch-manipulation select-none rounded-xl border px-3 py-3 text-left transition-colors duration-150 ${
        disabled
          ? "cursor-not-allowed opacity-45"
          : selected
            ? "cursor-pointer border-brand-gold bg-brand-gold/10"
            : "cursor-pointer border-white/10 bg-black/50 active:bg-brand-gold/15"
      }`}
      style={{ WebkitTapHighlightColor: "rgba(212,175,55,0.25)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold ${
                selected
                  ? "border-brand-gold bg-brand-gold text-black"
                  : "border-white/20 text-transparent"
              }`}
              aria-hidden
            >
              ✓
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold uppercase leading-snug tracking-[0.04em] text-white">
                {service.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                {service.description}
              </p>
            </div>
          </div>
        </div>
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-gold/90">
          {service.duration}
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 pl-7">
        <p className="text-base font-extrabold text-brand-gold">
          {service.priceFrom ? (
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
              a partir de
            </span>
          ) : null}
          {service.price}
        </p>
        <span
          className={`inline-flex min-h-8 items-center justify-center rounded-full px-3 text-[10px] font-bold uppercase tracking-[0.12em] ${
            selected
              ? "bg-brand-gold text-black"
              : disabled && disabledHint
                ? "border border-white/15 text-zinc-500"
                : "border border-brand-gold/45 text-brand-gold"
          }`}
        >
          {selected ? "Selecionado" : disabled && disabledHint ? disabledHint : "Adicionar"}
        </span>
      </div>
    </button>
  );
}

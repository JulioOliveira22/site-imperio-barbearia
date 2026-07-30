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
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={`w-full rounded-xl border px-3 py-3 text-left transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 ${
        selected
          ? "border-brand-gold bg-brand-gold/10"
          : "border-white/10 bg-black/50 hover:border-brand-gold/35"
      }`}
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
        <p className="text-base font-extrabold text-brand-gold">{service.price}</p>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${
            selected
              ? "text-brand-gold"
              : disabled && disabledHint
                ? "text-zinc-500"
                : "text-zinc-500"
          }`}
        >
          {selected ? "Selecionado" : disabled && disabledHint ? disabledHint : "Adicionar"}
        </span>
      </div>
    </button>
  );
}

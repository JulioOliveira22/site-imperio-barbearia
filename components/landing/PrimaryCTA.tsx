type PrimaryCTAProps = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function PrimaryCTA({
  label,
  href = "#agendamento",
  variant = "primary",
  className = "",
}: PrimaryCTAProps) {
  const baseClasses =
    "inline-flex min-h-14 w-full items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60";
  const variantClasses =
    variant === "primary"
      ? "bg-brand-gold text-black shadow-glow hover:brightness-110"
      : "border border-brand-gold/70 bg-transparent text-brand-gold hover:bg-brand-gold/10 hover:border-brand-gold";

  return (
    <a href={href} className={`${baseClasses} ${variantClasses} ${className}`.trim()}>
      {label}
    </a>
  );
}

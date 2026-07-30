import type { paymentMethods } from "@/data/payments";

type PaymentIconId = (typeof paymentMethods)[number]["id"];

type PaymentIconProps = {
  id: PaymentIconId;
  className?: string;
};

export function PaymentIcon({
  id,
  className = "h-5 w-5 shrink-0 text-brand-gold",
}: PaymentIconProps) {
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

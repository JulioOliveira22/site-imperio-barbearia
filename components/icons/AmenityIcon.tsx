type AmenityIconProps = {
  id: string;
  className?: string;
};

export function AmenityIcon({
  id,
  className = "h-5 w-5 text-brand-gold",
}: AmenityIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    className,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "wifi":
      return (
        <svg {...common}>
          <path
            d="M5 12.5a9.5 9.5 0 0 1 14 0M8.2 15.2a5.5 5.5 0 0 1 7.6 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="18.5" r="1.2" fill="currentColor" />
        </svg>
      );
    case "bilhar":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        </svg>
      );
    case "estacionamento":
      return (
        <svg {...common}>
          <rect x="4" y="3.5" width="16" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9 16.5V7.5h4.2a3 3 0 0 1 0 6H9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bebidas":
      return (
        <svg {...common}>
          <path
            d="M8 4h8l-1.2 10.5a3.2 3.2 0 0 1-3.2 2.8h-.2a3.2 3.2 0 0 1-3.2-2.8L8 4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 17.3V21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9.5 21h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M12 21s7-4.4 7-10a7 7 0 1 0-14 0c0 5.6 7 10 7 10Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

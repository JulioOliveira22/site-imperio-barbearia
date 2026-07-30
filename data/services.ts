export type Service = {
  id: string;
  name: string;
  category: "Corte" | "Barba" | "Estética";
  duration: string;
  price: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "corte-simples-tradicional",
    name: "Corte Simples / Tradicional",
    category: "Corte",
    duration: "40 min",
    price: "R$ 45,00",
    description: "Corte clássico, alinhado e finalizado com cuidado.",
  },
  {
    id: "corte-navalhado",
    name: "Corte Navalhado",
    category: "Corte",
    duration: "45 min",
    price: "R$ 50,00",
    description: "Acabamento na navalha para um visual limpo e definido.",
  },
  {
    id: "barba",
    name: "Barba",
    category: "Barba",
    duration: "25 min",
    price: "R$ 25,00",
    description: "Aparagem e contorno da barba no ponto.",
  },
  {
    id: "barboterapia",
    name: "Barboterapia",
    category: "Barba",
    duration: "40 min",
    price: "R$ 45,00",
    description: "Barba com toalha quente e ritual de relaxamento.",
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    category: "Estética",
    duration: "10 min",
    price: "R$ 10,00",
    description: "Design e alinhamento da sobrancelha.",
  },
  {
    id: "limpeza-de-pele",
    name: "Limpeza de Pele",
    category: "Estética",
    duration: "25 min",
    price: "R$ 20,00",
    description: "Limpeza para refrescar e cuidar da pele.",
  },
  {
    id: "hidratacao-no-cabelo",
    name: "Hidratação no Cabelo",
    category: "Estética",
    duration: "25 min",
    price: "R$ 20,00",
    description: "Hidratação para revitalizar e dar brilho aos fios.",
  },
];

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}

export function parsePriceToNumber(price: string) {
  const normalized = price.replace(/[^\d,]/g, "").replace(",", ".");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function parseDurationToMinutes(duration: string) {
  const hoursMatch = duration.match(/(\d+)\s*h/i);
  const minutesMatch = duration.match(/(\d+)\s*m/i);
  const hours = hoursMatch ? Number.parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? Number.parseInt(minutesMatch[1], 10) : 0;

  if (!hoursMatch && !minutesMatch) {
    const onlyNumber = duration.match(/(\d+)/);
    return onlyNumber ? Number.parseInt(onlyNumber[1], 10) : 0;
  }

  return hours * 60 + minutes;
}

export function formatPriceBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDurationLabel(totalMinutes: number) {
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function parseServiceIdsParam(param: string | null) {
  if (!param) return [] as string[];
  return param
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function buildServiceIdsParam(ids: string[]) {
  return Array.from(new Set(ids)).join(",");
}

export function getServicesByIds(ids: string[]) {
  return ids
    .map((id) => getServiceById(id))
    .filter((service): service is Service => Boolean(service));
}

/** Durações do evento Atendimento no Cal.com */
export const CAL_AVAILABLE_DURATIONS = [
  10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90, 120,
] as const;

/** Arredonda para cima até a próxima duração válida do Cal */
export function roundUpToCalDuration(totalMinutes: number) {
  if (totalMinutes <= 0) return CAL_AVAILABLE_DURATIONS[0];

  const match = CAL_AVAILABLE_DURATIONS.find((duration) => duration >= totalMinutes);
  return match ?? CAL_AVAILABLE_DURATIONS[CAL_AVAILABLE_DURATIONS.length - 1];
}

export function summarizeServices(selected: Service[]) {
  const totalMinutes = selected.reduce(
    (sum, service) => sum + parseDurationToMinutes(service.duration),
    0,
  );
  const bookingMinutes = roundUpToCalDuration(totalMinutes);
  const totalPrice = selected.reduce(
    (sum, service) => sum + parsePriceToNumber(service.price),
    0,
  );

  return {
    totalMinutes,
    bookingMinutes,
    totalPrice,
    durationLabel: formatDurationLabel(totalMinutes),
    bookingDurationLabel: formatDurationLabel(bookingMinutes),
    priceLabel: formatPriceBRL(totalPrice),
  };
}

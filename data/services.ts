export type Service = {
  id: string;
  name: string;
  category: "Corte" | "Barba" | "Química" | "Depilação" | "Estética";
  duration: string;
  price: string;
  description: string;
  /** Preço base — o valor final é definido na avaliação (exibe "a partir de") */
  priceFrom?: boolean;
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
    id: "relaxamento-capilar",
    name: "Relaxamento Capilar",
    category: "Química",
    duration: "20 min",
    price: "R$ 35,00",
    description: "Reduz o volume e alinha os fios com naturalidade.",
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    category: "Química",
    duration: "20 min",
    price: "R$ 20,00",
    description: "Disfarça falhas e realça o contorno do corte e da barba.",
  },
  {
    id: "platinado",
    name: "Platinado",
    category: "Química",
    duration: "2h 15m",
    price: "R$ 150,00",
    priceFrom: true,
    description: "Descoloração global com tonalização. Valor final conforme avaliação.",
  },
  {
    id: "luzes",
    name: "Luzes",
    category: "Química",
    duration: "2h 15m",
    price: "R$ 60,00",
    priceFrom: true,
    description: "Mechas para iluminar o visual. Valor final conforme avaliação.",
  },
  {
    id: "depilacao-nariz-orelha",
    name: "Depilação Nariz + Orelha",
    category: "Depilação",
    duration: "20 min",
    price: "R$ 20,00",
    description: "Remoção com cera nas duas regiões em um só atendimento.",
  },
  {
    id: "depilacao-nariz",
    name: "Depilação Nariz",
    category: "Depilação",
    duration: "10 min",
    price: "R$ 10,00",
    description: "Remoção com cera na região do nariz.",
  },
  {
    id: "depilacao-orelha",
    name: "Depilação Orelha",
    category: "Depilação",
    duration: "10 min",
    price: "R$ 10,00",
    description: "Remoção com cera na região da orelha.",
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
  {
    id: "hidratacao-profunda",
    name: "Hidratação Profunda",
    category: "Estética",
    duration: "35 min",
    price: "R$ 35,00",
    description: "Tratamento intensivo para fios ressecados ou com química.",
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
  10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90, 120, 150, 180,
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
  const hasFromPrice = selected.some((service) => service.priceFrom);

  return {
    totalMinutes,
    bookingMinutes,
    totalPrice,
    hasFromPrice,
    durationLabel: formatDurationLabel(totalMinutes),
    bookingDurationLabel: formatDurationLabel(bookingMinutes),
    priceLabel: hasFromPrice
      ? `a partir de ${formatPriceBRL(totalPrice)}`
      : formatPriceBRL(totalPrice),
  };
}

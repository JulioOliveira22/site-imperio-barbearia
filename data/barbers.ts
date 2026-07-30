export type Barber = {
  id: string;
  name: string;
  /** WhatsApp em E.164 sem +, ex: "55119XXXXXXXX" */
  whatsapp: string;
  /** Opcional — quando tiver foto real, coloque o caminho (ex: /barbers/luiz.jpg) */
  photo?: string;
  /** Links do Cal.com por serviço — ajuste cada barbeiro depois */
  calLinks: Partial<Record<string, string>>;
};

const sharedPlaceholderLinks: Partial<Record<string, string>> = {
  "corte-classico-executivo":
    "julio-cesar-antunes-de-oliveira-rmmraz/corte-classico-executivo",
  "barba-terapia-toalha-quente":
    "julio-cesar-antunes-de-oliveira-rmmraz/barba-terapia-com-toalha-quente",
  "combo-corte-barba":
    "julio-cesar-antunes-de-oliveira-rmmraz/combo-corte-barba",
};

export const barbers: Barber[] = [
  {
    id: "luiz",
    name: "Luiz",
    // Placeholder — troque pelo número real
    whatsapp: "5511912817535",
    calLinks: { ...sharedPlaceholderLinks },
  },
  {
    id: "isaque",
    name: "Isaque",
    // Placeholder — troque pelo número real
    whatsapp: "5511912817535",
    calLinks: { ...sharedPlaceholderLinks },
  },
];

export function getBarberById(id: string | null | undefined) {
  if (!id) return undefined;
  return barbers.find((barber) => barber.id === id);
}

export function getBarberCalLink(barber: Barber, serviceId: string) {
  return barber.calLinks[serviceId];
}

export function getBarberInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatWhatsAppDisplay(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("55")) {
    const ddd = digits.slice(2, 4);
    const part1 = digits.slice(4, 9);
    const part2 = digits.slice(9);
    return `(${ddd}) ${part1}-${part2}`;
  }
  return whatsapp;
}

export function getWhatsAppUrl(whatsapp: string, message?: string) {
  const base = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

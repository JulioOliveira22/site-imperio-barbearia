import { services } from "@/data/services";

export type Barber = {
  id: string;
  name: string;
  /** WhatsApp em E.164 sem +, ex: "55119XXXXXXXX" */
  whatsapp: string;
  /** Agenda principal no Cal.com (evento Atendimento) */
  calendarLink: string;
  /** Opcional — quando tiver foto real, coloque o caminho (ex: /barbers/luiz.jpg) */
  photo?: string;
  /** Opcional — override por serviço; se vazio, usa calendarLink */
  calLinks?: Partial<Record<string, string>>;
};

/** Evento único com múltiplas durações — troque o username do 2º barbeiro quando tiver conta própria */
const ATENDIMENTO_CAL_LINK = "julio-cesar-antunes-de-oliveira-rmmraz/atendimento";

function buildServiceCalLinks(calendarLink: string) {
  return Object.fromEntries(services.map((service) => [service.id, calendarLink]));
}

export const barbers: Barber[] = [
  {
    id: "luiz",
    name: "Luiz",
    // Placeholder — troque pelo número real
    whatsapp: "5511912817535",
    calendarLink: ATENDIMENTO_CAL_LINK,
    calLinks: buildServiceCalLinks(ATENDIMENTO_CAL_LINK),
  },
  {
    id: "isaque",
    name: "Isaque",
    // Placeholder — troque pelo número real
    whatsapp: "5511912817535",
    // Por enquanto mesma agenda — troque quando Isaque tiver Cal próprio
    calendarLink: ATENDIMENTO_CAL_LINK,
    calLinks: buildServiceCalLinks(ATENDIMENTO_CAL_LINK),
  },
];

export function getBarberById(id: string | null | undefined) {
  if (!id) return undefined;
  return barbers.find((barber) => barber.id === id);
}

export function getBarberCalLink(barber: Barber, serviceId: string) {
  return barber.calLinks?.[serviceId] ?? barber.calendarLink;
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

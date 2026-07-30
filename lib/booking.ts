import type { Service } from "@/data/services";
import type { Barber } from "@/data/barbers";
import { getBarberCalLink } from "@/data/barbers";
import { parseDurationToMinutes } from "@/data/services";

/** Agenda do barbeiro — usa override do serviço ou o calendarLink principal */
export function getBarberBookingCalLink(
  barber: Barber,
  selectedServices: Service[],
  fallback?: string,
) {
  const withOwnLink = [...selectedServices]
    .filter((service) => Boolean(getBarberCalLink(barber, service.id)))
    .sort(
      (a, b) => parseDurationToMinutes(b.duration) - parseDurationToMinutes(a.duration),
    );

  if (withOwnLink[0]) {
    return getBarberCalLink(barber, withOwnLink[0].id);
  }

  return barber.calendarLink || fallback;
}

export function buildBookingNotes(
  barberName: string,
  selectedServices: Service[],
  durationLabel?: string,
) {
  const names = selectedServices.map((service) => service.name).join(", ");
  const durationPart = durationLabel ? ` Tempo reservado: ${durationLabel}.` : "";
  return `Barbeiro: ${barberName}. Serviços: ${names}.${durationPart}`;
}

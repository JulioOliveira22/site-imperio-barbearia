export const location = {
  streetAddress: "Rua Inácio Pereira dos Santos, 99",
  neighborhood: "Centro",
  city: "Itapecerica da Serra",
  region: "SP",
  postalCode: "06871-020",
  country: "BR",
  displayAddress:
    "Rua Inácio Pereira dos Santos, 99 - Centro, Itapecerica da Serra - SP",
  mapsQuery: "Rua Inácio Pereira dos Santos, 99, Centro, Itapecerica da Serra - SP",
  openingHours: {
    daysLabel: "Segunda a Sábado",
    opens: "09:00",
    closes: "19:00",
    display: "Segunda a Sábado, 09:00 às 19:00",
  },
};

export function getMapsEmbedUrl() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(location.mapsQuery)}&z=16&output=embed`;
}

export function getMapsOpenUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`;
}

export type Amenity = {
  id: string;
  label: string;
  description: string;
};

export const amenities: Amenity[] = [
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Internet gratuita enquanto espera",
  },
  {
    id: "bilhar",
    label: "Mesa de bilhar",
    description: "Diversão antes ou depois do corte",
  },
  {
    id: "estacionamento",
    label: "Estacionamento",
    description: "Vaga próxima para sua comodidade",
  },
  {
    id: "bebidas",
    label: "Bebidas",
    description: "Água e café para o atendimento",
  },
  {
    id: "tv",
    label: "TV",
    description: "Conteúdo enquanto você espera",
  },
];

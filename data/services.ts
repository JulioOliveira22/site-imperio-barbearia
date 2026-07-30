export type Service = {
  id: string;
  name: string;
  category: "Corte" | "Barba" | "Combo" | "Acabamento";
  duration: string;
  price: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "corte-classico-executivo",
    name: "Corte Clássico Executivo",
    category: "Corte",
    duration: "45 min",
    price: "R$ 60,00",
    description:
      "Alinhamento perfeito, textura no topo e finalização com pomada matte.",
  },
  {
    id: "barba-terapia-toalha-quente",
    name: "Barba Terapia com Toalha Quente",
    category: "Barba",
    duration: "30 min",
    price: "R$ 45,00",
    description:
      "Aparagem na tesoura, alinhamento na navalha e hidratação profunda.",
  },
  {
    id: "combo-corte-barba",
    name: "O Combo (Corte + Barba)",
    category: "Combo",
    duration: "1h 15m",
    price: "R$ 95,00",
    description:
      "A experiência completa de renovação visual e relaxamento.",
  },
  {
    id: "corte-degrade-navalhado",
    name: "Corte Degradê Navalhado",
    category: "Corte",
    duration: "50 min",
    price: "R$ 70,00",
    description:
      "Transição limpa nas laterais com acabamento técnico para visual moderno.",
  },
  {
    id: "barba-premium-pigmentacao",
    name: "Barba Premium com Pigmentação",
    category: "Barba",
    duration: "40 min",
    price: "R$ 65,00",
    description:
      "Contorno impecável com reforço de cor para preencher e valorizar o desenho.",
  },
  {
    id: "corte-kids-estilo",
    name: "Corte Kids Estilo",
    category: "Corte",
    duration: "35 min",
    price: "R$ 50,00",
    description:
      "Atendimento rápido e cuidadoso para os pequenos saírem alinhados.",
  },
  {
    id: "acabamento-pezinho-sobrancelha",
    name: "Acabamento (Pezinho + Sobrancelha)",
    category: "Acabamento",
    duration: "20 min",
    price: "R$ 30,00",
    description:
      "Detalhes finais para manter o visual no ponto durante a semana.",
  },
  {
    id: "combo-completo-premium",
    name: "Combo Completo Premium",
    category: "Combo",
    duration: "1h 30m",
    price: "R$ 120,00",
    description:
      "Corte, barba e acabamento completo para uma entrega visual de alto nível.",
  },
];

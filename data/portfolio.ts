export type StoryMedia = {
  id: string;
  type: "image" | "video";
  /** Caminho em /public (ex: /portfolio/luiz/corte-01.jpg) */
  src: string;
  alt: string;
  /** Só para imagem — tempo em tela (padrão 5s) */
  durationMs?: number;
};

export type Highlight = {
  id: string;
  /** Nome do destaque, como no Instagram (ex: Cortes, Kids) */
  label: string;
  items: StoryMedia[];
};

/**
 * Portfólio por barbeiro.
 * Para publicar trabalhos reais: coloque os arquivos em public/portfolio/<barbeiro>/
 * e troque os itens abaixo (type: "video" também funciona, use .mp4).
 */
export const portfolios: Record<string, Highlight[]> = {
  luiz: [
    {
      id: "cortes",
      label: "Cortes",
      items: [
        {
          id: "corte-1",
          type: "image",
          src: "/portfolio/placeholder-1.svg",
          alt: "Corte feito pelo Luiz",
        },
        {
          id: "corte-2",
          type: "image",
          src: "/portfolio/placeholder-3.svg",
          alt: "Antes e depois de corte do Luiz",
        },
      ],
    },
    {
      id: "barba",
      label: "Barba",
      items: [
        {
          id: "barba-1",
          type: "image",
          src: "/portfolio/placeholder-2.svg",
          alt: "Barba finalizada pelo Luiz",
        },
      ],
    },
  ],
  isaque: [
    {
      id: "cortes",
      label: "Cortes",
      items: [
        {
          id: "corte-1",
          type: "image",
          src: "/portfolio/placeholder-1.svg",
          alt: "Corte feito pelo Isaque",
        },
        {
          id: "corte-2",
          type: "image",
          src: "/portfolio/placeholder-3.svg",
          alt: "Antes e depois de corte do Isaque",
        },
      ],
    },
    {
      id: "kids",
      label: "Kids",
      items: [
        {
          id: "kids-1",
          type: "image",
          src: "/portfolio/placeholder-2.svg",
          alt: "Atendimento kid do Isaque",
        },
      ],
    },
  ],
};

export function getPortfolioByBarberId(barberId: string | null | undefined) {
  if (!barberId) return [];
  return portfolios[barberId] ?? [];
}

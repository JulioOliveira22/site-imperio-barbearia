export type GalleryItem = {
  id: string;
  alt: string;
  /** Quando tiver a foto, preencha o caminho (ex: /gallery/studio-1.jpg) */
  src?: string;
};

/** Placeholders — troque src pelas fotos reais do studio */
export const galleryItems: GalleryItem[] = [
  { id: "studio-1", alt: "Ambiente da Império Barbearia" },
  { id: "studio-2", alt: "Área de atendimento" },
  { id: "studio-3", alt: "Detalhe do studio" },
  { id: "studio-4", alt: "Espaço da barbearia" },
];

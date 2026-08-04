export type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
};

export const products: Product[] = [
  {
    id: "hidratante-cabelo",
    name: "Hidratante para Cabelo",
    brand: "Fox For Man",
    price: "R$ 30,00",
  },
  {
    id: "pasta-premium",
    name: "Pasta Premium para Cabelo",
    brand: "Fox For Man",
    price: "R$ 25,00",
  },
  {
    id: "gel-cabelo",
    name: "Gel para Cabelo",
    brand: "Pierry Lohan",
    price: "R$ 15,00",
  },
];

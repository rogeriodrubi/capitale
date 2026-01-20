export interface Property {
  id: string;
  title: string;
  location: string;
  area: number;
  price: number;
  type: "terreno" | "imovel";
  description: string;
  features: string[];
  images: string[];
  coordinates: { x: number; y: number };
  contact: string;
  availability: boolean;
  featured?: boolean;
}

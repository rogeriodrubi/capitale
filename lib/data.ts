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
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Terreno Premium - Centro",
    location: "Avenida Paulista, São Paulo",
    area: 1200,
    price: 3500000,
    type: "terreno",
    description:
      "Terreno privilegiado em localização de alto valor, com acesso direto à Avenida Paulista. Ideal para empreendimentos comerciais e residenciais de alto padrão.",
    features: [
      "Esquina",
      "Metrô próximo",
      "Comércio circulante",
      "Infraestrutura completa",
    ],
    images: [
      "https://picsum.photos/800/600?random=101",
      "https://picsum.photos/800/600?random=102",
    ],
    coordinates: { x: 25, y: 20 },
    contact: "contato@capitale.com",
    availability: true,
  },
  {
    id: "2",
    title: "Terreno Residencial - Vila Mariana",
    location: "Vila Mariana, São Paulo",
    area: 800,
    price: 2200000,
    type: "terreno",
    description:
      "Terreno em bairro nobre de São Paulo, excelente para construção de condomínio fechado ou residência unifamiliar de luxo.",
    features: ["Bairro nobre", "Arborizado", "Serviços próximos", "Tranquilo"],
    images: [
      "https://picsum.photos/800/600?random=201",
      "https://picsum.photos/800/600?random=202",
    ],
    coordinates: { x: 75, y: 35 },
    contact: "contato@capitale.com",
    availability: true,
  },
  {
    id: "3",
    title: "Terreno Comercial - Zona Leste",
    location: "Zona Leste, São Paulo",
    area: 2000,
    price: 2800000,
    type: "terreno",
    description:
      "Grande terreno em área de expansão comercial. Perfeito para shopping centers, complexos comerciais ou industriais.",
    features: [
      "Via de acesso rápido",
      "Grande área",
      "Zoneamento comercial",
      "Potencial de renda",
    ],
    images: [
      "https://picsum.photos/800/600?random=301",
      "https://picsum.photos/800/600?random=302",
    ],
    coordinates: { x: 50, y: 60 },
    contact: "contato@capitale.com",
    availability: true,
  },
  {
    id: "4",
    title: "Terreno Misto - Brooklin",
    location: "Brooklin, São Paulo",
    area: 1500,
    price: 4200000,
    type: "imovel",
    description:
      "Terreno em Brooklin com potencial misto residencial-comercial. Excelente localização para diversas oportunidades de negócio.",
    features: [
      "Dupla frente",
      "Bom acabamento",
      "Vizinhança selecionada",
      "Oportunidade de investimento",
    ],
    images: [
      "https://picsum.photos/800/600?random=401",
      "https://picsum.photos/800/600?random=402",
    ],
    coordinates: { x: 25, y: 70 },
    contact: "contato@capitale.com",
    availability: true,
  },
  {
    id: "5",
    title: "Terreno Premium - Ibirapuera",
    location: "Próximo ao Parque Ibirapuera",
    area: 950,
    price: 5100000,
    type: "terreno",
    description:
      "Terreno privilegiado próximo ao Parque Ibirapuera, uma das áreas mais procuradas de São Paulo. Ambiente sofisticado e tranquilo.",
    features: ["Parque próximo", "Rua tranquila", "Área verde", "Acesso fácil"],
    images: [
      "https://picsum.photos/800/600?random=501",
      "https://picsum.photos/800/600?random=502",
    ],
    coordinates: { x: 75, y: 70 },
    contact: "contato@capitale.com",
    availability: false,
  },
  {
    id: "6",
    title: "Terreno Industrial - Guarulhos",
    location: "Guarulhos",
    area: 5000,
    price: 3800000,
    type: "terreno",
    description:
      "Grande terreno em zona industrial de Guarulhos. Ideal para fábricas, depósitos e centros de distribuição.",
    features: [
      "Zona industrial",
      "Grande área",
      "Infraestrutura logística",
      "Bom acesso",
    ],
    images: [
      "https://picsum.photos/800/600?random=601",
      "https://picsum.photos/800/600?random=602",
    ],
    coordinates: { x: 50, y: 25 },
    contact: "contato@capitale.com",
    availability: true,
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function searchProperties(query: string): Property[] {
  const lowerQuery = query.toLowerCase();
  return properties.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.location.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}

export function filterProperties(
  type?: string,
  minPrice?: number,
  maxPrice?: number
): Property[] {
  return properties.filter((p) => {
    if (type && p.type !== type) return false;
    if (minPrice && p.price < minPrice) return false;
    if (maxPrice && p.price > maxPrice) return false;
    return true;
  });
}

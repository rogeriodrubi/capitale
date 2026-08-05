import { Property } from "./types";

type SeedProperty = Omit<Property, "id" | "created_at" | "imageUrl">;

const NEIGHBORHOODS = [
  "Centro",
  "Orla",
  "Cohab",
  "Santo Antônio",
  "Country Club",
  "Antônio Cassimiro",
  "Vila São Francisco",
  "Petrolândia",
  "Jardim Maravilha",
  "Loteamento Vitória",
  "Vila Mocó",
  "Condomínio Reserva",
];

interface Template {
  // O check constraint do banco só aceita os valores capitalizados abaixo.
  property_category: "Casa" | "Apartamento";
  listing_type: "venda" | "aluguel";
  titleSuffix: string;
  descExtra: string;
  features: string[];
  bedrooms: number;
  areaBase: number;
  priceBase: number;
}

const TEMPLATES: Template[] = [
  {
    property_category: "Casa",
    listing_type: "venda",
    titleSuffix: "com piscina",
    descExtra: "Área gourmet completa e piscina privativa, ideal para receber a família.",
    features: ["Piscina", "Área Gourmet", "Quintal Amplo", "Portão Eletrônico"],
    bedrooms: 4,
    areaBase: 260,
    priceBase: 650000,
  },
  {
    property_category: "Casa",
    listing_type: "venda",
    titleSuffix: "reformada",
    descExtra: "Recém-reformada, com acabamento moderno e pronta para morar.",
    features: ["Reformada", "Armários Planejados", "Garagem Coberta"],
    bedrooms: 3,
    areaBase: 180,
    priceBase: 420000,
  },
  {
    property_category: "Casa",
    listing_type: "aluguel",
    titleSuffix: "com quintal amplo",
    descExtra: "Ótima para famílias, com espaço externo generoso e boa ventilação.",
    features: ["Quintal Amplo", "Varanda", "Área de Serviço"],
    bedrooms: 3,
    areaBase: 150,
    priceBase: 2800,
  },
  {
    property_category: "Casa",
    listing_type: "aluguel",
    titleSuffix: "próxima ao comércio",
    descExtra: "Localização privilegiada, a poucos minutos de mercados e escolas.",
    features: ["Próximo ao Comércio", "Garagem", "Segurança 24h"],
    bedrooms: 2,
    areaBase: 110,
    priceBase: 1800,
  },
  {
    property_category: "Apartamento",
    listing_type: "venda",
    titleSuffix: "vista rio",
    descExtra: "Vista privilegiada para o rio, andar alto e iluminação natural.",
    features: ["Vista Rio", "Varanda Gourmet", "Elevador"],
    bedrooms: 3,
    areaBase: 105,
    priceBase: 480000,
  },
  {
    property_category: "Apartamento",
    listing_type: "venda",
    titleSuffix: "compacto e funcional",
    descExtra: "Planta otimizada, perfeito para quem busca praticidade no dia a dia.",
    features: ["Planta Otimizada", "Sacada", "Portaria 24h"],
    bedrooms: 2,
    areaBase: 65,
    priceBase: 260000,
  },
  {
    property_category: "Apartamento",
    listing_type: "aluguel",
    titleSuffix: "mobiliado",
    descExtra: "Totalmente mobiliado, pronto para morar sem preocupações.",
    features: ["Mobiliado", "Piscina no Condomínio", "Academia"],
    bedrooms: 1,
    areaBase: 48,
    priceBase: 1600,
  },
  {
    property_category: "Apartamento",
    listing_type: "aluguel",
    titleSuffix: "próximo ao centro",
    descExtra: "A poucos passos do centro comercial, ideal para quem não tem carro.",
    features: ["Próximo ao Centro", "Elevador", "Portaria"],
    bedrooms: 2,
    areaBase: 70,
    priceBase: 2100,
  },
];

function slugify(...parts: string[]): string {
  return parts
    .join("-")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pictureUrls(seed: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/800/600`,
  );
}

function buildProperties(): SeedProperty[] {
  const properties: SeedProperty[] = [];

  NEIGHBORHOODS.forEach((neighborhood, nIdx) => {
    TEMPLATES.forEach((tpl, tIdx) => {
      // Pula metade das combinações bairro x template para não ficar repetitivo
      // demais, mantendo o total em torno de 40-50 imóveis com boa variedade.
      if ((nIdx + tIdx) % 2 !== 0) return;

      const variation = ((nIdx * 7 + tIdx * 3) % 5) - 2; // -2..2
      const bedrooms = Math.max(1, tpl.bedrooms + (variation > 0 ? 1 : 0));
      const area = Math.max(30, tpl.areaBase + variation * 12);
      const price =
        tpl.listing_type === "aluguel"
          ? Math.max(800, tpl.priceBase + variation * 150)
          : Math.max(200000, tpl.priceBase + variation * 35000);

      const folderId = slugify(
        tpl.property_category,
        tpl.titleSuffix,
        neighborhood,
        String(nIdx),
        String(tIdx),
      );
      const label = tpl.property_category;
      const title = `${label} ${tpl.titleSuffix} em ${neighborhood}`;
      const featured = (tIdx === 0 || tIdx === 4) && nIdx % 4 === 0;

      properties.push({
        title,
        location: neighborhood,
        bedrooms,
        area,
        price,
        description: `${label} de ${bedrooms} quarto(s) e ${area}m² em ${neighborhood}. ${tpl.descExtra}`,
        folder_id: folderId,
        availability: true,
        images: pictureUrls(folderId, 3),
        features: tpl.features,
        contact: "contato@capitale.com.br",
        featured,
        listing_type: tpl.listing_type,
        property_category: tpl.property_category,
      });
    });
  });

  return properties;
}

export const properties: SeedProperty[] = buildProperties();

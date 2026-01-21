/**
 * Configuração dos loteamentos e utilidades
 * Sistema de navegação hierárquica: Cidade > Loteamento
 */

export type SubdivisionId =
  | "vista-antonio-cassimiro"
  | "vista-cohab"
  | "vista-country-club"
  | "vista-santo-antonio";

export type City = "Petrolina" | "Juazeiro";

export interface SubdivisionConfig {
  id: SubdivisionId;
  name: string;
  city: City;
  image: string;
  propertyIds: string[]; // IDs das propriedades do Supabase a exibir neste mapa
  description: string;
}

/**
 * Configuração dos 4 loteamentos
 * Antonio Cassimiro: Todas as 61 propriedades (mantém coordenadas originais)
 * Outros 3: 10 propriedades cada (coordenadas geradas em grid)
 */
export const SUBDIVISIONS: Record<SubdivisionId, SubdivisionConfig> = {
  "vista-antonio-cassimiro": {
    id: "vista-antonio-cassimiro",
    name: "Antonio Cassimiro",
    city: "Petrolina",
    image: "/images/vista-antonio-cassimiro.jpg",
    propertyIds: Array.from({ length: 61 }, (_, i) => String(i + 1)), // IDs 1-61
    description: "Loteamento completo na região do Antonio Cassimiro",
  },
  "vista-cohab": {
    id: "vista-cohab",
    name: "Cohab",
    city: "Petrolina",
    image: "/images/vista-cohab.jpg",
    propertyIds: Array.from({ length: 10 }, (_, i) => String(i + 1)), // IDs 1-10
    description: "Loteamento residencial na Cohab",
  },
  "vista-country-club": {
    id: "vista-country-club",
    name: "Country Club",
    city: "Juazeiro",
    image: "/images/vista-country-club.jpg",
    propertyIds: Array.from({ length: 10 }, (_, i) => String(i + 11)), // IDs 11-20
    description: "Loteamento premium Country Club",
  },
  "vista-santo-antonio": {
    id: "vista-santo-antonio",
    name: "Santo Antonio",
    city: "Juazeiro",
    image: "/images/vista-santo-antonio.jpg",
    propertyIds: Array.from({ length: 10 }, (_, i) => String(i + 21)), // IDs 21-30
    description: "Loteamento na região de Santo Antonio",
  },
};

/**
 * Subdivisions agrupadas por cidade
 */
export const SUBDIVISIONS_BY_CITY: Record<City, SubdivisionConfig[]> = {
  Petrolina: [
    SUBDIVISIONS["vista-antonio-cassimiro"],
    SUBDIVISIONS["vista-cohab"],
  ],
  Juazeiro: [
    SUBDIVISIONS["vista-country-club"],
    SUBDIVISIONS["vista-santo-antonio"],
  ],
};

/**
 * Gera coordenadas em grid organizado (3 colunas x 4 linhas)
 * Para distribuir 10 propriedades uniformemente no mapa
 */
export function generateGridCoordinates(
  count: number = 10,
): Array<{ x: number; y: number }> {
  const coordinates: Array<{ x: number; y: number }> = [];
  const cols = 3;
  const rows = Math.ceil(count / cols);

  // Margens e espaçamento
  const marginX = 15; // 15% de margem horizontal
  const marginY = 15; // 15% de margem vertical
  const availableWidth = 100 - 2 * marginX;
  const availableHeight = 100 - 2 * marginY;

  const spacingX = availableWidth / (cols - 1 || 1);
  const spacingY = availableHeight / (rows - 1 || 1);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = marginX + col * spacingX;
    const y = marginY + row * spacingY;

    coordinates.push({ x, y });
  }

  return coordinates;
}

/**
 * Chave para localStorage
 */
const STORAGE_KEY = "capitale_selected_subdivision";

/**
 * Salva seleção de loteamento no localStorage
 */
export function saveSubdivisionSelection(subdivisionId: SubdivisionId): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, subdivisionId);
    } catch (error) {
      console.error("Erro ao salvar seleção no localStorage:", error);
    }
  }
}

/**
 * Recupera seleção de loteamento do localStorage
 * Retorna Antonio Cassimiro como padrão se não houver seleção
 */
export function loadSubdivisionSelection(): SubdivisionId {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in SUBDIVISIONS) {
        return saved as SubdivisionId;
      }
    } catch (error) {
      console.error("Erro ao carregar seleção do localStorage:", error);
    }
  }
  return "vista-antonio-cassimiro"; // Padrão
}

/**
 * Obtém a cidade de um loteamento
 */
export function getCityFromSubdivision(subdivisionId: SubdivisionId): City {
  return SUBDIVISIONS[subdivisionId].city;
}

/**
 * Obtém quantidade de lotes por loteamento
 */
export function getPropertyCount(subdivisionId: SubdivisionId): number {
  return SUBDIVISIONS[subdivisionId].propertyIds.length;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  area: number;
  price: number;
  description: string;
  folder_id: string;
  availability: boolean | null;
  created_at: string | null;
  // Campo opcional usado apenas no frontend, preenchido após buscar imagens no Storage
  imageUrl?: string;
  images?: string[];
  features?: string[];
  contact?: string;
  featured?: boolean;
  // Novos campos de filtro (tabelas Supabase)
  listing_type?: "venda" | "aluguel";
  // Em alguns ambientes o Supabase pode devolver valores normalizados (ex: "casa")
  // ou capitalizados (ex: "Casa"). O frontend normaliza antes de exibir.
  property_category?: "apartamento" | "casa" | "Apartamento" | "Casa";
}
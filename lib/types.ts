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
  property_category?: "apartamento" | "casa";
}
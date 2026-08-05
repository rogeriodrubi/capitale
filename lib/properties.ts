import { supabase, getPropertyCoverImage } from "./supabase";
import { Property } from "./types";

/**
 * Busca todas as propriedades e resolve a imagem de capa de cada uma:
 * usa `images` (já salvo no banco, ex: dados de seed) quando disponível,
 * senão busca no Storage via `folder_id` (imóveis cadastrados manualmente).
 */
export async function getPropertiesWithImages(): Promise<Property[]> {
  const { data } = await supabase.from("properties").select("*");

  if (!data) {
    return [];
  }

  const properties = data as Property[];

  const propertiesWithImages = await Promise.all(
    properties.map(async (property) => {
      const imageUrl = property.images?.length
        ? property.images[0]
        : await getPropertyCoverImage(property.folder_id);

      return {
        ...property,
        imageUrl,
      } as Property;
    }),
  );

  return propertiesWithImages;
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl.startsWith("https://")) {
  console.error("Supabase Error: NEXT_PUBLIC_SUPABASE_URL does not look like a valid URL (should start with https://). Value:", supabaseUrl);
}

if (!supabaseKey || supabaseKey === "your-anon-key") {
  console.error("Supabase Error: NEXT_PUBLIC_SUPABASE_ANON_KEY seems invalid or is using the default placeholder.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Lista todas as imagens de uma propriedade no bucket 'imoveis' usando o folder_id
 * @param folderId - O folder_id da propriedade
 * @returns Array de URLs públicas das imagens
 */
export async function getPropertyImages(folderId: string): Promise<string[]> {
  try {
    if (!folderId) {
      return [];
    }

    const { data, error } = await supabase.storage
      .from("imoveis")
      .list(folderId, {
        limit: 100,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error(`Error listing images for folder ${folderId}:`, error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Filtrar apenas arquivos de imagem
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imageFiles = data.filter((file) => {
      const lowerName = file.name.toLowerCase();
      return imageExtensions.some((ext) => lowerName.endsWith(ext));
    });

    // Gerar URLs públicas para cada imagem
    const imageUrls = imageFiles.map((file) => {
      const { data: urlData } = supabase.storage
        .from("imoveis")
        .getPublicUrl(`${folderId}/${file.name}`);
      return urlData.publicUrl;
    });

    return imageUrls;
  } catch (err) {
    console.error(`Unexpected error getting images for folder ${folderId}:`, err);
    return [];
  }
}

/**
 * Obtém apenas a primeira imagem (capa) de uma propriedade
 * @param folderId - O folder_id da propriedade
 * @returns URL pública da primeira imagem, ou undefined se não houver imagens
 */
export async function getPropertyCoverImage(folderId: string): Promise<string | undefined> {
  const images = await getPropertyImages(folderId);
  return images[0];
}
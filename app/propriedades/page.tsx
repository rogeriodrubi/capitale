import { Suspense } from "react";
import { PropertiesList } from "@/components/sections/PropertiesList";
import { Footer } from "@/components/common/Footer";
import { supabase, getPropertyCoverImage } from "@/lib/supabase";
import { Property } from "@/lib/types";

async function getPropertiesWithImages(): Promise<Property[]> {
  const { data } = await supabase.from("properties").select("*");

  if (!data) {
    return [];
  }

  const properties = data as Property[];

  const propertiesWithImages = await Promise.all(
    properties.map(async (property) => {
      const imageUrl = await getPropertyCoverImage(property.folder_id);

      return {
        ...property,
        imageUrl,
      } as Property;
    }),
  );

  return propertiesWithImages;
}

export default async function PropriedadesPage() {
  const properties = await getPropertiesWithImages();

  return (
    <main>
      <Suspense fallback={<div>Carregando propriedades...</div>}>
        <PropertiesList properties={properties} />
      </Suspense>
      <Footer />
    </main>
  );
}


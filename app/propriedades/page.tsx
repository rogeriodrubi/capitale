import { Suspense } from "react";
import { PropertiesList } from "@/components/sections/PropertiesList";
import { Footer } from "@/components/common/Footer";
import { getPropertiesWithImages } from "@/lib/properties";

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


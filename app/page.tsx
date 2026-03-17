import { Hero } from "@/components/sections/Hero";
import { PropertiesList } from "@/components/sections/PropertiesList";
import { PropertiesMap } from "@/components/sections/PropertiesMap";
import { FeaturedPropertiesCarousel } from "@/components/sections/FeaturedPropertiesCarousel";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
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

export default async function Home() {
  const properties = await getPropertiesWithImages();

  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      <div id="search">
        <PropertiesList properties={properties} />
      </div>
      <PropertiesMap properties={properties} />
      <FeaturedPropertiesCarousel />
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

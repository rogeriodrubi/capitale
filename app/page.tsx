import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { PropertiesList } from "@/components/sections/PropertiesList";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/common/Footer";
import { getPropertiesWithImages } from "@/lib/properties";

export default async function Home() {
  const properties = await getPropertiesWithImages();

  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      <div id="search">
        <Suspense fallback={<div>Carregando propriedades...</div>}>
          <PropertiesList properties={properties} />
        </Suspense>
      </div>
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

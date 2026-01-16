import { Hero } from "@/components/sections/Hero";
import { PropertiesMap } from "@/components/sections/PropertiesMap";
import { PropertiesList } from "@/components/sections/PropertiesList";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/common/Footer";

export default function Home() {
  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      <PropertiesMap />
      <PropertiesList />
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

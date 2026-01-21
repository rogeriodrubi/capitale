"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToProperties = () => {
    const element = document.getElementById("properties");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Zoom Effect */}
      <div
        className="absolute inset-0 hero-zoom"
        style={{
          backgroundImage: "url(/images/skyscraper.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-cyan-900/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Bem-vindo à <span className="text-cyan-100">Capitale</span>
        </h1>

        <p className="text-xl sm:text-2xl text-cyan-50 mb-8 max-w-2xl mx-auto leading-relaxed">
          Descubra as melhores oportunidades imobiliárias de Petrolina.
          Investimento inteligente, resultados extraordinários.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={scrollToProperties}
            className="bg-white text-cyan-700 hover:bg-cyan-50 font-semibold text-lg px-8 py-6"
          >
            Explorar Terrenos
          </Button>
          <Button
            size="lg"
            onClick={scrollToProperties}
            className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold text-lg px-8 py-6"
          >
            Saiba Mais
          </Button>
        </div>

        {/* Seta para scroll */}
        <div className="flex justify-center animate-bounce mt-12">
          <button
            onClick={scrollToProperties}
            className="text-white hover:text-cyan-100 transition-colors"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}

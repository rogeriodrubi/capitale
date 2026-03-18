"use client";

import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToSearch = () => {
    const element = document.getElementById("search");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[24vh] w-full overflow-hidden flex items-end justify-center">
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
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-cyan-900/70" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4">
        <p className="text-xl sm:text-2xl text-cyan-50 mb-8 max-w-2xl mx-auto leading-relaxed">
          Descubra as melhores oportunidades imobiliárias de Petrolina.
          Investimento inteligente, resultados extraordinários.
        </p>

        {/* Seta para scroll */}
        <div className="flex justify-center animate-bounce mt-4">
          <button
            onClick={scrollToSearch}
            className="text-white hover:text-cyan-100 transition-colors"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}

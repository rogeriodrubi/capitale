"use client";

import { useState } from "react";
import Image from "next/image";
import { properties } from "@/lib/data";
import { PropertyModal } from "@/components/modals/PropertyModal";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function PropertiesMap() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  return (
    <section
      id="properties"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Nossos Terrenos
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Clique em qualquer marcador no mapa para ver detalhes do terreno
          </p>
        </div>

        {/* Mapa interativo com terrenos */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-cyan-200 bg-neutral-200">
          {/* Imagem de fundo - usando foto aérea */}
          <Image
            src="/images/terrenos-aereo.jpg"
            alt="Mapa aéreo de terrenos"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay suave */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Marcadores de terrenos clicáveis */}
          {properties.map((property) => (
            <button
              key={property.id}
              onClick={() => setSelectedProperty(property.id)}
              className={cn(
                "absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-0 group",
                selectedProperty === property.id
                  ? "bg-gradient-to-br from-cyan-500 to-cyan-700 ring-4 ring-cyan-300 scale-125 shadow-2xl"
                  : "bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg hover:shadow-2xl hover:scale-125"
              )}
              style={{
                left: `${property.coordinates.x}%`,
                top: `${property.coordinates.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              title={property.title}
              aria-label={`Ver detalhes de ${property.title}`}
            >
              {/* Pulso animado */}
              <span className="absolute inset-0 rounded-full animate-pulse bg-cyan-300/40" />

              {/* Ícone de pin */}
              <span className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
              </span>

              {/* Tooltip ao hover */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {property.title}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
              </div>
            </button>
          ))}
        </div>

        {/* Informações e legenda */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="flex items-center gap-2 font-semibold text-neutral-900 mb-2">
              <MapPin className="w-5 h-5 text-cyan-600" />
              Como usar o mapa
            </h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>✓ Clique em qualquer marcador para ver detalhes</li>
              <li>✓ Passe o mouse para ver o nome do terreno</li>
              <li>✓ Veja informações de preço, área e localização</li>
              <li>✓ Confira disponibilidade em tempo real</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-neutral-900 mb-2">
              Propriedades
            </h3>
            <p className="text-neutral-700 text-sm mb-3">
              Total de {properties.length} terrenos e imóveis disponíveis
            </p>
            <div className="flex flex-wrap gap-2">
              {properties.map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                    selectedProperty === prop.id
                      ? "bg-cyan-600 text-white"
                      : "bg-neutral-200 text-neutral-700 hover:bg-cyan-200"
                  )}
                >
                  #{prop.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do terreno selecionado */}
      {selectedProperty && (
        <PropertyModal
          propertyId={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
}

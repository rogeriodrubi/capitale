"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Property } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { PropertyModal } from "@/components/modals/PropertyModal";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { SubdivisionSelector } from "./SubdivisionSelector";
import {
  SubdivisionId,
  City,
  SUBDIVISIONS,
  loadSubdivisionSelection,
  saveSubdivisionSelection,
  getCityFromSubdivision,
  generateGridCoordinates,
} from "@/lib/subdivisions";

export function PropertiesMap() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [selectedSubdivision, setSelectedSubdivision] = useState<SubdivisionId>(
    "vista-antonio-cassimiro",
  );
  const [selectedCity, setSelectedCity] = useState<City>("Petrolina");
  const [isClient, setIsClient] = useState(false);

  // Carregar seleção do localStorage no cliente
  useEffect(() => {
    setIsClient(true);
    const savedSubdivision = loadSubdivisionSelection();
    setSelectedSubdivision(savedSubdivision);
    setSelectedCity(getCityFromSubdivision(savedSubdivision));
  }, []);

  // Buscar propriedades do Supabase
  useEffect(() => {
    async function fetchProperties() {
      const { data } = await supabase.from("properties").select("*");
      if (data) {
        setProperties(data as Property[]);
      }
    }
    fetchProperties();
  }, []);

  // Configuração do loteamento atual
  const currentSubdivision = SUBDIVISIONS[selectedSubdivision];

  // Gerar coordenadas para os 3 novos mapas (exceto Antonio Cassimiro)
  const gridCoordinates = generateGridCoordinates(10);

  // Filtrar e preparar propriedades com coordenadas apropriadas
  const displayedProperties = properties
    .filter((prop) => currentSubdivision.propertyIds.includes(prop.id))
    .map((prop, index) => {
      // Antonio Cassimiro mantém coordenadas originais
      if (selectedSubdivision === "vista-antonio-cassimiro") {
        return prop;
      }

      // Outros mapas usam coordenadas em grid
      const gridCoord = gridCoordinates[index % gridCoordinates.length];
      return {
        ...prop,
        coordinates: gridCoord,
      };
    });

  // Handlers
  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    // Selecionar primeiro loteamento da cidade
    const firstSubdivision = Object.values(SUBDIVISIONS).find(
      (s) => s.city === city,
    );
    if (firstSubdivision) {
      handleSubdivisionChange(firstSubdivision.id);
    }
  };

  const handleSubdivisionChange = (subdivisionId: SubdivisionId) => {
    setSelectedSubdivision(subdivisionId);
    setSelectedCity(getCityFromSubdivision(subdivisionId));
    saveSubdivisionSelection(subdivisionId);
    setSelectedProperty(null); // Limpar seleção ao trocar de mapa
  };

  return (
    <section
      id="properties"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Nossos Loteamentos
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Selecione a cidade e o loteamento para ver os terrenos disponíveis
          </p>

          {/* Seletor de Loteamentos */}
          {isClient && (
            <SubdivisionSelector
              selectedCity={selectedCity}
              selectedSubdivision={selectedSubdivision}
              onCityChange={handleCityChange}
              onSubdivisionChange={handleSubdivisionChange}
            />
          )}
        </div>

        {/* Mapa interativo com terrenos */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-cyan-200 bg-neutral-200">
          {/* Imagem de fundo com transição animada */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSubdivision}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentSubdivision.image}
                alt={`Mapa aéreo - ${currentSubdivision.name}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay suave */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Marcadores de terrenos clicáveis com animação */}
          <AnimatePresence mode="wait">
            {displayedProperties.map((property, index) => (
              <motion.button
                onClick={() => setSelectedProperty(property)}
                key={`${selectedSubdivision}-${property.id}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.3,
                    delay: index * 0.02,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transition: {
                    duration: 0.1, // Quase instantâneo
                    delay: 0, // Sem espera
                    ease: "easeIn",
                  },
                }}
                className={cn(
                  "absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-0 group",
                  selectedProperty?.id === property.id
                    ? "bg-cyan-700 ring-4 ring-cyan-300 scale-125 shadow-2xl" // Cor sólida quando selecionado
                    : "bg-cyan-500 shadow-lg hover:shadow-2xl hover:scale-125", // Cor sólida padrão
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

                {/* ID do terreno */}
                <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-lg font-bold text-xs sm:text-sm">
                  {property.id}
                </span>

                {/* Tooltip ao hover */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  {property.title}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Informações e legenda */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="flex items-center gap-2 font-semibold text-neutral-900 mb-2">
              <MapPin className="w-5 h-5 text-cyan-600" />
              Como usar o mapa
            </h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>✓ Selecione a cidade e o loteamento desejado</li>
              <li>✓ Clique em qualquer marcador para ver detalhes</li>
              <li>✓ Passe o mouse para ver o nome do terreno</li>
              <li>✓ Veja informações de preço, área e localização</li>
            </ul>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {currentSubdivision.name} - {currentSubdivision.city}
            </h3>
            <p className="text-neutral-700 text-sm mb-2">
              {currentSubdivision.description}
            </p>
            <p className="text-cyan-700 font-semibold text-sm">
              {displayedProperties.length}{" "}
              {displayedProperties.length === 1
                ? "terreno disponível"
                : "terrenos disponíveis"}
            </p>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do terreno selecionado */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { City, SubdivisionId, SUBDIVISIONS_BY_CITY } from "@/lib/subdivisions";

interface SubdivisionSelectorProps {
  selectedCity: City;
  selectedSubdivision: SubdivisionId;
  onCityChange: (city: City) => void;
  onSubdivisionChange: (subdivision: SubdivisionId) => void;
}

export function SubdivisionSelector({
  selectedCity,
  selectedSubdivision,
  onCityChange,
  onSubdivisionChange,
}: SubdivisionSelectorProps) {
  const cities: City[] = ["Petrolina", "Juazeiro"];
  const subdivisions = SUBDIVISIONS_BY_CITY[selectedCity];

  return (
    <div className="space-y-4">
      {/* Nível 1: Seleção de Cidade */}
      <div className="flex items-center justify-center gap-3">
        {/* Container com scroll horizontal em mobile */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max">
            {cities.map((city) => (
              <Button
                key={city}
                onClick={() => onCityChange(city)}
                variant={selectedCity === city ? "default" : "outline"}
                size="lg"
                className="whitespace-nowrap h-[41px] text-base px-12"
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Nível 2: Seleção de Loteamento */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {/* Container com scroll horizontal em mobile */}
        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className="flex items-center justify-center gap-2 min-w-max">
            {subdivisions.map((subdivision) => {
              const isSelected = selectedSubdivision === subdivision.id;

              return (
                <Button
                  key={subdivision.id}
                  onClick={() => onSubdivisionChange(subdivision.id)}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {subdivision.name}
                </Button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Estilo para esconder scrollbar mas manter funcionalidade */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

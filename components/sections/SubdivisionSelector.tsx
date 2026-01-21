"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  City,
  SubdivisionId,
  SUBDIVISIONS_BY_CITY,
  getPropertyCount,
} from "@/lib/subdivisions";

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
              <motion.button
                key={city}
                onClick={() => onCityChange(city)}
                className={cn(
                  "px-6 py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 border-2 whitespace-nowrap",
                  selectedCity === city
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-cyan-600 shadow-lg"
                    : "bg-white text-neutral-700 border-neutral-300",
                )}
              >
                {city}
              </motion.button>
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
              const propertyCount = getPropertyCount(subdivision.id);
              const isSelected = selectedSubdivision === subdivision.id;

              return (
                <motion.button
                  key={subdivision.id}
                  onClick={() => onSubdivisionChange(subdivision.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 border-2 whitespace-nowrap group",
                    isSelected
                      ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white border-cyan-700 shadow-md"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-cyan-300 hover:bg-cyan-50 hover:shadow-sm",
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{subdivision.name}</span>

                    {/* Badge com contador */}
                    <motion.span
                      className={cn(
                        "inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-colors",
                        isSelected
                          ? "bg-white text-cyan-700"
                          : "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-200",
                      )}
                      whileHover={{ scale: 1.1 }}
                    >
                      {propertyCount}
                    </motion.span>
                  </span>
                </motion.button>
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

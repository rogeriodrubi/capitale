"use client";

import { useState, useMemo } from "react";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { PropertyModal } from "@/components/modals/PropertyModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertiesListProps {
  properties: Property[];
}

export function PropertiesList({ properties }: PropertiesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "terreno" | "imovel">("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || p.type === filter;
        return matchesSearch && matchesFilter;
      }),
    [properties, searchTerm, filter]
  );

  return (
    <section id="search" className="pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-xl text-neutral-600">
            Explore nossa seleção completa de imóveis
          </p>
        </div>

        {/* Controles de filtro */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex gap-4">
          <Input
            placeholder="Buscar por nome ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            {(["all", "terreno", "imovel"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
              >
                {f === "all"
                  ? "Todos"
                  : f === "terreno"
                  ? "Terrenos"
                  : "Imóveis"}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de propriedades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => setSelectedProperty(property)}
            />
          ))}
        </div>

        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-neutral-600">
              Nenhuma propriedade encontrada. Tente ajustar os filtros.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

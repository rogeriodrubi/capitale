"use client";

import { useState, useMemo } from "react";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { PropertyModal } from "@/components/modals/PropertyModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PropertiesListProps {
  properties: Property[];
}

export function PropertiesList({ properties }: PropertiesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [listingTypeFilter, setListingTypeFilter] = useState<
    "all" | "venda" | "aluguel"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "casa" | "apartamento"
  >("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesListingType =
          listingTypeFilter === "all" ||
          p.listing_type === listingTypeFilter;

        const matchesCategory =
          categoryFilter === "all" ||
          p.property_category === categoryFilter;

        return matchesSearch && matchesListingType && matchesCategory;
      }),
      [properties, searchTerm, listingTypeFilter, categoryFilter]
  );

  return (
    <section
      id="search"
      className="pt-8 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 max-w-2xl mx-auto">
          <p className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            Explore nossa seleção completa de imóveis
          </p>
          <p className="mt-2 text-sm sm:text-base text-neutral-500">
            Use a busca e os filtros abaixo para encontrar o imóvel ideal por
            cidade, tipo de anúncio e categoria.
          </p>
        </div>

        {/* Controles de filtro */}
        <div className="mb-10 w-full max-w-2xl mx-auto flex flex-col gap-3">
          <Input
            placeholder="Buscar por nome ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-neutral-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
          />
          <div className="flex flex-col gap-2 w-full">
            {/* Coluna esquerda: Aluguel / Venda */}
            <div className="w-full flex gap-2">
              {(["aluguel", "venda"] as const).map((value) => (
                <Button
                  key={value}
                  className={cn(
                    "flex-1",
                    listingTypeFilter === value &&
                      "shadow-md hover:shadow-lg hover:scale-105",
                  )}
                  variant={
                    listingTypeFilter === value ? "primary" : "filter"
                  }
                  onClick={() =>
                    setListingTypeFilter(
                      listingTypeFilter === value ? "all" : value
                    )
                  }
                >
                  {value === "aluguel" ? "Aluguel" : "Venda"}
                </Button>
              ))}
            </div>

            {/* Coluna direita: Casas / Apartamentos */}
            <div className="w-full flex gap-2">
              {(["casa", "apartamento"] as const).map((value) => (
                <Button
                  key={value}
                  className={cn(
                    "flex-1",
                    categoryFilter === value &&
                      "shadow-md hover:shadow-lg hover:scale-105",
                  )}
                  variant={categoryFilter === value ? "primary" : "filter"}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === value ? "all" : value
                    )
                  }
                >
                  {value === "casa" ? "Casas" : "Apartamentos"}
                </Button>
              ))}
            </div>
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

"use client";

import { useState, useEffect } from "react";
import { Property } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { PropertyModal } from "@/components/modals/PropertyModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "terreno" | "imovel">("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data, error } = await supabase.from("properties").select("*");
        if (error) {
          console.error("Error fetching properties:", error);
        } else if (data) {
          setProperties(data as Property[]);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProperties();
  }, []);

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || p.type === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <p className="text-xl text-neutral-600">Carregando propriedades...</p>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Todas as Propriedades
          </h2>
          <p className="text-xl text-neutral-600">
            Explore nossa seleção completa de terrenos e imóveis
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

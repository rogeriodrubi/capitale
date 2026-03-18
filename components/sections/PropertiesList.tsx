"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { PropertyModal } from "@/components/modals/PropertyModal";
import { Select } from "@/components/ui/select";
import { getNeighborhoodFromLocation } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropertiesListProps {
  properties: Property[];
}

export function PropertiesList({ properties }: PropertiesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  // Evita race entre "URL -> estado" e "estado -> URL" no mount:
  // no commit inicial, o estado ainda está antigo enquanto os setState de "URL -> estado"
  // ainda não re-renderizaram. Nesse caso, não devemos sobrescrever a querystring.
  const pendingUrlSyncRef = useRef(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Garante sincronização de filtros com querystring quando estiver na rota de listagem.
  // Evita quebra se houver trailing slash ou base path.
  const isPropriedadesRoute = pathname?.includes("/propriedades") ?? false;

  const available = useMemo(
    () => properties.filter((p) => p.availability === true),
    [properties],
  );

  const neighborhoods = useMemo(() => {
    const unique = new Set<string>();
    for (const p of available) {
      unique.add(getNeighborhoodFromLocation(p.location));
    }
    return Array.from(unique).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [available]);

  const filtered = useMemo(
    () =>
      available.filter((p) => {
        const term = searchTerm.trim().toLowerCase();

        const matchesSearch =
          term.length === 0 ||
          p.title.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term);

        const neighborhood = getNeighborhoodFromLocation(p.location);
        const matchesNeighborhood =
          selectedNeighborhood === "" ||
          selectedNeighborhood === "all" ||
          neighborhood === selectedNeighborhood;

        return matchesSearch && matchesNeighborhood;
      }),
    [available, searchTerm, selectedNeighborhood],
  );

  const qParam = searchParams.get("q") ?? "";
  const bairroParam = searchParams.get("bairro") ?? "";
  const imovelParam = searchParams.get("imovel") ?? "";

  // Sync URL -> state
  useEffect(() => {
    if (!isPropriedadesRoute) return;

    if (qParam !== searchTerm) {
      pendingUrlSyncRef.current = true;
      setSearchTerm(qParam);
    }
    if (bairroParam !== selectedNeighborhood) {
      pendingUrlSyncRef.current = true;
      setSelectedNeighborhood(bairroParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPropriedadesRoute, qParam, bairroParam]);

  // Sync state -> URL
  useEffect(() => {
    if (!isPropriedadesRoute) return;

    if (pendingUrlSyncRef.current) {
      // Se o estado já tiver refletido a querystring, liberamos o sync; caso contrário, pulamos.
      if (qParam === searchTerm && bairroParam === selectedNeighborhood) {
        pendingUrlSyncRef.current = false;
      } else {
        return;
      }
    }

    const params = new URLSearchParams(searchParams.toString());

    const nextQ = searchTerm.trim();
    if (nextQ) params.set("q", nextQ);
    else params.delete("q");

    if (selectedNeighborhood === "") {
      params.delete("bairro");
    } else if (selectedNeighborhood === "all") {
      params.set("bairro", "all");
    } else {
      params.set("bairro", selectedNeighborhood);
    }

    // não mexe em "imovel" aqui (controlado separadamente)

    const next = params.toString();
    const current = searchParams.toString();

    if (next !== current) {
      const href = next ? `${pathname}?${next}` : pathname;
      router.replace(href, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPropriedadesRoute, pathname, router, searchTerm, selectedNeighborhood]);

  const setImovelParam = (propertyId: string | null) => {
    if (!isPropriedadesRoute) return;

    const params = new URLSearchParams(searchParams.toString());
    if (propertyId) params.set("imovel", propertyId);
    else params.delete("imovel");

    const next = params.toString();
    const href = next ? `${pathname}?${next}` : pathname;
    router.replace(href, { scroll: false });
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setImovelParam(property.id);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setImovelParam(null);
  };

  // Sync URL (imovel) -> modal open/close
  useEffect(() => {
    if (!isPropriedadesRoute) return;

    if (!imovelParam) {
      if (selectedProperty) setSelectedProperty(null);
      return;
    }

    if (selectedProperty?.id === imovelParam) return;

    const match = properties.find((p) => p.id === imovelParam) ?? null;
    if (match) {
      setSelectedProperty(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPropriedadesRoute, imovelParam, properties]);

  return (
    <section
      id="search"
      className="pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 max-w-2xl mx-auto">
          <p className="text-[1.2rem] sm:text-[1.5rem] font-semibold text-neutral-900">
            Explore nossa seleção completa de imóveis
          </p>
        </div>

        {/* Controles de filtro */}
        <div className="mb-4 w-full max-w-2xl mx-auto flex flex-col gap-3">
          <Select
            value={selectedNeighborhood}
            onChange={(e) => {
              // Mudança manual do usuário: libera o sync estado->URL.
              pendingUrlSyncRef.current = false;
              setSelectedNeighborhood(e.target.value);
            }}
            className="w-full border-neutral-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
          >
            <option value="" disabled hidden>
              Selecione um bairro
            </option>
            <option value="all">Todos os bairros</option>
            {selectedNeighborhood !== "" &&
              selectedNeighborhood !== "all" &&
              !neighborhoods.includes(selectedNeighborhood) && (
                <option value={selectedNeighborhood}>
                  {selectedNeighborhood}
                </option>
              )}
            {neighborhoods.map((bairro) => (
              <option key={bairro} value={bairro}>
                {bairro}
              </option>
            ))}
          </Select>
        </div>

        {/* Grid de propriedades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => handleSelectProperty(property)}
              showCategoryBadge={isPropriedadesRoute}
            />
          ))}
        </div>

        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={handleCloseModal}
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

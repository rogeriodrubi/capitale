"use client";

import Image from "next/image";
import { Property } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ruler, DollarSign, Bed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatArea } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  showActionButton?: boolean;
  showCategoryBadge?: boolean;
}

export function PropertyCard({
  property,
  onClick,
  showActionButton = true,
  showCategoryBadge = true,
}: PropertyCardProps) {
  const fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%25' height='100%25' fill='%23e5e5e5'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999999' font-family='sans-serif' font-size='24'>Sem imagem</text></svg>";

  // Usar imageUrl se disponível, senão usar placeholder inline (evita 404)
  const imageUrl = property.imageUrl || fallbackImage;

  const propertyCategoryLabel = (() => {
    const raw = property.property_category;
    if (!raw) return undefined;

    const normalized = raw.toString().trim().toLowerCase();
    if (normalized === "casa") return "Casa";
    if (normalized === "apartamento") return "Apartamento";
    return undefined;
  })();

  return (
    <Card
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        )}
        {showCategoryBadge && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-cyan-600 text-white shadow-md"
            >
              {propertyCategoryLabel ?? "Imóvel"}
            </Badge>
          </div>
        )}
        {!property.availability && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              Indisponível
            </span>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 flex items-center gap-2 flex-wrap">
          {propertyCategoryLabel && (
            <span className="whitespace-nowrap">{propertyCategoryLabel}</span>
          )}
          {propertyCategoryLabel && (
            <span className="text-neutral-400" aria-hidden="true">
              -
            </span>
          )}
          <span className="whitespace-nowrap">{property.location}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div
          className={`grid gap-4 ${
            property.bedrooms != null ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-cyan-600" />
            <div>
              <p className="text-xs text-neutral-500">Área</p>
              <p className="font-semibold">{formatArea(property.area)} m²</p>
            </div>
          </div>
          {property.bedrooms != null && (
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-cyan-600" />
              <div>
                <p className="text-xs text-neutral-500">Quartos</p>
                <p className="font-semibold">{property.bedrooms}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-cyan-600" />
            <div>
              <p className="text-xs text-neutral-500">Preço</p>
              <p className="font-semibold text-cyan-700">
                {formatCurrency(property.price)}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-600 line-clamp-2">
          {property.description}
        </p>

        {showActionButton && (
          <Button
            className="w-full mt-auto"
            variant={property.availability ? "primary" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            disabled={!property.availability}
          >
            {property.availability ? "Ver Detalhes" : "Indisponível"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

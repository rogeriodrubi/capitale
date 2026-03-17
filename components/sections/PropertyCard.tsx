"use client";

import Image from "next/image";
import { Property } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Ruler, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatArea } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  showActionButton?: boolean;
}

export function PropertyCard({
  property,
  onClick,
  showActionButton = true,
}: PropertyCardProps) {
  const fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%25' height='100%25' fill='%23e5e5e5'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999999' font-family='sans-serif' font-size='24'>Sem imagem</text></svg>";

  // Usar imageUrl se disponível, senão usar placeholder inline (evita 404)
  const imageUrl = property.imageUrl || fallbackImage;

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
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-cyan-600 text-white shadow-md"
          >
            {property.property_category === "casa"
              ? "Casa"
              : property.property_category === "apartamento"
              ? "Apartamento"
              : "Imóvel"}
          </Badge>
        </div>
        {!property.availability && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              Indisponível
            </span>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">
          {property.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-cyan-600" />
          {property.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-cyan-600" />
            <div>
              <p className="text-xs text-neutral-500">Área</p>
              <p className="font-semibold">{formatArea(property.area)} m²</p>
            </div>
          </div>
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

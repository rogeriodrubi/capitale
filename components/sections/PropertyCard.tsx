"use client";

import Image from "next/image";
import { Property } from "@/lib/data";
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
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className={
              property.type === "terreno"
                ? "bg-cyan-500 text-white"
                : "bg-purple-500 text-white"
            }
          >
            {property.type === "terreno" ? "Terreno" : "Imóvel"}
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
        <CardTitle className="text-lg">{property.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {property.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
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
              <p className="font-semibold text-cyan-600">
                {formatCurrency(property.price)}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-600 line-clamp-2">
          {property.description}
        </p>

        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          disabled={!property.availability}
        >
          {property.availability ? "Ver Detalhes" : "Indisponível"}
        </Button>
      </CardContent>
    </Card>
  );
}

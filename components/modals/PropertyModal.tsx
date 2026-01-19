"use client";

import { useState } from "react";
import Image from "next/image";
import { Property } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Ruler,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { formatCurrency, formatArea } from "@/lib/utils";

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleContact = () => {
    window.open(
      "https://api.whatsapp.com/send/?phone=5587999389753&text&type=phone_number&app_absent=0&utm_source=ig",
      "_blank"
    );
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{property.title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6">
          {/* Carrossel de Imagens */}
          <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={property.images[currentImageIndex]}
              alt={`${property.title} - ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition ${
                        idx === currentImageIndex
                          ? "bg-cyan-600 w-6"
                          : "bg-white/50 w-2"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Informações Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="h-5 w-5 text-cyan-600" />
                <span className="text-sm font-semibold text-neutral-600">
                  Área
                </span>
              </div>
              <p className="text-2xl font-bold text-neutral-900">
                {formatArea(property.area)} m²
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-neutral-600">
                  Preço
                </span>
              </div>
              <p className="text-2xl font-bold text-neutral-900">
                {formatCurrency(property.price)}
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-semibold text-neutral-600">
                  Tipo
                </span>
              </div>
              <p className="text-2xl font-bold text-neutral-900 capitalize">
                {property.type === "terreno" ? "Terreno" : "Imóvel"}
              </p>
            </div>
          </div>

          {/* Localização */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-600" />
              Localização
            </h3>
            <p className="text-neutral-600">{property.location}</p>
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">Descrição</h3>
            <p className="text-neutral-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Características */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">
              Características
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {property.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-100 rounded-lg text-neutral-700 text-sm font-medium"
                >
                  ✓ {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-4 border-t border-neutral-200">
            <Button onClick={handleContact} className="flex-1" size="lg">
              Solicitar Informações
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              size="lg"
            >
              Fechar
            </Button>
          </div>

          {/* Indisponível */}
          {!property.availability && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-semibold">
                ⚠️ Esta propriedade está temporariamente indisponível. Entre em
                contato para informações sobre imóveis similares.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { PropertyCard } from "@/components/sections/PropertyCard";

function getPerView(width: number) {
  if (width >= 1024) return 3; // lg
  if (width >= 768) return 2; // md
  return 1; // mobile
}

function chunk<T>(arr: T[], size: number) {
  if (size <= 0) return [arr];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function FeaturedPropertiesCarousel() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [perView, setPerView] = useState(3);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("featured", true);
      
      if (data) {
        setFeatured(data);
      }
    }
    fetchFeatured();
  }, []);

  useEffect(() => {
    const update = () => setPerView(getPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = useMemo(() => chunk(featured, perView), [featured, perView]);

  useEffect(() => {
    setPageIndex((idx) => Math.min(idx, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pages.length - 1;

  if (featured.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Imóveis em Destaque
          </h2>
          <p className="text-xl text-neutral-600">
            Explore alguns destaques do nosso portfólio
          </p>
        </div>

        <div className="relative">
          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${pageIndex * 100}%)` }}
            >
              {pages.map((group, idx) => (
                <div key={idx} className="w-full shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {group.map((property) => (
                      <div key={property.id} className="h-full">
                        <PropertyCard property={property} showActionButton={false} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-neutral-200 shadow-sm p-2 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setPageIndex((p) => Math.min(pages.length - 1, p + 1))}
            disabled={!canNext}
            aria-label="Próximo"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-neutral-200 shadow-sm p-2 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bullets */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {pages.map((_, idx) => {
            const isActive = idx === pageIndex;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Ir para a página ${idx + 1}`}
                onClick={() => setPageIndex(idx)}
                className={[
                  "transition-all rounded-full",
                  isActive
                    ? "bg-cyan-600 h-2.5 w-2.5"
                    : "bg-neutral-300 hover:bg-neutral-400 h-2 w-2",
                ].join(" ")}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/propriedades"
            className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg px-10 py-4 text-lg font-semibold transition-transform hover:scale-105"
          >
            Ver todos os imóveis
          </Link>
        </div>
      </div>
    </section>
  );
}


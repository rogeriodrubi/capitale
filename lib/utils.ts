import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatArea(area: number): string {
  return new Intl.NumberFormat("pt-BR").format(area);
}

export function getNeighborhoodFromLocation(location: string): string {
  const raw = (location || "").trim();
  if (!raw) {
    return "Não informado";
  }

  const beforeComma = raw.split(",")[0]?.trim() || "";
  const normalized = beforeComma.replace(/\s+/g, " ").trim();

  return normalized || "Não informado";
}
import type { Metadata } from "next";
import { Header } from "@/components/common/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capitale - Imobiliária",
  description: "Encontre os melhores terrenos e imóveis em São Paulo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="light">
      <body className="antialiased bg-white text-slate-900">
        <Header />
        {children}
      </body>
    </html>
  );
}

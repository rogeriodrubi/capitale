"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#properties", label: "Loteamentos" },
    { href: "#about", label: "Sobre" },
    { href: "#contact", label: "Contato" },
  ];

  const basePath = pathname === "/" ? "" : "/";
  const resolveHref = (hashHref: string) => `${basePath}${hashHref}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-lg text-neutral-900 hidden sm:inline">
              Capitale
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className="text-neutral-600 hover:text-cyan-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <Link
            href="https://api.whatsapp.com/send/?phone=5587999389753&text&type=phone_number&app_absent=0&utm_source=ig"
            target="_blank"
            className="hidden sm:inline-block"
          >
            <Button>Solicitar Informações</Button>
          </Link>

          {/* Menu Mobile */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col gap-4 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  className="text-neutral-600 hover:text-cyan-600 transition-colors font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="https://api.whatsapp.com/send/?phone=5587999389753&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">Solicitar Informações</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

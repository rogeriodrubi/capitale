"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, MessageCircle } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#search", label: "Buscar" },
    { href: "#properties", label: "Loteamentos" },
    { href: "#about", label: "Sobre" },
    { href: "#contact", label: "Contato" },
  ];

  const basePath = pathname === "/" ? "" : "/";
  const resolveHref = (hashHref: string) => `${basePath}${hashHref}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-700" style={{ backgroundColor: '#37474F' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[51px] overflow-hidden">
          <div className="flex items-center gap-4">
            {/* Menu Mobile */}
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 h-full">
              <div className="h-full flex items-center overflow-hidden">
                <Image
                  src="/images/logo-text.png"
                  alt="Capitale Imobiliária"
                  width={160}
                  height={32}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className="text-white hover:text-cyan-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Instagram Button */}
            <Link
              href="https://www.instagram.com/capitalepetrolina/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>

            {/* WhatsApp Icon Button */}
            <Link
              href="https://api.whatsapp.com/send/?phone=5587999389753&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-white hover:text-green-400 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Menu Mobile Expandido */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-600">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  className="text-white hover:text-cyan-400 transition-colors font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

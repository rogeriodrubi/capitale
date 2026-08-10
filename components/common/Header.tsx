"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.892.526 3.665 1.435 5.181L2 22l4.938-1.408A9.936 9.936 0 0 0 12 22c5.523 0 10-4.478 10-10S17.523 2 12.001 2Zm0 18.16a8.14 8.14 0 0 1-4.152-1.135l-.298-.177-3.09.883.898-3.012-.194-.309A8.148 8.148 0 0 1 3.84 12c0-4.508 3.653-8.16 8.161-8.16 4.508 0 8.16 3.652 8.16 8.16 0 4.508-3.652 8.16-8.16 8.16Z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#search", label: "Buscar" },
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
                className="group relative py-1 text-white transition-colors duration-300 font-medium hover:text-cyan-400"
              >
                {link.label}
                <span className="pointer-events-none absolute left-1/2 -bottom-0.5 h-[2px] w-0 -translate-x-1/2 bg-cyan-400 transition-all duration-300 ease-out group-hover:w-full" />
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
              className="flex items-center justify-center rounded-full p-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-[#E1306C] hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>

            {/* WhatsApp Icon Button */}
            <Link
              href="https://api.whatsapp.com/send/?phone=5587999389753&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full p-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-green-400 hover:bg-white/10"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-6 w-6" />
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

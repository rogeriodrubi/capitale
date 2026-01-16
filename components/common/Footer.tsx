import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-cyan-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              Capitale
            </h3>
            <p className="text-neutral-400 text-sm">
              Sua parceira em investimentos imobiliários de sucesso.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="#home" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#properties"
                  className="hover:text-cyan-400 transition"
                >
                  Terrenos
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-cyan-400 transition">
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-cyan-400 transition"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+5511999999"
                  className="hover:text-cyan-400 transition"
                >
                  (11) 9999-9999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contato@capitale.com"
                  className="hover:text-cyan-400 transition"
                >
                  contato@capitale.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Sociais */}
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-cyan-400 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-cyan-400 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-cyan-400 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-neutral-800 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>&copy; 2026 Capitale. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-cyan-400 transition">
              Política de Privacidade
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Building2, Award, TrendingUp } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const teamMembers = [
  {
    name: "João Silva",
    role: "Fundador & CEO",
    description: "15 anos de experiência em imobiliária",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Maria Santos",
    role: "Diretora Comercial",
    description: "12 anos de experiência em vendas",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Pedro Costa",
    role: "Gerente de Operações",
    description: "10 anos de experiência em gestão",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

export function About() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Sobre a Capitale
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Uma startup inovadora dedicada a transformar o mercado imobiliário
          </p>
        </div>

        {/* Missão, Visão, Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-cyan-600" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Conectar investidores com as melhores oportunidades
                imobiliárias, oferecendo transparência, confiança e excelência
                em cada transação.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-cyan-600" />
                Nossa Visão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Ser a plataforma imobiliária mais confiável e inovadora de São
                Paulo, transformando vidas através de investimentos
                inteligentes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
                Nossos Valores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Integridade, Excelência, Inovação e Compromisso com nossos
                clientes em cada projeto.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        <div className="bg-cyan-600 text-white rounded-2xl p-8 sm:p-12 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">150+</div>
              <div className="text-cyan-100">Propriedades Vendidas</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">500+</div>
              <div className="text-cyan-100">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">R$ 6.5M</div>
              <div className="text-cyan-100">em Negócios</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">8+</div>
              <div className="text-cyan-100">Anos de Mercado</div>
            </div>
          </div>
        </div>

        {/* Equipe */}
        <div>
          <h3 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            Nossa Equipe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-cyan-600 font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Simulando envio
    console.log("Formulário enviado:", formData);
    setSubmitted(true);

    // Reset do formulário
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Ficamos felizes em ouvir você. Entre em contato conosco para mais
            informações sobre nossos terrenos e serviços.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Info Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-cyan-600" />
                Telefone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">(11) 9999-9999</p>
              <p className="text-sm text-neutral-500 mt-2">Seg-Sex: 8h-18h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-cyan-600" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">contato@capitale.com</p>
              <p className="text-sm text-neutral-500 mt-2">
                Resposta em até 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-600" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">Petrolina, PE</p>
              <p className="text-sm text-neutral-500 mt-2">
                Rua dos Capitais, 1000
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formulário */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Envie-nos uma Mensagem</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e entraremos em contato em breve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Seu Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  placeholder="Seu Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                placeholder="Seu Telefone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <Textarea
                placeholder="Sua Mensagem"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
              />

              {submitted ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center font-semibold">
                  ✓ Mensagem enviada com sucesso! Entraremos em contato em
                  breve.
                </div>
              ) : (
                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

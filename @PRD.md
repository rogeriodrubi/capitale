# PRD - Capitale Real Estate Platform

**Versão:** 1.0  
**Data de Criação:** 16 de Janeiro de 2026  
**Status:** Em Desenvolvimento

---

## 📋 Visão Geral

**Capitale** é uma plataforma digital para uma startup de imobiliária que oferece uma experiência intuitiva e moderna para visualizar, explorar e entrar em contato sobre terrenos e imóveis disponíveis. O site é focado em usabilidade, design responsivo e conversão de leads.

### Objetivos Principais

1. **Apresentar Portfólio de Propriedades**: Exibir terrenos e imóveis de forma visual e interativa
2. **Gerar Leads**: Facilitar o contato entre potenciais clientes e a imobiliária
3. **Construir Credibilidade**: Demonstrar expertise e confiabilidade através de conteúdo profissional
4. **Otimizar para Conversão**: Usar design moderno e UX estratégico para maximizar contatos

---

## 🎯 Público-Alvo

- **Investidores Imobiliários** (25-65 anos)
- **Pessoas Buscando Terrenos** para construção ou investimento
- **Construtoras** e parceiros comerciais
- **Geração Digital** (20-40 anos) buscando imóveis modernos

---

## 🏗️ Arquitetura da Solução

### Tech Stack

```
Frontend: Next.js 14+ com React
UI Components: shadcn/ui (Radix + Vega)
Styling: Tailwind CSS
Ícones: Lucide React
Tipografia: Inter
Package Manager: pnpm
Deployment: Vercel (sugerido)
```

### Estrutura de Pastas

```
capitale/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── properties/
│   │   └── [id]/page.tsx
│   └── admin/ (futura)
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── PropertiesMap.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   └── modals/
│       └── PropertyDetailModal.tsx
├── lib/
│   ├── data.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── public/
│   └── images/
└── features.json
```

---

## ✨ Features e Funcionalidades

### 1. **Landing Page (Hero Section)**

- Banner atrativo com call-to-action principal
- Subtítulo descritivo sobre a Capitale
- Botão "Explorar Terrenos" com scroll suave
- Design responsivo (mobile-first)

### 2. **Seção de Terrenos com Mapa Interativo**

- Exibição de mapa visual com múltiplos terrenos
- Terrenos representados como áreas clicáveis
- Hover effects para melhor UX
- Animações suaves ao interagir

### 3. **Modal/Drawer de Detalhes do Terreno**

- Informações detalhadas ao clicar em terreno:
  - Localização exata
  - Metragem (m²)
  - Preço
  - Tipo de terreno
  - Características especiais
  - Fotos adicionais (carrossel)
  - Botão CTA para contato

### 4. **Grade de Propriedades**

- Listagem de todas as propriedades em cards
- Filtros por:
  - Tipo (terreno/imóvel)
  - Preço
  - Localização
  - Tamanho
- Busca em tempo real

### 5. **Seção Sobre a Empresa**

- Missão, Visão e Valores
- Estatísticas (propriedades vendidas, clientes satisfeitos)
- Equipe (com fotos e descrição)
- Histórico da empresa

### 6. **Seção de Serviços**

- Consultoria Imobiliária
- Gestão de Propriedades
- Investimento Seguro
- Documentação e Legalização

### 7. **Formulário de Contato**

- Campos: Nome, Email, Telefone, Mensagem
- Validação em tempo real
- Integração com backend (sugerido)
- Feedback visual de sucesso

### 8. **Footer**

- Links de navegação
- Links sociais
- Informações de contato
- Newsletter signup
- Política de Privacidade e Termos

### 9. **Responsividade**

- Design totalmente responsivo
- Breakpoints: Mobile (320px), Tablet (768px), Desktop (1024px+)
- Touch-friendly para dispositivos móveis

### 10. **Performance**

- Lazy loading de imagens
- Otimização de bundle
- Cache de dados
- Animações performáticas

---

## 🎨 Design System

### Cores (Tema Cyan)

- **Primary**: Cyan (destaque principal)
- **Secondary**: Neutral (textos e backgrounds)
- **Accent**: Subtle menu (menus secundários)

### Tipografia

- **Font**: Inter
- **Headings**: Bold, tamanhos 24px-48px
- **Body**: Regular, 16px
- **Small**: 14px

### Componentes shadcn/ui

- Button
- Card
- Dialog
- Input
- Textarea
- Select
- Badge
- Tooltip
- Skeleton (para loading)

---

## 📊 Fluxo de Usuário

### Fluxo Principal

1. Usuário acessa homepage
2. Vê hero section com CTA
3. Navega para seção de terrenos
4. Clica em terreno específico
5. Modal abre com detalhes
6. Usuário clica "Solicitar Informações"
7. Formulário de contato é preenchido
8. Mensagem é enviada

### Fluxo Secundário

1. Usuário acessa seção "Sobre"
2. Lê história e missão da empresa
3. Visualiza equipe
4. Retorna aos terrenos
5. Clica em "Contato"
6. Preenche formulário direto

---

## 📈 Dados e Estrutura

### Modelo de Terreno/Propriedade

```typescript
interface Property {
  id: string;
  title: string;
  location: string;
  coordinates: { x: number; y: number };
  area: number; // m²
  price: number;
  type: "terreno" | "imovel";
  description: string;
  features: string[];
  images: string[];
  contact: string;
  availability: boolean;
  mapImage: string;
}
```

---

## 🔄 Fases de Desenvolvimento

### Fase 1: MVP (Semanas 1-2)

- [x] Setup do projeto Next.js com shadcn/ui
- [ ] Componentes base (Header, Footer, Hero)
- [ ] Seção de Terrenos com mapa
- [ ] Modal de detalhes
- [ ] Formulário de contato básico

### Fase 2: Conteúdo (Semana 3)

- [ ] Preenchimento de dados de terrenos
- [ ] Adição de imagens
- [ ] Textos sobre empresa
- [ ] Informações de contato

### Fase 3: Otimização (Semana 4)

- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Mobile optimization
- [ ] Testes de usabilidade

### Fase 4: Funcionalidades Avançadas (Futuro)

- [ ] Backend para recebimento de contatos
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Blog/Notícias
- [ ] Integração com mapas reais (Google Maps)

---

## 🔐 Considerações de Segurança

- Validação de inputs no frontend e backend
- HTTPS obrigatório em produção
- Proteção contra CSRF em formulários
- Rate limiting para API de contatos
- Sanitização de dados do usuário

---

## 📱 Requisitos Não-Funcionais

| Requisito                      | Meta                                              |
| ------------------------------ | ------------------------------------------------- |
| Tempo de Carregamento          | < 2s                                              |
| LCP (Largest Contentful Paint) | < 2.5s                                            |
| FID (First Input Delay)        | < 100ms                                           |
| CLS (Cumulative Layout Shift)  | < 0.1                                             |
| Compatibilidade                | Chrome, Firefox, Safari, Edge (últimas 2 versões) |
| Mobile                         | iOS 12+, Android 8+                               |
| Acessibilidade                 | WCAG 2.1 AA                                       |

---

## 🎯 Métricas de Sucesso

1. **Engajamento**
   - Taxa de cliques em terrenos: > 30%
   - Tempo médio na página: > 2 minutos
2. **Conversão**

   - Taxa de preenchimento de formulário: > 15%
   - Taxa de conclusão do formulário: > 80%

3. **Performance**

   - Google Lighthouse Score: > 90
   - Bounce Rate: < 40%

4. **Técnico**
   - Zero errors em console
   - 100% de uptime
   - Build time: < 60s

---

## 📝 Próximas Etapas

1. ✅ Criar PRD e features.json
2. ⏳ Inicializar projeto Next.js com shadcn/ui
3. ⏳ Desenvolver componentes base
4. ⏳ Implementar lógica de interatividade
5. ⏳ Integrar dados reais
6. ⏳ Deployment e otimização final

---

**Coordenador:** Rogerio  
**Última Atualização:** 16 de Janeiro de 2026

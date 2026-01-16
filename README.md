# Capitale Real Estate Platform

Uma moderna plataforma imobiliária para explorar e investir em terrenos e imóveis de qualidade em São Paulo.

## 🚀 Features

- ✨ Interface moderna com Tailwind CSS e shadcn/ui
- 🗺️ Mapa interativo de terrenos com detalhes clicáveis
- 📱 Design totalmente responsivo
- 🎨 Tema Cyan e design profissional
- 📧 Formulário de contato funcional
- 🖼️ Galeria de imagens com carrossel
- 📊 Seção sobre a empresa com estatísticas
- 🔍 Busca e filtros de propriedades

## 📋 Requisitos

- Node.js 18+
- pnpm 8+

## 🛠️ Instalação

```bash
# Clonar o repositório
git clone <repo-url>

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura de Pastas

```
capitale/
├── app/                    # Diretório da aplicação Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Homepage
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── common/            # Componentes reutilizáveis
│   ├── sections/          # Seções da página
│   ├── modals/            # Modais e diálogos
│   └── ui/                # Componentes UI base
├── lib/                   # Utilitários e dados
│   ├── data.ts           # Dados das propriedades
│   └── utils.ts          # Funções utilitárias
├── public/               # Arquivos estáticos
├── features.json         # Definição de features para testes
├── @PRD.md              # Product Requirements Document
└── package.json         # Dependências do projeto
```

## 🎨 Design System

- **Cores**: Tema Cyan (primário), Neutral (secundário)
- **Tipografia**: Inter
- **Componentes**: shadcn/ui com Radix UI
- **Ícones**: Lucide React

## 📦 Dependências Principais

- `next` - Framework React
- `react` & `react-dom` - Biblioteca React
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Componentes acessíveis
- `lucide-react` - Biblioteca de ícones

## 🚀 Scripts

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Executar linter
pnpm lint
```

## 📝 Configuração

### Environment Variables

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Testes

Execute os testes feature usando a especificação em `features.json`

## 📞 Contato

Para informações sobre a Capitale:

- Email: contato@capitale.com
- Telefone: (11) 9999-9999
- Localização: Avenida Paulista, São Paulo

## 📄 Licença

Todos os direitos reservados © 2026 Capitale

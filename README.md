# Capitale

Site imobiliário para Petrolina, PE — listagem de imóveis (venda/aluguel, casa/apartamento)
com filtro por bairro, ficha de detalhes e contato via WhatsApp. Construído em Next.js 15 (App
Router) com Supabase como backend de dados.

## Stack

- **Framework**: Next.js 15 (React 18, TypeScript 5)
- **Estilo**: Tailwind CSS + shadcn/ui (componentes Radix)
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Dados**: Supabase (Postgres + Storage)
- **Gerenciador de pacotes**: npm (`package-lock.json` é o lockfile do projeto)

## Pré-requisitos

- Node.js compatível com Next.js 15
- npm
- Um projeto Supabase (URL + chaves de API)

## Setup

```bash
npm install
cp .env.example .env.local
```

Preencha `.env.local`:

| Variável                        | Onde usar                          | Observação                                                                 |
| -------------------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | Cliente e servidor                  | URL do projeto Supabase                                                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Cliente e servidor                  | Chave anônima (pública) do Supabase                                         |
| `SUPABASE_SERVICE_ROLE_KEY`      | Só servidor (`app/api/seed`)        | Bypassa RLS; nunca prefixar com `NEXT_PUBLIC_`; necessária só para rodar o seed local |

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Supabase

`supabase/schema.sql` cria a tabela `public.properties` (com RLS habilitado e uma policy de
leitura pública) e é a fonte de verdade do schema — rode esse arquivo no SQL Editor do seu
projeto Supabase para provisionar o banco.

Imagens de imóveis vêm de duas formas: um array `images` salvo direto na linha (usado pelos
dados de seed), ou — quando ausente — buscadas no bucket de Storage a partir do `folder_id` do
imóvel.

### Popular dados de desenvolvimento

Com o servidor local rodando e `SUPABASE_SERVICE_ROLE_KEY` configurada:

```bash
# via UI
# abra http://localhost:3000/seed e clique no botão

# ou via API diretamente
curl -X POST http://localhost:3000/api/seed
```

Isso faz upsert (por `folder_id`) dos imóveis de exemplo em `lib/seed-data.ts` — preserva
imóveis já cadastrados manualmente. **A rota é bloqueada quando `NODE_ENV=production`.**

## Estrutura de pastas

```
capitale/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── propriedades/page.tsx    # Listagem completa com filtros via querystring
│   ├── api/seed/route.ts        # Seed de dev (bloqueado em produção)
│   └── seed/page.tsx            # UI de dev para disparar o seed
├── components/
│   ├── common/                  # Header, Footer
│   ├── sections/                # Hero, PropertiesList, About, Contact
│   ├── modals/                  # PropertyModal
│   └── ui/                      # Componentes shadcn/ui (Button, Card, Dialog, etc.)
├── lib/
│   ├── properties.ts            # Busca de imóveis + resolução de imagem de capa
│   ├── supabase.ts              # Cliente Supabase (anon key)
│   ├── supabase-admin.ts        # Cliente Supabase (service role, só server-side)
│   ├── seed-data.ts             # Dados de exemplo para o seed de dev
│   ├── types.ts                 # Tipo Property
│   └── utils.ts                 # Formatação de moeda/área, derivação de bairro
├── supabase/schema.sql          # Schema da tabela properties
└── .specify/, specs/            # Spec-driven development (ver abaixo)
```

## Scripts

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm start        # inicia o build de produção
npm run lint     # ESLint
```

Não há test runner configurado neste projeto ainda.

## Desenvolvimento orientado a spec

Este projeto usa o [Spec Kit](https://github.com/github/spec-kit) para especificar features
novas antes de implementá-las:

- `.specify/memory/constitution.md` — princípios e restrições do projeto.
- `specs/000-baseline/spec.md` — o que o produto já faz hoje (referência, não uma spec a
  implementar).
- `.specify/memory/backlog.md` — lista triada do que ainda falta, ainda sem spec formal.
- `specs/NNN-.../spec.md` — specs de features individuais, uma pasta numerada por feature.

Fluxo para uma feature nova: `/speckit-specify` → (`/speckit-clarify`) → `/speckit-plan` →
(`/speckit-checklist`) → `/speckit-tasks` → (`/speckit-analyze`) → `/speckit-implement`.

## Deploy

Deploy em [Vercel](https://vercel.com). Configure as mesmas variáveis de ambiente do
`.env.local` no projeto Vercel (exceto `SUPABASE_SERVICE_ROLE_KEY`, que não é necessária em
produção já que o seed fica bloqueado).

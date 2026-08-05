<!--
Sync Impact Report
- Version change: (none) → 1.0.0
- Modified principles: n/a (initial ratification)
- Added sections: Core Principles (I–VIII), Non-Functional Requirements & Quality Gates, Development Workflow, Governance
- Removed sections: n/a
- Templates requiring updates: .specify/templates/plan-template.md (⚠ pending manual review against Principle II/III),
  .specify/templates/spec-template.md (✅ no direct conflict — remains generic)
- Follow-up TODOs:
  - TODO(RATIFICATION_DATE): backdated to the project's first commit (2026-01-16), when the original product
    intent was defined, even though this formal constitution document was first authored on 2026-08-05.
    Confirm this convention is acceptable if the project ever needs a stricter audit trail.
-->

# Capitale Constitution

## Core Principles

### I. Produto em Português, Mercado Petrolina-PE
Todo o conteúdo voltado ao usuário (UI, copy, formatação de moeda/número) é em português
brasileiro (`pt-BR`). O mercado-alvo do produto é Petrolina, PE — não São Paulo. Novas
features e conteúdo DEVEM usar Petrolina/região como referência geográfica.
**Racional**: o produto real (dados de seed, CTAs de WhatsApp, Instagram `@capitalepetrolina`)
já é sobre Petrolina; `components/sections/About.tsx` e `components/common/Footer.tsx` ainda
mencionam "São Paulo" por engano, herdado do scaffold inicial do projeto — essa é uma
inconsistência de conteúdo conhecida (rastreada em `.specify/memory/backlog.md`), não a fonte
de verdade sobre o mercado do produto.

### II. Next.js App Router — Server Components por Padrão
Rotas que buscam dados (ex.: `app/page.tsx`, `app/propriedades/page.tsx`) DEVEM ser Server
Components assíncronos, buscando dados via `lib/properties.ts`. A diretiva `"use client"` é
reservada para componentes com interatividade real no navegador (ex.: `Header`,
`PropertiesList`, `PropertyModal`, `Contact`). Padrões do Pages Router (`pages/`,
`getServerSideProps`, etc.) NÃO DEVEM ser introduzidos.

### III. Um Único Design System — Tailwind + shadcn/ui
Toda a UI usa Tailwind CSS e componentes shadcn/ui construídos sobre primitivas Radix
(`components/ui/*`), com variantes via `cva`/`cn()` (`lib/utils.ts`). Nenhuma outra
biblioteca de componentes DEVE ser introduzida em paralelo. Os tokens de marca reais são: a
escala `cyan` do Tailwind como cor de ação/destaque, e o tom `#37474F` (`lib/theme.ts`,
`PRIMARY_DARK`/`primarySolidBg`) como cor primária de marca em header, footer e botões
primários. O layout é mobile-first, com breakpoints de referência em 320px, 768px e 1024px.

### IV. Supabase Como Única Fonte de Dados de Produção
A tabela `properties` (Supabase) e o bucket de Storage associado (convenção `folder_id`) são
a única fonte de dados em produção. `lib/seed-data.ts` e a rota `app/api/seed` existem
exclusivamente para popular o ambiente de desenvolvimento local e DEVEM permanecer
bloqueados quando `NODE_ENV=production`. Nenhum array de dados mock DEVE voltar a alimentar
um caminho de código de produção.

### V. Acessibilidade É Meta, Não Fato Auditado
WCAG 2.1 AA é a meta declarada de acessibilidade do produto. Este é um alvo a perseguir em
novas features, não uma conformidade já verificada — não existe hoje nenhum tooling
automatizado de auditoria de acessibilidade no projeto. Alegações de conformidade DEVEM ser
verificadas manualmente antes de serem comunicadas como fato.

### VI. WhatsApp É o Canal Real de Conversão
Os deep links de WhatsApp (presentes em `Header`, `Contact`, `PropertyModal`) são o único
canal de conversão de leads que de fato funciona hoje; o formulário de contato na página não
envia dados a nenhum backend (é `console.log`/`alert` apenas). O número de WhatsApp está
duplicado em código em 3 arquivos — isso é dívida técnica reconhecida e rastreada no backlog,
não algo que este documento finge já estar resolvido.

### VII. Build + Lint São o Gate de Qualidade Real
O gate de qualidade automatizado hoje é `npm run build` e `npm run lint` (scripts definidos em
`package.json`). Não existe test runner nem CI configurados no projeto. Novas regras de
processo NÃO DEVEM presumir testes automatizados ou verificação de CI como se já existissem —
adicionar testes/CI é um item de backlog, não um princípio já em vigor.

### VIII. npm É o Gerenciador de Pacotes do Projeto
`package-lock.json` é o lockfile real e committado do projeto — o projeto roda com **npm**,
independentemente do que documentação antiga (anterior a esta constitution) tenha afirmado
sobre `pnpm`.

## Non-Functional Requirements & Quality Gates

As metas de performance abaixo foram herdadas do PRD original do projeto (16/01/2026) e são
mantidas como **metas aspiracionais nunca formalmente medidas** — não devem ser tratadas como
compliance verificada até que sejam de fato auditadas (ex.: via Lighthouse CI):

| Requisito                       | Meta                                                |
| -------------------------------- | ---------------------------------------------------- |
| Tempo de carregamento            | < 2s                                                  |
| LCP (Largest Contentful Paint)   | < 2.5s                                                |
| FID (First Input Delay)          | < 100ms                                               |
| CLS (Cumulative Layout Shift)    | < 0.1                                                 |
| Lighthouse Score                 | > 90                                                  |
| Build time                       | < 60s                                                 |
| Compatibilidade de navegador     | Chrome, Firefox, Safari, Edge (últimas 2 versões)     |
| Compatibilidade mobile           | iOS 12+, Android 8+                                   |

## Development Workflow

Trabalho de features novas segue o fluxo do Spec Kit: `/speckit-specify` (definir o quê/por
quê) → opcionalmente `/speckit-clarify` (reduzir ambiguidade) → `/speckit-plan` (definir o
como técnico, respeitando os princípios acima) → opcionalmente `/speckit-checklist` → 
`/speckit-tasks` (quebrar em tarefas acionáveis) → opcionalmente `/speckit-analyze`
(checar consistência entre spec/plan/tasks) → `/speckit-implement` (executar).

O estado atual já construído do produto está documentado retroativamente em
`specs/000-baseline/spec.md`, que serve como referência de contexto para `/speckit-plan` em
novas specs. Trabalho futuro ainda não especificado formalmente é mantido, de forma enxuta e
triada, em `.specify/memory/backlog.md` até ser promovido a uma spec numerada real via
`/speckit-specify`.

## Governance

Esta constitution tem precedência sobre convenções ad-hoc anteriores (incluindo os documentos
`@PRD.md`/`features.json` do scaffold original de 16/01/2026, agora removidos — seu conteúdo
relevante foi migrado para este documento, para `specs/000-baseline/spec.md` e para
`.specify/memory/backlog.md`).

Emendas a este documento exigem: (1) descrição explícita da mudança e seu racional, (2)
incremento de versão seguindo semver — MAJOR para remoção/redefinição incompatível de
princípios, MINOR para princípio ou seção novos, PATCH para clarificações/correções não
semânticas —, e (3) atualização da data de "Last Amended" abaixo. Specs e plans gerados pelo
Spec Kit DEVEM ser consistentes com os princípios aqui definidos; inconsistências detectadas
(ex.: por `/speckit-analyze`) DEVEM ser resolvidas ou justificadas explicitamente na spec/plan
em questão, não silenciosamente ignoradas.

**Version**: 1.0.0 | **Ratified**: 2026-01-16 | **Last Amended**: 2026-08-05

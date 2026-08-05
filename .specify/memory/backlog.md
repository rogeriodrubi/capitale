# Backlog

Lista enxuta e triada do que ainda não foi construído ou precisa de correção — não são specs
completas. Quando um item for priorizado para trabalho real, promova-o para uma spec numerada
com `/speckit-specify` (ela vira `specs/NNN-slug/spec.md`) e remova-o daqui.

Migrado e triado a partir de `@PRD.md`, `features.json`, `INICIO_RAPIDO.md`,
`SUMARIO_PROJETO.md` e `ENTREGA_FINAL.md` (removidos em 2026-08-05 — conteúdo histórico
disponível via `git show <commit-inicial>:@PRD.md` etc.), mais achados de inspeção direta do
código atual. Ver `specs/000-baseline/spec.md` § Known Issues para o detalhamento de cada
inconsistência de conteúdo listada abaixo.

## Correções de conteúdo/dívida técnica (rápidas, baixo risco)

- Corrigir "São Paulo" → "Petrolina, PE" em `components/sections/About.tsx` e
  `components/common/Footer.tsx`.
- Substituir estatísticas fictícias de `About.tsx` (150+/500+/R$6.5M/8+ anos) e a equipe
  placeholder (fotos Unsplash de banco de imagens) por dados reais da empresa, ou remover a
  seção até haver dados reais.
- Unificar telefone/email de contato exibidos (`Contact.tsx`, `Footer.tsx` mostram
  `(11) 9999-9999` / `contato@capitale.com`, enquanto os links de WhatsApp reais usam
  `5587999389753`) — decidir uma única fonte de verdade.
- Centralizar o número de WhatsApp (hoje hardcoded de forma idêntica em `Header.tsx`,
  `Contact.tsx`, `PropertyModal.tsx`) em uma constante/env compartilhada.
- Extrair a lógica de normalização de `property_category` (duplicada em `PropertyCard.tsx` e
  `PropertyModal.tsx`) para uma função única em `lib/`.
- Remover ou substituir os links mortos de Facebook/LinkedIn no footer por perfis reais (ou
  removê-los até existirem).
- Decidir o destino do campo de busca textual "fantasma" em `PropertiesList.tsx` (estado e
  sync com `?q=` existem, mas não há `<input>` visível na UI) — implementar o input ou remover
  o código morto.

## Funcionalidade

- Dar um destino real ao formulário de contato (endpoint que envie email/lead) ou removê-lo em
  favor só do WhatsApp, já que é o único canal que funciona hoje.
- Painel administrativo para cadastro/edição de imóveis sem depender do Supabase Studio
  diretamente.
- Autenticação (para o painel administrativo acima, e/ou área do cliente).
- Sistema de favoritos para visitantes.
- Blog/notícias do mercado imobiliário local.
- Agendamento de visitas.

## Qualidade e infraestrutura

- Testes automatizados (hoje não existem) e CI mínimo rodando `npm run build` + `npm run lint`
  em PRs.
- Auditoria real de acessibilidade (WCAG 2.1 AA é meta declarada na constitution, nunca
  verificada com ferramenta).
- Medir Core Web Vitals / Lighthouse de fato (metas na constitution são aspiracionais, nunca
  medidas).

## Precisa de decisão de produto antes de virar spec

- **Mapa interativo real (Google Maps)**: existia no PRD original como conceito central
  ("terrenos clicáveis em um mapa"), mas já foi deliberadamente abandonado em favor da
  lista/grid filtrável atual. Não é um carry-over automático — só faz sentido revisitar se
  houver uma decisão de produto nova justificando reintroduzir esse conceito.
- Sistema de pagamento online e recomendações via IA (mencionados nos docs antigos como "longo
  prazo") — mantidos aqui como notas especulativas, baixa prioridade, sem escopo definido.

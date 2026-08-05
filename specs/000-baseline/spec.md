# Feature Specification: Baseline — Site Capitale Como Existe Hoje

**Feature Branch**: `000-baseline` (retroativa — não corresponde a uma branch de trabalho real)

**Created**: 2026-08-05

**Status**: Implemented

**Input**: Captura retroativa do produto tal como construído entre 2026-01-16 e 2026-08-05,
substituindo `@PRD.md`/`features.json` (removidos) como fonte de verdade sobre o que já existe.
Serve de contexto de referência para `/speckit-plan` em specs futuras — não é uma spec a
implementar.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explorar e filtrar imóveis disponíveis (Priority: P1)

Um visitante acessa a home (`/`) ou a página de listagem (`/propriedades`), vê os imóveis
disponíveis em um grid de cards e filtra por bairro para encontrar opções relevantes.

**Why this priority**: é o caminho principal de descoberta de produto — sem ele não há
conversão possível.

**Independent Test**: acessar `/propriedades`, selecionar um bairro no dropdown e confirmar que
o grid mostra apenas imóveis daquele bairro, com o resultado refletido na URL (`?bairro=...`).

**Acceptance Scenarios**:

1. **Given** a home carregada com imóveis disponíveis, **When** o visitante rola até a seção
   `#search`, **Then** vê um grid responsivo (1/2/3 colunas) com até 12 cards, imóveis com
   `featured: true` aparecendo primeiro.
2. **Given** mais de 12 imóveis disponíveis após o filtro atual, **When** o visitante clica em
   "Carregar mais imóveis (N restantes)", **Then** mais 12 cards são revelados sem recarregar a
   página.
3. **Given** a rota `/propriedades` com `?bairro=Centro` na URL, **When** a página carrega,
   **Then** o filtro de bairro já vem pré-selecionado como "Centro" (estado inicial sincronizado
   a partir da querystring).
4. **Given** um bairro selecionado sem nenhum imóvel disponível correspondente, **When** o grid
   é renderizado, **Then** aparece a mensagem "Nenhuma propriedade encontrada. Tente ajustar os
   filtros."

---

### User Story 2 - Ver detalhes de um imóvel e entrar em contato (Priority: P1)

Um visitante clica em um card para abrir um modal com detalhes completos e aciona o CTA de
WhatsApp para iniciar uma conversa sobre aquele imóvel.

**Why this priority**: é o passo que converte navegação em lead — é literalmente o único canal
de contato funcional hoje (ver Known Issues).

**Independent Test**: clicar em um card com `availability: true`, confirmar que o modal abre com
galeria, área, quartos, preço/aluguel e descrição, e que o botão "Solicitar Informações" abre um
link `wa.me`/`api.whatsapp.com` em nova aba.

**Acceptance Scenarios**:

1. **Given** um imóvel com `images` preenchido no banco, **When** o modal abre, **Then** a
   galeria usa essas imagens diretamente (sem consultar o Storage).
2. **Given** um imóvel sem `images` mas com `folder_id`, **When** o modal abre, **Then** as
   imagens são buscadas no Supabase Storage via `folder_id`; se a busca não retornar nada, cai
   no `imageUrl` de capa ou em `/placeholder-property.jpg`.
3. **Given** um imóvel com mais de uma imagem, **When** o visitante usa as setas ou os
   indicadores (bolinhas), **Then** a imagem exibida muda e o indicador ativo é destacado.
4. **Given** um imóvel com `availability: false`, **When** o card é exibido, **Then** ele mostra
   overlay "Indisponível" e o botão de ação fica desabilitado (o modal não deveria ser
   alcançável por clique nesse caso, mas exibe um aviso amarelo se aberto por outra via, ex. URL
   `?imovel=<id>`).
5. **Given** o modal aberto na rota `/propriedades`, **When** o visitante fecha o modal,
   **Then** o parâmetro `imovel` é removido da URL (deep-link compartilhável enquanto aberto).

---

### User Story 3 - Conhecer a empresa e enviar mensagem pelo formulário (Priority: P2)

Um visitante rola até "Sobre a Capitale" para avaliar credibilidade e usa o formulário de
contato como alternativa ao WhatsApp.

**Why this priority**: reforça confiança, mas não é o caminho de conversão real hoje — ver Known
Issues (o formulário não envia dados a lugar nenhum).

**Independent Test**: preencher os 4 campos do formulário em `#contact` e submeter; confirmar
que aparece a mensagem de sucesso local, sem verificar qualquer efeito de backend (não existe).

**Acceptance Scenarios**:

1. **Given** o formulário com algum campo obrigatório vazio, **When** o visitante submete,
   **Then** um `alert()` pede para preencher todos os campos (nenhuma validação inline por
   campo).
2. **Given** todos os 4 campos preenchidos, **When** o visitante submete, **Then** os dados vão
   para `console.log` (nenhuma chamada de rede), uma mensagem de sucesso aparece por 3s e o
   formulário é limpo.

### Edge Cases

- Propriedade sem `location` com vírgula → `getNeighborhoodFromLocation` retorna a string
  inteira ou "Não informado" se vazia; pode gerar uma entrada de bairro "sozinha" no dropdown.
- `property_category` vindo do banco em formato inesperado (nem `"casa"`/`"apartamento"`,
  case-insensitive) → nenhum badge de categoria é exibido (função retorna `undefined`).
- Busca de imagens no Storage falhando silenciosamente → galeria cai para
  `/placeholder-property.jpg`.
- Usuário navega direto para `/propriedades?imovel=<id-inexistente>` → nenhum modal abre (o
  `find` não encontra correspondência), sem erro visível.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE buscar todos os imóveis da tabela `properties` no Supabase
  (`lib/properties.ts::getPropertiesWithImages`) e resolver uma imagem de capa por imóvel
  (`images[0]` se existir, senão a primeira imagem do Storage via `folder_id`).
- **FR-002**: O sistema DEVE exibir apenas imóveis com `availability === true` no grid principal
  (`PropertiesList`); imóveis indisponíveis nunca aparecem na listagem filtrável, mesmo que
  existam no banco.
- **FR-003**: O sistema DEVE permitir filtrar o grid por bairro, derivado automaticamente do
  campo `location` (texto antes da primeira vírgula), populando as opções do dropdown a partir
  dos imóveis disponíveis.
- **FR-004**: Na rota `/propriedades`, o sistema DEVE manter os filtros de busca (`q`) e bairro
  (`bairro`) e o imóvel aberto no modal (`imovel`) sincronizados bidirecionalmente com a
  querystring da URL, permitindo compartilhar/recarregar um estado de busca específico. Na home
  (`/`), essa sincronização com a URL NÃO se aplica.
- **FR-005**: O sistema DEVE ordenar o grid colocando imóveis com `featured: true` primeiro,
  preservando a ordem relativa dos demais.
- **FR-006**: O sistema DEVE paginar a exibição em lotes de 12 (`PAGE_SIZE`), com um botão
  "Carregar mais" que revela o próximo lote e mostra quantos itens restam.
- **FR-007**: O sistema DEVE abrir um modal de detalhes ao clicar em um imóvel disponível,
  mostrando galeria de imagens, área, quartos (se houver), preço (rotulado "Aluguel" quando
  `listing_type === "aluguel"`, senão "Preço"), localização completa e descrição.
- **FR-008**: O CTA "Solicitar Informações" no modal DEVE abrir um link de WhatsApp
  (`api.whatsapp.com/send`) em nova aba, com o número da empresa embutido na URL.
- **FR-009**: O sistema DEVE normalizar `property_category` para exibição (`"casa"` → "Casa",
  `"apartamento"` → "Apartamento", case-insensitive), tratando qualquer outro valor como "sem
  categoria exibível".
- **FR-010**: O sistema DEVE oferecer um formulário de contato com campos nome/email/
  telefone/mensagem, todos obrigatórios, com feedback de sucesso local — sem persistir ou
  enviar os dados a nenhum backend (comportamento atual, não uma limitação a corrigir dentro
  desta spec retroativa).
- **FR-011**: O sistema DEVE oferecer, em desenvolvimento apenas, uma rota de seed
  (`app/api/seed`, dados em `lib/seed-data.ts`, via `lib/supabase-admin.ts`) para popular a
  tabela `properties`; essa rota DEVE permanecer bloqueada quando `NODE_ENV=production`.

### Key Entities

- **Property** (`lib/types.ts`, tabela `public.properties` em `supabase/schema.sql`): `id`,
  `title`, `location`, `bedrooms?`, `area`, `price`, `description`, `folder_id`,
  `availability`, `created_at`, `images?` (URLs diretas, usado por dados de seed),
  `features?`, `contact?`, `featured?`, `listing_type?` (`"venda" | "aluguel"`),
  `property_category?` (`"apartamento" | "casa"`, com variantes capitalizadas vindas do banco
  em alguns ambientes). `imageUrl` é um campo calculado no frontend, não uma coluna.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Um visitante consegue ir da home até abrir o modal de detalhes de um imóvel
  específico em 2 cliques (rolar até `#search` não conta como clique) — hoje verdadeiro pela
  estrutura do grid, nunca medido com usuários reais.
- **SC-002**: 100% dos imóveis com `availability: false` ficam inacessíveis a partir do fluxo
  normal de navegação do grid (botão desabilitado, overlay "Indisponível").
- **SC-003**: O CTA de WhatsApp está presente e funcional em pelo menos 3 pontos de contato
  (header, modal de detalhes, seção de contato) — confirmado no código; nenhuma métrica de
  cliques/conversão é coletada hoje.

## Known Issues

<!-- Extraído de PRD antigo + features.json + inspeção direta do código atual, na migração para
     esta spec baseline. Itens acionáveis foram promovidos para .specify/memory/backlog.md. -->

- **Inconsistência de mercado**: `components/sections/About.tsx` ("plataforma imobiliária mais
  confiável e inovadora de São Paulo") e `components/common/Footer.tsx`
  (`<span>São Paulo, SP</span>`) ainda referenciam São Paulo, enquanto `Hero.tsx`, `Contact.tsx`
  e o Instagram vinculado (`@capitalepetrolina`) deixam claro que o mercado real é Petrolina-PE.
- **Estatísticas fictícias**: os números em `About.tsx` ("150+ Propriedades Vendidas", "500+
  Clientes Satisfeitos", "R$ 6.5M em Negócios", "8+ Anos de Mercado") e a equipe listada (João
  Silva, Maria Santos, Pedro Costa, com fotos de banco de imagens Unsplash) são os mesmos dados
  de exemplo do scaffold original de 16/01/2026 — nunca substituídos por informação real.
- **Contato genérico/inconsistente**: `Contact.tsx` e `Footer.tsx` exibem
  `contato@capitale.com` e `(11) 9999-9999` (placeholders, com DDD de São Paulo) como texto,
  enquanto os links de WhatsApp reais usam o número `5587999389753` (DDD 87, Petrolina/PE) — os
  dois nunca foram unificados.
- **Número de WhatsApp duplicado em código**: o mesmo link `api.whatsapp.com/send/?phone=5587999389753...`
  está hardcoded de forma idêntica em `Header.tsx`, `Contact.tsx` e `PropertyModal.tsx`.
- **Lógica de categoria duplicada**: a normalização de `property_category` (`"casa"` → "Casa",
  `"apartamento"` → "Apartamento") está copiada quase verbatim em `PropertyCard.tsx` e
  `PropertyModal.tsx`.
- **Campo de busca textual vestigial**: `PropertiesList.tsx` mantém estado (`searchTerm`),
  lógica de filtro por texto e sincronização com `?q=` na URL, mas nenhum `<input>` de busca é
  renderizado na UI — hoje só é alcançável manipulando a URL diretamente.
- **Links sociais mortos**: os ícones de Facebook e LinkedIn no rodapé apontam para
  `https://facebook.com`/`https://linkedin.com` genéricos, não para perfis reais da empresa.
- **Formulário de contato sem backend**: `Contact.tsx` apenas simula envio (`console.log` +
  `alert` + timeout) — nenhuma API é chamada.

## Assumptions

- O produto é de página única com navegação por âncora (`#home`, `#search`, `#about`,
  `#contact`) na home, mais uma rota dedicada `/propriedades` para listagem/filtro completos.
- Supabase (Postgres + Storage) é o único backend de dados; não há autenticação de usuário nem
  painel administrativo hoje.
- O deploy de produção é a Vercel (confirmado por commits anteriores de ajuste de deploy), com
  as mesmas variáveis de `.env.example` configuradas lá.
- Esta spec descreve o comportamento observado em 2026-08-05; qualquer nova feature deve
  atualizar aqui as seções afetadas se alterar um comportamento aqui descrito como "hoje".

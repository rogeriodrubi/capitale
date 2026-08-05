# Feature Specification: Centralizar Contato de WhatsApp

**Feature Branch**: `001-whatsapp-contact-config`

**Created**: 2026-08-05

**Status**: Draft

**Input**: User description: "Centralizar o número de WhatsApp da empresa, hoje duplicado de
forma idêntica em Header.tsx, Contact.tsx e PropertyModal.tsx, em uma única fonte de verdade,
para eliminar o risco de esses três pontos de contato divergirem quando o número precisar
mudar."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Atualizar o número de WhatsApp em um único lugar (Priority: P1)

Como responsável pelo site, quando o número de WhatsApp da empresa muda, eu quero alterá-lo em
um único lugar e ter certeza de que todos os pontos de contato do site (header, seção de
contato, modal de detalhes do imóvel) passam a usar o novo número imediatamente.

**Why this priority**: é o único motivo da feature — hoje uma atualização de número exige
lembrar de editar 3 arquivos manualmente, com risco real de divergência silenciosa entre eles.

**Independent Test**: alterar o valor centralizado, rodar o site localmente e conferir que os 3
CTAs (ícone do header, botão "WhatsApp" em Contato, botão "Solicitar Informações" no modal)
abrem o link com o novo número.

**Acceptance Scenarios**:

1. **Given** o número de WhatsApp está definido em uma única fonte de verdade, **When** um
   visitante clica em qualquer um dos 3 CTAs de WhatsApp do site, **Then** todos abrem o mesmo
   número, lido a partir dessa fonte única.
2. **Given** a fonte de verdade é alterada para um novo número, **When** o site é reconstruído
   (`npm run build`) e reiniciado, **Then** os 3 CTAs refletem o novo número sem exigir edição
   de nenhum componente.

### Edge Cases

- O que acontece se a fonte de verdade (variável de ambiente ou constante) não estiver definida
  em um ambiente (ex.: preview de PR sem env configurada)? O sistema deve ter um valor padrão
  sensato ou falhar de forma visível em build/lint, não silenciosamente quebrar o link em
  produção.
- Formato do número: deve continuar aceitando o formato já usado hoje na URL
  (`api.whatsapp.com/send/?phone=55...`), incluindo código do país e DDD, sem máscara.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE expor o número de WhatsApp da empresa a partir de uma única
  constante ou variável de ambiente compartilhada, em vez de valores literais repetidos em
  componentes.
- **FR-002**: `Header.tsx`, `Contact.tsx` e `PropertyModal.tsx` DEVEM consumir essa fonte única
  ao montar seus respectivos links de WhatsApp, sem nenhum número literal remanescente nesses
  arquivos.
- **FR-003**: O sistema DEVE preservar o formato de URL de WhatsApp já usado em produção hoje
  (`https://api.whatsapp.com/send/?phone=<numero>&text&type=phone_number&app_absent=0&utm_source=ig`),
  trocando apenas a origem do número, não a estrutura do link.

### Key Entities

- **Contato de WhatsApp da empresa**: um único valor (número com código do país e DDD, sem
  máscara) consumido por múltiplos pontos de UI.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Uma alteração no número de WhatsApp da empresa passa a exigir edição em exatamente
  1 lugar no código/configuração, não em 3.
- **SC-002**: Uma busca no código-fonte pelo número de WhatsApp literal retorna no máximo 1
  ocorrência (a própria fonte de verdade), contra as 3 ocorrências duplicadas de hoje.

## Assumptions

- O número de WhatsApp não varia por ambiente (dev/produção usam o mesmo número) — se isso
  mudar no futuro, a fonte de verdade escolhida deve suportar isso (ex.: variável de ambiente
  em vez de constante fixa no código).
- Esta spec cobre apenas centralizar a fonte do número; não inclui adicionar novos pontos de
  contato de WhatsApp nem mudar o texto/UX dos botões existentes.

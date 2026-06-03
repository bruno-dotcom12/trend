# TREND — guia do projeto (leia antes de codar)

## O que é o TREND
Infraestrutura operacional para a **lojista multimarca que revende moda** no interior do Brasil —
decisora solo, de caixa curto, que repõe estoque comprando pronto no atacado. O problema dela é
**"apostar no escuro"**: decide o quê e quanto comprar com base em sinal alheio (fornecedor/feed),
é obrigada a comprar em lote mínimo e decide sozinha → capital travado e confiança que cai.

O TREND conecta três camadas, e o diferencial é a 3ª (execução), não a previsão:
1. **SINAL** — detecção de sinal de tendência *em formação* (nunca "previsão"), a partir do público
   da própria loja + redes + fornecedores bem pontuados, tudo num só lugar.
2. **DECISÃO** — o quê e quanto comprar: quantidade recomendada para o público da loja + um **score
   explicável** ("esta peça tem X% de chance de performar bem + os 3 motivos").
3. **EXECUÇÃO** (diferencial) — pré-venda antes de pagar o lote + compra coletiva entre marcas para
   furar o lote mínimo.

## Escopo do MVP (construir nesta ordem, em fatias pequenas)
> Construa front-end primeiro com dados mock; só depois pluga o Supabase. Commits pequenos por fatia.

- **Fatia 0 — Base:** scaffolding, layout, identidade visual (tokens no Tailwind), navegação das 3
  camadas, página inicial estilo reportagem ("A lojista que parou de apostar no escuro").
- **Fatia 1 — Onboarding da loja:** nicho, cidade/UF, faixa de preço, ticket médio, público
  estimado, capital disponível para a próxima compra. (mock → depois Supabase)
- **Fatia 2 — SINAL (Descobrir):** feed de sinais de tendência. No MVP, **dados semente editáveis**
  (seed), não detecção real. Cada sinal tem força e contexto. Deixar a fonte real plugável depois.
- **Fatia 3 — DECISÃO (Corrigir):** tela de decisão de compra. Lista de peças candidatas; cada uma
  mostra o **score (0–100) + os 3 motivos** e a **quantidade recomendada** para o público da loja.
- **Fatia 4 — EXECUÇÃO (Blindar):** pré-venda (cria página de pré-venda e registra interesse) +
  compra coletiva (juntar pedido com outras lojas, com barra de progresso até o lote mínimo).
- **Fatia 5 — Dashboard + Supabase + Auth** (magic link). Persistir o que era mock.

Marque sempre o que é **real** vs **simulado** na UI (ex.: badge "dados de demonstração").

## Regra de engenharia inegociável: o motor de decisão é determinístico
O cálculo de score e de quantidade **NUNCA usa LLM para fazer aritmética**. É uma função pura,
testada (TDD), separada da UI.

Contrato do motor (`src/lib/engine/`):
- Entrada por peça: `{ engajamentoRedes: 0-100, crescimentoBusca: 0-100, aderenciaPublico: 0-100,
  saturacao: 0-100 }` + contexto da loja `{ ticketMedio, capitalDisponivel, loteMinimo }`.
- `calcularScore(peca)` → `{ score: 0-100, motivos: Motivo[] }`, com pesos configuráveis; os
  **3 motivos** são os 3 fatores de maior contribuição, cada um com texto explicativo legível.
- `quantidadeRecomendada(peca, loja)` → inteiro determinístico, respeitando capital e lote.
- Escreva os testes **antes** (Vitest): casos de score mínimo/máximo, empate de motivos, capital
  insuficiente, saturação alta derrubando o score.
- Nada de números mágicos espalhados: pesos e limiares ficam em um único arquivo de config.

## Stack
- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- Supabase (Postgres + Auth) — plugar a partir da Fatia 5
- Vitest para os testes do motor
- Deploy: Vercel

## Identidade visual (tokens)
- Berry `#6D2E46` · Navy `#1E2A4A` · Creme `#F7F1E6` (fundo) · Gold `#C8A878` · Terracota `#B85042`
- Títulos display: serifada elegante (ex.: Playfair Display, itálico nos subtítulos)
- Corpo: serifada legível (ex.: Lora) para texto de reportagem; Inter para UI/rótulos
- Vocabulário de produto: "detecção de sinal", **nunca** "previsão". O herói é a **execução**.

## Estrutura de pastas (alvo)
```
src/
  app/                # rotas (App Router)
    (marketing)/      # reportagem / landing
    app/              # produto: descobrir, corrigir, blindar, dashboard
  components/
    ui/               # shadcn
  lib/
    engine/           # motor determinístico (score + quantidade) + testes
    supabase/         # client + queries (Fatia 5+)
    seed/             # dados semente do MVP
  styles/
```

## Como trabalhar (instruções para o Claude Code)
- Antes de cada fatia, **mostre um plano curto** e espere meu ok.
- Commits pequenos e descritivos, uma fatia por vez.
- Comente em PT-BR onde ajudar.
- Não introduza backend/auth antes da Fatia 5.
- Se for inventar dado de tendência, use o `seed/` — não invente número dentro de componente.
@AGENTS.md


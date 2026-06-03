# Revisão didática do TREND — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deixar o site (landing + produto) mais didático e simples de entender — nomes diretos por tela, uma trilha guiada de 3 passos, e linguagem que dá instrução baseada em dados (nunca previsão/garantia), sem mexer na estética.

**Architecture:** `src/lib/navigation.ts` é a fonte única das 3 camadas; ganha `passo`, `legenda` e os textos didáticos, e tudo (nav, stepper, próximo-passo, landing, cabeçalhos) lê dali. Dois componentes novos guiam a jornada: `Trilha` (stepper no layout) e `ProximoPasso` (fim de cada tela). Rotas renomeadas para bater com os nomes. Estética, motor determinístico e dados-semente ficam intactos.

**Tech Stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + lucide-react. Validação por `tsc` + `eslint` + `vitest` — **nunca `next build`** (quebra o cache do `next dev`, conforme memória do projeto).

---

## Regra de linguagem (aplicar em toda cópia escrita neste plano)

Banir: "previsão", "garantido", "sem risco", "protegido", "seguro", "certeza".
Usar: "sinal detectado", "instrução baseada em dados", "reduz a exposição do caixa".

## Ordem das tarefas

1. `navigation.ts` (fonte única) — base de tudo
2. Renomear rotas (`corrigir→decidir`, `blindar→comprar`)
3. Mover painel → Início (`/app` raiz) e reconstruir
4. Componente `Trilha` (stepper) + plugar no layout
5. Componente `ProximoPasso`
6. `CamadaHeader` didático
7. Página Descobrir
8. Página Decidir
9. Página Comprar
10. `AvisoPerfil` (linguagem de trilha)
11. Landing (nomes + links)
12. Validação final

---

### Task 1: `navigation.ts` — fonte única com passo, legenda e textos didáticos

**Files:**
- Modify: `src/lib/navigation.ts`

- [ ] **Step 1: Reescrever o arquivo inteiro**

```ts
// Fonte única das 3 camadas do TREND. Usada na navegação, na trilha guiada,
// no cabeçalho de cada tela e na landing. Mude aqui e propaga para todo o site.
export type Camada = {
  href: string;
  passo: 1 | 2 | 3;
  rotulo: string; // nome direto (o que a lojista faz) — o nome principal na UI
  legenda: string; // nome do método, discreto (Sinal / Decisão / Execução)
  resumo: string; // uma linha de apoio (trilha, próximo passo, landing)
  comoFunciona: {
    oQueE: string;
    porQue: string;
    oQueFazer: string;
  };
};

export const CAMADAS: Camada[] = [
  {
    href: "/app/descobrir",
    passo: 1,
    rotulo: "Descobrir tendências",
    legenda: "Sinal",
    resumo: "Veja as tendências em formação para o seu público.",
    comoFunciona: {
      oQueE:
        "Sinais de tendência em formação — reunidos do público da sua loja, das redes e dos fornecedores bem pontuados, num só lugar.",
      porQue:
        "Você vê a tendência nascendo, em vez de comprar depois que todo mundo já comprou. É sinal detectado, não previsão.",
      oQueFazer:
        "Explore os sinais e filtre pelo seu nicho. No próximo passo eles viram decisão de compra.",
    },
  },
  {
    href: "/app/decidir",
    passo: 2,
    rotulo: "Decidir o que comprar",
    legenda: "Decisão",
    resumo: "Receba o score e a quantidade certa para cada peça.",
    comoFunciona: {
      oQueE:
        "Para cada peça candidata, um score de 0 a 100 com os 3 motivos por trás e a quantidade recomendada para o seu público e o seu caixa.",
      porQue:
        "Tira o achismo da compra: o cálculo é determinístico (mesma entrada, mesmo resultado) — uma instrução baseada nos dados, não um palpite.",
      oQueFazer:
        "Compare as peças pelo score e pelos motivos, e veja quantas unidades cabem no seu capital. Leve as escolhidas para o passo de compra.",
    },
  },
  {
    href: "/app/comprar",
    passo: 3,
    rotulo: "Comprar com método",
    legenda: "Execução",
    resumo: "Valide a demanda e fure o lote mínimo sem travar o caixa.",
    comoFunciona: {
      oQueE:
        "Duas formas de comprar reduzindo a exposição do caixa: pré-venda (reserva antes de pagar) e compra coletiva (pedido junto com outras lojas).",
      porQue:
        "O capital só sai quando o risco já caiu — você valida a demanda antes de pagar o lote e fura o lote mínimo sem comprar tudo sozinha.",
      oQueFazer:
        "Abra uma pré-venda para testar a demanda e entre numa compra coletiva para furar o lote mínimo. Acompanhe o progresso no Início.",
    },
  },
];

// Próxima camada da jornada (ou null se já está no último passo).
export function proximaCamada(passo: number): Camada | null {
  return CAMADAS.find((c) => c.passo === passo + 1) ?? null;
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: vão aparecer erros APENAS nos arquivos que ainda usam a API antiga de `CamadaHeader`/rotas (resolvidos nas tarefas seguintes). Confirmar que `src/lib/navigation.ts` em si não acusa erro.

- [ ] **Step 3: Commit**

```bash
git add src/lib/navigation.ts
git commit -m "feat(nav): navigation.ts vira fonte unica com passo, legenda e textos didaticos

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Renomear rotas `corrigir → decidir` e `blindar → comprar`

**Files:**
- Rename: `src/app/app/corrigir/` → `src/app/app/decidir/`
- Rename: `src/app/app/blindar/` → `src/app/app/comprar/`

- [ ] **Step 1: Mover as pastas com git**

```bash
git mv src/app/app/corrigir src/app/app/decidir
git mv src/app/app/blindar src/app/app/comprar
```

- [ ] **Step 2: Verificar que as pastas existem**

Run: `ls src/app/app`
Expected: lista contém `decidir` e `comprar`, e NÃO contém `corrigir` nem `blindar`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(rotas): corrigir->decidir, blindar->comprar (URLs batem com os nomes)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

> Nota: os `Link` para as rotas antigas (na landing e no painel) são corrigidos nas Tasks 3 e 11. Até lá o `tsc` não acusa (são strings), mas os links quebram — por isso a validação final (Task 12) confere tudo junto.

---

### Task 3: Mover painel → Início (`/app` raiz) e reconstruir focado na trilha

**Files:**
- Modify: `src/app/app/page.tsx` (hoje só faz `redirect` — vira a tela Início)
- Delete: `src/app/app/dashboard/` (conteúdo migra para `/app`)

- [ ] **Step 1: Substituir `src/app/app/page.tsx` inteiro pela tela Início**

```tsx
"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Store, TrendingUp } from "lucide-react";

import { BarraProgresso } from "@/components/barra-progresso";
import { DemoBadge } from "@/components/demo-badge";
import { calcularScore } from "@/lib/engine";
import {
  listarComprasColetivas,
  listarPreVendas,
} from "@/lib/execucao/fonte";
import { useExecucao } from "@/lib/execucao/store";
import { FAIXAS_PRECO, NICHOS } from "@/lib/loja/tipos";
import { useLoja } from "@/lib/loja/store";
import { CAMADAS } from "@/lib/navigation";
import { listarPecas } from "@/lib/pecas/fonte";
import { listarSinais } from "@/lib/sinais/fonte";

const real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function InicioPage() {
  const { loja } = useLoja();
  const { estado } = useExecucao();

  const sinais = listarSinais();
  const pecas = listarPecas();
  const preVendas = listarPreVendas();
  const compras = listarComprasColetivas();

  const nicho = loja?.nicho;

  const topSinais = useMemo(
    () =>
      [...sinais]
        .filter((s) => (nicho ? s.nichos.includes(nicho) : true))
        .sort((a, b) => b.forca - a.forca)
        .slice(0, 3),
    [sinais, nicho],
  );

  const topPecas = useMemo(
    () =>
      pecas
        .map((p) => ({ peca: p, score: calcularScore(p.fatores).score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [pecas],
  );

  const minhasPreVendas = preVendas.filter((pv) =>
    estado.interesses.includes(pv.id),
  );
  const minhasCompras = compras
    .map((cc) => ({ compra: cc, unidades: estado.adesoes[cc.id] ?? 0 }))
    .filter((x) => x.unidades > 0);
  const capitalComprometido = minhasCompras.reduce(
    (soma, x) => soma + x.unidades * x.compra.precoUnitario,
    0,
  );
  const totalParticipacoes = minhasPreVendas.length + minhasCompras.length;

  const nichoRotulo = NICHOS.find((n) => n.valor === nicho)?.rotulo;
  const faixaRotulo = FAIXAS_PRECO.find(
    (f) => f.valor === loja?.faixaPreco,
  )?.rotulo;

  return (
    <div>
      {/* Cabeçalho */}
      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Início · comece aqui
          </span>
          <DemoBadge />
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          {loja ? `Olá, ${loja.cidade}` : "Bem-vinda ao TREND"}
        </h1>
        <p className="mt-2 max-w-2xl font-body text-lg text-muted-foreground">
          O TREND organiza sua próxima compra em três passos. Não prevemos o
          futuro — damos a instrução certa com base no mercado e nos seus dados.
        </p>
      </header>

      {/* Passo 0 — perfil */}
      <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Store className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-ui text-sm font-semibold text-foreground">
              Passo 0 · Perfil da sua loja
            </p>
            <p className="font-body text-sm text-muted-foreground">
              {loja
                ? `${loja.cidade} · ${loja.uf}${
                    [nichoRotulo, faixaRotulo].filter(Boolean).length
                      ? " · " + [nichoRotulo, faixaRotulo].filter(Boolean).join(" · ")
                      : ""
                  }`
                : "Complete o perfil para personalizar a trilha (quantidade e aderência ao seu público)."}
            </p>
          </div>
        </div>
        <Link
          href="/app/onboarding"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 font-ui text-sm font-semibold text-foreground transition-colors hover:border-primary"
        >
          {loja ? (
            <>
              <Check className="size-4 text-primary" aria-hidden /> Perfil completo · editar
            </>
          ) : (
            <>Completar perfil</>
          )}
        </Link>
      </section>

      {/* Trilha em 3 passos */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Sua jornada em 3 passos
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {CAMADAS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 hover:border-primary"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-base font-bold text-primary-foreground">
                {c.passo}
              </span>
              <p className="mt-4 font-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {c.legenda}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                {c.rotulo}
              </h3>
              <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-foreground/80">
                {c.resumo}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-primary">
                Abrir
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
        <Link
          href={loja ? "/app/descobrir" : "/app/onboarding"}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-ui text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          {loja ? "Começar pelo passo 1 · Descobrir" : "Começar pelo perfil"}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      {/* Onde você está — status compacto */}
      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <Stat
          rotulo="Capital disponível"
          valor={loja ? real.format(loja.capitalDisponivel) : "—"}
        />
        <Stat
          rotulo="Comprometido em coletivas"
          valor={real.format(capitalComprometido)}
        />
        <Stat
          rotulo="Minhas participações"
          valor={String(totalParticipacoes)}
        />
      </section>

      {/* Atalhos: top sinais e top peças */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Bloco titulo="Sinais em alta para você" href="/app/descobrir" hrefRotulo="Ver passo 1">
          <ul className="space-y-3">
            {topSinais.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-ui text-sm font-semibold text-foreground">
                    {s.titulo}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">{s.categoria}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 font-ui text-sm font-semibold text-primary">
                  <TrendingUp className="size-4" aria-hidden />
                  {s.forca}
                </span>
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Peças com maior score" href="/app/decidir" hrefRotulo="Ver passo 2">
          <ul className="space-y-3">
            {topPecas.map(({ peca, score }) => (
              <li
                key={peca.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-ui text-sm font-semibold text-foreground">
                    {peca.titulo}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">{peca.categoria}</p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {score}
                </span>
              </li>
            ))}
          </ul>
        </Bloco>
      </div>

      {/* Minhas execuções */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Minhas execuções
          </h2>
          <Link
            href="/app/comprar"
            className="inline-flex items-center gap-1 font-ui text-sm font-semibold text-primary hover:underline"
          >
            Ver passo 3
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {totalParticipacoes === 0 ? (
          <p className="mt-5 rounded-lg border border-dashed border-border bg-card p-8 text-center font-body text-muted-foreground">
            Você ainda não entrou em nenhuma pré-venda ou compra coletiva.{" "}
            <Link href="/app/comprar" className="font-semibold text-primary hover:underline">
              Comece a comprar com método.
            </Link>
          </p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {minhasPreVendas.map((pv) => {
              const interessados = pv.interessadosBase + 1;
              return (
                <ParticipacaoLinha
                  key={pv.id}
                  tipo="Pré-venda"
                  titulo={pv.titulo}
                  valor={interessados}
                  total={pv.meta}
                  legenda={`${interessados}/${pv.meta} reservas`}
                />
              );
            })}
            {minhasCompras.map(({ compra, unidades }) => {
              const totalUn = compra.unidadesBase + unidades;
              return (
                <ParticipacaoLinha
                  key={compra.id}
                  tipo="Compra coletiva"
                  titulo={compra.titulo}
                  valor={totalUn}
                  total={compra.loteMinimo}
                  legenda={`${unidades} un. minhas · ${real.format(
                    unidades * compra.precoUnitario,
                  )}`}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-ui text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {rotulo}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-foreground">{valor}</p>
    </div>
  );
}

function Bloco({
  titulo,
  href,
  hrefRotulo,
  children,
}: {
  titulo: string;
  href: string;
  hrefRotulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h2 className="font-display text-xl font-bold text-foreground">{titulo}</h2>
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-ui text-sm font-semibold text-primary hover:underline"
        >
          {hrefRotulo}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ParticipacaoLinha({
  tipo,
  titulo,
  valor,
  total,
  legenda,
}: {
  tipo: string;
  titulo: string;
  valor: number;
  total: number;
  legenda: string;
}) {
  const completa = valor >= total;
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-ui text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {tipo}
          </p>
          <p className="font-ui text-sm font-semibold text-foreground">{titulo}</p>
        </div>
        {completa && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-ui text-xs font-semibold text-primary">
            <Sparkles className="size-3" aria-hidden />
            pronta
          </span>
        )}
      </div>
      <div className="mt-3">
        <BarraProgresso valor={valor} total={total} completa={completa} />
      </div>
      <p className="mt-1.5 font-ui text-xs text-muted-foreground">{legenda}</p>
    </div>
  );
}
```

- [ ] **Step 2: Apagar a pasta antiga do dashboard**

```bash
git rm -r src/app/app/dashboard
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros novos vindos de `src/app/app/page.tsx`. (Erros remanescentes só nos arquivos das Tasks 4–11.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(inicio): painel vira tela Inicio na raiz /app, focada na trilha de 3 passos

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Componente `Trilha` (stepper) + plugar no layout

**Files:**
- Create: `src/components/trilha.tsx`
- Modify: `src/app/app/layout.tsx`
- Modify: `src/components/site-nav.tsx` (remover o link "Painel" duplicado e o rótulo-método empilhado)

- [ ] **Step 1: Criar `src/components/trilha.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

import { CAMADAS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Stepper da jornada: ① Descobrir → ② Decidir → ③ Comprar.
// Some no Início (/app) e no onboarding — lá a jornada já aparece na própria tela.
export function Trilha() {
  const pathname = usePathname();
  const oculto = pathname === "/app" || pathname.startsWith("/app/onboarding");
  if (oculto) return null;

  const passoAtual =
    CAMADAS.find((c) => pathname.startsWith(c.href))?.passo ?? 0;

  return (
    <nav aria-label="Jornada de compra em 3 passos" className="border-b border-border bg-card">
      <ol className="mx-auto flex w-full max-w-6xl items-center px-6 py-3">
        {CAMADAS.map((c, i) => {
          const concluido = c.passo < passoAtual;
          const atual = c.passo === passoAtual;
          return (
            <li key={c.href} className="flex flex-1 items-center">
              <Link
                href={c.href}
                aria-current={atual ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 font-ui text-sm transition-colors",
                  atual
                    ? "bg-primary font-semibold text-primary-foreground"
                    : concluido
                      ? "text-primary hover:bg-primary/10"
                      : "text-muted-foreground hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-xs font-bold",
                    atual
                      ? "bg-primary-foreground/20"
                      : concluido
                        ? "bg-primary/15 text-primary"
                        : "bg-muted",
                  )}
                >
                  {concluido ? <Check className="size-3" aria-hidden /> : c.passo}
                </span>
                <span className="hidden sm:inline">{c.rotulo}</span>
              </Link>
              {i < CAMADAS.length - 1 && (
                <span className="mx-1 h-px flex-1 bg-border sm:mx-2" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 2: Plugar a `Trilha` no layout do produto**

Em `src/app/app/layout.tsx`, substituir o conteúdo inteiro por:

```tsx
import { SiteNav } from "@/components/site-nav";
import { Trilha } from "@/components/trilha";

// Shell do produto: cabeçalho fixo + trilha guiada de 3 passos + conteúdo.
// O perfil da loja (mock) é lido via hook useLoja(), sem provider.
export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteNav />
      <Trilha />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Simplificar a `SiteNav` (nome único, sem rótulo-método empilhado)**

Em `src/components/site-nav.tsx`, substituir o bloco `<nav>...</nav>` (linhas 27–71 do arquivo atual) por:

```tsx
        <nav className="flex items-center gap-1">
          <Link
            href="/app"
            aria-current={pathname === "/app" ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 font-ui text-sm font-semibold transition-colors",
              pathname === "/app"
                ? "bg-primary text-primary-foreground"
                : "text-creme/80 hover:bg-white/10 hover:text-creme",
            )}
          >
            <LayoutDashboard className="size-4" aria-hidden />
            Início
          </Link>
          {CAMADAS.map((c) => {
            const ativo = pathname.startsWith(c.href);
            return (
              <Link
                key={c.href}
                href={c.href}
                aria-current={ativo ? "page" : undefined}
                title={c.legenda}
                className={cn(
                  "rounded-md px-3 py-1.5 font-ui text-sm font-semibold transition-colors",
                  ativo
                    ? "bg-primary text-primary-foreground"
                    : "text-creme/80 hover:bg-white/10 hover:text-creme",
                )}
              >
                {c.rotulo}
              </Link>
            );
          })}
        </nav>
```

> O import de `Store` e `LayoutDashboard` já existe no arquivo; mantenha. O chip "Minha loja" (linhas 73–93) fica inalterado.

- [ ] **Step 4: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros em `trilha.tsx`, `layout.tsx` e `site-nav.tsx`.

- [ ] **Step 5: Commit**

```bash
git add src/components/trilha.tsx src/app/app/layout.tsx src/components/site-nav.tsx
git commit -m "feat(trilha): stepper de 3 passos no layout + nav com nome unico

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Componente `ProximoPasso`

**Files:**
- Create: `src/components/proximo-passo.tsx`

- [ ] **Step 1: Criar `src/components/proximo-passo.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { proximaCamada } from "@/lib/navigation";

// Bloco de fim de tela: empurra a lojista para o próximo passo da jornada.
// No último passo, oferece voltar ao Início.
export function ProximoPasso({ passoAtual }: { passoAtual: 1 | 2 | 3 }) {
  const proxima = proximaCamada(passoAtual);

  if (!proxima) {
    return (
      <div className="mt-12 flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-foreground">
          Você percorreu os três passos. Acompanhe pré-vendas e coletivas no Início.
        </p>
        <Link
          href="/app"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-5 py-2.5 font-ui text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5"
        >
          Voltar ao Início
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12 flex flex-col items-start gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Próximo passo · {proxima.passo} de 3
        </p>
        <p className="mt-1 font-display text-lg font-bold text-foreground">
          {proxima.rotulo}
        </p>
        <p className="font-body text-sm text-muted-foreground">{proxima.resumo}</p>
      </div>
      <Link
        href={proxima.href}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-ui text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Ir para {proxima.rotulo}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros em `proximo-passo.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/proximo-passo.tsx
git commit -m "feat(proximo-passo): bloco de fim de tela que leva ao proximo passo

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: `CamadaHeader` didático

**Files:**
- Modify: `src/components/camada-header.tsx`

- [ ] **Step 1: Reescrever `CamadaHeader` (mantendo o export `EmBreve`)**

```tsx
import { DemoBadge } from "@/components/demo-badge";
import type { Camada } from "@/lib/navigation";

// Cabeçalho padrão de cada tela do produto.
// Recebe a camada inteira (fonte única) e mostra: passo + legenda + nome direto
// + um mini-explicador didático (o que é · por que importa · o que fazer aqui).
export function CamadaHeader({ camada }: { camada: Camada }) {
  const cards = [
    { t: "O que é", d: camada.comoFunciona.oQueE },
    { t: "Por que importa", d: camada.comoFunciona.porQue },
    { t: "O que fazer aqui", d: camada.comoFunciona.oQueFazer },
  ];

  return (
    <header className="border-b border-border pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-[11px]">
            {camada.passo}
          </span>
          Passo {camada.passo} de 3 · {camada.legenda}
        </span>
        <DemoBadge />
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
        {camada.rotulo}
      </h1>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.t} className="rounded-xl border border-border bg-card p-4">
            <dt className="font-ui text-xs font-semibold uppercase tracking-wide text-primary">
              {c.t}
            </dt>
            <dd className="mt-1.5 font-body text-sm leading-relaxed text-foreground/80">
              {c.d}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

// Bloco "em breve" usado enquanto a fatia de uma tela não foi construída.
export function EmBreve({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-lg border border-dashed border-border bg-card p-8 text-center">
      <p className="font-body text-muted-foreground">{children}</p>
    </div>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: erros APENAS nas 3 páginas (Descobrir/Decidir/Comprar) que ainda chamam `CamadaHeader` com a API antiga (`camada`/`titulo`/`descricao` strings). Resolvidos nas Tasks 7–9.

- [ ] **Step 3: Commit**

```bash
git add src/components/camada-header.tsx
git commit -m "feat(camada-header): cabecalho didatico (passo + o-que-e/por-que/o-que-fazer)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: Página Descobrir — cabeçalho didático + próximo passo

**Files:**
- Modify: `src/app/app/descobrir/page.tsx`

- [ ] **Step 1: Trocar imports e o uso de `CamadaHeader` + adicionar `ProximoPasso`**

Substituir as linhas de import do topo (`AvisoPerfil`, `CamadaHeader`, etc.) acrescentando `CAMADAS`, `ProximoPasso`:

```tsx
import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { ProximoPasso } from "@/components/proximo-passo";
import { SinalCard } from "@/components/sinal-card";
import { useLoja } from "@/lib/loja/store";
import { CAMADAS } from "@/lib/navigation";
import { listarSinais } from "@/lib/sinais/fonte";
import { FONTES, type FonteSinal } from "@/lib/sinais/tipos";
```

Dentro de `DescobrirPage`, logo após `const sinais = listarSinais();`, adicionar:

```tsx
  const camada = CAMADAS.find((c) => c.passo === 1)!;
```

Trocar o bloco `<CamadaHeader camada="Sinal" titulo="Descobrir" descricao="..." />` por:

```tsx
      <CamadaHeader camada={camada} />
```

- [ ] **Step 2: Adicionar `ProximoPasso` no fim do return**

Imediatamente antes do `</div>` final do componente `DescobrirPage` (depois do bloco do feed), inserir:

```tsx
      <ProximoPasso passoAtual={1} />
```

- [ ] **Step 3: Verificar tipos + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: sem erros em `descobrir/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/app/app/descobrir/page.tsx
git commit -m "feat(descobrir): cabecalho didatico + proximo passo

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: Página Decidir — cabeçalho didático, próximo passo e rótulo do score honesto

**Files:**
- Modify: `src/app/app/decidir/page.tsx`
- Modify: `src/components/peca-decisao-card.tsx`

- [ ] **Step 1: Atualizar `decidir/page.tsx` (imports + cabeçalho + próximo passo)**

Ajustar imports adicionando `CAMADAS` e `ProximoPasso`:

```tsx
import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { PecaDecisaoCard } from "@/components/peca-decisao-card";
import { ProximoPasso } from "@/components/proximo-passo";
import { calcularScore } from "@/lib/engine";
import { useLoja } from "@/lib/loja/store";
import { CAMADAS } from "@/lib/navigation";
import { listarPecas } from "@/lib/pecas/fonte";
```

Dentro de `CorrigirPage` (o nome da função pode permanecer; é só o componente default), após `const pecas = listarPecas();` adicionar:

```tsx
  const camada = CAMADAS.find((c) => c.passo === 2)!;
```

Trocar o `<CamadaHeader camada="Decisão" titulo="Corrigir" descricao="..." />` por:

```tsx
      <CamadaHeader camada={camada} />
```

E antes do `</div>` final, após o grid de cards, inserir:

```tsx
      <ProximoPasso passoAtual={2} />
```

- [ ] **Step 2: Tornar o rótulo do score honesto em `peca-decisao-card.tsx`**

O rótulo atual "chance de performar" soa a previsão. Trocar a linha 100–102 do arquivo:

```tsx
          <p className="mt-1 font-ui text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            chance de performar
          </p>
```

por:

```tsx
          <p className="mt-1 font-ui text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            score do sinal
          </p>
```

- [ ] **Step 3: Verificar tipos + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: sem erros em `decidir/page.tsx` nem `peca-decisao-card.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/app/app/decidir/page.tsx src/components/peca-decisao-card.tsx
git commit -m "feat(decidir): cabecalho didatico + proximo passo; score 'do sinal' (sem promessa)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 9: Página Comprar — cabeçalho didático + fim da jornada

**Files:**
- Modify: `src/app/app/comprar/page.tsx`

- [ ] **Step 1: Atualizar imports adicionando `CAMADAS` e `ProximoPasso`**

```tsx
import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { CompraColetivaCard } from "@/components/compra-coletiva-card";
import { PreVendaCard } from "@/components/pre-venda-card";
import { ProximoPasso } from "@/components/proximo-passo";
import { quantidadeRecomendada } from "@/lib/engine";
import {
  listarComprasColetivas,
  listarPreVendas,
} from "@/lib/execucao/fonte";
import { useExecucao } from "@/lib/execucao/store";
import { useLoja } from "@/lib/loja/store";
import { CAMADAS } from "@/lib/navigation";
import { listarPecas } from "@/lib/pecas/fonte";
```

- [ ] **Step 2: Usar o cabeçalho didático**

Dentro de `BlindarPage`, após `const pecas = listarPecas();` adicionar:

```tsx
  const camada = CAMADAS.find((c) => c.passo === 3)!;
```

Trocar o `<CamadaHeader camada="Execução" titulo="Blindar" descricao="..." />` por:

```tsx
      <CamadaHeader camada={camada} />
```

- [ ] **Step 3: Adicionar `ProximoPasso` (fim da jornada) antes do `</div>` final**

```tsx
      <ProximoPasso passoAtual={3} />
```

- [ ] **Step 4: Verificar tipos + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: sem erros em `comprar/page.tsx`.

- [ ] **Step 5: Commit**

```bash
git add src/app/app/comprar/page.tsx
git commit -m "feat(comprar): cabecalho didatico + fim da jornada (volta ao Inicio)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 10: `AvisoPerfil` — linguagem da trilha

**Files:**
- Modify: `src/components/aviso-perfil.tsx`

- [ ] **Step 1: Atualizar a cópia (linhas 17–20 do arquivo)**

Trocar:

```tsx
      <p className="flex-1 font-body text-sm text-foreground">
        Complete o <strong className="font-semibold">perfil da sua loja</strong>{" "}
        para o TREND ajustar quantidade e aderência ao seu público.
      </p>
```

por:

```tsx
      <p className="flex-1 font-body text-sm text-foreground">
        <strong className="font-semibold">Passo 0:</strong> complete o perfil da
        sua loja para a trilha ajustar quantidade e aderência ao seu público.
      </p>
```

- [ ] **Step 2: Verificar tipos + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/aviso-perfil.tsx
git commit -m "feat(aviso-perfil): fala a lingua da trilha (passo 0)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 11: Landing — nomes diretos + links de rota corrigidos

**Files:**
- Modify: `src/app/(marketing)/page.tsx`

- [ ] **Step 1: Reescrever o array `PASSOS` (linhas 27–55) com os nomes diretos**

```tsx
const PASSOS = [
  {
    n: "01",
    passo: "Passo 1",
    rotulo: "Descobrir tendências",
    titulo: "Veja o que está em formação",
    texto:
      "Reunimos o sinal do público da sua loja, das redes e dos fornecedores bem pontuados num só lugar. Cada peça vem com força e contexto — para você ver a tendência nascendo, não depois que todo mundo já comprou.",
    selo: "sinal detectado · nunca previsão",
  },
  {
    n: "02",
    passo: "Passo 2",
    rotulo: "Decidir o que comprar",
    titulo: "Saiba o quê e quanto comprar",
    texto:
      "Um score explicável de 0 a 100 com os 3 motivos por trás, e a quantidade recomendada para o tamanho do seu público e do seu caixa. Cálculo determinístico: mesma entrada, mesmo resultado, sem caixa-preta.",
    selo: "score + quantidade recomendada",
  },
  {
    n: "03",
    passo: "Passo 3",
    rotulo: "Comprar com método",
    titulo: "Compre reduzindo a exposição do caixa",
    texto:
      "O diferencial. Valide a demanda com pré-venda antes de pagar o lote e junte pedido com outras lojas para furar o lote mínimo. O capital só sai quando o risco já caiu.",
    selo: "pré-venda + compra coletiva",
  },
];
```

- [ ] **Step 2: Atualizar o cabeçalho de cada card de passo**

No `.map((p, i) => {...})` da seção "Como funciona", localizar o parágrafo que renderiza `{p.rotulo} · {p.camada}` (atualmente):

```tsx
                <p
                  className={[
                    "mt-6 font-ui text-xs font-semibold uppercase tracking-[0.2em]",
                    heroi ? "text-accent" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {p.rotulo} · {p.camada}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {p.titulo}
                </h3>
```

e trocar por (usa `p.passo` + `p.rotulo`, e move o nome direto para o `<h3>`):

```tsx
                <p
                  className={[
                    "mt-6 font-ui text-xs font-semibold uppercase tracking-[0.2em]",
                    heroi ? "text-accent" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {p.passo}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {p.rotulo}
                </h3>
                <p
                  className={[
                    "mt-1 font-ui text-sm font-semibold",
                    heroi ? "text-creme/90" : "text-foreground/70",
                  ].join(" ")}
                >
                  {p.titulo}
                </p>
```

- [ ] **Step 3: Corrigir o link da seção "Por dentro do score"**

Localizar `href="/app/corrigir"` (no link "Ver a tela de decisão") e trocar por `href="/app/decidir"`.

- [ ] **Step 4: Conferir os demais links e a regra de linguagem**

Run: `grep -n "/app/corrigir\|/app/blindar\|/app/dashboard" src/app/\(marketing\)/page.tsx`
Expected: nenhum resultado (todos já apontam para `/app/descobrir`, `/app/decidir`, `/app/comprar` ou `/app`). Se aparecer algum, corrigir para a rota nova equivalente.

- [ ] **Step 5: Verificar tipos + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: sem erros em `(marketing)/page.tsx`.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(marketing)/page.tsx"
git commit -m "feat(landing): nomes diretos na secao 'como funciona' + links de rota novos

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 12: Validação final (tipos, lint, testes do motor) + varredura de rotas órfãs

**Files:** nenhum (verificação)

- [ ] **Step 1: Varredura por rotas antigas em todo o `src`**

Run: `grep -rn "/app/corrigir\|/app/blindar\|/app/dashboard" src` 
Expected: nenhum resultado. Se algo aparecer, corrigir para a rota nova e re-commitar.

- [ ] **Step 2: Tipos**

Run: `npx tsc --noEmit`
Expected: sem nenhum erro.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: sem erros.

- [ ] **Step 4: Testes do motor (não devem ter mudado)**

Run: `npm test`
Expected: todos os testes do Vitest passando (PASS).

- [ ] **Step 5: Conferência visual no `localhost`**

Com `next dev` rodando, abrir e conferir:
- `/` — seção "Como funciona" com os nomes diretos e passos 1·2·3; botões levam às rotas novas.
- `/app` — tela Início com perfil (passo 0), as 3 etapas e o CTA "Começar pelo passo 1".
- `/app/descobrir`, `/app/decidir`, `/app/comprar` — stepper no topo marcando o passo certo, cabeçalho didático (o que é · por que · o que fazer) e o bloco "Próximo passo" no fim. O passo 3 mostra "Voltar ao Início".

- [ ] **Step 6: Commit (se a varredura do Step 1 exigiu correções)**

```bash
git add -A
git commit -m "fix: corrige rotas orfas remanescentes da revisao didatica

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review (cobertura do spec)

- **Nomes diretos + legenda** → Tasks 1, 4, 6, 7–9, 11. ✓
- **Rotas renomeadas** (`decidir`/`comprar`, painel na raiz) → Tasks 2, 3; varredura na 12. ✓
- **Trilha guiada (stepper + próximo passo + Início ponto de partida)** → Tasks 3, 4, 5, 7–9. ✓
- **Cabeçalho didático (o que é · por que · o que fazer)** → Tasks 1 (textos), 6 (componente). ✓
- **Perfil = passo 0** → Tasks 3 (Início), 10 (AvisoPerfil). ✓
- **Regra de linguagem (sem previsão/garantia)** → Tasks 1, 3, 8 (score), 11; varredura visual na 12. ✓
- **Landing alinhada** → Task 11. ✓
- **Estética / motor / dados-semente intactos** → nenhuma task os altera; testes do motor conferidos na Task 12. ✓
- **Validação sem `next build`** → Tasks usam `tsc` + `lint` + `vitest`. ✓

"use client";

import Link from "next/link";

import { FiltroChip } from "@/components/filtro-chip";
import { NICHOS, type Loja, type Nicho } from "@/lib/loja/tipos";

// Valor do filtro: um nicho específico ou "todos".
export type FiltroNichoValor = Nicho | "todos";

// Linha de filtro por nicho da loja, usada nas áreas de escolha (sinais e scores).
// Mostra um atalho "Minha loja: <nicho>" quando o perfil está preenchido, depois
// "Todos" e cada nicho do catálogo. Os nichos vêm do seed (NICHOS), não inventados.
export function FiltroNicho({
  valor,
  onChange,
  loja,
  className,
}: {
  valor: FiltroNichoValor;
  onChange: (v: FiltroNichoValor) => void;
  loja?: Loja | null;
  className?: string;
}) {
  const rotuloLoja = loja
    ? NICHOS.find((n) => n.valor === loja.nicho)?.rotulo
    : undefined;

  return (
    <div className={["flex flex-wrap items-center gap-2", className ?? ""].join(" ")}>
      <span className="ops-mono mr-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        Nicho da loja
      </span>

      {/* "Seu nicho" aparece sempre: com perfil filtra pelo nicho da loja salva;
         sem perfil, leva ao onboarding para a lojista definir o nicho dela. */}
      {loja && rotuloLoja ? (
        <FiltroChip
          ativo={valor === loja.nicho}
          onClick={() => onChange(loja.nicho)}
          className="font-semibold"
        >
          Seu nicho · {rotuloLoja}
        </FiltroChip>
      ) : (
        <Link
          href="/app/onboarding"
          title="Defina o nicho da sua loja"
          className="rounded-full border border-dashed border-border bg-card px-3.5 py-1.5 font-ui text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
        >
          Seu nicho
        </Link>
      )}

      <FiltroChip ativo={valor === "todos"} onClick={() => onChange("todos")}>
        Todos
      </FiltroChip>

      {NICHOS.map((n) => (
        <FiltroChip
          key={n.valor}
          ativo={valor === n.valor}
          onClick={() => onChange(n.valor)}
        >
          {n.rotulo}
        </FiltroChip>
      ))}
    </div>
  );
}

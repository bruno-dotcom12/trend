import Image from "next/image";
import { Sparkles } from "lucide-react";

import { calcularScore, quantidadeRecomendada } from "@/lib/engine";
import { montarEntradaScore } from "@/lib/pecas/score";
import type { PecaCandidata } from "@/lib/pecas/tipos";
import type { Loja } from "@/lib/loja/tipos";
import { cn } from "@/lib/utils";

const real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function faixaScore(score: number): "forte" | "moderado" | "fraco" {
  if (score >= 70) return "forte";
  if (score >= 45) return "moderado";
  return "fraco";
}

const CLASSE_SCORE: Record<ReturnType<typeof faixaScore>, string> = {
  forte: "bg-primary text-primary-foreground",
  moderado: "bg-accent text-accent-foreground",
  fraco: "bg-muted text-muted-foreground",
};

export function PecaDecisaoCard({
  peca,
  loja,
  aderente = false,
}: {
  peca: PecaCandidata;
  loja: Loja | null;
  aderente?: boolean;
}) {
  const entrada = montarEntradaScore(peca, loja);
  const { score, motivos, personalizado } = calcularScore(entrada);
  const faixa = faixaScore(score);

  // Quantidade e custo só fazem sentido com o perfil da loja.
  const ctx = loja
    ? {
        ticketMedio: loja.ticketMedio,
        capitalDisponivel: loja.capitalDisponivel,
        loteMinimo: peca.loteMinimo,
      }
    : null;
  const quantidade = ctx ? quantidadeRecomendada(entrada, ctx) : null;
  const custoTotal = quantidade ? quantidade * peca.precoAtacado : 0;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-card",
        aderente ? "border-primary/60" : "border-border",
      )}
    >
      {/* Foto real da peça */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={`/pecas/${peca.id}.jpg`}
          alt={peca.titulo}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {peca.categoria}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-foreground">
            {peca.titulo}
          </h3>
          {aderente && (
            <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-ui text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              aderente ao seu público
            </span>
          )}
        </div>

        {/* Score */}
        <div className="shrink-0 text-center">
          <div
            className={cn(
              "flex size-16 flex-col items-center justify-center rounded-full font-display",
              CLASSE_SCORE[faixa],
            )}
          >
            <span className="text-2xl font-bold leading-none">{score}</span>
            <span className="text-[10px] font-medium opacity-80">/100</span>
          </div>
          <p className="mt-1 font-ui text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {personalizado ? "score pra você" : "score de mercado"}
          </p>
        </div>
      </div>

      {/* Os 3 motivos */}
      <ul className="mt-5 space-y-2">
        {motivos.map((m) => (
          <li key={m.fator} className="flex gap-2 font-body text-sm text-foreground/85">
            <span
              className="mt-1 size-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden
            />
            {m.texto}
          </li>
        ))}
      </ul>

      {/* Quantidade + custo */}
      <div className="mt-5 border-t border-border pt-4">
        {quantidade === null ? (
          <p className="font-body text-sm text-muted-foreground">
            Complete o perfil da loja para ver a quantidade recomendada.
          </p>
        ) : quantidade === 0 ? (
          <p className="font-body text-sm text-muted-foreground">
            Capital insuficiente para o lote mínimo desta peça (
            {peca.loteMinimo} un.).
          </p>
        ) : (
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-ui text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Quantidade recomendada
              </p>
              <p className="font-display text-2xl font-bold text-foreground">
                {quantidade}
                <span className="ml-1 font-ui text-sm font-normal text-muted-foreground">
                  un. · lote {peca.loteMinimo}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="font-ui text-xs text-muted-foreground">
                compromete
              </p>
              <p className="font-ui text-sm font-semibold text-foreground">
                {real.format(custoTotal)}
              </p>
              {loja && (
                <p className="font-ui text-[11px] text-muted-foreground">
                  de {real.format(loja.capitalDisponivel)}
                </p>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </article>
  );
}

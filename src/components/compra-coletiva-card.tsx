"use client";

import { Check, Store } from "lucide-react";

import { BarraProgresso } from "@/components/barra-progresso";
import { Button } from "@/components/ui/button";
import { definirAdesao } from "@/lib/execucao/store";
import type { CompraColetiva } from "@/lib/execucao/tipos";

const real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

// Compra coletiva: junta pedidos de várias lojas até furar o lote mínimo.
// "Entrar na compra" adiciona minha loja com a quantidade sugerida pelo motor.
export function CompraColetivaCard({
  compra,
  minhasUnidades,
  sugestao,
  nomeMinhaLoja,
}: {
  compra: CompraColetiva;
  minhasUnidades: number;
  sugestao: number;
  nomeMinhaLoja: string;
}) {
  const unidades = compra.unidadesBase + minhasUnidades;
  const loteFurado = unidades >= compra.loteMinimo;
  const faltam = Math.max(0, compra.loteMinimo - unidades);
  const participando = minhasUnidades > 0;

  const lojas = participando
    ? [...compra.lojasBase, nomeMinhaLoja]
    : compra.lojasBase;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {compra.categoria}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-foreground">
            {compra.titulo}
          </h3>
          <p className="mt-1 font-ui text-sm text-muted-foreground">
            {real.format(compra.precoUnitario)}/un. no atacado
          </p>
        </div>
        {loteFurado && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-ui text-xs font-semibold text-primary">
            <Check className="size-3.5" aria-hidden />
            lote furado
          </span>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between font-ui text-sm">
          <span className="text-muted-foreground">
            {unidades} de {compra.loteMinimo} un. no lote
          </span>
          <span className="text-muted-foreground">{compra.prazo}</span>
        </div>
        <div className="mt-2">
          <BarraProgresso
            valor={unidades}
            total={compra.loteMinimo}
            completa={loteFurado}
          />
        </div>
        <p className="mt-1.5 font-ui text-xs text-muted-foreground">
          {loteFurado
            ? "Lote mínimo atingido — pedido liberado."
            : `Faltam ${faltam} un. para furar o lote mínimo.`}
        </p>
      </div>

      {/* Lojas participantes */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <Store className="size-4 text-muted-foreground" aria-hidden />
        {lojas.map((loja, i) => (
          <span
            key={`${loja}-${i}`}
            className="rounded-full border border-border bg-background px-2 py-0.5 font-ui text-xs text-secondary"
          >
            {loja}
          </span>
        ))}
      </div>

      <div className="mt-5">
        {participando ? (
          <div className="flex items-center justify-between gap-3">
            <p className="font-ui text-sm text-foreground">
              Participando com{" "}
              <strong className="font-semibold">{minhasUnidades} un.</strong> ·{" "}
              {real.format(minhasUnidades * compra.precoUnitario)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => definirAdesao(compra.id, 0)}
            >
              Sair
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => definirAdesao(compra.id, sugestao)}
            className="w-full"
            size="lg"
          >
            Entrar com {sugestao} un.
          </Button>
        )}
      </div>
    </article>
  );
}

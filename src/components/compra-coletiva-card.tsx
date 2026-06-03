"use client";

import { useState } from "react";
import { Check, Minus, Plus, Store } from "lucide-react";

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
// A lojista escolhe quantas unidades quer entrar; a sugestão do motor é só dica.
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

  // Quantidade editável. Começa na minha adesão (se já participo) ou na sugestão
  // do perfil; enquanto a lojista não digitar, acompanha o valor-base — que pode
  // chegar depois (a sugestão depende do perfil carregado). Sincronizamos em
  // tempo de render (padrão React), sem efeito.
  const base = participando ? minhasUnidades : sugestao;
  const [qtd, setQtd] = useState(base);
  const [tocado, setTocado] = useState(false);
  const [baseAnterior, setBaseAnterior] = useState(base);
  if (!tocado && base !== baseAnterior) {
    setBaseAnterior(base);
    setQtd(base);
  }

  function ajustar(delta: number) {
    setTocado(true);
    setQtd((q) => Math.max(1, q + delta));
  }

  const semMudanca = participando && qtd === minhasUnidades;

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
        <div className="flex items-center justify-between gap-3">
          <span className="font-ui text-sm font-medium text-foreground">
            Quantas unidades você quer?
          </span>
          <span className="font-ui text-sm font-semibold text-foreground">
            {real.format(qtd * compra.precoUnitario)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-3">
          {/* Seletor de quantidade — a lojista define o número */}
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => ajustar(-1)}
              disabled={qtd <= 1}
              aria-label="Diminuir uma unidade"
              className="flex size-9 items-center justify-center rounded-l-full text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <Minus className="size-4" aria-hidden />
            </button>
            <input
              type="number"
              min={1}
              value={qtd}
              onChange={(e) => {
                setTocado(true);
                const n = Math.floor(Number(e.target.value));
                setQtd(Number.isFinite(n) && n > 0 ? n : 1);
              }}
              aria-label="Quantidade de unidades"
              className="w-14 border-x border-border bg-transparent py-1.5 text-center font-ui text-sm font-semibold text-foreground [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => ajustar(1)}
              aria-label="Aumentar uma unidade"
              className="flex size-9 items-center justify-center rounded-r-full text-foreground transition-colors hover:bg-muted"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
          <span className="font-ui text-xs text-muted-foreground">
            sugestão do seu perfil: {sugestao} un.
          </span>
        </div>

        <Button
          onClick={() => definirAdesao(compra.id, qtd)}
          disabled={qtd < 1 || semMudanca}
          className="mt-3 w-full"
          size="lg"
        >
          {participando ? `Atualizar para ${qtd} un.` : `Entrar com ${qtd} un.`}
        </Button>

        {participando && (
          <button
            type="button"
            onClick={() => definirAdesao(compra.id, 0)}
            className="mt-2 w-full font-ui text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
          >
            Sair da coletiva
          </button>
        )}
      </div>
    </article>
  );
}

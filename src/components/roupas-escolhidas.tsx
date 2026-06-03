"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";

import { calcularScore } from "@/lib/engine";
import {
  listarComprasColetivas,
  listarPreVendas,
} from "@/lib/execucao/fonte";
import { useLoja } from "@/lib/loja/store";
import { listarPecas } from "@/lib/pecas/fonte";
import { montarEntradaScore } from "@/lib/pecas/score";
import { useSelecao } from "@/lib/selecao/store";

// Fecha o fio das 3 camadas: as peças que a lojista escolheu em Descobrir/Decidir
// aparecem aqui, ligadas ao método de compra disponível (pré-venda ou coletiva).
export function RoupasEscolhidas() {
  const { selecionados, carregada, alternarSelecao } = useSelecao();
  const { loja } = useLoja();

  const pecas = listarPecas();
  const preVendas = listarPreVendas();
  const compras = listarComprasColetivas();

  const escolhidas = selecionados
    .map((id) => pecas.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((peca) => ({
      peca,
      score: calcularScore(montarEntradaScore(peca, loja)).score,
      temPreVenda: preVendas.some((pv) => pv.pecaId === peca.id),
      temColetiva: compras.some((cc) => cc.pecaId === peca.id),
    }));

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
          <ShoppingBag className="size-5 text-primary" aria-hidden />
          Suas roupas escolhidas
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          As peças que você selecionou — agora é só escolher o método de compra.
        </p>
      </div>

      {!carregada ? null : escolhidas.length === 0 ? (
        <p className="mt-5 rounded-lg border border-dashed border-border bg-card p-8 text-center font-body text-muted-foreground">
          Você ainda não escolheu roupas. Volte ao{" "}
          <Link
            href="/app/decidir"
            className="font-semibold text-primary hover:underline"
          >
            passo Decidir
          </Link>{" "}
          e selecione as peças que quer comprar — elas aparecem aqui prontas para
          a pré-venda ou a compra coletiva.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {escolhidas.map(({ peca, score, temPreVenda, temColetiva }) => {
            const destino = temPreVenda
              ? { href: "#pre-venda", rotulo: "Abrir na pré-venda" }
              : temColetiva
                ? { href: "#compra-coletiva", rotulo: "Entrar na coletiva" }
                : null;

            return (
              <article
                key={peca.id}
                className="flex gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={`/pecas/${peca.id}.jpg`}
                    alt={peca.titulo}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-ui text-sm font-semibold text-foreground">
                        {peca.titulo}
                      </p>
                      <p className="font-ui text-xs text-muted-foreground">
                        score {score} · {peca.categoria}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alternarSelecao(peca.id)}
                      aria-label={`Remover ${peca.titulo} da seleção`}
                      className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </div>

                  {destino ? (
                    <Link
                      href={destino.href}
                      className="mt-auto inline-flex w-fit items-center gap-1 font-ui text-sm font-semibold text-primary hover:underline"
                    >
                      {destino.rotulo}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : (
                    <p className="mt-auto font-ui text-xs text-muted-foreground">
                      Sem pré-venda ou coletiva aberta ainda.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

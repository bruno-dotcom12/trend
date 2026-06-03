"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { useSelecao } from "@/lib/selecao/store";

// Faixa didática que torna a "Minha seleção" visível e explica o fio condutor
// das 3 camadas: o que você marca aqui segue com você até a compra.
const MENSAGEM: Record<1 | 2, string> = {
  1: "Acompanhe as tendências que te interessam — elas entram na sua seleção e seguem até a compra.",
  2: "Selecione as peças que pretende comprar — o score te ajuda a escolher; depois é só executar.",
};

export function FioSelecao({ passo }: { passo: 1 | 2 }) {
  const { selecionados, carregada } = useSelecao();
  const n = selecionados.length;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-accent/50 bg-accent/10 p-4">
      <ShoppingBag className="size-5 shrink-0 text-primary" aria-hidden />
      <p className="flex-1 font-body text-sm text-foreground/90">
        {MENSAGEM[passo]}
      </p>
      {carregada && n > 0 && (
        <Link
          href="/app/comprar"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 font-ui text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {n} {n === 1 ? "peça selecionada" : "peças selecionadas"}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

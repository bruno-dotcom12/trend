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

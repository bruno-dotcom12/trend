import { DemoBadge } from "@/components/demo-badge";
import type { Camada } from "@/lib/navigation";

// Cabeçalho padrão de cada tela do produto.
// Recebe a camada inteira (fonte única) e mostra: legenda + nome direto
// + um mini-explicador didático (o que é · por que importa · o que fazer aqui).
// Sem numeração de passo — cada área é independente.
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
          {camada.legenda}
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

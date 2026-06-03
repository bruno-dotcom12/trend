import { DemoBadge } from "@/components/demo-badge";

// Cabeçalho padrão de cada camada do produto (Descobrir / Corrigir / Blindar).
export function CamadaHeader({
  camada,
  titulo,
  descricao,
}: {
  camada: string;
  titulo: string;
  descricao: string;
}) {
  return (
    <header className="border-b border-border pb-6">
      <div className="flex items-center gap-3">
        <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {camada}
        </span>
        <DemoBadge />
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
        {titulo}
      </h1>
      <p className="mt-2 max-w-2xl font-body text-lg text-muted-foreground">
        {descricao}
      </p>
    </header>
  );
}

// Bloco "em breve" usado enquanto a fatia da camada não foi construída.
export function EmBreve({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-lg border border-dashed border-border bg-card p-8 text-center">
      <p className="font-body text-muted-foreground">{children}</p>
    </div>
  );
}

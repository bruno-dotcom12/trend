import { cn } from "@/lib/utils";

// Barra de progresso até uma meta (reservas da pré-venda ou lote da coletiva).
export function BarraProgresso({
  valor,
  total,
  completa = false,
}: {
  valor: number;
  total: number;
  completa?: boolean;
}) {
  const pct = total > 0 ? Math.min(100, (valor / total) * 100) : 0;
  return (
    <div
      className="h-2.5 overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={valor}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500",
          completa ? "bg-primary" : "bg-accent",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

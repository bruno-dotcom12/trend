"use client";

import type { ReactNode } from "react";

// Chip de filtro reutilizável (Descobrir e Decidir): pílula que alterna ativo/inativo.
export function FiltroChip({
  ativo,
  onClick,
  className,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={[
        "rounded-full border px-3.5 py-1.5 font-ui text-sm font-medium transition-colors",
        ativo
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-accent",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

import { FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";

// Badge exigido pelo guia do projeto: marca tudo que ainda é simulado (não-real) na UI.
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/60 bg-accent/15 px-2.5 py-1 font-ui text-xs font-medium text-secondary",
        className,
      )}
    >
      <FlaskConical className="size-3.5" aria-hidden />
      dados de demonstração
    </span>
  );
}

"use client";

import { Check, Plus } from "lucide-react";

import { useSelecao } from "@/lib/selecao/store";
import { cn } from "@/lib/utils";

// Toggle "Minha seleção" reusado em Descobrir (sinal) e Decidir (peça).
// Trabalha sempre por id de peça — o fio que liga as 3 camadas.
export function BotaoSelecao({
  pecaId,
  rotuloAdd = "Adicionar à minha seleção",
  className,
}: {
  pecaId: string;
  rotuloAdd?: string;
  className?: string;
}) {
  const { selecionados, alternarSelecao } = useSelecao();
  const selecionada = selecionados.includes(pecaId);

  return (
    <button
      type="button"
      onClick={() => alternarSelecao(pecaId)}
      aria-pressed={selecionada}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border px-3.5 py-1.5 font-ui text-sm font-semibold transition-colors",
        selecionada
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-foreground hover:border-primary",
        className,
      )}
    >
      {selecionada ? (
        <>
          <Check className="size-4" aria-hidden />
          Na sua seleção
        </>
      ) : (
        <>
          <Plus className="size-4" aria-hidden />
          {rotuloAdd}
        </>
      )}
    </button>
  );
}

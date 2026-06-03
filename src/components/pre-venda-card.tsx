"use client";

import { Check, Users } from "lucide-react";

import { BarraProgresso } from "@/components/barra-progresso";
import { Button } from "@/components/ui/button";
import { alternarInteresse } from "@/lib/execucao/store";
import type { PreVenda } from "@/lib/execucao/tipos";

// Pré-venda: valida a demanda antes de pagar o lote. "Registrar interesse"
// soma a minha reserva (mock) e move a barra rumo à meta.
export function PreVendaCard({
  preVenda,
  participo,
}: {
  preVenda: PreVenda;
  participo: boolean;
}) {
  const interessados = preVenda.interessadosBase + (participo ? 1 : 0);
  const validada = interessados >= preVenda.meta;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {preVenda.categoria}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-foreground">
            {preVenda.titulo}
          </h3>
        </div>
        {validada && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-ui text-xs font-semibold text-primary">
            <Check className="size-3.5" aria-hidden />
            demanda validada
          </span>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between font-ui text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="size-4" aria-hidden />
            {interessados} de {preVenda.meta} reservas
          </span>
          <span className="text-muted-foreground">{preVenda.prazo}</span>
        </div>
        <div className="mt-2">
          <BarraProgresso
            valor={interessados}
            total={preVenda.meta}
            completa={validada}
          />
        </div>
      </div>

      <div className="mt-5">
        <Button
          variant={participo ? "outline" : "default"}
          onClick={() => alternarInteresse(preVenda.id)}
          className="w-full"
          size="lg"
        >
          {participo ? (
            <>
              <Check className="size-4" aria-hidden />
              Interesse registrado
            </>
          ) : (
            "Registrar interesse"
          )}
        </Button>
      </div>
    </article>
  );
}

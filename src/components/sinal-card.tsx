import { Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DIRECOES,
  FONTES,
  faixaForca,
  type DirecaoSinal,
  type Sinal,
} from "@/lib/sinais/tipos";

// Cor da barra de força por faixa (dentro da paleta da marca).
const CLASSE_FORCA: Record<ReturnType<typeof faixaForca>, string> = {
  forte: "bg-primary",
  moderado: "bg-accent",
  fraco: "bg-muted-foreground/50",
};

const ICONE_DIRECAO: Record<DirecaoSinal, typeof TrendingUp> = {
  "em-alta": TrendingUp,
  estavel: Minus,
  esfriando: TrendingDown,
};

const CLASSE_DIRECAO: Record<DirecaoSinal, string> = {
  "em-alta": "text-primary",
  estavel: "text-muted-foreground",
  esfriando: "text-destructive",
};

export function SinalCard({
  sinal,
  aderente = false,
}: {
  sinal: Sinal;
  aderente?: boolean;
}) {
  const faixa = faixaForca(sinal.forca);
  const IconeDirecao = ICONE_DIRECAO[sinal.direcao];

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-card p-6 transition-colors",
        aderente ? "border-primary/60" : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {sinal.categoria}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-foreground">
            {sinal.titulo}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 font-ui text-xs font-medium text-secondary">
          {FONTES[sinal.fonte].rotulo}
        </span>
      </div>

      {aderente && (
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-ui text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" aria-hidden />
          aderente ao seu público
        </span>
      )}

      {/* Barra de força */}
      <div className="mt-4">
        <div className="flex items-center justify-between font-ui text-xs">
          <span className="font-medium text-muted-foreground">
            Força do sinal
          </span>
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <IconeDirecao
              className={cn("size-3.5", CLASSE_DIRECAO[sinal.direcao])}
              aria-hidden
            />
            {sinal.forca}
            <span className="font-normal text-muted-foreground">
              · {DIRECOES[sinal.direcao].rotulo}
            </span>
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full", CLASSE_FORCA[faixa])}
            style={{ width: `${sinal.forca}%` }}
            role="progressbar"
            aria-valuenow={sinal.forca}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Força do sinal: ${sinal.forca} de 100`}
          />
        </div>
      </div>

      <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-foreground/85">
        {sinal.contexto}
      </p>

      <p className="mt-4 border-t border-border pt-3 font-ui text-xs text-muted-foreground">
        {sinal.horizonte}
      </p>
    </article>
  );
}

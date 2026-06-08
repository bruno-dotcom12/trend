import Image from "next/image";
import { Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";

import { BotaoSelecao } from "@/components/botao-selecao";
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
  pecaId,
}: {
  sinal: Sinal;
  aderente?: boolean;
  pecaId?: string; // peça candidata derivada deste sinal (quando existe)
}) {
  const faixa = faixaForca(sinal.forca);
  const IconeDirecao = ICONE_DIRECAO[sinal.direcao];

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-card transition-colors",
        aderente ? "border-primary/60" : "border-border",
      )}
    >
      {/* Foto real da peça */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={`/pecas/${sinal.id}.jpg`}
          alt={sinal.titulo}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-secondary/80 px-2.5 py-1 font-ui text-xs font-medium text-creme backdrop-blur-sm">
          {FONTES[sinal.fonte].rotulo}
        </span>
        {aderente && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-2.5 py-1 font-ui text-xs font-semibold text-primary-foreground backdrop-blur-sm">
            <Sparkles className="size-3.5" aria-hidden />
            aderente
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {sinal.categoria}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-foreground">
          {sinal.titulo}
        </h3>

        {/* Barra de score do sinal */}
        <div className="mt-4">
          <div className="flex items-center justify-between font-ui text-xs">
            <span className="font-medium text-muted-foreground">
              Score do sinal
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
              aria-label={`Score do sinal: ${sinal.forca} de 100`}
            />
          </div>
        </div>

        <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-foreground/85">
          {sinal.contexto}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
          <p className="font-ui text-xs text-muted-foreground">
            {sinal.horizonte}
          </p>
          {pecaId && (
            <BotaoSelecao
              pecaId={pecaId}
              rotuloAdd="Acompanhar tendência"
              className="shrink-0 px-3 py-1 text-xs"
            />
          )}
        </div>
      </div>
    </article>
  );
}

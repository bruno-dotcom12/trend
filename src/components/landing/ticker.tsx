"use client";

/**
 * Faixa "Em alta": duas linhas de marquee em direções opostas (ritmo
 * editorial). A linha pausa no hover/focus para leitura; a peça sob o
 * cursor escala de leve e o score revela sua cor semântica:
 * verde (>75) · âmbar (50–75) · neutro (<50).
 *
 * Acessibilidade: o marquee inteiro é decorativo (aria-hidden) — a cópia
 * de loop duplicaria cada item para leitores de tela. O conteúdo real é
 * exposto uma única vez numa lista sr-only.
 */

export type ItemTicker = {
  id: string;
  titulo: string;
  forca: number;
};

// Cor semântica do score, revelada no hover do item (AA sobre o fundo claro).
function corDoScore(forca: number): string {
  if (forca > 75) return "group-hover/item:text-emerald-700";
  if (forca >= 50) return "group-hover/item:text-amber-700";
  return "group-hover/item:text-muted-foreground";
}

function LinhaTicker({
  itens,
  reversa = false,
}: {
  itens: ItemTicker[];
  reversa?: boolean;
}) {
  // Conteúdo duplicado para o loop contínuo (translateX -50%)
  const loop = [...itens, ...itens];

  return (
    <div
      className={[
        "flex w-max gap-10 whitespace-nowrap hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]",
        reversa ? "trend-marquee-reversa" : "trend-marquee",
      ].join(" ")}
    >
      {loop.map((s, i) => (
        <span
          key={`${s.id}-${i}`}
          className="group/item flex cursor-default items-center gap-2.5 text-sm text-foreground/75 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.06]"
        >
          {s.titulo}
          <span
            className={[
              "ops-mono text-xs font-semibold text-accent transition-colors duration-300",
              corDoScore(s.forca),
            ].join(" ")}
          >
            {String(s.forca).padStart(2, "0")}
          </span>
        </span>
      ))}
    </div>
  );
}

export function Ticker({ itens }: { itens: ItemTicker[] }) {
  // Alterna os sinais entre as duas linhas para variar o conteúdo
  const linhaA = itens.filter((_, i) => i % 2 === 0);
  const linhaB = itens.filter((_, i) => i % 2 === 1);

  return (
    <div className="relative border-y border-border bg-secondary py-3">
      {/* Conteúdo real, uma única vez, para leitores de tela */}
      <ul className="sr-only">
        {itens.map((s) => (
          <li key={s.id}>
            {s.titulo} — força {s.forca} de 100
          </li>
        ))}
      </ul>

      {/* Marquee decorativo */}
      <div className="flex items-center gap-4 overflow-hidden" aria-hidden>
        <span className="z-10 hidden shrink-0 items-center gap-2 self-stretch bg-secondary pl-6 pr-4 sm:flex">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="ops-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Em alta
          </span>
        </span>
        <div className="flex min-w-0 flex-col gap-2.5">
          <LinhaTicker itens={linhaA} />
          <LinhaTicker itens={linhaB} reversa />
        </div>
      </div>
    </div>
  );
}

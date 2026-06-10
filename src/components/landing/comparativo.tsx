"use client";

import { useRef } from "react";
import { Check, X } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { Revelar } from "@/components/revelar";

/**
 * Comparativo "Sem método vs Com TREND": os itens entram alternados (esquerda
 * desliza da esquerda, direita da direita) em stagger; o lado sem método fica
 * dessaturado, o lado TREND tem glow ciano constante; e a linha divisória
 * central se desenha de cima para baixo conforme o scroll.
 */

const SEM_METODO = [
  "Decide pelo feed do fornecedor",
  "Compra o lote mínimo inteiro, sozinha",
  "Capital travado em estoque que não gira",
  "Confiança que cai a cada coleção encalhada",
];

const COM_TREND = [
  "Sinal do público, redes e fornecedores num lugar",
  "Score explicável e quantidade no tamanho do caixa",
  "Pré-venda valida a demanda antes de pagar",
  "Compra coletiva fura o lote mínimo entre lojas",
];

/** Lista cujos itens deslizam do lado indicado, em stagger. */
function ListaDeslizante({
  itens,
  lado,
  icone,
  classeTexto,
}: {
  itens: string[];
  lado: "esquerda" | "direita";
  icone: "x" | "check";
  classeTexto: string;
}) {
  const reduzirMovimento = useReducedMotion();
  const deslocamento = lado === "esquerda" ? -36 : 36;

  return (
    <ul className={["mt-7 space-y-4", classeTexto].join(" ")}>
      {itens.map((t, i) => (
        <motion.li
          key={t}
          className="flex gap-3"
          initial={reduzirMovimento ? false : { opacity: 0, x: deslocamento }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.65,
            delay: 0.15 + i * 0.12,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {icone === "x" ? (
            <X
              className="mt-0.5 size-4 shrink-0 text-muted-foreground/60"
              strokeWidth={2}
              aria-hidden
            />
          ) : (
            <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />
          )}
          {t}
        </motion.li>
      ))}
    </ul>
  );
}

export function Comparativo() {
  const gradeRef = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();

  // A divisória central se desenha enquanto a grade cruza a viewport
  const { scrollYProgress } = useScroll({
    target: gradeRef,
    offset: ["start 85%", "end 70%"],
  });
  const tracado = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <Revelar className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Apostar no escuro, ou comprar com método.
          </h2>
        </Revelar>

        <div ref={gradeRef} className="relative mt-14 grid items-stretch gap-5 md:grid-cols-2 md:gap-10">
          {/* Divisória que se desenha de cima para baixo (só nas duas colunas) */}
          <motion.span
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-border md:block"
            style={reduzirMovimento ? undefined : { scaleY: tracado }}
            aria-hidden
          />

          {/* Sem método: enfraquecido — dessaturado e levemente apagado */}
          <Revelar className="rounded-2xl border border-border bg-background p-8 opacity-90 grayscale-[0.45] sm:p-10">
            <p className="ops-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Sem método
            </p>
            <ListaDeslizante
              itens={SEM_METODO}
              lado="esquerda"
              icone="x"
              classeTexto="text-muted-foreground"
            />
          </Revelar>

          {/* Com o TREND: dominante — glow ciano constante + salto no hover */}
          <Revelar delay={0.1} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-[0_0_80px_-24px] shadow-accent/30 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/15 sm:p-10">
              <span className="absolute left-0 top-0 h-full w-1 bg-accent" aria-hidden />
              <p className="ops-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Com o TREND
              </p>
              <ListaDeslizante
                itens={COM_TREND}
                lado="direita"
                icone="check"
                classeTexto="text-foreground/85"
              />
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { Revelar } from "@/components/revelar";
import { useMediaQuery } from "./use-media-query";

/**
 * Demo viva do score: o número conta de 0 até a nota com física de mola
 * (overshoot sutil), um anel circular preenche em sincronia e os 3 motivos
 * entram em stagger com mini-barras proporcionais à contribuição REAL que
 * cada fator soma no motor. O card entra inclinado em 3D e endireita
 * conforme o scroll — parece o produto rodando, não um print.
 */

// Motivo já serializado pelo servidor (vem do motor determinístico real)
export type MotivoDemo = {
  fator: string;
  contribuicao: number; // pontos que o fator soma ao score
  texto: string;
};

/** Número que conta com mola + anel circular que preenche junto. */
function NotaAnimada({ score, contar }: { score: number; contar: boolean }) {
  const reduzirMovimento = useReducedMotion();

  const alvo = useMotionValue(0);
  // stiffness/damping baixos = sobe rápido e assenta com leve overshoot
  const mola = useSpring(alvo, { stiffness: 70, damping: 15 });
  const exibido = useTransform(mola, (v) => Math.round(v));
  const anel = useTransform(mola, (v) => v / 100);

  useEffect(() => {
    if (!contar) return;
    if (reduzirMovimento) {
      mola.jump(score); // sem animação: mostra a nota direto
      return;
    }
    alvo.set(score);
  }, [contar, score, alvo, mola, reduzirMovimento]);

  return (
    <div className="relative flex size-[7.5rem] shrink-0 items-center justify-center">
      {/* Anel de progresso: trilha neutra + arco ciano preenchendo até a nota */}
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="var(--border)"
          strokeWidth="5"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ pathLength: anel }}
        />
      </svg>
      <div className="flex items-baseline gap-1">
        <motion.span className="ops-mono text-5xl font-semibold leading-none text-accent">
          {exibido}
        </motion.span>
        <span className="ops-mono text-sm text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

/** Um motivo com mini-barra proporcional à contribuição no score. */
function MotivoItem({
  motivo,
  indice,
  maiorContribuicao,
  mostrar,
}: {
  motivo: MotivoDemo;
  indice: number;
  maiorContribuicao: number;
  mostrar: boolean;
}) {
  const reduzirMovimento = useReducedMotion();
  const largura = Math.max(0.12, motivo.contribuicao / maiorContribuicao);
  const atraso = 0.35 + indice * 0.18;

  return (
    <motion.li
      className="flex items-start gap-3.5"
      initial={reduzirMovimento ? false : { opacity: 0, y: 18 }}
      animate={mostrar ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: atraso, ease: [0.32, 0.72, 0, 1] }}
    >
      <span className="ops-mono mt-0.5 text-sm font-semibold text-accent">
        {String(indice + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="leading-relaxed text-foreground/85">{motivo.texto}</p>
        <div className="mt-2 flex items-center gap-3">
          {/* Trilha da mini-barra; o preenchimento escala da esquerda */}
          <span className="h-1 max-w-56 flex-1 overflow-hidden rounded-full bg-muted">
            <motion.span
              className="block h-full origin-left rounded-full bg-accent"
              style={{ width: `${largura * 100}%` }}
              initial={reduzirMovimento ? false : { scaleX: 0 }}
              animate={mostrar ? { scaleX: 1 } : undefined}
              transition={{
                duration: 0.9,
                delay: atraso + 0.15,
                ease: [0.32, 0.72, 0, 1],
              }}
            />
          </span>
          <span className="ops-mono text-[11px] text-muted-foreground">
            +{Math.round(motivo.contribuicao)} pts
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export function ScoreDemo({
  titulo,
  score,
  motivos,
}: {
  titulo: string;
  score: number;
  motivos: MotivoDemo[];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();
  const temHover = useMediaQuery("(hover: hover)");

  // Dispara contador/barras quando o card entra de fato na viewport
  const emVista = useInView(cardRef, { once: true, amount: 0.35 });

  // O card chega deitado (rotateX) e endireita conforme o scroll se aproxima
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "start 40%"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  // Tilt 3D discreto sob o cursor (só em dispositivos com hover real)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(py, [0, 1], [2.2, -2.2]), {
    stiffness: 150,
    damping: 20,
  });
  const tiltY = useSpring(useTransform(px, [0, 1], [-2.6, 2.6]), {
    stiffness: 150,
    damping: 20,
  });

  const aoMoverCursor = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!temHover || reduzirMovimento) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const aoSairCursor = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const maiorContribuicao = Math.max(...motivos.map((m) => m.contribuicao), 1);

  return (
    <section id="score" className="scroll-mt-20 border-b border-border bg-secondary">
      <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
        <Revelar>
          <p className="ops-mono text-xs uppercase tracking-[0.28em] text-accent">
            Score de compra
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Uma nota que você explica para qualquer um.
          </h2>
        </Revelar>

        {/* perspective no pai dá profundidade real ao rotateX do card */}
        <div style={{ perspective: 1400 }}>
          <motion.div
            ref={cardRef}
            style={reduzirMovimento ? undefined : { rotateX, scale }}
            className="mt-10"
          >
            <motion.div
              style={reduzirMovimento ? undefined : { rotateX: tiltX, rotateY: tiltY }}
              onPointerMove={aoMoverCursor}
              onPointerLeave={aoSairCursor}
              className="rounded-2xl border border-border bg-background p-8 text-left shadow-sm sm:p-12"
            >
              <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-6 sm:flex-row sm:items-center">
                <div>
                  <p className="ops-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {titulo}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    nota para uma loja como a sua
                  </p>
                </div>
                <NotaAnimada score={score} contar={emVista} />
              </div>

              <p className="ops-mono mt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Por que essa nota
              </p>
              <ol className="mt-4 space-y-5">
                {motivos.map((m, i) => (
                  <MotivoItem
                    key={m.fator}
                    motivo={m}
                    indice={i}
                    maiorContribuicao={maiorContribuicao}
                    mostrar={emVista}
                  />
                ))}
              </ol>

              <Link
                href="/app/decidir"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
              >
                Ver a tela de decisão
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

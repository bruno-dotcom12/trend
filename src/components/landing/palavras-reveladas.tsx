"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Curva "massa real" compartilhada pela landing.
const EASE_SUAVE = [0.32, 0.72, 0, 1] as const;

/**
 * Headline com reveal palavra a palavra: cada palavra sobe de dentro de uma
 * máscara (overflow hidden) em stagger, quando o título entra na viewport
 * (no hero, que carrega visível, isso equivale a animar na entrada).
 * O texto integral fica em sr-only; os spans animados são decorativos.
 */
export function PalavrasReveladas({
  texto,
  atraso = 0,
}: {
  texto: string;
  atraso?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduzirMovimento = useReducedMotion();
  const emVista = useInView(ref, { once: true, amount: 0.6 });
  const palavras = texto.split(" ");

  if (reduzirMovimento) return <>{texto}</>;

  return (
    <span ref={ref}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {palavras.map((palavra, i) => (
          <Fragment key={`${palavra}-${i}`}>
            {/* pb/-mb dão folga para descendentes (p, ç, x) dentro da máscara */}
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "115%" }}
                animate={emVista ? { y: "0%" } : undefined}
                transition={{
                  duration: 0.8,
                  delay: atraso + i * 0.055,
                  ease: EASE_SUAVE,
                }}
              >
                {palavra}
              </motion.span>
            </span>
            {/* o espaço precisa ficar FORA da máscara: espaço no fim de um
                inline-block é colapsado e as palavras grudam */}
            {i < palavras.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}

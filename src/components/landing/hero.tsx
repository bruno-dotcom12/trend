"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

// Curva "massa real" compartilhada pela landing.
const EASE_SUAVE = [0.32, 0.72, 0, 1] as const;

/**
 * Headline com reveal palavra a palavra: cada palavra sobe de dentro de uma
 * máscara (overflow hidden) em stagger. O texto integral fica em sr-only para
 * leitores de tela; os spans animados são decorativos.
 */
function PalavrasReveladas({
  texto,
  atraso = 0,
}: {
  texto: string;
  atraso?: number;
}) {
  const reduzirMovimento = useReducedMotion();
  const palavras = texto.split(" ");

  if (reduzirMovimento) return <>{texto}</>;

  return (
    <>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {palavras.map((palavra, i) => (
          // pb/-mb dão folga para descendentes (p, ç, x) dentro da máscara
          <span
            key={`${palavra}-${i}`}
            className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.8,
                delay: atraso + i * 0.055,
                ease: EASE_SUAVE,
              }}
            >
              {palavra}
              {i < palavras.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </>
  );
}

/** Bloco de texto do hero: badge atrasado, headline mascarada, CTAs. */
export function HeroTexto() {
  const reduzirMovimento = useReducedMotion();

  // Entrada padrão dos elementos de apoio (badge, parágrafo, CTAs)
  const surgir = (delay: number) =>
    reduzirMovimento
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE_SUAVE },
        };

  return (
    <div className="flex flex-col justify-center py-10 pl-6 pr-6 lg:w-[44%] lg:py-16 lg:pl-[calc((100vw-80rem)/2+1.5rem)] lg:pr-12">
      <motion.p
        {...surgir(0.7)}
        className="ops-mono text-xs uppercase tracking-[0.28em] text-accent"
      >
        Inteligência de compra · varejo de moda
      </motion.p>

      <h1 className="mt-5 text-4xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[4.25rem]">
        <PalavrasReveladas texto="O sistema operacional da sua próxima compra." atraso={0.15} />
      </h1>

      <motion.p
        {...surgir(0.55)}
        className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Detecção de sinal, score de compra explicável e execução sem travar o
        caixa. Tudo numa só plataforma.
      </motion.p>

      <motion.div
        {...surgir(0.7)}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <Link
          href="/app/descobrir"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Acessar plataforma
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <a
          href="#sistema"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
        >
          Ver o sistema
        </a>
      </motion.div>
    </div>
  );
}

/**
 * Foto editorial do hero: Ken Burns na entrada (zoom-out lento) + parallax
 * sutil na rolagem. Tudo em transform; estática sob reduced-motion.
 */
export function HeroFoto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // A foto "fica para trás" de leve enquanto a página sobe (parallax)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div ref={ref} className="relative px-6 pb-10 lg:flex-1 lg:px-0 lg:pb-0">
      <div className="relative aspect-[4/5] max-h-[72vh] w-full overflow-hidden rounded-2xl bg-muted sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:max-h-none lg:rounded-l-3xl lg:rounded-r-none">
        <motion.div
          className="absolute inset-0"
          style={reduzirMovimento ? undefined : { y }}
        >
          {/* escala final 1.06 dá folga para o parallax não expor borda */}
          <motion.div
            className="absolute inset-0"
            initial={reduzirMovimento ? false : { scale: 1.18, opacity: 0 }}
            animate={{ scale: 1.06, opacity: 1 }}
            transition={{ duration: 1.8, ease: EASE_SUAVE }}
          >
            <Image
              src="/landing/hero-editorial.jpg"
              alt="Editorial de moda em cor: dupla de modelos"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="ops-photo object-cover object-[50%_18%]"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

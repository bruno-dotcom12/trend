"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { BotaoMagnetico } from "./botao-magnetico";
import { PalavrasReveladas } from "./palavras-reveladas";

/**
 * CTA final: fundo com gradiente ciano girando devagar (CSS puro, transform
 * composto — barato), headline com reveal por palavra e botão magnético.
 */
export function CtaFinal() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary">
      {/* Gradiente ambiente: camada maior que a seção girando em loop lento */}
      <div
        className="trend-cta-gradiente pointer-events-none absolute -inset-[45%]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-4xl px-6 py-28 text-center">
        <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          <PalavrasReveladas texto="Sua próxima compra não precisa ser um palpite." />
        </h2>
        <motion.p
          initial={reduzirMovimento ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Detecte o sinal, leia a nota de cada peça e execute sem arriscar o
          caixa. Com dados de demonstração, sem cadastro.
        </motion.p>

        <motion.div
          initial={reduzirMovimento ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="mt-10 flex justify-center"
        >
          <BotaoMagnetico className="inline-flex">
            <Link
              href="/app/descobrir"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-xl hover:shadow-accent/20"
            >
              Acessar plataforma
              <ArrowRight
                className="size-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </BotaoMagnetico>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { BotaoMagnetico } from "./botao-magnetico";
import { PalavrasReveladas } from "./palavras-reveladas";
import { useMediaQuery } from "./use-media-query";

/**
 * CTA final: vídeo ambiente de cetim branco ondulando (Pexels #7946210,
 * licença livre) sob um overlay claro — movimento sentido, não assistido —
 * + headline com reveal por palavra e botão magnético.
 *
 * O vídeo só monta no desktop, perto da viewport e sem reduced-motion;
 * nos demais casos fica o fundo com o gradiente girando (CSS) de antes.
 */
export function CtaFinal() {
  const ref = useRef<HTMLElement>(null);
  const reduzirMovimento = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const perto = useInView(ref, { margin: "400px 0px", once: true });
  // Sem `once`: pausa o gradiente (e o vídeo segue só quando visível)
  const visivel = useInView(ref);

  const comVideo = desktop && !reduzirMovimento && perto;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border bg-secondary"
    >
      {/* Camada 1 — vídeo ambiente (cetim em câmera lenta, mudo, loop) */}
      {comVideo && (
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/landing/cta-tecido-poster.jpg"
          aria-hidden
        >
          <source src="/landing/cta-tecido.webm" type="video/webm" />
          <source src="/landing/cta-tecido.mp4" type="video/mp4" />
        </video>
      )}

      {/* Camada 2 — overlay claro: o movimento vira textura, o texto mantém AA */}
      <div
        className={[
          "absolute inset-0",
          comVideo ? "bg-white/80" : "",
        ].join(" ")}
        aria-hidden
      />

      {/* Camada 3 — gradiente ciano girando devagar (CSS, só transform).
          Pausa quando a seção sai da viewport: rotação infinita em layer
          grande não precisa tickar o compositor a sessão inteira. */}
      <div
        className={[
          "trend-cta-gradiente pointer-events-none absolute -inset-[45%]",
          visivel ? "" : "[animation-play-state:paused]",
        ].join(" ")}
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

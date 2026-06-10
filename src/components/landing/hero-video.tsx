"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Faixa de vídeo do hero (loop mudo de bastidor de loja).
 *
 * Enquanto não existe o asset (mp4/webm), renderiza um placeholder digno:
 * a foto editorial com um pan Ken Burns contínuo e o mesmo enquadramento
 * que o vídeo terá. Quando o arquivo chegar, basta passar `mp4`/`webm`.
 *
 * O <video> só monta quando a faixa se aproxima da viewport (lazy real) e
 * nunca tem áudio: autoplay + muted + playsInline + loop.
 */
export function HeroVideo({
  mp4,
  webm,
  poster,
  fotoPlaceholder = "/landing/hero-model.jpg",
}: {
  mp4?: string;
  webm?: string;
  poster?: string;
  fotoPlaceholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();
  const perto = useInView(ref, { margin: "300px 0px", once: true });

  const temVideo = Boolean(mp4 || webm);

  return (
    <section aria-label="Bastidor da loja" className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 lg:pb-24">
        <div
          ref={ref}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted sm:aspect-[21/9] lg:rounded-3xl"
        >
          {temVideo && perto && !reduzirMovimento ? (
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={poster}
            >
              {webm && <source src={webm} type="video/webm" />}
              {mp4 && <source src={mp4} type="video/mp4" />}
            </video>
          ) : (
            // Placeholder: foto com pan lento contínuo (vira vídeo depois)
            <motion.div
              className="absolute inset-0"
              animate={
                reduzirMovimento
                  ? undefined
                  : { scale: [1.06, 1.16], x: ["0%", "-2%"] }
              }
              transition={{
                duration: 26,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <Image
                src={fotoPlaceholder}
                alt="Bastidor de loja de moda: peças em movimento"
                fill
                quality={90}
                sizes="(max-width: 1280px) 100vw, 1232px"
                className="ops-photo object-cover object-[50%_30%]"
              />
            </motion.div>
          )}

          {/* Legenda técnica sobre o canto, estilo "ops" */}
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
            <span className="ops-mono text-[10px] uppercase tracking-[0.22em] text-foreground">
              Bastidor · loja multimarca
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

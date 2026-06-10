"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Radar, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { Revelar } from "@/components/revelar";
import { useMediaQuery } from "./use-media-query";

/**
 * Seção "Três camadas" em scroll-telling: no desktop a seção fixa (sticky)
 * e as camadas entram conforme o scroll avança, ligadas por um conector SVG
 * que se desenha (pathLength). A Execução — o diferencial — ganha escala e
 * glow ao chegar nela. No mobile e sob reduced-motion não há pin: vira a
 * sequência de reveals simples.
 */

type Camada = {
  icone: LucideIcon;
  titulo: string;
  texto: string;
  rotulo: string;
  destaque: boolean;
  foto: string; // foto editorial pequena de apoio (decorativa)
};

// As três camadas do sistema. A execução é o diferencial, por isso ganha destaque.
// Fotos editoriais: Pexels (licença livre) #7794365, #9594693 e #5424922.
const CAMADAS: Camada[] = [
  {
    icone: Radar,
    titulo: "Detectar o sinal",
    texto:
      "Público da sua loja, redes e fornecedores bem pontuados num só painel. Você vê a tendência se formar antes de o lote virar aposta.",
    rotulo: "sinal",
    destaque: false,
    foto: "/landing/camada-sinal.jpg",
  },
  {
    icone: Scale,
    titulo: "Decidir a compra",
    texto:
      "Cada peça recebe um score de 0 a 100, os 3 motivos por trás dele e a quantidade calculada para o tamanho do seu público e do seu caixa.",
    rotulo: "decisão",
    destaque: false,
    foto: "/landing/camada-decisao.jpg",
  },
  {
    icone: ShieldCheck,
    titulo: "Executar sem risco",
    texto:
      "O diferencial. Pré-venda valida a demanda antes de você pagar o lote, e a compra coletiva fura o lote mínimo junto com outras lojas.",
    rotulo: "execução",
    destaque: true,
    foto: "/landing/camada-execucao.jpg",
  },
];

// Janela de progresso do pin em que cada camada entra (entrada → estável)
const SEGMENTOS: [number, number][] = [
  [0.05, 0.2],
  [0.32, 0.47],
  [0.59, 0.74],
];

/** Ícone com micro-animação própria quando a camada está ativa. */
function IconeCamada({ camada, ativa }: { camada: Camada; ativa: boolean }) {
  const Icone = camada.icone;
  const reduzirMovimento = useReducedMotion();
  const animar = ativa && !reduzirMovimento;

  // Cada camada tem um gesto: radar pulsa, balança pesa, escudo confirma.
  const micro =
    camada.rotulo === "decisão"
      ? { rotate: [0, -6, 4, 0] }
      : camada.rotulo === "execução"
        ? { scale: [1, 1.18, 1] }
        : {};

  return (
    // bg-background tapa o conector SVG que passa por trás dos ícones
    <div
      className={[
        "relative flex size-12 items-center justify-center rounded-xl border bg-background",
        camada.destaque
          ? "border-accent/40 text-accent"
          : "border-border text-muted-foreground",
      ].join(" ")}
    >
      {camada.destaque && (
        <span className="absolute inset-0 rounded-xl bg-accent/10" aria-hidden />
      )}
      {/* Pulso de radar: anel que se expande e some, só na camada de sinal ativa */}
      {camada.rotulo === "sinal" && animar && (
        <motion.span
          className="absolute inset-0 rounded-xl border border-accent/60"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 1.7 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          aria-hidden
        />
      )}
      <motion.span
        className="relative inline-flex"
        animate={animar ? micro : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <Icone className="size-6" strokeWidth={1.5} aria-hidden />
      </motion.span>
    </div>
  );
}

/** Conteúdo de uma camada (ícone + foto + texto + rótulo), sem animação. */
function ConteudoCamada({ camada, ativa }: { camada: Camada; ativa: boolean }) {
  return (
    <div
      className={[
        // px-6 em todas as linhas mantém os ícones na mesma vertical do conector
        "grid grid-cols-[auto_1fr] items-center gap-6 border-t border-border px-6 py-8 md:grid-cols-[auto_auto_1fr_auto] md:gap-8",
        camada.destaque ? "rounded-2xl border-accent/30 bg-accent/[0.04]" : "",
      ].join(" ")}
    >
      <IconeCamada camada={camada} ativa={ativa} />

      {/* Foto editorial pequena de apoio (decorativa) */}
      <div className="relative hidden h-20 w-16 overflow-hidden rounded-lg bg-muted md:block">
        <Image
          src={camada.foto}
          alt=""
          fill
          sizes="64px"
          className="ops-photo object-cover"
        />
      </div>

      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          {camada.titulo}
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
          {camada.texto}
        </p>
      </div>

      <span
        className={[
          "ops-mono col-start-2 w-fit text-[11px] uppercase tracking-[0.22em] md:col-start-auto md:justify-self-end",
          camada.destaque ? "text-accent" : "text-muted-foreground/70",
        ].join(" ")}
      >
        {camada.rotulo}
      </span>
    </div>
  );
}

/** Versão pinned de uma camada: entra (y + opacity) no seu segmento de scroll. */
function CamadaPinada({
  camada,
  indice,
  progresso,
  ativa,
}: {
  camada: Camada;
  indice: number;
  progresso: MotionValue<number>;
  ativa: boolean;
}) {
  const segmento = SEGMENTOS[indice];
  const opacity = useTransform(progresso, segmento, [0, 1]);
  const y = useTransform(progresso, segmento, [56, 0]);

  // Só a execução cresce e ganha glow no fim do pin (arrays constantes nas outras)
  const escala = useTransform(
    progresso,
    [0.74, 0.9],
    camada.destaque ? [1, 1.025] : [1, 1],
  );
  const glow = useTransform(
    progresso,
    [0.74, 0.9],
    camada.destaque ? [0, 1] : [0, 0],
  );

  return (
    <motion.div style={{ opacity, y, scale: escala }} className="relative">
      {/* Halo ciano da execução — box-shadow fixo, só a opacidade anima */}
      <motion.span
        style={{ opacity: glow }}
        className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_70px_-10px] shadow-accent/40"
        aria-hidden
      />
      <ConteudoCamada camada={camada} ativa={ativa} />
    </motion.div>
  );
}

export function Camadas() {
  const containerRef = useRef<HTMLElement>(null);
  const reduzirMovimento = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const pinado = desktop && !reduzirMovimento;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Conector vertical que se desenha ligando as três camadas
  const linha = useTransform(scrollYProgress, [0.08, 0.82], [0, 1]);

  // Camada "ativa" (micro-animações dos ícones) muda em marcos do progresso
  const [ativa, setAtiva] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setAtiva(v >= 0.59 ? 2 : v >= 0.32 ? 1 : v >= 0.05 ? 0 : -1);
  });

  const cabecalho = (
    <Revelar className="max-w-2xl">
      <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
        Três camadas. Uma decisão de compra.
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        Cada camada tira um pouco do risco da compra. A execução é a que muda o
        jogo: é onde o seu capital para de ficar parado em estoque que não gira.
      </p>
    </Revelar>
  );

  return (
    <section
      id="sistema"
      ref={containerRef}
      className={[
        "relative scroll-mt-20 border-b border-border",
        pinado ? "h-[300vh]" : "",
      ].join(" ")}
    >
      {pinado ? (
        /* ---- Desktop: painel sticky, camadas entram com o scroll ---- */
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-6">
            {cabecalho}
            <div className="relative mt-14">
              {/* Conector SVG: desenha de cima a baixo pelo centro dos ícones */}
              {/* left-12 = px-6 da linha + metade do ícone de 48px */}
              <svg
                className="absolute left-12 top-0 h-full w-0.5 -translate-x-1/2"
                viewBox="0 0 2 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M1 0 L1 100"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeOpacity="0.45"
                  fill="none"
                  style={{ pathLength: linha }}
                />
              </svg>
              {CAMADAS.map((c, i) => (
                <CamadaPinada
                  key={c.titulo}
                  camada={c}
                  indice={i}
                  progresso={scrollYProgress}
                  ativa={ativa === i}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ---- Mobile / reduced-motion: sem pin, reveals simples ---- */
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          {cabecalho}
          <div className="mt-16">
            {CAMADAS.map((c, i) => (
              <Revelar key={c.titulo} delay={i * 0.08}>
                <ConteudoCamada camada={c} ativa />
              </Revelar>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

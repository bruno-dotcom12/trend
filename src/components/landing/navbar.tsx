"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

// Curva "massa real" usada em toda a landing (nada de ease-in-out genérico).
const EASE_SUAVE = [0.32, 0.72, 0, 1] as const;

/**
 * Navbar da landing: transparente sobre o topo, ganha vidro (blur + hairline)
 * depois de rolar, esconde ao descer e reaparece ao subir. Sob
 * prefers-reduced-motion ela apenas fica fixa com fundo, sem esconder.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const reduzirMovimento = useReducedMotion();

  // rolada = já saiu do topo (ganha fundo) · escondida = rolando para baixo
  const [rolada, setRolada] = useState(false);
  const [escondida, setEscondida] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setRolada(y > 24);
    // só esconde depois de passar do hero o suficiente para não "piscar"
    setEscondida(y > anterior && y > 200);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      initial={false}
      animate={{ y: escondida && !reduzirMovimento ? "-100%" : "0%" }}
      transition={{ duration: 0.55, ease: EASE_SUAVE }}
    >
      <div
        className={[
          "transition-[background-color,border-color,backdrop-filter] duration-500",
          rolada
            ? "border-b border-border/80 bg-white/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="ops-mono text-sm font-semibold uppercase tracking-[0.34em] text-foreground"
          >
            TREND
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#sistema"
              className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
            >
              Sistema
            </a>
            <a
              href="#score"
              className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
            >
              Score
            </a>
          </div>
          <Link
            href="/app/descobrir"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Acessar plataforma
            <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

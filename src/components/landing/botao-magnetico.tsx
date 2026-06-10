"use client";

import type { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { useMediaQuery } from "./use-media-query";

/**
 * Invólucro magnético: o conteúdo segue de leve o cursor dentro da área do
 * botão (atração com mola) e volta ao centro quando o cursor sai. Ativo só
 * em dispositivos com hover real e sem reduced-motion.
 */
export function BotaoMagnetico({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduzirMovimento = useReducedMotion();
  const temHover = useMediaQuery("(hover: hover)");
  const magnetico = temHover && !reduzirMovimento;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 180, damping: 16 });
  const my = useSpring(y, { stiffness: 180, damping: 16 });

  const aoMover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!magnetico) return;
    const r = e.currentTarget.getBoundingClientRect();
    // desloca até ~25% da distância do cursor ao centro (teto de 10px)
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
    x.set(Math.max(-10, Math.min(10, dx)));
    y.set(Math.max(-10, Math.min(10, dy)));
  };

  const aoSair = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={magnetico ? { x: mx, y: my } : undefined}
      onPointerMove={aoMover}
      onPointerLeave={aoSair}
      whileTap={reduzirMovimento ? undefined : { scale: 0.96 }}
    >
      {children}
    </motion.div>
  );
}

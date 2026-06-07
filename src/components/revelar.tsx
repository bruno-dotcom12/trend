"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Revela o conteúdo ao rolar a página: sobe de leve e aparece quando entra na
 * viewport. Usado nas seções abaixo do hero para dar ritmo à descida.
 *
 * Regras seguidas: anima só transform/opacity, dispara via whileInView (sem
 * listener de scroll nem useState), roda uma única vez e colapsa para estático
 * sob prefers-reduced-motion.
 */
export function Revelar({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduzirMovimento = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduzirMovimento ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

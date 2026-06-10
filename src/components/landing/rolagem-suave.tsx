"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Rolagem suave global da landing (Lenis). Inércia leve, âncoras nativas
 * preservadas e desligado por completo sob prefers-reduced-motion — nesse
 * caso a página rola 100% nativa, sem custo.
 */
export function RolagemSuave({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      // 0.14 responde rápido à inversão de sentido (0.1 dava sensação de
      // "patinar" ao rolar e voltar) mantendo a inércia editorial
      lerp: 0.14,
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}

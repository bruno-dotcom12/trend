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
      lerp: 0.1, // inércia discreta — editorial, não "patinando"
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}

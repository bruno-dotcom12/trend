"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query reativa via useSyncExternalStore. Retorna false no servidor —
 * quem usa deve tratar esse valor como fallback (ex.: versão sem pin do
 * scroll-telling até a hidratação confirmar que é desktop).
 */
export function useMediaQuery(query: string): boolean {
  const inscrever = useCallback(
    (aoMudar: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", aoMudar);
      return () => mq.removeEventListener("change", aoMudar);
    },
    [query],
  );

  return useSyncExternalStore(
    inscrever,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

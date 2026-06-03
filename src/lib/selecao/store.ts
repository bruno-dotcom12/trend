"use client";

import { useSyncExternalStore } from "react";

// "Minha seleção": o carrinho de peças que a lojista escolhe ao longo da
// jornada (Descobrir → Decidir → Comprar). Guardado por id de peça em
// localStorage, sem backend. Mesmo padrão do store de execução. Fatia 5 → Supabase.
const CHAVE = "trend:selecao";

type EstadoSelecao = {
  pecaIds: string[]; // ids das peças na seleção, na ordem em que entraram
};

const VAZIO: EstadoSelecao = { pecaIds: [] };

const ouvintes = new Set<() => void>();

let brutoCache: string | null = null;
let estadoCache: EstadoSelecao = VAZIO;

function lerSnapshot(): EstadoSelecao {
  const bruto =
    typeof window === "undefined" ? null : window.localStorage.getItem(CHAVE);
  if (bruto !== brutoCache) {
    brutoCache = bruto;
    try {
      estadoCache = bruto
        ? { ...VAZIO, ...(JSON.parse(bruto) as EstadoSelecao) }
        : VAZIO;
    } catch {
      estadoCache = VAZIO;
    }
  }
  return estadoCache;
}

function lerSnapshotServidor(): EstadoSelecao {
  return VAZIO;
}

function inscrever(callback: () => void) {
  ouvintes.add(callback);
  const aoMudar = (e: StorageEvent) => {
    if (e.key === CHAVE) callback();
  };
  window.addEventListener("storage", aoMudar);
  return () => {
    ouvintes.delete(callback);
    window.removeEventListener("storage", aoMudar);
  };
}

function gravar(estado: EstadoSelecao) {
  window.localStorage.setItem(CHAVE, JSON.stringify(estado));
  for (const ouvinte of ouvintes) ouvinte();
}

// Adiciona ou remove uma peça da seleção.
export function alternarSelecao(pecaId: string) {
  const atual = lerSnapshot();
  const ja = atual.pecaIds.includes(pecaId);
  gravar({
    pecaIds: ja
      ? atual.pecaIds.filter((id) => id !== pecaId)
      : [...atual.pecaIds, pecaId],
  });
}

export function limparSelecao() {
  gravar(VAZIO);
}

export function useSelecao() {
  const estado = useSyncExternalStore(
    inscrever,
    lerSnapshot,
    lerSnapshotServidor,
  );
  const carregada = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return {
    selecionados: estado.pecaIds,
    carregada,
    alternarSelecao,
    limparSelecao,
  };
}

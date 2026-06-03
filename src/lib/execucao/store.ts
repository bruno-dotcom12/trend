"use client";

import { useSyncExternalStore } from "react";

// Participação MOCK do usuário na execução: interesses em pré-vendas e adesões
// (com unidades) em compras coletivas. Persistido em localStorage para a barra
// refletir a ação sem backend. Fatia 5 troca por Supabase.
const CHAVE = "trend:execucao";

type EstadoExecucao = {
  interesses: string[]; // ids de pré-venda em que registrei interesse
  adesoes: Record<string, number>; // id da compra coletiva -> unidades minhas
};

const VAZIO: EstadoExecucao = { interesses: [], adesoes: {} };

const ouvintes = new Set<() => void>();

let brutoCache: string | null = null;
let estadoCache: EstadoExecucao = VAZIO;

function lerSnapshot(): EstadoExecucao {
  const bruto =
    typeof window === "undefined" ? null : window.localStorage.getItem(CHAVE);
  if (bruto !== brutoCache) {
    brutoCache = bruto;
    try {
      estadoCache = bruto
        ? { ...VAZIO, ...(JSON.parse(bruto) as EstadoExecucao) }
        : VAZIO;
    } catch {
      estadoCache = VAZIO;
    }
  }
  return estadoCache;
}

function lerSnapshotServidor(): EstadoExecucao {
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

function gravar(estado: EstadoExecucao) {
  window.localStorage.setItem(CHAVE, JSON.stringify(estado));
  for (const ouvinte of ouvintes) ouvinte();
}

export function alternarInteresse(preVendaId: string) {
  const atual = lerSnapshot();
  const ja = atual.interesses.includes(preVendaId);
  gravar({
    ...atual,
    interesses: ja
      ? atual.interesses.filter((id) => id !== preVendaId)
      : [...atual.interesses, preVendaId],
  });
}

export function definirAdesao(compraId: string, unidades: number) {
  const atual = lerSnapshot();
  const adesoes = { ...atual.adesoes };
  if (unidades > 0) adesoes[compraId] = unidades;
  else delete adesoes[compraId];
  gravar({ ...atual, adesoes });
}

export function useExecucao() {
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
  return { estado, carregada, alternarInteresse, definirAdesao };
}

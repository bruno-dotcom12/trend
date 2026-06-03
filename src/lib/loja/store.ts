"use client";

import { useSyncExternalStore } from "react";

import type { Loja } from "@/lib/loja/tipos";

// Persistência MOCK do perfil da loja (Fatia 1) via localStorage, exposta como
// store externo com useSyncExternalStore — padrão idiomático do React 19 para
// sincronizar com algo fora do React (sem efeitos/setState). Na Fatia 5 a fonte
// vira Supabase sem mudar a API do hook useLoja().
const CHAVE = "trend:loja";

const ouvintes = new Set<() => void>();

// Cache para getSnapshot retornar referência estável (re-parse só quando o bruto muda).
let brutoCache: string | null = null;
let lojaCache: Loja | null = null;

function lerSnapshot(): Loja | null {
  const bruto =
    typeof window === "undefined" ? null : window.localStorage.getItem(CHAVE);
  if (bruto !== brutoCache) {
    brutoCache = bruto;
    try {
      lojaCache = bruto ? (JSON.parse(bruto) as Loja) : null;
    } catch {
      lojaCache = null; // JSON inválido — segue sem loja
    }
  }
  return lojaCache;
}

function lerSnapshotServidor(): Loja | null {
  return null; // no SSR não há localStorage
}

function inscrever(callback: () => void) {
  ouvintes.add(callback);
  const aoMudarStorage = (e: StorageEvent) => {
    if (e.key === CHAVE) callback(); // sincroniza entre abas
  };
  window.addEventListener("storage", aoMudarStorage);
  return () => {
    ouvintes.delete(callback);
    window.removeEventListener("storage", aoMudarStorage);
  };
}

function notificar() {
  for (const ouvinte of ouvintes) ouvinte();
}

export function salvarLoja(loja: Loja) {
  window.localStorage.setItem(CHAVE, JSON.stringify(loja));
  notificar();
}

export function limparLoja() {
  window.localStorage.removeItem(CHAVE);
  notificar();
}

// `carregada` vira true só após a hidratação no cliente — evita flash de
// conteúdo errado (ex.: mostrar "completar perfil" antes de ler o localStorage).
function inscreverHidratacao() {
  return () => {};
}

export function useLoja() {
  const loja = useSyncExternalStore(
    inscrever,
    lerSnapshot,
    lerSnapshotServidor,
  );
  const carregada = useSyncExternalStore(
    inscreverHidratacao,
    () => true,
    () => false,
  );

  return { loja, carregada, salvar: salvarLoja, limpar: limparLoja };
}

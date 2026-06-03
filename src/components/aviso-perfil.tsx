"use client";

import Link from "next/link";
import { Store } from "lucide-react";

import { useLoja } from "@/lib/loja/store";

// Aviso não-bloqueante: aparece nas camadas quando ainda não há perfil de loja.
// É mock — não impede o uso, só convida a completar para melhorar as recomendações.
export function AvisoPerfil() {
  const { loja, carregada } = useLoja();
  if (!carregada || loja) return null;

  return (
    <div className="mt-6 flex items-center gap-3 rounded-lg border border-accent/50 bg-accent/10 p-4">
      <Store className="size-5 shrink-0 text-primary" aria-hidden />
      <p className="flex-1 font-body text-sm text-foreground">
        Complete o <strong className="font-semibold">perfil da sua loja</strong>{" "}
        para o TREND ajustar quantidade e aderência ao seu público.
      </p>
      <Link
        href="/app/onboarding"
        className="shrink-0 rounded-md bg-primary px-3 py-1.5 font-ui text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Completar
      </Link>
    </div>
  );
}

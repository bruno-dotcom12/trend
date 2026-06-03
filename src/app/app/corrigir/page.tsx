"use client";

import { useMemo } from "react";

import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { PecaDecisaoCard } from "@/components/peca-decisao-card";
import { calcularScore } from "@/lib/engine";
import { useLoja } from "@/lib/loja/store";
import { listarPecas } from "@/lib/pecas/fonte";

export default function CorrigirPage() {
  const { loja } = useLoja();
  const pecas = listarPecas();

  // Ordena por score (motor) desc; aderentes ao nicho da loja sobem no empate.
  const lista = useMemo(() => {
    const nicho = loja?.nicho;
    return pecas
      .map((peca) => ({
        peca,
        score: calcularScore(peca.fatores).score,
        aderente: nicho ? peca.nichos.includes(nicho) : false,
      }))
      .sort((a, b) => {
        if (a.aderente !== b.aderente) return a.aderente ? -1 : 1;
        return b.score - a.score;
      });
  }, [pecas, loja]);

  return (
    <div>
      <CamadaHeader
        camada="Decisão"
        titulo="Corrigir"
        descricao="O quê e quanto comprar: cada peça candidata com score explicável (0–100), os 3 motivos e a quantidade recomendada para o público da sua loja. O cálculo é determinístico — mesma entrada, mesmo resultado."
      />
      <AvisoPerfil />

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {lista.map(({ peca, aderente }) => (
          <PecaDecisaoCard
            key={peca.id}
            peca={peca}
            loja={loja}
            aderente={aderente}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";

import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { PecaDecisaoCard } from "@/components/peca-decisao-card";
import { ProximoPasso } from "@/components/proximo-passo";
import { calcularScore } from "@/lib/engine";
import { useLoja } from "@/lib/loja/store";
import { CAMADAS } from "@/lib/navigation";
import { listarPecas } from "@/lib/pecas/fonte";

export default function DecidirPage() {
  const { loja } = useLoja();
  const pecas = listarPecas();
  const camada = CAMADAS.find((c) => c.passo === 2)!;

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
      <CamadaHeader camada={camada} />
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
      <ProximoPasso passoAtual={2} />
    </div>
  );
}

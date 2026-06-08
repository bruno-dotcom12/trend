"use client";

import { useMemo, useState } from "react";

import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { FioSelecao } from "@/components/fio-selecao";
import { FiltroNicho, type FiltroNichoValor } from "@/components/filtro-nicho";
import { PecaDecisaoCard } from "@/components/peca-decisao-card";
import { calcularScore } from "@/lib/engine";
import { useLoja } from "@/lib/loja/store";
import { CAMADAS } from "@/lib/navigation";
import { listarPecas } from "@/lib/pecas/fonte";
import { montarEntradaScore } from "@/lib/pecas/score";

export default function DecidirPage() {
  const { loja } = useLoja();
  const pecas = listarPecas();
  const camada = CAMADAS.find((c) => c.passo === 2)!;

  const [nicho, setNicho] = useState<FiltroNichoValor>("todos");

  // Ordena por score (motor) desc; aderentes ao nicho da loja sobem no empate.
  // O filtro de nicho recorta o catálogo pelas peças daquele público.
  const lista = useMemo(() => {
    const nichoLoja = loja?.nicho;
    return pecas
      .map((peca) => ({
        peca,
        score: calcularScore(montarEntradaScore(peca, loja)).score,
        aderente: nichoLoja ? peca.nichos.includes(nichoLoja) : false,
      }))
      .filter((x) => (nicho === "todos" ? true : x.peca.nichos.includes(nicho)))
      .sort((a, b) => {
        if (a.aderente !== b.aderente) return a.aderente ? -1 : 1;
        return b.score - a.score;
      });
  }, [pecas, loja, nicho]);

  return (
    <div>
      <CamadaHeader camada={camada} />
      <AvisoPerfil />
      <FioSelecao passo={2} />

      {/* Filtro por nicho da loja */}
      <FiltroNicho
        valor={nicho}
        onChange={setNicho}
        loja={loja}
        className="mt-8"
      />

      {lista.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-border bg-card p-8 text-center font-body text-muted-foreground">
          Nenhuma peça para esse nicho. Escolha outro nicho ou veja todos.
        </p>
      ) : (
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
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { FioSelecao } from "@/components/fio-selecao";
import { FiltroChip } from "@/components/filtro-chip";
import { FiltroNicho, type FiltroNichoValor } from "@/components/filtro-nicho";
import { SinalCard } from "@/components/sinal-card";
import { CAMADAS } from "@/lib/navigation";
import { useLoja } from "@/lib/loja/store";
import { listarPecas } from "@/lib/pecas/fonte";
import { listarSinais } from "@/lib/sinais/fonte";
import { FONTES, type FonteSinal } from "@/lib/sinais/tipos";

type FiltroFonte = FonteSinal | "todas";

export default function DescobrirPage() {
  const { loja } = useLoja();
  const sinais = listarSinais();
  const camada = CAMADAS.find((c) => c.passo === 1)!;

  // Mapa sinal → peça candidata, para ligar "acompanhar tendência" à seleção.
  // Casa pela origem declarada e, como fallback, pelo id em comum (sinal e peça
  // do mesmo produto compartilham o id no seed).
  const pecaPorSinal = useMemo(() => {
    const mapa = new Map<string, string>();
    for (const p of listarPecas()) {
      mapa.set(p.id, p.id);
      if (p.origemSinalId) mapa.set(p.origemSinalId, p.id);
    }
    return mapa;
  }, []);

  const [fonte, setFonte] = useState<FiltroFonte>("todas");
  const [nicho, setNicho] = useState<FiltroNichoValor>("todos");

  // Aderência = o sinal cobre o nicho da loja. Ordena aderentes primeiro,
  // depois por força — toda a personalização vem do perfil salvo (mock).
  const lista = useMemo(() => {
    const nichoLoja = loja?.nicho;
    return sinais
      .map((s) => ({
        sinal: s,
        aderente: nichoLoja ? s.nichos.includes(nichoLoja) : false,
      }))
      .filter((x) => (fonte === "todas" ? true : x.sinal.fonte === fonte))
      .filter((x) => (nicho === "todos" ? true : x.sinal.nichos.includes(nicho)))
      .sort((a, b) => {
        if (a.aderente !== b.aderente) return a.aderente ? -1 : 1;
        return b.sinal.forca - a.sinal.forca;
      });
  }, [sinais, loja, fonte, nicho]);

  return (
    <div>
      <CamadaHeader camada={camada} />
      <AvisoPerfil />
      <FioSelecao passo={1} />

      {/* Filtros: fonte do sinal + nicho da loja */}
      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="ops-mono mr-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Fonte
          </span>
          <FiltroChip ativo={fonte === "todas"} onClick={() => setFonte("todas")}>
            Todas
          </FiltroChip>
          {(Object.keys(FONTES) as FonteSinal[]).map((f) => (
            <FiltroChip key={f} ativo={fonte === f} onClick={() => setFonte(f)}>
              {FONTES[f].rotulo}
            </FiltroChip>
          ))}
        </div>

        <FiltroNicho valor={nicho} onChange={setNicho} loja={loja} />
      </div>

      {/* Feed */}
      {lista.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-border bg-card p-8 text-center font-body text-muted-foreground">
          Nenhum sinal com esse filtro. Ajuste a fonte ou o nicho.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lista.map(({ sinal, aderente }) => (
            <SinalCard
              key={sinal.id}
              sinal={sinal}
              aderente={aderente}
              pecaId={pecaPorSinal.get(sinal.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

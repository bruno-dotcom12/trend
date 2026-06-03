"use client";

import { useMemo, useState } from "react";

import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { SinalCard } from "@/components/sinal-card";
import { useLoja } from "@/lib/loja/store";
import { listarSinais } from "@/lib/sinais/fonte";
import { FONTES, type FonteSinal } from "@/lib/sinais/tipos";

type FiltroFonte = FonteSinal | "todas";

export default function DescobrirPage() {
  const { loja } = useLoja();
  const sinais = listarSinais();

  const [fonte, setFonte] = useState<FiltroFonte>("todas");
  const [soAderentes, setSoAderentes] = useState(false);

  // Aderência = o sinal cobre o nicho da loja. Ordena aderentes primeiro,
  // depois por força — toda a personalização vem do perfil salvo (mock).
  const lista = useMemo(() => {
    const nicho = loja?.nicho;
    return sinais
      .map((s) => ({
        sinal: s,
        aderente: nicho ? s.nichos.includes(nicho) : false,
      }))
      .filter((x) => (fonte === "todas" ? true : x.sinal.fonte === fonte))
      .filter((x) => (soAderentes ? x.aderente : true))
      .sort((a, b) => {
        if (a.aderente !== b.aderente) return a.aderente ? -1 : 1;
        return b.sinal.forca - a.sinal.forca;
      });
  }, [sinais, loja, fonte, soAderentes]);

  return (
    <div>
      <CamadaHeader
        camada="Sinal"
        titulo="Descobrir"
        descricao="Detecção de sinal de tendência em formação — do público da sua loja, das redes e dos fornecedores bem pontuados, tudo num só lugar. Isto é sinal detectado, não previsão."
      />
      <AvisoPerfil />

      {/* Filtros */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <FiltroChip
          ativo={fonte === "todas"}
          onClick={() => setFonte("todas")}
        >
          Todas as fontes
        </FiltroChip>
        {(Object.keys(FONTES) as FonteSinal[]).map((f) => (
          <FiltroChip key={f} ativo={fonte === f} onClick={() => setFonte(f)}>
            {FONTES[f].rotulo}
          </FiltroChip>
        ))}

        {loja && (
          <FiltroChip
            ativo={soAderentes}
            onClick={() => setSoAderentes((v) => !v)}
            className="ml-auto"
          >
            Só aderentes ao meu nicho
          </FiltroChip>
        )}
      </div>

      {/* Feed */}
      {lista.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-border bg-card p-8 text-center font-body text-muted-foreground">
          Nenhum sinal com esse filtro. Ajuste a fonte ou o nicho.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lista.map(({ sinal, aderente }) => (
            <SinalCard key={sinal.id} sinal={sinal} aderente={aderente} />
          ))}
        </div>
      )}
    </div>
  );
}

function FiltroChip({
  ativo,
  onClick,
  className,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={[
        "rounded-full border px-3.5 py-1.5 font-ui text-sm font-medium transition-colors",
        ativo
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-accent",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

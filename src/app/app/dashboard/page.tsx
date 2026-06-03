"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

import { AvisoPerfil } from "@/components/aviso-perfil";
import { BarraProgresso } from "@/components/barra-progresso";
import { DemoBadge } from "@/components/demo-badge";
import { calcularScore } from "@/lib/engine";
import {
  listarComprasColetivas,
  listarPreVendas,
} from "@/lib/execucao/fonte";
import { useExecucao } from "@/lib/execucao/store";
import { FAIXAS_PRECO, NICHOS } from "@/lib/loja/tipos";
import { useLoja } from "@/lib/loja/store";
import { listarPecas } from "@/lib/pecas/fonte";
import { listarSinais } from "@/lib/sinais/fonte";

const real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function faixaScore(score: number): "forte" | "moderado" | "fraco" {
  if (score >= 70) return "forte";
  if (score >= 45) return "moderado";
  return "fraco";
}
const COR_SCORE: Record<ReturnType<typeof faixaScore>, string> = {
  forte: "bg-primary text-primary-foreground",
  moderado: "bg-accent text-accent-foreground",
  fraco: "bg-muted text-muted-foreground",
};

export default function DashboardPage() {
  const { loja } = useLoja();
  const { estado } = useExecucao();

  const sinais = listarSinais();
  const pecas = listarPecas();
  const preVendas = listarPreVendas();
  const compras = listarComprasColetivas();

  const nicho = loja?.nicho;

  // Top sinais aderentes ao nicho (ou por força, se sem perfil).
  const topSinais = useMemo(
    () =>
      [...sinais]
        .filter((s) => (nicho ? s.nichos.includes(nicho) : true))
        .sort((a, b) => b.forca - a.forca)
        .slice(0, 4),
    [sinais, nicho],
  );

  // Top peças por score do motor.
  const topPecas = useMemo(
    () =>
      pecas
        .map((p) => ({ peca: p, score: calcularScore(p.fatores).score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4),
    [pecas],
  );

  // Minhas participações + capital comprometido nas coletivas.
  const minhasPreVendas = preVendas.filter((pv) =>
    estado.interesses.includes(pv.id),
  );
  const minhasCompras = compras
    .map((cc) => ({ compra: cc, unidades: estado.adesoes[cc.id] ?? 0 }))
    .filter((x) => x.unidades > 0);
  const capitalComprometido = minhasCompras.reduce(
    (soma, x) => soma + x.unidades * x.compra.precoUnitario,
    0,
  );
  const totalParticipacoes = minhasPreVendas.length + minhasCompras.length;

  const nichoRotulo = NICHOS.find((n) => n.valor === nicho)?.rotulo;
  const faixaRotulo = FAIXAS_PRECO.find(
    (f) => f.valor === loja?.faixaPreco,
  )?.rotulo;

  return (
    <div>
      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Visão geral
          </span>
          <DemoBadge />
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          {loja ? `Olá, ${loja.cidade}` : "Seu painel"}
        </h1>
        <p className="mt-2 font-body text-lg text-muted-foreground">
          O panorama da sua próxima compra — do sinal à execução, num só lugar.
        </p>
      </header>

      <AvisoPerfil />

      {/* KPIs */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          rotulo="Capital disponível"
          valor={loja ? real.format(loja.capitalDisponivel) : "—"}
        />
        <Kpi
          rotulo="Comprometido em coletivas"
          valor={real.format(capitalComprometido)}
          ajuda={
            loja
              ? `${Math.round(
                  (capitalComprometido / Math.max(1, loja.capitalDisponivel)) *
                    100,
                )}% do capital`
              : undefined
          }
        />
        <Kpi rotulo="Minhas participações" valor={String(totalParticipacoes)} />
        <Kpi
          rotulo="Perfil"
          valor={loja ? `${loja.cidade} · ${loja.uf}` : "incompleto"}
          ajuda={
            loja
              ? [nichoRotulo, faixaRotulo].filter(Boolean).join(" · ")
              : undefined
          }
        />
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Top sinais */}
        <Bloco
          titulo="Sinais em alta para você"
          href="/app/descobrir"
          hrefRotulo="Ver Descobrir"
        >
          <ul className="space-y-3">
            {topSinais.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-ui text-sm font-semibold text-foreground">
                    {s.titulo}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {s.categoria}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 font-ui text-sm font-semibold text-primary">
                  <TrendingUp className="size-4" aria-hidden />
                  {s.forca}
                </span>
              </li>
            ))}
          </ul>
        </Bloco>

        {/* Top peças por score */}
        <Bloco
          titulo="Peças com maior score"
          href="/app/corrigir"
          hrefRotulo="Ver Corrigir"
        >
          <ul className="space-y-3">
            {topPecas.map(({ peca, score }) => (
              <li
                key={peca.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-ui text-sm font-semibold text-foreground">
                    {peca.titulo}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {peca.categoria}
                  </p>
                </div>
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${COR_SCORE[faixaScore(score)]}`}
                >
                  {score}
                </span>
              </li>
            ))}
          </ul>
        </Bloco>
      </div>

      {/* Minhas participações */}
      <section className="mt-8">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Minhas execuções
          </h2>
          <Link
            href="/app/blindar"
            className="inline-flex items-center gap-1 font-ui text-sm font-semibold text-primary hover:underline"
          >
            Ver Blindar
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {totalParticipacoes === 0 ? (
          <p className="mt-5 rounded-lg border border-dashed border-border bg-card p-8 text-center font-body text-muted-foreground">
            Você ainda não entrou em nenhuma pré-venda ou compra coletiva.{" "}
            <Link href="/app/blindar" className="font-semibold text-primary hover:underline">
              Comece a blindar seu capital.
            </Link>
          </p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {minhasPreVendas.map((pv) => {
              const interessados = pv.interessadosBase + 1;
              return (
                <ParticipacaoLinha
                  key={pv.id}
                  tipo="Pré-venda"
                  titulo={pv.titulo}
                  valor={interessados}
                  total={pv.meta}
                  legenda={`${interessados}/${pv.meta} reservas`}
                />
              );
            })}
            {minhasCompras.map(({ compra, unidades }) => {
              const totalUn = compra.unidadesBase + unidades;
              return (
                <ParticipacaoLinha
                  key={compra.id}
                  tipo="Compra coletiva"
                  titulo={compra.titulo}
                  valor={totalUn}
                  total={compra.loteMinimo}
                  legenda={`${unidades} un. minhas · ${real.format(
                    unidades * compra.precoUnitario,
                  )}`}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Kpi({
  rotulo,
  valor,
  ajuda,
}: {
  rotulo: string;
  valor: string;
  ajuda?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-ui text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {rotulo}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-foreground">
        {valor}
      </p>
      {ajuda && (
        <p className="mt-0.5 font-ui text-xs text-muted-foreground">{ajuda}</p>
      )}
    </div>
  );
}

function Bloco({
  titulo,
  href,
  hrefRotulo,
  children,
}: {
  titulo: string;
  href: string;
  hrefRotulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h2 className="font-display text-xl font-bold text-foreground">
          {titulo}
        </h2>
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-ui text-sm font-semibold text-primary hover:underline"
        >
          {hrefRotulo}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ParticipacaoLinha({
  tipo,
  titulo,
  valor,
  total,
  legenda,
}: {
  tipo: string;
  titulo: string;
  valor: number;
  total: number;
  legenda: string;
}) {
  const completa = valor >= total;
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-ui text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {tipo}
          </p>
          <p className="font-ui text-sm font-semibold text-foreground">
            {titulo}
          </p>
        </div>
        {completa && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-ui text-xs font-semibold text-primary">
            <Sparkles className="size-3" aria-hidden />
            pronta
          </span>
        )}
      </div>
      <div className="mt-3">
        <BarraProgresso valor={valor} total={total} completa={completa} />
      </div>
      <p className="mt-1.5 font-ui text-xs text-muted-foreground">{legenda}</p>
    </div>
  );
}

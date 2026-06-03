"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Store, TrendingUp } from "lucide-react";

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
import { CAMADAS } from "@/lib/navigation";
import { listarPecas } from "@/lib/pecas/fonte";
import { listarSinais } from "@/lib/sinais/fonte";

const real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function InicioPage() {
  const { loja } = useLoja();
  const { estado } = useExecucao();

  const sinais = listarSinais();
  const pecas = listarPecas();
  const preVendas = listarPreVendas();
  const compras = listarComprasColetivas();

  const nicho = loja?.nicho;

  const topSinais = useMemo(
    () =>
      [...sinais]
        .filter((s) => (nicho ? s.nichos.includes(nicho) : true))
        .sort((a, b) => b.forca - a.forca)
        .slice(0, 3),
    [sinais, nicho],
  );

  const topPecas = useMemo(
    () =>
      pecas
        .map((p) => ({ peca: p, score: calcularScore(p.fatores).score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [pecas],
  );

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
      {/* Cabeçalho */}
      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Início · comece aqui
          </span>
          <DemoBadge />
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          {loja ? `Olá, ${loja.cidade}` : "Bem-vinda ao TREND"}
        </h1>
        <p className="mt-2 max-w-2xl font-body text-lg text-muted-foreground">
          O TREND organiza sua próxima compra em três passos. Não prevemos o
          futuro — damos a instrução certa com base no mercado e nos seus dados.
        </p>
      </header>

      {/* Passo 0 — perfil */}
      <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Store className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-ui text-sm font-semibold text-foreground">
              Passo 0 · Perfil da sua loja
            </p>
            <p className="font-body text-sm text-muted-foreground">
              {loja
                ? `${loja.cidade} · ${loja.uf}${
                    [nichoRotulo, faixaRotulo].filter(Boolean).length
                      ? " · " + [nichoRotulo, faixaRotulo].filter(Boolean).join(" · ")
                      : ""
                  }`
                : "Complete o perfil para personalizar a trilha (quantidade e aderência ao seu público)."}
            </p>
          </div>
        </div>
        <Link
          href="/app/onboarding"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 font-ui text-sm font-semibold text-foreground transition-colors hover:border-primary"
        >
          {loja ? (
            <>
              <Check className="size-4 text-primary" aria-hidden /> Perfil completo · editar
            </>
          ) : (
            <>Completar perfil</>
          )}
        </Link>
      </section>

      {/* Trilha em 3 passos */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Sua jornada em 3 passos
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {CAMADAS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 hover:border-primary"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-base font-bold text-primary-foreground">
                {c.passo}
              </span>
              <p className="mt-4 font-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {c.legenda}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                {c.rotulo}
              </h3>
              <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-foreground/80">
                {c.resumo}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-primary">
                Abrir
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
        <Link
          href={loja ? "/app/descobrir" : "/app/onboarding"}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-ui text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          {loja ? "Começar pelo passo 1 · Descobrir" : "Começar pelo perfil"}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      {/* Onde você está — status compacto */}
      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <Stat
          rotulo="Capital disponível"
          valor={loja ? real.format(loja.capitalDisponivel) : "—"}
        />
        <Stat
          rotulo="Comprometido em coletivas"
          valor={real.format(capitalComprometido)}
        />
        <Stat
          rotulo="Minhas participações"
          valor={String(totalParticipacoes)}
        />
      </section>

      {/* Atalhos: top sinais e top peças */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Bloco titulo="Sinais em alta para você" href="/app/descobrir" hrefRotulo="Ver passo 1">
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
                  <p className="font-body text-xs text-muted-foreground">{s.categoria}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 font-ui text-sm font-semibold text-primary">
                  <TrendingUp className="size-4" aria-hidden />
                  {s.forca}
                </span>
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Peças com maior score" href="/app/decidir" hrefRotulo="Ver passo 2">
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
                  <p className="font-body text-xs text-muted-foreground">{peca.categoria}</p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {score}
                </span>
              </li>
            ))}
          </ul>
        </Bloco>
      </div>

      {/* Minhas execuções */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Minhas execuções
          </h2>
          <Link
            href="/app/comprar"
            className="inline-flex items-center gap-1 font-ui text-sm font-semibold text-primary hover:underline"
          >
            Ver passo 3
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {totalParticipacoes === 0 ? (
          <p className="mt-5 rounded-lg border border-dashed border-border bg-card p-8 text-center font-body text-muted-foreground">
            Você ainda não entrou em nenhuma pré-venda ou compra coletiva.{" "}
            <Link href="/app/comprar" className="font-semibold text-primary hover:underline">
              Comece a comprar com método.
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

function Stat({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-ui text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {rotulo}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-foreground">{valor}</p>
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
        <h2 className="font-display text-xl font-bold text-foreground">{titulo}</h2>
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
          <p className="font-ui text-sm font-semibold text-foreground">{titulo}</p>
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

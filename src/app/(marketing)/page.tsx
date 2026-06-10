import { calcularScore } from "@/lib/engine";
import { listarPecas } from "@/lib/pecas/fonte";
import { montarEntradaScore } from "@/lib/pecas/score";
import { listarSinais } from "@/lib/sinais/fonte";
import type { Loja } from "@/lib/loja/tipos";
import { Camadas } from "@/components/landing/camadas";
import { Comparativo } from "@/components/landing/comparativo";
import { CtaFinal } from "@/components/landing/cta-final";
import { HeroFoto, HeroTexto } from "@/components/landing/hero";
import { ScoreDemo } from "@/components/landing/score-demo";
import { Ticker } from "@/components/landing/ticker";

// Loja de demonstração para mostrar o score JÁ personalizado na landing.
const LOJA_DEMO: Loja = {
  nicho: "feminino",
  cidade: "Demonstração",
  uf: "SP",
  faixaPreco: "medio",
  ticketMedio: 120,
  publicoEstimado: 1500,
  capitalDisponivel: 6000,
};

// Peça-vitrine do explicador de score: números puxados do MOTOR REAL
// (mesma função que roda no produto), não valores fixos de marketing.
const PECA_DEMO =
  listarPecas().find((p) => p.id === "saia-midi-plissada") ?? listarPecas()[0];
const SCORE_DEMO = calcularScore(montarEntradaScore(PECA_DEMO, LOJA_DEMO));

export default function LandingPage() {
  const sinais = listarSinais();

  return (
    <>
      {/* ===================== HERO (editorial estilo Kokonut) ===================== */}
      {/* pt-[72px] compensa a navbar fixa (componente landing/navbar) */}
      <section className="relative flex flex-col pt-[72px] lg:min-h-[100dvh]">
        {/* Editorial: texto arejado à esquerda (reveal palavra a palavra),
            foto dominante sangrando à direita (Ken Burns + parallax) */}
        <div className="flex flex-1 flex-col lg:flex-row">
          <HeroTexto />
          <HeroFoto />
        </div>
      </section>

      {/* ===================== FAIXA DE SINAIS (terminal claro) ===================== */}
      <Ticker
        itens={sinais.map((s) => ({ id: s.id, titulo: s.titulo, forca: s.forca }))}
      />

      {/* ===================== SISTEMA (scroll-telling pinado) ===================== */}
      <Camadas />

      {/* ===================== SCORE (demo viva do motor real) ===================== */}
      <ScoreDemo
        titulo={PECA_DEMO.titulo}
        score={SCORE_DEMO.score}
        motivos={SCORE_DEMO.motivos.map((m) => ({
          fator: m.fator,
          contribuicao: m.contribuicao,
          texto: m.texto,
        }))}
      />

      {/* ===================== COMPARAÇÃO (dois lados) ===================== */}
      <Comparativo />

      {/* ===================== CTA FINAL ===================== */}
      <CtaFinal />

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-background">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-10">
          <span className="ops-mono text-sm font-semibold uppercase tracking-[0.34em] text-foreground">
            TREND
          </span>
        </div>
      </footer>
    </>
  );
}

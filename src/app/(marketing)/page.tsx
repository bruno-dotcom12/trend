import Link from "next/link";
import {
  ArrowRight,
  Check,
  Radar,
  Scale,
  ShieldCheck,
  X,
} from "lucide-react";

import { calcularScore } from "@/lib/engine";
import { listarPecas } from "@/lib/pecas/fonte";
import { montarEntradaScore } from "@/lib/pecas/score";
import { listarSinais } from "@/lib/sinais/fonte";
import type { Loja } from "@/lib/loja/tipos";
import { Revelar } from "@/components/revelar";
import { HeroFoto, HeroTexto } from "@/components/landing/hero";
import { HeroVideo } from "@/components/landing/hero-video";
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

// As três camadas do sistema. A execução é o diferencial, por isso ganha destaque.
const CAMADAS = [
  {
    icone: Radar,
    titulo: "Detectar o sinal",
    texto:
      "Público da sua loja, redes e fornecedores bem pontuados num só painel. Você vê a tendência se formar antes de o lote virar aposta.",
    rotulo: "sinal",
    destaque: false,
  },
  {
    icone: Scale,
    titulo: "Decidir a compra",
    texto:
      "Cada peça recebe um score de 0 a 100, os 3 motivos por trás dele e a quantidade calculada para o tamanho do seu público e do seu caixa.",
    rotulo: "decisão",
    destaque: false,
  },
  {
    icone: ShieldCheck,
    titulo: "Executar sem risco",
    texto:
      "O diferencial. Pré-venda valida a demanda antes de você pagar o lote, e a compra coletiva fura o lote mínimo junto com outras lojas.",
    rotulo: "execução",
    destaque: true,
  },
];

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

      {/* Faixa de vídeo (loop mudo de bastidor) — placeholder até existir o asset */}
      <HeroVideo />

      {/* ===================== FAIXA DE SINAIS (terminal claro) ===================== */}
      <Ticker
        itens={sinais.map((s) => ({ id: s.id, titulo: s.titulo, forca: s.forca }))}
      />

      {/* ===================== SISTEMA (linhas indexadas) ===================== */}
      <section id="sistema" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <Revelar className="max-w-2xl">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Três camadas. Uma decisão de compra.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Cada camada tira um pouco do risco da compra. A execução é a que
              muda o jogo: é onde o seu capital para de ficar parado em estoque
              que não gira.
            </p>
          </Revelar>

          <div className="mt-16">
            {CAMADAS.map((c, i) => {
              const Icone = c.icone;
              return (
                <Revelar key={c.titulo} delay={i * 0.08}>
                  <div
                    className={[
                      "grid grid-cols-1 gap-6 border-t border-border py-9 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10",
                      c.destaque ? "rounded-2xl border-accent/30 bg-accent/[0.04] px-6" : "",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex size-12 items-center justify-center rounded-xl border",
                        c.destaque
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-border text-muted-foreground",
                      ].join(" ")}
                    >
                      <Icone className="size-6" strokeWidth={1.5} aria-hidden />
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {c.titulo}
                      </h3>
                      <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                        {c.texto}
                      </p>
                    </div>

                    <span
                      className={[
                        "ops-mono w-fit text-[11px] uppercase tracking-[0.22em] md:justify-self-end",
                        c.destaque ? "text-accent" : "text-muted-foreground/70",
                      ].join(" ")}
                    >
                      {c.rotulo}
                    </span>
                  </div>
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== SCORE (readout central) ===================== */}
      <section id="score" className="scroll-mt-20 border-b border-border bg-secondary">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 text-center">
          <Revelar>
            <p className="ops-mono text-xs uppercase tracking-[0.28em] text-accent">
              Score de compra
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Uma nota que você explica para qualquer um.
            </h2>
          </Revelar>

          {/* Readout real: nota e 3 motivos vêm do mesmo motor que roda no produto */}
          <Revelar delay={0.12}>
            <div className="mt-10 rounded-2xl border border-border bg-background p-8 text-left shadow-sm sm:p-12">
              <div className="flex items-center justify-between gap-5 border-b border-border pb-6">
                <div>
                  <p className="ops-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {PECA_DEMO.titulo}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    nota para uma loja como a sua
                  </p>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="ops-mono text-5xl font-semibold leading-none text-accent">
                    {SCORE_DEMO.score}
                  </span>
                  <span className="ops-mono text-sm text-muted-foreground">
                    /100
                  </span>
                </div>
              </div>

              <p className="ops-mono mt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Por que essa nota
              </p>
              <ol className="mt-4 space-y-4">
                {SCORE_DEMO.motivos.map((m, i) => (
                  <li key={m.fator} className="flex items-start gap-3.5">
                    <span className="ops-mono mt-0.5 text-sm font-semibold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-foreground/85">
                      {m.texto}
                    </p>
                  </li>
                ))}
              </ol>

              <Link
                href="/app/decidir"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
              >
                Ver a tela de decisão
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Revelar>
        </div>
      </section>

      {/* ===================== COMPARAÇÃO (dois lados) ===================== */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <Revelar className="max-w-2xl">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Apostar no escuro, ou comprar com método.
            </h2>
          </Revelar>

          <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2">
            {/* Sem método: enfraquecido */}
            <Revelar className="rounded-2xl border border-border bg-background p-8 sm:p-10">
              <p className="ops-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Sem método
              </p>
              <ul className="mt-7 space-y-4 text-muted-foreground">
                {[
                  "Decide pelo feed do fornecedor",
                  "Compra o lote mínimo inteiro, sozinha",
                  "Capital travado em estoque que não gira",
                  "Confiança que cai a cada coleção encalhada",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <X
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground/60"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </Revelar>

            {/* Com o TREND: dominante. O quadro "pula" e ganha sombra no hover. */}
            <Revelar delay={0.1} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/15 sm:p-10">
                <span className="absolute left-0 top-0 h-full w-1 bg-accent" aria-hidden />
                <p className="ops-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Com o TREND
                </p>
              <ul className="mt-7 space-y-4 text-foreground/85">
                {[
                  "Sinal do público, redes e fornecedores num lugar",
                  "Score explicável e quantidade no tamanho do caixa",
                  "Pré-venda valida a demanda antes de pagar",
                  "Compra coletiva fura o lote mínimo entre lojas",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
                </ul>
              </div>
            </Revelar>
          </div>
        </div>
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section className="border-b border-border bg-secondary">
        <Revelar className="mx-auto w-full max-w-4xl px-6 py-28 text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Sua próxima compra não precisa ser um palpite.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Detecte o sinal, leia a nota de cada peça e execute sem arriscar o
            caixa. Com dados de demonstração, sem cadastro.
          </p>
          <Link
            href="/app/descobrir"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Acessar plataforma
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Revelar>
      </section>

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

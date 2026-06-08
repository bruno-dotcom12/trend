import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Radar,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import { calcularScore } from "@/lib/engine";
import { listarPecas } from "@/lib/pecas/fonte";
import { montarEntradaScore } from "@/lib/pecas/score";
import { listarSinais } from "@/lib/sinais/fonte";
import type { Loja } from "@/lib/loja/tipos";
import { Revelar } from "@/components/revelar";

const ICONES = [Radar, Scale, ShieldCheck];

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

// Peça-vitrine do explicador "por dentro do score": números puxados do MOTOR
// REAL (mesma função que roda no produto), não valores fixos de marketing.
const PECA_DEMO =
  listarPecas().find((p) => p.id === "saia-midi-plissada") ?? listarPecas()[0];
const SCORE_DEMO = calcularScore(montarEntradaScore(PECA_DEMO, LOJA_DEMO));

const PASSOS = [
  {
    n: "1",
    rotulo: "Descubra o que vai vender",
    texto:
      "Reunimos num só lugar o que o público da sua loja, as redes sociais e os bons fornecedores estão pedindo. Você vê a moda surgindo antes de todo mundo comprar.",
    selo: "veja a moda nascer",
  },
  {
    n: "2",
    rotulo: "Saiba quanto comprar",
    texto:
      "Cada peça ganha uma nota de 0 a 100, com 3 motivos em português claro, e a quantidade certa para o tamanho do seu público e do seu caixa. Você escolhe e leva para a próxima etapa.",
    selo: "nota e quantidade certa",
  },
  {
    n: "3",
    rotulo: "Compre sem arriscar o caixa",
    texto:
      "Aqui está o pulo do gato. Teste a procura com uma pré-venda antes de pagar o lote, e junte seu pedido com outras lojas para furar o lote mínimo. O dinheiro só sai quando o risco já caiu.",
    selo: "pague só quando for seguro",
  },
];

export default function LandingPage() {
  const sinais = listarSinais();
  const ticker = [...sinais, ...sinais]; // duplicado p/ marquee contínuo

  return (
    <div className="min-h-full bg-background text-foreground">
      {/* ===== HERO (foto full-bleed + card flutuante) ===== */}
      <section className="relative isolate overflow-hidden">
        {/* Foto de fundo */}
        <Image
          src="/landing/hero-model.jpg"
          alt="Editorial de moda: modelo em vestido na paleta da marca"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[72%_center]"
        />
        {/* Scrim suave à esquerda: garante legibilidade do card sobre a parede creme */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-creme/85 via-creme/45 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-creme/55 via-transparent to-creme/25"
          aria-hidden
        />

        {/* Nav sobre a foto */}
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            TREND
          </span>
          {/* Links centrais, agrupados no meio do nav */}
          <div className="hidden items-center gap-6 sm:flex">
            <a
              href="#como-funciona"
              className="font-ui text-sm font-semibold text-primary transition-colors hover:text-primary/75"
            >
              Como funciona
            </a>
            <a
              href="#score"
              className="font-ui text-sm font-semibold text-primary transition-colors hover:text-primary/75"
            >
              Entenda o score
            </a>
          </div>

          <Link
            href="/app/descobrir"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 font-ui text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            Entrar
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </nav>

        {/* Card flutuante com a headline + preview do produto */}
        <div className="mx-auto flex w-full max-w-7xl px-6 pb-20 pt-6 lg:pb-28 lg:pt-10">
          <div className="trend-rise w-full max-w-xl rounded-[28px] border border-border/70 bg-card/80 p-7 shadow-2xl shadow-secondary/15 backdrop-blur-xl sm:p-9">
            <p className="font-ui text-sm font-semibold text-primary">
              Para a lojista multimarca que repõe estoque no atacado
            </p>

            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-6xl">
              Pare de apostar
              <br />
              no <span className="italic text-primary">escuro</span>.
            </h1>

            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-foreground/80">
              O TREND mostra o que está bombando, calcula{" "}
              <strong className="font-semibold text-foreground">
                quanto comprar
              </strong>{" "}
              para o seu público e ajuda a comprar sem travar todo o seu caixa de
              uma vez.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/app/descobrir"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-ui text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                Ver como funciona
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <span className="font-ui text-xs text-muted-foreground">
                dados de demonstração, sem cadastro
              </span>
            </div>
          </div>
        </div>

        {/* Ticker de sinais: barra clara e translúcida, com rótulo fixo à esquerda */}
        <div className="relative flex items-center gap-4 overflow-hidden border-y border-border bg-creme/60 py-3 backdrop-blur-sm">
          <span className="z-10 hidden shrink-0 items-center gap-1.5 bg-creme/80 pl-6 pr-3 font-ui text-xs font-semibold text-primary sm:flex">
            <TrendingUp className="size-3.5" aria-hidden />
            Em alta agora:
          </span>
          <div className="flex w-max trend-marquee gap-8 whitespace-nowrap">
            {ticker.map((s, i) => (
              <span
                key={`${s.id}-${i}`}
                className="flex items-center gap-2 font-body text-sm text-secondary/70"
              >
                {s.titulo}
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-ui text-xs font-semibold text-primary">
                  score {s.forca}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section id="como-funciona" className="mx-auto w-full max-w-7xl px-6 py-24">
        <Revelar className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Como funciona
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Três frentes contra a aposta no escuro
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            Cada frente tira um pouco do risco da sua próxima compra — use na
            ordem que quiser. A execução é a que muda o jogo: é onde o seu
            dinheiro para de ficar parado em estoque que não gira.
          </p>
        </Revelar>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PASSOS.map((p, i) => {
            const Icone = ICONES[i];
            const heroi = p.n === "3";
            return (
              <Revelar key={p.n} delay={i * 0.1} className="h-full">
              <div
                className={[
                  "flex h-full flex-col rounded-3xl border p-7 transition-transform hover:-translate-y-1",
                  heroi
                    ? "border-primary bg-secondary text-secondary-foreground shadow-xl shadow-secondary/20"
                    : "border-border bg-card",
                ].join(" ")}
              >
                <div className="flex items-center">
                  <div
                    className={[
                      "flex size-11 items-center justify-center rounded-full",
                      heroi ? "bg-primary/30 text-accent" : "bg-primary/10 text-primary",
                    ].join(" ")}
                  >
                    <Icone className="size-5" aria-hidden />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold">
                  {p.rotulo}
                </h3>
                <p
                  className={[
                    "mt-3 flex-1 font-body text-base leading-relaxed",
                    heroi ? "text-creme/85" : "text-foreground/80",
                  ].join(" ")}
                >
                  {p.texto}
                </p>

                <span
                  className={[
                    "mt-6 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-ui text-xs font-semibold",
                    heroi
                      ? "bg-primary/30 text-creme"
                      : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  <Sparkles className="size-3" aria-hidden />
                  {p.selo}
                </span>
              </div>
              </Revelar>
            );
          })}
        </div>
      </section>

      {/* ===== POR DENTRO DO SCORE ===== */}
      <section id="score" className="scroll-mt-20 border-y border-border bg-muted/40">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <Revelar>
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
              Uma nota que você explica para qualquer um
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              Cada peça ganha uma nota de{" "}
              <strong className="font-semibold text-foreground">0 a 100</strong>.
              Junto com a nota, você vê os{" "}
              <strong className="font-semibold text-foreground">
                3 motivos
              </strong>{" "}
              por trás dela, escritos em português claro. Sem caixa-preta, sem
              “a inteligência artificial mandou”.
            </p>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              A conta é sempre a mesma: os mesmos números entram, a mesma nota
              sai. E quando você preenche o perfil da sua loja, a nota deixa de
              ser genérica e vira{" "}
              <strong className="font-semibold text-foreground">
                a sua nota
              </strong>
              .
            </p>
            <Link
              href="/app/decidir"
              className="mt-7 inline-flex items-center gap-2 font-ui text-sm font-semibold text-primary hover:underline"
            >
              Ver a tela de decisão
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Revelar>

          {/* Exemplo real: nota e os 3 motivos vêm do mesmo motor que roda no produto */}
          <Revelar delay={0.12} className="rounded-3xl border border-border bg-card p-7 shadow-xl shadow-secondary/5">
            <div className="flex items-center gap-5">
              <span className="flex size-20 shrink-0 flex-col items-center justify-center rounded-full bg-primary font-display text-primary-foreground">
                <span className="text-3xl font-bold leading-none">
                  {SCORE_DEMO.score}
                </span>
                <span className="text-[10px] opacity-80">de 100</span>
              </span>
              <div>
                <p className="font-display text-xl font-bold text-foreground">
                  {PECA_DEMO.titulo}
                </p>
                <p className="mt-0.5 font-body text-sm text-muted-foreground">
                  nota para uma loja como a sua
                </p>
              </div>
            </div>

            <p className="mt-7 font-ui text-xs font-semibold uppercase tracking-wider text-primary">
              Por que essa nota?
            </p>
            <ol className="mt-3 space-y-3">
              {SCORE_DEMO.motivos.map((m, i) => (
                <li key={m.fator} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-ui text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {m.texto}
                  </p>
                </li>
              ))}
            </ol>
          </Revelar>
        </div>
      </section>

      {/* ===== COMPARAÇÃO: APOSTAR NO ESCURO vs TREND ===== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <Revelar className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            A diferença
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Apostar no escuro <span className="italic text-muted-foreground">ou</span>{" "}
            comprar com método
          </h2>
        </Revelar>

        <Revelar className="relative mt-14 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          {/* VS central */}
          <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="flex size-14 items-center justify-center rounded-full border border-border bg-card font-display text-lg font-bold text-foreground shadow-xl">
              vs
            </span>
          </div>

          {/* Apostar no escuro: enfraquecido */}
          <div className="rounded-3xl border border-border bg-card/60 p-8 opacity-90">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <X className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-destructive">
                  Sem o TREND
                </p>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Apostar no escuro
                </h3>
              </div>
            </div>
            <ul className="mt-6 space-y-3.5 font-body text-foreground/70">
              {[
                "Decide com base no feed do fornecedor",
                "Compra o lote mínimo inteiro, sozinha",
                "Capital travado em estoque que não gira",
                "Confiança que cai a cada coleção encalhada",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive/70" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Com o TREND: elevado e dominante */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-primary bg-secondary p-8 text-secondary-foreground shadow-2xl shadow-secondary/30 lg:-translate-y-3">
            <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground">
              o jeito TREND
            </span>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/30 text-accent">
                <Check className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  Com o TREND
                </p>
                <h3 className="font-display text-xl font-bold text-creme">
                  Comprar com método
                </h3>
              </div>
            </div>
            <ul className="mt-6 space-y-3.5 font-body text-creme/90">
              {[
                "Sinal do seu público + redes + fornecedores num lugar",
                "Score explicável e quantidade no tamanho do seu caixa",
                "Pré-venda valida a demanda antes de pagar",
                "Compra coletiva fura o lote mínimo entre lojas",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Revelar>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="trend-grain relative overflow-hidden border-t border-border">
        <div className="trend-aurora absolute inset-0 opacity-80" aria-hidden />
        <Revelar className="relative mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Sua próxima compra não precisa ser um palpite
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-muted-foreground">
            Descubra o que vai vender, veja a nota de cada peça e compre sem
            arriscar o caixa. Tudo com dados de demonstração, sem precisar de
            cadastro.
          </p>
          <Link
            href="/app/descobrir"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-ui text-base font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Ver como funciona
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Revelar>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 font-ui text-sm text-creme/60 sm:flex-row">
          <span className="font-display text-lg font-bold text-creme">TREND</span>
          <span className="font-ui text-xs">
            Protótipo com dados de demonstração. Fotos: Pexels.
          </span>
        </div>
      </footer>
    </div>
  );
}

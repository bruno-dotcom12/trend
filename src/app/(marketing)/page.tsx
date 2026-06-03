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
} from "lucide-react";

import { listarSinais } from "@/lib/sinais/fonte";

const ICONES = [Radar, Scale, ShieldCheck];

// Os 4 fatores do motor — usados no explicador "por dentro do score".
const FATORES = [
  { nome: "Engajamento nas redes", valor: 85 },
  { nome: "Crescimento de busca", valor: 80 },
  { nome: "Aderência ao público", valor: 78 },
  { nome: "Saturação (penaliza)", valor: 30 },
];

const PASSOS = [
  {
    n: "01",
    camada: "Sinal",
    rotulo: "Descobrir",
    titulo: "Detecte o que está em formação",
    texto:
      "Reunimos o sinal do público da sua loja, das redes e dos fornecedores bem pontuados num só lugar. Cada peça vem com força e contexto — para você ver a tendência nascendo, não depois que todo mundo já comprou.",
    selo: "detecção de sinal · nunca previsão",
  },
  {
    n: "02",
    camada: "Decisão",
    rotulo: "Corrigir",
    titulo: "Saiba o quê e quanto comprar",
    texto:
      "Um score explicável de 0 a 100 com os 3 motivos por trás, e a quantidade recomendada para o tamanho do seu público e do seu caixa. Cálculo determinístico: mesma entrada, mesmo resultado, sem caixa-preta.",
    selo: "score + quantidade recomendada",
  },
  {
    n: "03",
    camada: "Execução",
    rotulo: "Blindar",
    titulo: "Compre sem expor o caixa",
    texto:
      "O diferencial. Valide a demanda com pré-venda antes de pagar o lote e junte pedido com outras lojas para furar o lote mínimo. O capital só sai quando o risco já caiu.",
    selo: "pré-venda + compra coletiva",
  },
];

export default function LandingPage() {
  const sinais = listarSinais();
  const ticker = [...sinais, ...sinais]; // duplicado p/ marquee contínuo

  return (
    <div className="min-h-full bg-background text-foreground">
      {/* ===== HERO ===== */}
      <section className="trend-grain relative overflow-hidden">
        <div className="trend-aurora absolute inset-0" aria-hidden />
        <div className="trend-grid absolute inset-0 opacity-70" aria-hidden />

        <div className="relative">
          {/* Nav */}
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">
              TREND
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">
                infra de decisão · moda multimarca
              </span>
              <Link
                href="/app/descobrir"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 font-ui text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                Entrar
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </nav>

          {/* Conteúdo do hero */}
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-12">
            {/* Texto */}
            <div>
              <span className="trend-rise inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary backdrop-blur">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                Sinal · Decisão · Execução
              </span>

              <h1 className="trend-rise mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl" style={{ animationDelay: "80ms" }}>
                Pare de apostar
                <br />
                no <span className="italic text-primary">escuro</span>.
              </h1>

              <p className="trend-rise mt-6 max-w-xl font-body text-lg leading-relaxed text-foreground/80" style={{ animationDelay: "160ms" }}>
                A infraestrutura que a lojista multimarca usa para repor estoque
                com método: detecta o sinal de tendência, diz{" "}
                <strong className="font-semibold text-foreground">
                  o quê e quanto comprar
                </strong>{" "}
                e blinda o caixa com pré-venda e compra coletiva.
              </p>

              <div className="trend-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
                <Link
                  href="/app/descobrir"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-ui text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
                >
                  Entrar no produto
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 font-ui text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-accent"
                >
                  Como funciona
                </a>
              </div>

              {/* Métricas/assinatura */}
              <dl className="trend-rise mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8" style={{ animationDelay: "320ms" }}>
                {[
                  ["3", "camadas: sinal, decisão, execução"],
                  ["0–100", "score explicável por peça"],
                  ["−risco", "capital protegido antes da compra"],
                ].map(([t, d]) => (
                  <div key={t}>
                    <dt className="font-display text-2xl font-bold text-primary">
                      {t}
                    </dt>
                    <dd className="mt-1 font-ui text-xs leading-snug text-muted-foreground">
                      {d}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Imagem + UI do produto sobreposta */}
            <div className="trend-rise relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "200ms" }}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-border bg-secondary shadow-2xl shadow-secondary/30">
                <Image
                  src="/landing/model.png"
                  alt="Editorial de moda — peça em destaque na paleta da marca"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />

                {/* Card: sinal detectado */}
                <div className="absolute left-4 top-4 w-52 rounded-2xl border border-white/15 bg-secondary/80 p-3.5 text-secondary-foreground shadow-xl backdrop-blur-md sm:left-5 sm:top-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    sinal detectado
                  </p>
                  <p className="mt-1 font-ui text-sm font-semibold text-creme">
                    Saia midi plissada
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                      <div className="trend-grow h-full rounded-full bg-accent" style={{ width: "82%" }} />
                    </div>
                    <span className="flex items-center gap-0.5 font-mono text-xs font-semibold text-creme">
                      <TrendingUp className="size-3 text-accent" aria-hidden />
                      82
                    </span>
                  </div>
                </div>

                {/* Card: score */}
                <div className="absolute bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-creme/95 p-3.5 shadow-xl backdrop-blur-md sm:right-5">
                  <div className="flex size-14 flex-col items-center justify-center rounded-full bg-primary font-display text-primary-foreground">
                    <span className="text-xl font-bold leading-none">92</span>
                    <span className="text-[9px] opacity-80">/100</span>
                  </div>
                  <div className="pr-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      score de compra
                    </p>
                    <p className="font-ui text-xs font-semibold text-secondary">
                      comprar 24 un.
                    </p>
                  </div>
                </div>

                {/* Card: lote coletivo */}
                <div className="absolute bottom-5 left-4 hidden w-44 rounded-2xl border border-white/15 bg-secondary/80 p-3.5 text-secondary-foreground shadow-xl backdrop-blur-md sm:block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    compra coletiva
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div className="trend-grow h-full rounded-full bg-creme" style={{ width: "80%" }} />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-creme/80">
                    48/60 un. · lote quase furado
                  </p>
                </div>
              </div>

              <figcaption className="mt-3 text-center font-display text-sm italic text-muted-foreground">
                “A lojista que parou de apostar no escuro.”
              </figcaption>
            </div>
          </div>
        </div>

        {/* Ticker de sinais */}
        <div className="relative border-y border-border bg-secondary py-3 text-secondary-foreground">
          <div className="flex w-max trend-marquee gap-8 whitespace-nowrap">
            {ticker.map((s, i) => (
              <span
                key={`${s.id}-${i}`}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-creme/70"
              >
                <TrendingUp className="size-3 text-accent" aria-hidden />
                {s.titulo}
                <span className="text-accent">{s.forca}</span>
                <span className="text-creme/30">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section id="como-funciona" className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Como funciona
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Do sinal à compra blindada, em três camadas
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            Cada camada resolve uma parte do “apostar no escuro”. A terceira é o
            herói — onde o capital deixa de ficar exposto.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PASSOS.map((p, i) => {
            const Icone = ICONES[i];
            const heroi = p.camada === "Execução";
            return (
              <div
                key={p.n}
                className={[
                  "flex flex-col rounded-3xl border p-7 transition-transform hover:-translate-y-1",
                  heroi
                    ? "border-primary bg-secondary text-secondary-foreground shadow-xl shadow-secondary/20"
                    : "border-border bg-card",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      "font-mono text-sm font-semibold",
                      heroi ? "text-accent" : "text-primary",
                    ].join(" ")}
                  >
                    {p.n}
                  </span>
                  <div
                    className={[
                      "flex size-11 items-center justify-center rounded-full",
                      heroi ? "bg-primary/30 text-accent" : "bg-primary/10 text-primary",
                    ].join(" ")}
                  >
                    <Icone className="size-5" aria-hidden />
                  </div>
                </div>

                <p
                  className={[
                    "mt-6 font-ui text-xs font-semibold uppercase tracking-[0.2em]",
                    heroi ? "text-accent" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {p.rotulo} · {p.camada}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {p.titulo}
                </h3>
                <p
                  className={[
                    "mt-3 flex-1 font-body text-sm leading-relaxed",
                    heroi ? "text-creme/80" : "text-foreground/80",
                  ].join(" ")}
                >
                  {p.texto}
                </p>

                <span
                  className={[
                    "mt-6 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px]",
                    heroi
                      ? "bg-primary/30 text-creme"
                      : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  <Sparkles className="size-3" aria-hidden />
                  {p.selo}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== POR DENTRO DO SCORE ===== */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              Por dentro do score
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground">
              Um número que você consegue explicar
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              O score combina quatro fatores com pesos fixos. Saturação alta
              derruba a nota. Nada de “a IA mandou” — a conta é determinística e
              os <strong className="font-semibold text-foreground">3 motivos</strong>{" "}
              de maior peso aparecem em texto claro.
            </p>
            <Link
              href="/app/corrigir"
              className="mt-7 inline-flex items-center gap-2 font-ui text-sm font-semibold text-primary hover:underline"
            >
              Ver a tela de decisão
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {/* Mini-visual do motor */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-xl shadow-secondary/5">
            <div className="flex items-center justify-between">
              <p className="font-ui text-sm font-semibold text-foreground">
                Saia midi plissada
              </p>
              <span className="flex size-14 flex-col items-center justify-center rounded-full bg-primary font-display text-primary-foreground">
                <span className="text-xl font-bold leading-none">92</span>
                <span className="text-[9px] opacity-80">/100</span>
              </span>
            </div>
            <div className="mt-6 space-y-3.5">
              {FATORES.map((f) => (
                <div key={f.nome}>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-muted-foreground">{f.nome}</span>
                    <span className="font-semibold text-foreground">
                      {f.valor}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="trend-grow h-full rounded-full bg-accent"
                      style={{ width: `${f.valor}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-muted/70 p-3">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <p className="font-body text-xs text-foreground/80">
                Engajamento e busca puxam para cima; baixa saturação confirma que
                o mercado ainda não está lotado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ANTES / COM O TREND ===== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-destructive">
              Apostar no escuro
            </p>
            <ul className="mt-5 space-y-3 font-body text-foreground/80">
              {[
                "Decide com base no feed do fornecedor",
                "Compra o lote mínimo inteiro, sozinha",
                "Capital travado em estoque que não gira",
                "Confiança que cai a cada coleção encalhada",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-primary bg-secondary p-8 text-secondary-foreground">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Com o TREND
            </p>
            <ul className="mt-5 space-y-3 font-body text-creme/85">
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
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="trend-grain relative overflow-hidden border-t border-border">
        <div className="trend-aurora absolute inset-0 opacity-80" aria-hidden />
        <div className="relative mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Sua próxima compra não precisa ser um palpite
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-muted-foreground">
            Comece pelo sinal, veja o score, blinde o caixa. Tudo com dados de
            demonstração — sem cadastro.
          </p>
          <Link
            href="/app/descobrir"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-ui text-base font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Entrar no produto
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 font-ui text-sm text-creme/60 sm:flex-row">
          <span className="font-display text-lg font-bold text-creme">TREND</span>
          <span className="font-mono text-xs">
            protótipo · dados de demonstração · sem dados reais ainda
          </span>
        </div>
      </footer>
    </div>
  );
}

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
    passo: "Passo 1",
    rotulo: "Descobrir tendências",
    titulo: "Veja o que está em formação",
    texto:
      "Reunimos o sinal do público da sua loja, das redes e dos fornecedores bem pontuados num só lugar. Cada peça vem com força e contexto — para você ver a tendência nascendo, não depois que todo mundo já comprou.",
    selo: "sinal detectado · nunca previsão",
  },
  {
    n: "02",
    passo: "Passo 2",
    rotulo: "Decidir o que comprar",
    titulo: "Saiba o quê e quanto comprar",
    texto:
      "Um score explicável de 0 a 100 com os 3 motivos por trás, e a quantidade recomendada para o tamanho do seu público e do seu caixa. Cálculo determinístico: mesma entrada, mesmo resultado, sem caixa-preta.",
    selo: "score + quantidade recomendada",
  },
  {
    n: "03",
    passo: "Passo 3",
    rotulo: "Comprar com método",
    titulo: "Compre reduzindo a exposição do caixa",
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
      {/* ===== HERO (foto full-bleed + card flutuante) ===== */}
      <section className="relative isolate overflow-hidden">
        {/* Foto de fundo */}
        <Image
          src="/landing/hero-model.jpg"
          alt="Editorial de moda — modelo em vestido na paleta da marca"
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
          <div className="flex items-center gap-3">
            <a
              href="#como-funciona"
              className="hidden font-ui text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:inline"
            >
              Como funciona
            </a>
            <Link
              href="/app/descobrir"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 font-ui text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Entrar
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </nav>

        {/* Card flutuante com a headline + preview do produto */}
        <div className="mx-auto flex w-full max-w-7xl px-6 pb-20 pt-6 lg:pb-28 lg:pt-10">
          <div className="trend-rise w-full max-w-xl rounded-[28px] border border-border/70 bg-card/80 p-7 shadow-2xl shadow-secondary/15 backdrop-blur-xl sm:p-9">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="font-semibold text-primary">01 Sinal</span>
              <ArrowRight className="size-3" aria-hidden />
              <span className="font-semibold text-primary">02 Decisão</span>
              <ArrowRight className="size-3" aria-hidden />
              <span className="font-semibold text-primary">03 Execução</span>
            </p>

            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-6xl">
              Pare de apostar
              <br />
              no <span className="italic text-primary">escuro</span>.
            </h1>

            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-foreground/80">
              A infraestrutura que a lojista multimarca usa para repor estoque
              com método — detecta o sinal, diz{" "}
              <strong className="font-semibold text-foreground">
                o quê e quanto comprar
              </strong>{" "}
              e blinda o caixa.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/app/descobrir"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-ui text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                Entrar no produto
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <span className="font-mono text-[11px] text-muted-foreground">
                dados de demonstração · sem cadastro
              </span>
            </div>
          </div>
        </div>

        {/* Ticker de sinais — barra clara e translúcida */}
        <div className="relative border-y border-border bg-creme/60 py-3 backdrop-blur-sm">
          <div className="flex w-max trend-marquee gap-8 whitespace-nowrap">
            {ticker.map((s, i) => (
              <span
                key={`${s.id}-${i}`}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-secondary/70"
              >
                <TrendingUp className="size-3 text-primary" aria-hidden />
                {s.titulo}
                <span className="font-semibold text-primary">{s.forca}</span>
                <span className="text-secondary/25">/</span>
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
            const heroi = p.n === "03";
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
                  {p.passo}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {p.rotulo}
                </h3>
                <p
                  className={[
                    "mt-1 font-ui text-sm font-semibold",
                    heroi ? "text-creme/90" : "text-foreground/70",
                  ].join(" ")}
                >
                  {p.titulo}
                </p>
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
              href="/app/decidir"
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

      {/* ===== COMPARAÇÃO: APOSTAR NO ESCURO vs TREND ===== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            A diferença
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Apostar no escuro <span className="italic text-muted-foreground">ou</span>{" "}
            comprar com método
          </h2>
        </div>

        <div className="relative mt-14 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          {/* VS central */}
          <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="flex size-14 items-center justify-center rounded-full border border-border bg-card font-display text-lg font-bold text-foreground shadow-xl">
              vs
            </span>
          </div>

          {/* Apostar no escuro — enfraquecido */}
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

          {/* Com o TREND — elevado e dominante */}
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
            protótipo · dados de demonstração · fotos: Pexels
          </span>
        </div>
      </footer>
    </div>
  );
}

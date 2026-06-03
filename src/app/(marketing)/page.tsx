import Link from "next/link";
import { ArrowRight, Radar, Scale, ShieldCheck } from "lucide-react";

import { DemoBadge } from "@/components/demo-badge";
import { CAMADAS } from "@/lib/navigation";

const ICONES = [Radar, Scale, ShieldCheck];

export default function LandingPage() {
  return (
    <div className="min-h-full bg-background text-foreground">
      {/* Masthead estilo jornal */}
      <header className="border-b-2 border-foreground/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 font-ui text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>Interior do Brasil</span>
          <Link
            href="/app/descobrir"
            className="font-display text-3xl font-bold tracking-tight text-foreground"
          >
            TREND
          </Link>
          <span className="hidden sm:inline">Edição de demonstração</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6">
        {/* Manchete */}
        <section className="border-b border-border py-16 text-center">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Reportagem · Moda multimarca
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            A lojista que parou de apostar no escuro
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-display text-xl italic text-secondary">
            Caixa curto, lote mínimo e a decisão sozinha. Como uma camada de
            execução virou o jogo de quem repõe estoque comprando no atacado.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/app/descobrir"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-ui text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Entrar no produto
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <DemoBadge />
          </div>
        </section>

        {/* Lede da reportagem */}
        <section className="grid gap-10 border-b border-border py-16 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/90">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-primary">
              Ela decide o quê e quanto comprar com base em sinal alheio — o
              feed do fornecedor, o palpite do representante. É obrigada a levar
              o lote mínimo e decide sozinha. O resultado é capital travado em
              prateleira e a confiança que cai a cada coleção encalhada.
            </p>
            <p>
              O TREND troca o palpite por método. Reúne a{" "}
              <strong className="font-semibold">detecção de sinal</strong> num
              só lugar, transforma sinal em{" "}
              <strong className="font-semibold">decisão de compra</strong> com
              score explicável e quantidade recomendada — e, o diferencial,
              entrega a <strong className="font-semibold">execução</strong>:
              pré-venda antes de pagar o lote e compra coletiva para furar o
              lote mínimo.
            </p>
            <p className="font-display text-xl italic text-secondary">
              Aqui não se fala em previsão. Fala-se em sinal detectado e em
              capital protegido antes da compra.
            </p>
          </div>

          <aside className="self-start rounded-lg border border-border bg-card p-6 font-ui">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              O problema, em números da lojista
            </p>
            <dl className="mt-4 space-y-4">
              {[
                ["Decisão", "Sozinha, sem rede de apoio"],
                ["Compra", "Travada no lote mínimo"],
                ["Capital", "Preso em estoque que não gira"],
              ].map(([t, d]) => (
                <div key={t}>
                  <dt className="font-display text-2xl font-bold text-primary">
                    {t}
                  </dt>
                  <dd className="text-sm text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        {/* As 3 camadas */}
        <section className="py-16">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">
            Três camadas, um método
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-body text-muted-foreground">
            Do sinal à execução. A terceira é o herói — é onde o capital deixa
            de ficar exposto.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CAMADAS.map((c, i) => {
              const Icone = ICONES[i];
              const heroi = c.camada === "Execução";
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className={[
                    "group flex flex-col rounded-xl border p-7 transition-colors",
                    heroi
                      ? "border-primary bg-secondary text-secondary-foreground"
                      : "border-border bg-card hover:border-accent",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <Icone
                      className={heroi ? "size-7 text-accent" : "size-7 text-primary"}
                      aria-hidden
                    />
                    <span
                      className={[
                        "font-ui text-xs font-semibold uppercase tracking-[0.2em]",
                        heroi ? "text-accent" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {heroi ? "Diferencial" : `Camada ${i + 1}`}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">
                    {c.rotulo}
                    <span
                      className={[
                        "ml-2 align-middle font-ui text-sm font-normal uppercase tracking-wider",
                        heroi ? "text-accent" : "text-primary",
                      ].join(" ")}
                    >
                      {c.camada}
                    </span>
                  </h3>
                  <p
                    className={[
                      "mt-3 flex-1 font-body",
                      heroi ? "text-creme/80" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {c.resumo}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-ui text-sm font-semibold">
                    Abrir
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 font-ui text-sm text-muted-foreground sm:flex-row">
          <span className="font-display text-lg font-bold text-foreground">
            TREND
          </span>
          <span>Protótipo · dados de demonstração · sem dados reais ainda</span>
        </div>
      </footer>
    </div>
  );
}

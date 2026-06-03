"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AnaliseLoja } from "@/components/analise-loja";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/demo-badge";
import {
  ErroCampo,
  Field,
  Hint,
  Input,
  Label,
  Select,
} from "@/components/ui/field";
import { useLoja } from "@/lib/loja/store";
import {
  FAIXAS_PRECO,
  NICHOS,
  UFS,
  type FaixaPreco,
  type Loja,
  type Nicho,
} from "@/lib/loja/tipos";
import { LOJA_SEMENTE } from "@/lib/seed/loja";

// Formulário guarda números como string para edição livre; converte no envio.
type FormState = {
  nicho: Nicho;
  cidade: string;
  uf: string;
  faixaPreco: FaixaPreco;
  ticketMedio: string;
  publicoEstimado: string;
  capitalDisponivel: string;
};

function lojaParaForm(l: Loja): FormState {
  return {
    nicho: l.nicho,
    cidade: l.cidade,
    uf: l.uf,
    faixaPreco: l.faixaPreco,
    ticketMedio: String(l.ticketMedio),
    publicoEstimado: String(l.publicoEstimado),
    capitalDisponivel: String(l.capitalDisponivel),
  };
}

type Erros = Partial<Record<keyof FormState, string>>;

function validar(f: FormState): Erros {
  const erros: Erros = {};
  if (!f.cidade.trim()) erros.cidade = "Informe a cidade.";

  const numericos: [keyof FormState, string][] = [
    ["ticketMedio", "Informe o ticket médio."],
    ["publicoEstimado", "Informe o público estimado."],
    ["capitalDisponivel", "Informe o capital disponível."],
  ];
  for (const [campo, msg] of numericos) {
    const n = Number(f[campo]);
    if (f[campo].trim() === "" || Number.isNaN(n)) erros[campo] = msg;
    else if (n < 0) erros[campo] = "Não pode ser negativo.";
  }
  return erros;
}

export default function OnboardingPage() {
  const { loja, carregada } = useLoja();

  // Aguarda a hidratação para inicializar o formulário com a loja salva (se houver).
  if (!carregada) {
    return (
      <div className="mx-auto max-w-2xl py-10 font-body text-muted-foreground">
        Carregando seu perfil…
      </div>
    );
  }

  // key força o init lazy do formulário com os dados certos (salvos ou seed).
  return <FormularioLoja inicial={loja ?? LOJA_SEMENTE} key={loja ? "salva" : "nova"} />;
}

function FormularioLoja({ inicial }: { inicial: Loja }) {
  const router = useRouter();
  const { salvar } = useLoja();

  const [form, setForm] = useState<FormState>(() => lojaParaForm(inicial));
  const [tentou, setTentou] = useState(false);

  // Erros derivados do estado atual — sem efeito, sem state extra.
  const erros = tentou ? validar(form) : {};

  function set<K extends keyof FormState>(campo: K, valor: FormState[K]) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTentou(true);
    const novosErros = validar(form);
    if (Object.keys(novosErros).length > 0) return;

    salvar({
      nicho: form.nicho,
      cidade: form.cidade.trim(),
      uf: form.uf,
      faixaPreco: form.faixaPreco,
      ticketMedio: Number(form.ticketMedio),
      publicoEstimado: Number(form.publicoEstimado),
      capitalDisponivel: Number(form.capitalDisponivel),
    });
    router.push("/app/descobrir");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Perfil da loja
          </span>
          <DemoBadge />
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          Conte sobre a sua loja
        </h1>
        <p className="mt-2 font-body text-lg text-muted-foreground">
          É com esse perfil que o TREND calcula o quanto comprar e mede a
          aderência de cada peça ao seu público. Você pode editar quando quiser.
        </p>
      </header>

      <div className="mt-8">
        <AnaliseLoja />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="font-ui text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          ou informe manualmente
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
        {/* Nicho */}
        <Field>
          <Label htmlFor="nicho">Nicho</Label>
          <Select
            id="nicho"
            value={form.nicho}
            onChange={(e) => set("nicho", e.target.value as Nicho)}
          >
            {NICHOS.map((n) => (
              <option key={n.valor} value={n.valor}>
                {n.rotulo}
              </option>
            ))}
          </Select>
        </Field>

        {/* Faixa de preço */}
        <Field>
          <Label>Faixa de preço</Label>
          <div className="grid grid-cols-3 gap-3">
            {FAIXAS_PRECO.map((fp) => {
              const ativo = form.faixaPreco === fp.valor;
              return (
                <button
                  key={fp.valor}
                  type="button"
                  onClick={() => set("faixaPreco", fp.valor)}
                  aria-pressed={ativo}
                  className={[
                    "rounded-lg border p-3 text-left transition-colors",
                    ativo
                      ? "border-primary bg-primary/5"
                      : "border-input bg-card hover:border-accent",
                  ].join(" ")}
                >
                  <span className="block font-ui text-sm font-semibold text-foreground">
                    {fp.rotulo}
                  </span>
                  <span className="mt-0.5 block font-body text-xs text-muted-foreground">
                    {fp.ajuda}
                  </span>
                </button>
              );
            })}
          </div>
        </Field>

        {/* Cidade / UF */}
        <div className="grid grid-cols-[1fr_120px] gap-4">
          <Field>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              value={form.cidade}
              onChange={(e) => set("cidade", e.target.value)}
              placeholder="Ex.: Patos de Minas"
              aria-invalid={!!erros.cidade}
            />
            {erros.cidade && <ErroCampo>{erros.cidade}</ErroCampo>}
          </Field>
          <Field>
            <Label htmlFor="uf">UF</Label>
            <Select
              id="uf"
              value={form.uf}
              onChange={(e) => set("uf", e.target.value)}
            >
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {/* Ticket médio / público */}
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <Label htmlFor="ticket">Ticket médio (R$)</Label>
            <Input
              id="ticket"
              inputMode="numeric"
              value={form.ticketMedio}
              onChange={(e) => set("ticketMedio", e.target.value)}
              placeholder="180"
              aria-invalid={!!erros.ticketMedio}
            />
            <Hint>Valor médio que cada cliente gasta por compra.</Hint>
            {erros.ticketMedio && <ErroCampo>{erros.ticketMedio}</ErroCampo>}
          </Field>
          <Field>
            <Label htmlFor="publico">Público estimado</Label>
            <Input
              id="publico"
              inputMode="numeric"
              value={form.publicoEstimado}
              onChange={(e) => set("publicoEstimado", e.target.value)}
              placeholder="2500"
              aria-invalid={!!erros.publicoEstimado}
            />
            <Hint>Clientes que você consegue alcançar.</Hint>
            {erros.publicoEstimado && (
              <ErroCampo>{erros.publicoEstimado}</ErroCampo>
            )}
          </Field>
        </div>

        {/* Capital */}
        <Field>
          <Label htmlFor="capital">
            Capital disponível para a próxima compra (R$)
          </Label>
          <Input
            id="capital"
            inputMode="numeric"
            value={form.capitalDisponivel}
            onChange={(e) => set("capitalDisponivel", e.target.value)}
            placeholder="12000"
            aria-invalid={!!erros.capitalDisponivel}
          />
          <Hint>Quanto você pode comprometer agora, sem apertar o caixa.</Hint>
          {erros.capitalDisponivel && (
            <ErroCampo>{erros.capitalDisponivel}</ErroCampo>
          )}
        </Field>

        <div className="flex items-center gap-3 border-t border-border pt-6">
          <Button type="submit" size="lg" className="px-6">
            Salvar e continuar
          </Button>
          <span className="font-body text-sm text-muted-foreground">
            Salvo só no seu navegador por enquanto.
          </span>
        </div>
      </form>
    </div>
  );
}

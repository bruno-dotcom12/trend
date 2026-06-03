import { describe, expect, it } from "vitest";

import { calcularScore, quantidadeRecomendada } from "@/lib/engine";
import { QUANTIDADE } from "@/lib/engine/config";
import type { ContextoLoja, Peca } from "@/lib/engine/tipos";

// Helpers para construir peças legíveis nos testes.
const peca = (p: Partial<Peca> = {}): Peca => ({
  engajamentoRedes: 0,
  crescimentoBusca: 0,
  aderenciaPublico: 0,
  saturacao: 0,
  ...p,
});

describe("calcularScore", () => {
  it("dá score máximo (100) quando tudo é ótimo e a saturação é zero", () => {
    const { score } = calcularScore(
      peca({
        engajamentoRedes: 100,
        crescimentoBusca: 100,
        aderenciaPublico: 100,
        saturacao: 0,
      }),
    );
    expect(score).toBe(100);
  });

  it("dá score mínimo (0) quando tudo é péssimo e a saturação é máxima", () => {
    const { score } = calcularScore(
      peca({
        engajamentoRedes: 0,
        crescimentoBusca: 0,
        aderenciaPublico: 0,
        saturacao: 100,
      }),
    );
    expect(score).toBe(0);
  });

  it("derruba o score quando a saturação sobe (resto igual)", () => {
    const base = peca({
      engajamentoRedes: 60,
      crescimentoBusca: 60,
      aderenciaPublico: 60,
      saturacao: 0,
    });
    const saturada = { ...base, saturacao: 100 };

    expect(calcularScore(saturada).score).toBeLessThan(
      calcularScore(base).score,
    );
  });

  it("retorna exatamente os 3 fatores de maior contribuição", () => {
    const { motivos } = calcularScore(
      peca({
        engajamentoRedes: 100,
        crescimentoBusca: 100,
        aderenciaPublico: 100,
        saturacao: 0,
      }),
    );
    expect(motivos).toHaveLength(3);
    expect(motivos.map((m) => m.fator)).toEqual([
      "engajamentoRedes",
      "crescimentoBusca",
      "aderenciaPublico",
    ]);
  });

  it("desempata motivos por ordem canônica dos fatores", () => {
    // engajamento e crescimento empatam em contribuição (mesmo peso e valor);
    // a ordem deve ser determinística: engajamentoRedes antes de crescimentoBusca.
    const { motivos } = calcularScore(
      peca({
        engajamentoRedes: 80,
        crescimentoBusca: 80,
        aderenciaPublico: 0,
        saturacao: 0,
      }),
    );
    expect(motivos.map((m) => m.fator)).toEqual([
      "engajamentoRedes",
      "crescimentoBusca",
      "saturacao", // frescor (100-0) entra como 3º
    ]);
  });

  it("cada motivo tem contribuição positiva e texto explicativo legível", () => {
    const { motivos } = calcularScore(
      peca({ engajamentoRedes: 90, crescimentoBusca: 70, aderenciaPublico: 50 }),
    );
    for (const m of motivos) {
      expect(m.contribuicao).toBeGreaterThan(0);
      expect(m.texto.length).toBeGreaterThan(10);
    }
    expect(motivos[0].texto).toMatch(/redes/i);
  });
});

describe("quantidadeRecomendada", () => {
  const loja = (c: Partial<ContextoLoja> = {}): ContextoLoja => ({
    ticketMedio: 200,
    capitalDisponivel: 3000,
    loteMinimo: 12,
    ...c,
  });

  const pecaForte = peca({
    engajamentoRedes: 100,
    crescimentoBusca: 100,
    aderenciaPublico: 100,
    saturacao: 0,
  });

  it("retorna 0 quando o capital não cobre nem um lote mínimo", () => {
    // custo unitário = 200 * 0.5 = 100; capital 500 → 5 unidades < lote 12
    const qtd = quantidadeRecomendada(
      pecaForte,
      loja({ capitalDisponivel: 500 }),
    );
    expect(qtd).toBe(0);
  });

  it("recomenda um múltiplo do lote mínimo", () => {
    const qtd = quantidadeRecomendada(pecaForte, loja());
    expect(qtd % 12).toBe(0);
    expect(qtd).toBeGreaterThan(0);
  });

  it("nunca estoura o capital disponível", () => {
    const ctx = loja();
    const custoUnitario = ctx.ticketMedio * QUANTIDADE.fatorCustoAtacado;
    const qtd = quantidadeRecomendada(pecaForte, ctx);
    expect(qtd * custoUnitario).toBeLessThanOrEqual(ctx.capitalDisponivel);
  });

  it("recomenda comprar menos para uma peça mais fraca", () => {
    const pecaMedia = peca({
      engajamentoRedes: 50,
      crescimentoBusca: 50,
      aderenciaPublico: 50,
      saturacao: 50,
    });
    const ctx = loja();
    expect(quantidadeRecomendada(pecaMedia, ctx)).toBeLessThan(
      quantidadeRecomendada(pecaForte, ctx),
    );
  });
});

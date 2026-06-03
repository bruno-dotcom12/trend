import { describe, expect, it } from "vitest";

import {
  calcularScore,
  detalharScore,
  quantidadeRecomendada,
} from "@/lib/engine";
import type { ContextoLoja, EntradaScore } from "@/lib/engine/tipos";

// Entrada-base neutra; cada teste sobrescreve só o que importa.
const entrada = (e: Partial<EntradaScore> = {}): EntradaScore => ({
  engajamentoRedes: 50,
  crescimentoBusca: 50,
  saturacao: 50,
  aderenciaPublico: 50,
  forcaSinal: 50,
  fonteSinal: "redes",
  direcaoSinal: "estavel",
  precoAtacado: 100,
  ...e,
});

// Peça "perfeita" para a loja: tudo no topo, sinal forte do próprio público em
// alta, e preço cujo varejo estimado (100/0.5 = 200) bate o ticket de 200.
const perfeitaParaLoja = (): EntradaScore =>
  entrada({
    engajamentoRedes: 100,
    crescimentoBusca: 100,
    saturacao: 0,
    aderenciaPublico: 100,
    forcaSinal: 100,
    fonteSinal: "publico-loja",
    direcaoSinal: "em-alta",
    precoAtacado: 100,
    loja: { ticketMedio: 200, nichoCombina: true },
  });

describe("calcularScore — escala e limites", () => {
  it("o score fica sempre dentro de [0, 100]", () => {
    expect(calcularScore(perfeitaParaLoja()).score).toBeLessThanOrEqual(100);
    expect(
      calcularScore(
        entrada({
          engajamentoRedes: 0,
          crescimentoBusca: 0,
          saturacao: 100,
          aderenciaPublico: 0,
          forcaSinal: 0,
          fonteSinal: "redes",
          direcaoSinal: "esfriando",
        }),
      ).score,
    ).toBeGreaterThanOrEqual(0);
  });

  it("dá 100 para a peça perfeita para a loja", () => {
    expect(calcularScore(perfeitaParaLoja()).score).toBe(100);
  });

  it("dá score baixo para uma peça fraca e esfriando", () => {
    const { score } = calcularScore(
      entrada({
        engajamentoRedes: 0,
        crescimentoBusca: 0,
        saturacao: 100,
        aderenciaPublico: 0,
        forcaSinal: 0,
        fonteSinal: "redes",
        direcaoSinal: "esfriando",
      }),
    );
    expect(score).toBeLessThan(25);
  });
});

describe("calcularScore — efeito de cada variável", () => {
  it("saturação alta derruba o score (resto igual)", () => {
    const base = entrada({ saturacao: 0 });
    const saturada = entrada({ saturacao: 100 });
    expect(calcularScore(saturada).score).toBeLessThan(
      calcularScore(base).score,
    );
  });

  it("sinal mais forte eleva o score (resto igual)", () => {
    expect(calcularScore(entrada({ forcaSinal: 100 })).score).toBeGreaterThan(
      calcularScore(entrada({ forcaSinal: 0 })).score,
    );
  });

  it("direção em alta vale mais que esfriando (resto igual)", () => {
    expect(
      calcularScore(entrada({ direcaoSinal: "em-alta" })).score,
    ).toBeGreaterThan(
      calcularScore(entrada({ direcaoSinal: "esfriando" })).score,
    );
  });

  it("fonte do próprio público vale mais que redes (resto igual)", () => {
    expect(
      calcularScore(entrada({ fonteSinal: "publico-loja" })).score,
    ).toBeGreaterThan(calcularScore(entrada({ fonteSinal: "redes" })).score);
  });
});

describe("calcularScore — personalização pela loja", () => {
  it("nicho que combina pontua mais que nicho divergente", () => {
    const combina = entrada({
      aderenciaPublico: 70,
      loja: { ticketMedio: 200, nichoCombina: true },
    });
    const diverge = entrada({
      aderenciaPublico: 70,
      loja: { ticketMedio: 200, nichoCombina: false },
    });
    expect(calcularScore(combina).score).toBeGreaterThan(
      calcularScore(diverge).score,
    );
  });

  it("preço alinhado ao ticket pontua mais que preço desalinhado", () => {
    // varejo estimado = preco / 0.5. Alinhado: 100→200 == ticket 200.
    const alinhado = entrada({
      precoAtacado: 100,
      loja: { ticketMedio: 200, nichoCombina: true },
    });
    const caro = entrada({
      precoAtacado: 400, // varejo 800, bem acima do ticket 200
      loja: { ticketMedio: 200, nichoCombina: true },
    });
    expect(calcularScore(alinhado).score).toBeGreaterThan(
      calcularScore(caro).score,
    );
  });

  it("marca personalizado=true só quando há loja", () => {
    expect(calcularScore(entrada()).personalizado).toBe(false);
    expect(
      calcularScore(
        entrada({ loja: { ticketMedio: 200, nichoCombina: true } }),
      ).personalizado,
    ).toBe(true);
  });

  it("sem loja, o encaixe de preço nunca aparece nos motivos", () => {
    const { motivos } = calcularScore(perfeitaParaLoja());
    const semLoja = calcularScore(
      entrada({
        engajamentoRedes: 100,
        crescimentoBusca: 100,
        saturacao: 0,
        forcaSinal: 100,
        fonteSinal: "publico-loja",
        direcaoSinal: "em-alta",
      }),
    );
    expect(semLoja.motivos.map((m) => m.fator)).not.toContain("encaixePreco");
    // sanity: com loja o conjunto de fatores pode incluir o encaixe
    expect(motivos.length).toBe(3);
  });

  it("renormaliza os pesos sem loja: peça-topo sem perfil ainda chega a 100", () => {
    const { score } = calcularScore(
      entrada({
        engajamentoRedes: 100,
        crescimentoBusca: 100,
        saturacao: 0,
        aderenciaPublico: 100,
        forcaSinal: 100,
        fonteSinal: "publico-loja",
        direcaoSinal: "em-alta",
      }),
    );
    expect(score).toBe(100);
  });
});

describe("calcularScore — motivos", () => {
  it("retorna exatamente 3 motivos, com contribuição positiva e texto legível", () => {
    const { motivos } = calcularScore(perfeitaParaLoja());
    expect(motivos).toHaveLength(3);
    for (const m of motivos) {
      expect(m.contribuicao).toBeGreaterThan(0);
      expect(m.texto.length).toBeGreaterThan(10);
    }
  });

  it("desempata por ordem canônica quando as contribuições empatam", () => {
    // engajamento e crescimento têm o mesmo peso (0.15) e o mesmo valor → empatam;
    // engajamentoRedes deve vir antes por ser anterior na ordem canônica.
    const { motivos } = calcularScore(
      entrada({
        engajamentoRedes: 100,
        crescimentoBusca: 100,
        saturacao: 100, // frescor 0, não compete
        aderenciaPublico: 0,
        forcaSinal: 0,
        fonteSinal: "redes",
        direcaoSinal: "esfriando",
      }),
    );
    expect(motivos[0].fator).toBe("engajamentoRedes");
    expect(motivos[1].fator).toBe("crescimentoBusca");
  });
});

describe("detalharScore", () => {
  it("lista 8 fatores com loja e 7 sem loja (encaixe de preço sai)", () => {
    expect(detalharScore(perfeitaParaLoja()).fatores).toHaveLength(8);
    expect(detalharScore(entrada()).fatores).toHaveLength(7);
    expect(detalharScore(entrada()).fatores.map((f) => f.fator)).not.toContain(
      "encaixePreco",
    );
  });

  it("o score do detalhe bate com o de calcularScore", () => {
    const e = perfeitaParaLoja();
    expect(detalharScore(e).score).toBe(calcularScore(e).score);
  });

  it("os pesos ativos somam ~1.0 (renormalizados)", () => {
    const soma = detalharScore(entrada()).fatores.reduce(
      (s, f) => s + f.peso,
      0,
    );
    expect(soma).toBeCloseTo(1, 5);
  });
});

describe("quantidadeRecomendada", () => {
  const loja = (c: Partial<ContextoLoja> = {}): ContextoLoja => ({
    ticketMedio: 200,
    capitalDisponivel: 3000,
    loteMinimo: 12,
    ...c,
  });

  const pecaForte = perfeitaParaLoja(); // preco 100, score 100

  it("retorna 0 quando o capital não cobre nem um lote mínimo", () => {
    // custo unitário = precoAtacado 100; capital 500 → 5 unidades < lote 12
    const qtd = quantidadeRecomendada(pecaForte, loja({ capitalDisponivel: 500 }));
    expect(qtd).toBe(0);
  });

  it("recomenda um múltiplo do lote mínimo", () => {
    const qtd = quantidadeRecomendada(pecaForte, loja());
    expect(qtd % 12).toBe(0);
    expect(qtd).toBeGreaterThan(0);
  });

  it("nunca estoura o capital disponível", () => {
    const ctx = loja();
    const qtd = quantidadeRecomendada(pecaForte, ctx);
    expect(qtd * pecaForte.precoAtacado).toBeLessThanOrEqual(
      ctx.capitalDisponivel,
    );
  });

  it("recomenda comprar menos para uma peça mais fraca", () => {
    const pecaFraca = entrada({
      engajamentoRedes: 40,
      crescimentoBusca: 40,
      saturacao: 70,
      aderenciaPublico: 40,
      forcaSinal: 40,
      fonteSinal: "redes",
      direcaoSinal: "esfriando",
      precoAtacado: 100,
    });
    const ctx = loja();
    expect(quantidadeRecomendada(pecaFraca, ctx)).toBeLessThan(
      quantidadeRecomendada(pecaForte, ctx),
    );
  });
});

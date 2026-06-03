import {
  ORDEM_FATORES,
  PESOS,
  QUANTIDADE,
  TEXTO_MOTIVO,
} from "@/lib/engine/config";
import type {
  ContextoLoja,
  Fator,
  Motivo,
  Peca,
  ResultadoScore,
} from "@/lib/engine/tipos";

// Limita um número a [min, max].
function limitar(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Contribuição de cada fator ao score (em pontos de 0–100).
// Saturação entra como "frescor": (100 - saturacao) * peso. Por isso saturação
// alta reduz a contribuição e derruba o score.
function contribuicaoDoFator(peca: Peca, fator: Fator): number {
  const valor = fator === "saturacao" ? 100 - peca.saturacao : peca[fator];
  return valor * PESOS[fator];
}

export function calcularScore(peca: Peca): ResultadoScore {
  const contribs = ORDEM_FATORES.map((fator) => ({
    fator,
    contribuicao: contribuicaoDoFator(peca, fator),
  }));

  const score = limitar(
    Math.round(contribs.reduce((soma, c) => soma + c.contribuicao, 0)),
    0,
    100,
  );

  // Ordena por contribuição desc; empate desempata pela ordem canônica
  // (índice em ORDEM_FATORES) — desempate estável e determinístico.
  const motivos: Motivo[] = contribs
    .map((c, indice) => ({ ...c, indice }))
    .sort((a, b) => b.contribuicao - a.contribuicao || a.indice - b.indice)
    .slice(0, 3)
    .map(({ fator, contribuicao }) => ({
      fator,
      contribuicao: Math.round(contribuicao),
      texto: TEXTO_MOTIVO[fator](
        fator === "saturacao" ? peca.saturacao : peca[fator],
      ),
    }));

  return { score, motivos };
}

export function quantidadeRecomendada(
  peca: Peca,
  loja: ContextoLoja,
): number {
  const custoUnitario = loja.ticketMedio * QUANTIDADE.fatorCustoAtacado;
  if (custoUnitario <= 0 || loja.loteMinimo <= 0) return 0;

  // Quantas unidades o capital permite comprar.
  const unidadesAfordaveis = Math.floor(loja.capitalDisponivel / custoUnitario);
  if (unidadesAfordaveis < loja.loteMinimo) return 0; // nem um lote cabe

  // O score modula quanto do orçamento comprometer (confiança na peça).
  const { score } = calcularScore(peca);
  const alvo = unidadesAfordaveis * (score / 100);

  // Arredonda para baixo ao lote mínimo → respeita lote e nunca estoura capital.
  const lotes = Math.floor(alvo / loja.loteMinimo);
  return lotes * loja.loteMinimo;
}

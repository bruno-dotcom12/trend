import {
  ADERENCIA,
  CONFIANCA_FONTE,
  MOMENTO_DIRECAO,
  ORDEM_FATORES,
  PESOS,
  TEXTO_MOTIVO,
  varejoEstimado,
} from "@/lib/engine/config";
import type {
  ContextoLoja,
  EntradaScore,
  Fator,
  Motivo,
  ResultadoScore,
} from "@/lib/engine/tipos";

// Limita um número a [min, max].
function limitar(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Aderência ajustada pelo nicho da loja: bônus quando casa, fator de redução
// quando diverge, base pura quando não há perfil.
function aderenciaAjustada(entrada: EntradaScore): number {
  const base = entrada.aderenciaPublico;
  if (!entrada.loja) return base;
  return entrada.loja.nichoCombina
    ? Math.min(100, base + ADERENCIA.bonusNichoCombina)
    : base * ADERENCIA.fatorNichoDivergente;
}

// Encaixe de preço: quão perto o varejo estimado da peça fica do ticket da loja.
// Igual ao ticket → 100; a ≥100% de distância → 0.
function encaixePreco(entrada: EntradaScore): number {
  if (!entrada.loja || entrada.loja.ticketMedio <= 0) return 0;
  const distancia =
    Math.abs(varejoEstimado(entrada.precoAtacado) - entrada.loja.ticketMedio) /
    entrada.loja.ticketMedio;
  return limitar(100 - distancia * 100, 0, 100);
}

// Valor 0–100 de cada fator antes do peso.
function valorDoFator(entrada: EntradaScore, fator: Fator): number {
  switch (fator) {
    case "engajamentoRedes":
      return entrada.engajamentoRedes;
    case "crescimentoBusca":
      return entrada.crescimentoBusca;
    case "saturacao":
      return 100 - entrada.saturacao; // frescor
    case "forcaSinal":
      return entrada.forcaSinal;
    case "confiancaFonte":
      return CONFIANCA_FONTE[entrada.fonteSinal];
    case "momento":
      return MOMENTO_DIRECAO[entrada.direcaoSinal];
    case "aderenciaPublico":
      return aderenciaAjustada(entrada);
    case "encaixePreco":
      return encaixePreco(entrada);
  }
}

// Pesos ativos para esta entrada. Sem perfil de loja, `encaixePreco` é
// descartado e os demais pesos são renormalizados para somar 1.0.
function pesosAtivos(temLoja: boolean): Map<Fator, number> {
  const fatores = temLoja
    ? ORDEM_FATORES
    : ORDEM_FATORES.filter((f) => f !== "encaixePreco");
  const soma = fatores.reduce((s, f) => s + PESOS[f], 0);
  return new Map(fatores.map((f) => [f, PESOS[f] / soma]));
}

export function calcularScore(entrada: EntradaScore): ResultadoScore {
  const temLoja = Boolean(entrada.loja);
  const pesos = pesosAtivos(temLoja);

  const contribs = [...pesos.entries()].map(([fator, peso]) => ({
    fator,
    contribuicao: valorDoFator(entrada, fator) * peso,
  }));

  const score = limitar(
    Math.round(contribs.reduce((soma, c) => soma + c.contribuicao, 0)),
    0,
    100,
  );

  // Ordena por contribuição desc; empate desempata pela ordem canônica
  // (índice em ORDEM_FATORES) — desempate estável e determinístico.
  const indice = (f: Fator) => ORDEM_FATORES.indexOf(f);
  const motivos: Motivo[] = contribs
    .sort(
      (a, b) =>
        b.contribuicao - a.contribuicao || indice(a.fator) - indice(b.fator),
    )
    .slice(0, 3)
    .map(({ fator, contribuicao }) => ({
      fator,
      contribuicao: Math.round(contribuicao),
      texto: TEXTO_MOTIVO[fator](entrada),
    }));

  return { score, motivos, personalizado: temLoja };
}

export function quantidadeRecomendada(
  entrada: EntradaScore,
  loja: ContextoLoja,
): number {
  const custoUnitario = entrada.precoAtacado;
  if (custoUnitario <= 0 || loja.loteMinimo <= 0) return 0;

  // Quantas unidades o capital permite comprar pelo preço de atacado.
  const unidadesAfordaveis = Math.floor(loja.capitalDisponivel / custoUnitario);
  if (unidadesAfordaveis < loja.loteMinimo) return 0; // nem um lote cabe

  // O score modula quanto do orçamento comprometer (confiança na peça).
  const { score } = calcularScore(entrada);
  const alvo = unidadesAfordaveis * (score / 100);

  // Arredonda para baixo ao lote mínimo → respeita lote e nunca estoura capital.
  const lotes = Math.floor(alvo / loja.loteMinimo);
  return lotes * loja.loteMinimo;
}

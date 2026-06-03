import type {
  DirecaoSinal,
  EntradaScore,
  Fator,
  FonteSinal,
} from "@/lib/engine/tipos";

// ÚNICO lugar com os números do motor: pesos, mapeamentos e limiares. Nada de
// número mágico espalhado nos componentes ou na lógica.

// Pesos dos 8 fatores. Somam 1.0 → score normalizado em 0–100. Sem perfil de
// loja, `encaixePreco` sai e os demais pesos são renormalizados (ver index.ts).
// `saturacao` entra como "frescor" (100 - saturacao): quanto menos saturado,
// mais contribui — por isso saturação alta derruba o score.
export const PESOS: Record<Fator, number> = {
  engajamentoRedes: 0.15,
  crescimentoBusca: 0.15,
  saturacao: 0.12,
  forcaSinal: 0.15,
  confiancaFonte: 0.1,
  momento: 0.13,
  aderenciaPublico: 0.12,
  encaixePreco: 0.08,
};

// Ordem canônica dos fatores — desempate determinístico dos motivos.
export const ORDEM_FATORES: Fator[] = [
  "engajamentoRedes",
  "crescimentoBusca",
  "saturacao",
  "forcaSinal",
  "confiancaFonte",
  "momento",
  "aderenciaPublico",
  "encaixePreco",
];

// Confiabilidade da fonte do sinal (0–100). O sinal do próprio público da loja
// é o mais confiável para ela; redes são mais voláteis.
export const CONFIANCA_FONTE: Record<FonteSinal, number> = {
  "publico-loja": 100,
  fornecedor: 75,
  redes: 55,
};

// Momento da tendência pela direção do sinal (0–100). Em alta vale mais;
// esfriando penaliza (risco de comprar no fim da curva).
export const MOMENTO_DIRECAO: Record<DirecaoSinal, number> = {
  "em-alta": 100,
  estavel: 60,
  esfriando: 25,
};

// Ajuste da aderência pelo nicho da loja.
export const ADERENCIA = {
  bonusNichoCombina: 15, // soma à aderência base (limitado a 100)
  fatorNichoDivergente: 0.7, // multiplica a base quando o nicho não casa
};

// Parâmetros de preço/quantidade.
export const QUANTIDADE = {
  // Atacado ≈ 50% do varejo → varejo estimado = precoAtacado / fator.
  // Usado tanto no encaixe de preço quanto como referência de margem.
  fatorCustoAtacado: 0.5,
};

// Rótulo curto de cada fator — para explicar o score na UI (ex.: landing).
export const FATOR_ROTULO: Record<Fator, string> = {
  engajamentoRedes: "Engajamento nas redes",
  crescimentoBusca: "Crescimento de busca",
  saturacao: "Frescor (baixa saturação)",
  forcaSinal: "Força do sinal",
  confiancaFonte: "Confiança da fonte",
  momento: "Momento da tendência",
  aderenciaPublico: "Aderência ao seu público",
  encaixePreco: "Encaixe de preço",
};

// Rótulos legíveis para os textos dos motivos.
export const FONTE_ROTULO: Record<FonteSinal, string> = {
  "publico-loja": "o público da sua loja",
  fornecedor: "fornecedor bem pontuado",
  redes: "redes sociais",
};

export const DIRECAO_ROTULO: Record<DirecaoSinal, string> = {
  "em-alta": "em alta",
  estavel: "estável",
  esfriando: "esfriando",
};

// Varejo estimado da peça a partir do preço de atacado.
export function varejoEstimado(precoAtacado: number): number {
  return precoAtacado / QUANTIDADE.fatorCustoAtacado;
}

// Textos dos motivos. Recebem a entrada inteira para citarem o dado real.
export const TEXTO_MOTIVO: Record<Fator, (e: EntradaScore) => string> = {
  engajamentoRedes: (e) =>
    `Engajamento nas redes em ${e.engajamentoRedes}/100: o público está reagindo a essa peça.`,
  crescimentoBusca: (e) =>
    `Busca crescendo (${e.crescimentoBusca}/100): a procura vem aumentando nas últimas semanas.`,
  saturacao: (e) =>
    `Baixa saturação (${e.saturacao}/100 saturada): o mercado ainda não está lotado dessa peça.`,
  forcaSinal: (e) =>
    `Sinal forte (${e.forcaSinal}/100): a tendência foi detectada com intensidade.`,
  confiancaFonte: (e) =>
    `Fonte confiável: o sinal vem de ${FONTE_ROTULO[e.fonteSinal]}.`,
  momento: (e) =>
    `Momento ${DIRECAO_ROTULO[e.direcaoSinal]}: a curva de interesse está a seu favor.`,
  aderenciaPublico: (e) =>
    e.loja?.nichoCombina
      ? `Aderência ao seu público (${e.aderenciaPublico}/100): combina com o nicho da sua loja.`
      : `Aderência ao público em ${e.aderenciaPublico}/100: encaixa no perfil da peça.`,
  encaixePreco: (e) =>
    `Encaixe de preço: o varejo estimado (${Math.round(
      varejoEstimado(e.precoAtacado),
    )}) conversa com o seu ticket médio.`,
};

import type { Fator } from "@/lib/engine/tipos";

// ÚNICO lugar com os números do motor: pesos e parâmetros. Nada de número
// mágico espalhado nos componentes ou na lógica.

// Pesos dos 4 fatores. Somam 1.0 → score normalizado em 0–100.
// `saturacao` entra como "frescor" (100 - saturacao): quanto menos saturado,
// mais ele contribui. Por isso saturação alta derruba o score.
export const PESOS: Record<Fator, number> = {
  engajamentoRedes: 0.3,
  crescimentoBusca: 0.3,
  aderenciaPublico: 0.25,
  saturacao: 0.15,
};

// Ordem canônica dos fatores — usada como desempate determinístico dos motivos.
export const ORDEM_FATORES: Fator[] = [
  "engajamentoRedes",
  "crescimentoBusca",
  "aderenciaPublico",
  "saturacao",
];

// Parâmetros da quantidade recomendada.
export const QUANTIDADE = {
  // Custo de atacado estimado como fração do ticket de varejo. Permite converter
  // capital disponível em unidades compráveis sem termos o custo real (MVP).
  fatorCustoAtacado: 0.5,
};

// Textos dos motivos. Recebem o valor do fator (0–100) para ficarem legíveis.
export const TEXTO_MOTIVO: Record<Fator, (valor: number) => string> = {
  engajamentoRedes: (v) =>
    `Engajamento nas redes em ${v}/100: o público está reagindo a essa peça.`,
  crescimentoBusca: (v) =>
    `Busca crescendo (${v}/100): a procura vem aumentando nas últimas semanas.`,
  aderenciaPublico: (v) =>
    `Aderência ao seu público em ${v}/100: combina com o perfil da sua loja.`,
  saturacao: (v) =>
    `Baixa saturação (${v}/100 saturada): o mercado ainda não está lotado dessa peça.`,
};

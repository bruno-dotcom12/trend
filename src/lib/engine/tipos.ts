// Contrato do motor de decisão. O cálculo é função pura, sem LLM.

// Os 8 fatores do score. Os 2 personalizados (aderência usa o nicho da loja;
// encaixe de preço usa o ticket) só pesam quando há perfil de loja.
export type Fator =
  | "engajamentoRedes"
  | "crescimentoBusca"
  | "saturacao"
  | "forcaSinal"
  | "confiancaFonte"
  | "momento"
  | "aderenciaPublico"
  | "encaixePreco";

// Fonte e direção do sinal — espelham lib/sinais/tipos, mas redeclaradas aqui
// para o motor ser autossuficiente (função pura, sem depender do domínio/UI).
export type FonteSinal = "publico-loja" | "redes" | "fornecedor";
export type DirecaoSinal = "em-alta" | "estavel" | "esfriando";

// Os 4 fatores de mercado que vivem na própria peça (0–100).
export type Peca = {
  engajamentoRedes: number;
  crescimentoBusca: number;
  aderenciaPublico: number;
  saturacao: number;
};

// Contexto da loja para PERSONALIZAR o score. Ausente → "score de mercado".
export type ContextoScore = {
  ticketMedio: number; // R$ — ticket médio de venda no varejo
  nichoCombina: boolean; // o nicho da loja casa com os nichos da peça
};

// Entrada completa do motor: mercado da peça + atributos do sinal de origem
// + (opcional) contexto da loja. Montada pelo adaptador em lib/pecas, nunca
// dentro de um componente.
export type EntradaScore = {
  // mercado (peça)
  engajamentoRedes: number; // 0–100
  crescimentoBusca: number; // 0–100
  saturacao: number; // 0–100 (entra invertido como "frescor")
  aderenciaPublico: number; // 0–100 (base; ajustada pelo nicho da loja)
  // sinal de origem
  forcaSinal: number; // 0–100
  fonteSinal: FonteSinal;
  direcaoSinal: DirecaoSinal;
  precoAtacado: number; // R$ por unidade no atacado
  // loja (opcional → personaliza aderência e encaixe de preço)
  loja?: ContextoScore;
};

// Contexto consumido pela quantidade recomendada (capital + lote da peça).
export type ContextoLoja = {
  ticketMedio: number;
  capitalDisponivel: number;
  loteMinimo: number;
};

export type Motivo = {
  fator: Fator;
  contribuicao: number; // pontos que o fator soma ao score (0–100)
  texto: string; // explicação legível
};

export type ResultadoScore = {
  score: number; // 0–100
  motivos: Motivo[]; // os 3 fatores de maior contribuição
  personalizado: boolean; // true quando o score considerou o perfil da loja
};

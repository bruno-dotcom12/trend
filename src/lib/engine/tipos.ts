// Contrato do motor de decisão. O cálculo é função pura, sem LLM.

export type Fator =
  | "engajamentoRedes"
  | "crescimentoBusca"
  | "aderenciaPublico"
  | "saturacao";

// Entrada por peça: cada fator de 0 a 100.
export type Peca = {
  engajamentoRedes: number;
  crescimentoBusca: number;
  aderenciaPublico: number;
  saturacao: number;
};

// Contexto da loja consumido pelo motor (subconjunto do perfil + lote da peça).
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
};

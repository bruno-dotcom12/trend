import type { Peca } from "@/lib/engine/tipos";
import type { Nicho } from "@/lib/loja/tipos";

// Peça candidata exibida na tela DECISÃO. Junta os dados de exibição com os
// 4 fatores que o motor consome e o lote mínimo (que varia por peça/fornecedor).
export type PecaCandidata = {
  id: string;
  titulo: string;
  categoria: string;
  nichos: Nicho[];
  loteMinimo: number;
  fatores: Peca; // engajamentoRedes, crescimentoBusca, aderenciaPublico, saturacao (0–100)
  origemSinalId?: string; // liga à camada SINAL (Descobrir)
};

import type { Nicho } from "@/lib/loja/tipos";

// Um sinal de tendência EM FORMAÇÃO (nunca "previsão"). No MVP vem do seed;
// a fonte real é plugável depois (ver src/lib/sinais/fonte.ts).

export type FonteSinal = "publico-loja" | "redes" | "fornecedor";
export type DirecaoSinal = "em-alta" | "estavel" | "esfriando";

export type Sinal = {
  id: string;
  titulo: string; // peça/tema do sinal (ex.: "Saia midi plissada")
  categoria: string; // agrupador (ex.: "Saias", "Alfaiataria")
  forca: number; // 0–100: intensidade do sinal detectado
  direcao: DirecaoSinal;
  fonte: FonteSinal;
  contexto: string; // de onde vem o sinal, em linguagem legível
  nichos: Nicho[]; // a quais públicos o sinal se aplica
  horizonte: string; // janela estimada (texto curto)
};

export const FONTES: Record<FonteSinal, { rotulo: string }> = {
  "publico-loja": { rotulo: "Público da loja" },
  redes: { rotulo: "Redes sociais" },
  fornecedor: { rotulo: "Fornecedor pontuado" },
};

export const DIRECOES: Record<DirecaoSinal, { rotulo: string }> = {
  "em-alta": { rotulo: "Em alta" },
  estavel: { rotulo: "Estável" },
  esfriando: { rotulo: "Esfriando" },
};

// Faixa de força → rótulo legível (usado no card; cor fica na UI).
export function faixaForca(forca: number): "forte" | "moderado" | "fraco" {
  if (forca >= 70) return "forte";
  if (forca >= 45) return "moderado";
  return "fraco";
}

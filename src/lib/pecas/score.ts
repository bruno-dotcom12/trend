import type { EntradaScore } from "@/lib/engine/tipos";
import type { Loja } from "@/lib/loja/tipos";
import type { PecaCandidata } from "@/lib/pecas/tipos";
import { listarSinais } from "@/lib/sinais/fonte";

// Traduz o domínio (peça + sinal de origem + perfil da loja) na entrada que o
// motor consome. Vive aqui — não no engine (que é puro) nem no componente.
export function montarEntradaScore(
  peca: PecaCandidata,
  loja: Loja | null,
): EntradaScore {
  const sinal = peca.origemSinalId
    ? listarSinais().find((s) => s.id === peca.origemSinalId)
    : undefined;

  return {
    engajamentoRedes: peca.fatores.engajamentoRedes,
    crescimentoBusca: peca.fatores.crescimentoBusca,
    saturacao: peca.fatores.saturacao,
    aderenciaPublico: peca.fatores.aderenciaPublico,
    // Atributos do sinal de origem; fallback neutro quando a peça não tem sinal.
    forcaSinal: sinal?.forca ?? peca.fatores.crescimentoBusca,
    fonteSinal: sinal?.fonte ?? "redes",
    direcaoSinal: sinal?.direcao ?? "estavel",
    precoAtacado: peca.precoAtacado,
    loja: loja
      ? {
          ticketMedio: loja.ticketMedio,
          nichoCombina: peca.nichos.includes(loja.nicho),
        }
      : undefined,
  };
}

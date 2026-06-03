import {
  COMPRAS_COLETIVAS_SEMENTE,
  PRE_VENDAS_SEMENTE,
} from "@/lib/seed/execucao";
import type { CompraColetiva, PreVenda } from "@/lib/execucao/tipos";

// Fontes plugáveis (seed agora, Supabase na Fatia 5).
export function listarPreVendas(): PreVenda[] {
  return PRE_VENDAS_SEMENTE;
}

export function listarComprasColetivas(): CompraColetiva[] {
  return COMPRAS_COLETIVAS_SEMENTE;
}

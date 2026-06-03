import { PECAS_SEMENTE } from "@/lib/seed/pecas";
import type { PecaCandidata } from "@/lib/pecas/tipos";

// Fonte plugável de peças candidatas. MVP retorna o seed; Fatia 5 troca por
// Supabase sem mudar a assinatura.
export function listarPecas(): PecaCandidata[] {
  return PECAS_SEMENTE;
}

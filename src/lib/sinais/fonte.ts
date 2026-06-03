import { SINAIS_SEMENTE } from "@/lib/seed/sinais";
import type { Sinal } from "@/lib/sinais/tipos";

// Fonte de sinais plugável. No MVP retorna o seed; na Fatia 5 troca para
// uma query no Supabase sem mudar a assinatura — a UI não precisa saber.
export function listarSinais(): Sinal[] {
  return SINAIS_SEMENTE;
}

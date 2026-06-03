import type { Loja } from "@/lib/loja/tipos";

// Loja-semente do MVP: uma multimarca de cidade do interior. Serve de
// exemplo no onboarding e de fallback antes de o perfil ser preenchido.
// Regra do projeto: dados inventados ficam no seed/, nunca dentro de componente.
export const LOJA_SEMENTE: Loja = {
  nicho: "feminino",
  cidade: "Patos de Minas",
  uf: "MG",
  faixaPreco: "medio",
  ticketMedio: 180,
  publicoEstimado: 2500,
  capitalDisponivel: 12000,
};

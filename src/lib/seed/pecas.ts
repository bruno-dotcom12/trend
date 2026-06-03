import type { PecaCandidata } from "@/lib/pecas/tipos";

// Peças candidatas-semente do MVP, derivadas dos sinais (Descobrir). Os 4 fatores
// são dados de demonstração — moram no seed, nunca dentro do componente.
export const PECAS_SEMENTE: PecaCandidata[] = [
  {
    id: "saia-midi-plissada",
    titulo: "Saia midi plissada",
    categoria: "Saias",
    nichos: ["feminino", "plus"],
    loteMinimo: 12,
    origemSinalId: "saia-midi-plissada",
    fatores: {
      engajamentoRedes: 85,
      crescimentoBusca: 80,
      aderenciaPublico: 78,
      saturacao: 30,
    },
  },
  {
    id: "calca-alfaiataria-fluida",
    titulo: "Calça de alfaiataria fluida",
    categoria: "Alfaiataria",
    nichos: ["feminino", "masculino", "plus"],
    loteMinimo: 10,
    origemSinalId: "calca-alfaiataria-fluida",
    fatores: {
      engajamentoRedes: 70,
      crescimentoBusca: 76,
      aderenciaPublico: 82,
      saturacao: 35,
    },
  },
  {
    id: "vestido-chemise",
    titulo: "Vestido chemise",
    categoria: "Vestidos",
    nichos: ["feminino", "plus"],
    loteMinimo: 8,
    origemSinalId: "vestido-chemise",
    fatores: {
      engajamentoRedes: 66,
      crescimentoBusca: 64,
      aderenciaPublico: 72,
      saturacao: 40,
    },
  },
  {
    id: "conjunto-fitness-canelado",
    titulo: "Conjunto fitness canelado",
    categoria: "Activewear",
    nichos: ["fitness", "feminino"],
    loteMinimo: 15,
    origemSinalId: "conjunto-fitness-canelado",
    fatores: {
      engajamentoRedes: 78,
      crescimentoBusca: 71,
      aderenciaPublico: 60,
      saturacao: 45,
    },
  },
  {
    id: "jaqueta-jeans-oversized",
    titulo: "Jaqueta jeans oversized",
    categoria: "Jeanswear",
    nichos: ["feminino", "masculino", "plus"],
    loteMinimo: 6,
    origemSinalId: "jaqueta-jeans-oversized",
    fatores: {
      engajamentoRedes: 72,
      crescimentoBusca: 73,
      aderenciaPublico: 68,
      saturacao: 38,
    },
  },
  {
    id: "tricot-canelado",
    titulo: "Tricot canelado leve",
    categoria: "Malharia",
    nichos: ["feminino", "masculino"],
    loteMinimo: 12,
    origemSinalId: "tricot-canelado",
    fatores: {
      engajamentoRedes: 55,
      crescimentoBusca: 58,
      aderenciaPublico: 70,
      saturacao: 50,
    },
  },
  {
    id: "biquini-cortininha",
    titulo: "Biquíni cortininha",
    categoria: "Beachwear",
    nichos: ["praia", "feminino"],
    loteMinimo: 20,
    origemSinalId: "biquini-cortininha",
    fatores: {
      engajamentoRedes: 50,
      crescimentoBusca: 42,
      aderenciaPublico: 48,
      saturacao: 72, // já saturada — o motor deve segurar a quantidade
    },
  },
  {
    id: "colete-alfaiataria",
    titulo: "Colete de alfaiataria",
    categoria: "Alfaiataria",
    nichos: ["feminino"],
    loteMinimo: 10,
    origemSinalId: "colete-alfaiataria",
    fatores: {
      engajamentoRedes: 44,
      crescimentoBusca: 40,
      aderenciaPublico: 52,
      saturacao: 68,
    },
  },
];

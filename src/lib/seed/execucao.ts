import type { CompraColetiva, PreVenda } from "@/lib/execucao/tipos";

// Pré-vendas e compras coletivas em andamento (dados de demonstração).
// Referenciam peças do seed de DECISÃO; números moram aqui, não no componente.

export const PRE_VENDAS_SEMENTE: PreVenda[] = [
  {
    id: "pv-saia-midi-plissada",
    pecaId: "saia-midi-plissada",
    titulo: "Saia midi plissada",
    categoria: "Saias",
    meta: 30,
    interessadosBase: 22,
    lojasBase: ["Boutique Sol", "Loja Dom", "Use & Vá", "Trecho 9"],
    prazo: "fecha em 5 dias",
  },
  {
    id: "pv-vestido-chemise",
    pecaId: "vestido-chemise",
    titulo: "Vestido chemise",
    categoria: "Vestidos",
    meta: 24,
    interessadosBase: 24,
    lojasBase: ["Maria Bonita", "Ateliê Marta", "Corpo & Cia", "Fit Norte"],
    prazo: "meta atingida",
  },
  {
    id: "pv-jaqueta-jeans-oversized",
    pecaId: "jaqueta-jeans-oversized",
    titulo: "Jaqueta jeans oversized",
    categoria: "Jeanswear",
    meta: 20,
    interessadosBase: 9,
    lojasBase: ["Loja Dom", "Boutique Sol"],
    prazo: "fecha em 9 dias",
  },
];

export const COMPRAS_COLETIVAS_SEMENTE: CompraColetiva[] = [
  {
    id: "cc-calca-alfaiataria-fluida",
    pecaId: "calca-alfaiataria-fluida",
    titulo: "Calça de alfaiataria fluida",
    categoria: "Alfaiataria",
    loteMinimo: 60,
    unidadesBase: 42,
    lojasBase: ["Ateliê Marta", "Loja Dom", "Use & Vá"],
    precoUnitario: 79,
    prazo: "fecha em 6 dias",
  },
  {
    id: "cc-conjunto-fitness-canelado",
    pecaId: "conjunto-fitness-canelado",
    titulo: "Conjunto fitness canelado",
    categoria: "Activewear",
    loteMinimo: 90,
    unidadesBase: 31,
    lojasBase: ["Corpo & Cia", "Fit Norte"],
    precoUnitario: 64,
    prazo: "fecha em 12 dias",
  },
  {
    id: "cc-tricot-canelado",
    pecaId: "tricot-canelado",
    titulo: "Tricot canelado leve",
    categoria: "Malharia",
    loteMinimo: 48,
    unidadesBase: 44,
    lojasBase: ["Boutique Sol", "Maria Bonita", "Trecho 9", "Loja Dom"],
    precoUnitario: 52,
    prazo: "quase no lote",
  },
];

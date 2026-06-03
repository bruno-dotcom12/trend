// Perfil da loja capturado no onboarding. Os campos numéricos formam o
// "contexto da loja" que o motor de decisão (Fatia 3) consome.

export type Nicho =
  | "feminino"
  | "masculino"
  | "infantil"
  | "fitness"
  | "plus"
  | "praia";

export type FaixaPreco = "popular" | "medio" | "premium";

export type Loja = {
  nicho: Nicho;
  cidade: string;
  uf: string;
  faixaPreco: FaixaPreco;
  ticketMedio: number; // R$ — ticket médio de venda no varejo
  publicoEstimado: number; // nº de clientes alcançáveis
  capitalDisponivel: number; // R$ disponível para a próxima compra
};

// Opções legíveis para os selects do formulário.
export const NICHOS: { valor: Nicho; rotulo: string }[] = [
  { valor: "feminino", rotulo: "Moda feminina" },
  { valor: "masculino", rotulo: "Moda masculina" },
  { valor: "infantil", rotulo: "Infantil" },
  { valor: "fitness", rotulo: "Fitness / activewear" },
  { valor: "plus", rotulo: "Plus size" },
  { valor: "praia", rotulo: "Praia / beachwear" },
];

export const FAIXAS_PRECO: { valor: FaixaPreco; rotulo: string; ajuda: string }[] = [
  { valor: "popular", rotulo: "Popular", ajuda: "Volume e preço de entrada" },
  { valor: "medio", rotulo: "Médio", ajuda: "Equilíbrio entre giro e margem" },
  { valor: "premium", rotulo: "Premium", ajuda: "Margem e curadoria" },
];

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
] as const;

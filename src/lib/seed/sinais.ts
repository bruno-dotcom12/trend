import type { Sinal } from "@/lib/sinais/tipos";

// Sinais-semente do MVP. Edição = editar este arquivo (dados de demonstração).
// Regra do projeto: número de tendência inventado mora no seed, nunca no componente.
export const SINAIS_SEMENTE: Sinal[] = [
  {
    id: "saia-midi-plissada",
    titulo: "Saia midi plissada",
    categoria: "Saias",
    forca: 82,
    direcao: "em-alta",
    fonte: "redes",
    contexto:
      "Buscas e salvamentos crescendo entre criadoras de moda no Sudeste; aparece em looks de transição de estação.",
    nichos: ["feminino", "plus"],
    horizonte: "janela de ~6 semanas",
  },
  {
    id: "calca-alfaiataria-fluida",
    titulo: "Calça de alfaiataria fluida",
    categoria: "Alfaiataria",
    forca: 76,
    direcao: "em-alta",
    fonte: "publico-loja",
    contexto:
      "Clientes da sua faixa de ticket experimentando mais peças de caimento solto nas últimas semanas.",
    nichos: ["feminino", "masculino", "plus"],
    horizonte: "janela de ~8 semanas",
  },
  {
    id: "tricot-canelado",
    titulo: "Tricot canelado leve",
    categoria: "Malharia",
    forca: 68,
    direcao: "estavel",
    fonte: "fornecedor",
    contexto:
      "Dois fornecedores bem pontuados reforçando a grade; giro consistente, sem pico — aposta de base.",
    nichos: ["feminino", "masculino"],
    horizonte: "janela de ~10 semanas",
  },
  {
    id: "vestido-chemise",
    titulo: "Vestido chemise",
    categoria: "Vestidos",
    forca: 64,
    direcao: "em-alta",
    fonte: "redes",
    contexto:
      "Formato versátil ganhando tração em conteúdos de 'looks de trabalho'; combina com sua curadoria.",
    nichos: ["feminino", "plus"],
    horizonte: "janela de ~5 semanas",
  },
  {
    id: "conjunto-fitness-canelado",
    titulo: "Conjunto fitness canelado",
    categoria: "Activewear",
    forca: 71,
    direcao: "em-alta",
    fonte: "redes",
    contexto:
      "Tecido canelado dominando vitrines de activewear; alta intenção de compra em público jovem.",
    nichos: ["fitness", "feminino"],
    horizonte: "janela de ~7 semanas",
  },
  {
    id: "camisa-linho-masculina",
    titulo: "Camisa de linho masculina",
    categoria: "Camisaria",
    forca: 58,
    direcao: "estavel",
    fonte: "fornecedor",
    contexto:
      "Demanda sazonal previsível; fornecedores com pronta-entrega e lote mínimo acessível.",
    nichos: ["masculino"],
    horizonte: "janela de ~9 semanas",
  },
  {
    id: "biquini-cortininha",
    titulo: "Biquíni cortininha",
    categoria: "Beachwear",
    forca: 49,
    direcao: "esfriando",
    fonte: "redes",
    contexto:
      "Pico de verão já passou; ainda vende, mas a curva de interesse está cedendo — cuidado com excesso.",
    nichos: ["praia", "feminino"],
    horizonte: "janela curta de ~3 semanas",
  },
  {
    id: "jaqueta-jeans-oversized",
    titulo: "Jaqueta jeans oversized",
    categoria: "Jeanswear",
    forca: 73,
    direcao: "em-alta",
    fonte: "publico-loja",
    contexto:
      "Reentrada sazonal: seu público recompra jeans estruturado quando a temperatura cai.",
    nichos: ["feminino", "masculino", "plus"],
    horizonte: "janela de ~6 semanas",
  },
  {
    id: "conjunto-infantil-moletom",
    titulo: "Conjunto infantil de moletom",
    categoria: "Infantil",
    forca: 61,
    direcao: "estavel",
    fonte: "fornecedor",
    contexto:
      "Básico de inverno com giro confiável; bom para diluir risco no mix da próxima compra.",
    nichos: ["infantil"],
    horizonte: "janela de ~12 semanas",
  },
  {
    id: "colete-alfaiataria",
    titulo: "Colete de alfaiataria",
    categoria: "Alfaiataria",
    forca: 44,
    direcao: "esfriando",
    fonte: "redes",
    contexto:
      "Sinal que foi forte e perde fôlego; entra só como complemento de look, não como aposta principal.",
    nichos: ["feminino"],
    horizonte: "janela curta de ~4 semanas",
  },
];

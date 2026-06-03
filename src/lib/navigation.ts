// Fonte única das 3 camadas do TREND. Usada na navegação do produto e na landing.
export type Camada = {
  href: string;
  rotulo: string; // verbo de produto (o que a lojista faz)
  camada: string; // nome da camada do método
  resumo: string; // frase curta de apoio
};

export const CAMADAS: Camada[] = [
  {
    href: "/app/descobrir",
    rotulo: "Descobrir",
    camada: "Sinal",
    resumo: "Detecção de sinal de tendência em formação, num só lugar.",
  },
  {
    href: "/app/corrigir",
    rotulo: "Corrigir",
    camada: "Decisão",
    resumo: "O quê e quanto comprar, com score explicável e quantidade recomendada.",
  },
  {
    href: "/app/blindar",
    rotulo: "Blindar",
    camada: "Execução",
    resumo: "Pré-venda antes de pagar o lote e compra coletiva para furar o lote mínimo.",
  },
];

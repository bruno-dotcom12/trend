// Fonte única das 3 camadas do TREND. Usada na navegação, na trilha guiada,
// no cabeçalho de cada tela e na landing. Mude aqui e propaga para todo o site.
export type Camada = {
  href: string;
  passo: 1 | 2 | 3;
  rotulo: string; // nome direto (o que a lojista faz) — o nome principal na UI
  legenda: string; // nome do método, discreto (Sinal / Decisão / Execução)
  resumo: string; // uma linha de apoio (trilha, próximo passo, landing)
  comoFunciona: {
    oQueE: string;
    porQue: string;
    oQueFazer: string;
  };
};

export const CAMADAS: Camada[] = [
  {
    href: "/app/descobrir",
    passo: 1,
    rotulo: "Descobrir tendências",
    legenda: "Sinal",
    resumo: "Veja as tendências em formação para o seu público.",
    comoFunciona: {
      oQueE:
        "Sinais de tendência em formação — reunidos do público da sua loja, das redes e dos fornecedores bem pontuados, num só lugar.",
      porQue:
        "Você vê a tendência nascendo, em vez de comprar depois que todo mundo já comprou. É sinal detectado, não previsão.",
      oQueFazer:
        "Explore os sinais e filtre pelo seu nicho. No próximo passo eles viram decisão de compra.",
    },
  },
  {
    href: "/app/decidir",
    passo: 2,
    rotulo: "Decidir o que comprar",
    legenda: "Decisão",
    resumo: "Receba o score e a quantidade certa para cada peça.",
    comoFunciona: {
      oQueE:
        "Para cada peça candidata, um score de 0 a 100 com os 3 motivos por trás e a quantidade recomendada para o seu público e o seu caixa.",
      porQue:
        "Tira o achismo da compra: o cálculo é determinístico (mesma entrada, mesmo resultado) — uma instrução baseada nos dados, não um palpite.",
      oQueFazer:
        "Compare as peças pelo score e pelos motivos, e veja quantas unidades cabem no seu capital. Leve as escolhidas para o passo de compra.",
    },
  },
  {
    href: "/app/comprar",
    passo: 3,
    rotulo: "Comprar com método",
    legenda: "Execução",
    resumo: "Valide a demanda e fure o lote mínimo sem travar o caixa.",
    comoFunciona: {
      oQueE:
        "Duas formas de comprar reduzindo a exposição do caixa: pré-venda (reserva antes de pagar) e compra coletiva (pedido junto com outras lojas).",
      porQue:
        "O capital só sai quando o risco já caiu — você valida a demanda antes de pagar o lote e fura o lote mínimo sem comprar tudo sozinha.",
      oQueFazer:
        "Abra uma pré-venda para testar a demanda e entre numa compra coletiva para furar o lote mínimo. Acompanhe o progresso no Início.",
    },
  },
];

// Próxima camada da jornada (ou null se já está no último passo).
export function proximaCamada(passo: number): Camada | null {
  return CAMADAS.find((c) => c.passo === passo + 1) ?? null;
}

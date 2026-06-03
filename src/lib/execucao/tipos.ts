// Camada EXECUÇÃO (o diferencial): pré-venda e compra coletiva. Tudo mock/seed
// nesta fatia; a participação do usuário é persistida localmente (ver store.ts).

export type PreVenda = {
  id: string;
  pecaId: string;
  titulo: string;
  categoria: string;
  meta: number; // lojistas necessárias para validar a demanda e liberar o lote
  interessadosBase: number; // lojistas que já reservaram (demonstração)
  lojasBase: string[]; // nomes de lojistas já participantes (demonstração)
  prazo: string; // texto curto (ex.: "fecha em 5 dias")
};

export type CompraColetiva = {
  id: string;
  pecaId: string;
  titulo: string;
  categoria: string;
  loteMinimo: number; // unidades necessárias para furar o lote
  unidadesBase: number; // unidades já compromissadas por outras lojas
  lojasBase: string[]; // lojas já participantes (demonstração)
  precoUnitario: number; // preço de atacado por unidade na coletiva
  prazo: string;
};

import { CamadaHeader, EmBreve } from "@/components/camada-header";

export default function BlindarPage() {
  return (
    <div>
      <CamadaHeader
        camada="Execução"
        titulo="Blindar"
        descricao="O diferencial: pré-venda antes de pagar o lote e compra coletiva entre marcas para furar o lote mínimo — capital protegido antes da compra."
      />
      <EmBreve>
        A pré-venda e a compra coletiva (com barra de progresso até o lote
        mínimo) chegam na Fatia 4.
      </EmBreve>
    </div>
  );
}

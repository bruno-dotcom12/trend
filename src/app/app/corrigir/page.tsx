import { CamadaHeader, EmBreve } from "@/components/camada-header";

export default function CorrigirPage() {
  return (
    <div>
      <CamadaHeader
        camada="Decisão"
        titulo="Corrigir"
        descricao="O quê e quanto comprar: cada peça candidata com score explicável (0–100), os 3 motivos e a quantidade recomendada para o público da sua loja."
      />
      <EmBreve>
        A tela de decisão chega na Fatia 3, movida pelo motor determinístico de
        score e quantidade.
      </EmBreve>
    </div>
  );
}

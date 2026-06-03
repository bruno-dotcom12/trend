import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader, EmBreve } from "@/components/camada-header";

export default function DescobrirPage() {
  return (
    <div>
      <CamadaHeader
        camada="Sinal"
        titulo="Descobrir"
        descricao="Detecção de sinal de tendência em formação — do público da sua loja, das redes e dos fornecedores bem pontuados, tudo num só lugar."
      />
      <AvisoPerfil />
      <EmBreve>
        O feed de sinais chega na Fatia 2. Aqui cada sinal terá força e contexto,
        a partir de dados semente editáveis.
      </EmBreve>
    </div>
  );
}

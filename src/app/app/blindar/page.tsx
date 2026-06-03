"use client";

import { AvisoPerfil } from "@/components/aviso-perfil";
import { CamadaHeader } from "@/components/camada-header";
import { CompraColetivaCard } from "@/components/compra-coletiva-card";
import { PreVendaCard } from "@/components/pre-venda-card";
import { quantidadeRecomendada } from "@/lib/engine";
import {
  listarComprasColetivas,
  listarPreVendas,
} from "@/lib/execucao/fonte";
import { useExecucao } from "@/lib/execucao/store";
import { useLoja } from "@/lib/loja/store";
import { listarPecas } from "@/lib/pecas/fonte";

const SUGESTAO_PADRAO = 6; // fallback quando não dá para calcular pelo motor

export default function BlindarPage() {
  const { loja } = useLoja();
  const { estado } = useExecucao();

  const preVendas = listarPreVendas();
  const compras = listarComprasColetivas();
  const pecas = listarPecas();

  const nomeMinhaLoja = loja ? `Minha loja · ${loja.cidade}` : "Minha loja";

  // Sugestão de unidades para a coletiva: reusa o motor pela peça vinculada.
  function sugerirUnidades(pecaId: string): number {
    const peca = pecas.find((p) => p.id === pecaId);
    if (peca && loja) {
      const qtd = quantidadeRecomendada(peca.fatores, {
        ticketMedio: loja.ticketMedio,
        capitalDisponivel: loja.capitalDisponivel,
        loteMinimo: peca.loteMinimo,
      });
      if (qtd > 0) return qtd;
    }
    return SUGESTAO_PADRAO;
  }

  return (
    <div>
      <CamadaHeader
        camada="Execução"
        titulo="Blindar"
        descricao="O diferencial do TREND: valide a demanda com pré-venda antes de pagar o lote e junte pedido com outras lojas para furar o lote mínimo. Capital protegido antes da compra."
      />
      <AvisoPerfil />

      {/* Pré-venda */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Pré-venda
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Reserve antes de comprar — só pague o lote se a demanda existir.
          </p>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {preVendas.map((pv) => (
            <PreVendaCard
              key={pv.id}
              preVenda={pv}
              participo={estado.interesses.includes(pv.id)}
            />
          ))}
        </div>
      </section>

      {/* Compra coletiva */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Compra coletiva
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Junte pedido com outras lojas e fure o lote mínimo sem travar caixa.
          </p>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {compras.map((cc) => (
            <CompraColetivaCard
              key={cc.id}
              compra={cc}
              minhasUnidades={estado.adesoes[cc.id] ?? 0}
              sugestao={sugerirUnidades(cc.pecaId)}
              nomeMinhaLoja={nomeMinhaLoja}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

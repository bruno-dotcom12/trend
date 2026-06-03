"use client";

import { useRef, useState } from "react";
import { Check, FileSpreadsheet, Store, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Provedores de loja/ERP que a lojista poderá conectar para a análise completa.
const PROVEDORES = [
  { id: "olist", nome: "Olist" },
  { id: "bling", nome: "Bling" },
  { id: "nuvemshop", nome: "Nuvemshop" },
];

// "Análise completa da loja": interface para subir planilha de vendas ou conectar
// a loja. A leitura real (parser/integração) entra junto com o backend; aqui é a
// porta de entrada visual do recurso.
export function AnaliseLoja() {
  const [arquivo, setArquivo] = useState<string | null>(null);
  const [recebida, setRecebida] = useState(false);
  const [provedor, setProvedor] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function escolher(nome: string | null) {
    setArquivo(nome);
    setRecebida(false);
  }

  function aoSoltar(e: React.DragEvent) {
    e.preventDefault();
    escolher(e.dataTransfer.files?.[0]?.name ?? null);
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FileSpreadsheet className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Análise completa da loja
          </h2>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            Suba sua planilha de vendas (Excel) ou conecte sua loja para uma
            leitura mais precisa do seu público, do seu ticket e do seu giro.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {/* Upload de planilha */}
        <div className="flex flex-col">
          <p className="font-ui text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Planilha de vendas (Excel)
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={aoSoltar}
            className="mt-3 flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-background/50 px-4 py-7 text-center transition-colors hover:border-primary"
          >
            <UploadCloud className="size-7 text-primary" aria-hidden />
            <span className="font-ui text-sm font-semibold text-foreground">
              {arquivo ?? "Arraste sua planilha ou clique para escolher"}
            </span>
            <span className="font-body text-xs text-muted-foreground">
              Formatos .xlsx, .xls ou .csv
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => escolher(e.target.files?.[0]?.name ?? null)}
          />
          <Button
            type="button"
            className="mt-3"
            disabled={!arquivo || recebida}
            onClick={() => setRecebida(true)}
          >
            {recebida ? (
              <>
                <Check className="size-4" aria-hidden />
                Planilha recebida
              </>
            ) : (
              "Enviar para análise"
            )}
          </Button>
        </div>

        {/* Conectar loja / ERP */}
        <div className="flex flex-col">
          <p className="font-ui text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Conectar sua loja
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {PROVEDORES.map((p) => {
              const ativo = provedor === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvedor(ativo ? null : p.id)}
                  aria-pressed={ativo}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors",
                    ativo
                      ? "border-primary bg-primary/5"
                      : "border-input bg-background/50 hover:border-primary",
                  )}
                >
                  <span className="flex items-center gap-2 font-ui text-sm font-semibold text-foreground">
                    <Store className="size-4 text-primary" aria-hidden />
                    {p.nome}
                  </span>
                  <span className="font-ui text-xs font-semibold text-primary">
                    {ativo ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="size-3.5" aria-hidden />
                        selecionada
                      </span>
                    ) : (
                      "Conectar"
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

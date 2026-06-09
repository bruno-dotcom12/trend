"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, ShoppingBag, Store, X } from "lucide-react";

import { CAMADAS } from "@/lib/navigation";
import { useLoja } from "@/lib/loja/store";
import { useSelecao } from "@/lib/selecao/store";
import { cn } from "@/lib/utils";

// Itens de navegação das áreas. No desktop usamos o rótulo curto (1ª palavra)
// para caber numa linha; no menu mobile mostramos o nome completo.
const ITENS = [
  { href: "/app", curto: "Início", completo: "Início", exato: true },
  ...CAMADAS.map((c) => ({
    href: c.href,
    curto: c.rotulo.split(" ")[0],
    completo: c.rotulo,
    exato: false,
  })),
];

// Cabeçalho do produto: logo + navegação das 3 camadas (Descobrir / Decidir /
// Comprar). Em telas pequenas a navegação vira um menu retrátil para não
// estourar a largura.
export function SiteNav() {
  const pathname = usePathname();
  const { loja, carregada } = useLoja();
  const { selecionados, carregada: selecaoCarregada } = useSelecao();
  const perfilAtivo = pathname.startsWith("/app/onboarding");
  const nSelecao = selecionados.length;
  const [aberto, setAberto] = useState(false);

  const estaAtivo = (href: string, exato: boolean) =>
    exato ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 text-foreground backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
          onClick={() => setAberto(false)}
          className="ops-mono shrink-0 text-sm font-semibold uppercase tracking-[0.34em] text-foreground"
        >
          TREND
        </Link>

        {/* Navegação das áreas — só desktop (md+) */}
        <nav className="hidden items-center gap-1 md:flex">
          {ITENS.map((it) => {
            const ativo = estaAtivo(it.href, it.exato);
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 font-ui text-sm font-semibold transition-colors",
                  ativo
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {it.href === "/app" && (
                  <LayoutDashboard className="size-4" aria-hidden />
                )}
                {it.curto}
              </Link>
            );
          })}
        </nav>

        {/* Ações à direita: seleção (sempre) + perfil (desktop) + menu (mobile) */}
        <div className="flex items-center gap-1.5">
          {/* Minha seleção: o carrinho que atravessa as 3 camadas */}
          <Link
            href="/app/comprar"
            title="Minha seleção"
            aria-label="Minha seleção"
            onClick={() => setAberto(false)}
            className={cn(
              "relative flex items-center gap-2 rounded-md px-3 py-1.5 font-ui text-sm font-semibold transition-colors",
              pathname.startsWith("/app/comprar")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <ShoppingBag className="size-4" aria-hidden />
            <span className="hidden sm:inline">Minha seleção</span>
            {selecaoCarregada && nSelecao > 0 && (
              <span className="flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-accent-foreground">
                {nSelecao}
              </span>
            )}
          </Link>

          {/* Chip do perfil: visível a partir de md (no mobile vai pro menu) */}
          <Link
            href="/app/onboarding"
            aria-current={perfilAtivo ? "page" : undefined}
            className={cn(
              "hidden items-center gap-2 rounded-md px-3 py-1.5 font-ui transition-colors md:flex",
              perfilAtivo ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            <Store className="size-4 text-accent" aria-hidden />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground">
                Minha loja
              </span>
              <span className="text-[11px] text-muted-foreground">
                {!carregada
                  ? "…"
                  : loja
                    ? `${loja.cidade} · ${loja.uf}`
                    : "completar perfil"}
              </span>
            </span>
          </Link>

          {/* Botão do menu — só mobile */}
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {aberto ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Menu retrátil mobile */}
      {aberto && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {ITENS.map((it) => {
            const ativo = estaAtivo(it.href, it.exato);
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setAberto(false)}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2.5 font-ui text-sm font-semibold transition-colors",
                  ativo
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {it.href === "/app" && (
                  <LayoutDashboard className="size-4" aria-hidden />
                )}
                {it.completo}
              </Link>
            );
          })}

          {/* Perfil da loja no menu */}
          <Link
            href="/app/onboarding"
            onClick={() => setAberto(false)}
            aria-current={perfilAtivo ? "page" : undefined}
            className={cn(
              "mt-1 flex items-center gap-2 rounded-md border-t border-border px-3 pb-2 pt-3 font-ui transition-colors",
              perfilAtivo ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Store className="size-4 text-accent" aria-hidden />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground">
                Minha loja
              </span>
              <span className="text-[11px] text-muted-foreground">
                {!carregada
                  ? "…"
                  : loja
                    ? `${loja.cidade} · ${loja.uf}`
                    : "completar perfil"}
              </span>
            </span>
          </Link>
        </nav>
      )}
    </header>
  );
}

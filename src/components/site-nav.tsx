"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Store } from "lucide-react";

import { CAMADAS } from "@/lib/navigation";
import { useLoja } from "@/lib/loja/store";
import { useSelecao } from "@/lib/selecao/store";
import { cn } from "@/lib/utils";

// Itens de navegação das áreas. Rótulo curto (1ª palavra) para caber na faixa.
const ITENS = [
  { href: "/app", rotulo: "Início", inicio: true, exato: true },
  ...CAMADAS.map((c) => ({
    href: c.href,
    rotulo: c.rotulo.split(" ")[0],
    inicio: false,
    exato: false,
  })),
];

// Cabeçalho do produto: logo + navegação das 3 camadas (Descobrir / Decidir /
// Comprar). No desktop tudo numa linha; no mobile o logo + ações ficam em cima
// e as abas viram uma faixa de "pills" sempre visível (rola na horizontal),
// para que quem chega encontre as áreas sem precisar abrir menu.
export function SiteNav() {
  const pathname = usePathname();
  const { loja, carregada } = useLoja();
  const { selecionados, carregada: selecaoCarregada } = useSelecao();
  const perfilAtivo = pathname.startsWith("/app/onboarding");
  const nSelecao = selecionados.length;

  const estaAtivo = (href: string, exato: boolean) =>
    exato ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 text-foreground backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
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
                {it.inicio && <LayoutDashboard className="size-4" aria-hidden />}
                {it.rotulo}
              </Link>
            );
          })}
        </nav>

        {/* Ações à direita: seleção (sempre) + perfil */}
        <div className="flex items-center gap-1.5">
          {/* Minha seleção: o carrinho que atravessa as 3 camadas */}
          <Link
            href="/app/comprar"
            title="Minha seleção"
            aria-label="Minha seleção"
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

          {/* Chip do perfil: completo no desktop, só ícone no mobile */}
          <Link
            href="/app/onboarding"
            aria-current={perfilAtivo ? "page" : undefined}
            title="Minha loja"
            aria-label="Minha loja"
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-1.5 font-ui transition-colors sm:px-3",
              perfilAtivo ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            <Store className="size-4 text-accent" aria-hidden />
            <span className="hidden flex-col leading-tight md:flex">
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
        </div>
      </div>

      {/* Faixa de abas — só mobile (md:hidden). Sempre visível, rola na horizontal. */}
      <nav className="flex gap-1.5 overflow-x-auto border-t border-border px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
        {ITENS.map((it) => {
          const ativo = estaAtivo(it.href, it.exato);
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={ativo ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-ui text-sm font-semibold transition-colors",
                ativo
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {it.inicio && <LayoutDashboard className="size-4" aria-hidden />}
              {it.rotulo}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

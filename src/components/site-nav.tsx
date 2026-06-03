"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Store } from "lucide-react";

import { CAMADAS } from "@/lib/navigation";
import { useLoja } from "@/lib/loja/store";
import { useSelecao } from "@/lib/selecao/store";
import { cn } from "@/lib/utils";

// Cabeçalho do produto: logo + navegação das 3 camadas (Descobrir / Decidir / Comprar).
export function SiteNav() {
  const pathname = usePathname();
  const { loja, carregada } = useLoja();
  const { selecionados, carregada: selecaoCarregada } = useSelecao();
  const perfilAtivo = pathname.startsWith("/app/onboarding");
  const nSelecao = selecionados.length;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-creme"
        >
          TREND
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/app"
            aria-current={pathname === "/app" ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 font-ui text-sm font-semibold transition-colors",
              pathname === "/app"
                ? "bg-primary text-primary-foreground"
                : "text-creme/80 hover:bg-white/10 hover:text-creme",
            )}
          >
            <LayoutDashboard className="size-4" aria-hidden />
            Início
          </Link>
          {CAMADAS.map((c) => {
            const ativo = pathname.startsWith(c.href);
            return (
              <Link
                key={c.href}
                href={c.href}
                aria-current={ativo ? "page" : undefined}
                title={c.legenda}
                className={cn(
                  "rounded-md px-3 py-1.5 font-ui text-sm font-semibold transition-colors",
                  ativo
                    ? "bg-primary text-primary-foreground"
                    : "text-creme/80 hover:bg-white/10 hover:text-creme",
                )}
              >
                {c.rotulo}
              </Link>
            );
          })}
        </nav>

        {/* Minha seleção: o carrinho que atravessa as 3 camadas */}
        <Link
          href="/app/comprar"
          title="Minha seleção"
          className={cn(
            "relative flex items-center gap-2 rounded-md px-3 py-1.5 font-ui text-sm font-semibold transition-colors",
            pathname.startsWith("/app/comprar")
              ? "bg-primary text-primary-foreground"
              : "text-creme/80 hover:bg-white/10 hover:text-creme",
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

        {/* Chip do perfil: mostra a loja salva ou convida a completar */}
        <Link
          href="/app/onboarding"
          aria-current={perfilAtivo ? "page" : undefined}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1.5 font-ui transition-colors",
            perfilAtivo ? "bg-primary text-primary-foreground" : "hover:bg-white/10",
          )}
        >
          <Store className="size-4 text-accent" aria-hidden />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-creme">Minha loja</span>
            <span className="text-[11px] text-creme/60">
              {!carregada
                ? "…"
                : loja
                  ? `${loja.cidade} · ${loja.uf}`
                  : "completar perfil"}
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}

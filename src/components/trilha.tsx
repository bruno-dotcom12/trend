"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

import { CAMADAS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Stepper da jornada: ① Descobrir → ② Decidir → ③ Comprar.
// Some no Início (/app) e no onboarding — lá a jornada já aparece na própria tela.
export function Trilha() {
  const pathname = usePathname();
  const oculto = pathname === "/app" || pathname.startsWith("/app/onboarding");
  if (oculto) return null;

  const passoAtual =
    CAMADAS.find((c) => pathname.startsWith(c.href))?.passo ?? 0;

  return (
    <nav aria-label="Jornada de compra em 3 passos" className="border-b border-border bg-card">
      <ol className="mx-auto flex w-full max-w-6xl items-center px-6 py-3">
        {CAMADAS.map((c, i) => {
          const concluido = c.passo < passoAtual;
          const atual = c.passo === passoAtual;
          return (
            <li key={c.href} className="flex flex-1 items-center">
              <Link
                href={c.href}
                aria-current={atual ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 font-ui text-sm transition-colors",
                  atual
                    ? "bg-primary font-semibold text-primary-foreground"
                    : concluido
                      ? "text-primary hover:bg-primary/10"
                      : "text-muted-foreground hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-xs font-bold",
                    atual
                      ? "bg-primary-foreground/20"
                      : concluido
                        ? "bg-primary/15 text-primary"
                        : "bg-muted",
                  )}
                >
                  {concluido ? <Check className="size-3" aria-hidden /> : c.passo}
                </span>
                <span className="hidden sm:inline">{c.rotulo}</span>
              </Link>
              {i < CAMADAS.length - 1 && (
                <span className="mx-1 h-px flex-1 bg-border sm:mx-2" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

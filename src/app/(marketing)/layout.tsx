import type { ReactNode } from "react";

// A landing veste a pele "OPS" (autoridade corporativa fria + futurista).
// O escopo .trend-ops sobrescreve os tokens de cor/fonte SÓ aqui — o produto
// em /app continua no tema quente da marca.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="trend-ops min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}

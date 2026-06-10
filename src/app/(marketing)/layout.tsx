import type { ReactNode } from "react";

import { Navbar } from "@/components/landing/navbar";
import { RolagemSuave } from "@/components/landing/rolagem-suave";

// A landing veste a pele "OPS" (autoridade corporativa fria + futurista).
// O escopo .trend-ops sobrescreve os tokens de cor/fonte SÓ aqui — o produto
// em /app continua no tema quente da marca.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <RolagemSuave>
      <div className="trend-ops min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
      </div>
    </RolagemSuave>
  );
}

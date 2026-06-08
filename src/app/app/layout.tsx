import { SiteNav } from "@/components/site-nav";

// Shell do produto: cabeçalho fixo + conteúdo. Cada área é independente —
// sem trilha guiada nem passos numerados.
// O perfil da loja (mock) é lido via hook useLoja(), sem provider.
export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // .trend-ops: mesma pele fria (branco/ciano/Geist) da landing, agora no produto.
    <div className="trend-ops flex min-h-full flex-col bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {children}
      </main>
    </div>
  );
}

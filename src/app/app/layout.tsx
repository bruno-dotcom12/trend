import { SiteNav } from "@/components/site-nav";

// Shell do produto: cabeçalho fixo com as 3 camadas + área de conteúdo.
// O perfil da loja (mock) é lido via hook useLoja(), sem provider.
export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {children}
      </main>
    </div>
  );
}

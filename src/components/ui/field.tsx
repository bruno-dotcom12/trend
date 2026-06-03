import { cn } from "@/lib/utils";

// Componentes de formulário enxutos (nativos) para o onboarding.
// Estilo casado com o tema da marca; sem dependências extras.

export function Field({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "font-ui text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Hint({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export function ErroCampo({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-ui text-xs font-medium text-destructive", className)}
      {...props}
    />
  );
}

const baseControle =
  "h-10 w-full rounded-lg border border-input bg-card px-3 font-ui text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:ring-destructive/20";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(baseControle, className)} {...props} />;
}

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(baseControle, "appearance-none pr-8", className)} {...props} />
  );
}

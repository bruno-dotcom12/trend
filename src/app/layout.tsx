import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import "./globals.css";

// Títulos display: serifada elegante (itálico nos subtítulos)
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Corpo de reportagem: serifada legível
const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
});

// UI / rótulos
const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TREND — pare de apostar no escuro",
  description:
    "Infraestrutura operacional para a lojista multimarca: detecção de sinal, decisão de compra e execução (pré-venda + compra coletiva).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

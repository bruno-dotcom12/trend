import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Títulos display: serifada elegante (itálico nos subtítulos) — usada no PRODUTO
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Corpo de reportagem: serifada legível — usada no PRODUTO
const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
});

// UI / rótulos — usada no PRODUTO
const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
});

// Grotesca fria + mono de dados: identidade "ops" da LANDING (autoridade corporativa)
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${playfair.variable} ${lora.variable} ${inter.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

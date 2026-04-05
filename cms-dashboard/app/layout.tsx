import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMS Dashboard",
  description: "Painel de gerenciamento de conteúdo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full dark">
      <body className="h-full bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}

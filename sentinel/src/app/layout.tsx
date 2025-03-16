import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/CompHeader/CompHeader";
import Footer from "./components/CompFooter/CompFooter";

// Metadados da aplicação
export const metadata: Metadata = {
  title: "Sentinel",
  description: "Sistema de gerenciamento de ocorrências da CCR",
};

// Layout principal que envolve toda a aplicação
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

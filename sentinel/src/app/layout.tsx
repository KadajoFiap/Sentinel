import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";

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
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

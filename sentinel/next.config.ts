import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Gera o site estático automaticamente
  images: {
    unoptimized: true, // Evita erro de otimização de imagens no GitHub Pages
  },
  basePath: "/sentinel", // Substitua pelo nome real do repositório
};

export default nextConfig;

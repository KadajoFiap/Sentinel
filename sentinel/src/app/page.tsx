'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './contexts/AuthContext';
import Link from 'next/link';
import CompRelatoriosHomepage from './components/CompRelatorios/CompRelatoriosHomepage';
import CompOcorrenciasHomepage from './components/CompOcorrencias/CompOcorrenciasHomepage';

interface Ocorrencia {
  id: number;
  data: string;
  descricao: string;
  status: string;
}

interface Relatorio {
  id: number;
  nome: string;
  razao: string;
  data: string;
}

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([
    { id: 1, data: '10/03/2024', descricao: 'Descrição inicial', status: 'Em andamento' }
  ]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([
    { id: 1, nome: "Mar/2024", razao: "3/5", data: "01/03/2024" }
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/Login');
    }
  }, [isLoggedIn, router]);

  return (
    <div className='min-h-screen bg-[#f4f4f4] pt-30 pl-10 pr-10 lg:pl-20 lg:pr-20 md:pl-15 md:pr-15 pb-10'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[30px] font-medium">Sentinel</h1>
      </div>

      {/* Ocorrências */}
      <CompOcorrenciasHomepage ocorrencias={ocorrencias} />

      {/* Relatórios */}
      <CompRelatoriosHomepage relatorios={relatorios} />
    </div>
  );
}
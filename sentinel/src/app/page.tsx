'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './contexts/AuthContext';
import Link from 'next/link';

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
    <div className='min-h-screen bg-[#f4f4f4] pt-30 ps-10 pe-10 pb-10'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[30px] font-medium">Sentinel</h1>
      </div>

      {/* Ocorrências */}
      <div className="bg-white rounded-lg shadow-md min-h-[280px] max-h-[280px] flex flex-col mb-8">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Ocorrências Recentes</h2>
          <Link 
            href="/Ocorrencias"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            Ver todas
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">ID</th>
                <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Data</th>
                <th className="w-[45%] px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Descrição</th>
                <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Status</th>
              </tr>
            </thead>
            <tbody>
              {ocorrencias.slice(0, 5).map((ocorrencia) => (
                <tr key={ocorrencia.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{String(ocorrencia.id).padStart(3, '0')}</td>
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.data}</td>
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.descricao}</td>
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Relatórios */}
      <div className="bg-white rounded-lg shadow-md min-h-[280px] max-h-[280px] flex flex-col">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Relatórios Recentes</h2>
          <Link 
            href="/Relatorios"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            Ver todos
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">ID</th>
                <th className="w-[35%] px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Nome</th>
                <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Razão</th>
                <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Data</th>
              </tr>
            </thead>
            <tbody>
              {relatorios.slice(0, 5).map((relatorio) => (
                <tr key={relatorio.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{String(relatorio.id).padStart(3, '0')}</td>
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{relatorio.nome}</td>
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{relatorio.razao}</td>
                  <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{relatorio.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
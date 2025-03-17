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
        
        <div className="flex-1 overflow-auto px-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">ID</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Data</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ocorrencias.slice(0, 5).map((ocorrencia) => (
                <tr key={ocorrencia.id} className="hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900">{String(ocorrencia.id).padStart(3, '0')}</td>
                  <td className="py-4 text-sm text-gray-500">{ocorrencia.data}</td>
                  <td className="py-4 text-sm text-gray-900">{ocorrencia.descricao}</td>
                  <td className="py-4 text-sm text-gray-500">{ocorrencia.status}</td>
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
        
        <div className="flex-1 overflow-auto px-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">ID</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Razão</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Data</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {relatorios.slice(0, 5).map((relatorio) => (
                <tr key={relatorio.id} className="hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900">{String(relatorio.id).padStart(3, '0')}</td>
                  <td className="py-4 text-sm text-gray-900">{relatorio.nome}</td>
                  <td className="py-4 text-sm text-gray-500">{relatorio.razao}</td>
                  <td className="py-4 text-sm text-gray-500">{relatorio.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
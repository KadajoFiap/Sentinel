import React from 'react';

interface Relatorio {
  id: number;
  nome: string;
  razao: string;
  data: string;
}

interface CompRelatoriosHomepageProps {
  relatorios: Relatorio[];
}

const CompRelatoriosHomepage: React.FC<CompRelatoriosHomepageProps> = ({ relatorios }) => {
  return (
    <div className="bg-white rounded-lg shadow-md min-h-[280px] max-h-[280px] flex flex-col">
      <div className="flex justify-between items-center p-6 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Relatórios Recentes</h2>
        <a 
          href="/Relatorios"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          Ver todos
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <div className="inline-block min-w-full px-6">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px] whitespace-nowrap">ID</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[400px] whitespace-nowrap">Nome</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px] whitespace-nowrap">Razão</th>
                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px] whitespace-nowrap">Data</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {relatorios.slice(0, 5).map((relatorio) => (
                <tr key={relatorio.id} className="hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{String(relatorio.id).padStart(3, '0')}</td>
                  <td className="py-4 text-sm text-gray-900">{relatorio.nome}</td>
                  <td className="py-4 text-sm text-gray-500 whitespace-nowrap">{relatorio.razao}</td>
                  <td className="py-4 text-sm text-gray-500 whitespace-nowrap">{relatorio.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompRelatoriosHomepage; 
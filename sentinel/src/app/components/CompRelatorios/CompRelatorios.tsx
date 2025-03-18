'use client';
import { useState } from 'react';
import CompViewRelatorio from './CompViewRelatorio';

// Interfaces para tipagem dos dados
interface Relatorio {
    id: number;
    nome: string;
    razao: string;
    data: string;
}

interface Ocorrencia {
    id: number;
    data: string;
    descricao: string;
    status: string;
}

const CompRelatorios = () => {
    // Estados para controle do modal de visualização
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRelatorio, setSelectedRelatorio] = useState<Relatorio | null>(null);
    
    // Dados dos relatórios mensais
    const [relatorios, setRelatorios] = useState<Relatorio[]>([
        { 
            id: 1, 
            nome: "Mar/2024",
            razao: "3/5",
            data: "01/03/2024"
        }
    ]);

    // Dados das ocorrências do período
    const [ocorrencias] = useState<Ocorrencia[]>([
        { id: 1, data: '10/03/2024', descricao: 'Ocorrência 1', status: 'Concluído' },
        { id: 2, data: '15/03/2024', descricao: 'Ocorrência 2', status: 'Pendente' },
    ]);

    // Função para gerar e baixar o relatório em formato texto
    const handleDownload = (relatorio: Relatorio) => {
        const conteudoOcorrencias = ocorrencias
            .map(oc => `
Ocorrência #${String(oc.id).padStart(3, '0')}
Data: ${oc.data}
Descrição: ${oc.descricao}
Status: ${oc.status}
-------------------`)
            .join('\n');

        const conteudo = `
Relatório Mensal - ${relatorio.nome}
ID: ${String(relatorio.id).padStart(3, '0')}
Período: ${relatorio.nome}
Razão de Conclusão: ${relatorio.razao}
Data de Geração: ${relatorio.data}

OCORRÊNCIAS DO PERÍODO:
${conteudoOcorrencias}
        `;

        // Criação e download do arquivo
        const blob = new Blob([conteudo], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-${relatorio.nome.toLowerCase().replace('/', '-')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    // Funções de manipulação do modal de visualização
    const handleView = (relatorio: Relatorio) => {
        setSelectedRelatorio(relatorio);
        setIsViewModalOpen(true);
    };

    const getCurrentMonthYear = () => {
        const date = new Date();
        const month = date.toLocaleString('pt-BR', { month: 'short' });
        const year = date.getFullYear();
        return `${month}/${year}`;
    };

    return (
        <>
            <div className="bg-[#f4f4f4] min-h-screen pt-30 pb-10 lg:pb-30 pl-10 pr-10 lg:pl-20 lg:pr-20 md:pl-15 md:pr-15">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[30px] font-medium">Relatórios</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md min-h-[580px] lg:min-h-[800px] 2xl:min-h-[620px] md:min-h-[750px]  flex flex-col mb-4">
                    <div className="flex-1 overflow-auto">
                        <table className="min-w-full table-fixed">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">ID</th>
                                    <th className="w-[35%] px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Nome</th>
                                    <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Razão</th>
                                    <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Data</th>
                                    <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {relatorios.map((relatorio) => (
                                    <tr key={relatorio.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                            {String(relatorio.id).padStart(3, '0')}
                                        </td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                            {relatorio.nome}
                                        </td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                            {relatorio.razao}
                                        </td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                            {relatorio.data}
                                        </td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 flex gap-4">
                                            <button
                                                onClick={() => handleView(relatorio)}
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Ver
                                            </button>
                                            <button
                                                onClick={() => handleDownload(relatorio)}
                                                className="text-green-600 hover:text-green-800 cursor-pointer flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Baixar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedRelatorio && (
                <CompViewRelatorio
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedRelatorio(null);
                    }}
                    relatorio={selectedRelatorio}
                    ocorrencias={ocorrencias}
                />
            )}
        </>
    );
};

export default CompRelatorios; 
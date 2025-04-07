'use client';
import { useState } from 'react';
import ViewRelatorio from './ViewRelatorio';
import BotaoPadrao from '../Botao/Botao';

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
    videoUrl?: string;
}

const Relatorios = () => {
    // Estados para controle do modal de visualização
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRelatorio, setSelectedRelatorio] = useState<Relatorio | null>(null);
    
    const getCurrentMonthYear = () => {
        const date = new Date();
        const month = date.toLocaleString('pt-BR', { month: 'short' });
        const year = date.getFullYear();
        return `${month}/${year}`;
    };

    // Dados dos relatórios mensais
    const [relatorios] = useState<Relatorio[]>([
        { 
            id: 1, 
            nome: getCurrentMonthYear(),
            razao: "3/5",
            data: new Date().toLocaleDateString('pt-BR')
        }
    ]);

    // Dados das ocorrências do período
    const [ocorrencias] = useState<Ocorrencia[]>([
        { 
            id: 1, 
            data: '10/03/2024', 
            descricao: 'Ocorrência 1', 
            status: 'Concluído',
            videoUrl: 'https://www.youtube.com/embed/DDh6Y4fsJeg'
        },
        { 
            id: 2, 
            data: '15/03/2024', 
            descricao: 'Ocorrência 2', 
            status: 'Pendente',
            videoUrl: 'https://www.youtube.com/embed/DDh6Y4fsJeg'
        },
    ]);

    // Função para gerar e baixar o relatório em formato JSON
    const handleDownload = (relatorio: Relatorio) => {
        const relatorioJSON = {
            id: relatorio.id,
            nome: relatorio.nome,
            razao: relatorio.razao,
            data: relatorio.data,
            ocorrencias: ocorrencias.map(oc => ({
                id: oc.id,
                data: oc.data,
                descricao: oc.descricao,
                status: oc.status
            }))
        };

        // Criação e download do arquivo JSON
        const blob = new Blob([JSON.stringify(relatorioJSON, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-${relatorio.nome.toLowerCase().replace('/', '-')}.json`;
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

    return (
        <>
            <div className="bg-[#f4f4f4] min-h-screen pt-30 pb-30 pl-10 pr-10 lg:pl-20 lg:pr-20 md:pl-15 md:pr-15">
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
                                {relatorios.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 h-16 text-center text-gray-500">
                                            Nenhum relatório disponível
                                        </td>
                                    </tr>
                                ) : (
                                    relatorios.map((relatorio) => (
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
                                            <td className="px-6 py-4 h-16 text-sm text-gray-500">
                                                <div className="flex gap-4">
                                                    <BotaoPadrao 
                                                        onClick={() => handleView(relatorio)}
                                                        icon="view"
                                                        type="view"
                                                    >
                                                        Ver Relatório
                                                    </BotaoPadrao>
                                                    <BotaoPadrao
                                                        onClick={() => handleDownload(relatorio)}
                                                        icon="download"
                                                        type="download"
                                                    >
                                                        Baixar
                                                    </BotaoPadrao>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedRelatorio && (
                <ViewRelatorio
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

export default Relatorios; 
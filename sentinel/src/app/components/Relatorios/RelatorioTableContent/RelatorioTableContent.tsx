/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { useState, useEffect } from 'react';
import BotaoPadrao from '../../Botao/Botao';

interface Relatorio {
    id: string;
    nome: string;
    razao: string;
    data: string;
    ocorrencias: any[];
}

interface RelatorioTableContentProps {
    onViewClick: (relatorio: Relatorio) => void;
    onDownloadClick: (relatorio: Relatorio) => void;
}

interface Stats {
    abertas: number;
    andamento: number;
    resolvidas: number;
}

const fetchOcorrenciaStats = async (start: string, end: string): Promise<Stats> => {
    const res = await fetch(
        `https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia/stats?start=${start}&end=${end}`,
        { headers: { 'Content-Type': 'application/json' } }
    );
    if (!res.ok) throw new Error('Erro ao buscar estatísticas');
    return res.json();
};

const RelatorioTableContent = ({ onViewClick, onDownloadClick }: RelatorioTableContentProps) => {
    const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetchRelatorios();
        // Definir datas para junho de 2025
        const start = new Date('2025-06-01T00:00:00');
        const end = new Date('2025-06-30T23:59:59');
        const startStr = start.toISOString().slice(0, 10);
        const endStr = end.toISOString().slice(0, 10);
        fetchOcorrenciaStats(startStr, endStr)
            .then(setStats)
            .catch(() => setStats(null));
    }, []);

    const fetchRelatorios = async () => {
        try {
            const response = await fetch('/api/relatorio');
            if (!response.ok) {
                throw new Error('Erro ao carregar relatórios');
            }
            const data = await response.json();
            // Processar os dados antes de definir no estado
            const processedData = data.map((relatorio: any) => ({
                id: relatorio.id || `rel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                nome: relatorio.nome || 'Relatório sem nome',
                razao: relatorio.razao || 'Não especificada',
                data: relatorio.data && !isNaN(new Date(relatorio.data).getTime())
                    ? relatorio.data
                    : new Date().toISOString(),
                ocorrencias: Array.isArray(relatorio.ocorrencias) ? relatorio.ocorrencias : []
            }));
            setRelatorios(processedData);
        } catch (err) {
            setError('Erro ao carregar relatórios. Por favor, tente novamente.');
            console.error('Erro ao carregar relatórios:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Data inválida';
        }
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="flex-1 overflow-auto">
                <table className="min-w-full table-fixed">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="w-[35%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Razão</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                            <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} className="px-6 py-4 h-16 text-center text-gray-500">
                                Carregando...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 overflow-auto">
                <table className="min-w-full table-fixed">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="w-[35%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Razão</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                            <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} className="px-6 py-4 h-16 text-center text-red-500">
                                {error}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto">
            {/* Estatísticas de ocorrências */}
            {stats && (
                <div className="flex gap-8 p-4 bg-gray-50 rounded-md mb-4">
                    <div className="text-sm text-gray-700">Abertas: <span className="font-bold">{stats.abertas}</span></div>
                    <div className="text-sm text-gray-700">Em andamento: <span className="font-bold">{stats.andamento}</span></div>
                    <div className="text-sm text-gray-700">Resolvidas: <span className="font-bold">{stats.resolvidas}</span></div>
                </div>
            )}
            <table className="min-w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                        <th className="w-[35%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                        <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Razão</th>
                        <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                        <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {relatorios.map((relatorio) => (
                        <tr key={relatorio.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                {relatorio.id}
                            </td>
                            <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                {relatorio.nome}
                            </td>
                            <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                {relatorio.razao}
                            </td>
                            <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                {formatDate(relatorio.data)}
                            </td>
                            <td className="px-6 py-4 h-16 text-sm text-gray-500">
                                <div className="flex gap-4">
                                    <BotaoPadrao 
                                        onClick={() => onViewClick(relatorio)}
                                        icon="view"
                                        type="view"
                                    >
                                        Ver Relatório
                                    </BotaoPadrao>
                                    <BotaoPadrao
                                        onClick={() => onDownloadClick(relatorio)}
                                        icon="download"
                                        type="download"
                                    >
                                        Baixar
                                    </BotaoPadrao>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {relatorios.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 h-16 text-center text-gray-500">
                                Nenhum relatório disponível
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RelatorioTableContent; 
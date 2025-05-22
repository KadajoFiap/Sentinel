'use client';
import { useState, useEffect } from 'react';
import Evidencia from '../Evidencia/Evidencia';

interface Ocorrencia {
    id: number;
    dataInicio: string;
    dataFim: string | null;
    tipoOcorrencia: string;
    descricaoOcorrencia: string | null;
    severidadeOcorrencia: number;
    cco: { id: number };
    estacao: { id: number };
    statusOcorrencia: string;
}

interface ApiOcorrencia {
    id: number;
    dataInicio: string;
    dataFim: string | null;
    tipoOcorrencia: string;
    descricaoOcorrencia: string | null;
    severidadeOcorrencia: number;
    cco: { id: number };
    estacao: { id: number };
    statusOcorrencia: string;
}

interface OcorrenciaTableContentProps {
    onEditClick: (ocorrencia: Ocorrencia) => void;
    key?: string;
}

const convertApiResponse = (apiOcorrencia: ApiOcorrencia): Ocorrencia => {
    console.log('Convertendo ocorrência:', apiOcorrencia);
    const converted = {
        id: apiOcorrencia?.id ?? 0,
        dataInicio: apiOcorrencia?.dataInicio ?? '',
        dataFim: apiOcorrencia?.dataFim ?? null,
        tipoOcorrencia: apiOcorrencia?.tipoOcorrencia ?? '',
        descricaoOcorrencia: apiOcorrencia?.descricaoOcorrencia ?? null,
        severidadeOcorrencia: apiOcorrencia?.severidadeOcorrencia ?? 0,
        cco: apiOcorrencia?.cco ?? { id: 0 },
        estacao: apiOcorrencia?.estacao ?? { id: 0 },
        statusOcorrencia: apiOcorrencia?.statusOcorrencia ?? ''
    };
    console.log('Ocorrência convertida:', converted);
    return converted;
};

const OcorrenciaTableContent = ({ onEditClick }: OcorrenciaTableContentProps) => {
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('useEffect rodou');
        fetchOcorrencias();
    }, []);

    const fetchOcorrencias = async () => {
        console.log('fetchOcorrencias chamada');
        try {
            const response = await fetch('/api/ocorrencia', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao carregar ocorrências: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            console.log('API data recebida:', data);
            
            if (Array.isArray(data)) {
                const ocorrenciasValidas = data
                    .map(convertApiResponse)
                    .filter(oc => oc && oc.id > 0);
                console.log('Ocorrências convertidas:', ocorrenciasValidas);
                setOcorrencias(ocorrenciasValidas);
            } else {
                console.log('Dados recebidos não são um array:', data);
                setOcorrencias([]);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao carregar ocorrências';
            setError(errorMessage);
            console.error('Erro detalhado ao carregar ocorrências:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 overflow-auto">
                <table className="min-w-full table-fixed">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="w-[30%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Descrição</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="w-28 px-6 py-3 text-left text-sm font-semibold text-gray-600">Grau</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Evidência</th>
                            <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7} className="px-6 py-4 h-16 text-center text-gray-500">
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
                            <th className="w-[30%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Descrição</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="w-28 px-6 py-3 text-left text-sm font-semibold text-gray-600">Grau</th>
                            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Evidência</th>
                            <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7} className="px-6 py-4 h-16 text-center text-red-500">
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
            <table className="min-w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                        <th className="w-[30%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Descrição</th>
                        <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                        <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                        <th className="w-28 px-6 py-3 text-left text-sm font-semibold text-gray-600">Grau</th>
                        <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600">Evidência</th>
                        <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {ocorrencias
                      .filter(ocorrencia => ocorrencia && ocorrencia.id > 0)
                      .map((ocorrencia) => (
                        <tr key={ocorrencia.id} className="hover:bg-gray-50">
                          <td className="pl-8 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {ocorrencia.id}
                          </td>
                          <td className="py-4 text-sm text-gray-500 whitespace-nowrap">
                            {ocorrencia.tipoOcorrencia}
                          </td>
                          <td className="py-4 text-sm text-gray-500 whitespace-nowrap">
                            {ocorrencia.dataInicio && !isNaN(new Date(ocorrencia.dataInicio).getTime())
                              ? new Date(ocorrencia.dataInicio).toLocaleString()
                              : 'Data inválida'}
                          </td>
                          <td className="py-4 text-sm text-gray-900">{ocorrencia.statusOcorrencia}</td>
                          <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                            {ocorrencia.severidadeOcorrencia === 1 ? 'Baixa' : 
                             ocorrencia.severidadeOcorrencia === 2 ? 'Média' : 'Alta'}
                          </td>
                          <td className="px-6 py-4 h-16 text-sm text-gray-500">
                            <Evidencia 
                              videoUrl="https://www.youtube.com/embed/teCLp2DxwBw"
                              titulo={`Evidência da Ocorrência ${ocorrencia.id}`} 
                            />
                          </td>
                          <td className="px-6 py-4 h-16 text-sm text-gray-500">
                            <div className="flex gap-2">
                              <button
                                onClick={() => onEditClick(ocorrencia)}
                                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              >
                                Editar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {ocorrencias.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 h-16 text-center text-gray-500">
                                Nenhuma ocorrência registrada
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OcorrenciaTableContent; 
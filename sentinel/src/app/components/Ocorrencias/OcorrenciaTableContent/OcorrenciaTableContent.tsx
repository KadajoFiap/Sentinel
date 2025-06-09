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
    ID_OCORRENCIA: number;
    DATA_INICIO: string;
    DATA_FIM: string | null;
    TIPO_OCORRENCIA: string;
    DESCRICAO_OCORRENCIA: string | null;
    SEVERIDADE_OCORRENCIA: number;
    FK_CCO_ID_CCO: number;
    FK_ESTACAO_ID_ESTACAO: number;
    STATUS_OCORRENCIA: string;
}

interface OcorrenciaTableContentProps {
    onEditClick: (ocorrencia: Ocorrencia) => void;
    key?: string;
}

const convertApiResponse = (apiOcorrencia: ApiOcorrencia): Ocorrencia => {
    if (!apiOcorrencia) {
        throw new Error('Dados da ocorrência inválidos');
    }

    return {
        id: apiOcorrencia.ID_OCORRENCIA,
        dataInicio: apiOcorrencia.DATA_INICIO,
        dataFim: apiOcorrencia.DATA_FIM,
        tipoOcorrencia: apiOcorrencia.TIPO_OCORRENCIA,
        descricaoOcorrencia: apiOcorrencia.DESCRICAO_OCORRENCIA,
        severidadeOcorrencia: apiOcorrencia.SEVERIDADE_OCORRENCIA,
        cco: { id: apiOcorrencia.FK_CCO_ID_CCO },
        estacao: { id: apiOcorrencia.FK_ESTACAO_ID_ESTACAO },
        statusOcorrencia: apiOcorrencia.STATUS_OCORRENCIA
    };
};

const OcorrenciaTableContent = ({ onEditClick }: OcorrenciaTableContentProps) => {
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOcorrencias();
    }, []);

    const fetchOcorrencias = async () => {
        try {
            setIsLoading(true);
            setError('');

            const response = await fetch('/api/ocorrencia', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message || 
                    `Erro ao carregar ocorrências: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            
            if (!Array.isArray(data)) {
                throw new Error('Formato de dados inválido: esperado um array de ocorrências');
            }

            const ocorrenciasValidas = data
                .filter((item): item is ApiOcorrencia => {
                    return (
                        item &&
                        typeof item.ID_OCORRENCIA === 'number' &&
                        typeof item.TIPO_OCORRENCIA === 'string' &&
                        typeof item.STATUS_OCORRENCIA === 'string'
                    );
                })
                .map(convertApiResponse)
                .filter(oc => oc.id > 0);

            setOcorrencias(ocorrenciasValidas);
        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : 'Erro ao carregar ocorrências. Por favor, tente novamente mais tarde.';
            setError(errorMessage);
            console.error('Erro ao carregar ocorrências:', err);
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
                            <th className="w-[30%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Tipo Ocorrência</th>
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
                        <th className="w-[30%] px-6 py-3 text-left text-sm font-semibold text-gray-600">Tipo Ocorrência</th>
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
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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

const OcorrenciasHomepage: React.FC = () => {
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOcorrencias();
    }, []);

    const fetchOcorrencias = async () => {
        try {
            const response = await fetch('/api/ocorrencia');
            if (!response.ok) {
                throw new Error('Erro ao carregar ocorrências');
            }
            const data = await response.json();
            console.log('Dados recebidos:', data);
            
            if (Array.isArray(data)) {
                const ocorrenciasValidas = data.map(apiOcorrencia => ({
                    id: apiOcorrencia.ID_OCORRENCIA,
                    dataInicio: apiOcorrencia.DATA_INICIO,
                    dataFim: apiOcorrencia.DATA_FIM,
                    tipoOcorrencia: apiOcorrencia.TIPO_OCORRENCIA,
                    descricaoOcorrencia: apiOcorrencia.DESCRICAO_OCORRENCIA,
                    severidadeOcorrencia: apiOcorrencia.SEVERIDADE_OCORRENCIA,
                    cco: { id: apiOcorrencia.FK_CCO_ID_CCO },
                    estacao: { id: apiOcorrencia.FK_ESTACAO_ID_ESTACAO },
                    statusOcorrencia: apiOcorrencia.STATUS_OCORRENCIA
                })).filter(oc => oc && oc.id > 0);
                setOcorrencias(ocorrenciasValidas);
            } else {
                setOcorrencias([]);
            }
        } catch (err) {
            setError('Erro ao carregar ocorrências. Por favor, tente novamente.');
            console.error('Erro ao carregar ocorrências:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md min-h-[280px] max-h-[280px] lg:min-h-[310px] lg:max-h-[310px] md:min-h-[410px] md:max-h-[410px] flex flex-col mb-8">
            <div className="flex justify-between items-center p-6 pb-4">
                <h2 className="text-xl font-semibold text-gray-800">Ocorrências Recentes</h2>
                <Link 
                    href="/ocorrencias"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                    Ver todas
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            
            <div className="flex-1 overflow-x-auto">
                <div className="inline-block min-w-full px-6">
                    <table className="min-w-[800px] w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px] whitespace-nowrap">ID</th>
                                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px] whitespace-nowrap">Data</th>
                                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[400px] whitespace-nowrap pl-8">Tipo Ocorrência</th>
                                <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px] whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        Carregando...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-red-500">
                                        {error}
                                    </td>
                                </tr>
                            ) : ocorrencias.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        Nenhuma ocorrência registrada
                                    </td>
                                </tr>
                            ) : (
                                ocorrencias
                                    .slice(0, 5)
                                    .map((ocorrencia) => (
                                        <tr key={ocorrencia.id} className="hover:bg-gray-50">
                                            <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{ocorrencia.id}</td>
                                            <td className="py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(ocorrencia.dataInicio).toLocaleString()}
                                            </td>
                                            <td className="py-4 text-sm text-gray-900 pl-8">
                                                {ocorrencia.tipoOcorrencia}
                                            </td>
                                            <td className="py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {ocorrencia.statusOcorrencia}
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OcorrenciasHomepage; 
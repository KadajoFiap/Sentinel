'use client';
import { useState, useEffect } from 'react';
import AddOcorrencia from './AddOcorrencia/AddOcorrencia';
import EditOcorrencia from './EditOcorrencia/EditOcorrencia';
import Evidencia from './Evidencia/Evidencia';

interface Ocorrencia {
    ID_OCORRENCIA: string;
    DATA_INICIO: string;
    DATA_FIM: string | null;
    TIPO_OCORRENCIA: string;
    SEVERIDADE_OCORRENCIA: number;
    FK_CCO_ID_CCO: number;
    FK_ESTACAO_ID_ESTACAO: number;
    STATUS_OCORRENCIA: string;
}

const Ocorrencias = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [ocorrenciaParaEditar, setOcorrenciaParaEditar] = useState<Ocorrencia | null>(null);
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
            setOcorrencias(data);
        } catch (err) {
            setError('Erro ao carregar ocorrências. Por favor, tente novamente.');
            console.error('Erro ao carregar ocorrências:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddOcorrencia = (novaOcorrencia: Ocorrencia) => {
        setOcorrencias([...ocorrencias, novaOcorrencia]);
    };

    const handleEditClick = (ocorrencia: Ocorrencia) => {
        setOcorrenciaParaEditar(ocorrencia);
        setIsEditModalOpen(true);
    };

    const handleEditOcorrencia = (ocorrenciaAtualizada: Ocorrencia) => {
        setOcorrencias(ocorrencias.map(ocorrencia =>
            ocorrencia.ID_OCORRENCIA === ocorrenciaAtualizada.ID_OCORRENCIA ? ocorrenciaAtualizada : ocorrencia
        ));
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <>
            <div className="bg-[#f4f4f4] min-h-screen pt-30 pb-30 pl-10 pr-10 lg:pl-20 lg:pr-20 md:pl-15 md:pr-15">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[30px] font-medium">Ocorrências</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-y-auto min-h-[580px] max-h-[580px] lg:min-h-[800px] 2xl:min-h-[620px] md:min-h-[750px] flex flex-col mb-4">
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
                                {ocorrencias.map((ocorrencia) => (
                                    <tr key={ocorrencia.ID_OCORRENCIA} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                            {ocorrencia.ID_OCORRENCIA.slice(0, 8)}
                                        </td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.TIPO_OCORRENCIA}</td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{new Date(ocorrencia.DATA_INICIO).toLocaleString()}</td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.STATUS_OCORRENCIA}</td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">
                                            {ocorrencia.SEVERIDADE_OCORRENCIA === 1 ? 'Baixa' : 
                                             ocorrencia.SEVERIDADE_OCORRENCIA === 2 ? 'Média' : 'Alta'}
                                        </td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500">
                                            <Evidencia 
                                                videoUrl="https://www.youtube.com/embed/teCLp2DxwBw"
                                                titulo={`Evidência da Ocorrência ${ocorrencia.ID_OCORRENCIA.slice(0, 8)}`} 
                                            />
                                        </td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditClick(ocorrencia)}
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
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        + Adicionar Ocorrência
                    </button>
                </div>
            </div>

            <AddOcorrencia
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddOcorrencia}
                lastId={ocorrencias.length}
            />

            {ocorrenciaParaEditar && (
                <EditOcorrencia
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setOcorrenciaParaEditar(null);
                    }}
                    onEdit={handleEditOcorrencia}
                    ocorrencia={ocorrenciaParaEditar}
                />
            )}
        </>
    );
};

export default Ocorrencias;

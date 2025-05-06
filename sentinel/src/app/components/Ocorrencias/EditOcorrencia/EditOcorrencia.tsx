'use client';
import { useState, useEffect } from 'react';

interface OcorrenciaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (ocorrencia: OcorrenciaData) => void;
    ocorrencia: OcorrenciaData;
}

interface OcorrenciaData {
    ID_OCORRENCIA: string;
    DATA_INICIO: string;
    DATA_FIM: string | null;
    TIPO_OCORRENCIA: string;
    SEVERIDADE_OCORRENCIA: number;
    FK_CCO_ID_CCO: number;
    FK_ESTACAO_ID_ESTACAO: number;
    STATUS_OCORRENCIA: string;
}

const EditOcorrencia = ({ isOpen, onClose, onEdit, ocorrencia }: OcorrenciaModalProps) => {
    const [formData, setFormData] = useState({
        TIPO_OCORRENCIA: '',
        STATUS_OCORRENCIA: 'Em andamento',
        SEVERIDADE_OCORRENCIA: 1
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (ocorrencia) {
            setFormData({
                TIPO_OCORRENCIA: ocorrencia.TIPO_OCORRENCIA,
                STATUS_OCORRENCIA: ocorrencia.STATUS_OCORRENCIA,
                SEVERIDADE_OCORRENCIA: ocorrencia.SEVERIDADE_OCORRENCIA
            });
        }
    }, [ocorrencia]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.TIPO_OCORRENCIA.trim()) {
            setError('Por favor, preencha a descrição');
            setIsLoading(false);
            return;
        }

        try {
            const ocorrenciaAtualizada: OcorrenciaData = {
                ...ocorrencia,
                TIPO_OCORRENCIA: formData.TIPO_OCORRENCIA,
                STATUS_OCORRENCIA: formData.STATUS_OCORRENCIA,
                SEVERIDADE_OCORRENCIA: formData.SEVERIDADE_OCORRENCIA
            };

            const response = await fetch('/api/ocorrencia', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: ocorrencia.ID_OCORRENCIA,
                    ...ocorrenciaAtualizada
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar ocorrência');
            }

            const data = await response.json();
            onEdit(data);
            setError('');
            onClose();
        } catch (err) {
            console.error('Erro ao atualizar:', err);
            setError(err instanceof Error ? err.message : 'Erro ao atualizar ocorrência. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 p-6 rounded-lg w-96 shadow-xl mx-4 md:mx-0">
                <h2 className="text-xl font-bold mb-4">Editar Ocorrência</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição
                        </label>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            value={formData.TIPO_OCORRENCIA}
                            onChange={(e) => setFormData({ ...formData, TIPO_OCORRENCIA: e.target.value })}
                            rows={4}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={formData.STATUS_OCORRENCIA}
                            onChange={(e) => setFormData({ ...formData, STATUS_OCORRENCIA: e.target.value })}
                        >
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Pendente">Pendente</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Grau da Ocorrência
                        </label>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={formData.SEVERIDADE_OCORRENCIA}
                            onChange={(e) => setFormData({ ...formData, SEVERIDADE_OCORRENCIA: Number(e.target.value) })}
                        >
                            <option value={1}>Baixo</option>
                            <option value={2}>Médio</option>
                            <option value={3}>Alto</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 text-gray-600 hover:text-gray-800"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOcorrencia;

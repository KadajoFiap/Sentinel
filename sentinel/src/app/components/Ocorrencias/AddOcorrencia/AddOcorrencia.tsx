'use client';
import { useState } from 'react';

interface OcorrenciaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (ocorrencia: OcorrenciaData) => void;
    lastId: number;
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

const CompAddOcorrencia = ({ isOpen, onClose, onAdd}: OcorrenciaModalProps) => {
    const [formData, setFormData] = useState({
        TIPO_OCORRENCIA: '',
        DATA_INICIO: new Date().toISOString().slice(0, 16),
        SEVERIDADE_OCORRENCIA: 1,
        FK_ESTACAO_ID_ESTACAO: 1,
        FK_CCO_ID_CCO: 1,
        STATUS_OCORRENCIA: 'Aberto'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validar campos obrigatórios
        if (!formData.TIPO_OCORRENCIA.trim()) {
            setError('Por favor, preencha a descrição da ocorrência');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Enviando dados:', formData);
            
            const response = await fetch('/api/ocorrencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    DATA_INICIO: new Date(formData.DATA_INICIO).toISOString()
                }),
            });

            const responseData = await response.json();
            console.log('Resposta da API:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao criar ocorrência');
            }

            onAdd(responseData);
            setFormData({
                TIPO_OCORRENCIA: '',
                DATA_INICIO: new Date().toISOString().slice(0, 16),
                SEVERIDADE_OCORRENCIA: 1,
                FK_ESTACAO_ID_ESTACAO: 1,
                FK_CCO_ID_CCO: 1,
                STATUS_OCORRENCIA: 'Aberto'
            });
            onClose();
        } catch (err) {
            console.error('Erro detalhado:', err);
            setError(err instanceof Error ? err.message : 'Erro ao criar ocorrência. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 p-6 rounded-lg w-96 shadow-xl mx-4 md:mx-0">
                <h2 className="text-xl font-bold mb-4">Adicionar Nova Ocorrência</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição de Ocorrência
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={formData.TIPO_OCORRENCIA}
                            onChange={(e) =>
                                setFormData({ ...formData, TIPO_OCORRENCIA: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data e Hora
                        </label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border rounded-md"
                            value={formData.DATA_INICIO}
                            onChange={(e) =>
                                setFormData({ ...formData, DATA_INICIO: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Severidade
                        </label>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={formData.SEVERIDADE_OCORRENCIA}
                            onChange={(e) =>
                                setFormData({ ...formData, SEVERIDADE_OCORRENCIA: Number(e.target.value) })
                            }
                        >
                            <option value={1}>Baixa</option>
                            <option value={2}>Média</option>
                            <option value={3}>Alta</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={formData.STATUS_OCORRENCIA}
                            onChange={(e) =>
                                setFormData({ ...formData, STATUS_OCORRENCIA: e.target.value })
                            }
                        >
                            <option value="Aberto">Aberto</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Adicionar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompAddOcorrencia;
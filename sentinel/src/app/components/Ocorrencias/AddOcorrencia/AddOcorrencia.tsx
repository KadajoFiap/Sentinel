'use client';
import { useState } from 'react';

interface OcorrenciaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (ocorrencia: OcorrenciaData) => void;
    lastId: number;
}

interface OcorrenciaData {
    id?: number;
    dataInicio: string;
    dataFim: string | null;
    tipoOcorrencia: string;
    descricaoOcorrencia: string | null;
    severidadeOcorrencia: number;
    cco: { id: number };
    estacao: { id: number };
    statusOcorrencia: string;
}

const CompAddOcorrencia = ({ isOpen, onClose, onAdd}: OcorrenciaModalProps) => {
    const [formData, setFormData] = useState<OcorrenciaData>({
        tipoOcorrencia: '',
        dataInicio: new Date().toISOString().slice(0, 16),
        dataFim: null,
        descricaoOcorrencia: null,
        severidadeOcorrencia: 1,
        cco: { id: 1 },
        estacao: { id: 1 },
        statusOcorrencia: 'ABERTO'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validar campos obrigatórios
        if (!formData.tipoOcorrencia.trim()) {
            setError('Por favor, preencha a descrição da ocorrência');
            setIsLoading(false);
            return;
        }

        // Validar severidade
        if (!formData.severidadeOcorrencia || formData.severidadeOcorrencia < 1 || formData.severidadeOcorrencia > 3) {
            setError('A severidade deve ser um número entre 1 e 3');
            setIsLoading(false);
            return;
        }

        try {
            const formatDate = (dateString: string) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                const pad = (n: number) => n.toString().padStart(2, '0');
                // Formato: YYYY-MM-DDTHH:mm:ss
                return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
            };

            const dataToSend = {
                tipo_ocorrencia: formData.tipoOcorrencia,
                data_inicio: formatDate(formData.dataInicio),
                data_fim: formData.dataFim ? formatDate(formData.dataFim) : null,
                severidade_ocorrencia: Number(formData.severidadeOcorrencia),
                id_estacao: 6,
                id_cco: 6,
                status_ocorrencia: formData.statusOcorrencia.toUpperCase(),
                s3_key_evidencia: null,
                descricao_ocorrencia: formData.descricaoOcorrencia || ''
            };
            
            console.log('Enviando dados:', dataToSend);
            
            const response = await fetch('/api/ocorrencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const responseData = await response.json();
            console.log('Resposta da API:', responseData);

            if (!response.ok) {
                const errorMessage = responseData.details?.message || responseData.message || 'Erro ao criar ocorrência';
                throw new Error(errorMessage);
            }

            onAdd(responseData);
            setFormData({
                tipoOcorrencia: '',
                dataInicio: new Date().toISOString().slice(0, 16),
                dataFim: null,
                descricaoOcorrencia: null,
                severidadeOcorrencia: 1,
                cco: { id: 1 },
                estacao: { id: 1 },
                statusOcorrencia: 'ABERTO'
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
                            Tipo de Ocorrência
                        </label>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={formData.tipoOcorrencia}
                            onChange={(e) =>
                                setFormData({ ...formData, tipoOcorrencia: e.target.value })
                            }
                            required
                        >
                            <option value="">Selecione um tipo</option>
                            <option value="ACIDENTE">Acidente</option>
                            <option value="AVARIA">Avaria</option>
                            <option value="FALHA_TECNICA">Falha Técnica</option>
                            <option value="INCIDENTE">Incidente</option>
                            <option value="MANUTENCAO">Manutenção</option>
                            <option value="OUTROS">Outros</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição da Ocorrência
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={formData.descricaoOcorrencia || ''}
                            onChange={(e) =>
                                setFormData({ ...formData, descricaoOcorrencia: e.target.value })
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
                            value={formData.dataInicio}
                            onChange={(e) =>
                                setFormData({ ...formData, dataInicio: e.target.value })
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
                            value={formData.severidadeOcorrencia}
                            onChange={(e) =>
                                setFormData({ ...formData, severidadeOcorrencia: Number(e.target.value) })
                            }
                            required
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
                            value={formData.statusOcorrencia}
                            onChange={(e) =>
                                setFormData({ ...formData, statusOcorrencia: e.target.value })
                            }
                        >
                            <option value="ABERTO">Aberto</option>
                            <option value="EM_ANDAMENTO">Em andamento</option>
                            <option value="CONCLUIDO">Concluído</option>
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
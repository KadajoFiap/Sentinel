'use client';
import { useState } from 'react';
import AddOcorrencia from './AddOcorrencia/AddOcorrencia';
import EditOcorrencia from './EditOcorrencia/EditOcorrencia';
import OcorrenciaTableContent from './OcorrenciaTableContent/OcorrenciaTableContent';

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

const Ocorrencias = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [ocorrenciaParaEditar, setOcorrenciaParaEditar] = useState<Ocorrencia | null>(null);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    const handleEditClick = (ocorrencia: Ocorrencia) => {
        setOcorrenciaParaEditar(ocorrencia);
        setIsEditModalOpen(true);
    };

    const handleAddSuccess = () => {
        setShouldRefresh(prev => !prev); // Toggle para forçar o refresh
    };

    const handleEditSuccess = () => {
        setShouldRefresh(prev => !prev); // Toggle para forçar o refresh
    };

    return (
        <>
            <div className="bg-[#f4f4f4] min-h-screen pt-30 pb-30 pl-10 pr-10 lg:pl-20 lg:pr-20 md:pl-15 md:pr-15">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[30px] font-medium">Ocorrências</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-y-auto min-h-[580px] max-h-[580px] lg:min-h-[800px] 2xl:min-h-[620px] md:min-h-[750px] flex flex-col mb-4">
                    <OcorrenciaTableContent 
                        onEditClick={handleEditClick}
                        key={shouldRefresh ? 'refresh' : 'initial'} // Força o remontar do componente
                    />
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
                onAdd={handleAddSuccess}
                lastId={0}
            />

            {ocorrenciaParaEditar && (
                <EditOcorrencia
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setOcorrenciaParaEditar(null);
                    }}
                    onEdit={handleEditSuccess}
                    ocorrencia={ocorrenciaParaEditar}
                />
            )}
        </>
    );
};

export default Ocorrencias;

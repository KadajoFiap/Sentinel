'use client';
import { useState } from 'react';
import ViewRelatorio from './ViewRelatorio';
import RelatorioTableContent from './RelatorioTableContent/RelatorioTableContent';

// Interfaces para tipagem dos dados
interface Relatorio {
    id: string;
    nome: string;
    razao: string;
    data: string;
    ocorrencias: any[];
}

const Relatorios = () => {
    // Estados para controle do modal de visualização
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRelatorio, setSelectedRelatorio] = useState<Relatorio | null>(null);

    // Função para gerar e baixar o relatório em formato JSON
    const handleDownload = (relatorio: Relatorio) => {
        const relatorioJSON = {
            id: relatorio.id,
            nome: relatorio.nome,
            razao: relatorio.razao,
            data: relatorio.data,
            ocorrencias: relatorio.ocorrencias.map(oc => ({
                id: oc.ID_OCORRENCIA,
                data: oc.DATA_INICIO,
                descricao: oc.TIPO_OCORRENCIA,
                status: oc.STATUS_OCORRENCIA,
                severidade: oc.SEVERIDADE_OCORRENCIA
            }))
        };

        // Criação e download do arquivo JSON
        const blob = new Blob([JSON.stringify(relatorioJSON, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-${relatorio.id}.json`;
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

                <div className="bg-white rounded-lg shadow-md min-h-[580px] lg:min-h-[800px] 2xl:min-h-[620px] md:min-h-[750px] flex flex-col mb-4">
                    <RelatorioTableContent 
                        onViewClick={handleView}
                        onDownloadClick={handleDownload}
                    />
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
                    ocorrencias={selectedRelatorio.ocorrencias}
                />
            )}
        </>
    );
};

export default Relatorios; 
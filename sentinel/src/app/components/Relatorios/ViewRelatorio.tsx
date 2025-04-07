'use client';

interface ViewRelatorioProps {
    isOpen: boolean;
    onClose: () => void;
    relatorio: RelatorioData;
    ocorrencias: OcorrenciaData[];
}

interface RelatorioData {
    id: number;
    nome: string;
    razao: string;
    data: string;
}

interface OcorrenciaData {
    id: number;
    data: string;
    descricao: string;
    status: string;
}

const ViewRelatorio = ({ isOpen, onClose, relatorio, ocorrencias }: ViewRelatorioProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 p-6 rounded-lg w-[800px] shadow-xl max-h-[80vh] overflow-auto mx-4 md:mx-0">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Visualizar Relatório - {relatorio.nome}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600"><span className="font-semibold">ID:</span> {String(relatorio.id).padStart(3, '0')}</p>
                    <p className="text-gray-600"><span className="font-semibold">Data:</span> {relatorio.data}</p>
                    <p className="text-gray-600"><span className="font-semibold">Razão de Conclusão:</span> {relatorio.razao}</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {ocorrencias.map((ocorrencia) => (
                                <tr key={ocorrencia.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {String(ocorrencia.id).padStart(3, '0')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ocorrencia.data}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {ocorrencia.descricao}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ocorrencia.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewRelatorio;

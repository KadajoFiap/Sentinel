const CompOcorrencias = () => {
    return (
        <>
            <div className="bg-[#f4f4f4] min-h-screen pt-30 ps-10 pe-10 pb-10">
                <h1 className="text-[30px] font-medium">Ocorrências</h1>
                
                <div className="mt-8 h-[calc(100vh-250px)] overflow-auto rounded-lg">
                    <table className="min-w-full bg-white shadow-md">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Data</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Descrição</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* Adicionando mais linhas para demonstrar o scroll */}
                            {[...Array(20)].map((_, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">00{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">10/03/2024</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">Descrição da ocorrência</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">Em andamento</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-800">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CompOcorrencias;
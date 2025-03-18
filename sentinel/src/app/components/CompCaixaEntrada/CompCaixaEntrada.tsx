'use client';
import { useState } from 'react';
import CompAvisoDetail from './CompAvisoDetail';

interface Mensagem {
    id: number;
    titulo: string;
    conteudo: string;
    data: string;
    lida: boolean;
}

const CompCaixaEntrada = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedMensagem, setSelectedMensagem] = useState<Mensagem | null>(null);
    const [mensagens, setMensagens] = useState<Mensagem[]>([
        {
            id: 1,
            titulo: 'Atualização do Sistema',
            conteudo: 'Nova versão do sistema disponível com melhorias na interface.\n\nPrincipais atualizações:\n- Melhorias na interface do usuário\n- Correções de bugs\n- Novos recursos de relatórios',
            data: '16/03/2024',
            lida: false
        },
        {
            id: 2,
            titulo: 'Manutenção Programada',
            conteudo: 'Sistema ficará indisponível para manutenção no dia 20/03.\n\nHorário: 22:00 - 23:00\nMotivo: Atualização de segurança\n\nPor favor, salve seus trabalhos antes deste horário.',
            data: '15/03/2024',
            lida: true
        }
    ]);

    const mensagensNaoLidas = mensagens.filter(m => !m.lida).length;

    const marcarComoLida = (id: number) => {
        setMensagens(mensagens.map(msg =>
            msg.id === id ? { ...msg, lida: true } : msg
        ));
    };

    const handleMensagemClick = (mensagem: Mensagem) => {
        setSelectedMensagem(mensagem);
        setIsDetailOpen(true);
        setIsOpen(false);
    };

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer relative flex items-center text-gray-700 hover:text-gray-900"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {mensagensNaoLidas > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {mensagensNaoLidas}
                        </span>
                    )}
                </button>

                {isOpen && (
                    <div className="absolute left-1/2 md:right-0 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 text-lg font-semibold border-b">
                            Caixa de Entrada
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {mensagens.length > 0 ? (
                                mensagens.map((msg) => (
                                    <div
                                        key={msg.id}
                                        onClick={() => handleMensagemClick(msg)}
                                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!msg.lida ? 'bg-blue-50' : ''}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className={`text-sm font-semibold ${!msg.lida ? 'text-blue-600' : 'text-gray-700'}`}>
                                                {msg.titulo}
                                            </h3>
                                            <span className="text-xs text-gray-500">{msg.data}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{msg.conteudo}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    Nenhuma mensagem
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {selectedMensagem && (
                <CompAvisoDetail
                    isOpen={isDetailOpen}
                    onClose={() => {
                        setIsDetailOpen(false);
                        setSelectedMensagem(null);
                    }}
                    aviso={selectedMensagem}
                    onRead={marcarComoLida}
                />
            )}
        </>
    );
};

export default CompCaixaEntrada;

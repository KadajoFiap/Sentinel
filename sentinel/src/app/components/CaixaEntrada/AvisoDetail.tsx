'use client';

interface AvisoDetailProps {
    isOpen: boolean;
    onClose: () => void;
    aviso: {
        id: number;
        titulo: string;
        conteudo: string;
        data: string;
        lida: boolean;
    };
    onRead: (id: number) => void;
}

const AvisoDetail = ({ isOpen, onClose, aviso, onRead }: AvisoDetailProps) => {
    if (!isOpen) return null;

    const handleClose = () => {
        if (!aviso.lida) {
            onRead(aviso.id);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 p-6 rounded-lg w-[600px] shadow-xl mx-4 md:mx-0">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{aviso.titulo}</h2>
                        <p className="text-sm text-gray-500 mt-1">{aviso.data}</p>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="cursor-pointer w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="prose max-w-none mx-2">
                    <div className="text-gray-700 whitespace-pre-wrap">
                        {aviso.conteudo}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvisoDetail;

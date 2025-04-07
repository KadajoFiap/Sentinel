'use client';

import React, { useState } from 'react';
import BotaoPadrao from '../../Botao/Botao';

interface EvidenciaProps {
    videoUrl: string;
    titulo: string;
}

export default function Evidencia({ videoUrl, titulo }: EvidenciaProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <BotaoPadrao 
                onClick={() => setIsOpen(true)}
                icon="view"
                type="view"
            >
                Ver
            </BotaoPadrao>

            {isOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{titulo}</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                Fechar
                            </button>
                        </div>
                        <div className="relative aspect-video w-full">
                            <iframe
                                src={videoUrl}
                                title={titulo}
                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 
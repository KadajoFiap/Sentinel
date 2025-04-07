'use client';

import React, { useState, useEffect } from 'react';
import Botao from '../Botao/Botao';

interface EvidenciaProps {
    videoUrl: string;
    titulo: string;
}

export default function Evidencia({ videoUrl, titulo }: EvidenciaProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleVideoError = () => {
        setError('Erro ao carregar o vídeo. Por favor, tente novamente.');
    };

    return (
        <>
            <Botao 
                onClick={() => setIsOpen(true)}
                icon="view"
                type="view"
            >
                Ver
            </Botao>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    <div className="bg-white/95 p-6 rounded-lg max-w-4xl w-full shadow-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{titulo}</h2>
                            <Botao
                                onClick={() => setIsOpen(false)}
                                type="view"
                            >
                                Fechar
                            </Botao>
                        </div>
                        <div className="relative aspect-video w-full bg-gray-50 rounded-lg overflow-hidden">
                            {error ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-red-500">{error}</p>
                                </div>
                            ) : (
                                <iframe
                                    className="w-full h-full"
                                    src={videoUrl}
                                    title={titulo}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 
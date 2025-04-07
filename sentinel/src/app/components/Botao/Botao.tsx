'use client';

import React from 'react';

interface BotaoProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    icon?: 'view' | 'download';
    type?: 'view' | 'download';
}

export default function Botao({ onClick, children, className = '', icon, type = 'view' }: BotaoProps) {
    const getIcon = () => {
        switch (icon) {
            case 'view':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                );
            case 'download':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getColorClasses = () => {
        switch (type) {
            case 'download':
                return 'text-green-600 hover:text-green-800';
            case 'view':
            default:
                return 'text-blue-600 hover:text-blue-800';
        }
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${getColorClasses()} ${className}`}
        >
            {getIcon()}
            {children}
        </button>
    );
} 
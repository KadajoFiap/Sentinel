'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface PerfilProps {
    email: string;
}

const CompPerfil = ({ email }: PerfilProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        router.push('/Login');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {email.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">{email}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Logado como:<br/>{email}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        Sair
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompPerfil;

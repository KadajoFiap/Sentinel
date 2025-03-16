"use client";

import CompMenu from '../CompMenu/CompMenu';
import CompPerfil from '../CompPerfil/CompPerfil';
import CompCaixaEntrada from '../CompCaixaEntrada/CompCaixaEntrada';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';

const Header = () => {
    const { isLoggedIn, userEmail } = useAuth();
    const [showComponents, setShowComponents] = useState(false);

    useEffect(() => {
        setShowComponents(isLoggedIn);
    }, [isLoggedIn]);

    return (
        <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#f4f4f4] flex items-center px-5 shadow-md z-[1000]">
            <div className="flex-1 flex items-center">
                <CompMenu />
            </div>
            
            <div className="flex items-center gap-6">
                {showComponents && (
                    <>
                        <CompCaixaEntrada />
                        <CompPerfil email={userEmail} />
                    </>
                )}
                <div className="pl-6 border-l border-gray-300">
                    <Link href="/">
                        <Image
                            src="/logoccr.png"
                            alt="Logo CCR"
                            width={55}
                            height={0}
                            priority
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
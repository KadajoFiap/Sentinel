"use client";

import { useState } from 'react';
import Link from "next/link";

const CompMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <button
                className="flex flex-col justify-between w-[30px] h-[20px] bg-transparent border-none cursor-pointer p-0 z-[1001]"
                onClick={toggleMenu}
            >
                <span className={`w-full h-[2px] bg-gray-800 transition-all duration-300 ease-in-out rounded-[2px] ${isMenuOpen ? 'translate-y-[9px] rotate-45 bg-white' : ''
                    }`}></span>
                <span className={`w-full h-[2px] bg-gray-800 transition-all duration-300 ease-in-out rounded-[2px] ${isMenuOpen ? 'opacity-0' : ''
                    }`}></span>
                <span className={`w-full h-[2px] bg-gray-800 transition-all duration-300 ease-in-out rounded-[2px] ${isMenuOpen ? '-translate-y-[9px] -rotate-45 bg-white' : ''
                    }`}></span>
            </button>

            <div className={`fixed top-0 w-full h-screen bg-[#1a1a1a] transition-[left] duration-300 ease-in-out z-[999] ${isMenuOpen ? 'left-0' : '-left-full'
                }`}>
                <ul className="h-full flex items-center list-none float-left -mt-[60px] ml-[30px]">
                    <div className="flex flex-col gap-[40px]">
                        <li className={`px-5 py-2.5 transition-all duration-300 ease-in-out delay-100 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                            <Link href='/Ocorrencias' className="no-underline text-white text-[34px] font-medium hover:text-blue-500 transition-colors duration-200">Ocorrências</Link>
                        </li>
                        <li className={`px-5 py-2.5 transition-all duration-300 ease-in-out delay-200 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                            <Link href='/Relatorios' className="no-underline text-white text-[34px] font-medium hover:text-blue-500 transition-colors duration-200">Relatórios</Link>
                        </li>
                        <li className={`px-5 py-2.5 transition-all duration-300 ease-in-out delay-300 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                            <Link href='/Integrantes' className="no-underline text-white text-[34px] font-medium hover:text-blue-500 transition-colors duration-200">Integrantes</Link>
                        </li>
                        <li className={`px-5 py-2.5 transition-all duration-300 ease-in-out delay-400 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                            <Link href='' className="no-underline text-white text-[34px] font-medium hover:text-blue-500 transition-colors duration-200">GitHub</Link>
                        </li>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default CompMenu;
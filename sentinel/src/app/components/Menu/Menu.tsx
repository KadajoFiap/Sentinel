"use client";

import Link from 'next/link';
import React from 'react';
import { useState } from 'react';


export default function Menu(): React.ReactElement {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleItemClick = () => {
        setIsMenuOpen(false);
    };

    const rotas = [{
        label: 'Ocorrências',
        to: '/Ocorrencias'
    }, {
        label: 'Relatórios',
        to: '/Relatorios'
    }, {
        label: 'Integrantes',
        to: '/Integrantes'
    }, {
        label: 'GitHub',
        to: 'https://github.com/KadajoFiap/Sentinel',
        target: '_blank'
    }]

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

            <nav className={`fixed top-0 w-full lg:w-[400px] 2xl:w-[500px] h-screen bg-[#1a1a1a] transition-[left] duration-300 ease-in-out z-[999] ${isMenuOpen ? 'left-0' : '-left-full'
                }`}>
                <ul className='h-full flex items-center list-none float-left -mt-[60px] ml-[10px] md:ml-[30px]'>
                    <div className='flex flex-col gap-[30px]'>
                        {rotas.map((rota, index) => (
                            <li key={index} className={`px-5 py-2.5 transition-all duration-300 ease-in-out delay-400 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                                <Link 
                                    href={rota.to}
                                    onClick={handleItemClick}
                                    target={rota.target}
                                    className="no-underline text-white text-[30px] md:text-[50px] lg:text-[30px] 2xl:text-[40px] font-medium hover:text-blue-500 transition-colors duration-200 flex items-center gap-3"
                                >
                                    <div className="mr-3 w-3 h-3 border-2 border-white bg-white"></div>
                                    {rota.label}
                                </Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </nav>
        </>
    )
}
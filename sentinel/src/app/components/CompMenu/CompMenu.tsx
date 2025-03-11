"use client";

import { useState } from 'react';
import Link from "next/link";
import './Menu.css'

const CompMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <button className="hamburger" onClick={toggleMenu}>
                <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
            </button>
            
            <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
                <ul className="menu">
                    <div className="menu-container">
                        <li>
                            <Link href='/Ocorrências'>Ocorrências</Link>
                        </li>
                        <li>
                            <Link href='/Relatórios'>Relatórios</Link>
                        </li>
                        <li>
                            <Link href='/Integrantes'>Integrantes</Link>
                        </li>
                        <li>
                            <Link href=''>GitHub</Link>
                        </li>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default CompMenu;
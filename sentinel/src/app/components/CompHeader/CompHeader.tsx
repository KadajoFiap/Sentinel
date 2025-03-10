"use client";

import CompMenu from '../CompMenu/CompMenu';
import Image from 'next/image';
import './Header.css'

const Header = () => {
    return (
        <>
            <header className="header">
                <CompMenu />
                <div className="logo-container">
                    <Image
                        src="/logoccr.png"
                        alt="Logo CCR"
                        width={55}
                        height={0}
                        priority
                    />
                </div>
            </header>
        </>
    )
}
export default Header;
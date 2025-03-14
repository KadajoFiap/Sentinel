"use client";

import CompMenu from '../CompMenu/CompMenu';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#f4f4f4] flex justify-between items-center px-5 shadow-md z-[1000]">
                <CompMenu />
                <div className="flex items-center relative z-[1001]">
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
            </header>
        </>
    )
}
export default Header;
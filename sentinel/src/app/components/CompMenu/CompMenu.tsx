import Link from "next/link";
import Image from 'next/image';

import './Menu.css'

const CompMenu = () => {
    return (
        <>
            <ul className="menu">
                <div className="logo-container">
                    <Image
                        src="/logoccr.png"
                        alt="Logo CCR"
                        width={90}
                        height={30}
                        priority
                    />
                </div>
                <div className="menu-container">
                    <li>
                        <Link href='/'>Ocorrências</Link>
                    </li>
                    <li>
                        <Link href='/Produtos'>Relatórios</Link>
                    </li>
                    <li>
                        <Link href='/Contato'>Integrantes</Link>
                    </li>
                    <li>
                        <Link href='/Sobre'>GitHub</Link>
                    </li>
                </div>
            </ul>
        </>
    )
}

export default CompMenu;
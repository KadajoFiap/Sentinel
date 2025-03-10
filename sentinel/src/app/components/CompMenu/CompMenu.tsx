import Link from "next/link";

import './Menu.css'

const CompMenu = () => {
    return(
        <>
            <ul className="menu">
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/Produtos'>Produtos</Link>
                </li>
                <li>
                    <Link href='/Contato'>Contato</Link>
                </li>
                <li>
                    <Link href='/Sobre'>Sobre</Link>
                </li>
            </ul>
        </>
    )
}

export default CompMenu;
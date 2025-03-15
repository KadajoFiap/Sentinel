'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompDavi from "../components/CompIntegrantes/CompDavi"
import CompJoao from "../components/CompIntegrantes/CompJoao"
import CompKaue from "../components/CompIntegrantes/CompKaue"

const Integrantes = () => {
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário está logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/Login');
        }
    }, [router]);

    return(
        <>
            <div className="min-h-screen bg-[#f4f4f4] pt-30 pl-10 pr-10 pb-30">
                <h1 className="font-semibold text-[30px]">Integrantes - TDSPS</h1>
                <CompKaue />
                <CompDavi />
                <CompJoao />
            </div>
        </>
    )
}
export default Integrantes;
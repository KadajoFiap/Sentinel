'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompOcorrencias from "@/app/components/CompOcorrencias/CompOcorrencias";

const Ocorrencias = () => {
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
            <CompOcorrencias />
        </>
    )
}
export default Ocorrencias;
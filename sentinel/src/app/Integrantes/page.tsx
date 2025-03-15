'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompDavi from "../components/CompIntegrantes/CompDavi"
import CompJoao from "../components/CompIntegrantes/CompJoao"
import CompKaue from "../components/CompIntegrantes/CompKaue"
import CompLoading from "@/app/components/CompLoading/CompLoading";

const Integrantes = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                router.push('/Login');
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return <CompLoading />;
    }

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
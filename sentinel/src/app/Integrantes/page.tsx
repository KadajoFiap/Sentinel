'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompDavi from "../components/CompIntegrantes/CompDavi"
import CompJoao from "../components/CompIntegrantes/CompJoao"
import CompKaue from "../components/CompIntegrantes/CompKaue"
import CompLoading from "@/app/components/CompLoading/CompLoading";
import { useAuth } from '../contexts/AuthContext';

const Integrantes = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/Login');
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn, router]);

    if (isLoading) {
        return <CompLoading />;
    }

    return (
        <>
            <div className="min-h-screen bg-[#f4f4f4] pt-30 pl-10 pr-10 lg:pl-20 lg:pr-20 md:pl-15 md:pr-15">
                <h1 className="font-semibold text-[30px]">Integrantes - TDSPS</h1>
                <div className="lg:flex lg:gap-40 justify-center lg:content-center">
                    <CompKaue />
                    <CompDavi />
                    <CompJoao />
                </div>
            </div>
        </>
    )
}

export default Integrantes;
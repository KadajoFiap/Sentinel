'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompLoading from "@/app/components/Loading/Loading";
import { useAuth } from '../contexts/AuthContext';
import Membros from '../components/Membros/Membros';

const Integrantes = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
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
                <Membros />
            </div>
        </>
    )
}

export default Integrantes;
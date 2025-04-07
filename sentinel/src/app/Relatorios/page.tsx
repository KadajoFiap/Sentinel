'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompRelatorios from "@/app/components/Relatorios/Relatorios";
import CompLoading from "@/app/components/Loading/Loading";
import { useAuth } from '../contexts/AuthContext';

const Relatorios = () => {
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

    return(
        <>
            <CompRelatorios />
        </>
    )
}

export default Relatorios;
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompOcorrencias from "@/app/components/Ocorrencias/Ocorrencias";
import CompLoading from "@/app/components/Loading/Loading";
import { useAuth } from '../contexts/AuthContext';

const Ocorrencias = () => {
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

    return <CompOcorrencias />;
}

export default Ocorrencias;
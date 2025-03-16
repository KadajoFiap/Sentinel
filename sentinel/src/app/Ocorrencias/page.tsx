'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompOcorrencias from "@/app/components/CompOcorrencias/CompOcorrencias";
import CompLoading from "@/app/components/CompLoading/CompLoading";
import { useAuth } from '../contexts/AuthContext';

const Ocorrencias = () => {
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

    return <CompOcorrencias />;
}

export default Ocorrencias;
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompOcorrencias from "@/app/components/CompOcorrencias/CompOcorrencias";
import CompLoading from "@/app/components/CompLoading/CompLoading";

const Ocorrencias = () => {
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
            <CompOcorrencias />
        </>
    )
}
export default Ocorrencias;
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Ocorrencias from '../components/Ocorrencias/Ocorrencias';

export default function OcorrenciasPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/Login');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ocorrências</h1>
      <Ocorrencias />
    </div>
  );
}
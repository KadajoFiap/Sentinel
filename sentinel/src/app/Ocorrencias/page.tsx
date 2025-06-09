'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import OcorrenciaTableContent from '../components/Ocorrencias/OcorrenciaTableContent/OcorrenciaTableContent';

export default function OcorrenciasPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/Login');
    }
  }, [isLoggedIn, router]);

  const handleEditClick = (ocorrencia: any) => {
    // TODO: Implement edit functionality
    console.log('Edit clicked for:', ocorrencia);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ocorrências</h1>
      <OcorrenciaTableContent onEditClick={handleEditClick} />
    </div>
  );
}
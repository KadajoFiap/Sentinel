'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/Login');
    }
  }, [router]);

  return (
    <>
      <div className='min-h-screen home-content bg-[#f4f4f4]'>
        <div className="p-4">
          <h1>Página Inicial</h1>
        </div>
      </div>
    </>
  );
}
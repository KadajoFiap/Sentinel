'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/Login');
    }
  }, [isLoggedIn, router]);

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
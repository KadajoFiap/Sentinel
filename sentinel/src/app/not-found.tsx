'use client';
import Link from "next/link";

const NotFound = () => {
    return (
        <>
            <div className='bg-[#f4f4f4] min-h-screen flex flex-col items-center justify-center gap-4'>
                <h1 className='text-center text-6xl font-bold text-gray-800'>
                    404
                </h1>
                <h2 className='text-center text-2xl font-semibold text-gray-700'>
                    Página não encontrada
                </h2>
                <p className='text-center text-gray-600 max-w-md'>
                    Desculpe, a página que você está procurando não existe ou foi movida.
                </p>
                <Link 
                    href="/"
                    className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                >
                    Voltar ao início
                </Link>
            </div>
        </>
    );
}

export default NotFound;
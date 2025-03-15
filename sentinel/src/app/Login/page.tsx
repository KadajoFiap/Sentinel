'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('123456');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificação básica de credenciais
    if (email === 'admin@admin.com' && password === '123456') {
      // Salva no localStorage
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/'); // Redireciona para a página inicial
    } else {
      alert('Email ou senha incorretos!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gray-100" style={{ backgroundImage: "url('/background.png')" }}>
      <div className="bg-white p-4 rounded-lg shadow-md w-75">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
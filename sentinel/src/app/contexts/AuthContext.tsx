'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, LoginData, RegisterData, ConfirmData } from '../services/authService';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  confirm: (data: ConfirmData) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verificar se o token é válido
          const isValid = await authService.isAuthenticated();
          if (isValid) {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem('userEmail');
            setUserEmail(storedEmail || '');
          } else {
            // Token inválido, limpar dados
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            setIsLoggedIn(false);
            setUserEmail('');
          }
        }
      } catch (err) {
        console.error('Erro ao inicializar autenticação:', err);
        // Em caso de erro, limpar dados
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail('');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Proteger rotas que requerem autenticação
  useEffect(() => {
    if (isInitialized) {
      const publicPaths = ['/Login', '/Register', '/Confirm'];
      const currentPath = window.location.pathname;

      if (!isLoggedIn && !publicPaths.includes(currentPath)) {
        router.push('/Login');
      } else if (isLoggedIn && publicPaths.includes(currentPath)) {
        router.push('/');
      }
    }
  }, [isLoggedIn, isInitialized, router]);

  const login = async (data: LoginData) => {
    try {
      setError(null);
      await authService.login(data);
      setIsLoggedIn(true);
      setUserEmail(data.username);
      localStorage.setItem('userEmail', data.username);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      await authService.register(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar usuário');
      throw err;
    }
  };

  const confirm = async (data: ConfirmData) => {
    try {
      setError(null);
      await authService.confirm(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao confirmar registro');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setIsLoggedIn(false);
      setUserEmail('');
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      router.push('/Login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout');
      throw err;
    }
  };

  // Não renderizar nada até a inicialização estar completa
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, register, confirm, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
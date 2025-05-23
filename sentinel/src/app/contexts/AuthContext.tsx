'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, LoginData, RegisterData, ConfirmData } from '../services/authService';

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

  useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        // Se houver um token, você pode decodificá-lo para obter o email do usuário
        // Por enquanto, vamos usar um valor padrão
        setUserEmail(token ? 'usuario@exemplo.com' : '');
    }, []);

    const login = async (data: LoginData) => {
        try {
            setError(null);
            await authService.login(data);
            setIsLoggedIn(true);
            setUserEmail(data.username); // Usando o username como email temporariamente
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
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer logout');
            throw err;
        }
    };

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
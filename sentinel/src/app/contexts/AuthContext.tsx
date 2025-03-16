'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check login status when component mounts and when localStorage changes
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(!!loginStatus);
      if (loginStatus) {
        setUserEmail('admin@admin.com');
      } else {
        setUserEmail('');
      }
    };

    checkLoginStatus();

    // Listen for storage events
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setUserEmail('admin@admin.com');
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
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
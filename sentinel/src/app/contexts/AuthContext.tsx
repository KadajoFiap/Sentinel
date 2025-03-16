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

  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loginStatus);
    setUserEmail(loginStatus ? 'admin@admin.com' : '');
  };

  useEffect(() => {
    checkLoginStatus();

    // Listen for storage events from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isLoggedIn') {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setUserEmail('admin@admin.com');
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserEmail('');
    // Dispatch a custom event to ensure all components update
    window.dispatchEvent(new Event('auth-logout'));
  };

  // Listen for the custom logout event
  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setUserEmail('');
    };

    window.addEventListener('auth-logout', handleLogout);
    return () => {
      window.removeEventListener('auth-logout', handleLogout);
    };
  }, []);

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
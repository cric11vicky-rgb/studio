
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// In a real application, this would be handled by a proper authentication service.
const ADMIN_PASSWORD = 'Vikas@3415'; // Hardcoded for demonstration purposes

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const session = sessionStorage.getItem('isAdminAuthenticated');
      const authenticated = session === 'true';
      setIsAuthenticated(authenticated);
      setIsLoading(false);

      if (!authenticated && pathname !== '/login') {
        router.push('/login');
      } else if (authenticated && pathname === '/login') {
        router.push('/dashboard');
      }
    };
    checkAuth();
  }, [pathname, router]);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import strapiAuth, { StrapiUser } from '@/app/lib/admin/auth';

interface AuthContextType {
  user: StrapiUser | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StrapiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Check if we have a stored token
      if (strapiAuth.isAuthenticated()) {
        // Validate the token and get user data
        const isValid = await strapiAuth.validateToken();
        if (isValid) {
          const currentUser = await strapiAuth.getCurrentUser();
          setUser(currentUser);
        } else {
          // Token is invalid, clear it
          strapiAuth.logout();
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      strapiAuth.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      const response = await strapiAuth.login({ identifier, password });
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    strapiAuth.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
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


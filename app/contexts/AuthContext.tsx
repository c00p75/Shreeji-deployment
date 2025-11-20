'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import adminAuth, { AdminUser } from '@/app/lib/admin/auth';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Check if we have a stored token
      if (adminAuth.isAuthenticated()) {
        // Validate the token and get user data
        const isValid = await adminAuth.validateToken();
        if (isValid) {
          const currentUser = await adminAuth.getCurrentUser();
          setUser(currentUser);
        } else {
          // Token is invalid, clear it
          adminAuth.logout();
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      adminAuth.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await adminAuth.login({ email, password });
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    adminAuth.logout();
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


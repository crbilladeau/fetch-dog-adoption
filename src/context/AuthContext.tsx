import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { loginUser } from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  // logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const login = async (name: string, email: string): Promise<void> => {
    setError(null);

    try {
      const response = await loginUser(name, email);

      if (response?.status === 200) {
        setIsAuthenticated(true);
        navigate('/search');
      }
    } catch (error) {
      setError(
        'There was an error while logging you in. Please try again later.'
      );
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

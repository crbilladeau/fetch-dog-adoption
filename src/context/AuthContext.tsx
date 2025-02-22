import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

/* API */
import { loginUser } from '../api/auth';

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<void>;
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

        const expiration = Date.now() + 60 * 60 * 1000;
        localStorage.setItem('auth-session', JSON.stringify({ expiration }));
        navigate('/search');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setIsAuthenticated(false);
        // remove user's auth session
        localStorage.removeItem('auth-session');
        navigate('/login');
        return;
      }
      throw new Error(
        'There was an error while logging you in. Please try again later.'
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, error }}>
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

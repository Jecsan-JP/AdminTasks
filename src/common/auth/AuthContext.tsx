import React, { createContext, useContext, useState, useEffect } from 'react';
import { sessionManager } from '../singletons/sessionManager';

interface AuthContextProps {
  isAuthenticated: boolean | undefined;
  login: (token: string, millisExpiracy: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const auth = sessionManager.isAuthenticated();
    setIsAuthenticated(auth);
  }, []);

  const login = (token: string, millisExpiracy: number) => {
    sessionManager.setToken(token, millisExpiracy);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionManager.deleteSession();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

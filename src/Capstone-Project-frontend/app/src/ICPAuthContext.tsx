import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient, AuthClientCreateOptions } from '@dfinity/auth-client';

interface ICPAuthContextType {
  isAuthenticated: boolean;
  principal: string | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

const ICPAuthContext = createContext<ICPAuthContextType | undefined>(undefined);

export const ICPAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthClient.create().then((client) => {
      setAuthClient(client);
      client.isAuthenticated().then(async (auth) => {
        setIsAuthenticated(auth);
        if (auth) {
          const identity = client.getIdentity();
          setPrincipal(identity.getPrincipal().toText());
        }
        setLoading(false);
      });
    });
  }, []);

  const login = async () => {
    if (!authClient) return;
    setLoading(true);
    await authClient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: async () => {
        setIsAuthenticated(true);
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
  };

  return (
    <ICPAuthContext.Provider value={{ isAuthenticated, principal, login, logout, loading }}>
      {children}
    </ICPAuthContext.Provider>
  );
};

export const useICPAuth = () => {
  const context = useContext(ICPAuthContext);
  if (!context) {
    throw new Error('useICPAuth must be used within an ICPAuthProvider');
  }
  return context;
}; 
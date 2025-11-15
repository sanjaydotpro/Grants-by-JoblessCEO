"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  savedGrants: string[];
  saveGrant: (grantId: string) => void;
  removeSavedGrant: (grantId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
      return !!storedAuth;
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    try {
      const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
      return storedAuth ? JSON.parse(storedAuth) : null;
    } catch {
      return null;
    }
  });
  const [savedGrants, setSavedGrants] = useState<string[]>(() => {
    try {
      const storedSaved = typeof window !== 'undefined' ? localStorage.getItem('savedGrants') : null;
      return storedSaved ? JSON.parse(storedSaved) : [];
    } catch {
      return [];
    }
  });

  const signIn = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userData = { email, name: email.split('@')[0] };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const signUp = async (email: string, password: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userData = { email, name };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
  };

  const saveGrant = (grantId: string) => {
    const updated = [...savedGrants, grantId];
    setSavedGrants(updated);
    localStorage.setItem('savedGrants', JSON.stringify(updated));
  };

  const removeSavedGrant = (grantId: string) => {
    const updated = savedGrants.filter(id => id !== grantId);
    setSavedGrants(updated);
    localStorage.setItem('savedGrants', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      signIn,
      signUp,
      signOut,
      savedGrants,
      saveGrant,
      removeSavedGrant
    }}>
      {children}
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

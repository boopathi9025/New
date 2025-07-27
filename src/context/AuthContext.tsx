"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useContext } from 'react';
import type { User } from '@/lib/data';
import { users } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'buyer' | 'seller') => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: 'buyer' | 'seller') => {
    // This is a mock login. In a real app, you'd verify credentials.
    const foundUser = users.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    // Simple mock for new user registration
    const newUser: User = { id: `user_${Date.now()}`, name: 'New User', email, role };
    users.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

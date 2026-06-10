import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, SignupData, UserRole } from '@/types/auth.types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials, role?: UserRole) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, User> = {
  'learner@demo.com': {
    id: '1', name: 'Alex Morgan', email: 'learner@demo.com', role: 'learner',
    language: 'English', proficiencyLevel: 'Intermediate', joinDate: '2024-01-15', streak: 12, points: 2450,
  },
  'tutor@demo.com': {
    id: '2', name: 'Dr. Sarah Chen', email: 'tutor@demo.com', role: 'tutor',
    language: 'Mandarin', joinDate: '2023-06-10', streak: 30, points: 8900,
  },
  'translator@demo.com': {
    id: '5', name: 'Elena Rossi', email: 'translator@demo.com', role: 'translator',
    language: 'Italian', joinDate: '2024-03-01', streak: 8, points: 3200,
  },
  'corporate@demo.com': {
    id: '3', name: 'Marcus Williams', email: 'corporate@demo.com', role: 'corporate', joinDate: '2024-02-20',
  },
  'admin@demo.com': {
    id: '4', name: 'Admin User', email: 'admin@demo.com', role: 'admin', joinDate: '2022-01-01',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('tbw_user');
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials, role?: UserRole) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const mockUser = MOCK_USERS[credentials.email];
    if (mockUser) {
      const userToStore = role ? { ...mockUser, role } : mockUser;
      setUser(userToStore);
      localStorage.setItem('tbw_user', JSON.stringify(userToStore));
    } else {
      const genericUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: role || 'learner',
        joinDate: new Date().toISOString().split('T')[0],
        streak: 1, points: 0,
      };
      setUser(genericUser);
      localStorage.setItem('tbw_user', JSON.stringify(genericUser));
    }
    setIsLoading(false);
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name, email: data.email, role: data.role,
      language: data.language, joinDate: new Date().toISOString().split('T')[0], streak: 0, points: 0,
    };
    setUser(newUser);
    localStorage.setItem('tbw_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tbw_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};

export default AuthContext;

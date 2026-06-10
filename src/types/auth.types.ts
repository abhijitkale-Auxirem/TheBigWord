export type UserRole = 'learner' | 'tutor' | 'corporate' | 'admin' | 'translator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  language?: string;
  proficiencyLevel?: string;
  joinDate?: string;
  streak?: number;
  points?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  language?: string;
}

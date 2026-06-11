export type UserRole = 'learner' | 'tutor' | 'corporate' | 'admin' | 'translator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;

  // Common
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
  joinDate?: string;
  streak?: number;
  points?: number;

  // Learner
  language?: string;
  proficiencyLevel?: string;
  targetLanguage?: string;
  nativeLanguage?: string;
  learningGoal?: string;
  weeklyGoal?: string;

  // Tutor
  headline?: string;
  languages?: string[];
  specialties?: string[];
  rate?: string;
  education?: string;
  certifications?: string;

  // Translator
  langPairs?: string[];
  domains?: string[];
  yearsExp?: string;
  translatorCerts?: string[];

  // Corporate
  companyName?: string;
  industry?: string;
  companySize?: string;
  country?: string;
  website?: string;
  contactName?: string;
  description?: string;
  vatNumber?: string;

  // Admin
  department?: string;
  phone?: string;

  // Settings (persisted globally)
  settings?: Record<string, unknown>;
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

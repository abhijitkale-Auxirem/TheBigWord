export interface LearnerProfile {
  targetLanguage: string;
  nativeLanguage: string;
  proficiencyLevel: 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'proficient';
  learningGoal: string;
  weeklyGoal: number;
  totalWordsLearned: number;
  coursesEnrolled: number;
  certificationsEarned: number;
  streakDays: number;
  totalPoints: number;
}

export interface TutorProfile {
  specializations: string[];
  languages: string[];
  hourlyRate: number;
  totalStudents: number;
  rating: number;
  totalClasses: number;
  availability: string[];
  bio: string;
}

export interface CorporateProfile {
  companyName: string;
  industry: string;
  employeesEnrolled: number;
  activeProgrammes: number;
  totalBudget: number;
  completionRate: number;
}

export interface VocabWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
  category: string;
  synonyms: string[];
}

export interface Course {
  id: string;
  title: string;
  language: string;
  level: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  instructor: string;
  thumbnail: string;
  category: string;
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  score: number;
  language: string;
  level: string;
  verified: boolean;
}

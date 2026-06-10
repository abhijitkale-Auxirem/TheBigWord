export const API_BASE_URL = '/api/v1';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,

  // Learner
  VOCABULARY: `${API_BASE_URL}/vocabulary`,
  COURSES: `${API_BASE_URL}/courses`,
  CERTIFICATIONS: `${API_BASE_URL}/certifications`,

  // Tutor
  SCHEDULE: `${API_BASE_URL}/tutor/schedule`,
  STUDENTS: `${API_BASE_URL}/tutor/students`,
  EARNINGS: `${API_BASE_URL}/tutor/earnings`,

  // Translation
  TRANSLATE: `${API_BASE_URL}/translate`,

  // Admin
  USERS: `${API_BASE_URL}/admin/users`,
  PLATFORM_STATS: `${API_BASE_URL}/admin/stats`,
  REVENUE: `${API_BASE_URL}/admin/revenue`,
} as const;

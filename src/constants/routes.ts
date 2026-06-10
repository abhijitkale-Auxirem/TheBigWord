export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  ADMIN_LOGIN: '/admin/login',

  // Public pages
  BLOG: '/blog',
  BLOG_DETAILS: '/blog/:slug',
  CAREERS: '/careers',
  HELP_CENTER: '/help',
  CONTACT: '/contact',
  PRESS: '/press',
  DOCUMENTATION: '/docs',

  // Learner
  LEARNER_DASHBOARD: '/dashboard/learner',
  LEARNER_COURSES: '/dashboard/learner/courses',
  LEARNER_VOCABULARY: '/dashboard/learner/vocabulary',
  LEARNER_COACH: '/dashboard/learner/coach',
  LEARNER_TRANSLATION: '/dashboard/learner/translation',
  LEARNER_CONTENT_STUDIO: '/dashboard/learner/studio',
  LEARNER_TUTOR_BOOKING: '/dashboard/learner/tutors',
  LEARNER_COMMUNITY: '/dashboard/learner/community',
  LEARNER_TESTING: '/dashboard/learner/testing',
  LEARNER_CERTIFICATIONS: '/dashboard/learner/certifications',
  LEARNER_PROFILE: '/dashboard/learner/profile',
  LEARNER_SETTINGS: '/dashboard/learner/settings',

  // Tutor
  TUTOR_DASHBOARD: '/dashboard/tutor',
  TUTOR_SCHEDULE: '/dashboard/tutor/schedule',
  TUTOR_EVALUATIONS: '/dashboard/tutor/evaluations',
  TUTOR_EARNINGS: '/dashboard/tutor/earnings',
  TUTOR_PROFILE: '/dashboard/tutor/profile',
  TUTOR_SETTINGS: '/dashboard/tutor/settings',

  // Translator
  TRANSLATOR_DASHBOARD: '/dashboard/translator',
  TRANSLATOR_MARKETPLACE: '/dashboard/translator/marketplace',
  TRANSLATOR_TOOLS: '/dashboard/translator/tools',
  TRANSLATOR_PROFILE: '/dashboard/translator/profile',
  TRANSLATOR_SETTINGS: '/dashboard/translator/settings',

  // Corporate
  CORPORATE_DASHBOARD: '/dashboard/corporate',
  CORPORATE_ANALYTICS: '/dashboard/corporate/analytics',
  CORPORATE_PROGRAMS: '/dashboard/corporate/programs',
  CORPORATE_BILLINGS: '/dashboard/corporate/billings',
  CORPORATE_PROFILE: '/dashboard/corporate/profile',
  CORPORATE_SETTINGS: '/dashboard/corporate/settings',

  // Admin
  ADMIN_DASHBOARD: '/dashboard/admin',
  ADMIN_USERS: '/dashboard/admin/users',
  ADMIN_COURSES: '/dashboard/admin/courses',
  ADMIN_CERTIFICATIONS: '/dashboard/admin/certifications',
  ADMIN_MODERATION: '/dashboard/admin/moderation',
  ADMIN_REVENUE: '/dashboard/admin/revenue',
  ADMIN_PROFILE: '/dashboard/admin/profile',
  ADMIN_SETTINGS: '/dashboard/admin/settings',
} as const;

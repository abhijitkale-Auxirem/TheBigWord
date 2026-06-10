import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

export const phoneSchema = z.string()
  .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits');

export const emailSchema = z.string().email('Invalid email address');

export const urlSchema = z.string().url('Please enter a valid URL');

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Phone number must be exactly 10 digits',
  PASSWORD_MIN: 'Password must be at least 8 characters',
  PASSWORD_MATCH: "Passwords don't match",
} as const;

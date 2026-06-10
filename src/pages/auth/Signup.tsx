import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import { UserRole } from '@/types/auth.types';
import { Eye, EyeOff, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['learner', 'tutor', 'translator', 'corporate', 'admin']),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

type SignupForm = z.infer<typeof signupSchema>;

const ROLE_OPTIONS: { value: UserRole; label: string; desc: string; emoji: string }[] = [
  { value: 'learner', label: 'Learner', desc: 'Learn & practice', emoji: '📚' },
  { value: 'tutor', label: 'Tutor', desc: 'Teach & earn', emoji: '🎓' },
  { value: 'translator', label: 'Translator', desc: 'Translate & grow', emoji: '🌐' },
  { value: 'corporate', label: 'Corporate', desc: 'Upskill teams', emoji: '🏢' },
];

const ROLE_ROUTES: Record<UserRole, string> = {
  learner: ROUTES.LEARNER_DASHBOARD,
  tutor: ROUTES.TUTOR_DASHBOARD,
  translator: ROUTES.TRANSLATOR_DASHBOARD,
  corporate: ROUTES.CORPORATE_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD,
};

const PERKS = [
  'AI-powered vocabulary builder',
  'Mock IELTS, TOEFL & PTE tests',
  'Connect with native speakers',
  'Earn verified certifications',
];

const Signup: React.FC = () => {
  const { signup, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('learner');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'learner' },
  });

  const onSubmit = async (data: SignupForm) => {
    await signup({ name: data.name, email: data.email, password: data.password, role: data.role });
    toast.success('Welcome to TheBigWord! Your journey begins now.');
    navigate(ROLE_ROUTES[data.role]);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <AuthLayout>
      <div>
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5" /> Free Forever Plan Available
          </div>
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground">Start your language journey — free forever.</p>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-2 gap-2 mb-6 animate-fade-in delay-100">
          {PERKS.map(perk => (
            <div key={perk} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground">{perk}</span>
            </div>
          ))}
        </div>

        {/* Role Selection */}
        <div className="mb-5 animate-fade-in delay-200">
          <Label className="text-sm font-medium mb-2 block">I am signing up as</Label>
          <div className="grid grid-cols-2 gap-2">
            {ROLE_OPTIONS.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => handleRoleSelect(r.value)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === r.value
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                    : 'border-border hover:border-primary/30 hover:bg-brand-surface'
                }`}
              >
                <div className="text-base mb-1">{r.emoji}</div>
                <div className="text-xs font-semibold text-foreground">{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in delay-300">
          <input type="hidden" {...register('role')} value={selectedRole} />

          <div>
            <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Full Name</Label>
            <Input id="name" placeholder="Your full name" {...register('name')}
              className={`h-11 rounded-xl ${errors.name ? 'border-destructive' : ''}`} />
            {errors.name && <p className="text-destructive text-xs mt-1 animate-fade-in">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register('email')}
              className={`h-11 rounded-xl ${errors.email ? 'border-destructive' : ''}`} />
            {errors.email && <p className="text-destructive text-xs mt-1 animate-fade-in">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium mb-1.5 block">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters"
                {...register('password')} className={`h-11 pr-10 rounded-xl ${errors.password ? 'border-destructive' : ''}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-destructive text-xs mt-1 animate-fade-in">{errors.password.message}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium mb-1.5 block">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Re-enter your password"
              {...register('confirmPassword')} className={`h-11 rounded-xl ${errors.confirmPassword ? 'border-destructive' : ''}`} />
            {errors.confirmPassword && <p className="text-destructive text-xs mt-1 animate-fade-in">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" disabled={isLoading}
            className="w-full h-11 gradient-primary text-white border-0 font-semibold text-sm hover:opacity-90 transition-all rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 mt-2">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isLoading ? 'Creating account...' : 'Create Free Account'}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By signing up, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms</a> &{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4 animate-fade-in delay-400">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;

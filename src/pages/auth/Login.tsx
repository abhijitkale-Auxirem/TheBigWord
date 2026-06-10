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
import { Eye, EyeOff, Loader2, ChevronDown, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
type LoginForm = z.infer<typeof loginSchema>;

const ROLE_OPTIONS: { value: UserRole; label: string; emoji: string }[] = [
  { value: 'learner', label: 'Language Learner', emoji: '📚' },
  { value: 'tutor', label: 'Tutor / Trainer', emoji: '🎓' },
  { value: 'translator', label: 'Translator', emoji: '🌐' },
  { value: 'corporate', label: 'Corporate Account', emoji: '🏢' },
  { value: 'admin', label: 'Administrator', emoji: '🛡️' },
];

const ROLE_ROUTES: Record<UserRole, string> = {
  learner: ROUTES.LEARNER_DASHBOARD,
  tutor: ROUTES.TUTOR_DASHBOARD,
  translator: ROUTES.TRANSLATOR_DASHBOARD,
  corporate: ROUTES.CORPORATE_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD,
};

const DEMO_ACCOUNTS = [
  { label: 'Learner', email: 'learner@demo.com', password: 'demo123', role: 'learner' as UserRole },
  { label: 'Tutor', email: 'tutor@demo.com', password: 'demo123', role: 'tutor' as UserRole },
  { label: 'Translator', email: 'translator@demo.com', password: 'demo123', role: 'translator' as UserRole },
  { label: 'Corporate', email: 'corporate@demo.com', password: 'demo123', role: 'corporate' as UserRole },
  { label: 'Admin', email: 'admin@demo.com', password: 'demo123', role: 'admin' as UserRole },
];

const Login: React.FC = () => {
  const { login, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('learner');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    await login(data, selectedRole);
    toast.success('Welcome back to TheBigWord!');
    navigate(ROLE_ROUTES[selectedRole]);
  };

  const fillDemo = (demo: typeof DEMO_ACCOUNTS[0]) => {
    setValue('email', demo.email);
    setValue('password', demo.password);
    setSelectedRole(demo.role);
  };

  return (
    <AuthLayout>
      <div>
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Language Platform
          </div>
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue your language journey.</p>
        </div>

        {/* Demo Accounts */}
        <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-fade-in delay-100">
          <p className="text-xs font-semibold text-blue-700 mb-3 flex items-center gap-1.5 uppercase tracking-wide">
            <Sparkles className="w-3 h-3" /> Quick Demo Access
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map(demo => (
              <button
                key={demo.role}
                onClick={() => fillDemo(demo)}
                className="text-xs bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all font-medium"
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in delay-200">
          {/* Role Selector */}
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Signing in as</Label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value as UserRole)}
                className="w-full appearance-none bg-white border border-input rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-8"
              >
                {ROLE_OPTIONS.map(r => (
                  <option key={r.value} value={r.value}>{r.emoji} {r.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email Address</Label>
            <Input
              id="email" type="email" placeholder="you@example.com"
              {...register('email')}
              className={`h-11 rounded-xl transition-all ${errors.email ? 'border-destructive' : 'focus:border-primary'}`}
            />
            {errors.email && <p className="text-destructive text-xs mt-1 animate-fade-in">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className={`h-11 pr-10 rounded-xl ${errors.password ? 'border-destructive' : 'focus:border-primary'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-destructive text-xs mt-1 animate-fade-in">{errors.password.message}</p>}
          </div>

          <Button
            type="submit" disabled={isLoading}
            className="w-full h-11 gradient-primary text-white border-0 font-semibold text-sm hover:opacity-90 transition-all rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isLoading ? 'Signing in...' : 'Sign In to TheBigWord'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-in delay-300">
          Don't have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="text-primary font-semibold hover:underline">Sign up free</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;

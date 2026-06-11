import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import { UserRole } from '@/types/auth.types';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ROLE_ROUTES: Record<UserRole, string> = {
  learner: ROUTES.LEARNER_DASHBOARD,
  tutor: ROUTES.TUTOR_DASHBOARD,
  translator: ROUTES.TRANSLATOR_DASHBOARD,
  corporate: ROUTES.CORPORATE_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD,
};

const AdminLogin: React.FC = () => {
  const { login, isAuthenticated, isLoading, user } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(ROLE_ROUTES[user.role], { replace: true });
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password }, 'admin');
    toast.success('Admin access granted.');
    navigate(ROUTES.ADMIN_DASHBOARD);
  };

  return (
    <AuthLayout>
      <div className="animate-fade-in">
        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
          <Shield className="w-7 h-7 text-red-600" />
        </div>
        <h1 className="font-heading font-bold text-3xl mb-2">Admin Access</h1>
        <p className="text-muted-foreground text-sm mb-8">Restricted area. Authorized personnel only.</p>

        <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium">
          Demo credentials pre-filled. Click Sign In to access.
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Admin Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="h-11 rounded-xl" placeholder="admin@example.com" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Admin Password</Label>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)} className="h-11 pr-10 rounded-xl" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" disabled={isLoading}
            className="w-full h-11 bg-red-600 hover:bg-red-700 text-white border-0 font-semibold rounded-xl">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
            {isLoading ? 'Authenticating...' : 'Secure Admin Sign In'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;

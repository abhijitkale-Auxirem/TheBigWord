import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/constants/routes';
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('Reset link sent to your email!');
  };

  return (
    <AuthLayout>
      <div className="animate-fade-in">
        <Link to={ROUTES.LOGIN} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>

        {!sent ? (
          <>
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-heading font-bold text-3xl mb-2">Forgot password?</h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              No worries! Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email Address</Label>
                <Input
                  id="email" type="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <Button type="submit" disabled={loading || !email}
                className="w-full h-11 gradient-primary text-white border-0 font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center animate-fade-in-scale">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-2">Check your email</h2>
            <p className="text-muted-foreground text-sm mb-6">
              We sent a password reset link to <strong>{email}</strong>
            </p>
            <Button onClick={() => setSent(false)} variant="outline" className="rounded-xl">
              Try another email
            </Button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-8">
          Remember your password?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

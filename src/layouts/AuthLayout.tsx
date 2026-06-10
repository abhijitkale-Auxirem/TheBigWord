import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AUTH_HIGHLIGHTS = [
  { lang: 'Spanish', flag: '🇪🇸', word: 'Hola', users: '85K learners' },
  { lang: 'French', flag: '🇫🇷', word: 'Bonjour', users: '62K learners' },
  { lang: 'Mandarin', flag: '🇨🇳', word: '你好', users: '110K learners' },
  { lang: 'Arabic', flag: '🇸🇦', word: 'مرحبا', users: '48K learners' },
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel – Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden flex-col justify-between p-12">
        {/* Blobs */}
        <div className="absolute top-[-80px] left-[-60px] w-80 h-80 bg-blue-500/20 rounded-full animate-blob" />
        <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 bg-indigo-500/20 rounded-full animate-blob delay-400" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-500/10 rounded-full animate-blob delay-200" />

        {/* Logo */}
        <Link to={ROUTES.HOME} className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-white">TheBigWord</span>
        </Link>

        {/* Center Content */}
        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-4xl text-white mb-3 leading-tight">
              Master Every<br />Language with AI
            </h2>
            <p className="text-blue-100/80 text-base leading-relaxed max-w-xs">
              Join 500,000+ learners building fluency, earning certifications, and connecting globally.
            </p>
          </div>

          {/* Language Cards */}
          <div className="grid grid-cols-2 gap-3">
            {AUTH_HIGHLIGHTS.map((item, i) => (
              <div
                key={item.lang}
                className={`glass-card rounded-2xl p-4 animate-fade-in`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.flag}</span>
                  <span className="text-white font-semibold text-sm">{item.lang}</span>
                </div>
                <div className="text-2xl font-heading font-bold text-white mb-1">{item.word}</div>
                <div className="text-xs text-blue-200/70">{item.users}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat */}
        <div className="relative z-10 flex items-center gap-6">
          {[{ v: '50+', l: 'Languages' }, { v: '98%', l: 'Satisfaction' }, { v: '10K+', l: 'Tutors' }].map(s => (
            <div key={s.l} className="text-center">
              <div className="font-heading font-bold text-xl text-white">{s.v}</div>
              <div className="text-xs text-blue-200/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel – Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white overflow-y-auto">
        {/* Mobile Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl">
            <span className="text-gradient">TheBig</span><span>Word</span>
          </span>
        </Link>

        <div className="w-full max-w-md animate-fade-in-scale">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AUTH_HIGHLIGHTS = [
  { lang: 'English', flagCode: 'gb', word: 'Hello', users: '120K learners' },
  { lang: 'Sanskrit', flagCode: 'in', word: 'नमो नमः', users: '30K learners' },
  { lang: 'Japanese', flagCode: 'jp', word: 'こんにちは', users: '95K learners' },
  { lang: 'Spanish', flagCode: 'es', word: 'Hola', users: '85K learners' },
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel – Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0c2a93] gradient-hero relative overflow-hidden flex-col justify-between p-12">
        {/* Blobs */}
        <div className="absolute top-[-80px] left-[-60px] w-80 h-80 bg-blue-500/20 rounded-full animate-blob" />
        <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 bg-indigo-500/20 rounded-full animate-blob delay-400" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-500/10 rounded-full animate-blob delay-200" />

        {/* Logo */}
        <Link to={ROUTES.HOME} className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-white">TheBigWord</span>
        </Link>

        {/* Center Content */}
        <div className="relative z-10 my-auto">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-[40px] text-white mb-4 leading-[1.15] tracking-tight">
              Master Every<br />Language with AI
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Join 500,000+ learners building fluency, earning certifications, and connecting globally.
            </p>
          </div>

          {/* Language Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            {AUTH_HIGHLIGHTS.map((item, i) => (
              <div
                key={item.lang}
                className="bg-white/15 border border-white/5 rounded-2xl p-5 shadow-sm backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {/* Real flag image instead of emoji */}
                  <img 
                    src={`https://flagcdn.com/w40/${item.flagCode}.png`} 
                    srcSet={`https://flagcdn.com/w80/${item.flagCode}.png 2x`}
                    width="20"
                    alt={`${item.lang} flag`}
                    className="rounded-[2px] object-cover h-3.5 shadow-sm"
                  />
                  <span className="text-white/90 font-medium text-sm">{item.lang}</span>
                </div>
                <div className="text-3xl font-heading font-bold text-white mb-1.5 tracking-tight">{item.word}</div>
                <div className="text-xs text-white/30 font-medium">{item.users}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat */}
        <div className="relative z-10 flex items-center gap-8 mt-auto pt-8">
          {[{ v: '50+', l: 'Languages' }, { v: '98%', l: 'Satisfaction' }, { v: '10K+', l: 'Tutors' }].map(s => (
            <div key={s.l} className="text-left">
              <div className="font-heading font-bold text-xl text-white">{s.v}</div>
              <div className="text-xs text-white/50 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel – Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white overflow-y-auto">
        {/* Mobile Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl">
            <span className="text-blue-600">TheBig</span><span className="text-slate-900">Word</span>
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
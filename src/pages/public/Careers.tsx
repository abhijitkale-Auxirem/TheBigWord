import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { MapPin, Clock, ArrowRight, Briefcase, Users, Globe, Zap } from 'lucide-react';
import { toast } from 'sonner';

const OPEN_ROLES = [
  { title: 'AI Speech & Pronunciation Engineer', dept: 'AI Research', location: 'Remote (Global)', type: 'Full-time', tags: ['Python', 'ASR', 'Whisper API', 'PyTorch'] },
  { title: 'Language Curriculum Specialist (Spanish/English)', dept: 'Pedagogy & Education', location: 'Remote', type: 'Full-time', tags: ['CEFR', 'Curriculum Design', 'Linguistics'] },
  { title: 'EdTech Product Manager — Gamification', dept: 'Product Management', location: 'Remote', type: 'Full-time', tags: ['B2C App', 'Gamification', 'Analytics'] },
  { title: 'React Native Mobile Developer (Language App)', dept: 'Engineering', location: 'Remote', type: 'Full-time', tags: ['React Native', 'TypeScript', 'Tailwind', 'WebSockets'] },
  { title: 'Localization Engineer (50+ Languages)', dept: 'Localization & Ops', location: 'Remote', type: 'Part-time', tags: ['L10n', 'i18n', 'Translation Workflows'] },
  { title: 'Bilingual Customer Support Lead', dept: 'Customer Operations', location: 'Remote', type: 'Full-time', tags: ['Zendesk', 'Bilingual Support', 'SaaS'] },
];

const PERKS = [
  { icon: <Globe className="w-6 h-6 text-blue-500" />, title: '100% Remote', desc: 'Work from anywhere in the world. We are truly global.' },
  { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: 'AI-First Culture', desc: 'Be at the forefront of AI-powered EdTech innovation.' },
  { icon: <Users className="w-6 h-6 text-purple-500" />, title: 'Diverse Team', desc: '50+ nationalities across 30 countries on one team.' },
  { icon: <Briefcase className="w-6 h-6 text-emerald-500" />, title: 'Equity & Growth', desc: 'Competitive salary, equity, and unlimited learning budget.' },
];

const Careers: React.FC = () => {
  const handleApply = (title: string) => {
    toast.success(`Application portal initiated for "${title}"! Please forward your CV/Resume to careers@thebigword.ai`);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute text-white font-bold text-6xl animate-float"
              style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%`, animationDelay: `${i * 0.3}s`, opacity: 0.3 }}>
              {['💼', '🌍', '📚', '🎓', '🚀'][i % 5]}
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white font-medium mb-6 animate-fade-in">
            We are hiring globally
          </div>
          <h1 className="font-heading font-bold text-5xl text-white mb-4 animate-fade-in delay-100">
            Build the Future of<br /><span className="text-blue-300">Language Learning</span>
          </h1>
          <p className="text-blue-100/80 text-lg mb-8 animate-fade-in delay-200">
            Join a mission-driven team helping millions master new languages through AI technology.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-200/70 animate-fade-in delay-300">
            <span>500K+ learners impacted</span>
            <span>•</span>
            <span>50+ team members worldwide</span>
            <span>•</span>
            <span>Series A backed</span>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading font-bold text-3xl text-center mb-10">Why TheBigWord?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {PERKS.map(perk => (
              <div key={perk.title} className="p-6 rounded-2xl bg-brand-surface border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">{perk.icon}</div>
                <h3 className="font-heading font-semibold text-base mb-2">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 bg-brand-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading font-bold text-3xl text-center mb-10">Open Positions</h2>
          <div className="space-y-3 stagger-children">
            {OPEN_ROLES.map(role => (
              <div 
                key={role.title}
                onClick={() => handleApply(role.title)}
                className="bg-white rounded-2xl border border-border p-5 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{role.dept}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{role.type}</span>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {role.tags.map(t => <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{t}</span>)}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(role.title);
                    }}
                    className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all flex-shrink-0"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Careers;

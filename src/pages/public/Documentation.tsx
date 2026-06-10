import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { ChevronRight, BookOpen, Code, Globe, Zap, Search } from 'lucide-react';

const DOC_SECTIONS = [
  {
    icon: <Zap className="w-5 h-5 text-yellow-500" />, title: 'Quick Start',
    pages: ['Platform Overview', 'Account Setup Guide', 'Language Profile Setup', 'Your First Lesson'],
  },
  {
    icon: <BookOpen className="w-5 h-5 text-blue-500" />, title: 'Learning Features',
    pages: ['Vocabulary Builder Engine', 'AI Conversation Coach', 'Translation Hub Usage', 'Content Studio Guide', 'Testing Center Access'],
  },
  {
    icon: <Globe className="w-5 h-5 text-emerald-500" />, title: 'Certification Guide',
    pages: ['Available Certifications', 'Mock Test Instructions', 'Scoring & Grading', 'Sharing Your Certificate'],
  },
  {
    icon: <Code className="w-5 h-5 text-purple-500" />, title: 'API & Integrations',
    pages: ['REST API Overview', 'Authentication', 'Webhook Events', 'Corporate LMS Integration'],
  },
];

const Documentation: React.FC = () => {
  const [query, setQuery] = useState('');
  return (
    <PublicLayout>
      <section className="gradient-hero py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-5xl text-white mb-4 animate-fade-in">Documentation</h1>
        <p className="text-blue-100/80 mb-8 animate-fade-in delay-100">Everything you need to get the most from TheBigWord.</p>
        <div className="max-w-lg mx-auto relative animate-fade-in delay-200">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search documentation..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white text-sm outline-none shadow-xl" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          {DOC_SECTIONS.map(sec => (
            <div key={sec.title} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center">{sec.icon}</div>
                <h3 className="font-heading font-bold text-lg">{sec.title}</h3>
              </div>
              <ul className="space-y-2">
                {sec.pages.filter(p => !query || p.toLowerCase().includes(query.toLowerCase())).map(page => (
                  <li key={page}>
                    <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                      <ChevronRight className="w-4 h-4 flex-shrink-0" /> {page}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Documentation;

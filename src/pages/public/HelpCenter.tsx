import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Search, ChevronDown, ChevronRight, BookOpen, Headphones, Globe, FileText, Trophy, Users } from 'lucide-react';

const CATEGORIES = [
  {
    icon: <BookOpen className="w-5 h-5 text-blue-500" />,
    title: 'Getting Started',
    articles: ['How to create your account', 'Setting up your language profile', 'Taking your first assessment', 'Navigating the dashboard'],
  },
  {
    icon: <Globe className="w-5 h-5 text-emerald-500" />,
    title: 'Vocabulary Builder',
    articles: ['Using flashcards effectively', 'Word of the Day explained', 'Vocabulary challenge rules', 'Tracking your word progress'],
  },
  {
    icon: <Headphones className="w-5 h-5 text-purple-500" />,
    title: 'AI Conversation Coach',
    articles: ['Starting your first AI session', 'Choosing conversation scenarios', 'Understanding your speaking score', 'Accent improvement tips'],
  },
  {
    icon: <FileText className="w-5 h-5 text-orange-500" />,
    title: 'Content Studio',
    articles: ['Grammar checker guide', 'Using the AI writing assistant', 'Email templates library', 'Academic writing support'],
  },
  {
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    title: 'Certifications',
    articles: ['Available certifications list', 'IELTS mock test guide', 'How to share certificates', 'Certificate verification'],
  },
  {
    icon: <Users className="w-5 h-5 text-pink-500" />,
    title: 'Account & Billing',
    articles: ['Managing your subscription', 'Changing payment method', 'Cancellation policy', 'Data privacy settings'],
  },
];

const HelpCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>('Getting Started');

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-20 px-4 text-center">
        <h1 className="font-heading font-bold text-5xl text-white mb-4 animate-fade-in">How can we help you?</h1>
        <p className="text-blue-100/80 mb-8 animate-fade-in delay-100">Search our knowledge base or browse categories below.</p>
        <div className="max-w-xl mx-auto relative animate-fade-in delay-200">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search for answers..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white text-base shadow-2xl outline-none" />
        </div>
        <p className="text-blue-200/60 text-sm mt-4 animate-fade-in delay-300">Popular: account setup, vocabulary builder, IELTS test, billing</p>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {CATEGORIES.filter(c => !query || c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.articles.some(a => a.toLowerCase().includes(query.toLowerCase()))
          ).map(cat => (
            <div key={cat.title} className="bg-white rounded-2xl border border-border overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === cat.title ? null : cat.title)}
                className="flex items-center gap-3 w-full p-5 hover:bg-brand-surface transition-colors text-left"
              >
                <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center flex-shrink-0">{cat.icon}</div>
                <span className="font-heading font-semibold text-base flex-1">{cat.title}</span>
                <span className="text-xs text-muted-foreground mr-2">{cat.articles.length} articles</span>
                {expanded === cat.title ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>
              {expanded === cat.title && (
                <div className="px-5 pb-4 border-t border-border">
                  <ul className="mt-3 space-y-2">
                    {cat.articles.map(a => (
                      <li key={a}>
                        <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" /> {a}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 text-center p-10 bg-brand-surface rounded-3xl border border-border">
          <h3 className="font-heading font-bold text-2xl mb-2">Can't find what you need?</h3>
          <p className="text-muted-foreground mb-6">Our support team is available 24/7 to help you.</p>
          <a href="/contact"
            className="inline-flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
            Contact Support
          </a>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HelpCenter;

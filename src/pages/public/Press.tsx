import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Download, ExternalLink, Mail } from 'lucide-react';

const PRESS_RELEASES = [
  { date: 'June 1, 2026', title: 'TheBigWord Surpasses 500,000 Active Users Milestone', excerpt: 'Platform announces major growth milestone, powered by AI language coaching technology.' },
  { date: 'April 15, 2026', title: 'TheBigWord Launches AI Conversation Coach with Real-Time Feedback', excerpt: 'New feature uses advanced speech analysis to provide instant pronunciation and grammar feedback.' },
  { date: 'February 8, 2026', title: 'TheBigWord Partners with 200 Corporate Organizations Globally', excerpt: 'Enterprise partnerships now span 45 countries across financial, tech, and healthcare sectors.' },
  { date: 'January 3, 2026', title: 'TheBigWord Raises Series A Funding to Expand Global Language Platform', excerpt: 'Investment will accelerate AI development, market expansion, and tutor marketplace growth.' },
];

const MEDIA_MENTIONS = [
  { outlet: 'TechCrunch', title: 'The Duolingo killer? TheBigWord bets on AI coaching', date: 'May 2026', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=120&q=80' },
  { outlet: 'Forbes', title: 'EdTech Startup TheBigWord Is Revolutionizing Language Learning', date: 'April 2026', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=120&q=80' },
  { outlet: 'The Guardian', title: 'How AI is making language learning accessible for everyone', date: 'March 2026', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=120&q=80' },
];

const Press: React.FC = () => (
  <PublicLayout>
    <section className="gradient-hero py-16 px-4 text-center">
      <h1 className="font-heading font-bold text-5xl text-white mb-4 animate-fade-in">Press & Media</h1>
      <p className="text-blue-100/80 text-lg animate-fade-in delay-100">News, updates, and resources for media professionals.</p>
    </section>

    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      {/* Press Contact */}
      <div className="gradient-primary rounded-2xl p-7 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-white animate-fade-in">
        <div>
          <h3 className="font-heading font-bold text-xl mb-1">Media Inquiries</h3>
          <p className="text-blue-100/80 text-sm">For press inquiries, interviews, and partnership opportunities.</p>
        </div>
        <a href="mailto:press@thebigword.ai"
          className="flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0">
          <Mail className="w-4 h-4" /> press@thebigword.ai
        </a>
      </div>

      {/* Press Releases */}
      <h2 className="font-heading font-bold text-2xl mb-6">Press Releases</h2>
      <div className="space-y-4 mb-14 stagger-children">
        {PRESS_RELEASES.map(pr => (
          <div key={pr.title} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-2">{pr.date}</div>
                <h3 className="font-heading font-semibold text-base mb-1.5 group-hover:text-primary transition-colors">{pr.title}</h3>
                <p className="text-sm text-muted-foreground">{pr.excerpt}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button className="p-2 rounded-lg border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Kit */}
      <div className="bg-brand-surface rounded-3xl border border-border p-8 text-center animate-fade-in">
        <h2 className="font-heading font-bold text-2xl mb-2">Download Media Kit</h2>
        <p className="text-muted-foreground text-sm mb-6">Logos, brand assets, screenshots, and executive bios for media use.</p>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg mx-auto">
          <Download className="w-4 h-4" /> Download Media Kit (ZIP)
        </button>
      </div>
    </section>
  </PublicLayout>
);

export default Press;

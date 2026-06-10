import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Globe, Twitter, Linkedin, Youtube, Instagram, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const FOOTER_LINKS = {
  Platform: [
    { label: 'Features', href: '/#features' },
    { label: 'Courses', href: ROUTES.LEARNER_COURSES },
    { label: 'Certifications', href: '/#certs' },
    { label: 'Tutor Marketplace', href: '/#tutors' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: ROUTES.BLOG },
    { label: 'Careers', href: ROUTES.CAREERS },
    { label: 'Press', href: ROUTES.PRESS },
    { label: 'Contact', href: ROUTES.CONTACT },
  ],
  Support: [
    { label: 'Help Center', href: ROUTES.HELP_CENTER },
    { label: 'Documentation', href: ROUTES.DOCUMENTATION },
    { label: 'Community', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const LANGUAGES_MARQUEE = ['English', 'Español', 'Français', 'Deutsch', '中文', 'العربية', 'हिंदी', '日本語', 'Português', 'Italiano', 'Русский', 'Korean', 'Dutch', 'Turkish', 'Polish'];

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">{children}</main>

      {/* Language Marquee */}
      <div className="bg-brand-surface border-y border-border py-4 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...LANGUAGES_MARQUEE, ...LANGUAGES_MARQUEE].map((lang, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground flex-shrink-0">
              <Globe className="w-4 h-4 text-primary/50" />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top CTA band */}
          <div className="gradient-primary rounded-2xl p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <h3 className="font-heading font-bold text-2xl text-white mb-1">Ready to master a new language?</h3>
              <p className="text-blue-100/80 text-sm">Join 500,000+ learners on TheBigWord today.</p>
            </div>
            <Link
              to={ROUTES.SIGNUP}
              className="relative z-10 flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg flex-shrink-0"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-white">TheBigWord</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
                AI-powered language learning & communication platform for global mastery. Speak every language, fluently.
              </p>
              <div className="flex items-center gap-3">
                {[Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link groups */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-white mb-4 text-sm">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© 2026 TheBigWord Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

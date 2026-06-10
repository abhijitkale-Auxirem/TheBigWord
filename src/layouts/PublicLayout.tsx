import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Globe, Twitter, Linkedin, Youtube, Instagram, ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const FOOTER_LINKS = {
  Platform: [
    { label: 'AI Vocabulary Builder', href: ROUTES.SIGNUP },
    { label: 'AI Conversation Coach', href: ROUTES.SIGNUP },
    { label: 'Translation Platform', href: ROUTES.SIGNUP },
    { label: 'Certification Center', href: ROUTES.SIGNUP },
    { label: 'Tutor Marketplace', href: ROUTES.SIGNUP },
    { label: 'Writing Studio', href: ROUTES.SIGNUP },
  ],
  Learn: [
    { label: 'English', href: ROUTES.SIGNUP },
    { label: 'Spanish', href: ROUTES.SIGNUP },
    { label: 'French', href: ROUTES.SIGNUP },
    { label: 'Mandarin', href: ROUTES.SIGNUP },
    { label: 'Arabic', href: ROUTES.SIGNUP },
    { label: 'View all 50+', href: ROUTES.SIGNUP },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: ROUTES.BLOG },
    { label: 'Careers', href: ROUTES.CAREERS },
    { label: 'Press', href: ROUTES.PRESS },
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'Partners', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: ROUTES.HELP_CENTER },
    { label: 'Documentation', href: ROUTES.DOCUMENTATION },
    { label: 'Community Forum', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Settings', href: '#' },
  ],
};

const SOCIAL_LINKS = [
  { Icon: Twitter, label: 'Twitter', href: '#', color: '#1d9bf0' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0a66c2' },
  { Icon: Youtube, label: 'YouTube', href: '#', color: '#ff0000' },
  { Icon: Instagram, label: 'Instagram', href: '#', color: '#e1306c' },
];

const LANGUAGES_MARQUEE = [
  'English', 'Español', 'Français', 'Deutsch', '中文', 'العربية',
  'हिंदी', '日本語', 'Português', 'Italiano', 'Русский', '한국어',
  'Nederlands', 'Türkçe', 'Polski', 'Tiếng Việt', 'ภาษาไทย', 'Bahasa',
];

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">{children}</main>

      {/* ── Language Marquee ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...LANGUAGES_MARQUEE, ...LANGUAGES_MARQUEE].map((lang, i) => (
            <div key={i} className="marquee-item">
              <Globe className="w-3.5 h-3.5 text-primary/40" />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="footer-root">
        {/* Top glow line */}
        <div className="footer-glow-line" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Newsletter / CTA Band */}
          <div className="footer-cta-band">
            <div className="footer-cta-orb footer-cta-orb-1" />
            <div className="footer-cta-orb footer-cta-orb-2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-blue-200 text-sm font-medium uppercase tracking-widest">Newsletter</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-1">Stay ahead in language learning</h3>
                <p className="text-blue-200/70 text-sm">Weekly tips, new feature drops, and learner success stories.</p>
              </div>
              <form className="footer-newsletter-form" onSubmit={e => e.preventDefault()}>
                <div className="footer-newsletter-input-wrap">
                  <Mail className="footer-newsletter-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="footer-newsletter-input"
                    aria-label="Email for newsletter"
                  />
                </div>
                <button type="submit" className="footer-newsletter-btn">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 py-16">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-2">
              <Link to={ROUTES.HOME} className="flex items-center gap-2.5 mb-5 group">
                <div className="footer-logo-icon">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-white">TheBigWord</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                AI-powered language learning & communication platform for global mastery. Speak every language, fluently.
              </p>

              {/* Contact Info */}
              <div className="space-y-2.5 mb-6">
                {[
                  { Icon: Mail, text: 'hello@thebigword.ai' },
                  { Icon: Phone, text: '+1 (555) 000-1234' },
                  { Icon: MapPin, text: 'San Francisco, CA, USA' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-slate-400 text-xs">
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="footer-social-btn group"
                    style={{ '--social-color': color } as React.CSSProperties}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="col-span-1">
                <h4 className="footer-col-title">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="footer-link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                © 2026 TheBigWord Inc. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span>Made with</span>
                <span className="text-red-400 animate-pulse-slow">♥</span>
                <span>for language learners worldwide</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <span className="w-px h-3 bg-slate-700" />
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <span className="w-px h-3 bg-slate-700" />
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

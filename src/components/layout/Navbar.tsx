import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe, Menu, X, ChevronDown, Zap, BookOpen, Mic, Languages, GraduationCap, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

const FEATURES_DROPDOWN = [
  { icon: BookOpen, label: 'Vocabulary Builder', desc: 'Smart AI flashcards', color: '#3b82f6' },
  { icon: Mic, label: 'AI Coach', desc: 'Real-time speaking practice', color: '#8b5cf6' },
  { icon: Languages, label: 'Translation', desc: '50+ languages instantly', color: '#10b981' },
  { icon: FileText, label: 'Writing Studio', desc: 'Grammar & content AI', color: '#f59e0b' },
  { icon: GraduationCap, label: 'Certifications', desc: 'IELTS, TOEFL, PTE mock', color: '#ef4444' },
  { icon: Users, label: 'Tutor Marketplace', desc: '1-on-1 expert sessions', color: '#ec4899' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setFeaturesOpen(false);
  }, [location]);

  const handleFeaturesEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFeaturesOpen(true);
  };
  const handleFeaturesLeave = () => {
    timerRef.current = setTimeout(() => setFeaturesOpen(false), 150);
  };

  const navLinks = [
    { label: 'Courses',   href: ROUTES.COURSES },
    { label: 'Community', href: ROUTES.COMMUNITY },
    { label: 'Pricing',   href: ROUTES.PRICING },
    { label: 'Blog',      href: ROUTES.BLOG },
  ];

  const isHome = location.pathname === '/';


  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'nav-default'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="nav-logo-icon">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                <span className="text-gradient">TheBig</span>
                <span className="text-foreground">Word</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {/* Features Dropdown */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleFeaturesEnter}
                onMouseLeave={handleFeaturesLeave}
              >
                <button
                  className="nav-link group flex items-center gap-1 nav-link-default"
                >
                  Features
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
                  <span className="nav-underline" />
                </button>

                {featuresOpen && (
                  <div className="nav-dropdown">
                    <div className="nav-dropdown-inner">
                      <div className="px-4 pt-4 pb-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Platform Features</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1 p-2">
                        {FEATURES_DROPDOWN.map((f) => (
                          <Link
                            key={f.label}
                            to={ROUTES.SIGNUP}
                            className="nav-dropdown-item group/item"
                          >
                            <div
                              className="nav-dropdown-icon"
                              style={{ background: `${f.color}18`, color: f.color }}
                            >
                              <f.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">{f.label}</div>
                              <div className="text-xs text-muted-foreground">{f.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-border/50 mt-1">
                        <Link to={ROUTES.SIGNUP} className="flex items-center gap-2 text-xs font-semibold text-primary hover:gap-3 transition-all">
                          <Zap className="w-3.5 h-3.5" />
                          Explore all features →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="nav-link group relative nav-link-default"
                >
                  {link.label}
                  <span className="nav-underline" />
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="nav-signin-btn text-muted-foreground hover:text-primary hover:bg-muted"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate(ROUTES.SIGNUP)}
                className="nav-cta-btn"
              >
                <Zap className="w-3.5 h-3.5" />
                Get Started Free
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              id="navbar-mobile-toggle"
              className={`md:hidden p-2 rounded-xl transition-all hover:bg-muted text-foreground`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu md:hidden ${mobileOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
          <div className="px-4 pb-6 pt-2 flex flex-col gap-1">
            <div className="mobile-nav-section-label">Navigation</div>
            <Link to="/#features" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Features</Link>
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
              <Button variant="outline" onClick={() => { navigate(ROUTES.LOGIN); setMobileOpen(false); }} className="rounded-xl h-11">
                Sign In
              </Button>
              <Button onClick={() => { navigate(ROUTES.SIGNUP); setMobileOpen(false); }} className="gradient-primary text-white border-0 rounded-xl h-11 gap-2">
                <Zap className="w-4 h-4" /> Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

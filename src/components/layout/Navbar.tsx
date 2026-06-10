import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Bell, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Courses', href: '/#courses' },
    { label: 'Community', href: '/#community' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Blog', href: ROUTES.BLOG },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-border/50' : 'bg-white/90 backdrop-blur-sm border-b border-border/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl">
              <span className="text-gradient">TheBig</span>
              <span className="text-foreground">Word</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate(ROUTES.LOGIN)} className="text-sm font-medium hover:text-primary">
              Sign In
            </Button>
            <Button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="gradient-primary text-white border-0 text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-brand-surface rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
                <Button variant="outline" onClick={() => { navigate(ROUTES.LOGIN); setMobileOpen(false); }} className="rounded-xl">
                  Sign In
                </Button>
                <Button onClick={() => { navigate(ROUTES.SIGNUP); setMobileOpen(false); }} className="gradient-primary text-white border-0 rounded-xl">
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

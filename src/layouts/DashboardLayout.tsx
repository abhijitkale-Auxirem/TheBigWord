import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Menu, Bell, Search, BookOpen, Mic, Trophy, MessageSquare, X, CheckCheck } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const NOTIFICATIONS = [
  {
    id: 1,
    icon: <BookOpen className="w-4 h-4 text-blue-500" />,
    iconBg: 'bg-blue-50',
    title: 'New lesson available',
    desc: 'Advanced Grammar Patterns is ready to start.',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    icon: <Trophy className="w-4 h-4 text-yellow-500" />,
    iconBg: 'bg-yellow-50',
    title: 'Achievement unlocked!',
    desc: 'You earned the "7-Day Streak" badge. Keep it up!',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 3,
    icon: <Mic className="w-4 h-4 text-purple-500" />,
    iconBg: 'bg-purple-50',
    title: 'AI Coach session reminder',
    desc: 'Your IELTS Speaking Practice starts in 30 minutes.',
    time: '3 hr ago',
    unread: true,
  },
  {
    id: 4,
    icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
    iconBg: 'bg-emerald-50',
    title: 'Tutor replied',
    desc: 'Sarah Mitchell responded to your session request.',
    time: 'Yesterday',
    unread: false,
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, subtitle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`tbw_unread_count_${user.role}`);
      if (stored !== null) {
        setUnreadCount(Number(stored));
      } else {
        // Default unread count by role
        setUnreadCount(3);
      }
    }
  }, [user]);

  const profileRoute = user?.role === 'learner' ? ROUTES.LEARNER_PROFILE
    : user?.role === 'tutor' ? ROUTES.TUTOR_PROFILE
    : user?.role === 'translator' ? ROUTES.TRANSLATOR_PROFILE
    : user?.role === 'corporate' ? ROUTES.CORPORATE_PROFILE
    : ROUTES.ADMIN_PROFILE;

  return (
    <div className="flex h-screen overflow-hidden bg-brand-surface">
      <Sidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1">
            {title && (
              <div>
                <h1 className="font-heading font-bold text-lg lg:text-xl text-foreground">{title}</h1>
                {subtitle && <p className="text-xs text-muted-foreground hidden sm:block">{subtitle}</p>}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-brand-surface rounded-xl px-3 py-2 w-64">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            />
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="notif-bell-btn"
              onClick={() => navigate(ROUTES.NOTIFICATIONS)}
              className="relative p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Avatar → Profile */}
          <button
            id="topbar-avatar-btn"
            onClick={() => navigate(profileRoute)}
            className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {user?.name?.charAt(0).toUpperCase()}
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Globe, LayoutDashboard, BookOpen, Trophy, User, Settings,
  LogOut, ChevronRight, Bell, BarChart3, Calendar, Users,
  Building2, Shield, BookMarked, DollarSign, X,
  Flame, Star, Zap, Mic, Languages, FileText, GraduationCap,
  MessageSquare, FlaskConical, BadgeCheck, Briefcase
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import { UserRole } from '@/types/auth.types';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const getNavItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'learner':
      return [
        { label: 'Dashboard', path: ROUTES.LEARNER_DASHBOARD, icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: 'Course Academy', path: ROUTES.LEARNER_COURSES, icon: <BookOpen className="w-5 h-5" /> },
        { label: 'Vocabulary Builder', path: ROUTES.LEARNER_VOCABULARY, icon: <Zap className="w-5 h-5" /> },
        { label: 'AI Coach', path: ROUTES.LEARNER_COACH, icon: <Mic className="w-5 h-5" /> },
        { label: 'Translation Hub', path: ROUTES.LEARNER_TRANSLATION, icon: <Languages className="w-5 h-5" /> },
        { label: 'Content Studio', path: ROUTES.LEARNER_CONTENT_STUDIO, icon: <FileText className="w-5 h-5" /> },
        { label: 'Book a Tutor', path: ROUTES.LEARNER_TUTOR_BOOKING, icon: <GraduationCap className="w-5 h-5" /> },
        { label: 'Community', path: ROUTES.LEARNER_COMMUNITY, icon: <MessageSquare className="w-5 h-5" /> },
        { label: 'Testing Center', path: ROUTES.LEARNER_TESTING, icon: <FlaskConical className="w-5 h-5" /> },
        { label: 'Certifications', path: ROUTES.LEARNER_CERTIFICATIONS, icon: <Trophy className="w-5 h-5" /> },
        { label: 'My Profile', path: ROUTES.LEARNER_PROFILE, icon: <User className="w-5 h-5" /> },
        { label: 'Settings', path: ROUTES.LEARNER_SETTINGS, icon: <Settings className="w-5 h-5" /> },
      ];
    case 'tutor':
      return [
        { label: 'Dashboard', path: ROUTES.TUTOR_DASHBOARD, icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: 'Schedule', path: ROUTES.TUTOR_SCHEDULE, icon: <Calendar className="w-5 h-5" /> },
        { label: 'Evaluations', path: ROUTES.TUTOR_EVALUATIONS, icon: <Star className="w-5 h-5" /> },
        { label: 'Earnings', path: ROUTES.TUTOR_EARNINGS, icon: <DollarSign className="w-5 h-5" /> },
        { label: 'My Profile', path: ROUTES.TUTOR_PROFILE, icon: <User className="w-5 h-5" /> },
        { label: 'Settings', path: ROUTES.TUTOR_SETTINGS, icon: <Settings className="w-5 h-5" /> },
      ];
    case 'translator':
      return [
        { label: 'Dashboard', path: ROUTES.TRANSLATOR_DASHBOARD, icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: 'Project Marketplace', path: ROUTES.TRANSLATOR_MARKETPLACE, icon: <Briefcase className="w-5 h-5" /> },
        { label: 'Localization Tools', path: ROUTES.TRANSLATOR_TOOLS, icon: <Languages className="w-5 h-5" /> },
        { label: 'My Profile', path: ROUTES.TRANSLATOR_PROFILE, icon: <User className="w-5 h-5" /> },
        { label: 'Settings', path: ROUTES.TRANSLATOR_SETTINGS, icon: <Settings className="w-5 h-5" /> },
      ];
    case 'corporate':
      return [
        { label: 'Dashboard', path: ROUTES.CORPORATE_DASHBOARD, icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: 'Analytics', path: ROUTES.CORPORATE_ANALYTICS, icon: <BarChart3 className="w-5 h-5" /> },
        { label: 'Programs', path: ROUTES.CORPORATE_PROGRAMS, icon: <BookMarked className="w-5 h-5" /> },
        { label: 'Billings', path: ROUTES.CORPORATE_BILLINGS, icon: <DollarSign className="w-5 h-5" /> },
        { label: 'Company Profile', path: ROUTES.CORPORATE_PROFILE, icon: <Building2 className="w-5 h-5" /> },
        { label: 'Settings', path: ROUTES.CORPORATE_SETTINGS, icon: <Settings className="w-5 h-5" /> },
      ];
    case 'admin':
      return [
        { label: 'Control Center', path: ROUTES.ADMIN_DASHBOARD, icon: <Shield className="w-5 h-5" /> },
        { label: 'Users', path: ROUTES.ADMIN_USERS, icon: <Users className="w-5 h-5" /> },
        { label: 'Courses', path: ROUTES.ADMIN_COURSES, icon: <BookOpen className="w-5 h-5" /> },
        { label: 'Certifications', path: ROUTES.ADMIN_CERTIFICATIONS, icon: <BadgeCheck className="w-5 h-5" /> },
        { label: 'Moderation', path: ROUTES.ADMIN_MODERATION, icon: <MessageSquare className="w-5 h-5" /> },
        { label: 'Revenue', path: ROUTES.ADMIN_REVENUE, icon: <DollarSign className="w-5 h-5" /> },
        { label: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: <Settings className="w-5 h-5" /> },
      ];
    default:
      return [];
  }
};

const roleLabels: Record<UserRole, string> = {
  learner: 'Language Learner',
  tutor: 'Language Tutor',
  translator: 'Translator',
  corporate: 'Corporate Account',
  admin: 'Platform Admin',
};

const roleBadgeColors: Record<UserRole, string> = {
  learner: 'bg-blue-100 text-blue-700',
  tutor: 'bg-emerald-100 text-emerald-700',
  translator: 'bg-cyan-100 text-cyan-700',
  corporate: 'bg-purple-100 text-purple-700',
  admin: 'bg-red-100 text-red-700',
};

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onMobileClose }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const handleNotificationsClick = () => {
    if (onMobileClose) onMobileClose();
    navigate(ROUTES.NOTIFICATIONS);
  };

  if (!user) return null;
  const navItems = getNavItems(user.role);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full sidebar-gradient text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border flex-shrink-0">
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <span className="font-heading font-bold text-lg text-white">
          TheBig<span className="text-blue-400">Word</span>
        </span>
        {onMobileClose && (
          <button onClick={onMobileClose} className="ml-auto p-1 rounded hover:bg-sidebar-accent transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* User Card */}
      <div className="px-4 py-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50">
          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-white truncate">{user.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColors[user.role]}`}>
              {roleLabels[user.role]}
            </span>
          </div>
        </div>
        {user.role === 'learner' && (
          <div className="flex items-center gap-4 mt-3 px-1">
            <div className="flex items-center gap-1 text-xs text-orange-400">
              <Flame className="w-3.5 h-3.5" /> <span>{user.streak} day streak</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              <Zap className="w-3.5 h-3.5" /> <span>{user.points?.toLocaleString()} pts</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            onClick={onMobileClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
          </NavLink>
        ))}
        <div className="pt-3 mt-1 border-t border-sidebar-border">
          <button
            id="sidebar-notif-btn"
            onClick={handleNotificationsClick}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-white transition-all duration-200 group"
          >
            <Bell className="w-5 h-5" />
            <span className="flex-1">Notifications</span>
            {notifications > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:flex w-64 flex-shrink-0 h-screen sticky top-0">
        <div className="w-full overflow-hidden"><SidebarContent /></div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
          <div className="relative w-72 animate-slide-in"><SidebarContent /></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

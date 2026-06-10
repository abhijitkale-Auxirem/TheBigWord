import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, BookOpen, BarChart3, TrendingUp, Award, Target, ChevronRight, Building2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';

const PROGRAMS = [
  { name: 'Business English Intensive', enrolled: 48, completed: 32, progress: 67, language: 'English' },
  { name: 'Communication Skills for Leaders', enrolled: 24, completed: 18, progress: 75, language: 'English' },
  { name: 'Spanish for Global Teams', enrolled: 12, completed: 5, progress: 42, language: 'Spanish' },
];

const TOP_PERFORMERS = [
  { name: 'Sarah K.', dept: 'Marketing', score: 94, courses: 3 },
  { name: 'James L.', dept: 'Sales', score: 91, courses: 2 },
  { name: 'Mia P.', dept: 'HR', score: 88, courses: 4 },
  { name: 'Raj N.', dept: 'Tech', score: 85, courses: 3 },
];

const CorporateDashboard: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <DashboardLayout title="Corporate Dashboard" subtitle="Monitor workforce language development">
      {/* Header Banner */}
      <div className="gradient-hero rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-8 top-4 opacity-10 text-8xl font-heading font-bold hidden lg:block">企</div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1">Corporate Account</p>
            <h2 className="font-heading font-bold text-2xl mb-1">GlobalTech Solutions</h2>
            <p className="text-blue-100/80 text-sm">84 employees enrolled · 3 active programs · Q2 2026</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-0 text-sm font-medium backdrop-blur">
              <Users className="w-4 h-4 mr-1.5" /> Add Employees
            </Button>
            <Button className="gradient-emerald text-white border-0 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-1.5" /> New Program
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Users className="w-5 h-5 text-blue-500" />, label: 'Employees Enrolled', value: '84', sub: '+12 this month', bg: 'bg-blue-50' },
          { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, label: 'Active Programs', value: '3', sub: '2 ending soon', bg: 'bg-emerald-50' },
          { icon: <TrendingUp className="w-5 h-5 text-purple-500" />, label: 'Avg Completion', value: '68%', sub: '+5% vs last month', bg: 'bg-purple-50' },
          { icon: <Award className="w-5 h-5 text-yellow-500" />, label: 'Certificates Issued', value: '55', sub: 'This quarter', bg: 'bg-yellow-50' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-border`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">{stat.icon}</div>
            </div>
            <div className="font-heading font-bold text-2xl">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Programs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-lg">Active Programs</h3>
            <button className="text-sm text-primary font-medium flex items-center gap-1">Manage <ChevronRight className="w-4 h-4" /></button>
          </div>
          {PROGRAMS.map(prog => (
            <div key={prog.name} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {prog.language.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{prog.name}</h4>
                    <p className="text-xs text-muted-foreground">{prog.language} · {prog.enrolled} enrolled</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">{prog.progress}%</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3 text-center">
                <div className="bg-brand-surface rounded-lg p-2">
                  <div className="font-bold text-sm">{prog.enrolled}</div>
                  <div className="text-xs text-muted-foreground">Enrolled</div>
                </div>
                <div className="bg-brand-surface rounded-lg p-2">
                  <div className="font-bold text-sm">{prog.completed}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="bg-brand-surface rounded-lg p-2">
                  <div className="font-bold text-sm">{prog.enrolled - prog.completed}</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${prog.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top Performers + Overview */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" /> Top Performers
            </h3>
            <div className="space-y-3">
              {TOP_PERFORMERS.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? 'gradient-gold text-white' : 'bg-muted text-muted-foreground'}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.dept}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-primary">{p.score}%</div>
                    <div className="text-xs text-muted-foreground">{p.courses} courses</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <Globe className="w-8 h-8 mb-3 opacity-70" />
            <h4 className="font-heading font-semibold mb-1">Global Readiness Score</h4>
            <div className="font-heading font-bold text-4xl mb-1">72<span className="text-2xl text-blue-200">/100</span></div>
            <p className="text-xs text-blue-200 mb-3">Your team is on track to reach 85+ by Q3 2026</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CorporateDashboard;

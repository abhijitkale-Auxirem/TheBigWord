import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BarChart3, Users, BookOpen, TrendingUp, Award, ChevronRight } from 'lucide-react';

const EMPLOYEES = [
  { name: 'Marketing Dept.', enrolled: 24, completed: 18, avgScore: 82, status: 'active' },
  { name: 'Sales Team', enrolled: 18, completed: 12, avgScore: 75, status: 'active' },
  { name: 'Engineering', enrolled: 30, completed: 25, avgScore: 91, status: 'active' },
  { name: 'HR & Admin', enrolled: 12, completed: 10, avgScore: 85, status: 'completed' },
];

const LANGUAGES_PROG = [
  { lang: 'Business English', enrolled: 45, progress: 68, color: 'gradient-primary' },
  { lang: 'Spanish', enrolled: 22, progress: 45, color: 'gradient-emerald' },
  { lang: 'Mandarin', enrolled: 17, progress: 32, color: 'gradient-gold' },
];

const WorkforceAnalytics: React.FC = () => (
  <DashboardLayout title="Workforce Analytics" subtitle="Track your team's language learning progress">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { icon: <Users className="w-5 h-5 text-blue-500" />, label: 'Total Enrolled', value: '84', bg: 'bg-blue-50' },
        { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, label: 'Courses Active', value: '6', bg: 'bg-emerald-50' },
        { icon: <Award className="w-5 h-5 text-yellow-500" />, label: 'Certificates', value: '29', bg: 'bg-yellow-50' },
        { icon: <TrendingUp className="w-5 h-5 text-purple-500" />, label: 'Avg Completion', value: '71%', bg: 'bg-purple-50' },
      ].map(s => (
        <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-border`}>
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm mb-2">{s.icon}</div>
          <div className="font-heading font-bold text-xl">{s.value}</div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-heading font-semibold mb-4">Department Progress</h3>
        <div className="space-y-4 stagger-children">
          {EMPLOYEES.map(dept => (
            <div key={dept.name} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{dept.name}</h4>
                <span className="font-heading font-bold text-primary">{dept.avgScore}%</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span>{dept.enrolled} enrolled</span>
                <span>{dept.completed} completed</span>
                <span className={`ml-auto px-2 py-0.5 rounded-full font-medium ${dept.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{dept.status}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full">
                <div className="h-full gradient-primary rounded-full" style={{ width: `${(dept.completed / dept.enrolled) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-heading font-semibold mb-4">Language Programs</h3>
        <div className="space-y-5">
          {LANGUAGES_PROG.map(l => (
            <div key={l.lang}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{l.lang}</span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{l.enrolled} employees</span>
                  <span className="font-semibold text-primary">{l.progress}%</span>
                </div>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${l.color} rounded-full`} style={{ width: `${l.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default WorkforceAnalytics;

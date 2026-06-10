import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Globe, Briefcase, TrendingUp, Clock, Star, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const STATS = [
  { icon: <Briefcase className="w-5 h-5 text-blue-500" />, label: 'Active Projects', value: '3', change: '+1 new', bg: 'bg-blue-50' },
  { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, label: 'Completed', value: '47', change: 'All time', bg: 'bg-emerald-50' },
  { icon: <Globe className="w-5 h-5 text-purple-500" />, label: 'Language Pairs', value: '6', change: 'Active pairs', bg: 'bg-purple-50' },
  { icon: <TrendingUp className="w-5 h-5 text-yellow-500" />, label: 'Earnings MTD', value: '$1,840', change: '+22%', bg: 'bg-yellow-50' },
];

const PROJECTS = [
  { id: '1', client: 'TechStart Inc.', type: 'Technical', from: 'English', to: 'Spanish', words: 4200, deadline: 'Jun 12', status: 'in-progress', progress: 65, priority: 'high' },
  { id: '2', client: 'GlobalMed Corp', type: 'Medical', from: 'French', to: 'English', words: 1800, deadline: 'Jun 14', status: 'in-progress', progress: 30, priority: 'medium' },
  { id: '3', client: 'E-Comm Store', type: 'Marketing', from: 'English', to: 'Arabic', words: 950, deadline: 'Jun 15', status: 'review', progress: 100, priority: 'low' },
];

const TranslatorDashboard: React.FC = () => (
  <DashboardLayout title="Translator Dashboard" subtitle="Manage your translation projects and workload">
    {/* Welcome */}
    <div className="gradient-hero rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
      <div className="absolute right-8 bottom-0 opacity-10 text-9xl">🌐</div>
      <div className="relative z-10">
        <h2 className="font-heading font-bold text-2xl mb-1">Good morning, Translator!</h2>
        <p className="text-blue-100/80 text-sm">You have 3 active projects — 1 due tomorrow.</p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STATS.map(s => (
        <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-border`}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">{s.icon}</div>
            <span className="text-xs text-emerald-600 bg-white px-2 py-0.5 rounded-full font-medium">{s.change}</span>
          </div>
          <div className="font-heading font-bold text-xl">{s.value}</div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>

    {/* Active Projects */}
    <h3 className="font-heading font-semibold text-lg mb-4">Active Projects</h3>
    <div className="space-y-4 stagger-children">
      {PROJECTS.map(p => (
        <div key={p.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{p.client}</h3>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{p.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.priority === 'high' ? 'bg-red-50 text-red-600' : p.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>{p.priority}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{p.from} → {p.to}</span>
                <span>{p.words.toLocaleString()} words</span>
                <span className="flex items-center gap-1 text-orange-600"><Clock className="w-3.5 h-3.5" />Due {p.deadline}</span>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="font-heading font-bold text-xl text-primary">{p.progress}%</div>
              <div className="text-xs text-muted-foreground">{p.status === 'review' ? 'In Review' : 'In Progress'}</div>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className={`h-full ${p.progress === 100 ? 'gradient-emerald' : 'gradient-primary'} rounded-full transition-all`} style={{ width: `${p.progress}%` }} />
          </div>
          <div className="flex items-center justify-end mt-3">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
              {p.status === 'review' ? 'View Review' : 'Continue Working'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </DashboardLayout>
);

export default TranslatorDashboard;

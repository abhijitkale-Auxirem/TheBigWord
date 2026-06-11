import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Globe, Briefcase, TrendingUp, Clock, Star, CheckCircle, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

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

const TranslatorDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
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
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-heading font-semibold text-lg">Active Projects</h3>
      <button 
        onClick={() => navigate(ROUTES.TRANSLATOR_MARKETPLACE)} 
        className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
      >
        View all <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-brand-surface">
              {['Client', 'Type', 'Priority', 'Languages', 'Words', 'Deadline', 'Progress', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {PROJECTS.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/40 transition-colors">
                <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{p.client}</td>
                <td className="px-5 py-4 whitespace-nowrap"><span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold">{p.type}</span></td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${p.priority === 'high' ? 'bg-red-50 text-red-600' : p.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>{p.priority}</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap"><span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">{p.from} → {p.to}</span></td>
                <td className="px-5 py-4 text-slate-600 font-semibold whitespace-nowrap">{p.words.toLocaleString()} words</td>
                <td className="px-5 py-4 text-orange-600 font-medium whitespace-nowrap">{p.deadline}</td>
                <td className="px-5 py-4 min-w-[150px]">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span className="text-primary">{p.progress}%</span>
                    <span className="text-muted-foreground text-[10px]">{p.status === 'review' ? 'In Review' : 'In Progress'}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/10">
                    <div className={`h-full ${p.progress === 100 ? 'gradient-emerald' : 'gradient-primary'} rounded-full transition-all`} style={{ width: `${p.progress}%` }} />
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => navigate(ROUTES.TRANSLATOR_MARKETPLACE)}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    {p.status === 'review' ? 'View Review' : 'Continue'} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
  );
};

export default TranslatorDashboard;

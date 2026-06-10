import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, BookOpen, DollarSign, TrendingUp, Globe, Shield, Flag, Activity, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PLATFORM_STATS = [
  { icon: <Users className="w-5 h-5 text-blue-500" />, label: 'Total Users', value: '524,381', change: '+2.4%', bg: 'bg-blue-50' },
  { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, label: 'Active Courses', value: '1,284', change: '+18', bg: 'bg-emerald-50' },
  { icon: <DollarSign className="w-5 h-5 text-yellow-500" />, label: 'Monthly Revenue', value: '$284K', change: '+12.1%', bg: 'bg-yellow-50' },
  { icon: <Globe className="w-5 h-5 text-purple-500" />, label: 'Countries', value: '152', change: '+3 new', bg: 'bg-purple-50' },
];

const RECENT_USERS = [
  { name: 'Priya Sharma', email: 'priya@email.com', role: 'Learner', joined: 'Just now', status: 'active' },
  { name: 'Carlos Garcia', email: 'carlos@corp.com', role: 'Corporate', joined: '5 mins ago', status: 'active' },
  { name: 'Yuki Tanaka', email: 'yuki@mail.com', role: 'Learner', joined: '12 mins ago', status: 'active' },
  { name: 'Dr. Wei Li', email: 'wei@tutor.com', role: 'Tutor', joined: '1 hour ago', status: 'pending' },
  { name: 'Amir Patel', email: 'amir@biz.com', role: 'Corporate', joined: '2 hours ago', status: 'active' },
];

const ALERTS = [
  { type: 'warning', message: '3 tutor applications pending review', time: '10 min ago' },
  { type: 'info', message: 'New certification request from 12 users', time: '1 hour ago' },
  { type: 'success', message: 'Revenue milestone: $250K reached this month', time: '3 hours ago' },
];

const roleColors: Record<string, string> = {
  Learner: 'bg-blue-100 text-blue-700',
  Tutor: 'bg-emerald-100 text-emerald-700',
  Corporate: 'bg-purple-100 text-purple-700',
};

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout title="Admin Control Center" subtitle="Platform administration and oversight">
      {/* Banner */}
      <div className="gradient-hero rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-8 top-4 opacity-10 text-8xl font-heading font-bold hidden lg:block">管</div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium text-yellow-300">Super Administrator</span>
            </div>
            <h2 className="font-heading font-bold text-2xl mb-1">Platform Overview</h2>
            <p className="text-blue-100/80 text-sm">TheBigWord is operating normally · All systems healthy · June 10, 2026</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-4 py-2 backdrop-blur">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {PLATFORM_STATS.map(stat => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-border`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">{stat.icon}</div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <div className="font-heading font-bold text-xl">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg">Recent Registrations</h3>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              Manage Users <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-brand-surface">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">User</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide hidden sm:table-cell">Role</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide hidden md:table-cell">Joined</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_USERS.map((u, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-brand-surface/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{u.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[u.role]}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{u.joined}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Revenue */}
        <div className="space-y-4">
          {/* System Alerts */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" /> System Alerts
            </h3>
            <div className="space-y-2.5">
              {ALERTS.map((alert, i) => (
                <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl ${
                  alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-100' :
                  alert.type === 'success' ? 'bg-emerald-50 border border-emerald-100' :
                  'bg-blue-50 border border-blue-100'
                }`}>
                  {alert.type === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> :
                   alert.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> :
                   <Activity className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-xs font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" /> Revenue</h3>
              <span className="text-xs text-muted-foreground">This Week</span>
            </div>
            <div className="flex items-end gap-1.5 h-20 mb-2">
              {[45, 60, 80, 55, 90, 75, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-full rounded-sm ${i === 6 ? 'gradient-emerald' : 'gradient-primary'} opacity-80`} style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {['M','T','W','T','F','S','S'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Total MRR</span>
                <span className="font-heading font-bold text-emerald-600">$284,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

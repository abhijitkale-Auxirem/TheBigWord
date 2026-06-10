import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { DollarSign, TrendingUp, Users, Globe, Download } from 'lucide-react';

const MONTHLY = [
  { month: 'Jan', revenue: 180000, users: 42000 }, { month: 'Feb', revenue: 210000, users: 46000 },
  { month: 'Mar', revenue: 240000, users: 50000 }, { month: 'Apr', revenue: 225000, users: 48000 },
  { month: 'May', revenue: 260000, users: 54000 }, { month: 'Jun', revenue: 284000, users: 58000 },
];
const maxRev = Math.max(...MONTHLY.map(d => d.revenue));

const SOURCES = [
  { source: 'Subscription Plans', amount: '$168,400', pct: 59, color: 'gradient-primary' },
  { source: 'Tutor Commissions', amount: '$71,000', pct: 25, color: 'gradient-emerald' },
  { source: 'Corporate Contracts', amount: '$32,100', pct: 11, color: 'gradient-gold' },
  { source: 'Certifications', amount: '$13,000', pct: 5, color: 'bg-purple-400' },
];

const RevenueMonitoring: React.FC = () => (
  <DashboardLayout title="Revenue Monitoring" subtitle="Platform financial performance and monetization analytics">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { icon: <DollarSign className="w-5 h-5 text-emerald-500" />, label: 'Monthly Revenue', value: '$284,500', change: '+12.1%', bg: 'bg-emerald-50' },
        { icon: <TrendingUp className="w-5 h-5 text-blue-500" />, label: 'Annual Run Rate', value: '$3.1M', change: '+18%', bg: 'bg-blue-50' },
        { icon: <Users className="w-5 h-5 text-purple-500" />, label: 'Paying Users', value: '58,200', change: '+4.2K', bg: 'bg-purple-50' },
        { icon: <Globe className="w-5 h-5 text-orange-500" />, label: 'ARPU', value: '$4.88', change: '+7%', bg: 'bg-orange-50' },
      ].map(s => (
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

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Chart */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold">6-Month Revenue Trend</h3>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-xl hover:border-primary/30">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        <div className="flex items-end gap-3 h-40 mb-3">
          {MONTHLY.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-semibold text-muted-foreground">${Math.round(d.revenue / 1000)}k</span>
              <div className={`w-full rounded-t-xl ${i === MONTHLY.length - 1 ? 'gradient-emerald' : 'gradient-primary'} opacity-85 hover:opacity-100 transition-opacity`}
                style={{ height: `${(d.revenue / maxRev) * 100}%` }} />
            </div>
          ))}
        </div>
        <div className="flex gap-3">{MONTHLY.map(d => <div key={d.month} className="flex-1 text-center text-xs text-muted-foreground">{d.month}</div>)}</div>
      </div>

      {/* Revenue Sources */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-heading font-semibold mb-5">Revenue Sources</h3>
        <div className="space-y-4">
          {SOURCES.map(s => (
            <div key={s.source}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{s.source}</span>
                <span className="font-semibold text-primary">{s.pct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default RevenueMonitoring;

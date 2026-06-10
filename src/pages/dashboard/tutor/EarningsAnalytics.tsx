import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { DollarSign, TrendingUp, Calendar, CreditCard, Download } from 'lucide-react';

const EARNINGS_DATA = [
  { month: 'Jan', amount: 1200 }, { month: 'Feb', amount: 1450 }, { month: 'Mar', amount: 1800 },
  { month: 'Apr', amount: 1620 }, { month: 'May', amount: 2100 }, { month: 'Jun', amount: 2400 },
];

const TRANSACTIONS = [
  { student: 'Alex Morgan', date: 'Jun 9, 2026', sessions: 4, amount: '$180', status: 'paid' },
  { student: 'Priya Sharma', date: 'Jun 7, 2026', sessions: 3, amount: '$135', status: 'paid' },
  { student: 'Yuki Tanaka', date: 'Jun 5, 2026', sessions: 5, amount: '$225', status: 'pending' },
  { student: 'Carlos G.', date: 'May 30, 2026', sessions: 2, amount: '$90', status: 'paid' },
];

const maxEarning = Math.max(...EARNINGS_DATA.map(d => d.amount));

const EarningsAnalytics: React.FC = () => (
  <DashboardLayout title="Earnings Analytics" subtitle="Track your revenue and payment history">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { icon: <DollarSign className="w-5 h-5 text-emerald-500" />, label: 'This Month', value: '$2,400', change: '+14%', bg: 'bg-emerald-50' },
        { icon: <TrendingUp className="w-5 h-5 text-blue-500" />, label: 'Total Earned', value: '$10,570', change: 'All time', bg: 'bg-blue-50' },
        { icon: <Calendar className="w-5 h-5 text-purple-500" />, label: 'Sessions Taught', value: '142', change: '+8 this week', bg: 'bg-purple-50' },
        { icon: <CreditCard className="w-5 h-5 text-orange-500" />, label: 'Pending Payout', value: '$225', change: 'Processing', bg: 'bg-orange-50' },
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
      {/* Chart */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold">Monthly Earnings</h3>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-xl hover:border-primary/30 transition-all">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="flex items-end gap-3 h-40 mb-3">
          {EARNINGS_DATA.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs font-semibold text-primary">${(d.amount / 100).toFixed(1)}k</span>
              <div className={`w-full rounded-t-xl transition-all duration-500 ${i === EARNINGS_DATA.length - 1 ? 'gradient-emerald' : 'gradient-primary'} opacity-80 hover:opacity-100`}
                style={{ height: `${(d.amount / maxEarning) * 100}%` }} />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {EARNINGS_DATA.map(d => <div key={d.month} className="flex-1 text-center text-xs text-muted-foreground">{d.month}</div>)}
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-sm">Recent Payments</h3>
        </div>
        <div className="divide-y divide-border">
          {TRANSACTIONS.map((t, i) => (
            <div key={i} className="p-4 hover:bg-brand-surface/50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{t.student}</span>
                <span className="font-semibold text-sm text-emerald-600">{t.amount}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t.date} · {t.sessions} sessions</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${t.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default EarningsAnalytics;

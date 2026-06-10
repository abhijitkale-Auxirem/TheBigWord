import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { CreditCard, Download, CheckCircle, Clock, DollarSign, FileText } from 'lucide-react';

const INVOICES = [
  { id: 'INV-2026-06', date: 'Jun 1, 2026', amount: '$1,490', plan: 'Enterprise Plan', status: 'paid', seats: 84 },
  { id: 'INV-2026-05', date: 'May 1, 2026', amount: '$1,490', plan: 'Enterprise Plan', status: 'paid', seats: 84 },
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amount: '$1,240', plan: 'Business Plan', status: 'paid', seats: 70 },
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amount: '$1,240', plan: 'Business Plan', status: 'paid', seats: 70 },
];

const BillingsInvoices: React.FC = () => (
  <DashboardLayout title="Billing & Invoices" subtitle="Manage your corporate subscription and download invoices">
    {/* Current Plan */}
    <div className="gradient-primary rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-blue-200 mb-1 uppercase tracking-wide">Current Subscription</div>
          <h2 className="font-heading font-bold text-2xl mb-1">Enterprise Plan</h2>
          <div className="flex items-center gap-4 text-sm text-blue-100/80">
            <span>84 seats · $1,490/month</span>
            <span className="flex items-center gap-1 text-emerald-300"><CheckCircle className="w-4 h-4" /> Active</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-blue-200">Next billing</div>
          <div className="font-heading font-bold text-xl">Jul 1, 2026</div>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-4 py-2 rounded-xl transition-all border border-white/20">
            Manage Plan
          </button>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { icon: <DollarSign className="w-5 h-5 text-emerald-500" />, label: 'Total Spent', value: '$5,460', bg: 'bg-emerald-50' },
        { icon: <CreditCard className="w-5 h-5 text-blue-500" />, label: 'Monthly Cost', value: '$1,490', bg: 'bg-blue-50' },
        { icon: <Clock className="w-5 h-5 text-purple-500" />, label: 'Renewal', value: '21 days', bg: 'bg-purple-50' },
        { icon: <FileText className="w-5 h-5 text-orange-500" />, label: 'Invoices', value: '4', bg: 'bg-orange-50' },
      ].map(s => (
        <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-border`}>
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm mb-2">{s.icon}</div>
          <div className="font-heading font-bold text-xl">{s.value}</div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>

    {/* Invoices Table */}
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-semibold">Invoice History</h3>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-xl hover:border-primary/30 hover:text-primary transition-all">
          <Download className="w-3.5 h-3.5" /> Download All
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-brand-surface">
            {['Invoice', 'Date', 'Plan', 'Seats', 'Amount', 'Status', ''].map(h => (
              <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INVOICES.map(inv => (
            <tr key={inv.id} className="border-b border-border/50 last:border-0 hover:bg-brand-surface/30 transition-colors">
              <td className="px-5 py-4 text-sm font-medium text-primary">{inv.id}</td>
              <td className="px-5 py-4 text-sm text-muted-foreground">{inv.date}</td>
              <td className="px-5 py-4 text-sm">{inv.plan}</td>
              <td className="px-5 py-4 text-sm text-muted-foreground">{inv.seats}</td>
              <td className="px-5 py-4 text-sm font-semibold">{inv.amount}</td>
              <td className="px-5 py-4">
                <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-medium flex items-center gap-1 w-fit">
                  <CheckCircle className="w-3 h-3" /> {inv.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <button className="text-xs text-primary hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </DashboardLayout>
);

export default BillingsInvoices;

import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface EarningDataNode {
  month: string;
  amount: number;
}

interface TransactionRow {
  student: string;
  date: string;
  sessions: number;
  amount: string;
  status: 'paid' | 'pending';
}

const INITIAL_EARNINGS: EarningDataNode[] = [
  { month: 'Jan', amount: 1200 }, 
  { month: 'Feb', amount: 1450 }, 
  { month: 'Mar', amount: 1800 },
  { month: 'Apr', amount: 1620 }, 
  { month: 'May', amount: 2100 }, 
  { month: 'Jun', amount: 2400 },
];

const INITIAL_TRANSACTIONS: TransactionRow[] = [
  { student: 'Alex Morgan', date: 'Jun 9, 2026', sessions: 4, amount: '$180', status: 'paid' },
  { student: 'Priya Sharma', date: 'Jun 7, 2026', sessions: 3, amount: '$135', status: 'paid' },
  { student: 'Yuki Tanaka', date: 'Jun 5, 2026', sessions: 5, amount: '$225', status: 'pending' },
  { student: 'Carlos G.', date: 'May 30, 2026', sessions: 2, amount: '$90', status: 'paid' },
];

const EarningsAnalytics: React.FC = () => {
  const [earnings] = useState<EarningDataNode[]>(INITIAL_EARNINGS);
  const [transactions] = useState<TransactionRow[]>(INITIAL_TRANSACTIONS);
  const [exporting, setExporting] = useState<boolean>(false);

  const maxEarning = Math.max(...earnings.map(d => d.amount));

  const handleExportLedger = async () => {
    setExporting(true);
    toast.info('Structuring tabular balance sheet payload vectors...');
    
    // Simulate generation loop
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Committed local instance archive: earnings_2026_manifest.csv downloaded.');
    setExporting(false);
  };

  return (
    <DashboardLayout title="Revenue & Balances Ledger" subtitle="Monitor operational token distributions and aggregate billing cycles">
      
      {/* High-Density Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        {[
          { icon: <DollarSign className="w-4 h-4 text-slate-800" />, label: 'Current Term Billing', value: '$2,400', change: '+14% MoM', dynamicColor: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
          { icon: <TrendingUp className="w-4 h-4 text-slate-800" />, label: 'Cumulative Gross Payout', value: '$10,570', change: 'All-Time', dynamicColor: 'text-slate-500 bg-slate-50 border-slate-200/60' },
          { icon: <Calendar className="w-4 h-4 text-slate-800" />, label: 'Sessions Finalized', value: '142 Units', change: '+8 This Wk', dynamicColor: 'text-slate-500 bg-slate-50 border-slate-200/60' },
          { icon: <CreditCard className="w-4 h-4 text-slate-800" />, label: 'Escrow Pending Ledger', value: '$225', change: 'Processing', dynamicColor: 'text-amber-700 bg-amber-50 border-amber-200/60' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center shadow-inner">{s.icon}</div>
              <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 border rounded-md ${s.dynamicColor}`}>
                {s.change}
              </span>
            </div>
            <div>
              <div className="font-heading font-black text-xl text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analytical Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column Component: Histogram Vector Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-6 select-none">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-slate-400" /> Revenue Baseline Architecture
            </h3>
            <button 
              onClick={handleExportLedger}
              disabled={exporting}
              className="text-[11px] font-bold h-7 px-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Download className={`w-3 h-3 ${exporting ? 'animate-bounce' : ''}`} /> 
              {exporting ? 'Processing...' : 'Export Asset'}
            </button>
          </div>

          <div className="flex items-end gap-3.5 h-44 mb-3 px-2 select-none">
            {earnings.map((d, i) => {
              const isCurrentPeriod = i === earnings.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className={`text-[10px] font-mono font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isCurrentPeriod ? 'text-slate-900' : 'text-slate-400'}`}>
                    ${d.amount}
                  </span>
                  
                  {/* Clean flat blocks replacing unstyled micro gradients */}
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 border-x ${
                      isCurrentPeriod 
                        ? 'bg-slate-900 border-slate-800 shadow-sm' 
                        : 'bg-slate-100 border-slate-200 group-hover:bg-slate-200 group-hover:border-slate-300'
                    }`}
                    style={{ height: `${(d.amount / maxEarning) * 110}px` }} 
                  />
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-3.5 px-2 border-t border-slate-100 pt-2 select-none">
            {earnings.map(d => (
              <div key={d.month} className="flex-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {d.month}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Component: Recent Ledger Items */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 border-b border-slate-200 select-none">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
              Settled Settlement Ledger
            </h3>
          </div>
          <div className="divide-y divide-slate-150">
            {transactions.map((t, i) => (
              <div key={i} className="p-4 hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-slate-800 tracking-tight group-hover:text-slate-950">
                    {t.student}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {t.amount}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>{t.date} · {t.sessions} units</span>
                  
                  {t.status === 'paid' ? (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-50/60 border border-emerald-100 px-1.5 py-0.5 rounded-md select-none">
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> Cleared
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-amber-700 bg-amber-50/60 border border-amber-100 px-1.5 py-0.5 rounded-md select-none">
                      <Clock className="w-3 h-3 stroke-[2.5]" /> Hold
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default EarningsAnalytics;
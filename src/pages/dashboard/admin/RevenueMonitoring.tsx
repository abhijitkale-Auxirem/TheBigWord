import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { DollarSign, TrendingUp, Users, Globe, Download, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MonthlyData {
  month: string;
  revenue: number;
  users: number;
}

interface SourceData {
  source: string;
  amount: string;
  pct: number;
  colorClass: string;
}

const MONTHLY: MonthlyData[] = [
  { month: 'Jan', revenue: 180000, users: 42000 },
  { month: 'Feb', revenue: 210000, users: 46000 },
  { month: 'Mar', revenue: 240000, users: 50000 },
  { month: 'Apr', revenue: 225000, users: 48000 },
  { month: 'May', revenue: 260000, users: 54000 },
  { month: 'Jun', revenue: 284000, users: 58000 },
];

const SOURCES: SourceData[] = [
  { source: 'Subscription Plans', amount: '$168,400', pct: 59, colorClass: 'bg-slate-900' },
  { source: 'Tutor Commissions', amount: '$71,000', pct: 25, colorClass: 'bg-emerald-600' },
  { source: 'Corporate Contracts', amount: '$32,100', pct: 11, colorClass: 'bg-blue-600' },
  { source: 'Certifications', amount: '$13,000', pct: 5, colorClass: 'bg-purple-500' },
];

const maxRev = Math.max(...MONTHLY.map(d => d.revenue));

const RevenueMonitoring: React.FC = () => {

  // EXPORT ACTION - GENERATE AND DOWNLOAD NATIVE CLIENT-SIDE CSV FILE
  const handleExportFinancialsCSV = () => {
    try {
      const csvRowsHeader = ['Month', 'Revenue ($)', 'Paying Active Users'];
      const csvContentBody = MONTHLY.map(m => `"${m.month}",${m.revenue},${m.users}`).join('\n');
      const standardCSVBlobString = `${csvRowsHeader.join(',')}\n${csvContentBody}`;

      const fileBlobNode = new Blob([standardCSVBlobString], { type: 'text/csv;charset=utf-8;' });
      const downloadURLNode = URL.createObjectURL(fileBlobNode);
      
      const virtualLinkElement = document.createElement('a');
      virtualLinkElement.href = downloadURLNode;
      virtualLinkElement.download = `Platform_Financial_Report_Q2_2026.csv`;
      
      document.body.appendChild(virtualLinkElement);
      virtualLinkElement.click();
      document.body.removeChild(virtualLinkElement);
      URL.revokeObjectURL(downloadURLNode);

      toast.success('Data Pipeline: Financial breakdown matrix compiled and downloaded successfully.');
    } catch (error) {
      toast.error('System Exception: Failed to serialize ledger into CSV stream parameters.');
    }
  };

  return (
    <DashboardLayout title="Revenue Monitoring Matrix" subtitle="Audit business ledger positions, monitor ARPU drift indexes, and track live pipeline yields">
      
      {/* Top Multi-Vector Analytical Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        {[
          { icon: <DollarSign className="w-4 h-4 text-emerald-700 stroke-[2.5]" />, label: 'Monthly Net Revenue', value: '$284,500', change: '+12.1%', border: 'border-emerald-100 bg-emerald-50/40' },
          { icon: <TrendingUp className="w-4 h-4 text-blue-700 stroke-[2.5]" />, label: 'Annualized Run Rate', value: '$3.41M', change: '+18.4%', border: 'border-blue-100 bg-blue-50/40' },
          { icon: <Users className="w-4 h-4 text-purple-700 stroke-[2.5]" />, label: 'Premium Subscriptions', value: '58,200', change: '+4.2K', border: 'border-purple-100 bg-purple-50/40' },
          { icon: <Globe className="w-4 h-4 text-amber-700 stroke-[2.5]" />, label: 'System wide ARPU', value: '$4.88', change: '+7.2%', border: 'border-amber-100 bg-amber-50/40' },
        ].map(s => (
          <div key={s.label} className={`${s.border} rounded-2xl p-4 border shadow-sm`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-white border border-slate-150 rounded-xl flex items-center justify-center shadow-inner">{s.icon}</div>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/60 border border-emerald-200 px-2 py-0.5 rounded-md">{s.change}</span>
            </div>
            <div className="font-heading font-black text-xl text-slate-900 tracking-tight">{s.value}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Analytics Visualization Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Grid Section: Bar Chart Visualization Component */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 select-none">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-slate-400" /> 6-Month Gross Revenue Vector Trend
            </h3>
            <Button 
              size="sm"
              variant="outline"
              onClick={handleExportFinancialsCSV}
              className="h-8 text-xs font-bold border-slate-200 text-slate-600 bg-white shadow-sm flex items-center gap-1.5 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Export Asset CSV
            </Button>
          </div>

          <div className="flex items-end gap-3 sm:gap-4 h-44 mb-3 px-2 select-none">
            {MONTHLY.map((d, i) => {
              const isCurrentActiveNode = i === MONTHLY.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    ${Math.round(d.revenue / 1000)}k
                  </span>
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 shadow-sm cursor-pointer ${
                      isCurrentActiveNode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                    style={{ height: `${(d.revenue / maxRev) * 100}%` }} 
                  />
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-3 sm:gap-4 border-t border-slate-100 pt-3 select-none">
            {MONTHLY.map(d => (
              <div key={d.month} className="flex-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                {d.month}
              </div>
            ))}
          </div>
        </div>

        {/* Right Grid Section: Progress Allocation Blocks */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-1.5 select-none">
            <PieChart className="w-4 h-4 text-slate-400" /> Monetization Allocations
          </h3>
          
          <div className="space-y-4">
            {SOURCES.map(s => (
              <div key={s.source} className="group">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-800 tracking-tight">{s.source}</span>
                  <span className="font-mono font-black text-slate-900">{s.pct}%</span>
                </div>
                
                {/* Structural Bar Shell Container */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50 select-none">
                  <div 
                    className={`h-full ${s.colorClass} rounded-full transition-all duration-500`} 
                    style={{ width: `${s.pct}%` }} 
                  />
                </div>
                
                <div className="text-[10px] font-mono font-bold text-slate-400 mt-1 select-none">
                  Yield: {s.amount} Gross Accounted
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default RevenueMonitoring;
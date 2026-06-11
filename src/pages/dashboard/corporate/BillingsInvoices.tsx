import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { CreditCard, Download, CheckCircle, Clock, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InvoiceNode {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: 'paid' | 'pending';
  seats: number;
}

const INITIAL_INVOICES: InvoiceNode[] = [
  { id: 'INV-2026-06', date: 'Jun 1, 2026', amount: '$1,490', plan: 'Enterprise Plan', status: 'paid', seats: 84 },
  { id: 'INV-2026-05', date: 'May 1, 2026', amount: '$1,490', plan: 'Enterprise Plan', status: 'paid', seats: 84 },
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amount: '$1,240', plan: 'Business Plan', status: 'paid', seats: 70 },
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amount: '$1,240', plan: 'Business Plan', status: 'paid', seats: 70 },
];

const BillingsInvoices: React.FC = () => {
  const [invoiceData] = useState<InvoiceNode[]>(INITIAL_INVOICES);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Native Browser Download Trigger Implementation
  const triggerBrowserDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSingleInvoice = (invoice: InvoiceNode) => {
    const invoiceMockContent = `
      ========================================
      INVOICE STATEMENT: ${invoice.id}
      ========================================
      Date: ${invoice.date}
      Plan: ${invoice.plan}
      Allocated Seats: ${invoice.seats}
      Gross Total: ${invoice.amount}
      Status: ${invoice.status.toUpperCase()}
      ========================================
      Thank you for your business!
    `;
    
    triggerBrowserDownload(`${invoice.id}.txt`, invoiceMockContent.trim());
    toast.success(`Downloaded ${invoice.id} successfully!`);
  };

  const handleDownloadBulkArchive = () => {
    setIsProcessing(true);
    const toastId = toast.loading('Compiling all historical statement logs...');

    setTimeout(() => {
      let massContent = "=== LOGGED HISTORICAL STATEMENT LEDGER SUMMARY ===\n\n";
      invoiceData.forEach(inv => {
        massContent += `ID: ${inv.id} | Date: ${inv.date} | Plan: ${inv.plan} | Amount: ${inv.amount} | Status: ${inv.status}\n`;
      });

      triggerBrowserDownload(`Invoice_Ledger_Archive_2026.txt`, massContent.trim());
      toast.success('Archive package downloaded completely.', { id: toastId });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <DashboardLayout title="Billing & Capital Ledger" subtitle="Oversee corporate subscription models and download invoices natively">
      
      {/* Current Subscription Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white mb-6 relative overflow-hidden shadow-md select-none">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-800/20 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/60">
              Active Corporate Lease
            </span>
            <h2 className="font-heading font-black text-2xl mt-3 mb-1 tracking-tight">Enterprise Plan Base</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
              <span>84 instances allocated</span>
              <span className="text-slate-600">•</span>
              <span>Rate: $1,490 / Month</span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle className="w-3 h-3 stroke-[3]" /> Active
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 min-w-[140px] border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-800 w-full sm:w-auto">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Auto-Renewal</div>
            <div className="font-mono font-black text-lg text-slate-200 tracking-tight">July 01, 2026</div>
          </div>
        </div>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        {[
          { icon: <DollarSign className="w-4 h-4 text-slate-800" />, label: 'Aggregate Outlay', value: '$5,460', sub: 'Gross fiscal tracking' },
          { icon: <CreditCard className="w-4 h-4 text-slate-800" />, label: 'Current Monthly Cost', value: '$1,490', sub: 'Evaluated monthly rate' },
          { icon: <Clock className="w-4 h-4 text-slate-800" />, label: 'Renewal Threshold', value: '21 Days', sub: 'Auto-debit lock cycle' },
          { icon: <FileText className="w-4 h-4 text-slate-800" />, label: 'Logged Receipts', value: '4 Statements', sub: 'Compliance records clean' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center shadow-inner mb-3">
                {stat.icon}
              </div>
              <div className="font-heading font-black text-xl text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
            <div className="text-[10px] font-medium text-slate-400 mt-2 pt-2 border-t border-slate-50">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Table History Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-150 bg-slate-50/40 select-none">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-400" /> Historical Statement Ledger
          </h3>
          <Button 
            variant="outline"
            size="sm"
            disabled={isProcessing}
            onClick={handleDownloadBulkArchive}
            className="h-8 border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-bold text-xs shadow-sm flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Download All Records
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                {['Statement UID', 'Settlement Date', 'Plan', 'Allocated Capacity', 'Gross Value', 'Audit Status', 'Receipt Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
              {invoiceData.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-900 tracking-tight">
                    {inv.id}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 font-medium">
                    {inv.date}
                  </td>
                  <td className="px-5 py-3.5 text-slate-800 font-bold">
                    {inv.plan}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">
                    {inv.seats} Seats
                  </td>
                  <td className="px-5 py-3.5 font-mono font-black text-slate-900 text-sm">
                    {inv.amount}
                  </td>
                  <td className="px-5 py-3.5 select-none">
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                      <CheckCircle className="w-2.5 h-2.5 stroke-[2.5]" /> Cleared
                    </span>
                  </td>
                  <td className="px-5 py-3.5 select-none">
                    <button 
                      onClick={() => handleDownloadSingleInvoice(inv)}
                      className="text-slate-900 hover:text-slate-600 inline-flex items-center gap-1 cursor-pointer font-bold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" /> PDF Statement
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

export default BillingsInvoices;
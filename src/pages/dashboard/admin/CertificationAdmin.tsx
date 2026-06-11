import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Award, CheckCircle, XCircle, Eye, Download, Clock, X, ShieldCheck, Mail, BookOpen, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CertNode {
  id: string;
  user: string;
  email: string;
  course: string;
  level: string;
  score: number;
  issued: string;
  status: 'issued' | 'pending';
}

const INITIAL_CERTS: CertNode[] = [
  { id: '1', user: 'Yuki Tanaka', email: 'yuki@mail.com', course: 'IELTS Mock Test', level: 'Advanced', score: 92, issued: 'Jun 08, 2026', status: 'issued' },
  { id: '2', user: 'Alex Morgan', email: 'alex@demo.com', course: 'Business English Mastery', level: 'Intermediate', score: 85, issued: 'Jun 05, 2026', status: 'issued' },
  { id: '3', user: 'Priya Sharma', email: 'priya@email.com', course: 'Spanish Level 2', level: 'Elementary', score: 78, issued: 'Jun 03, 2026', status: 'issued' },
  { id: '4', user: 'Carlos G.', email: 'carlos@mail.com', course: 'French Beginner', level: 'Beginner', score: 72, issued: 'Pending Verification', status: 'pending' },
  { id: '5', user: 'Wei Zhang', email: 'wei@mail.com', course: 'TOEFL Practice', level: 'Advanced', score: 88, issued: 'Pending Verification', status: 'pending' },
];

const CertificationAdmin: React.FC = () => {
  const [certs, setCerts] = useState<CertNode[]>(INITIAL_CERTS);
  const [inspectedCert, setInspectedCert] = useState<CertNode | null>(null);

  // Dynamic Metrics Analytics Calculations
  const issuedThisMonth = certs.filter(c => c.status === 'issued' && c.issued.startsWith('Jun')).length;
  const pendingReview = certs.filter(c => c.status === 'pending').length;
  const totalHistoricallyIssued = 1281 + certs.filter(c => c.status === 'issued').length;

  // EYE BUTTON ACTION - TRIGGER DETAILS VIEW
  const handleInspectCert = (cert: CertNode) => {
    setInspectedCert(cert);
  };

  // ISSUE BUTTON ACTION - PROCESS PENDING NODE
  const handleApproveAndIssue = (id: string, name: string) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    setCerts(prev => prev.map(c => {
      if (c.id === id) {
        const structuralUpdate: CertNode = { ...c, status: 'issued', issued: formattedDate };
        // Sync active inspected view modal instantly if user has it open
        if (inspectedCert?.id === id) setInspectedCert(structuralUpdate);
        return structuralUpdate;
      }
      return c;
    }));

    toast.success(`Security Verification Approved: Certificate issued successfully for ${name}.`);
  };

  // DOWNLOAD BUTTON ACTION - CLIENT SIDE NATIVE TEXT BLOB TRIGGER
  const handleDownloadCertificateFile = (cert: CertNode) => {
    const manifestLayoutContent = `
      ======================================================
                 OFFICIAL ACCREDITATION CERTIFICATE
      ======================================================
      Certificate Hash Token Reference ID: CERT-${cert.id}-2026
      
      This document safely certifies that:
      LEARNER PROFILE:  ${cert.user}
      EMAIL PROFILE:    ${cert.email}
      
      Has successfully demonstrated rigorous fluency limits in:
      CURRICULUM COURSE: ${cert.course} (${cert.level} tier)
      FINAL COMPLIANCE SCORE: ${cert.score}%
      
      ISSUED OFFICIALLY ON:   ${cert.issued}
      VERIFICATION ENVELOPE STATUS: SIGNED & SECURED
      ======================================================
      Platform Academic Integrity Assurance Register Network.
    `.trim();

    const textBlobNode = new Blob([manifestLayoutContent], { type: 'text/plain' });
    const downloadURLNode = URL.createObjectURL(textBlobNode);
    
    const virtualLinkElement = document.createElement('a');
    virtualLinkElement.href = downloadURLNode;
    virtualLinkElement.download = `Certificate_${cert.user.replace(/\s+/g, '_')}_${cert.id}.txt`;
    
    document.body.appendChild(virtualLinkElement);
    virtualLinkElement.click();
    document.body.removeChild(virtualLinkElement);
    URL.revokeObjectURL(downloadURLNode);

    toast.success(`Resource Ingested: Secure certificate package downloaded for ${cert.user}.`);
  };

  return (
    <DashboardLayout title="Certification Administration" subtitle="Audit platform verification vectors, clear compliance pipelines, and issue digitally signed achievements">
      
      {/* Top Statistical Insight Row Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 select-none">
        {[
          { label: 'Issued This Month', value: issuedThisMonth, icon: <CheckCircle className="w-4 h-4 text-emerald-700" />, border: 'border-emerald-100 bg-emerald-50/50' },
          { label: 'Pending Admin Review', value: pendingReview, icon: <Clock className="w-4 h-4 text-amber-700" />, border: 'border-amber-100 bg-amber-50/50' },
          { label: 'Total Issued Registry', value: totalHistoricallyIssued.toLocaleString(), icon: <Award className="w-4 h-4 text-blue-700" />, border: 'border-blue-100 bg-blue-50/50' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 border ${s.border} flex items-center gap-3.5 shadow-sm`}>
            <div className="w-9 h-9 bg-white rounded-xl border border-slate-150 flex items-center justify-center shadow-inner">{s.icon}</div>
            <div>
              <div className="font-heading font-black text-xl text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Data Table Ledger Element */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-150 flex items-center justify-between bg-slate-50/50 select-none">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-slate-400" /> Certificate Log Ledger Entries
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-500 font-mono">
            Index Pool: {certs.length} nodes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                {['Candidate Profile', 'Assigned Track Content', 'Score Matrix', 'Signed Issue Log', 'Network Status', 'Operational Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
              {certs.map(cert => (
                <tr key={cert.id} className="hover:bg-slate-50/40 transition-colors">
                  
                  {/* Candidate Identity Segment */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xs select-none shadow-sm">
                        {cert.user.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 tracking-tight">{cert.user}</div>
                        <div className="text-[11px] font-mono font-medium text-slate-400 mt-0.5">{cert.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Course Track & Level Info */}
                  <td className="px-5 py-3.5">
                    <div className="text-slate-800 font-bold tracking-tight">{cert.course}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">{cert.level} Segment</div>
                  </td>

                  {/* Quantitative Grading Evaluation Metrics */}
                  <td className="px-5 py-3.5 font-mono whitespace-nowrap">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-md ${cert.score >= 85 ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-amber-700 bg-amber-50 border border-amber-100'}`}>
                      {cert.score}% Gross
                    </span>
                  </td>

                  {/* Issue Log Field Timestamp */}
                  <td className="px-5 py-3.5 font-medium text-slate-400 whitespace-nowrap">
                    {cert.issued}
                  </td>

                  {/* Operational Security Status Flags */}
                  <td className="px-5 py-3.5 select-none whitespace-nowrap">
                    <span className={`text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-md font-extrabold inline-flex items-center gap-1 border ${cert.status === 'issued' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      {cert.status === 'issued' ? <CheckCircle className="w-2.5 h-2.5 stroke-[2.5]" /> : <Clock className="w-2.5 h-2.5 stroke-[2.5]" />}
                      {cert.status}
                    </span>
                  </td>

                  {/* Interactive Action Pipeline Handlers */}
                  <td className="px-5 py-3.5 select-none whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleInspectCert(cert)}
                        title="SEE: Open Full Document File View"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                      
                      {cert.status === 'issued' ? (
                        <button 
                          onClick={() => handleDownloadCertificateFile(cert)}
                          title="DOWNLOAD: Export Signed Certificate Package Node"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors cursor-pointer shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleApproveAndIssue(cert.id, cert.user)}
                          className="h-7 text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 px-3 shadow-sm rounded-md"
                        >
                          Issue Verification
                    </Button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EYE POPUP MODAL COMPONENT WINDOW VIEWPORT */}
      {inspectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl overflow-hidden">
            
            {/* Modal Navigation Banner Line */}
            <div className="bg-slate-950 px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold tracking-tight">Accreditation Document Record</span>
              </div>
              <button 
                onClick={() => setInspectedCert(null)} 
                className="text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Profile Metrics Content Payload */}
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-sm font-black text-slate-900 tracking-tight leading-tight">{inspectedCert.user}</h4>
                <p className="text-[11px] font-mono font-medium text-slate-400 mt-1 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {inspectedCert.email}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Completed Track</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{inspectedCert.course}</div>
                    <div className="text-[10px] font-medium text-slate-500 mt-0.5">Fluency Group: {inspectedCert.level}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Issue Log Date</div>
                      <div className="text-[11px] font-semibold text-slate-600">{inspectedCert.issued}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Grading Mark</div>
                    <div className="text-xs font-mono font-black text-slate-900">{inspectedCert.score}% Outright</div>
                  </div>
                </div>
              </div>

              {/* Bottom Dynamic Operational Call-to-Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded font-extrabold border ${inspectedCert.status === 'issued' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                  {inspectedCert.status}
                </span>

                {inspectedCert.status === 'issued' ? (
                  <Button 
                    size="sm" 
                    onClick={() => { handleDownloadCertificateFile(inspectedCert); setInspectedCert(null); }}
                    className="h-8 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Download Text Copy
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => handleApproveAndIssue(inspectedCert.id, inspectedCert.user)}
                    className="h-8 text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm"
                  >
                    Sign & Deploy Now
                  </Button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default CertificationAdmin;
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Trophy, 
  Download, 
  CheckCircle, 
  Clock, 
  Star, 
  Award, 
  Lock, 
  ChevronRight, 
  GraduationCap, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/types/user.types';
import { toast } from 'sonner';

const INITIAL_CERTIFICATES: Certificate[] = [
  { id: '1', title: 'Business English Proficiency', issueDate: '2026-03-15', score: 92, language: 'English', level: 'Intermediate', verified: true },
  { id: '2', title: 'Vocabulary Mastery — 1000 Words', issueDate: '2026-01-20', score: 88, language: 'English', level: 'Advanced', verified: true },
  { id: '3', title: 'Communication Skills Foundation', issueDate: '2025-11-10', score: 95, language: 'English', level: 'Beginner', verified: true },
];

const INITIAL_TESTS = [
  { id: 'ielts-mock', title: 'IELTS Mock Exam Simulation', desc: 'Full evaluation · 4 structural modules', date: 'Jun 15, 2026', difficulty: 'Advanced', ready: 72 },
  { id: 'toefl-practice', title: 'TOEFL Practice Test Node', desc: 'iBT format · Reading & Writing matrix', date: 'Jun 22, 2026', difficulty: 'Intermediate', ready: 55 },
  { id: 'pte-academic', title: 'PTE Academic Mock Block', desc: 'Computer-based · Instant AI validation score', date: 'Jul 05, 2026', difficulty: 'Advanced', ready: 40 },
];

const scoreColorClass = (score: number) => {
  if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200/60';
  if (score >= 75) return 'text-blue-700 bg-blue-50 border-blue-200/60';
  return 'text-amber-700 bg-amber-50 border-amber-200/60';
};

const Certifications: React.FC = () => {
  const [certificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [upcomingTests, setUpcomingTests] = useState(INITIAL_TESTS);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Compute stats dynamically from state array values
  const totalCertificates = certificates.length;
  const totalAvailableTests = upcomingTests.length;
  const averageScore = Number((certificates.reduce((acc, curr) => acc + curr.score, 0) / totalCertificates).toFixed(1));

  const handleDownloadCertificate = async (id: string, name: string) => {
    setDownloadingId(id);
    toast.info(`Initializing secure data pipeline download for: ${name}`);
    
    // Simulate generation loop
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    toast.success(`Archive schema for "${name}" saved to filesystem successfully.`);
    setDownloadingId(null);
  };

  const handleInitializeTest = (testId: string, testName: string, readiness: number) => {
    if (readiness < 70) {
      toast.error(`Access Denied: Readiness parameter is at ${readiness}%. Threshold benchmark requires >= 70%.`);
      return;
    }
    
    toast.success(`Initializing exam secure shell for ${testName}. Loading assessment assets...`);
    
    // Simulate exam activation by removing or updating state parameters
    setUpcomingTests(prev => prev.filter(t => t.id !== testId));
  };

  const handleProUpgrade = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Routing to billing infrastructure ledger...',
        success: 'Access granted. Enterprise validation modules unlocked.',
        error: 'Pipeline error routing premium payment nodes.',
      }
    );
  };

  return (
    <DashboardLayout title="Credential Registry" subtitle="Review verified credentials and launch academic mock validations">
      
      {/* High Density Metric Cards Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 select-none">
        {[
          { label: 'Credentials Earned', value: totalCertificates, icon: <Trophy className="w-5 h-5 text-slate-800" />, bg: 'bg-white border-slate-200' },
          { label: 'Vetting Models Active', value: totalAvailableTests, icon: <GraduationCap className="w-5 h-5 text-slate-500" />, bg: 'bg-white border-slate-200' },
          { label: 'Mean Assessment Score', value: `${averageScore}%`, icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500/20" />, bg: 'bg-white border-slate-200' },
        ].map((stat, i) => (
          <div key={i} className={`rounded-xl p-4 flex items-center gap-3.5 border shadow-sm ${stat.bg}`}>
            <div className="w-9 h-9 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center shadow-inner">{stat.icon}</div>
            <div>
              <div className="font-heading font-black text-xl text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* Left Side: Earned Credentials Data Table Block */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-2 select-none">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-400" /> Active Verified Diplomas
            </h3>
            <span className="text-[10px] font-semibold text-slate-400">Total logs: {totalCertificates}</span>
          </div>

          {certificates.map(cert => (
            <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm select-none">
                  <Award className="w-5 h-5 text-slate-200" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 tracking-tight leading-snug group-hover:text-slate-900">
                        {cert.title}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">
                        {cert.language} Paradigm · Level Matrix {cert.level}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 border rounded-md select-none ${scoreColorClass(cert.score)}`}>
                      {cert.score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100/70">
                    <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider select-none">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 opacity-70" /> Issued {cert.issueDate}
                      </span>
                      {cert.verified && (
                        <span className="flex items-center gap-0.5 text-emerald-600 font-bold bg-emerald-50/60 border border-emerald-100 rounded px-1 text-[9px]">
                          <CheckCircle className="w-3 h-3 stroke-[2.5]" /> Authenticated
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      disabled={downloadingId === cert.id}
                      onClick={() => handleDownloadCertificate(cert.id, cert.title)}
                      className="text-[11px] font-bold h-7 px-2.5 border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg shadow-sm"
                    >
                      <Download className={`w-3 h-3 mr-1.5 ${downloadingId === cert.id ? 'animate-bounce' : ''}`} />
                      {downloadingId === cert.id ? 'Saving...' : 'Export Asset'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Pending Models & Gated Assets Block */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="space-y-3">
            <div className="pb-1 border-b border-slate-100 mb-2 select-none">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-400" /> Pending Simulations
              </h3>
            </div>

            {upcomingTests.map(test => {
              const isPassingReady = test.ready >= 70;
              return (
                <div key={test.title} className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 tracking-tight">{test.title}</h4>
                      <p className="text-[11px] font-medium text-slate-400 mt-0.5">{test.desc}</p>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider bg-slate-100 border border-slate-200/60 text-slate-600 px-1.5 py-0.5 rounded-md select-none">
                      {test.difficulty}
                    </span>
                  </div>

                  {/* Operational Readiness Meter */}
                  <div className="mb-4 bg-slate-50 border border-slate-100 p-2 rounded-xl select-none">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                      <span className="text-slate-400">Readiness Score Vector</span>
                      <span className={`font-extrabold ${isPassingReady ? 'text-emerald-600' : 'text-slate-700'}`}>{test.ready}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200/60 border border-slate-200/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          test.ready >= 70 ? 'bg-emerald-500' : test.ready >= 50 ? 'bg-slate-700' : 'bg-amber-500'
                        }`}
                        style={{ width: `${test.ready}%` }}
                      />
                    </div>
                  </div>

                  {/* Interactive Assessment Execution Action Area */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                      <Clock className="w-3.5 h-3.5 opacity-70" />
                      <span>{test.date}</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleInitializeTest(test.id, test.title, test.ready)}
                      className={`text-[11px] font-bold h-7 px-3 rounded-lg border transition-all ${
                        isPassingReady 
                          ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 shadow-sm' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      {isPassingReady ? 'Execute Test Shell' : 'Locked Under Threshold'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Account Gating Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0 select-none">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-800 tracking-tight flex items-center gap-1">
                  Official Standard Matrices <span className="inline-flex items-center gap-0.5 bg-slate-900 text-amber-400 rounded px-1 py-0.2 text-[8px] uppercase tracking-widest font-black">Pro</span>
                </h4>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed mt-1 mb-3">
                  Unlock fully verified IELTS, TOEFL iBT, and PTE Academic verification protocols using secure remote validation frameworks.
                </p>
                <Button 
                  size="sm" 
                  onClick={handleProUpgrade}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 border-slate-200 font-bold text-xs h-8 rounded-xl shadow-sm inline-flex items-center justify-center gap-1"
                >
                  Provision Pro Plan Access <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Certifications;
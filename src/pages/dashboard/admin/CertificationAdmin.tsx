import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Award, Search, CheckCircle, XCircle, Eye, Download, Clock } from 'lucide-react';

const CERTS = [
  { id: '1', user: 'Yuki Tanaka', email: 'yuki@mail.com', course: 'IELTS Mock Test', level: 'Advanced', score: 92, issued: 'Jun 8, 2026', status: 'issued' },
  { id: '2', user: 'Alex Morgan', email: 'alex@demo.com', course: 'Business English Mastery', level: 'Intermediate', score: 85, issued: 'Jun 5, 2026', status: 'issued' },
  { id: '3', user: 'Priya Sharma', email: 'priya@email.com', course: 'Spanish Level 2', level: 'Elementary', score: 78, issued: 'Jun 3, 2026', status: 'issued' },
  { id: '4', user: 'Carlos G.', email: 'carlos@mail.com', course: 'French Beginner', level: 'Beginner', score: 72, issued: 'Pending', status: 'pending' },
  { id: '5', user: 'Wei Zhang', email: 'wei@mail.com', course: 'TOEFL Practice', level: 'Advanced', score: 88, issued: 'Pending', status: 'pending' },
];

const CertificationAdmin: React.FC = () => (
  <DashboardLayout title="Certification Administration" subtitle="Review and issue digital language certificates">
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { label: 'Issued This Month', value: '3', icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50' },
        { label: 'Pending Review', value: '2', icon: <Clock className="w-5 h-5 text-yellow-500" />, bg: 'bg-yellow-50' },
        { label: 'Total Issued', value: '1,284', icon: <Award className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50' },
      ].map(s => (
        <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-border flex items-center gap-3`}>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">{s.icon}</div>
          <div><div className="font-heading font-bold text-xl">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between bg-brand-surface">
        <h3 className="font-semibold text-sm">Certificate Records</h3>
        <span className="text-xs text-muted-foreground">{CERTS.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-border">
              {['Learner', 'Course', 'Score', 'Issue Date', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CERTS.map(cert => (
              <tr key={cert.id} className="border-b border-border/50 last:border-0 hover:bg-brand-surface/30 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xs">{cert.user.charAt(0)}</div>
                    <div><div className="text-sm font-medium">{cert.user}</div><div className="text-xs text-muted-foreground">{cert.email}</div></div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{cert.course}</td>
                <td className="px-5 py-3">
                  <span className={`text-sm font-semibold ${cert.score >= 80 ? 'text-emerald-600' : 'text-yellow-600'}`}>{cert.score}%</span>
                </td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{cert.issued}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 w-fit ${cert.status === 'issued' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {cert.status === 'issued' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {cert.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></button>
                    {cert.status === 'issued' && <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"><Download className="w-4 h-4" /></button>}
                    {cert.status === 'pending' && (
                      <button className="gradient-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90">Issue</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
);

export default CertificationAdmin;

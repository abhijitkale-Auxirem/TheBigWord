import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { MessageSquare, Flag, Eye, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';

const REPORTS = [
  { id: '1', type: 'Forum Post', user: 'Anonymous', content: 'Reported post containing inappropriate language in Spanish community forum.', reported: 'Jun 9, 2026', status: 'pending', severity: 'medium' },
  { id: '2', type: 'User Profile', user: 'Carlos G.', content: 'Tutor profile contains misleading credentials and unverified certifications.', reported: 'Jun 8, 2026', status: 'under-review', severity: 'high' },
  { id: '3', type: 'Course Review', user: 'Anon', content: 'Spam review with promotional links embedded in IELTS course comments.', reported: 'Jun 7, 2026', status: 'resolved', severity: 'low' },
  { id: '4', type: 'Community Post', user: 'System', content: 'Auto-flagged: Post contains potential spam URL in Mandarin community.', reported: 'Jun 6, 2026', status: 'pending', severity: 'medium' },
];

const severityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const ContentModeration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'under-review' | 'resolved'>('pending');
  const displayed = REPORTS.filter(r => r.status === activeTab || activeTab === 'pending' && r.status !== 'resolved');

  return (
    <DashboardLayout title="Content Moderation" subtitle="Review flagged content and user reports">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pending', count: REPORTS.filter(r => r.status === 'pending').length, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Under Review', count: REPORTS.filter(r => r.status === 'under-review').length, color: 'text-blue-600 bg-blue-50' },
          { label: 'Resolved Today', count: 1, color: 'text-emerald-600 bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-xl p-4 border border-border text-center`}>
            <div className="font-heading font-bold text-2xl">{s.count}</div>
            <div className="text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-brand-surface p-1 rounded-xl w-fit mb-6">
        {(['pending', 'under-review', 'resolved'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === t ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}>
            {t.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="space-y-4 stagger-children">
        {REPORTS.filter(r => activeTab === 'pending' ? r.status !== 'resolved' : r.status === activeTab).map(report => (
          <div key={report.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Flag className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{report.type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityColors[report.severity]}`}>{report.severity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">Reported by: {report.user} · {report.reported}</p>
                </div>
              </div>
              {report.status !== 'resolved' && (
                <div className="flex gap-2 flex-shrink-0">
                  <button className="p-2 rounded-xl border border-border hover:border-emerald-300 text-muted-foreground hover:text-emerald-500 transition-all">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl border border-border hover:border-red-300 text-muted-foreground hover:text-red-500 transition-all">
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl border border-border text-muted-foreground hover:text-primary transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              )}
              {report.status === 'resolved' && (
                <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Resolved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ContentModeration;

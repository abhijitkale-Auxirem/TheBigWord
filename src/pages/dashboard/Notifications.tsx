import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  AlertCircle, 
  Info, 
  Settings, 
  BookOpen, 
  Shield, 
  Globe, 
  CreditCard, 
  Award,
  Circle
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: 'urgent' | 'update' | 'system';
  unread: boolean;
  role: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  // Learner
  { id: 'l1', title: 'New Course Module Unlocked', desc: 'Advanced Grammar Patterns is now available in Course Academy.', time: '10 min ago', category: 'update', unread: true, role: 'learner' },
  { id: 'l2', title: 'AI Coach Speaking Practice', desc: 'Your speaking practice session starts in 15 minutes. Join now to practice conversational fluency.', time: '15 min ago', category: 'urgent', unread: true, role: 'learner' },
  { id: 'l3', title: 'Achievement Unlocked: 12-Day Streak', desc: 'You have earned the Streak Badge and 200 bonus learning points!', time: '1 hr ago', category: 'update', unread: true, role: 'learner' },
  { id: 'l4', title: 'Tutor Session Confirmed', desc: 'Your 1-on-1 session with Dr. Sarah Chen is confirmed for Tuesday at 2:00 PM.', time: 'Yesterday', category: 'update', unread: false, role: 'learner' },

  // Tutor
  { id: 't1', title: 'New Session Booking Request', desc: 'Alex Morgan has requested a 1-on-1 Business Chinese session for Tuesday at 2:00 PM.', time: '5 min ago', category: 'urgent', unread: true, role: 'tutor' },
  { id: 't2', title: 'Grading Evaluation Completed', desc: 'Student Priya Sharma has completed the IELTS Practice module. Feedback is pending.', time: '2 hr ago', category: 'update', unread: true, role: 'tutor' },
  { id: 't3', title: 'Earnings Payout Processed', desc: 'Your weekly teaching earnings payout of $460 has been processed.', time: 'Yesterday', category: 'system', unread: false, role: 'tutor' },

  // Translator
  { id: 'tr1', title: 'New Translation Project Match', desc: 'A technical localization project from TechStart Inc. matches your language pair.', time: '12 min ago', category: 'urgent', unread: true, role: 'translator' },
  { id: 'tr2', title: 'Review Comments Submitted', desc: 'GlobalMed Corp submitted review comments for Project #2. Action is required.', time: '3 hr ago', category: 'update', unread: true, role: 'translator' },
  { id: 'tr3', title: 'Invoice Payment Received', desc: 'Payout of $320 completed for E-Comm Store marketing translation project.', time: 'Yesterday', category: 'system', unread: false, role: 'translator' },

  // Corporate
  { id: 'c1', title: 'Progress Report Ready', desc: 'The June workforce language progress and training engagement report is ready for download.', time: '30 min ago', category: 'update', unread: true, role: 'corporate' },
  { id: 'c2', title: 'SSO Certificate Expiration Warning', desc: 'Your SAML single sign-on certificate is set to expire in 15 days.', time: '1 day ago', category: 'urgent', unread: true, role: 'corporate' },
  { id: 'c3', title: 'Monthly Invoice Processed', desc: 'Corporate subscription invoice INV-2026-06 has been processed successfully.', time: 'Yesterday', category: 'system', unread: false, role: 'corporate' },

  // Admin
  { id: 'a1', title: 'Content Moderation Flag', desc: 'User comments on the language exchange forum have been flagged for review.', time: '2 min ago', category: 'urgent', unread: true, role: 'admin' },
  { id: 'a2', title: 'Database Spike Alert', desc: 'Platform database CPU utilization spiked to 92% during automated backup cycle.', time: '1 hr ago', category: 'system', unread: true, role: 'admin' },
  { id: 'a3', title: 'Weekly Financial Digest', desc: 'Platform subscriptions financial summary report for Week 24 is compiled.', time: 'Yesterday', category: 'update', unread: false, role: 'admin' },
];

const NotificationsPage: React.FC = () => {
  const { user } = useAuthContext();
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [list, setList] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem('tbw_notifications');
    let items: NotificationItem[] = [];

    if (stored) {
      items = JSON.parse(stored);
    } else {
      items = DEFAULT_NOTIFICATIONS;
      localStorage.setItem('tbw_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
    }

    // Filter items for current user's role
    const roleItems = items.filter(n => n.role === user.role);
    setList(roleItems);

    // Sync unread count to localStorage for bell indicator
    const unreadCount = roleItems.filter(n => n.unread).length;
    localStorage.setItem(`tbw_unread_count_${user.role}`, unreadCount.toString());
  }, [user]);

  const updateGlobalList = (updatedRoleList: NotificationItem[]) => {
    setList(updatedRoleList);
    
    // Read current global list to preserve other roles
    const stored = localStorage.getItem('tbw_notifications');
    if (stored && user) {
      const allItems = JSON.parse(stored) as NotificationItem[];
      // Keep other roles, replace current role items
      const otherRolesItems = allItems.filter(n => n.role !== user.role);
      const merged = [...updatedRoleList, ...otherRolesItems];
      localStorage.setItem('tbw_notifications', JSON.stringify(merged));

      // Sync unread count
      const unreadCount = updatedRoleList.filter(n => n.unread).length;
      localStorage.setItem(`tbw_unread_count_${user.role}`, unreadCount.toString());
    }
  };

  const markAllAsRead = () => {
    const updated = list.map(n => ({ ...n, unread: false }));
    updateGlobalList(updated);
    toast.success('All notifications marked as read.');
  };

  const toggleReadStatus = (id: string) => {
    const updated = list.map(n => n.id === id ? { ...n, unread: !n.unread } : n);
    updateGlobalList(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = list.filter(n => n.id !== id);
    updateGlobalList(updated);
    toast.info('Notification removed.');
  };

  const displayedList = list.filter(n => {
    if (filter === 'unread') return n.unread;
    if (filter === 'urgent') return n.category === 'urgent';
    return true;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'urgent':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full select-none uppercase tracking-wide"><AlertCircle className="w-3 h-3" /> Urgent</span>;
      case 'system':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full select-none uppercase tracking-wide"><Shield className="w-3 h-3" /> System</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full select-none uppercase tracking-wide"><Info className="w-3 h-3" /> Update</span>;
    }
  };

  return (
    <DashboardLayout title="Notification Center" subtitle="Review platform logs, system reports, and account alerts">
      {/* Top Filter Buttons and Bulk Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 select-none">
        <div className="flex gap-1 bg-brand-surface p-1 rounded-xl w-fit">
          {[
            { key: 'all', label: 'All Alerts' },
            { key: 'unread', label: `Unread (${list.filter(n => n.unread).length})` },
            { key: 'urgent', label: 'Urgent' },
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === opt.key ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {list.filter(n => n.unread).length > 0 && (
          <button
            onClick={markAllAsRead}
            className="h-9 px-4 text-xs font-bold text-primary border border-primary/20 bg-white hover:bg-primary/5 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 shadow-sm"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* Main Notifications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 select-none">
                {['Alert Category', 'Description Log', 'Logged Timeline', 'Status Node', 'Action Line'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 px-5 py-3 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-xs font-medium text-slate-700">
              {displayedList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 font-medium">
                    No active notifications matching current filter context.
                  </td>
                </tr>
              ) : (
                displayedList.map(n => (
                  <tr key={n.id} className={`hover:bg-slate-50/50 transition-colors ${n.unread ? 'bg-blue-50/15' : ''}`}>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getCategoryBadge(n.category)}
                    </td>
                    <td className="px-5 py-4">
                      <div className={`font-bold tracking-tight text-sm ${n.unread ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5 max-w-lg leading-relaxed">{n.desc}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-500 font-semibold">{n.time}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleReadStatus(n.id)}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold select-none transition-colors ${
                          n.unread 
                            ? 'bg-blue-100 text-blue-700 border-blue-200' 
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        <Circle className={`w-2 h-2 ${n.unread ? 'fill-blue-500 text-blue-500' : 'text-slate-300'}`} />
                        {n.unread ? 'Unread' : 'Read'}
                      </button>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <button
                        onClick={() => deleteNotification(n.id)}
                        title="Remove Notification"
                        className="p-1.5 border border-slate-200 hover:border-rose-200 hover:text-rose-600 text-slate-400 rounded-lg transition-colors bg-white shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;

import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, Search, Shield, MoreHorizontal, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';

const USERS = [
  { id: '1', name: 'Alex Morgan', email: 'alex@demo.com', role: 'learner', joined: 'Jun 1, 2026', status: 'active', courses: 3, country: 'UK' },
  { id: '2', name: 'Dr. Sarah Chen', email: 'sarah@tutor.com', role: 'tutor', joined: 'May 10, 2026', status: 'active', courses: 0, country: 'Singapore' },
  { id: '3', name: 'Marcus Williams', email: 'marcus@corp.com', role: 'corporate', joined: 'Apr 15, 2026', status: 'active', courses: 0, country: 'USA' },
  { id: '4', name: 'Priya Sharma', email: 'priya@email.com', role: 'learner', joined: 'Jun 5, 2026', status: 'active', courses: 5, country: 'India' },
  { id: '5', name: 'Elena Rossi', email: 'elena@trans.com', role: 'translator', joined: 'Mar 20, 2026', status: 'active', courses: 0, country: 'Italy' },
  { id: '6', name: 'Yuki Tanaka', email: 'yuki@mail.com', role: 'learner', joined: 'Jun 8, 2026', status: 'suspended', courses: 2, country: 'Japan' },
];

const roleColors: Record<string, string> = {
  learner: 'bg-blue-100 text-blue-700', tutor: 'bg-emerald-100 text-emerald-700',
  translator: 'bg-cyan-100 text-cyan-700', corporate: 'bg-purple-100 text-purple-700', admin: 'bg-red-100 text-red-700',
};

const UserManagement: React.FC = () => {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const displayed = USERS.filter(u => {
    const matchQ = !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
    const matchR = roleFilter === 'all' || u.role === roleFilter;
    return matchQ && matchR;
  });

  return (
    <DashboardLayout title="User Management" subtitle="Manage all platform users and their access">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search users..."
            className="w-full h-10 pl-9 pr-4 border border-border rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
          className="h-10 border border-border rounded-xl px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">All Roles</option>
          <option value="learner">Learners</option>
          <option value="tutor">Tutors</option>
          <option value="translator">Translators</option>
          <option value="corporate">Corporate</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-brand-surface">
          <span className="text-sm font-semibold">{displayed.length} users found</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Filter className="w-4 h-4" /> Filter active
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                {['User', 'Role', 'Country', 'Joined', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map(u => (
                <tr key={u.id} className="border-b border-border/50 last:border-0 hover:bg-brand-surface/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{u.name.charAt(0)}</div>
                      <div><div className="text-sm font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[u.role]}`}>{u.role}</span></td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{u.country}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{u.joined}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 w-fit ${u.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {u.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"><Shield className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button>
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
};

export default UserManagement;

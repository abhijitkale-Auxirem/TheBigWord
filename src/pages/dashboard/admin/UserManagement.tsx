import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, Search, Shield, MoreHorizontal, CheckCircle, XCircle, Eye, Filter, UserMinus, ShieldAlert, X, Mail, Globe, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UserNode {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  status: 'active' | 'suspended';
  courses: number;
  country: string;
}

const INITIAL_USERS: UserNode[] = [
  { id: '1', name: 'Alex Morgan', email: 'alex@demo.com', role: 'learner', joined: 'Jun 1, 2026', status: 'active', courses: 3, country: 'UK' },
  { id: '2', name: 'Dr. Sarah Chen', email: 'sarah@tutor.com', role: 'tutor', joined: 'May 10, 2026', status: 'active', courses: 0, country: 'Singapore' },
  { id: '3', name: 'Marcus Williams', email: 'marcus@corp.com', role: 'corporate', joined: 'Apr 15, 2026', status: 'active', courses: 0, country: 'USA' },
  { id: '4', name: 'Priya Sharma', email: 'priya@email.com', role: 'learner', joined: 'Jun 5, 2026', status: 'active', courses: 5, country: 'India' },
  { id: '5', name: 'Elena Rossi', email: 'elena@trans.com', role: 'translator', joined: 'Mar 20, 2026', status: 'active', courses: 0, country: 'Italy' },
  { id: '6', name: 'Yuki Tanaka', email: 'yuki@mail.com', role: 'learner', joined: 'Jun 8, 2026', status: 'suspended', courses: 2, country: 'Japan' },
];

const roleColors: Record<string, string> = {
  learner: 'bg-blue-50 text-blue-700 border-blue-100',
  tutor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  translator: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  corporate: 'bg-purple-50 text-purple-700 border-purple-100',
  admin: 'bg-rose-50 text-rose-700 border-rose-100',
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserNode[]>(INITIAL_USERS);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // New State for active inspected profile modal popup
  const [inspectedUser, setInspectedUser] = useState<UserNode | null>(null);

  const handleInspectUser = (user: UserNode) => {
    setInspectedUser(user);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        if (nextStatus === 'suspended') {
          toast.warning(`Access Revoked: Account instance ${u.email} suspended.`);
        } else {
          toast.success(`Access Reinstated: Account instance ${u.email} marked active.`);
        }
        
        // If the user being modified is currently open in the inspector popup, mirror state changes dynamically
        if (inspectedUser?.id === id) {
          setInspectedUser(prev => prev ? { ...prev, status: nextStatus } : null);
        }
        
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleModifyPermissions = (user: UserNode) => {
    toast.info(`Security Matrix: Initialized RBAC modal layer for ${user.name}`);
  };

  const handleTriggerOverflowActions = (user: UserNode) => {
    toast.success(`Dispatched logging context trace parameters for payload target UID: ${user.id}`);
  };

  const displayed = users.filter(u => {
    const matchQ = !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
    const matchR = roleFilter === 'all' || u.role === roleFilter;
    return matchQ && matchR;
  });

  return (
    <DashboardLayout title="User Management Registry" subtitle="Monitor global identity sets, manage security permissions, and evaluate authentication metrics">
      
      {/* Search Filter Controls Matrix */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 select-none">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[2.5]" />
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Query credentials, unique ID elements or names..."
            className="w-full h-10 pl-9 pr-4 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 bg-white placeholder-slate-400 outline-none focus:border-slate-400 transition-colors shadow-sm" 
          />
        </div>
        <select 
          value={roleFilter} 
          onChange={e => setRoleFilter(e.target.value)}
          className="h-10 border border-slate-200 rounded-xl px-3 text-xs font-bold text-slate-700 bg-white outline-none focus:border-slate-400 transition-colors shadow-sm cursor-pointer"
        >
          <option value="all">All Enterprise Roles</option>
          <option value="learner">Learners</option>
          <option value="tutor">Tutors</option>
          <option value="translator">Translators</option>
          <option value="corporate">Corporate</option>
        </select>
      </div>

      {/* Main Table Ledger Module Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-150 bg-slate-50/60 select-none">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" /> Identity Allocation List ({displayed.length})
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-150">
            <Filter className="w-3 h-3 text-slate-400" /> Operational Filters Active
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                {['User Security Identifier', 'Access Protocol Role', 'Geographic Vector', 'Onboarding Log', 'System Health Status', 'Administrative Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
              {displayed.length > 0 ? (
                displayed.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-sm select-none">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 tracking-tight">{u.name}</div>
                          <div className="text-[11px] font-mono font-medium text-slate-400 mt-0.5">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap select-none">
                      <span className={`text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-md font-extrabold border ${roleColors[u.role] || 'bg-slate-50 text-slate-600 border-slate-150'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-500">{u.country}</td>
                    <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-400">{u.joined}</td>
                    <td className="px-5 py-3 whitespace-nowrap select-none">
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-extrabold inline-flex items-center gap-1 border ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                        {u.status === 'active' ? <CheckCircle className="w-2.5 h-2.5 stroke-[2.5]" /> : <XCircle className="w-2.5 h-2.5 stroke-[2.5]" />}
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap select-none">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleInspectUser(u)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      
                        <button 
                          onClick={() => handleToggleStatus(u.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer shadow-sm ${u.status === 'active' ? 'border-slate-200 text-rose-600 bg-white hover:bg-rose-50 hover:border-rose-200' : 'border-slate-200 text-emerald-600 bg-white hover:bg-emerald-50 hover:border-emerald-200'}`}
                        >
                          {u.status === 'active' ? <UserMinus className="w-3.5 h-3.5 stroke-[2.5]" /> : <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400 font-medium select-none">
                    <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-[1.5]" />
                    No user nodes matched the specified query bounds.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Ingestion Popup Modal Viewport Layer */}
      {inspectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden transform transition-transform scale-100">
            
            {/* Header Banner */}
            <div className="bg-slate-950 px-6 py-5 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center font-black text-xs">
                  {inspectedUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">{inspectedUser.name}</h4>
                  <p className="text-[10px] font-mono font-medium text-slate-400 mt-0.5">UID Token: #{inspectedUser.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setInspectedUser(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-900"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Profile Matrix Fields */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Mail className="w-3 h-3" /> Digital Destination
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-700 truncate">{inspectedUser.email}</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Shield className="w-3 h-3" /> System Role
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-extrabold border inline-block ${roleColors[inspectedUser.role]}`}>
                    {inspectedUser.role}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Globe className="w-3 h-3" /> Local Node
                  </div>
                  <div className="text-xs font-bold text-slate-700">{inspectedUser.country}</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" /> Onboard Vector
                  </div>
                  <div className="text-xs font-bold text-slate-700">{inspectedUser.joined}</div>
                </div>

              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                    <BookOpen className="w-3 h-3" /> Curriculum Tracks
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">Total active matrix items</div>
                </div>
                <div className="font-mono font-black text-lg text-slate-900 pr-1">
                  {inspectedUser.courses}
                </div>
              </div>

              {/* Status Indicator Bar */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-md font-extrabold inline-flex items-center gap-1 border ${inspectedUser.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                    {inspectedUser.status}
                  </span>
                </div>

                <Button 
                  size="sm"
                  variant={inspectedUser.status === 'active' ? 'destructive' : 'default'}
                  onClick={() => handleToggleStatus(inspectedUser.id)}
                  className={`h-8 text-xs font-bold ${inspectedUser.status === 'active' ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                >
                  {inspectedUser.status === 'active' ? 'Suspend Instance' : 'Activate Instance'}
                </Button>
              </div>

            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default UserManagement;
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Shield, Camera, Edit3, Save, X, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AdminProfile: React.FC = () => {
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', role: 'Super Administrator', department: 'Platform Operations', phone: '+44 20 1234 5678' });
  const handleSave = () => { setEditing(false); toast.success('Admin profile updated!'); };

  return (
    <DashboardLayout title="Admin Profile" subtitle="Your administrator account and security settings">
      <div className="max-w-3xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg">{user?.name}</h3>
            <p className="text-xs text-red-600 font-semibold mt-1 bg-red-50 px-3 py-1 rounded-full inline-block">Super Administrator</p>
            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Member since</span><span className="font-medium">2022</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last login</span><span className="font-medium">Jun 10, 2026</span></div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3"><Key className="w-4 h-4 text-red-600" /><h4 className="font-semibold text-sm text-red-700">Security Status</h4></div>
            {['2FA Enabled', 'Strong password', 'Login alerts on'].map(item => (
              <div key={item} className="flex items-center gap-2 text-xs text-red-600 mb-1.5"><span>✓</span>{item}</div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-lg">Account Details</h3>
            {!editing ? (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="text-xs border-primary/30 text-primary"><Edit3 className="w-3.5 h-3.5 mr-1" /> Edit</Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="text-xs"><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
                <Button size="sm" onClick={handleSave} className="gradient-primary text-white border-0 text-xs"><Save className="w-3.5 h-3.5 mr-1" /> Save</Button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Full Name', key: 'name' }, { label: 'Email', key: 'email', disabled: true },
              { label: 'Role', key: 'role', disabled: true }, { label: 'Department', key: 'department' },
              { label: 'Phone', key: 'phone' },
            ].map(f => (
              <div key={f.key} className={f.key === 'phone' ? 'col-span-2' : ''}>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">{f.label}</Label>
                <Input value={form[f.key as keyof typeof form]} disabled={!editing || f.disabled}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className={`h-10 text-sm ${f.disabled ? 'bg-muted/50' : ''}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;

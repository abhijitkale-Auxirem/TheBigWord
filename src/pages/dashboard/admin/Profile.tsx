import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Shield, Camera, Edit3, Save, X, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AdminProfile: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    roleLabel: 'Super Administrator',
    department: user?.department || 'Platform Operations',
    phone: user?.phone || '+44 20 1234 5678',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        roleLabel: 'Super Administrator',
        department: user.department || 'Platform Operations',
        phone: user.phone || '+44 20 1234 5678',
      });
    }
  }, [user]);

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Name cannot be empty.'); return; }
    updateUser({
      name: form.name.trim(),
      department: form.department,
      phone: form.phone,
    });
    setEditing(false);
    toast.success('Admin profile updated and synced globally.');
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        roleLabel: 'Super Administrator',
        department: user.department || 'Platform Operations',
        phone: user.phone || '+44 20 1234 5678',
      });
    }
    setEditing(false);
  };

  return (
    <DashboardLayout title="Admin Profile" subtitle="Your administrator account and security settings">
      <div className="max-w-3xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg">{form.name || user?.name}</h3>
            <p className="text-xs text-red-600 font-semibold mt-1 bg-red-50 px-3 py-1 rounded-full inline-block">Super Administrator</p>
            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span className="font-medium">{form.department}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Member since</span><span className="font-medium">{user?.joinDate?.split('-')[0] || '2022'}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last login</span><span className="font-medium">Jun 11, 2026</span></div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Key className="w-4 h-4 text-red-600" />
              <h4 className="font-semibold text-sm text-red-700">Security Status</h4>
            </div>
            {['2FA Enabled', 'Strong password', 'Login alerts on'].map(item => (
              <div key={item} className="flex items-center gap-2 text-xs text-red-600 mb-1.5"><span>✓</span>{item}</div>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-lg">Account Details</h3>
            {!editing ? (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="text-xs border-primary/30 text-primary">
                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleCancel} className="text-xs"><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
                <Button size="sm" onClick={handleSave} className="gradient-primary text-white border-0 text-xs"><Save className="w-3.5 h-3.5 mr-1" /> Save</Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Full Name</Label>
              <Input value={form.name} disabled={!editing} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="h-10 text-sm" />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Email</Label>
              <Input value={form.email} disabled className="h-10 text-sm bg-muted/50" />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Role</Label>
              <Input value={form.roleLabel} disabled className="h-10 text-sm bg-muted/50" />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Department</Label>
              <Input value={form.department} disabled={!editing} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} className="h-10 text-sm" />
            </div>
            <div className="col-span-2">
              <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Phone</Label>
              <Input value={form.phone} disabled={!editing} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="h-10 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;

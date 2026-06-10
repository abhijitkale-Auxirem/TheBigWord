import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Shield, Bell, Globe, Database, Save, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    maintenanceMode: false, newUserRegistration: true, tutorAutoApproval: false,
    emailVerification: true, contentModAlerts: true, systemAlerts: true, revenueReports: true,
    defaultLang: 'English', timezone: 'UTC', maxUploadMB: '50',
    dataBackup: 'Daily', logRetention: '90 days',
  });
  const toggle = (key: keyof typeof settings) => setSettings(p => ({ ...p, [key]: !p[key] }));
  const Toggle: React.FC<{ active: boolean; onToggle: () => void }> = ({ active, onToggle }) => (
    <button onClick={onToggle} className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${active ? 'gradient-primary' : 'bg-muted'}`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${active ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
  const Row: React.FC<{ label: string; desc?: string; children: React.ReactNode }> = ({ label, desc, children }) => (
    <div className="flex items-center justify-between py-2.5">
      <div><p className="text-sm font-medium">{label}</p>{desc && <p className="text-xs text-muted-foreground">{desc}</p>}</div>
      {children}
    </div>
  );
  const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl border border-border p-5 mb-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">{icon}<h3 className="font-semibold">{title}</h3></div>
      {children}
    </div>
  );
  const handleSave = async () => { setSaving(true); await new Promise(r => setTimeout(r, 900)); setSaving(false); toast.success('System settings saved!'); };

  return (
    <DashboardLayout title="System Settings" subtitle="Global platform configuration and administrative controls">
      <div className="max-w-2xl">
        {settings.maintenanceMode && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3 animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">Maintenance mode is ON — users cannot access the platform.</p>
          </div>
        )}

        <Section title="Platform Control" icon={<Shield className="w-4 h-4 text-red-500" />}>
          <Row label="Maintenance Mode" desc="Take the platform offline for maintenance">
            <Toggle active={settings.maintenanceMode} onToggle={() => toggle('maintenanceMode')} />
          </Row>
          <Row label="User Registration" desc="Allow new users to sign up"><Toggle active={settings.newUserRegistration} onToggle={() => toggle('newUserRegistration')} /></Row>
          <Row label="Tutor Auto-Approval" desc="Auto-approve new tutor applications"><Toggle active={settings.tutorAutoApproval} onToggle={() => toggle('tutorAutoApproval')} /></Row>
          <Row label="Email Verification" desc="Require email verification on signup"><Toggle active={settings.emailVerification} onToggle={() => toggle('emailVerification')} /></Row>
        </Section>

        <Section title="Notifications" icon={<Bell className="w-4 h-4 text-blue-500" />}>
          <Row label="Content Moderation Alerts"><Toggle active={settings.contentModAlerts} onToggle={() => toggle('contentModAlerts')} /></Row>
          <Row label="System Health Alerts"><Toggle active={settings.systemAlerts} onToggle={() => toggle('systemAlerts')} /></Row>
          <Row label="Weekly Revenue Reports"><Toggle active={settings.revenueReports} onToggle={() => toggle('revenueReports')} /></Row>
        </Section>

        <Section title="System Configuration" icon={<Database className="w-4 h-4 text-purple-500" />}>
          <Row label="Data Backup Frequency">
            <select value={settings.dataBackup} onChange={e => setSettings(p => ({ ...p, dataBackup: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>Daily</option><option>Every 6 hours</option><option>Hourly</option>
            </select>
          </Row>
          <Row label="Log Retention">
            <select value={settings.logRetention} onChange={e => setSettings(p => ({ ...p, logRetention: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>30 days</option><option>90 days</option><option>1 year</option>
            </select>
          </Row>
          <Row label="Default Platform Language">
            <select value={settings.defaultLang} onChange={e => setSettings(p => ({ ...p, defaultLang: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>English</option><option>Spanish</option><option>French</option>
            </select>
          </Row>
        </Section>

        <button onClick={handleSave} disabled={saving}
          className="w-full gradient-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save System Settings'}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;

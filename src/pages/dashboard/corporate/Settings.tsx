import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Bell, Users, Shield, Globe, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthContext } from '@/contexts/AuthContext';

const CorporateSettings: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    adminAlerts: true, progressReports: true, weeklyDigest: false,
    ssoEnabled: false, twoFARequired: true, dataRetention: '2 years',
    currency: 'USD', invoiceEmail: 'billing@company.com',
    teamAccess: 'Admin Only', defaultLanguage: 'English',
  });

  useEffect(() => {
    if (user?.settings) {
      setSettings(prev => ({
        ...prev,
        ...user.settings
      }));
    }
  }, [user]);

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
  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({
      settings
    });
    setSaving(false);
    toast.success('Settings saved successfully!');
  };

  return (
    <DashboardLayout title="Corporate Settings" subtitle="Team access control, notifications, and billing configuration">
      <div className="max-w-2xl">
        <Section title="Notifications" icon={<Bell className="w-4 h-4 text-blue-500" />}>
          <Row label="Admin Alerts" desc="Critical platform notifications"><Toggle active={settings.adminAlerts} onToggle={() => toggle('adminAlerts')} /></Row>
          <Row label="Progress Reports" desc="Monthly learning progress reports"><Toggle active={settings.progressReports} onToggle={() => toggle('progressReports')} /></Row>
          <Row label="Weekly Digest" desc="Summary of team activity"><Toggle active={settings.weeklyDigest} onToggle={() => toggle('weeklyDigest')} /></Row>
        </Section>
        <Section title="Security & Access" icon={<Shield className="w-4 h-4 text-red-500" />}>
          <Row label="Single Sign-On (SSO)" desc="Enable SAML-based SSO"><Toggle active={settings.ssoEnabled} onToggle={() => toggle('ssoEnabled')} /></Row>
          <Row label="Require 2FA" desc="Mandatory for all employees"><Toggle active={settings.twoFARequired} onToggle={() => toggle('twoFARequired')} /></Row>
          <Row label="Team Access Control">
            <select value={settings.teamAccess} onChange={e => setSettings(p => ({ ...p, teamAccess: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>Admin Only</option><option>Manager + Admin</option><option>All Members</option>
            </select>
          </Row>
        </Section>
        <Section title="Billing & Data" icon={<Globe className="w-4 h-4 text-emerald-500" />}>
          <Row label="Billing Currency">
            <select value={settings.currency} onChange={e => setSettings(p => ({ ...p, currency: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>USD</option><option>EUR</option><option>GBP</option>
            </select>
          </Row>
          <Row label="Data Retention">
            <select value={settings.dataRetention} onChange={e => setSettings(p => ({ ...p, dataRetention: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>1 year</option><option>2 years</option><option>5 years</option><option>Indefinite</option>
            </select>
          </Row>
        </Section>
        <button onClick={handleSave} disabled={saving}
          className="w-full gradient-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CorporateSettings;

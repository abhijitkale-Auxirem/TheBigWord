import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Bell, Globe, CreditCard, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthContext } from '@/contexts/AuthContext';

const TranslatorSettings: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifs: true, newProjects: true, deadlineAlerts: true,
    currency: 'USD', payoutMethod: 'Bank Transfer', invoiceAuto: true,
    defaultLangPair: 'English → French', availableForWork: true,
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
    <DashboardLayout title="Translator Settings" subtitle="Payout preferences, notifications, and availability">
      <div className="max-w-2xl">
        <Section title="Notifications" icon={<Bell className="w-4 h-4 text-blue-500" />}>
          <Row label="Email Notifications"><Toggle active={settings.emailNotifs} onToggle={() => toggle('emailNotifs')} /></Row>
          <Row label="New Project Alerts" desc="Get notified about new matching projects"><Toggle active={settings.newProjects} onToggle={() => toggle('newProjects')} /></Row>
          <Row label="Deadline Reminders"><Toggle active={settings.deadlineAlerts} onToggle={() => toggle('deadlineAlerts')} /></Row>
          <Row label="Available for Work" desc="Show your profile to clients"><Toggle active={settings.availableForWork} onToggle={() => toggle('availableForWork')} /></Row>
        </Section>
        <Section title="Payout & Billing" icon={<CreditCard className="w-4 h-4 text-yellow-500" />}>
          <Row label="Payout Method">
            <select value={settings.payoutMethod} onChange={e => setSettings(p => ({ ...p, payoutMethod: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>Bank Transfer</option><option>PayPal</option><option>Wise</option>
            </select>
          </Row>
          <Row label="Currency">
            <select value={settings.currency} onChange={e => setSettings(p => ({ ...p, currency: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none bg-white">
              <option>USD</option><option>EUR</option><option>GBP</option>
            </select>
          </Row>
          <Row label="Auto-generate Invoices"><Toggle active={settings.invoiceAuto} onToggle={() => toggle('invoiceAuto')} /></Row>
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
export default TranslatorSettings;

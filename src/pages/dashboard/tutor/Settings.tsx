import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Bell, Globe, Lock, CreditCard, Eye, EyeOff, Moon, Sun, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthContext } from '@/contexts/AuthContext';

const TutorSettings: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifs: true, smsNotifs: false, bookingAlerts: true,
    darkMode: false, language: 'English', timezone: 'GMT+0 London',
    twoFA: false, publicProfile: true,
    payoutMethod: 'Bank Transfer', payoutDay: 'Weekly',
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

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({
      settings
    });
    setSaving(false);
    toast.success('Settings saved successfully!');
  };

  const Toggle: React.FC<{ active: boolean; onToggle: () => void }> = ({ active, onToggle }) => (
    <button onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${active ? 'gradient-primary' : 'bg-muted'}`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${active ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );

  const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl border border-border p-5 mb-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        {icon}<h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );

  const Row: React.FC<{ label: string; desc?: string; children: React.ReactNode }> = ({ label, desc, children }) => (
    <div className="flex items-center justify-between py-2.5">
      <div><p className="text-sm font-medium">{label}</p>{desc && <p className="text-xs text-muted-foreground">{desc}</p>}</div>
      {children}
    </div>
  );

  return (
    <DashboardLayout title="Tutor Settings" subtitle="Manage notifications, availability, and payout preferences">
      <div className="max-w-2xl">
        <Section title="Notifications" icon={<Bell className="w-4 h-4 text-blue-500" />}>
          <Row label="Email Notifications" desc="New bookings and messages"><Toggle active={settings.emailNotifs} onToggle={() => toggle('emailNotifs')} /></Row>
          <Row label="SMS Notifications" desc="Urgent alerts via text"><Toggle active={settings.smsNotifs} onToggle={() => toggle('smsNotifs')} /></Row>
          <Row label="Booking Alerts" desc="Instant booking confirmations"><Toggle active={settings.bookingAlerts} onToggle={() => toggle('bookingAlerts')} /></Row>
        </Section>

        <Section title="Profile Visibility" icon={<Eye className="w-4 h-4 text-emerald-500" />}>
          <Row label="Public Profile" desc="Allow students to find and book you"><Toggle active={settings.publicProfile} onToggle={() => toggle('publicProfile')} /></Row>
          <Row label="Two-Factor Auth" desc="Extra security for your account"><Toggle active={settings.twoFA} onToggle={() => toggle('twoFA')} /></Row>
        </Section>

        <Section title="Payout Settings" icon={<CreditCard className="w-4 h-4 text-yellow-500" />}>
          <Row label="Payout Method">
            <select value={settings.payoutMethod} onChange={e => setSettings(p => ({ ...p, payoutMethod: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              <option>Bank Transfer</option><option>PayPal</option><option>Wise</option>
            </select>
          </Row>
          <Row label="Payout Frequency">
            <select value={settings.payoutDay} onChange={e => setSettings(p => ({ ...p, payoutDay: e.target.value }))}
              className="border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              <option>Weekly</option><option>Bi-weekly</option><option>Monthly</option>
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

export default TutorSettings;

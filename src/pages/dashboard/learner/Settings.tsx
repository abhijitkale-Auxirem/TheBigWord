import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Settings, Bell, Globe, Shield, Moon, Sun, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuthContext } from '@/contexts/AuthContext';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${checked ? 'gradient-primary' : 'bg-muted'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const LearnerSettings: React.FC = () => {
  const { user } = useAuthContext();
  const [notifs, setNotifs] = useState({ email: true, push: true, reminders: true, weekly: false, community: true });
  const [prefs, setPrefs] = useState({ darkMode: false, soundFx: true, autoPlay: false, publicProfile: true });
  const [privacy, setPrivacy] = useState({ showProgress: true, showBadges: true, analytics: true });

  const handleSave = () => toast.success('Settings saved successfully!');

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences">
      <div className="max-w-2xl space-y-5">
        {/* Notification Settings */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-blue-500" />
            <h3 className="font-heading font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive learning reminders via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Browser and app push alerts' },
              { key: 'reminders', label: 'Daily Reminders', desc: 'Stay on track with daily learning goals' },
              { key: 'weekly', label: 'Weekly Report', desc: 'Get a summary of your weekly progress' },
              { key: 'community', label: 'Community Updates', desc: 'Replies, challenges, and language exchanges' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <Toggle
                  checked={notifs[item.key as keyof typeof notifs]}
                  onChange={() => setNotifs(p => ({ ...p, [item.key]: !p[item.key as keyof typeof notifs] }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Language & Display */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-emerald-500" />
            <h3 className="font-heading font-semibold">Language & Display</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Interface Language</div>
                <div className="text-xs text-muted-foreground">Platform display language</div>
              </div>
              <select className="text-sm border border-input rounded-lg px-3 py-1.5 bg-white outline-none focus:ring-2 focus:ring-primary/20">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            {[
              { key: 'darkMode', label: 'Dark Mode', desc: 'Switch to dark theme' },
              { key: 'soundFx', label: 'Sound Effects', desc: 'Vocabulary & quiz feedback sounds' },
              { key: 'autoPlay', label: 'Auto-play Audio', desc: 'Auto-play word pronunciations' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <Toggle
                  checked={prefs[item.key as keyof typeof prefs]}
                  onChange={() => setPrefs(p => ({ ...p, [item.key]: !p[item.key as keyof typeof prefs] }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-purple-500" />
            <h3 className="font-heading font-semibold">Privacy</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'showProgress', label: 'Public Progress', desc: 'Let others see your learning progress' },
              { key: 'showBadges', label: 'Show Badges', desc: 'Display earned certifications publicly' },
              { key: 'analytics', label: 'Usage Analytics', desc: 'Help improve TheBigWord with anonymous data' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <Toggle
                  checked={privacy[item.key as keyof typeof privacy]}
                  onChange={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key as keyof typeof privacy] }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
          <h3 className="font-heading font-semibold text-red-700 mb-4">Danger Zone</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Delete Account</div>
                <div className="text-xs text-muted-foreground">Permanently remove your account and all data</div>
              </div>
              <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 text-xs">
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        <Button className="gradient-primary text-white border-0 font-semibold px-8" onClick={handleSave}>
          Save All Settings
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default LearnerSettings;

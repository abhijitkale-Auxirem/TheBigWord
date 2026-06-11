import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Shield, Settings, Info, Check, Save } from 'lucide-react';
import { toast } from 'sonner';

const CookieSettings: React.FC = () => {
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: true,
    personalization: false,
    marketing: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Your cookie preferences have been successfully updated!');
    }, 800);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Cookie Settings</h1>
        <p className="text-blue-100/80 text-sm">Manage your privacy and data sharing options</p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-xl shadow-slate-100/30 space-y-10">
          
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary animate-pulse-slow" /> Cookie Preference Center
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We use cookies to enhance your experience, track site engagement metrics, and show personalized content. You can manage your preferences below. Necessary cookies cannot be disabled as they are required for basic platform functions.
            </p>
          </div>

          {/* Preferences list */}
          <div className="space-y-6">
            
            {/* Necessary */}
            <div className="flex items-start justify-between gap-6 p-6 rounded-2xl border border-border bg-slate-50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-base text-slate-800">Strictly Necessary Cookies</h3>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full uppercase">Always Active</span>
                </div>
                <p className="text-xs text-muted-foreground leading-normal">
                  Required for user login sessions, security protocols, routing requests, and language setting caches. Without these, the site cannot function properly.
                </p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 cursor-not-allowed flex-shrink-0">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-6 p-6 rounded-2xl border border-border hover:border-slate-300 transition-colors">
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-slate-800">Analytics & Performance Cookies</h3>
                <p className="text-xs text-muted-foreground leading-normal">
                  These collect anonymous information about how visitors interact with lessons, pages, and tools. They help us pinpoint issues and measure load speed metrics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('analytics')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  preferences.analytics ? 'bg-primary' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Personalization */}
            <div className="flex items-start justify-between gap-6 p-6 rounded-2xl border border-border hover:border-slate-300 transition-colors">
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-slate-800">Personalization & Functionality Cookies</h3>
                <p className="text-xs text-muted-foreground leading-normal">
                  Allow our platform to remember your previous dashboard selections, tutor filters, and voice coach speed levels to offer a streamlined return experience.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('personalization')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  preferences.personalization ? 'bg-primary' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.personalization ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-6 p-6 rounded-2xl border border-border hover:border-slate-300 transition-colors">
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-slate-800">Targeting & Marketing Cookies</h3>
                <p className="text-xs text-muted-foreground leading-normal">
                  Used by our marketing partners to deliver advertisements aligned with your Interests. Toggling this off stops third-party tracking across other websites.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('marketing')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  preferences.marketing ? 'bg-primary' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400" />
              <span>Preferences are stored locally on your current device.</span>
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 gradient-primary text-white font-bold px-6 py-3 rounded-xl hover:opacity-95 transition-opacity shadow-lg w-full sm:w-auto justify-center"
            >
              {isSaving ? (
                <span>Saving Preferences...</span>
              ) : (
                <>
                  Save My Choices <Save className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
};

export default CookieSettings;

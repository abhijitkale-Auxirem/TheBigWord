import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { User, Camera, Globe, Edit3, Save, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DOMAINS = ['Legal', 'Medical', 'Technical', 'Marketing', 'Financial', 'Academic', 'Literary', 'IT/Software'];
const CERT_LEVELS = ['ATA Certified', 'ISO 17100', 'CIOL Member', 'SDL Trados Certified', 'MemoQ Certified'];

const TranslatorProfile: React.FC = () => {
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    langPairs: ['English → French', 'English → Italian'],
    domains: ['Legal', 'Marketing'],
    certs: ['ATA Certified'],
    rate: '0.12',
    bio: 'Professional translator with 8+ years of experience in legal and marketing translation. Native Italian speaker with full English proficiency.',
    yearsExp: '8',
  });

  const handleSave = () => { setEditing(false); toast.success('Profile updated!'); };
  const toggleDomain = (d: string) => {
    if (!editing) return;
    setForm(p => ({ ...p, domains: p.domains.includes(d) ? p.domains.filter(x => x !== d) : [...p.domains, d] }));
  };

  return (
    <DashboardLayout title="Translator Profile" subtitle="Your professional translation profile">
      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-3xl mx-auto">{user?.name?.charAt(0)}</div>
              <button className="absolute bottom-0 right-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white shadow-lg"><Camera className="w-4 h-4" /></button>
            </div>
            <h3 className="font-heading font-bold text-lg">{user?.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Professional Translator · {form.yearsExp} years exp.</p>
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
              {[{ l: 'Projects', v: '47' }, { l: 'Words', v: '280K' }, { l: 'Languages', v: '3' }, { l: 'Rating', v: '4.9★' }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="font-heading font-bold text-lg">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h4 className="font-semibold text-sm mb-3">Certifications</h4>
            {form.certs.map(c => (
              <div key={c} className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl mb-2 font-medium">
                ✓ {c}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-lg">Profile Details</h3>
            {!editing ? (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="text-xs border-primary/30 text-primary"><Edit3 className="w-3.5 h-3.5 mr-1" /> Edit</Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="text-xs"><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
                <Button size="sm" onClick={handleSave} className="gradient-primary text-white border-0 text-xs"><Save className="w-3.5 h-3.5 mr-1" /> Save</Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Full Name</Label>
                <Input value={form.name} disabled={!editing} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="h-10 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Rate ($/word)</Label>
                <Input value={form.rate} disabled={!editing} onChange={e => setForm(p => ({ ...p, rate: e.target.value }))} className="h-10 text-sm" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium mb-2 block uppercase tracking-wide text-muted-foreground">Specialization Domains</Label>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map(d => (
                  <button key={d} onClick={() => toggleDomain(d)} disabled={!editing}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${form.domains.includes(d) ? 'gradient-primary text-white shadow' : 'bg-brand-surface text-muted-foreground border border-border hover:border-primary/30'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Bio</Label>
              <textarea value={form.bio} disabled={!editing} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3}
                className="w-full border border-input rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50 resize-none" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TranslatorProfile;

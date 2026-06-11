import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { User, Camera, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DOMAINS = ['Legal', 'Medical', 'Technical', 'Marketing', 'Financial', 'Academic', 'Literary', 'IT/Software'];
const CERT_OPTIONS = ['ATA Certified', 'ISO 17100', 'CIOL Member', 'SDL Trados Certified', 'MemoQ Certified'];

const TranslatorProfile: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    langPairs: user?.langPairs || ['English → French', 'English → Italian'],
    domains: user?.domains || ['Legal', 'Marketing'],
    translatorCerts: user?.translatorCerts || ['ATA Certified'],
    rate: user?.rate || '0.12',
    bio: user?.bio || 'Professional translator with 8+ years of experience in legal and marketing translation.',
    yearsExp: user?.yearsExp || '8',
    avatarUrl: user?.avatarUrl || '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        langPairs: user.langPairs || ['English → French', 'English → Italian'],
        domains: user.domains || ['Legal', 'Marketing'],
        translatorCerts: user.translatorCerts || ['ATA Certified'],
        rate: user.rate || '0.12',
        bio: user.bio || 'Professional translator with 8+ years of experience in legal and marketing translation.',
        yearsExp: user.yearsExp || '8',
        avatarUrl: user.avatarUrl || '',
      });
    }
  }, [user]);

  const toggleDomain = (d: string) => {
    if (!editing) return;
    setForm(p => ({ ...p, domains: p.domains.includes(d) ? p.domains.filter(x => x !== d) : [...p.domains, d] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file.'); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error('Image must be under 2MB.'); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm(p => ({ ...p, avatarUrl: base64 }));
      if (!editing) {
        updateUser({ avatarUrl: base64 });
        toast.success('Profile photo updated.');
      } else {
        toast.info('Avatar staged. Save profile to confirm.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Name cannot be empty.'); return; }
    updateUser({
      name: form.name.trim(),
      langPairs: form.langPairs,
      domains: form.domains,
      translatorCerts: form.translatorCerts,
      rate: form.rate,
      bio: form.bio.trim(),
      yearsExp: form.yearsExp,
      avatarUrl: form.avatarUrl,
    });
    setEditing(false);
    toast.success('Translator profile updated and synced globally.');
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        langPairs: user.langPairs || ['English → French', 'English → Italian'],
        domains: user.domains || ['Legal', 'Marketing'],
        translatorCerts: user.translatorCerts || ['ATA Certified'],
        rate: user.rate || '0.12',
        bio: user.bio || 'Professional translator with 8+ years of experience in legal and marketing translation.',
        yearsExp: user.yearsExp || '8',
        avatarUrl: user.avatarUrl || '',
      });
    }
    setEditing(false);
  };

  return (
    <DashboardLayout title="Translator Profile" subtitle="Your professional translation profile">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png,image/jpeg,image/webp" className="hidden" />

      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Identity Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-3xl mx-auto overflow-hidden cursor-pointer"
              >
                {form.avatarUrl
                  ? <img src={form.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  : (user?.name?.charAt(0) || <User className="w-8 h-8" />)
                }
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-heading font-bold text-lg">{form.name || user?.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Professional Translator · {form.yearsExp} yrs exp.</p>
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
              {[{ l: 'Projects', v: '47' }, { l: 'Words', v: '280K' }, { l: 'Languages', v: form.langPairs.length.toString() }, { l: 'Rating', v: '4.9★' }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="font-heading font-bold text-lg">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h4 className="font-semibold text-sm mb-3">Certifications</h4>
            {form.translatorCerts.map(c => (
              <div key={c} className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl mb-2 font-medium">
                ✓ {c}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-lg">Profile Details</h3>
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
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Years of Experience</Label>
                <Input value={form.yearsExp} disabled={!editing} onChange={e => setForm(p => ({ ...p, yearsExp: e.target.value }))} className="h-10 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Email</Label>
                <Input value={form.email} disabled className="h-10 text-sm bg-muted/50" />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium mb-2 block uppercase tracking-wide text-muted-foreground">Specialization Domains</Label>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map(d => (
                  <button key={d} onClick={() => toggleDomain(d)} disabled={!editing}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${form.domains.includes(d) ? 'gradient-primary text-white shadow' : 'bg-brand-surface text-muted-foreground border border-border hover:border-primary/30 disabled:opacity-60'}`}>
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

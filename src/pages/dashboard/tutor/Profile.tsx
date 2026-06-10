import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { User, Camera, Globe, Star, Edit3, Save, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Arabic', 'Hindi', 'Japanese', 'Portuguese', 'Italian'];
const SPECIALTIES = ['Conversational', 'Business', 'IELTS/TOEFL', 'Grammar', 'Pronunciation', 'Kids', 'Academic', 'Travel'];

const TutorProfile: React.FC = () => {
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    headline: 'Certified Language Tutor | 6+ Years Experience',
    languages: ['English', 'Spanish'],
    specialties: ['Business', 'IELTS/TOEFL'],
    rate: '35', bio: 'Passionate about helping students achieve fluency through personalized, conversational teaching methods. My lessons are structured yet flexible to match each learner\'s unique goals.',
    education: "MA Applied Linguistics, University of London\nBA Modern Languages, University of Madrid",
    certifications: 'CELTA Certified, Delta Module 1',
  });

  const handleSave = () => { setEditing(false); toast.success('Profile updated!'); };

  const toggleItem = (list: string[], item: string, key: 'languages' | 'specialties') => {
    const updated = list.includes(item) ? list.filter(l => l !== item) : [...list, item];
    setForm(p => ({ ...p, [key]: updated }));
  };

  return (
    <DashboardLayout title="Tutor Profile" subtitle="Your professional teaching profile">
      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-3xl mx-auto">{user?.name?.charAt(0)}</div>
              <button className="absolute bottom-0 right-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-heading font-bold text-lg">{user?.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{form.headline}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />)}
              <span className="text-sm font-semibold ml-1">4.8</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
              {[{ l: 'Students', v: '248' }, { l: 'Sessions', v: '890' }, { l: 'Languages', v: '2' }, { l: 'Rating', v: '4.8★' }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="font-heading font-bold text-lg">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border p-6">
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
                  <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Hourly Rate (USD)</Label>
                  <Input value={form.rate} disabled={!editing} onChange={e => setForm(p => ({ ...p, rate: e.target.value }))} className="h-10 text-sm" />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium mb-2 block uppercase tracking-wide text-muted-foreground">Languages Taught</Label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(l => (
                    <button key={l} onClick={() => editing && toggleItem(form.languages, l, 'languages')} disabled={!editing}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${form.languages.includes(l) ? 'gradient-primary text-white shadow-sm' : 'bg-brand-surface text-muted-foreground border border-border hover:border-primary/30'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium mb-2 block uppercase tracking-wide text-muted-foreground">Specialties</Label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map(s => (
                    <button key={s} onClick={() => editing && toggleItem(form.specialties, s, 'specialties')} disabled={!editing}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${form.specialties.includes(s) ? 'gradient-emerald text-white shadow-sm' : 'bg-brand-surface text-muted-foreground border border-border hover:border-primary/30'}`}>
                      {s}
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
      </div>
    </DashboardLayout>
  );
};

export default TutorProfile;

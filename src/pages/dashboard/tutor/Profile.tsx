import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { User, Camera, Star, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Arabic', 'Hindi', 'Japanese', 'Portuguese', 'Italian'];
const SPECIALTIES = ['Conversational', 'Business', 'IELTS/TOEFL', 'Grammar', 'Pronunciation', 'Kids', 'Academic', 'Travel'];

interface FormState {
  name: string;
  email: string;
  headline: string;
  languages: string[];
  specialties: string[];
  rate: string;
  bio: string;
  education: string;
  certifications: string;
  avatarUrl: string;
}

const TutorProfile: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [editing, setEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    name: user?.name || '',
    email: user?.email || '',
    headline: user?.headline || 'Certified Language Tutor | 6+ Years Experience',
    languages: user?.languages || ['English', 'Spanish'],
    specialties: user?.specialties || ['Business', 'IELTS/TOEFL'],
    rate: user?.rate || '35',
    bio: user?.bio || "Passionate about helping students achieve fluency through personalized, conversational teaching methods. My lessons are structured yet flexible to match each learner's unique goals.",
    education: user?.education || "MA Applied Linguistics, University of London\nBA Modern Languages, University of Madrid",
    certifications: user?.certifications || 'CELTA Certified, Delta Module 1',
    avatarUrl: user?.avatarUrl || '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        headline: user.headline || 'Certified Language Tutor | 6+ Years Experience',
        languages: user.languages || ['English', 'Spanish'],
        specialties: user.specialties || ['Business', 'IELTS/TOEFL'],
        rate: user.rate || '35',
        bio: user.bio || "Passionate about helping students achieve fluency through personalized, conversational teaching methods. My lessons are structured yet flexible to match each learner's unique goals.",
        education: user.education || "MA Applied Linguistics, University of London\nBA Modern Languages, University of Madrid",
        certifications: user.certifications || 'CELTA Certified, Delta Module 1',
        avatarUrl: user.avatarUrl || '',
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleItem = (list: string[], item: string, key: 'languages' | 'specialties') => {
    const updated = list.includes(item) ? list.filter(l => l !== item) : [...list, item];
    setForm(p => ({ ...p, [key]: updated }));
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type: Please select an image file (PNG, JPEG, WebP).');
      return;
    }

    // Enforce 2MB restriction boundary
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File rejected: Image payload must sit below the 2MB boundary.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      // Update form state directly with image preview data string
      setForm(prev => ({ ...prev, avatarUrl: base64String }));
      
      // Auto-save avatar directly or alert user to save changes
      if (!editing) {
        updateUser({ ...user, avatarUrl: base64String });
        toast.success('Profile avatar snapshot modified successfully.');
      } else {
        toast.info('Avatar staged. Commit profile modifications to confirm permanent save.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error('Validation failure: Full Name identifier parameter cannot be empty.');
      return;
    }

    updateUser({
      name: form.name.trim(),
      headline: form.headline.trim(),
      languages: form.languages,
      specialties: form.specialties,
      rate: form.rate,
      bio: form.bio.trim(),
      education: form.education,
      certifications: form.certifications,
      avatarUrl: form.avatarUrl,
    });
    
    setEditing(false);
    toast.success('System record updated: Instructor registry variables saved.');
  };

  return (
    <DashboardLayout title="Instructor Core Identity" subtitle="Configure and refine public profile telemetry and teaching criteria">
      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Hidden File System Input Node */}
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className="hidden"
        />

        {/* Left Side Metadata Column */}
        <div className="space-y-4 select-none">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
            <div className="relative inline-block mb-4">
              <div 
                onClick={handleTriggerFileInput}
                className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shadow-inner cursor-pointer group"
                title="Upload image from system"
              >
                {form.avatarUrl ? (
                  <img 
                    src={form.avatarUrl} 
                    alt={form.name || "Tutor avatar"} 
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-100 font-bold text-3xl">
                    {form.name ? form.name.charAt(0).toUpperCase() : <User className="w-8 h-8 text-slate-400" />}
                  </div>
                )}
                
                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <button 
                onClick={handleTriggerFileInput}
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-white shadow hover:bg-slate-800 transition-all cursor-pointer"
                title="Upload image from system"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="font-bold text-base text-slate-800 tracking-tight">{form.name || 'Anonymous Instructor'}</h3>
            <p className="text-xs text-slate-400 font-medium px-2 mt-1 leading-normal">{form.headline}</p>
            
            <div className="flex items-center justify-center gap-0.5 mt-2.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-3.5 h-3.5 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
              ))}
              <span className="text-xs font-bold text-slate-700 ml-1">4.8 Metrics Index</span>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 font-semibold">
              {[
                { l: 'Active Learners', v: '248' }, 
                { l: 'Sessions Closed', v: '890' }, 
                { l: 'Language Hubs', v: form.languages.length.toString() }, 
                { l: 'Mean Evaluation', v: '4.8★' }
              ].map(s => (
                <div key={s.l} className="text-center p-2 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="font-mono font-black text-slate-800 text-base">{s.v}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Configuration Deck Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5 select-none">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Profile Registry Matrix</h3>
              {!editing ? (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setEditing(true)} 
                  className="text-[11px] font-bold h-7 px-2.5 border-slate-200 bg-white text-slate-600 rounded-lg shadow-sm hover:bg-slate-50"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Modify Parameters
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setEditing(false)} 
                    className="text-[11px] font-bold h-7 px-2.5 border-slate-200 bg-white text-slate-500 rounded-lg hover:bg-slate-50"
                  >
                    <X className="w-3.5 h-3.5 mr-1.5" /> Terminate
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSave} 
                    className="text-[11px] font-bold h-7 px-3 bg-slate-900 border border-slate-800 text-white rounded-lg shadow-sm hover:bg-slate-800"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" /> Commit State
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Full Instructor Identifier</Label>
                  <Input 
                    value={form.name} 
                    disabled={!editing} 
                    onChange={e => handleInputChange('name', e.target.value)} 
                    className="h-9 text-xs border-slate-200 focus-visible:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg" 
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Hourly Rate Index (USD / Hr)</Label>
                  <Input 
                    type="number"
                    value={form.rate} 
                    disabled={!editing} 
                    onChange={e => handleInputChange('rate', e.target.value)} 
                    className="h-9 text-xs font-mono border-slate-200 focus-visible:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Professional Summary Header</Label>
                <Input 
                  value={form.headline} 
                  disabled={!editing} 
                  onChange={e => handleInputChange('headline', e.target.value)} 
                  className="h-9 text-xs border-slate-200 focus-visible:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg" 
                />
              </div>

              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Linguistic Coverage Array (Languages Taught)</Label>
                <div className="flex flex-wrap gap-1.5">
                  {LANGUAGES.map(l => {
                    const isSelected = form.languages.includes(l);
                    return (
                      <button 
                        key={l} 
                        type="button"
                        disabled={!editing}
                        onClick={() => toggleItem(form.languages, l, 'languages')} 
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          isSelected 
                            ? 'bg-slate-900 border-slate-800 text-white shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 disabled:opacity-60 disabled:hover:border-slate-200'
                        }`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Instructional Domain Focus (Specialties)</Label>
                <div className="flex flex-wrap gap-1.5">
                  {SPECIALTIES.map(s => {
                    const isSelected = form.specialties.includes(s);
                    return (
                      <button 
                        key={s} 
                        type="button"
                        disabled={!editing}
                        onClick={() => toggleItem(form.specialties, s, 'specialties')} 
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          isSelected 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-extrabold shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 disabled:opacity-60 disabled:hover:border-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Academic Timeline History</Label>
                  <textarea 
                    value={form.education} 
                    disabled={!editing} 
                    onChange={e => handleInputChange('education', e.target.value)}
                    rows={3}
                    className="w-full border border-slate-200 focus:border-slate-400 rounded-xl p-2.5 text-xs font-medium text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 outline-none transition-all resize-none leading-relaxed" 
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Accreditation & Credentials</Label>
                  <textarea 
                    value={form.certifications} 
                    disabled={!editing} 
                    onChange={e => handleInputChange('certifications', e.target.value)}
                    rows={3}
                    className="w-full border border-slate-200 focus:border-slate-400 rounded-xl p-2.5 text-xs font-medium text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 outline-none transition-all resize-none leading-relaxed" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Localized Biographical Dossier (Bio)</Label>
                <textarea 
                  value={form.bio} 
                  disabled={!editing} 
                  onChange={e => handleInputChange('bio', e.target.value)} 
                  rows={4}
                  className="w-full border border-slate-200 focus:border-slate-400 rounded-xl p-2.5 text-xs font-medium text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 outline-none transition-all resize-none leading-relaxed" 
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TutorProfile;
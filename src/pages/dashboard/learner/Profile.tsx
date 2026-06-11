import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  User, 
  Camera, 
  Globe, 
  Target, 
  BookOpen, 
  Edit3, 
  Save, 
  X,
  Flame,
  Award,
  CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Arabic', 'Hindi', 'Japanese', 'Portuguese', 'Italian'];
const LEVELS = ['Beginner', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced', 'Proficient'];
const GOALS = ['Career Advancement', 'Academic Study', 'Travel', 'Business Communication', 'Personal Interest', 'Exam Preparation'];

interface FormState {
  name: string;
  email: string;
  targetLanguage: string;
  nativeLanguage: string;
  proficiencyLevel: string;
  learningGoal: string;
  weeklyGoal: string;
  bio: string;
}

const LearnerProfile: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [editing, setEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState<FormState>({
    name: user?.name || '',
    email: user?.email || '',
    targetLanguage: user?.targetLanguage || 'Spanish',
    nativeLanguage: user?.nativeLanguage || 'English',
    proficiencyLevel: user?.proficiencyLevel || 'Intermediate',
    learningGoal: user?.learningGoal || 'Career Advancement',
    weeklyGoal: user?.weeklyGoal || '20',
    bio: user?.bio || 'Passionate language learner focused on Spanish and Business English.',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        targetLanguage: user.targetLanguage || 'Spanish',
        nativeLanguage: user.nativeLanguage || 'English',
        proficiencyLevel: user.proficiencyLevel || 'Intermediate',
        learningGoal: user.learningGoal || 'Career Advancement',
        weeklyGoal: user.weeklyGoal || '20',
        bio: user.bio || 'Passionate language learner focused on Spanish and Business English.',
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        targetLanguage: user.targetLanguage || 'Spanish',
        nativeLanguage: user.nativeLanguage || 'English',
        proficiencyLevel: user.proficiencyLevel || 'Intermediate',
        learningGoal: user.learningGoal || 'Career Advancement',
        weeklyGoal: user.weeklyGoal || '20',
        bio: user.bio || 'Passionate language learner focused on Spanish and Business English.',
      });
    }
    setEditing(false);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }

    updateUser({
      name: form.name.trim(),
      targetLanguage: form.targetLanguage,
      nativeLanguage: form.nativeLanguage,
      proficiencyLevel: form.proficiencyLevel,
      learningGoal: form.learningGoal,
      weeklyGoal: form.weeklyGoal,
      bio: form.bio.trim(),
    });
    setEditing(false);
    toast.success('Profile saved and synced globally.');
  };

  const handleAvatarTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File rejected: Attachment parameters must sit below 2MB boundary.');
        return;
      }
      toast.loading('Staging binary resource upload to cloud infrastructure...');
      setTimeout(() => {
        toast.dismiss();
        toast.success('Asset pipeline processed: Profile snapshot configuration revised.');
      }, 1500);
    }
  };

  return (
    <DashboardLayout title="Learner Identity Profile" subtitle="Verify tracking configurations and fine-tune metrics matrices">
      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Hidden input node for managing image storage uploads safely */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleAvatarChange} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp"
        />

        {/* Left Side Column: Avatar Identity & Progress Nodes */}
        <div className="lg:col-span-1 space-y-4 select-none">
          
          {/* Identity Core Matrix Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-100 font-bold text-2xl mx-auto shadow-inner">
                {form.name ? form.name.charAt(0).toUpperCase() : <User className="w-8 h-8 text-slate-400" />}
              </div>
              <button 
                onClick={handleAvatarTrigger}
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
                title="Modify identification asset source"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <h3 className="font-bold text-base text-slate-800 tracking-tight">{user?.name || 'Anonymous User'}</h3>
            <p className="text-xs text-slate-400 font-medium">{user?.email || 'unverified@network.local'}</p>
            <span className="inline-flex mt-2.5 text-[10px] uppercase tracking-wider bg-slate-100 border border-slate-200/60 text-slate-600 px-2.5 py-0.5 rounded-md font-bold">
              Language Candidate
            </span>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs font-semibold text-slate-500">
              {[
                { label: 'Member Framework', value: user?.joinDate || 'Jan 2024', icon: <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> },
                { label: 'Active Progression Streak', value: `${user?.streak || 0} Days`, icon: <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" /> },
                { label: 'Aggregated Token Yield', value: `${user?.points?.toLocaleString() || 0} PTS`, icon: <Award className="w-3.5 h-3.5 text-slate-400" /> },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">{item.icon} {item.label}</span>
                  <span className="text-slate-700 font-bold uppercase text-[11px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Vectors Block */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Program Progress Loops
            </h4>
            {[
              { label: 'Spanish Castilian', progress: 45, color: 'bg-slate-900' },
              { label: 'Business English Matrix', progress: 72, color: 'bg-emerald-600' },
              { label: 'Vocabulary Database logs', progress: 60, color: 'bg-slate-400' },
            ].map(item => (
              <div key={item.label} className="mb-3.5 last:mb-0">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-slate-700">{item.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 border border-slate-200/40 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Column: Profile Configuration Entry Block */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5 select-none">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" /> Infrastructure Variables Registry
              </h3>
              {!editing ? (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setEditing(true)} 
                  className="text-[11px] font-bold h-7 px-2.5 border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Modify Parameters
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCancel} 
                    className="text-[11px] font-bold h-7 px-2.5 border-slate-200 bg-white text-slate-500 hover:bg-slate-50 rounded-lg"
                  >
                    <X className="w-3.5 h-3.5 mr-1.5" /> Terminate
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSave} 
                    className="text-[11px] font-bold h-7 px-3 bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 rounded-lg shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" /> Commit State
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Full Candidate Identifier</Label>
                <Input 
                  value={form.name} 
                  disabled={!editing} 
                  onChange={e => handleInputChange('name', e.target.value)} 
                  className="h-9 text-xs border-slate-200 focus-visible:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg" 
                />
              </div>
              
              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Network Route Target (Email)</Label>
                <Input 
                  value={form.email} 
                  disabled 
                  className="h-9 text-xs bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed select-all rounded-lg" 
                />
              </div>
              
              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Linguistic Base (Native Language)</Label>
                <select
                  disabled={!editing}
                  value={form.nativeLanguage}
                  onChange={e => handleInputChange('nativeLanguage', e.target.value)}
                  className="w-full h-9 border border-slate-200 rounded-lg px-2.5 text-xs bg-white text-slate-800 outline-none focus:ring-1 focus:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 transition-all cursor-pointer"
                >
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              
              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Target Development Track</Label>
                <select
                  disabled={!editing}
                  value={form.targetLanguage}
                  onChange={e => handleInputChange('targetLanguage', e.target.value)}
                  className="w-full h-9 border border-slate-200 rounded-lg px-2.5 text-xs bg-white text-slate-800 outline-none focus:ring-1 focus:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 transition-all cursor-pointer"
                >
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              
              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Vetted Baseline Capability</Label>
                <select
                  disabled={!editing}
                  value={form.proficiencyLevel}
                  onChange={e => handleInputChange('proficiencyLevel', e.target.value)}
                  className="w-full h-9 border border-slate-200 rounded-lg px-2.5 text-xs bg-white text-slate-800 outline-none focus:ring-1 focus:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 transition-all cursor-pointer"
                >
                  {LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>
              
              <div>
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Target Mission Focus (Goal)</Label>
                <select
                  disabled={!editing}
                  value={form.learningGoal}
                  onChange={e => handleInputChange('learningGoal', e.target.value)}
                  className="w-full h-9 border border-slate-200 rounded-lg px-2.5 text-xs bg-white text-slate-800 outline-none focus:ring-1 focus:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 transition-all cursor-pointer"
                >
                  {GOALS.map(goal => <option key={goal} value={goal}>{goal}</option>)}
                </select>
              </div>
              
              <div className="sm:col-span-2">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Metadata Log Notes (About Me)</Label>
                <textarea
                  disabled={!editing}
                  value={form.bio}
                  onChange={e => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white text-slate-800 outline-none focus:ring-1 focus:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-500 transition-all resize-none font-medium leading-relaxed"
                  placeholder="Insert localized user background details..."
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default LearnerProfile;
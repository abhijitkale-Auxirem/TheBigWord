import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { User, Camera, Globe, Target, BookOpen, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Arabic', 'Hindi', 'Japanese', 'Portuguese', 'Italian'];
const LEVELS = ['Beginner', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced', 'Proficient'];
const GOALS = ['Career Advancement', 'Academic Study', 'Travel', 'Business Communication', 'Personal Interest', 'Exam Preparation'];

const LearnerProfile: React.FC = () => {
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    targetLanguage: 'Spanish',
    nativeLanguage: 'English',
    proficiencyLevel: 'Intermediate',
    learningGoal: 'Career Advancement',
    weeklyGoal: '20',
    bio: 'Passionate language learner focused on Spanish and Business English.',
  });

  const handleSave = () => {
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <DashboardLayout title="My Profile" subtitle="Manage your language learning profile">
      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-3xl mx-auto">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-heading font-bold text-lg">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Language Learner</span>

            <div className="mt-4 pt-4 border-t border-border space-y-2">
              {[
                { label: 'Member since', value: user?.joinDate || 'Jan 2024' },
                { label: 'Day streak', value: `${user?.streak || 0} days` },
                { label: 'Points earned', value: `${user?.points?.toLocaleString() || 0} pts` },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h4 className="font-semibold text-sm mb-3">Learning Progress</h4>
            {[
              { label: 'Spanish', progress: 45, color: 'gradient-primary' },
              { label: 'Business English', progress: 72, color: 'gradient-emerald' },
              { label: 'Vocabulary', progress: 60, color: 'gradient-gold' },
            ].map(item => (
              <div key={item.label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-lg">Profile Information</h3>
              {!editing ? (
                <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="text-xs border-primary/30 text-primary hover:bg-primary/5">
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="text-xs">
                    <X className="w-3.5 h-3.5 mr-1.5" /> Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="gradient-primary text-white border-0 text-xs">
                    <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wide">Full Name</Label>
                <Input value={form.name} disabled={!editing} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="h-10 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wide">Email Address</Label>
                <Input value={form.email} disabled className="h-10 text-sm bg-muted/50" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wide">Native Language</Label>
                <select
                  disabled={!editing}
                  value={form.nativeLanguage}
                  onChange={e => setForm(p => ({ ...p, nativeLanguage: e.target.value }))}
                  className="w-full h-10 border border-input rounded-lg px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50"
                >
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wide">Target Language</Label>
                <select
                  disabled={!editing}
                  value={form.targetLanguage}
                  onChange={e => setForm(p => ({ ...p, targetLanguage: e.target.value }))}
                  className="w-full h-10 border border-input rounded-lg px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50"
                >
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wide">Proficiency Level</Label>
                <select
                  disabled={!editing}
                  value={form.proficiencyLevel}
                  onChange={e => setForm(p => ({ ...p, proficiencyLevel: e.target.value }))}
                  className="w-full h-10 border border-input rounded-lg px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50"
                >
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wide">Learning Goal</Label>
                <select
                  disabled={!editing}
                  value={form.learningGoal}
                  onChange={e => setForm(p => ({ ...p, learningGoal: e.target.value }))}
                  className="w-full h-10 border border-input rounded-lg px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50"
                >
                  {GOALS.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wide">About Me</Label>
                <textarea
                  disabled={!editing}
                  value={form.bio}
                  onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                  rows={3}
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50 resize-none"
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

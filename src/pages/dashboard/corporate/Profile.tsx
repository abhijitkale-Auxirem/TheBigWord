import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Building2, Camera, Edit3, Save, X, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Legal', 'Consulting', 'Media', 'Other'];
const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '500–1000', '1000+'];

const CorporateProfile: React.FC = () => {
  const { user, updateUser } = useAuthContext();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    companyName: user?.companyName || 'Apex Solutions Ltd.',
    industry: user?.industry || 'Technology',
    size: user?.companySize || '201–500',
    country: user?.country || 'United Kingdom',
    website: user?.website || 'https://apexsolutions.com',
    contactName: user?.contactName || user?.name || 'Marcus Williams',
    contactEmail: user?.email || 'corporate@demo.com',
    description: user?.description || 'A leading technology solutions provider focused on enterprise digital transformation and workforce development.',
    vatNumber: user?.vatNumber || 'GB123456789',
  });

  useEffect(() => {
    if (user) {
      setForm({
        companyName: user.companyName || 'Apex Solutions Ltd.',
        industry: user.industry || 'Technology',
        size: user.companySize || '201–500',
        country: user.country || 'United Kingdom',
        website: user.website || 'https://apexsolutions.com',
        contactName: user.contactName || user.name || 'Marcus Williams',
        contactEmail: user.email || 'corporate@demo.com',
        description: user.description || 'A leading technology solutions provider focused on enterprise digital transformation and workforce development.',
        vatNumber: user.vatNumber || 'GB123456789',
      });
    }
  }, [user]);

  const handleSave = () => {
    if (!form.contactName.trim()) { 
      toast.error('Validation Failure: Primary contact name vector cannot be null.'); 
      return; 
    }
    
    if (updateUser) {
      updateUser({
        name: form.contactName.trim(),
        companyName: form.companyName,
        industry: form.industry,
        companySize: form.size,
        country: form.country,
        website: form.website,
        contactName: form.contactName.trim(),
        description: form.description,
        vatNumber: form.vatNumber,
      });
    }
    setEditing(false);
    toast.success('System Synchronization: Entity profile updated and broadcasted globally.');
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        companyName: user.companyName || 'Apex Solutions Ltd.',
        industry: user.industry || 'Technology',
        size: user.companySize || '201–500',
        country: user.country || 'United Kingdom',
        website: user.website || 'https://apexsolutions.com',
        contactName: user.contactName || user.name || 'Marcus Williams',
        contactEmail: user.email || 'corporate@demo.com',
        description: user.description || 'A leading technology solutions provider focused on enterprise digital transformation and workforce development.',
        vatNumber: user.vatNumber || 'GB123456789',
      });
    }
    setEditing(false);
    toast.info('Modifications discarded.');
  };

  const triggerMediaUpdate = (layer: string) => {
    toast.info(`Asset Pipeline: Initialization request dispatched for profile [${layer}] resource.`);
  };

  return (
    <DashboardLayout title="Company Profile" subtitle="Manage your corporate entity details, compliance registers, and public facing profile metadata">
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5">
          
          {/* Header Banner Block Container */}
          <div className="bg-indigo-600 h-24 relative select-none">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700/30 to-transparent pointer-events-none" />
            
          </div>

          {/* Profile Identity Overlay Area */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
              <div className="relative self-start sm:self-auto select-none">
                <div className="w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center border border-slate-150 rounded-xl">
                    <Building2 className="w-10 h-10 text-slate-800" />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => triggerMediaUpdate('Avatar Node')}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-slate-900 hover:bg-slate-800 rounded-full flex items-center justify-center text-white shadow transition-transform hover:scale-105"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0 pt-2 sm:pb-1">
                <h2 className="font-heading font-black text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                  {form.companyName}
                  <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                </h2>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                  {form.industry} · {form.country}
                </p>
              </div>

              <div className="flex-shrink-0 pt-2 sm:pt-0 select-none">
                {!editing ? (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setEditing(true)} 
                    className="h-8 text-xs font-bold border-slate-200 text-slate-700 bg-white shadow-sm flex items-center gap-1 hover:bg-slate-50"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleCancel} 
                      className="h-8 text-xs font-bold border-slate-200 text-slate-500 bg-white hover:bg-slate-50"
                    >
                      <X className="w-3.5 h-3.5 mr-1" /> Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSave} 
                      className="h-8 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5 mr-1" /> Save Matrix
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Core Corporate Profile Configurations Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Company Name</Label>
                <Input 
                  value={form.companyName} 
                  disabled={!editing} 
                  onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} 
                  className="h-9 text-xs font-semibold text-slate-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" 
                />
              </div>

              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Industry Sector</Label>
                <select 
                  disabled={!editing} 
                  value={form.industry} 
                  onChange={e => setForm(p => ({ ...p, industry: e.target.value }))}
                  className="w-full h-9 border border-slate-200 rounded-lg px-3 text-xs font-semibold text-slate-800 bg-white outline-none focus:border-slate-400 transition-colors disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 cursor-pointer"
                >
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Company Size (Seats)</Label>
                <select 
                  disabled={!editing} 
                  value={form.size} 
                  onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
                  className="w-full h-9 border border-slate-200 rounded-lg px-3 text-xs font-semibold text-slate-800 bg-white outline-none focus:border-slate-400 transition-colors disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 cursor-pointer"
                >
                  {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Country Location Base</Label>
                <Input 
                  value={form.country} 
                  disabled={!editing} 
                  onChange={e => setForm(p => ({ ...p, country: e.target.value }))} 
                  className="h-9 text-xs font-semibold text-slate-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" 
                />
              </div>

              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Website Address Vector</Label>
                <Input 
                  value={form.website} 
                  disabled={!editing} 
                  onChange={e => setForm(p => ({ ...p, website: e.target.value }))} 
                  className="h-9 text-xs font-mono text-slate-600 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200" 
                />
              </div>

              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">VAT Identification Registry</Label>
                <Input 
                  value={form.vatNumber} 
                  disabled={!editing} 
                  onChange={e => setForm(p => ({ ...p, vatNumber: e.target.value }))} 
                  className="h-9 text-xs font-mono text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200" 
                />
              </div>

              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Primary Account Superuser</Label>
                <Input 
                  value={form.contactName} 
                  disabled={!editing} 
                  onChange={e => setForm(p => ({ ...p, contactName: e.target.value }))} 
                  className="h-9 text-xs font-semibold text-slate-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" 
                />
              </div>

              <div>
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Protected Contact Email</Label>
                <Input 
                  value={form.contactEmail} 
                  disabled 
                  className="h-9 text-xs font-semibold text-slate-400 bg-slate-50 border-slate-200 cursor-not-allowed select-all" 
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="text-[10px] font-bold mb-1.5 block uppercase tracking-wider text-slate-400">Corporate Target Manifest Statement</Label>
                <textarea 
                  value={form.description} 
                  disabled={!editing} 
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))} 
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 bg-white outline-none focus:border-slate-400 transition-colors disabled:bg-slate-50/80 disabled:text-slate-500 disabled:border-slate-200 resize-none leading-relaxed" 
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CorporateProfile;
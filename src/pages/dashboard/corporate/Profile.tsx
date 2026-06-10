import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Building2, Camera, Globe, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Legal', 'Consulting', 'Media', 'Other'];
const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '500–1000', '1000+'];

const CorporateProfile: React.FC = () => {
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    companyName: 'Apex Solutions Ltd.', industry: 'Technology',
    size: '201–500', country: 'United Kingdom', website: 'https://apexsolutions.com',
    contactName: user?.name || '', contactEmail: user?.email || '',
    description: 'A leading technology solutions provider focused on enterprise digital transformation and workforce development.',
    vatNumber: 'GB123456789',
  });
  const handleSave = () => { setEditing(false); toast.success('Company profile updated!'); };

  return (
    <DashboardLayout title="Company Profile" subtitle="Manage your corporate entity and contact details">
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl border border-border overflow-hidden mb-5">
          {/* Banner */}
          <div className="gradient-primary h-28 relative">
            <button className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-xl transition-all">
              Change Banner
            </button>
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-5">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white shadow-lg">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <h2 className="font-heading font-bold text-xl">{form.companyName}</h2>
                <p className="text-sm text-muted-foreground">{form.industry} · {form.country}</p>
              </div>
              {!editing ? (
                <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="text-xs border-primary/30 text-primary flex-shrink-0">
                  <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
              ) : (
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="text-xs"><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
                  <Button size="sm" onClick={handleSave} className="gradient-primary text-white border-0 text-xs"><Save className="w-3.5 h-3.5 mr-1" /> Save</Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Company Name</Label>
                <Input value={form.companyName} disabled={!editing} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} className="h-10 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Industry</Label>
                <select disabled={!editing} value={form.industry} onChange={e => setForm(p => ({ ...p, industry: e.target.value }))}
                  className="w-full h-10 border border-input rounded-lg px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50">
                  {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Company Size</Label>
                <select disabled={!editing} value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
                  className="w-full h-10 border border-input rounded-lg px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50">
                  {COMPANY_SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Website</Label>
                <Input value={form.website} disabled={!editing} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} className="h-10 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Contact Name</Label>
                <Input value={form.contactName} disabled={!editing} onChange={e => setForm(p => ({ ...p, contactName: e.target.value }))} className="h-10 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Contact Email</Label>
                <Input value={form.contactEmail} disabled className="h-10 text-sm bg-muted/50" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs font-medium mb-1.5 block uppercase tracking-wide text-muted-foreground">Company Description</Label>
                <textarea value={form.description} disabled={!editing} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                  className="w-full border border-input rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50 resize-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CorporateProfile;

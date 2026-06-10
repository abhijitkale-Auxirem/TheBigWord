import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Globe, ArrowRightLeft, Copy, Save, AlignLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const LANG_PAIRS = ['English → French', 'Spanish → English', 'English → Arabic', 'German → English', 'English → Mandarin'];

const LocalizationTools: React.FC = () => {
  const [source, setSource] = useState('');
  const [translated, setTranslated] = useState('');
  const [activePair, setActivePair] = useState(LANG_PAIRS[0]);
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!source.trim()) return;
    setTranslating(true);
    await new Promise(r => setTimeout(r, 1000));
    setTranslated(`[Professional ${activePair.split('→')[1].trim()} localization of: "${source.slice(0, 50)}..."]\n\nLocalized content would appear here with proper regional adaptations, cultural nuances, and professional terminology.`);
    setTranslating(false);
  };

  return (
    <DashboardLayout title="Localization Tools" subtitle="Professional translation workspace with document management">
      {/* Language Pair Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {LANG_PAIRS.map(pair => (
          <button key={pair} onClick={() => setActivePair(pair)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activePair === pair ? 'gradient-primary text-white shadow-lg' : 'bg-white border border-border text-muted-foreground hover:border-primary/30'}`}>
            <Globe className="w-4 h-4" />{pair}
          </button>
        ))}
      </div>

      {/* Translation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-brand-surface border-b border-border">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="w-4 h-4 text-blue-500" />{activePair.split('→')[0].trim()}
            </div>
            <div className="text-xs text-muted-foreground">{source.split(/\s+/).filter(Boolean).length} words</div>
          </div>
          <textarea value={source} onChange={e => setSource(e.target.value)}
            placeholder="Paste source text here..."
            rows={16}
            className="w-full p-5 text-sm outline-none resize-none leading-relaxed placeholder:text-muted-foreground" />
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-brand-surface border-b border-border">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="w-4 h-4 text-emerald-500" />{activePair.split('→')[1].trim()}
            </div>
            {translated && <CheckCircle className="w-4 h-4 text-emerald-500" />}
          </div>
          {translating ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex gap-1.5">
                {[0,1,2].map(i => <div key={i} className="w-3 h-3 gradient-primary rounded-full animate-bounce-soft" style={{ animationDelay: `${i*0.15}s` }} />)}
              </div>
            </div>
          ) : (
            <textarea value={translated} onChange={e => setTranslated(e.target.value)}
              placeholder="Translation will appear here. You can also edit directly."
              rows={16}
              className="w-full p-5 text-sm outline-none resize-none leading-relaxed placeholder:text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={handleTranslate} disabled={!source.trim() || translating}
          className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-40 shadow-lg shadow-primary/20">
          <ArrowRightLeft className="w-4 h-4" /> {translating ? 'Translating...' : 'Translate'}
        </button>
        <button onClick={() => { navigator.clipboard.writeText(translated); toast.success('Copied!'); }} disabled={!translated}
          className="flex items-center gap-2 border border-border text-sm font-medium px-4 py-2.5 rounded-xl hover:border-primary/30 hover:text-primary transition-all disabled:opacity-40">
          <Copy className="w-4 h-4" /> Copy Translation
        </button>
        <button onClick={() => toast.success('Draft saved!')} disabled={!translated}
          className="flex items-center gap-2 border border-border text-sm font-medium px-4 py-2.5 rounded-xl hover:border-primary/30 hover:text-primary transition-all disabled:opacity-40">
          <Save className="w-4 h-4" /> Save Draft
        </button>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground bg-brand-surface px-3 py-2 rounded-xl">
          <AlignLeft className="w-3.5 h-3.5" /> CAT Tool Mode: Professional
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LocalizationTools;

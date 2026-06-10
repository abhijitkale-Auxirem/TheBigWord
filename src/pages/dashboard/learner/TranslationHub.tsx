import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Languages, ArrowRightLeft, Copy, Volume2, History, Star, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Mandarin Chinese', 'Arabic',
  'Hindi', 'Japanese', 'Portuguese', 'Italian', 'Russian', 'Korean',
  'Dutch', 'Swedish', 'Turkish', 'Polish', 'Vietnamese', 'Thai',
];

const MOCK_TRANSLATIONS: Record<string, string> = {
  'Hello, how are you?': '¡Hola! ¿Cómo estás?',
  'Good morning': 'Buenos días',
  'Thank you very much': 'Muchas gracias',
  'I would like to practice my Spanish': 'Me gustaría practicar mi español',
};

const HISTORY = [
  { from: 'English', to: 'Spanish', source: 'Hello, how are you?', result: '¡Hola! ¿Cómo estás?', time: '2 min ago' },
  { from: 'English', to: 'French', source: 'Good morning', result: 'Bonjour', time: '15 min ago' },
  { from: 'English', to: 'German', source: 'Thank you very much', result: 'Vielen Dank', time: '1 hour ago' },
];

const TranslationHub: React.FC = () => {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [sourceText, setSourceText] = useState('');
  const [translated, setTranslated] = useState('');
  const [translating, setTranslating] = useState(false);
  const [tab, setTab] = useState<'text' | 'history'>('text');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setTranslating(true);
    await new Promise(r => setTimeout(r, 900));
    const mock = MOCK_TRANSLATIONS[sourceText] || `[${toLang} translation of: "${sourceText}"]`;
    setTranslated(mock);
    setTranslating(false);
  };

  const swapLangs = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setSourceText(translated);
    setTranslated(sourceText);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <DashboardLayout title="Translation Hub" subtitle="Translate text, documents, and voice across 50+ languages">
      {/* Tab */}
      <div className="flex gap-1 bg-brand-surface p-1 rounded-xl w-fit mb-6">
        {(['text', 'history'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}>
            {t === 'history' ? 'Translation History' : 'Text Translation'}
          </button>
        ))}
      </div>

      {tab === 'text' ? (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {/* Language Selector */}
          <div className="flex items-center justify-between px-5 py-3 bg-brand-surface border-b border-border">
            <div className="relative">
              <select value={fromLang} onChange={e => setFromLang(e.target.value)}
                className="appearance-none bg-white border border-border rounded-xl px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 pr-8">
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            <button onClick={swapLangs}
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <ArrowRightLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            <div className="relative">
              <select value={toLang} onChange={e => setToLang(e.target.value)}
                className="appearance-none bg-white border border-border rounded-xl px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 pr-8">
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative">
              <textarea
                value={sourceText}
                onChange={e => setSourceText(e.target.value)}
                placeholder={`Enter text in ${fromLang}...`}
                rows={10}
                className="w-full p-5 text-base bg-white outline-none resize-none border-r border-border placeholder:text-muted-foreground"
              />
              <div className="absolute bottom-3 right-4 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{sourceText.length}/5000</span>
                {sourceText && (
                  <button onClick={() => copyText(sourceText)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative bg-brand-surface/30">
              {translating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce-soft" style={{ animationDelay: `${i*0.15}s` }} />)}
                  </div>
                </div>
              ) : (
                <div className="p-5 text-base text-muted-foreground min-h-[200px] leading-relaxed">
                  {translated || <span className="italic opacity-50">Translation will appear here...</span>}
                </div>
              )}
              {translated && (
                <div className="absolute bottom-3 right-4 flex items-center gap-2">
                  <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => copyText(translated)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                    <Star className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-5 py-3 border-t border-border flex items-center justify-between bg-brand-surface/50">
            <span className="text-xs text-muted-foreground">Powered by TheBigWord AI Translation Engine</span>
            <button onClick={handleTranslate} disabled={!sourceText.trim() || translating}
              className="gradient-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20">
              {translating ? 'Translating...' : 'Translate'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Recent Translations</h3>
            <button className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
          <div className="divide-y divide-border">
            {HISTORY.map((h, i) => (
              <div key={i} className="p-4 hover:bg-brand-surface/40 transition-colors">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">{h.from}</span>
                  <ArrowRightLeft className="w-3 h-3" />
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-medium">{h.to}</span>
                  <span className="ml-auto">{h.time}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="text-foreground">{h.source}</p>
                  <p className="text-muted-foreground">{h.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TranslationHub;

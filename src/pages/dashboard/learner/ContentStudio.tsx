import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  FileText, 
  Wand2, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  CornerDownRight,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TONES = ['Professional', 'Casual', 'Academic', 'Formal', 'Persuasive', 'Creative'];
const TEMPLATES = [
  { title: 'Business Email Paradigm', icon: '📧', template: 'Subject: [Structural Topic]\n\nDear [Name],\n\nI hope this message finds you well. I am writing to outline...' },
  { title: 'Executive Cover Letter', icon: '📄', template: 'Dear Hiring Team,\n\nI am writing to express my clear interest in the [Position] role at [Company]...' },
  { title: 'Blog Editorial Hook', icon: '✍️', template: 'In modern, fast-paced ecosystems, [Topic] has taken center stage. In this article, we break down...' },
  { title: 'Academic Thesis Blueprint', icon: '🎓', template: 'Introduction:\n\n[Topic] remains a multifaceted paradox affecting macro systems.\n\nThesis: This paper posits that...' },
];

const MOCK_CORRECTIONS = [
  { original: 'I has been working', corrected: 'I have been working', type: 'Grammar', border: 'border-rose-200/60 bg-rose-50/40 text-rose-700', badge: 'bg-rose-150 border-rose-300 text-rose-800', explanation: 'Subject-verb agreement failure. Pair standard first-person pronouns with modern plural auxiliaries in present perfect.' },
  { original: 'very unique', corrected: 'unique', type: 'Style', border: 'border-amber-200/60 bg-amber-50/40 text-amber-700', badge: 'bg-amber-150 border-amber-300 text-amber-800', explanation: 'Absolute modifiers do not accept graduation degrees. "Unique" is binary; drop redundant packaging.' },
  { original: 'irregardless', corrected: 'regardless', type: 'Lexicon', border: 'border-blue-200/60 bg-blue-50/40 text-blue-700', badge: 'bg-blue-150 border-blue-300 text-blue-800', explanation: 'Double negative formation creates a non-standard usage. Use standard alternative markers.' },
];

const ContentStudio: React.FC = () => {
  const [content, setContent] = useState('');
  const [tone, setTone] = useState('Professional');
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleGrammarCheck = async () => {
    if (!content.trim()) return;
    setChecking(true);
    await new Promise(r => setTimeout(r, 1200));
    setChecking(false);
    setChecked(true);
  };

  const loadTemplate = (template: string) => {
    setContent(template);
    setChecked(false);
    toast.success('Template loaded into text canvas');
  };

  const copyContent = () => {
    if (!content.trim()) {
      toast.error('Canvas is empty');
      return;
    }
    navigator.clipboard.writeText(content);
    toast.success('Data structural array copied!');
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return (
    <DashboardLayout title="Content Studio" subtitle="AI prose syntax adjustments, structural validation, and template rendering">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        
        {/* Editor Block Area */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Dense Formatting Toolbar Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-wrap gap-4 items-center justify-between shadow-sm select-none">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Style Tone:</span>
              <div className="flex flex-wrap gap-1">
                {TONES.map(t => (
                  <button 
                    key={t} 
                    onClick={() => setTone(t)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${
                      tone === t 
                        ? 'bg-slate-900 border-slate-800 text-white shadow-sm' 
                        : 'bg-slate-50 border-slate-200/60 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 border-l border-slate-100 pl-3 ml-auto">
              <button 
                onClick={copyContent} 
                title="Copy contents"
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => { setContent(''); setChecked(false); }} 
                title="Clear text input area"
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Text Area Interactive Engine Canvas */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm focus-within:border-slate-400 transition-all">
            <textarea
              value={content}
              onChange={e => { setContent(e.target.value); setChecked(false); }}
              placeholder="Enter text strings here or select an asset template layout from the sidebar matrix..."
              rows={13}
              className="w-full p-5 text-sm text-slate-800 outline-none resize-none placeholder:text-slate-400 font-medium leading-relaxed bg-white"
            />
            
            {/* Context Footer Statistics Data-readout */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between select-none">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Index: <span className="text-slate-700">{wordCount}</span> words · <span className="text-slate-700">{content.length}</span> tokens
              </div>
              
              <Button
                onClick={handleGrammarCheck}
                disabled={!content.trim() || checking}
                size="sm"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-8.5 rounded-xl shadow-sm inline-flex items-center gap-1.5"
              >
                {checking ? <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" /> : <Wand2 className="w-3.5 h-3.5" />}
                {checking ? 'Evaluating Syntax...' : 'Analyze Grammar Layout'}
              </Button>
            </div>
          </div>

          {/* Grammar Diagnostics Analysis Results Box */}
          {checked && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 select-none">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-bold text-sm text-slate-800 tracking-tight">Diagnostics Pipeline Review</h3>
                </div>
                <span className="text-[10px] uppercase font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                  Syntax Index: 87/100
                </span>
              </div>
              
              <div className="space-y-2.5">
                {MOCK_CORRECTIONS.map((c, i) => (
                  <div key={i} className={`p-4 rounded-xl border text-xs leading-relaxed font-medium ${c.border}`}>
                    <div className="flex gap-2.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                      <div className="w-full">
                        <div className="flex flex-wrap items-center gap-1.5 font-bold mb-1">
                          <span className="line-through opacity-60 bg-black/5 px-1 rounded">{c.original}</span>
                          <CornerDownRight className="w-3 h-3 opacity-60" />
                          <span className="bg-emerald-600 text-white px-1.5 py-0.2 rounded shadow-sm">{c.corrected}</span>
                          
                          <span className={`ml-auto text-[9px] uppercase tracking-wider font-extrabold border px-1.5 py-0.2 rounded-md ${c.badge}`}>
                            {c.type}
                          </span>
                        </div>
                        <p className="opacity-90 text-[11px] leading-relaxed mt-1.5 font-medium border-t border-black/5 pt-1.5">
                          {c.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls Frame Panel */}
        <div className="space-y-4">
          
          {/* Templates Component Map Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="font-bold text-xs mb-3.5 flex items-center gap-2 pb-2.5 border-b border-slate-100 uppercase tracking-wider text-slate-400 select-none">
              <FileText className="w-3.5 h-3.5 text-slate-400" /> Structural Anchors
            </h3>
            
            <div className="space-y-1.5">
              {TEMPLATES.map(t => (
                <button 
                  key={t.title} 
                  onClick={() => loadTemplate(t.template)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300/80 transition-all text-left group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sm shadow-sm select-none">
                    {t.icon}
                  </span>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">
                    {t.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Heuristic Directives Display Container */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="font-bold text-xs mb-3 flex items-center gap-2 pb-2 border-b border-slate-100 uppercase tracking-wider text-slate-400 select-none">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" /> Stylistic Guidelines
            </h3>
            
            <ul className="space-y-2.5 text-[11px] font-medium text-slate-500">
              {[
                'Deploy structural active verbs to consolidate core message weight.',
                'Enforce clear segment paragraph breaks inside 4 sentence units.',
                'Alternate clause rhythmic lengths to enhance delivery cadence.',
                'Drop redundant semantic padding arrays like "very" or "really".',
                'Verify telemetry layout tags prior to deployment pipelines.'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400/80 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentStudio;
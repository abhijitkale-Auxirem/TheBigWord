import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { FileText, Wand2, CheckCircle, AlertCircle, Copy, Download, Sparkles, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const TONES = ['Professional', 'Casual', 'Academic', 'Formal', 'Persuasive', 'Creative'];
const TEMPLATES = [
  { title: 'Business Email', icon: '📧', template: 'Subject: [Topic]\n\nDear [Name],\n\nI hope this email finds you well. I am writing to...\n\nBest regards,\n[Your Name]' },
  { title: 'Cover Letter', icon: '📄', template: 'Dear Hiring Manager,\n\nI am writing to express my interest in the [Position] role at [Company]...' },
  { title: 'Blog Introduction', icon: '✍️', template: 'In today\'s fast-paced world, [Topic] has become increasingly important. In this article, we will explore...' },
  { title: 'Academic Essay', icon: '🎓', template: 'Introduction:\n\n[Topic] is a multifaceted issue that affects...\n\nThesis: This essay argues that...' },
];

const MOCK_CORRECTIONS = [
  { original: 'I has been working', corrected: 'I have been working', type: 'Grammar', explanation: 'Use "have" with "I" in present perfect.' },
  { original: 'very unique', corrected: 'unique', type: 'Style', explanation: '"Unique" already means one of a kind — "very" is redundant.' },
  { original: 'irregardless', corrected: 'regardless', type: 'Vocabulary', explanation: '"Irregardless" is non-standard. Use "regardless".' },
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

  const loadTemplate = (template: string) => setContent(template);

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied!');
  };

  return (
    <DashboardLayout title="Content Studio" subtitle="AI-powered writing, grammar checker, and content creation">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-border p-4 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Tone:</span>
              <div className="flex gap-1">
                {TONES.map(t => (
                  <button key={t} onClick={() => setTone(t)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${tone === t ? 'gradient-primary text-white shadow' : 'bg-brand-surface text-muted-foreground hover:text-foreground'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={copyContent} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
              <button onClick={() => setContent('')} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <textarea
              value={content}
              onChange={e => { setContent(e.target.value); setChecked(false); }}
              placeholder="Start writing here, or choose a template from the right panel..."
              rows={14}
              className="w-full p-5 text-base outline-none resize-none placeholder:text-muted-foreground leading-relaxed"
            />
            <div className="px-5 py-3 bg-brand-surface border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{content.split(/\s+/).filter(Boolean).length} words · {content.length} characters</span>
              <button
                onClick={handleGrammarCheck}
                disabled={!content.trim() || checking}
                className="flex items-center gap-2 gradient-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-primary/20"
              >
                {checking ? <Sparkles className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                {checking ? 'Analyzing...' : 'Check Grammar'}
              </button>
            </div>
          </div>

          {/* Grammar Results */}
          {checked && (
            <div className="bg-white rounded-2xl border border-border p-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold">Grammar Analysis Complete</h3>
                <span className="ml-auto text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-medium">Score: 87/100</span>
              </div>
              <div className="space-y-3">
                {MOCK_CORRECTIONS.map((c, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${c.type === 'Grammar' ? 'border-red-100 bg-red-50' : c.type === 'Style' ? 'border-yellow-100 bg-yellow-50' : 'border-blue-100 bg-blue-50'}`}>
                    <div className="flex items-start gap-2">
                      <AlertCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${c.type === 'Grammar' ? 'text-red-500' : c.type === 'Style' ? 'text-yellow-500' : 'text-blue-500'}`} />
                      <div>
                        <div className="text-xs font-semibold mb-0.5">
                          <span className="line-through text-muted-foreground">{c.original}</span>
                          <span className="mx-1.5">→</span>
                          <span className="text-emerald-600 font-semibold">{c.corrected}</span>
                          <span className={`ml-2 px-1.5 py-0.5 rounded text-xs font-medium ${c.type === 'Grammar' ? 'bg-red-100 text-red-600' : c.type === 'Style' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>{c.type}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{c.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Templates */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Templates</h3>
            <div className="space-y-2">
              {TEMPLATES.map(t => (
                <button key={t.title} onClick={() => loadTemplate(t.template)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left group">
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{t.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-sm mb-4">Writing Tips</h3>
            <ul className="space-y-3 text-xs text-muted-foreground">
              {['Use active voice for stronger sentences', 'Keep paragraphs under 4 sentences', 'Vary sentence length for rhythm', 'Avoid filler words like "very" and "really"', 'Always proofread before sending'].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {tip}
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

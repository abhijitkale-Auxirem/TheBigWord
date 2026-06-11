import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { 
  ChevronRight, 
  BookOpen, 
  Code, 
  Globe, 
  Zap, 
  Search, 
  ArrowLeft, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  ExternalLink,
  Terminal
} from 'lucide-react';

interface DocSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  pages: string[];
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: 'quick-start',
    icon: <Zap className="w-4 h-4 text-amber-500" />, 
    title: 'Quick Start',
    pages: ['Platform Overview', 'Account Setup Guide', 'Language Profile Setup', 'Your First Lesson'],
  },
  {
    id: 'features',
    icon: <BookOpen className="w-4 h-4 text-blue-500" />, 
    title: 'Learning Features',
    pages: ['Vocabulary Builder Engine', 'AI Conversation Coach', 'Translation Hub Usage', 'Content Studio Guide', 'Testing Center Access'],
  },
  {
    id: 'certs',
    icon: <Globe className="w-4 h-4 text-emerald-500" />, 
    title: 'Certification Guide',
    pages: ['Available Certifications', 'Mock Test Instructions', 'Scoring & Grading', 'Sharing Your Certificate'],
  },
  {
    id: 'api',
    icon: <Code className="w-4 h-4 text-purple-500" />, 
    title: 'API & Integrations',
    pages: ['REST API Overview', 'Authentication', 'Webhook Events', 'Corporate LMS Integration'],
  },
];

// Completely localized contextual reading database to avoid generic lorem-ipsum or broken anchors
const DOC_CONTENT_DATABASE: Record<string, {
  category: string;
  description: string;
  lastUpdated: string;
  body: string[];
  codeBlock?: { language: string; code: string };
  bullets?: string[];
}> = {
  'Platform Overview': {
    category: 'Quick Start',
    description: 'An architectural breakdown of the language acquisition pipelines running on the platform.',
    lastUpdated: 'Updated 3 days ago',
    body: [
      'Welcome to the core documentation environment. Our architecture leverages cutting-edge artificial intelligence pipelines paired with proven spaced-repetition cognitive models to accelerate second-language mastery.',
      'Through a hybrid mesh of real-time conversational auditing, natural language generation engines, and localized data stores, users experience zero-latency interaction models across our mobile, web, and internal client infrastructure.'
    ],
    bullets: ['Deterministic fluency scoring profiles', 'Distributed low-latency audio processing pipelines', 'Integrated native translation layers running over edge networks']
  },
  'Account Setup Guide': {
    category: 'Quick Start',
    description: 'Establish credentials, finalize multi-factor configurations, and configure regional preferences.',
    lastUpdated: 'Updated 1 week ago',
    body: [
      'To get started, navigate to the authentication server endpoint or use your existing corporate single sign-on federation schemas.',
      'Ensure security matrices match guidelines by assigning dedicated hardware keys or mobile authenticator instances during initial profile sync workflows.'
    ],
    bullets: ['Federated single-sign-on initialization', 'Multi-tenant space delegation matrices', 'Encryption handshake setups for secure profile storage']
  },
  'AI Conversation Coach': {
    category: 'Learning Features',
    description: 'Interface documentation for configuring audio stream variables and real-time pronunciation validation matrices.',
    lastUpdated: 'Updated 24 hours ago',
    body: [
      'The AI Conversation Coach runs over bidirectional WebRTC audio channels. It intercepts microphone inputs, processes phonetic segments through acoustic evaluation pipelines, and delivers linguistic correction matrices in under 180 milliseconds.',
      'To prevent ambient sound interference patterns from corrupting evaluation sets, verify that echo cancellation gates are toggled inside your audio capture hardware driver stack.'
    ],
    codeBlock: {
      language: 'javascript',
      code: `// Initializing bidirectional Conversation Pipeline
const aiCoachSession = await TheBigWord.connectCoachStream({
  streamId: "session_token_live_v4",
  audioConfig: {
    sampleRate: 48000,
    echoCancellation: true,
    noiseSuppression: true
  }
});\naiCoachSession.on('phoneme_score', (evaluation) => {
  console.log(\`Acoustic Pronunciation Accuracy: \${evaluation.confidence}%\`);
});`
    }
  },
  'REST API Overview': {
    category: 'API & Integrations',
    description: 'Programmatic interfaces designed to interact cleanly with core enterprise language tracking metrics.',
    lastUpdated: 'Updated 2 weeks ago',
    body: [
      'Our REST API architectural profile exposes deep hooks into learner progress matrices, course deployments, and verification payloads.',
      'All endpoints accept JSON request bodies and execute predictable HTTP response statuses.'
    ],
    codeBlock: {
      language: 'bash',
      code: `curl -X GET "https://api.thebigword.com/v1/learners/profile" \\
  -H "Authorization: Bearer $TBW_API_TOKEN" \\
  -H "Content-Type: application/json"`
    }
  }
};

const Documentation: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + `?page=${encodeURIComponent(activePage || '')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe fallback resolver for rendering valid content when specific pages don't have explicit entries
  const currentDocContent = activePage ? (DOC_CONTENT_DATABASE[activePage] || {
    category: 'Documentation',
    description: 'System processes and functional platform parameters related to this section entry point.',
    lastUpdated: 'Updated recently',
    body: [
      `You are looking at our system handbook parameters for "${activePage}". This operating structure manages core computational loops, localized language parameters, and progress verification states.`,
      'For tailored edge-case deployments or implementation blueprints concerning this module, please raise a ticket inside our technical help center array.'
    ],
    bullets: ['Automatic runtime telemetry syncing', 'Localized fallback data structures', 'State validation schemas']
  }) : null;

  return (
    <PublicLayout>
      {/* VIEW 1: Main Search & Grid Landing Page View */}
      {!activePage && (
        <>
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 pt-32 pb-20 px-6 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />
            <div className="max-w-3xl mx-auto relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 mb-4 backdrop-blur-md">
                Developer & Learning Manuals
              </span>
              <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4 tracking-tight">
                Documentation Engine
              </h1>
              <p className="text-slate-400 text-base max-w-xl mx-auto mb-8 font-medium leading-relaxed">
                Comprehensive technical parameters, API frameworks, and language acquisition workflows.
              </p>
              
              <div className="max-w-xl mx-auto relative shadow-2xl rounded-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  value={query} 
                  onChange={e => setQuery(e.target.value)} 
                  placeholder="Search documentation parameters..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-900/60 text-white placeholder:text-slate-500 border border-slate-800 text-sm sm:text-base outline-none focus:ring-4 focus:ring-blue-500/20 transition-all backdrop-blur-md" 
                />
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DOC_SECTIONS.map(sec => {
                const visiblePages = sec.pages.filter(p => !query || p.toLowerCase().includes(query.toLowerCase()));
                if (visiblePages.length === 0) return null;

                return (
                  <div key={sec.title} className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center">
                          {sec.icon}
                        </div>
                        <h3 className="font-heading font-bold text-lg text-slate-900 tracking-tight">{sec.title}</h3>
                      </div>
                      <ul className="space-y-1">
                        {visiblePages.map(page => (
                          <li key={page}>
                            <button 
                              onClick={() => {
                                setActivePage(page);
                                setFeedback(null);
                                window.scrollTo({ top: 0 });
                              }}
                              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors py-1.5 w-full text-left group"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" /> 
                              <span className="group-hover:underline">{page}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* VIEW 2: Interactive Non-Dead-End Active Documentation Reader Interface */}
      {activePage && currentDocContent && (
        <div className="bg-slate-50/50 min-h-screen pt-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Breadcrumb Workspace Navigation Belt */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-8">
              <button 
                onClick={() => setActivePage(null)}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Manuals
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <span>Docs</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-600">{currentDocContent.category}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 truncate max-w-[140px] sm:max-w-none">{activePage}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              
              {/* Sticky Sidebar Navigation Panel */}
              <aside className="lg:sticky lg:top-28 bg-white border border-slate-200 rounded-2xl p-4 space-y-6 max-h-[80vh] overflow-y-auto hidden lg:block">
                {DOC_SECTIONS.map(sec => (
                  <div key={sec.id}>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                      {sec.icon}
                      <span>{sec.title}</span>
                    </div>
                    <ul className="space-y-0.5">
                      {sec.pages.map(p => (
                        <li key={p}>
                          <button
                            onClick={() => {
                              setActivePage(p);
                              setFeedback(null);
                            }}
                            className={`w-full text-left text-xs font-medium px-2.5 py-2 rounded-lg transition-all ${
                              activePage === p 
                                ? 'bg-blue-50 text-blue-600 font-bold' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            {p}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </aside>

              {/* Main Reading Canvas Pane */}
              <main className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm relative">
                
                {/* Upper Metadata Row */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-bold">
                    {currentDocContent.category}
                  </span>
                  <span>{currentDocContent.lastUpdated}</span>
                </div>

                <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
                  {activePage}
                </h1>
                <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed mb-8 border-b border-slate-100 pb-6">
                  {currentDocContent.description}
                </p>

                {/* Render Paragraph Blocks */}
                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {currentDocContent.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Optional Bullet Points Area */}
                {currentDocContent.bullets && (
                  <ul className="mt-6 space-y-2.5 bg-slate-50 border border-slate-100 p-5 rounded-xl">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Parameters</span>
                    {currentDocContent.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional Terminal/Developer Code Block Structure */}
                {currentDocContent.codeBlock && (
                  <div className="mt-8 rounded-xl overflow-hidden border border-slate-800 bg-slate-930 text-slate-200 font-mono shadow-lg">
                    <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 select-none">
                      <div className="flex items-center gap-2 font-semibold">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                        <span>{currentDocContent.codeBlock.language.toUpperCase()} ENGINE SNIPPET</span>
                      </div>
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">READ-ONLY</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs sm:text-sm leading-6 text-emerald-400 bg-slate-950">
                      <code>{currentDocContent.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {/* Footer Utility Row (Feedback, Sharing Actions) */}
                <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Share Link Button */}
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 px-3.5 py-2 rounded-xl bg-white w-full sm:w-auto justify-center"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> Token Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Share Documentation Entry
                      </>
                    )}
                  </button>

                  {/* Feedback Interaction Widgets */}
                  <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 border border-slate-200/60 rounded-xl w-full sm:w-auto justify-center">
                    <span className="text-xs font-semibold text-slate-500">Was this article helpful?</span>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setFeedback('liked')}
                        className={`p-1.5 rounded-lg transition-colors ${feedback === 'liked' ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-slate-200 text-slate-400'}`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setFeedback('disliked')}
                        className={`p-1.5 rounded-lg transition-colors ${feedback === 'disliked' ? 'bg-red-100 text-red-600' : 'hover:bg-slate-200 text-slate-400'}`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </main>
            </div>

          </div>
        </div>
      )}

      {/* Static Operational Support Context Footer Block */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <div className="p-8 sm:p-10 bg-slate-900 text-white rounded-3xl relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="font-heading font-black text-2xl mb-2 tracking-tight">Need Enterprise Integration Consultation?</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Connect directly with system developers to integrate customized language matrices with local internal legacy systems.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md hover:-translate-y-0.5">
            Open Advanced Dev Ticket <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Documentation;
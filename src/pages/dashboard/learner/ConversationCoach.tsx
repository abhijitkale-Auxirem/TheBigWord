import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Mic, 
  MicOff, 
  RotateCcw, 
  Send, 
  Star, 
  BarChart3, 
  MessageCircle, 
  Briefcase, 
  Plane, 
  GraduationCap, 
  Volume2, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
}

const SCENARIOS: Scenario[] = [
  { id: 'job-interview', title: 'Job Interview Simulation', icon: <Briefcase className="w-4 h-4" />, desc: 'Practice common professional vetting questions using structured presentation frameworks.', difficulty: 'Intermediate', color: 'bg-blue-50 text-blue-700 border-blue-200/60' },
  { id: 'business-meeting', title: 'Executive Alignment', icon: <MessageCircle className="w-4 h-4" />, desc: 'Navigate cross-functional team dynamics and manage conflicting stakeholder opinions.', difficulty: 'Advanced', color: 'bg-purple-50 text-purple-700 border-purple-200/60' },
  { id: 'travel', title: 'Global Tourism & Logistics', icon: <Plane className="w-4 h-4" />, desc: 'Coordinate transport hurdles, check-ins, and hospitality interactions naturally.', difficulty: 'Beginner', color: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' },
  { id: 'academic', title: 'Academic Thesis Defense', icon: <GraduationCap className="w-4 h-4" />, desc: 'Deconstruct hypothesis models, challenge paradigms, and back arguments with theoretical sources.', difficulty: 'Advanced', color: 'bg-amber-50 text-amber-700 border-amber-200/60' },
];

const AI_RESPONSES: Record<string, string[]> = {
  'job-interview': [
    "Great introduction! Your confidence comes through clearly. Let me ask: What are your greatest professional strengths?",
    "Excellent answer! Good use of the STAR method. Now, where do you see yourself in 5 years?",
    "Very well articulated. One tip: try to quantify your achievements when possible. For example, 'I increased team productivity by 25%'.",
  ],
  default: [
    "Hello! I'm your AI conversation coach. How can I help you practice today?",
    "That's a great start! Let's continue the conversation.",
    "Excellent! You're improving with each sentence. Keep going!",
  ],
};

const ConversationCoach: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; time: string }[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [aiResponseIndex, setAiResponseIndex] = useState(0);

  const startScenario = (id: string) => {
    setActiveScenario(id);
    const scenario = SCENARIOS.find(s => s.id === id)!;
    setMessages([
      { 
        role: 'ai', 
        text: `Welcome to the ${scenario.title} environment. I've initiated your conversation partner engine. Let's begin — please introduce yourself and declare your immediate goal.`, 
        time: '12:34 PM' 
      }
    ]);
    setAiResponseIndex(0);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input, time: '12:35 PM' };
    const responses = AI_RESPONSES[activeScenario || 'default'] || AI_RESPONSES.default;
    const aiMsg = { role: 'ai' as const, text: responses[aiResponseIndex % responses.length], time: '12:35 PM' };
    
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setAiResponseIndex(i => i + 1);
    setInput('');
  };

  const SCORES = [
    { label: 'Fluency & Pacing', score: 82, bg: 'bg-blue-500' },
    { label: 'Grammatical Accuracy', score: 75, bg: 'bg-emerald-500' },
    { label: 'Lexical Diversity', score: 88, bg: 'bg-amber-500' },
  ];

  return (
    <DashboardLayout title="AI Conversation Coach" subtitle="Evaluate linguistics and phonetics through simulated scenarios">
      {!activeScenario ? (
        <>
          {/* Main Informational Header Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white mb-6 relative overflow-hidden shadow-sm">
            <div className="absolute right-6 -bottom-4 opacity-10 text-8xl pointer-events-none select-none">🎙️</div>
            <div className="max-w-xl relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-300 border border-slate-700/60 rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" /> Interactive Verbal Lab
              </span>
              <h2 className="font-heading font-bold text-xl tracking-tight mb-1">Select Active Audio Scenario</h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Choose a simulation environment below to initialize the conversation partner loop. The AI engine reviews grammar pacing, lexical complexity, and syntax composition metrics in real time.
              </p>
            </div>
          </div>

          {/* High Density Selection List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIOS.map(s => (
              <div 
                key={s.id} 
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-150 border border-slate-200/60 flex items-center justify-center text-slate-700 shadow-sm">
                        {s.icon}
                      </div>
                      <h3 className="font-bold text-sm text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
                        {s.title}
                      </h3>
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border rounded-md whitespace-nowrap ${s.color}`}>
                      {s.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                    {s.desc}
                  </p>
                </div>
                
                <Button 
                  onClick={() => startScenario(s.id)}
                  size="sm"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold h-8.5 rounded-xl shadow-sm mt-1"
                >
                  Initialize Training Unit
                </Button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
          {/* Primary Simulation Workspace Canvas (Chat Panel) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 flex flex-col h-[600px] shadow-sm overflow-hidden">
            
            {/* Embedded Stream Workspace Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200 select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-800 leading-tight">
                    {SCENARIOS.find(s => s.id === activeScenario)?.title}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block" /> 
                    Audio Streaming Core Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveScenario(null)} 
                className="h-7 px-2.5 text-xs font-bold text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> Abort Context
              </button>
            </div>

            {/* Simulated Audio/Text Thread Logs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 bg-slate-200 border border-slate-300/60 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 shadow-sm text-slate-600">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-md rounded-xl px-4 py-3 border text-xs leading-relaxed font-medium shadow-sm relative group ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 border-slate-800 text-white rounded-tr-none' 
                      : 'bg-white border-slate-200 text-slate-700 rounded-tl-none'
                  }`}>
                    <div>{msg.text}</div>
                    
                    {msg.role === 'ai' && (
                      <button className="flex items-center gap-1 mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors border border-slate-100 rounded bg-slate-50 px-1.5 py-0.5 w-fit">
                        <Volume2 className="w-3 h-3 text-slate-400" /> Synthesize Audio
                      </button>
                    )}
                    
                    <span className={`absolute -bottom-4 text-[9px] font-semibold text-slate-400 uppercase tracking-wider ${msg.role === 'user' ? 'right-0' : 'left-0'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Action Controls Footer Bar */}
            <div className="p-4 bg-white border-t border-slate-200 flex gap-2.5 items-center">
              <button 
                onClick={() => setIsRecording(!isRecording)}
                title={isRecording ? "Stop recording audio stream" : "Begin live recording input"}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all flex-shrink-0 shadow-sm ${
                  isRecording 
                    ? 'bg-rose-600 border-rose-700 text-white animate-pulse' 
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder={isRecording ? "Analyzing inbound telemetry stream..." : "Type your response query parameters here..."}
                disabled={isRecording}
                className="flex-1 h-9 border border-slate-200 rounded-xl px-3 text-xs outline-none focus:ring-4 focus:ring-slate-500/5 focus:border-slate-400 bg-slate-50 disabled:opacity-60 transition-all font-medium shadow-inner" 
              />

              <button 
                onClick={sendMessage} 
                disabled={!input.trim()}
                className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-white disabled:opacity-30 flex-shrink-0 hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Metrics Score / Tip Sidecar Deck */}
          <div className="space-y-4">
            {/* Live Metrics Processing Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-bold text-xs mb-4 flex items-center gap-2 pb-2.5 border-b border-slate-100 uppercase tracking-wider text-slate-400">
                <BarChart3 className="w-3.5 h-3.5 text-slate-400" /> Evaluation Metrics
              </h3>
              
              {SCORES.map(s => (
                <div key={s.label} className="mb-3.5 last:mb-0">
                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span className="text-slate-500">{s.label}</span>
                    <span className="text-slate-800 bg-slate-100 border border-slate-200/60 rounded px-1 text-[10px]">{s.score}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 border border-slate-200/30 rounded-full overflow-hidden">
                    <div className={`h-full ${s.bg} rounded-full transition-all duration-500`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Compounded Index</div>
                  <div className="font-heading font-black text-2xl text-slate-900 tracking-tight mt-0.5">82<span className="text-xs font-semibold text-slate-400">/100</span></div>
                </div>
                <div className="flex gap-0.5 bg-amber-50/80 border border-amber-200/50 p-1.5 rounded-xl">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Heuristic Context Optimization List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-bold text-xs mb-3 flex items-center gap-2 pb-2 border-b border-slate-100 uppercase tracking-wider text-slate-400">
                <Lightbulb className="w-3.5 h-3.5 text-slate-400" /> Tactical Directives
              </h3>
              <ul className="space-y-2.5 text-[11px] font-medium text-slate-500">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> 
                  <span>Prioritize complete, context-isolated sentences over fragments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> 
                  <span>Vary contextual lexical verbs to expand your processing score.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 text-xs font-bold leading-none mt-0.5 select-none w-3.5 text-center">→</span> 
                  <span>Integrate complex transitional adverbs (e.g., 'furthermore', 'subsequently').</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 text-xs font-bold leading-none mt-0.5 select-none w-3.5 text-center">→</span> 
                  <span>Maintain uniform microphone pacing parameters above 30 seconds.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ConversationCoach;
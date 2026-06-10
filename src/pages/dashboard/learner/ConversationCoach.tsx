import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Mic, MicOff, RotateCcw, Send, Star, BarChart3, MessageCircle, Briefcase, Plane, GraduationCap, Volume2 } from 'lucide-react';

const SCENARIOS = [
  { id: 'job-interview', title: 'Job Interview', icon: <Briefcase className="w-5 h-5" />, desc: 'Practice common interview questions', difficulty: 'Intermediate', color: 'bg-blue-100 text-blue-700' },
  { id: 'business-meeting', title: 'Business Meeting', icon: <MessageCircle className="w-5 h-5" />, desc: 'Conduct professional meetings', difficulty: 'Advanced', color: 'bg-purple-100 text-purple-700' },
  { id: 'travel', title: 'Travel & Tourism', icon: <Plane className="w-5 h-5" />, desc: 'Navigate airports, hotels, restaurants', difficulty: 'Beginner', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'academic', title: 'Academic Discussion', icon: <GraduationCap className="w-5 h-5" />, desc: 'Debate and present ideas', difficulty: 'Advanced', color: 'bg-orange-100 text-orange-700' },
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
    setMessages([{ role: 'ai', text: `Welcome to the ${scenario.title} practice session! I'll be your conversation partner. Let's begin — please introduce yourself briefly.`, time: 'Now' }]);
    setAiResponseIndex(0);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input, time: 'Now' };
    const responses = AI_RESPONSES[activeScenario || 'default'] || AI_RESPONSES.default;
    const aiMsg = { role: 'ai' as const, text: responses[aiResponseIndex % responses.length], time: 'Now' };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setAiResponseIndex(i => i + 1);
    setInput('');
  };

  const SCORES = [
    { label: 'Fluency', score: 82, color: 'gradient-primary' },
    { label: 'Grammar', score: 75, color: 'gradient-emerald' },
    { label: 'Vocabulary', score: 88, color: 'gradient-gold' },
  ];

  return (
    <DashboardLayout title="AI Conversation Coach" subtitle="Practice real-world speaking scenarios with AI">
      {!activeScenario ? (
        <>
          <div className="gradient-hero rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
            <div className="absolute right-8 bottom-0 opacity-10 text-9xl">🎙️</div>
            <h2 className="font-heading font-bold text-2xl mb-2 relative z-10">Choose a Scenario</h2>
            <p className="text-blue-100/80 text-sm relative z-10">Select a conversation scenario to practice with your AI coach.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
            {SCENARIOS.map(s => (
              <button key={s.id} onClick={() => startScenario(s.id)}
                className="bg-white border border-border rounded-2xl p-6 text-left hover:border-primary/40 hover:shadow-xl transition-all group">
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>{s.icon}</div>
                <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>{s.difficulty}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Chat Panel */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-border flex flex-col h-[600px]">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{SCENARIOS.find(s => s.id === activeScenario)?.title}</p>
                  <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block" /> AI Coach Active</p>
                </div>
              </div>
              <button onClick={() => setActiveScenario(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> Change Scenario
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' ? 'gradient-primary text-white rounded-tr-sm' : 'bg-brand-surface text-foreground rounded-tl-sm border border-border'
                  }`}>
                    {msg.text}
                    {msg.role === 'ai' && (
                      <button className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Volume2 className="w-3 h-3" /> Listen
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border flex gap-3">
              <button onClick={() => setIsRecording(!isRecording)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${isRecording ? 'bg-red-500 text-white animate-pulse-slow' : 'bg-brand-surface text-muted-foreground hover:bg-red-50 hover:text-red-500'}`}>
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type your response or use the microphone..."
                className="flex-1 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-brand-surface" />
              <button onClick={sendMessage} disabled={!input.trim()}
                className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center text-white disabled:opacity-40 flex-shrink-0 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Score Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Session Score</h3>
              {SCORES.map(s => (
                <div key={s.label} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-bold">{s.score}/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
              <div className="mt-5 pt-4 border-t border-border text-center">
                <div className="font-heading font-bold text-3xl text-primary">82</div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-3.5 h-3.5 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-sm mb-3">Tips</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold mt-0.5">✓</span> Use complete sentences</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold mt-0.5">✓</span> Vary your vocabulary</li>
                <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold mt-0.5">→</span> Work on sentence connectors</li>
                <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold mt-0.5">→</span> Try to speak for 30+ seconds</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ConversationCoach;

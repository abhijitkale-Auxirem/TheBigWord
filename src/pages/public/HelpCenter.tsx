import React, { useState, useEffect, useRef } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Search, 
  BookOpen, 
  Headphones, 
  Globe, 
  FileText, 
  Trophy, 
  Users, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Play,
  ExternalLink,
  Send,
  Loader2,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface CategoryItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  youtubeUrl: string;
  colorClass: string;
  bgClass: string;
  videos: string[];
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'get-started',
    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    title: 'Getting Started',
    desc: 'Watch our quick-start dashboard configuration walk-through.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLyour-playlist-id-1',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50/70 border-blue-100',
    videos: ['Account creation guide (2:15)', 'Setting up your target language profile (4:10)', 'Taking your first fluency baseline test (5:30)'],
  },
  {
    id: 'vocab',
    icon: <Globe className="w-5 h-5 text-emerald-600" />,
    title: 'Vocabulary Builder',
    desc: 'Deep dive tutorials on mastering our spaced repetition engines.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLyour-playlist-id-2',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50/70 border-emerald-100',
    videos: ['Using custom flashcard decks (3:45)', 'How Word of the Day streaks work (1:20)', 'Competing in vocabulary challenges (2:50)'],
  },
  {
    id: 'ai-coach',
    icon: <Headphones className="w-5 h-5 text-purple-600" />,
    title: 'AI Conversation Coach',
    desc: 'Video analysis of real-time speech parsing and audio setups.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLyour-playlist-id-3',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50/70 border-purple-100',
    videos: ['Calibrating your microphone perfectly (2:10)', 'Unlocking advanced conversation rooms (4:40)', 'Understanding your pronunciation score (3:15)'],
  },
  {
    id: 'studio',
    icon: <FileText className="w-5 h-5 text-orange-600" />,
    title: 'Content Studio',
    desc: 'See how our grammar checks and AI generation layers execute.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLyour-playlist-id-4',
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50/70 border-orange-100',
    videos: ['Setting up real-time writing check tools (3:05)', 'Generating automated formal emails (2:25)', 'Structuring high-score academic essays (6:10)'],
  },
  {
    id: 'certs',
    icon: <Trophy className="w-5 h-5 text-amber-600" />,
    title: 'Certifications',
    desc: 'Official exam prep overviews covering standardized benchmarks.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLyour-playlist-id-5',
    colorClass: 'text-amber-600',
    bgClass: 'bg-amber-50/70 border-amber-100',
    videos: ['IELTS full band 7+ simulation guide (12:40)', 'Verifying your achievement badges (1:50)', 'Syncing certificates to LinkedIn (2:15)'],
  },
  {
    id: 'billing',
    icon: <Users className="w-5 h-5 text-pink-600" />,
    title: 'Account & Billing',
    desc: 'Clear screencasts on managing enterprise tiers and profiles.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLyour-playlist-id-6',
    colorClass: 'text-pink-600',
    bgClass: 'bg-pink-50/70 border-pink-100',
    videos: ['Upgrading/downgrading your account (1:45)', 'Updating payment processing options (2:10)', 'Exporting itemized tax invoices (1:30)'],
  },
];

const HelpCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your AI Support Assistant. How can I help you master your language goals or resolve issues with TheBigWord today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter categories and videos
  const filteredCategories = CATEGORIES.filter(c => {
    const matchesTitle = c.title.toLowerCase().includes(query.toLowerCase());
    const matchesVideos = c.videos.some(v => v.toLowerCase().includes(query.toLowerCase()));
    return !query || matchesTitle || matchesVideos;
  });

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "I'm here to support you! For technical matters, you can check our Docs section. For billing queries, please file an email ticket on our Contact page.";
      const cleanText = userText.toLowerCase();

      if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey')) {
        reply = "Hello there! How can I assist you with your language learning dashboard or settings today?";
      } else if (cleanText.includes('price') || cleanText.includes('cost') || cleanText.includes('free') || cleanText.includes('subscription')) {
        reply = "TheBigWord offers a Free plan (with basic flashcards and 5 daily AI Coach calls) and a Pro plan ($12/month) which includes unlimited AI coaching, IELTS/TOEFL mock scoring, and tutor credits.";
      } else if (cleanText.includes('language') || cleanText.includes('spanish') || cleanText.includes('english') || cleanText.includes('french')) {
        reply = "We offer learning tracks for over 50+ world languages, including localized accents, writing syntax evaluation, and certified course assessments.";
      } else if (cleanText.includes('tutor') || cleanText.includes('teacher') || cleanText.includes('marketplace')) {
        reply = "You can schedule 1-on-1 speaking sessions with certified native speakers directly from the tutor marketplace inside your dashboard.";
      }
      
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <PublicLayout>
      {/* Search Header Panel */}
      <section className="bg-gradient-to-br from-[#0c2a93] to-blue-900 pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Video Training Library
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            Video Help Center
          </h1>
          <p className="text-blue-100/70 text-base max-w-xl mx-auto mb-8 font-medium">
            Click any category card below to open its dedicated step-by-step video guide playlist on YouTube.
          </p>
          
          <div className="max-w-xl mx-auto relative shadow-2xl rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)}
              placeholder="Search video guides (e.g., IELTS, dashboard, billing)..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium outline-none focus:ring-4 focus:ring-blue-500/20 transition-all border border-slate-100" 
            />
          </div>
        </div>
      </section>

      {/* Categories Video Grid Workspace */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-3xl max-w-md mx-auto">
            <h3 className="font-bold text-slate-900 text-base">No matching video topics found</h3>
            <button onClick={() => setQuery('')} className="text-xs text-blue-600 font-bold mt-2 hover:underline">Reset Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map(cat => (
              <a 
                key={cat.title} 
                href={cat.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-red-400 hover:shadow-md ring-0 hover:ring-4 hover:ring-red-50 transition-all duration-300 block group relative cursor-pointer"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${cat.bgClass}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base tracking-tight group-hover:text-red-600 transition-colors">
                          {cat.title}
                        </span>
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-red-600" /> YouTube
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">{cat.desc}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-red-400 transition-colors mt-1 flex-shrink-0" />
                </div>

                {/* Inline Video Previews Breakdown */}
                <div className="mt-5 pt-4 border-t border-slate-100 bg-slate-50/50 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                    Included Video Guides:
                  </span>
                  <ul className="space-y-2">
                    {cat.videos
                      .filter(v => !query || v.toLowerCase().includes(query.toLowerCase()))
                      .map(video => (
                        <li key={video} className="flex items-center gap-2 text-xs text-slate-600 font-medium truncate">
                          <Play className="w-3 h-3 text-slate-400 group-hover:text-red-500 transition-colors flex-shrink-0" />
                          <span className="truncate group-hover:underline">{video}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Support Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-500/10">
                24/7 Global Coverage
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-4 mb-2 tracking-tight">
                Still have questions?
              </h3>
              <p className="text-slate-400 text-sm font-medium max-w-sm leading-relaxed">
                If our video playlists don't clear up your questions, open a ticket directly.
              </p>
            </div>
            <div className="mt-6">
              <Link to={ROUTES.CONTACT} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 h-11 rounded-xl transition-colors shadow-md">
                Contact Human Support
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-10">
            <div 
              onClick={() => setIsChatOpen(true)}
              className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div>
                <MessageSquare className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm text-white">Live AI Support Chat</h4>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-normal">Instant diagnostics room.</p>
              </div>
              <button 
                type="button"
                className="text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors mt-4 text-left flex items-center gap-1"
              >
                Open Chat Room &rarr;
              </button>
            </div>

            <div 
              onClick={() => navigate(ROUTES.CONTACT)}
              className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div>
                <Mail className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm text-white">Email Desk Ticketing</h4>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-normal">Open systematic audits.</p>
              </div>
              <button 
                type="button"
                className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors mt-4 text-left flex items-center gap-1"
              >
                File Ticket &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Room Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-3xl p-0 border border-border bg-white shadow-2xl overflow-hidden flex flex-col h-[520px]">
          {/* Header */}
          <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="font-heading font-bold text-base text-white">
                  AI Diagnostics Chat
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-[10px] leading-none">
                  Instant Support Bot (Online)
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-brand-surface">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed font-medium shadow-sm border ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white border-blue-500 rounded-br-none'
                      : 'bg-white text-slate-700 border-slate-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-1.5 shadow-sm">
                  <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI is typing...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-border flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              disabled={isTyping}
              placeholder="Ask support about plans, languages..."
              className="flex-1 border border-slate-200 rounded-xl px-4 text-xs bg-slate-50 outline-none focus:border-blue-600 transition-colors"
            />
            <button
              type="submit"
              disabled={isTyping || !inputMessage.trim()}
              className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
};

export default HelpCenter;
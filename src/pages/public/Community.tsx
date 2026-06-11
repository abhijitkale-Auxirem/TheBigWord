import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { ROUTES } from '@/constants/routes';
import {
  Users, MessageSquare, Globe, Heart, Star, Sparkles,
  Search, Zap, Award, BookOpen, Flame, ThumbsUp,
  ChevronRight, BadgeCheck, TrendingUp, Send, Radio,
  UserPlus, Clock, Hash, ArrowUp, MessageCircle, Share2,
  Headphones, Mic, Video
} from 'lucide-react';

type TabId = 'rooms' | 'speakers' | 'forum';

interface ChatRoom {
  id: string; name: string; emoji: string; language: string;
  participants: number; maxParticipants: number; live: boolean;
  topic: string; gradient: string; type: 'voice' | 'text' | 'video';
}

interface Speaker {
  id: number; name: string; initials: string; flag: string;
  native: string; teaches: string; rating: number; sessions: number;
  online: boolean; lastSeen?: string; badge: string; badgeColor: string;
  gradient: string; speciality: string;
}

interface Post {
  id: number; author: string; initials: string; country: string;
  badge: string; badgeColor: string; time: string; category: string;
  title: string; body: string; upvotes: number; comments: number;
  views: string; hot: boolean; userUpvoted: boolean;
}

const CHAT_ROOMS: ChatRoom[] = [
  {
    id: 'global', name: 'Global Lobby', emoji: '🌍',
    language: 'English', participants: 248, maxParticipants: 500, live: true,
    topic: 'Open chat — practice English with anyone, anytime!',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800', type: 'text',
  },
  {
    id: 'spanish', name: 'Spanish Practice Lounge', emoji: '🇪🇸',
    language: 'Spanish', participants: 89, maxParticipants: 200, live: true,
    topic: '¡Hola a todos! Conversación libre para todos los niveles.',
    gradient: 'from-orange-500 via-red-500 to-rose-600', type: 'voice',
  },
  {
    id: 'ielts', name: 'IELTS Speaking Practice', emoji: '📝',
    language: 'English', participants: 42, maxParticipants: 100, live: true,
    topic: 'Band 7+ strategies — mock interviews and feedback.',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700', type: 'video',
  },
  {
    id: 'mandarin', name: 'Mandarin Circle', emoji: '🇨🇳',
    language: 'Mandarin', participants: 67, maxParticipants: 150, live: true,
    topic: '普通话练习 — Practice your tones and characters together!',
    gradient: 'from-red-600 via-rose-600 to-pink-700', type: 'text',
  },
  {
    id: 'business', name: 'Business English Hub', emoji: '💼',
    language: 'English', participants: 31, maxParticipants: 80, live: false,
    topic: 'Professional communication, emails, presentations.',
    gradient: 'from-slate-600 via-slate-700 to-slate-800', type: 'voice',
  },
  {
    id: 'french', name: 'French Café', emoji: '🇫🇷',
    language: 'French', participants: 54, maxParticipants: 120, live: true,
    topic: 'Bienvenue! Parlez français avec des natifs et des apprenants.',
    gradient: 'from-violet-600 via-purple-700 to-indigo-800', type: 'voice',
  },
];

const SPEAKERS: Speaker[] = [
  {
    id: 1, name: 'Sarah Mitchell', initials: 'SM', flag: '🇬🇧',
    native: 'English', teaches: 'Business English & IELTS',
    rating: 4.9, sessions: 1284, online: true,
    badge: 'Verified Tutor', badgeColor: '#10b981',
    gradient: 'from-emerald-400 to-teal-600', speciality: 'IELTS · Business',
  },
  {
    id: 2, name: 'Carlos Reyes', initials: 'CR', flag: '🇲🇽',
    native: 'Spanish', teaches: 'Conversational Spanish',
    rating: 4.8, sessions: 876, online: true,
    badge: 'Native Speaker', badgeColor: '#f59e0b',
    gradient: 'from-orange-400 to-red-600', speciality: 'Speaking · Culture',
  },
  {
    id: 3, name: 'Mei Lin Zhang', initials: 'ML', flag: '🇨🇳',
    native: 'Mandarin', teaches: 'HSK Prep & Tones',
    rating: 4.9, sessions: 642, online: true,
    badge: 'Top Rated', badgeColor: '#3b82f6',
    gradient: 'from-red-400 to-rose-600', speciality: 'Mandarin · HSK',
  },
  {
    id: 4, name: 'Pierre Dubois', initials: 'PD', flag: '🇫🇷',
    native: 'French', teaches: 'French Grammar & DELF',
    rating: 4.7, sessions: 531, online: false, lastSeen: '2h ago',
    badge: 'Native Speaker', badgeColor: '#8b5cf6',
    gradient: 'from-violet-400 to-indigo-600', speciality: 'Grammar · DELF',
  },
  {
    id: 5, name: 'Yuki Tanaka', initials: 'YT', flag: '🇯🇵',
    native: 'Japanese', teaches: 'JLPT & Anime Japanese',
    rating: 4.8, sessions: 423, online: true,
    badge: 'Expert', badgeColor: '#ec4899',
    gradient: 'from-pink-400 to-rose-600', speciality: 'JLPT · Culture',
  },
  {
    id: 6, name: 'Amara Osei', initials: 'AO', flag: '🇬🇭',
    native: 'English', teaches: 'Academic English & Writing',
    rating: 4.9, sessions: 789, online: true,
    badge: 'Verified Tutor', badgeColor: '#10b981',
    gradient: 'from-amber-400 to-orange-600', speciality: 'Writing · Academic',
  },
];

const POSTS: Post[] = [
  {
    id: 1, author: 'Priya S.', initials: 'PS', country: '🇮🇳',
    badge: 'Pro Member', badgeColor: '#3b82f6', time: '2h ago', category: 'IELTS',
    title: "Got Band 8.5 in IELTS Speaking — here's my exact 90-day plan 🎉",
    body: 'After 3 months of daily AI coaching sessions, mock tests, and speaking with native tutors here, I finally cracked Band 8.5. Sharing everything that worked for me.',
    upvotes: 847, comments: 134, views: '6.2K', hot: true, userUpvoted: false,
  },
  {
    id: 2, author: 'Carlos M.', initials: 'CM', country: '🇲🇽',
    badge: 'Top Contributor', badgeColor: '#f59e0b', time: '5h ago', category: 'English',
    title: '50 Business English phrases that instantly sound more professional',
    body: 'I compiled a list of the most commonly overused expressions and their more polished alternatives. Tested with native speaker feedback.',
    upvotes: 521, comments: 89, views: '4.1K', hot: true, userUpvoted: false,
  },
  {
    id: 3, author: 'Yuki T.', initials: 'YT', country: '🇯🇵',
    badge: 'Verified Tutor', badgeColor: '#10b981', time: '1d ago', category: 'Speaking',
    title: "How I eliminated speaking anxiety after 6 months — a tutor's honest breakdown",
    body: "Five psychological and practical techniques I developed through 600+ coaching sessions that completely transformed my students' confidence.",
    upvotes: 342, comments: 57, views: '3.7K', hot: false, userUpvoted: false,
  },
  {
    id: 4, author: 'Amara O.', initials: 'AO', country: '🇬🇭',
    badge: 'Top Contributor', badgeColor: '#f59e0b', time: '2d ago', category: 'Resources',
    title: 'FREE: My 1,500-word advanced vocabulary deck with audio + mnemonics',
    body: 'Spent 5 months building this. Every word has a usage example, synonym, and a memorable story to help it stick. Download link in comments!',
    upvotes: 1204, comments: 287, views: '11.4K', hot: true, userUpvoted: false,
  },
];

const STATS = [
  { value: '500K+', label: 'Active Members',   icon: Users,         color: '#3b82f6' },
  { value: '80+',   label: 'Language Rooms',   icon: Hash,          color: '#10b981' },
  { value: '2M+',   label: 'Posts & Replies',  icon: MessageSquare, color: '#8b5cf6' },
  { value: '98%',   label: 'Positive Ratings', icon: Heart,         color: '#ec4899' },
];

const ROOM_TYPE_ICON: Record<string, React.ElementType> = {
  text: MessageSquare, voice: Headphones, video: Video,
};

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('rooms');
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState(POSTS);

  const statsReveal    = useReveal();
  const contentReveal  = useReveal();
  const speakersReveal = useReveal();

  const handleUpvote = (id: number) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, upvotes: p.userUpvoted ? p.upvotes - 1 : p.upvotes + 1, userUpvoted: !p.userUpvoted } : p
    ));
  };

  const filteredPosts = posts.filter(p => !query || p.title.toLowerCase().includes(query.toLowerCase()));

  const tabs: { id: TabId; label: string; icon: React.ElementType; count?: string }[] = [
    { id: 'rooms',    label: 'Live Rooms',      icon: Radio,         count: '5 live' },
    { id: 'speakers', label: 'Native Speakers',  icon: Mic,           count: '4 online' },
    { id: 'forum',    label: 'Forum',            icon: MessageSquare },
  ];

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="hero-animated-bg relative pt-28 pb-28 overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-blue-200 mb-7 animate-fade-in">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            1,847 members active right now
          </div>
          <h1 className="font-heading font-extrabold text-5xl lg:text-7xl text-white mb-6 animate-fade-in delay-100 leading-[1.05]">
            Learn Together,<br /><span className="hero-gradient-text">Grow Faster</span>
          </h1>
          <p className="text-xl text-blue-100/75 mb-10 max-w-2xl mx-auto animate-fade-in delay-200">
            Live chat rooms, native speaker connections, and a thriving forum — your language community awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
            <button onClick={() => navigate(ROUTES.SIGNUP)} className="hero-btn-primary gap-2 inline-flex">
              <Users className="w-4 h-4" /> Join the Community
            </button>
            <button onClick={() => setActiveTab('rooms')} className="hero-btn-secondary gap-2 inline-flex">
              <Radio className="w-4 h-4" /> Browse Live Rooms
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" className="w-full" preserveAspectRatio="none">
            <defs><linearGradient id="commwg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient></defs>
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="url(#commwg)" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-white -mt-px">
        <div ref={statsReveal.ref} className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={s.label} className={`text-center transition-all duration-700 ${statsReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: `${s.color}18`, width: 52, height: 52 }}>
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <div className="font-heading font-extrabold text-3xl text-gradient">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS + CONTENT */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-2xl p-1.5">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                  }`}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count && activeTab !== tab.id && (
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{tab.count}</span>
                  )}
                </button>
              ))}
            </div>
            {activeTab === 'forum' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search discussions..."
                  className="pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:border-blue-400 w-64" />
              </div>
            )}
          </div>

          {/* LIVE ROOMS */}
          {activeTab === 'rooms' && (
            <div ref={contentReveal.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CHAT_ROOMS.map((room, i) => {
                const TypeIcon = ROOM_TYPE_ICON[room.type];
                const fillPct = (room.participants / room.maxParticipants) * 100;
                return (
                  <div key={room.id}
                    className={`bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 ${
                      contentReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className={`bg-gradient-to-br ${room.gradient} p-6 relative overflow-hidden`}>
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-3xl">{room.emoji}</span>
                          <div className="flex items-center gap-2 mt-2">
                            {room.live && (
                              <span className="flex items-center gap-1.5 text-[10px] font-extrabold bg-red-500 text-white px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                              <TypeIcon className="w-3 h-3" /> {room.type}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-extrabold text-white">{room.participants}</div>
                          <div className="text-xs text-white/60">/ {room.maxParticipants}</div>
                        </div>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-white mt-3">{room.name}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">"{room.topic}"</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                          <span>{room.participants} active</span>
                          <span className={fillPct > 80 ? 'text-orange-500 font-semibold' : ''}>{fillPct > 80 ? 'Almost full' : `${Math.round(fillPct)}% full`}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${fillPct}%`, background: fillPct > 80 ? '#f59e0b' : '#10b981' }} />
                        </div>
                      </div>
                      <button onClick={() => navigate(ROUTES.SIGNUP)}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] ${!room.live ? 'bg-slate-400' : ''}`}
                        style={room.live ? { background: 'linear-gradient(135deg, #1e293b, #334155)' } : {}}>
                        {room.type === 'voice' ? <Headphones className="w-4 h-4" /> : room.type === 'video' ? <Video className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        {room.live ? `Join ${room.type === 'voice' ? 'Voice Room' : room.type === 'video' ? 'Video Room' : 'Chat'}` : 'Notify Me When Live'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* NATIVE SPEAKERS */}
          {activeTab === 'speakers' && (
            <div ref={speakersReveal.ref}>
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3.5 mb-6">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-sm font-semibold text-emerald-800">4 native speakers available right now — book an instant session!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SPEAKERS.map((sp, i) => (
                  <div key={sp.id}
                    className={`bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 ${
                      speakersReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sp.gradient} flex items-center justify-center text-white font-extrabold text-lg`}>
                          {sp.initials}
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${sp.online ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-heading font-bold text-sm text-slate-800">{sp.name}</span>
                          <span className="text-base">{sp.flag}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1"
                          style={{ background: `${sp.badgeColor}18`, color: sp.badgeColor }}>
                          <BadgeCheck className="w-3 h-3" /> {sp.badge}
                        </span>
                        {sp.online ? (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[11px] text-emerald-600 font-semibold">Online now</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-[11px] text-slate-400">{sp.lastSeen}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {[['Native', sp.native], ['Speciality', sp.speciality], ['Sessions', sp.sessions.toLocaleString()]].map(([k, v]) => (
                        <div key={k as string} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">{k}:</span>
                          <span className="font-semibold text-slate-700">{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(j => (
                          <Star key={j} className={`w-3 h-3 ${j <= Math.round(sp.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-amber-600">{sp.rating}</span>
                    </div>
                    <button onClick={() => navigate(ROUTES.SIGNUP)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] ${
                        sp.online ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}>
                      <UserPlus className="w-4 h-4" />
                      {sp.online ? 'Connect Now' : 'Schedule Session'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FORUM */}
          {activeTab === 'forum' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">Y</div>
                <button onClick={() => navigate(ROUTES.SIGNUP)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl px-4 py-2.5 text-sm text-slate-400 text-left font-medium">
                  Start a discussion, share a resource, or ask a question...
                </button>
                <button onClick={() => navigate(ROUTES.SIGNUP)}
                  className="flex items-center gap-2 text-sm font-bold text-white gradient-primary px-4 py-2.5 rounded-xl hover:opacity-90">
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </div>

              {filteredPosts.map((post, i) => (
                <div key={post.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex gap-4">
                    {/* Upvote column */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <button onClick={() => handleUpvote(post.id)}
                        className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                          post.userUpvoted ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-500'
                        }`}>
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <span className={`text-xs font-extrabold ${post.userUpvoted ? 'text-blue-600' : 'text-slate-600'}`}>
                        {(post.upvotes + (post.userUpvoted ? 1 : 0)).toLocaleString()}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold">{post.initials}</div>
                        <span className="font-semibold text-sm text-slate-800">{post.author} {post.country}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${post.badgeColor}18`, color: post.badgeColor }}>{post.badge}</span>
                        <span className="text-[10px] text-slate-400">{post.time}</span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">#{post.category}</span>
                        {post.hot && (
                          <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Flame className="w-2.5 h-2.5" /> Hot
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-base text-slate-800 mb-1.5 hover:text-blue-600 transition-colors cursor-pointer">{post.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">{post.body}</p>
                      <div className="flex items-center gap-5 text-xs text-slate-400">
                        <button onClick={() => navigate(ROUTES.SIGNUP)} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" /> {post.comments} comments
                        </button>
                        <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {post.views} views</span>
                        <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors ml-auto">
                          <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500 font-semibold">No discussions match your search.</p>
                </div>
              )}
              <div className="text-center pt-4">
                <button onClick={() => navigate(ROUTES.SIGNUP)} className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline">
                  Load more discussions <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="cta-final-card text-center">
            <div className="cta-orb cta-orb-1" />
            <div className="cta-orb cta-orb-2" />
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-5">Join 500K+ Learners</h2>
              <p className="text-blue-100/75 text-lg mb-10 max-w-lg mx-auto">
                Create your free account to join live rooms, connect with native speakers, and post in the forum.
              </p>
              <button onClick={() => navigate(ROUTES.SIGNUP)} className="hero-btn-primary gap-2 inline-flex">
                <Users className="w-4 h-4" /> Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default Community;

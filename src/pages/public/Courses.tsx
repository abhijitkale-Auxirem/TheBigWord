import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { ROUTES } from '@/constants/routes';
import {
  BookOpen, Mic, FileText, GraduationCap, Users, Clock,
  Star, Play, ChevronRight, Sparkles, Globe, Filter,
  Zap, CheckCircle, TrendingUp, BarChart3, Award, Target,
  Search, ArrowRight, Flame, Brain, Languages,Flag,Briefcase
} from 'lucide-react';
type FilterTag = 'All' | 'Speaking' | 'Grammar' | 'Exam Prep' | 'Vocabulary' | 'Business' | 'Beginner' | 'Advanced';
type Level = 'Beginner' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';

interface Course {
  id: number; title: string; subtitle: string;
  instructor: string; initials: string; level: Level;
  tags: FilterTag[]; language: string; flag: string;
  progress: number; lessons: number; completedLessons: number;
  hours: string; students: string; rating: number; reviews: number;
  price: string; originalPrice: string; gradient: string; accentColor: string;
  badge?: string; badgeBg?: string; enrolled?: boolean;
}

const FILTER_TAGS: { id: FilterTag; icon: React.ElementType; color: string }[] = [
  { id: 'All',        icon: Globe,          color: '#64748b' },
  { id: 'Speaking',   icon: Mic,            color: '#8b5cf6' },
  { id: 'Grammar',    icon: FileText,       color: '#3b82f6' },
  { id: 'Exam Prep',  icon: GraduationCap,  color: '#ef4444' },
  { id: 'Vocabulary', icon: Brain,          color: '#f59e0b' },
  { id: 'Business',   icon: BarChart3,      color: '#10b981' },
  { id: 'Beginner',   icon: Target,         color: '#ec4899' },
  { id: 'Advanced',   icon: TrendingUp,     color: '#06b6d4' },
];

const COURSES: Course[] = [
  {
    id: 1, title: 'Business English Mastery', subtitle: 'Professional communication for global success',
    instructor: 'Dr. James Wright', initials: 'JW', level: 'Intermediate',
    tags: ['Speaking', 'Business', 'Grammar'], language: 'English', flag: '🇬🇧',
    progress: 68, lessons: 40, completedLessons: 27, hours: '18h 30m', students: '12.4K',
    rating: 4.9, reviews: 892, price: '$49', originalPrice: '$89',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    accentColor: '#3b82f6', badge: 'Bestseller', badgeBg: '#f59e0b', enrolled: true,
  },
  {
    id: 2, title: 'IELTS Band 8+ Mastery', subtitle: 'Achieve top scores with proven strategies',
    instructor: 'Sarah Mitchell', initials: 'SM', level: 'Advanced',
    tags: ['Exam Prep', 'Speaking', 'Grammar'], language: 'English', flag: '🇺🇸',
    progress: 35, lessons: 60, completedLessons: 21, hours: '32h 15m', students: '8.7K',
    rating: 4.8, reviews: 634, price: '$59', originalPrice: '$99',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    accentColor: '#10b981', badge: 'Top Rated', badgeBg: '#10b981', enrolled: true,
  },
  {
    id: 3, title: 'Spanish for Beginners', subtitle: 'Start speaking from your very first lesson',
    instructor: 'Maria Garcia', initials: 'MG', level: 'Beginner',
    tags: ['Speaking', 'Grammar', 'Beginner'], language: 'Spanish', flag: '🇪🇸',
    progress: 0, lessons: 30, completedLessons: 0, hours: '12h 00m', students: '21K',
    rating: 4.9, reviews: 1204, price: '$29', originalPrice: '$59',
    gradient: 'from-orange-500 via-red-500 to-rose-600',
    accentColor: '#f97316', badge: 'Most Popular', badgeBg: '#8b5cf6', enrolled: false,
  },
  {
    id: 4, title: 'Advanced Grammar Deep-Dive', subtitle: 'Master complex structures & nuanced usage',
    instructor: 'Prof. Lin Wei', initials: 'LW', level: 'Advanced',
    tags: ['Grammar', 'Advanced'], language: 'English', flag: '🇬🇧',
    progress: 0, lessons: 45, completedLessons: 0, hours: '22h 45m', students: '5.2K',
    rating: 4.7, reviews: 318, price: '$44', originalPrice: '$79',
    gradient: 'from-violet-600 via-purple-700 to-indigo-800',
    accentColor: '#8b5cf6', enrolled: false,
  },
  {
    id: 5, title: 'TOEFL iBT Complete Prep', subtitle: 'Full 4-skill coverage with AI-scored mocks',
    instructor: 'Yuki Tanaka', initials: 'YT', level: 'Upper-Intermediate',
    tags: ['Exam Prep', 'Speaking', 'Grammar'], language: 'English', flag: '🇺🇸',
    progress: 0, lessons: 55, completedLessons: 0, hours: '28h 10m', students: '6.1K',
    rating: 4.8, reviews: 445, price: '$55', originalPrice: '$95',
    gradient: 'from-cyan-500 via-sky-600 to-blue-700',
    accentColor: '#06b6d4', badge: 'New', badgeBg: '#3b82f6', enrolled: false,
  },
  {
    id: 6, title: 'Confident Speaking Lab', subtitle: 'Real-time AI feedback on pronunciation & fluency',
    instructor: 'Dr. Sarah Chen', initials: 'SC', level: 'Intermediate',
    tags: ['Speaking', 'Vocabulary'], language: 'English', flag: '🇬🇧',
    progress: 0, lessons: 25, completedLessons: 0, hours: '10h 30m', students: '9.3K',
    rating: 4.9, reviews: 721, price: '$39', originalPrice: '$69',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    accentColor: '#ec4899', enrolled: false,
  },
  {
    id: 7, title: 'Power Vocabulary Builder', subtitle: '2,000 words with spaced-repetition mastery system',
    instructor: 'Carlos Mendez', initials: 'CM', level: 'Beginner',
    tags: ['Vocabulary', 'Beginner', 'Grammar'], language: 'English', flag: '🇬🇧',
    progress: 0, lessons: 35, completedLessons: 0, hours: '15h 20m', students: '14.8K',
    rating: 4.8, reviews: 987, price: '$34', originalPrice: '$59',
    gradient: 'from-amber-500 via-orange-500 to-yellow-600',
    accentColor: '#f59e0b', badge: 'Free Trial', badgeBg: '#10b981', enrolled: false,
  },
  {
    id: 8, title: 'Mandarin for Absolute Beginners', subtitle: 'Tones, characters, pinyin — step by step',
    instructor: 'Mei Lin Zhang', initials: 'ML', level: 'Beginner',
    tags: ['Speaking', 'Grammar', 'Beginner'], language: 'Mandarin', flag: '🇨🇳',
    progress: 0, lessons: 28, completedLessons: 0, hours: '13h 00m', students: '7.6K',
    rating: 4.7, reviews: 432, price: '$39', originalPrice: '$69',
    gradient: 'from-red-600 via-rose-600 to-pink-700',
    accentColor: '#ef4444', enrolled: false,
  },
];

const STATS = [
  { value: '500+',  label: 'Expert Courses',    icon: BookOpen,      color: '#3b82f6' },
  { value: '150+',  label: 'Instructors',        icon: Users,         color: '#8b5cf6' },
  { value: '500K+', label: 'Students Enrolled',  icon: GraduationCap, color: '#10b981' },
  { value: '4.8★',  label: 'Average Rating',     icon: Star,          color: '#f59e0b' },
];

const LEVEL_COLOR: Record<Level, string> = {
  'Beginner':           'bg-emerald-100 text-emerald-700',
  'Intermediate':       'bg-blue-100 text-blue-700',
  'Upper-Intermediate': 'bg-violet-100 text-violet-700',
  'Advanced':           'bg-red-100 text-red-700',
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

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
      ))}
    </div>
  );
}

function ProgressRing({ pct, color }: { pct: number; color: string }) {
  const r = 22, circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;
  return (
    <svg width="56" height="56" className="-rotate-90">
      <circle cx="28" cy="28" r={r} strokeWidth="4" stroke="#ffffff30" fill="none" />
      <circle cx="28" cy="28" r={r} strokeWidth="4" stroke={color} fill="none"
        strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
}

function CourseCard({ course, idx, visible }: { course: Course; idx: number; visible: boolean }) {
  const navigate = useNavigate();
  const remainingH = Math.ceil(parseFloat(course.hours) * ((course.lessons - course.completedLessons) / course.lessons));

  return (
    <div
      className={`group bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col
        hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${idx * 70}ms` }}
    >
      {/* Thumbnail */}
      <div className={`relative bg-gradient-to-br ${course.gradient} p-6 overflow-hidden`}>
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-8 w-16 h-16 bg-black/10 rounded-full blur-xl" />

        {course.badge && (
          <span className="absolute top-4 right-4 text-[10px] font-extrabold text-white px-2.5 py-1 rounded-full"
            style={{ background: course.badgeBg }}>{course.badge}</span>
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{course.flag}</span>
          <span className="text-xs font-bold text-white/80 bg-white/15 px-2.5 py-0.5 rounded-full">{course.language}</span>
        </div>

        <div className="flex items-end justify-between">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${LEVEL_COLOR[course.level]}`}>
            {course.level}
          </span>
          {course.enrolled ? (
            <div className="relative">
              <ProgressRing pct={course.progress} color="#fff" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-extrabold text-xs">{course.progress}%</span>
              </div>
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-sm leading-snug text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{course.title}</h3>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{course.subtitle}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {course.tags.slice(0, 2).map(tag => {
            const tf = FILTER_TAGS.find(f => f.id === tag);
            return (
              <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{ background: `${tf?.color}18`, color: tf?.color }}>
                {tf && <tf.icon className="w-2.5 h-2.5" />}
                {tag}
              </span>
            );
          })}
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
            {course.initials}
          </div>
          <span className="text-xs text-slate-500 truncate">{course.instructor}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.hours}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRow rating={course.rating} />
          <span className="text-[11px] font-bold text-amber-600">{course.rating}</span>
          <span className="text-[11px] text-slate-400">({course.reviews})</span>
        </div>

        {/* Completion estimate (enrolled) */}
        {course.enrolled && course.progress > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 mb-3">
            <Target className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span className="text-[11px] text-blue-700 font-semibold">
              ~{remainingH}h to complete · {course.lessons - course.completedLessons} lessons left
            </span>
          </div>
        )}

        {/* Progress bar */}
        {course.enrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>{course.completedLessons}/{course.lessons} lessons</span>
              <span className="font-semibold text-blue-600">{course.progress}% done</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${course.progress}%`, background: course.accentColor }} />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          {!course.enrolled && (
            <div>
              <span className="font-heading font-extrabold text-xl" style={{ color: course.accentColor }}>{course.price}</span>
              <span className="text-xs text-slate-400 line-through ml-1.5">{course.originalPrice}</span>
            </div>
          )}
          <button
            onClick={() => navigate(ROUTES.SIGNUP)}
            className={`flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2.5 rounded-xl transition-all hover:opacity-90 hover:scale-105 ${course.enrolled ? 'w-full justify-center' : ''}`}
            style={{ background: `linear-gradient(135deg, ${course.accentColor}, ${course.accentColor}cc)` }}
          >
            {course.enrolled
              ? <><Play className="w-3 h-3 fill-white" /> Continue Learning</>
              : <><Zap className="w-3 h-3" /> Start Learning</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState<FilterTag>('All');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const statsReveal = useReveal();
  const gridReveal  = useReveal();
  const ctaReveal   = useReveal();

  const filtered = COURSES.filter(c => {
    const matchTag = activeTag === 'All' || c.tags.includes(activeTag);
    const matchQ   = !query || c.title.toLowerCase().includes(query.toLowerCase()) || c.subtitle.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQ;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.id - a.id;
    return parseFloat(b.students) - parseFloat(a.students);
  });

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="hero-animated-bg relative pt-28 pb-28 overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-blue-200 mb-7 animate-fade-in">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            500+ courses across 50+ languages
          </div>
          <h1 className="font-heading font-extrabold text-5xl lg:text-7xl text-white mb-6 animate-fade-in delay-100 leading-[1.05]">
            Learn a Language<br />
            <span className="hero-gradient-text">The Smart Way</span>
          </h1>
          <p className="text-xl text-blue-100/75 mb-10 max-w-2xl mx-auto animate-fade-in delay-200">
            Expert-led courses with AI feedback, live speaking labs, and industry-recognized certifications.
          </p>
          {/* Search */}
          <div className="max-w-2xl mx-auto relative animate-fade-in delay-300">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by language, skill, or topic..."
              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white text-sm font-medium outline-none shadow-2xl placeholder:text-slate-400 text-slate-800" />
            {query && <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700">Clear</button>}
          </div>
          {/* Quick tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in delay-400">
            {['IELTS Prep', 'Business English', 'Spanish', 'Speaking Confidence', 'Pronunciation'].map(t => (
              <button key={t} onClick={() => setQuery(t.split(' ')[0])}
                className="text-xs font-semibold text-white/75 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full hover:bg-white/20 hover:text-white transition-all">
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" className="w-full" preserveAspectRatio="none">
            <defs><linearGradient id="cwg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="1" />
            </linearGradient></defs>
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="url(#cwg)" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-50 py-14 -mt-px">
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

      {/* FILTERS + GRID */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tags */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {FILTER_TAGS.map(tag => (
              <button key={tag.id} onClick={() => setActiveTag(tag.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                  activeTag === tag.id ? 'text-white shadow-lg border-transparent' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                }`}
                style={activeTag === tag.id ? { background: tag.color, boxShadow: `0 8px 24px ${tag.color}40` } : {}}>
                <tag.icon className="w-4 h-4" />{tag.id}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-800">{filtered.length}</span> courses
              {activeTag !== 'All' && <span className="text-blue-600"> in "{activeTag}"</span>}
            </p>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">Sort:</span>
              {(['popular', 'rating', 'newest'] as const).map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    sortBy === s ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300'
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div ref={gridReveal.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((course, i) => <CourseCard key={course.id} course={course} idx={i} visible={gridReveal.vis} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <BookOpen className="w-14 h-14 mx-auto mb-5 text-slate-300" />
              <h3 className="font-heading font-bold text-xl text-slate-700 mb-2">No courses found</h3>
              <p className="text-slate-400 mb-6">Try a different keyword or remove active filters.</p>
              <button onClick={() => { setQuery(''); setActiveTag('All'); }} className="text-sm font-bold text-blue-600 hover:underline">Reset all filters</button>
            </div>
          )}
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 mb-4">
              <Award className="w-3 h-3" /> Curated Learning Paths
            </span>
            <h2 className="font-heading font-bold text-4xl mt-3">Not sure where to start?</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">Follow a structured path from zero to certified fluent.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { emoji: '', title: 'Zero to Conversational', desc: '8 weeks, 3 courses — go from complete beginner to holding real conversations.', color: '#10b981', lessons: 93, weeks: 8 },
              { emoji: '', title: 'IELTS Band 7+ Track', desc: 'Targeted 12-week exam preparation with mock tests and AI scoring.', color: '#3b82f6', lessons: 115, weeks: 12 },
              { emoji: '', title: 'Business English Sprint', desc: 'Professional communication mastery in 6 weeks for working professionals.', color: '#8b5cf6', lessons: 75, weeks: 6 },
            ].map(path => (
              <div key={path.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(ROUTES.SIGNUP)}>
                <div className="text-3xl mb-4">{path.emoji}</div>
                <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{path.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{path.desc}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-5">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{path.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{path.weeks} weeks</span>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-white px-4 py-2.5 rounded-xl w-full justify-center"
                  style={{ background: path.color }}>
                  <ArrowRight className="w-3.5 h-3.5" /> Start Path
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaReveal.ref} className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className={`cta-final-card transition-all duration-700 ${ctaReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="cta-orb cta-orb-1" />
            <div className="cta-orb cta-orb-2" />
            <div className="relative z-10 text-center">
              <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-5">Start Learning Today — Free</h2>
              <p className="text-blue-100/75 text-lg mb-10 max-w-xl mx-auto">No credit card needed. 7-day free trial of all Pro courses. Cancel anytime.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate(ROUTES.SIGNUP)} className="hero-btn-primary gap-2 inline-flex">
                  <Sparkles className="w-4 h-4" /> Explore All Courses Free
                </button>
                <Link to={ROUTES.PRICING} className="hero-btn-secondary gap-2 inline-flex items-center justify-center">
                  View Pricing <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default Courses;

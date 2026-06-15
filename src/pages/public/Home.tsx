import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ROUTES } from '@/constants/routes';
import {
  Globe, BookOpen, Mic, FileText, Users,
  Star, ArrowRight, CheckCircle, Zap, Brain,
  Languages, GraduationCap, Building2, ChevronRight, Play,
  Shield, Clock, Award, Sparkles, Target, Heart, Rocket,
  Newspaper, TrendingUp, MessageCircle, Info, DollarSign, Briefcase
} from 'lucide-react';


/* ─── Data ──────────────────────────────────────────────────────────── */

const FEATURES = [
  { 
    icon: Brain, 
    title: 'AI Vocabulary Builder', 
    desc: 'Smart flashcards with spaced repetition and context-based word learning powered by GPT-4.', 
    color: '#3b82f6', 
    bg: '#eff6ff', 
    badge: 'Most Popular',
    details: [
      'Smart flashcards adapted dynamically based on your learning speed.',
      'Spaced repetition algorithm (SRS) ensures long-term memory retention.',
      'Generates contextual example sentences and high-fidelity speech audios.',
      'Import vocabulary lists from articles or text files instantly.'
    ]
  },
  { 
    icon: Mic, 
    title: 'AI Conversation Coach', 
    desc: 'Practice speaking with AI in real-time. Mock interviews, business scenarios, and daily chats.', 
    color: '#8b5cf6', 
    bg: '#f5f3ff', 
    badge: null,
    details: [
      'Real-time voice analysis with immediate feedback on pronunciation.',
      'Tailored roleplay scenarios including job interviews and shopping.',
      'Grammar checks highlight errors and offer correct alternatives.',
      'Customizable AI speech rates and native regional accents.'
    ]
  },
  { 
    icon: Languages, 
    title: 'Translation Platform', 
    desc: 'Text, voice, and document translation across 50+ languages with blazing accuracy.', 
    color: '#10b981', 
    bg: '#ecfdf5', 
    badge: 'New',
    details: [
      'Multi-modal translation: text, audio files, and complete documents.',
      'Advanced vocabulary sensitivity to retain industry-specific slang.',
      'Instant side-by-side comparison for fine-tuning translations.',
      'Offline saving options for continuous learning on-the-go.'
    ]
  },
  { 
    icon: FileText, 
    title: 'Writing Studio', 
    desc: 'AI-powered grammar checker, content writer, email assistant, and tone optimizer.', 
    color: '#f59e0b', 
    bg: '#fffbeb', 
    badge: null,
    details: [
      'Smart grammar checking for correct spelling and syntax alignment.',
      'Tone adjustments (e.g. formal, friendly, technical) for emails.',
      'Co-writing assistant helps complete paragraphs and phrasing.',
      'Instant synonym and vocabulary lookup inside the active editor.'
    ]
  },
  { 
    icon: GraduationCap, 
    title: 'Certification Center', 
    desc: 'Mock IELTS, TOEFL, PTE with AI-scored results and digital certificate issuance.', 
    color: '#ef4444', 
    bg: '#fef2f2', 
    badge: null,
    details: [
      'Full-length mock exams for IELTS, TOEFL, and PTE formats.',
      'AI grading delivers sectional feedback (listening, writing, speaking).',
      'Downloadable verified digital certificates of completion.',
      'Progress metrics mapping to standard CEFR tiers (A1 to C2).'
    ]
  },
  { 
    icon: Users, 
    title: 'Tutor Marketplace', 
    desc: 'Connect with native speakers and expert tutors for personalized 1-on-1 sessions.', 
    color: '#ec4899', 
    bg: '#fdf2f8', 
    badge: null,
    details: [
      'Directory of certified native speakers across 30+ countries.',
      'Easy booking system to select sessions matching your schedule.',
      'Embedded video and whiteboard tools for classroom calls.',
      'Session summaries and notes archived in your student dashboard.'
    ]
  },
];

const STATS = [
  { value: '500K+', label: 'Active Learners', icon: Users },
  { value: '50+', label: 'Languages Supported', icon: Globe },
  { value: '10K+', label: 'Expert Tutors', icon: GraduationCap },
  { value: '98%', label: 'Satisfaction Rate', icon: Heart },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Software Engineer at Google', text: 'TheBigWord helped me ace my business English. The AI coach is phenomenal — it feels like talking to a real mentor who knows exactly what I need.', rating: 5, avatar: 'PS', lang: 'English → Fluent', country: '🇮🇳' },
  { name: 'Carlos Mendez', role: 'Marketing Director', text: 'The vocabulary builder is addictive. I have learned over 1,200 new words in just 3 months using the smart flashcards with spaced repetition.', rating: 5, avatar: 'CM', lang: 'Business English', country: '🇲🇽' },
  { name: 'Yuki Tanaka', role: 'Graduate Student', text: 'Passed my IELTS with Band 8 after just 2 months of mock tests on TheBigWord. The feedback is incredibly detailed and actionable.', rating: 5, avatar: 'YT', lang: 'IELTS Band 8', country: '🇯🇵' },
  { name: 'Amara Osei', role: 'Product Manager', text: 'The translation platform saved our team hours every week. Accurate, fast, and handles technical jargon perfectly. Absolutely essential tool.', rating: 5, avatar: 'AO', lang: '6 Languages', country: '🇬🇭' },
  { name: 'Sophie Laurent', role: 'Language Teacher', text: 'As an educator, the certification tools are a game-changer. I can issue official certificates and track student progress in one place.', rating: 5, avatar: 'SL', lang: 'Course Creator', country: '🇫🇷' },
  { name: 'Raj Patel', role: 'Entrepreneur', text: 'Closed my first international deal after 3 months of Business English coaching. The ROI is incredible. My team uses it company-wide now.', rating: 5, avatar: 'RP', lang: 'Business English', country: '🇦🇪' },
];

const USER_TYPES = [
  { icon: BookOpen, title: 'Students', desc: 'Ace exams, build vocabulary, improve writing skills with AI tutoring', gradient: 'from-blue-600 to-indigo-700', accent: '#3b82f6' },
  { icon: Building2, title: 'Professionals', desc: 'Business English, presentations, and corporate communication mastery', gradient: 'from-emerald-500 to-teal-600', accent: '#10b981' },
  { icon: Users, title: 'Corporates', desc: 'Upskill entire teams, track progress, and measure workforce improvement', gradient: 'from-violet-600 to-purple-700', accent: '#8b5cf6' },
  { icon: GraduationCap, title: 'Educators', desc: 'Create courses, conduct classes, and issue certified completions', gradient: 'from-orange-500 to-amber-600', accent: '#f59e0b' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Your Profile', desc: 'Tell us your language goals, current level, and learning style. Our AI builds a personalized roadmap in under 60 seconds.', icon: Target },
  { step: '02', title: 'Learn with AI', desc: 'Practice daily with adaptive vocabulary drills, conversation simulations, and writing exercises powered by cutting-edge AI.', icon: Brain },
  { step: '03', title: 'Get Certified', desc: 'Take mock exams, earn verified digital certificates, and share your achievements with employers worldwide.', icon: Award },
];

const PRICING_PLANS = [
  {
    name: 'Free', price: '$0', period: 'forever',
    desc: 'Perfect for casual learners getting started.',
    color: '#64748b',
    features: ['100 vocabulary cards/month', 'Basic AI conversations (5/day)', '5 translations/day', 'Community access'],
    cta: 'Start Free', popular: false,
  },
  {
    name: 'Pro', price: '$12', period: '/month',
    desc: 'The complete toolkit for serious language mastery.',
    color: '#3b82f6',
    features: ['Unlimited vocabulary', 'Unlimited AI coaching', 'Unlimited translations', 'Mock exams (IELTS/TOEFL/PTE)', 'Writing Studio', '1 tutor session/month', 'Digital certificates'],
    cta: 'Start 7-Day Free Trial', popular: true,
  },
  {
    name: 'Teams', price: '$8', period: '/user/month',
    desc: 'Supercharge your organization\'s language skills.',
    color: '#8b5cf6',
    features: ['Everything in Pro', 'Team analytics dashboard', 'Custom learning programs', 'Dedicated account manager', 'API access', 'SSO integration', 'Priority support'],
    cta: 'Contact Sales', popular: false,
  },
];

const LANGUAGES_SHOWCASE = [
  { flag: '🇺🇸', name: 'English', learners: '340K' },
  { flag: '🇪🇸', name: 'Spanish', learners: '89K' },
  { flag: '🇫🇷', name: 'French', learners: '67K' },
  { flag: '🇩🇪', name: 'German', learners: '45K' },
  { flag: '🇯🇵', name: 'Japanese', learners: '38K' },
  { flag: '🇨🇳', name: 'Mandarin', learners: '51K' },
  { flag: '🇦🇪', name: 'Arabic', learners: '29K' },
  { flag: '🇰🇷', name: 'Korean', learners: '33K' },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'SOC 2 Certified', desc: 'Enterprise-grade security' },
  { icon: Award, label: 'ISO 27001', desc: 'Data protection standard' },
  { icon: Globe, label: 'GDPR Compliant', desc: 'EU data regulation' },
  { icon: Clock, label: '99.9% Uptime', desc: 'SLA guaranteed' },
];

/* ─── Intersection Observer Hook ──────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.15em] bg-primary/8 px-3 py-1.5 rounded-full border border-primary/15">
      <Sparkles className="w-3 h-3" />
      {children}
    </span>
  );
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<typeof FEATURES[number] | null>(null);

  const featuresReveal = useReveal();
  const howReveal = useReveal();
  const forWhoReveal = useReveal();
  const testimonialsReveal = useReveal();
  const langReveal = useReveal();
  const pricingReveal = useReveal();
  const trustReveal = useReveal();
  const exploreReveal = useReveal();

  return (
    <PublicLayout>

      {/* ═══ 1. HERO ════════════════════════════════════════════════════ */}
      <section id="home" className="hero-animated-bg relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Pure CSS animated learning scene */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Grid mesh */}
          <div className="hero-grid" />
          {/* Ambient glow orbs */}
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          {/* Orbit rings */}
          <div className="hero-ring hero-ring-1" />
          <div className="hero-ring hero-ring-2" />
          {/* Floating letter / word nodes */}
          {[
            { char: 'A', x: '12%', y: '20%', delay: '0s',   size: 'lg', color: '#60a5fa' },
            { char: '文', x: '78%', y: '15%', delay: '0.6s', size: 'xl', color: '#a78bfa' },
            { char: 'B', x: '88%', y: '55%', delay: '1.2s', size: 'md', color: '#34d399' },
            { char: 'ñ', x: '5%',  y: '62%', delay: '0.4s', size: 'lg', color: '#f472b6' },
            { char: 'あ', x: '65%', y: '80%', delay: '1.8s', size: 'xl', color: '#fbbf24' },
            { char: 'ع', x: '30%', y: '85%', delay: '0.9s', size: 'lg', color: '#60a5fa' },
            { char: 'Z', x: '50%', y: '10%', delay: '1.4s', size: 'md', color: '#a78bfa' },
            { char: '한', x: '92%', y: '28%', delay: '0.2s', size: 'md', color: '#34d399' },
          ].map((node, i) => (
            <div
              key={i}
              className={`hero-node hero-node-${node.size}`}
              style={{
                left: node.x, top: node.y,
                animationDelay: node.delay,
                color: node.color,
                borderColor: `${node.color}40`,
                background: `${node.color}12`,
                boxShadow: `0 0 20px ${node.color}25`,
              }}
            >
              {node.char}
            </div>
          ))}
          {/* Connecting dotted lines (SVG) */}
          <svg className="hero-connections" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
            <line x1="144" y1="140" x2="780" y2="105" className="hero-conn-line" style={{ animationDelay: '0s' }} />
            <line x1="780" y1="105" x2="1056" y2="385" className="hero-conn-line" style={{ animationDelay: '0.4s' }} />
            <line x1="60" y1="434" x2="360" y2="595" className="hero-conn-line" style={{ animationDelay: '0.8s' }} />
            <line x1="1104" y1="196" x2="600" y2="70" className="hero-conn-line" style={{ animationDelay: '1.2s' }} />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="animate-fade-in">
              <div className="hero-badge">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>AI-Powered Language Mastery Platform</span>
                <span className="hero-badge-dot" />
                <span className="text-white/60">500K+ Learners</span>
              </div>

              <h1 className="font-heading font-extrabold text-5xl lg:text-7xl text-white leading-[1.05] mb-6 mt-6">
                Speak Every<br />
                <span className="hero-gradient-text">Language</span><br />
                <span className="text-white/90">Fluently.</span>
              </h1>

              <p className="text-lg lg:text-xl text-blue-100/80 leading-relaxed mb-10 max-w-lg">
                Master vocabulary, practice with AI coaches, earn certifications, and connect with tutors from 150+ countries. Your journey starts today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  size="lg"
                  id="hero-cta-primary"
                  onClick={() => navigate(ROUTES.SIGNUP)}
                  className="hero-btn-primary gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  Start Learning Free
                </Button>
                <button
                  id="hero-cta-demo"
                  className="hero-btn-secondary gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Watch Demo
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {['No credit card required', 'Free forever plan', '50+ languages'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-blue-200/70">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: floating UI card */}
            <div className="hidden lg:flex flex-col gap-4 animate-fade-in-right delay-300">
              <div className="hero-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Daily Vocab Streak</div>
                    <div className="text-blue-300/70 text-xs">5 days in a row 🔥</div>
                  </div>
                  <div className="ml-auto text-2xl font-bold text-white">+12</div>
                </div>
                <div className="flex gap-2">
                  {['Eloquent', 'Pragmatic', 'Nuance', 'Verbose'].map((w, i) => (
                    <span key={w} className={`hero-word-chip ${i === 0 ? 'chip-active' : ''}`}>{w}</span>
                  ))}
                </div>
              </div>

              <div className="hero-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">AI</div>
                <div className="flex-1">
                  <div className="text-white/90 text-sm mb-2">"Practice sentence: <em>The proposal was <strong className="text-blue-300">eloquently</strong> presented."</em></div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 text-xs font-medium">AI Coach Listening…</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {STATS.slice(0, 3).map(stat => (
                  <div key={stat.label} className="hero-stat-chip">
                    <stat.icon className="w-4 h-4 text-blue-300 mb-1" />
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-blue-300/60 text-[10px]">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Floating language bubbles */}
              <div className="flex flex-wrap gap-2 mt-1">
                {['Bonjour', 'مرحبا', '你好', 'Hola', 'नमस्ते', 'Ciao'].map((word, i) => (
                  <div
                    key={word}
                    className="hero-lang-bubble animate-float"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full fill-white" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ═══ 2. STATS BAR ════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item animate-fade-in-scale"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="stat-icon-wrap">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-heading font-extrabold text-4xl lg:text-5xl text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. FEATURES ═════════════════════════════════════════════════ */}
      <section id="features" className="py-24 section-bg-alt relative overflow-hidden">
        <div className="section-blob blob-1" />
        <div className="section-blob blob-2" />
        <div ref={featuresReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-700 ${featuresReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Platform Features</SectionLabel>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-4 mb-4">
              Everything You Need to<br />
              <span className="text-gradient">Master Any Language</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI-powered vocabulary to live tutor sessions — TheBigWord is your complete language ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className={`feature-card transition-all duration-700 ${featuresReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {feature.badge && (
                  <span className="feature-badge" style={{ background: `${feature.color}18`, color: feature.color }}>
                    {feature.badge}
                  </span>
                )}
                <div
                  className="feature-icon-wrap"
                  style={{ background: feature.bg, color: feature.color }}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 mt-4">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                <div 
                  className="flex items-center gap-1.5 mt-5 text-sm font-semibold group cursor-pointer" 
                  style={{ color: feature.color }}
                  onClick={() => setActiveFeature(feature)}
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. HOW IT WORKS ════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div ref={howReveal.ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${howReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-4 mb-4">
              From Zero to Fluent in<br />
              <span className="text-gradient">3 Simple Steps</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our AI-powered platform adapts to your level and goals, making progress feel natural and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />

            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.step}
                className={`how-card transition-all duration-700 ${howReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="how-step-num">{step.step}</div>
                <div className="how-icon-wrap">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 mt-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. WHO IT'S FOR ═════════════════════════════════════════════ */}
      <section id="courses" className="py-24 section-bg-alt relative overflow-hidden">
        <div ref={forWhoReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${forWhoReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>For Everyone</SectionLabel>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-4 mb-4">Built for Every Learner</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you're a student, professional, or organization — TheBigWord adapts to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USER_TYPES.map((type, i) => (
              <div
                key={type.title}
                onClick={() => navigate(ROUTES.SIGNUP)}
                className={`user-type-card cursor-pointer transition-all duration-700 ${forWhoReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${type.gradient} p-8 text-white h-full rounded-2xl flex flex-col`}>
                  <div className="user-type-icon">
                    <type.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mt-5 mb-3">{type.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed flex-1">{type.desc}</p>
                  <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-white/90 group">
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. LANGUAGES SHOWCASE ════════════════════════════════════ */}
     <section className="py-24 bg-white relative overflow-hidden">
  <div ref={langReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className={`text-center mb-16 transition-all duration-1000 ease-out ${langReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <SectionLabel>Languages</SectionLabel>
      <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-4 mb-4">
        50+ Languages,<br />
        <span className="text-gradient">One Platform</span>
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        The world's most spoken languages, all with native-speaker quality AI training data.
      </p>
    </div>

    {/* Enhanced 3D Grid container with perspective for depth */}
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5 [perspective:1200px]">
      {LANGUAGES_SHOWCASE.map((lang, i) => (
        <div
          key={lang.name}
          className={`group relative p-5 rounded-2xl bg-white border border-slate-200/80 text-center transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:border-blue-300 cursor-pointer ${
            langReveal.visible 
              ? 'opacity-100 scale-100 translate-y-0 [transform:rotateX(0deg)]' 
              : 'opacity-0 scale-90 translate-y-16 [transform:rotateX(45deg)]'
          }`}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          {/* Subtle gradient background reveal on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
          
          {/* Flag with an ultra-smooth 3D pop and spin */}
          <div className="relative z-10 text-4xl mb-3 inline-block transition-all duration-700 ease-in-out group-hover:scale-125 group-hover:[transform:rotateY(360deg)] drop-shadow-sm group-hover:drop-shadow-md">
            {lang.flag}
          </div>
          
          {/* Typography interactions */}
          <div className="relative z-10 font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
            {lang.name}
          </div>
          <div className="relative z-10 mt-1.5 inline-flex">
            <span className="text-[11px] font-bold text-slate-400 bg-slate-50 group-hover:bg-blue-100 group-hover:text-blue-600 px-2.5 py-0.5 rounded-full transition-colors duration-300">
              {lang.learners}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Upgraded Call to Action Button */}
    <div className="text-center mt-14">
      <Link 
        to={ROUTES.SIGNUP} 
        className="group inline-flex items-center gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 px-7 py-3.5 rounded-full shadow-lg shadow-slate-900/10 hover:shadow-blue-600/25 hover:-translate-y-0.5 transition-all duration-300"
      >
        Explore All 50+ Languages 
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
</section>

      {/* ═══ 7. TESTIMONIALS ══════════════════════════════════════════ */}
      <section id="community" className="py-24 section-bg-alt relative overflow-hidden">
        <div className="section-blob blob-3" />
        <div ref={testimonialsReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${testimonialsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Success Stories</SectionLabel>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-4 mb-4">
              Real Results from<br />
              <span className="text-gradient">Real Learners</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <StarRow />
              <span className="font-semibold text-sm">4.9/5</span>
              <span className="text-muted-foreground text-sm">from 28,000+ reviews</span>
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`testimonial-card break-inside-avoid transition-all duration-700 ${testimonialsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <StarRow count={t.rating} />
                <p className="text-sm leading-relaxed text-foreground/80 mt-3 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="testimonial-avatar gradient-primary">
                    <span>{t.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{t.name} <span>{t.country}</span></div>
                    <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                  </div>
                  <span className="testimonial-lang-tag">{t.lang}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. PRICING ═══════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div ref={pricingReveal.ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${pricingReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-4 mb-4">
              Simple, Transparent<br />
              <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start free. Upgrade when you're ready. No hidden fees, no lock-in.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''} transition-all duration-700 ${pricingReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {plan.popular && (
                  <div className="pricing-popular-badge">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <span className="font-heading font-extrabold text-5xl" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-muted-foreground text-sm mb-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(ROUTES.SIGNUP)}
                  className={`pricing-btn w-full ${plan.popular ? 'pricing-btn-primary' : 'pricing-btn-outline'}`}
                  style={plan.popular ? {} : { borderColor: plan.color, color: plan.color }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. TRUST & SECURITY ═════════════════════════════════════ */}
      <section className="py-16 section-bg-alt">
        <div ref={trustReveal.ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${trustReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Trusted by Fortune 500 companies worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={badge.label}
                className={`trust-card transition-all duration-700 ${trustReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <badge.icon className="w-6 h-6 text-primary mb-2" />
                <div className="font-semibold text-sm">{badge.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. EXPLORE PAGES ═══════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="section-blob blob-1" style={{ opacity: 0.4 }} />
        <div ref={exploreReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${exploreReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Explore TheBigWord</SectionLabel>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-4 mb-4">
              Everything You Need,<br />
              <span className="text-gradient">All in One Place</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Dive deeper into our platform. From expert articles to world-class courses — explore what TheBigWord has to offer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Card */}
            <Link
              to={ROUTES.BLOG}
              className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${exploreReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />
              <div className="p-7 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  <Newspaper className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">Blog & Articles</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  Stay up-to-date with language learning tips, success stories, AI updates, and expert guides written by certified linguists.
                </p>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-blue-600">
                  <span>Read Articles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Courses Card */}
            <Link
              to={ROUTES.COURSES}
              className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${exploreReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '80ms' }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600" />
              <div className="p-7 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-emerald-600 transition-colors">Courses Catalog</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  Browse structured language courses from A1 to C2 — designed by certified educators and powered by adaptive AI.
                </p>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-emerald-600">
                  <span>Browse Courses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Community Card */}
            <Link
              to={ROUTES.COMMUNITY}
              className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${exploreReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '160ms' }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-violet-500 to-purple-700" />
              <div className="p-7 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
                  <MessageCircle className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-violet-600 transition-colors">Community Hub</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  Connect with 500K+ learners worldwide. Share your journey, find language exchange partners, and join live events.
                </p>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-violet-600">
                  <span>Join Community</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Pricing Card */}
            <Link
              to={ROUTES.PRICING}
              className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${exploreReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '240ms' }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-orange-600" />
              <div className="p-7 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-amber-600 transition-colors">Pricing Plans</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  From a free plan to enterprise solutions — see all our transparent pricing options with no hidden fees or commitments.
                </p>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-amber-600">
                  <span>View Pricing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* About Card */}
            <Link
              to={ROUTES.ABOUT}
              className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${exploreReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '320ms' }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-rose-500 to-pink-600" />
              <div className="p-7 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-5">
                  <Info className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-rose-600 transition-colors">About Us</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  Learn about our mission, the team behind TheBigWord, our core values, and why half a million learners trust us.
                </p>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-rose-600">
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Careers Card */}
            <Link
              to={ROUTES.CAREERS}
              className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${exploreReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-sky-600" />
              <div className="p-7 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-cyan-600 transition-colors">Careers</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  Join our remote-first team of linguists, AI engineers, and educators. Help shape the future of language learning.
                </p>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-cyan-600">
                  <span>See Open Roles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 11. FINAL CTA ════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="cta-final-card">
            {/* Decorative orbs */}
            <div className="cta-orb cta-orb-1" />
            <div className="cta-orb cta-orb-2" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm text-blue-100">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Join 500,000+ language learners today
              </div>
              <h2 className="font-heading font-bold text-4xl lg:text-6xl text-white mb-6">
                Start Your Language<br />Journey Today
              </h2>
              <p className="text-blue-100/75 text-lg mb-10 max-w-xl mx-auto">
                Free plan available. No credit card needed. Start speaking your target language in days, not years.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  id="cta-signup-btn"
                  onClick={() => navigate(ROUTES.SIGNUP)}
                  className="bg-white text-primary hover:bg-blue-50 font-bold text-base px-10 py-6 rounded-xl shadow-2xl gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Create Free Account
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="border-white/30 text-black hover:bg-white/10 backdrop-blur font-semibold text-base px-8 py-6 rounded-xl"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Details Modal */}
      <Dialog open={!!activeFeature} onOpenChange={(open) => !open && setActiveFeature(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl p-6 md:p-8 border border-border bg-white shadow-2xl">
          {activeFeature && (
            <div className="space-y-6">
              <DialogHeader className="text-left">
                <div className="flex items-center gap-3.5 mb-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-100"
                    style={{ background: activeFeature.bg, color: activeFeature.color }}
                  >
                    <activeFeature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    {activeFeature.badge && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full inline-block mb-1" style={{ background: `${activeFeature.color}15`, color: activeFeature.color }}>
                        {activeFeature.badge}
                      </span>
                    )}
                    <DialogTitle className="font-heading font-bold text-2xl text-slate-900 leading-tight">
                      {activeFeature.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-slate-600 text-sm leading-relaxed pt-2">
                  {activeFeature.desc}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <h4 className="font-heading font-bold text-xs text-slate-800 uppercase tracking-widest">Key Capabilities</h4>
                <div className="space-y-2.5">
                  {activeFeature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${activeFeature.color}15`, color: activeFeature.color }}>
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-slate-600 leading-relaxed font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    setActiveFeature(null);
                    navigate(ROUTES.SIGNUP);
                  }}
                  className="flex-1 text-center text-white font-bold py-3 px-6 rounded-xl hover:opacity-95 transition-opacity text-sm shadow-md"
                  style={{ background: activeFeature.color }}
                >
                  Start Learning Now
                </button>
                <button
                  onClick={() => setActiveFeature(null)}
                  className="border border-border text-slate-600 font-semibold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </PublicLayout>
  );
};

export default Home;

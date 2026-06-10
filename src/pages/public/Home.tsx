import React from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import {
  Globe, BookOpen, Mic, FileText, Trophy, Users, BarChart3,
  Star, ArrowRight, CheckCircle, Zap, Brain, MessageSquare,
  Languages, GraduationCap, Building2, ChevronRight
} from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const FEATURES = [
  { icon: <Brain className="w-6 h-6" />, title: 'AI Vocabulary Builder', desc: 'Smart flashcards and context-based word learning with spaced repetition.', color: 'bg-blue-100 text-blue-600' },
  { icon: <Mic className="w-6 h-6" />, title: 'AI Conversation Coach', desc: 'Practice speaking with AI in real-time. Mock interviews and business scenarios.', color: 'bg-indigo-100 text-indigo-600' },
  { icon: <Languages className="w-6 h-6" />, title: 'Translation Platform', desc: 'Text, voice, and document translation across 50+ languages instantly.', color: 'bg-emerald-100 text-emerald-600' },
  { icon: <FileText className="w-6 h-6" />, title: 'Writing Studio', desc: 'AI-powered grammar checker, content writer, and email assistant.', color: 'bg-purple-100 text-purple-600' },
  { icon: <GraduationCap className="w-6 h-6" />, title: 'Certification Center', desc: 'Mock IELTS, TOEFL, PTE tests with digital certificate issuance.', color: 'bg-orange-100 text-orange-600' },
  { icon: <Users className="w-6 h-6" />, title: 'Tutor Marketplace', desc: 'Connect with native speakers and expert tutors for 1-on-1 sessions.', color: 'bg-pink-100 text-pink-600' },
];

const STATS = [
  { value: '500K+', label: 'Active Learners' },
  { value: '50+', label: 'Languages Supported' },
  { value: '10K+', label: 'Expert Tutors' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Software Engineer', text: 'TheBigWord helped me ace my business English. The AI coach is phenomenal — it feels like talking to a real mentor.', rating: 5, avatar: 'P', lang: 'English → Fluent' },
  { name: 'Carlos Mendez', role: 'Marketing Director', text: 'The vocabulary builder is addictive. I have learned over 1,200 new words in just 3 months using the smart flashcards.', rating: 5, avatar: 'C', lang: 'Business English' },
  { name: 'Yuki Tanaka', role: 'Graduate Student', text: 'Passed my IELTS with Band 8 after just 2 months of mock tests on TheBigWord. Incredible practice material.', rating: 5, avatar: 'Y', lang: 'IELTS Band 8' },
];

const USER_TYPES = [
  { icon: <BookOpen className="w-6 h-6" />, title: 'Students', desc: 'Ace exams, build vocabulary, improve writing skills', color: 'gradient-primary' },
  { icon: <Building2 className="w-6 h-6" />, title: 'Professionals', desc: 'Business English, presentations, corporate communication', color: 'gradient-emerald' },
  { icon: <Users className="w-6 h-6" />, title: 'Corporates', desc: 'Upskill teams, track workforce language progress', color: 'gradient-card' },
  { icon: <GraduationCap className="w-6 h-6" />, title: 'Educators', desc: 'Create courses, conduct classes, issue certifications', color: 'gradient-gold' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="TheBigWord Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6 border border-white/20">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-white font-medium">AI-Powered Language Mastery Platform</span>
            </div>
            <h1 className="font-heading font-bold text-5xl lg:text-7xl text-white leading-tight mb-6">
              Speak Every<br />
              <span className="text-blue-300">Language</span><br />
              Fluently
            </h1>
            <p className="text-xl text-blue-100/90 leading-relaxed mb-8 max-w-xl">
              Master vocabulary, practice with AI coaches, earn certifications, and connect with tutors from 150+ countries. Your language journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.SIGNUP)}
                className="gradient-primary text-white border-0 text-base font-semibold px-8 py-6 rounded-xl hover:opacity-90 transition-opacity shadow-xl shadow-blue-500/30"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-base font-semibold px-8 py-6 rounded-xl backdrop-blur"
              >
                Sign In
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-8">
              {['No credit card required', 'Free forever plan', '50+ languages'].map(item => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-blue-100/80">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Floating word bubbles decoration */}
        <div className="absolute right-10 top-1/3 hidden xl:flex flex-col gap-3 opacity-80">
          {['Bonjour', 'مرحبا', '你好', 'Hola', 'नमस्ते'].map((word, i) => (
            <div
              key={word}
              className="glass-card px-4 py-2 rounded-full text-white text-sm font-medium animate-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {word}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="gradient-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center text-white">
                <div className="font-heading font-bold text-3xl lg:text-4xl mb-1">{stat.value}</div>
                <div className="text-sm text-blue-100/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Features</span>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mt-3 mb-4">
              Everything You Need to<br />
              <span className="text-gradient">Master Any Language</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI-powered vocabulary tools to live tutor sessions — TheBigWord is your complete language ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section id="courses" className="py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">For Everyone</span>
            <h2 className="font-heading font-bold text-4xl mt-3 mb-4">Built for Every Learner</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Whether you are a student, professional, or organization — TheBigWord adapts to your needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USER_TYPES.map(type => (
              <div
                key={type.title}
                className="group rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(ROUTES.SIGNUP)}
              >
                <div className={`${type.color} p-8 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    {type.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">{type.title}</h3>
                  <p className="text-sm text-white/80">{type.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium">
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Success Stories</span>
            <h2 className="font-heading font-bold text-4xl mt-3 mb-4">
              Real Results from Real <span className="text-gradient">Learners</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="p-6 rounded-2xl bg-brand-surface border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-5">{`"${t.text}"`}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">{t.lang}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="gradient-hero rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-4">
                Start Your Language<br />Journey Today
              </h2>
              <p className="text-blue-100/80 text-lg mb-8 max-w-xl mx-auto">
                Join 500,000+ learners already mastering languages with AI. Free plan available — no credit card needed.
              </p>
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.SIGNUP)}
                className="bg-white text-primary hover:bg-blue-50 font-semibold text-base px-10 py-6 rounded-xl shadow-xl"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;

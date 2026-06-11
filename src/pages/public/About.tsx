import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Globe, Users, Target, Heart, Award, ArrowRight, Sparkles } from 'lucide-react';

const STATS = [
  { value: '500K+', label: 'Active Learners' },
  { value: '50+', label: 'Languages Offered' },
  { value: '98%', label: 'Fluency Satisfaction' },
  { value: '120+', label: 'Expert Tutors' },
];

const VALUES = [
  {
    icon: <Target className="w-6 h-6 text-blue-500" />,
    title: 'Learner-Centric Pedagogy',
    desc: 'Every feature we build is designed to maximize active recall, contextual learning, and real-world conversation confidence.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-amber-500" />,
    title: 'AI-Empowered Human Connection',
    desc: 'We use state-of-the-art AI language models to support, not replace, real human interactions and professional tutoring.',
  },
  {
    icon: <Globe className="w-6 h-6 text-emerald-500" />,
    title: 'Global Inclusivity',
    desc: 'We believe language bridges cultures. Our platform represents diverse dialects, cultures, and learning styles.',
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    title: 'Uncompromising Quality',
    desc: 'From verified curriculum designers to strict tutor standards, we maintain high educational excellence.',
  },
];

const About: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white font-medium mb-6 animate-fade-in">
            <Globe className="w-4 h-4 text-blue-300" /> Connecting the World Through Language
          </div>
          <h1 className="font-heading font-bold text-5xl text-white mb-6 leading-tight animate-fade-in delay-100">
            Our Mission is to Make<br />
            <span className="text-blue-300">Fluency Accessible to Everyone</span>
          </h1>
          <p className="text-blue-100/80 text-lg mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
            TheBigWord combines advanced AI conversation coaching with a global marketplace of expert tutors to guide you from beginner to confident speaker.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-xl shadow-slate-100/50 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-heading font-black text-3xl md:text-4xl text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 max-w-5xl mx-auto sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
              Our Journey
            </div>
            <h2 className="font-heading font-bold text-3xl leading-tight">
              Bridging gaps, one conversation at a time.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Founded in 2024, TheBigWord started with a simple observation: traditional vocabulary drills and grammar exercises don't build conversation confidence. Learning a language requires active, low-stress speaking practice.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We set out to build an ecosystem that integrates custom AI agents with real-world tutor interactions. Today, hundreds of thousands of learners globally use TheBigWord to study for exams, prep for business meetings, or talk with relatives in their native tongue.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border aspect-video md:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
              alt="TheBigWord Collaborative Workspace" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="font-heading font-semibold text-lg">Work Together, Learn Together</div>
                <div className="text-xs text-blue-200">Our team operates remotely across 30+ countries.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-brand-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
              Values First
            </div>
            <h2 className="font-heading font-bold text-3xl">What Drives Us Every Day</h2>
            <p className="text-muted-foreground text-sm">
              Our core beliefs guide our features, tutor standards, and the supportive community we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((val, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-5">
                  {val.icon}
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Call To Action */}
      {/* <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="gradient-primary rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-400/20 rounded-full filter blur-2xl" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full filter blur-2xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">Want to Help Shape the Future?</h2>
            <p className="text-blue-100/90 text-sm leading-relaxed">
              We are always looking for passionate language pedagogical experts, AI/ML researchers, and full-stack software engineers.
            </p>
            <div className="flex justify-center pt-2">
              <Link
                to={ROUTES.CAREERS}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Join Our Remote Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </PublicLayout>
  );
};

export default About;

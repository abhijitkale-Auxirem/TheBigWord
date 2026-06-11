import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { ROUTES } from '@/constants/routes';
import {
  CheckCircle, XCircle, Sparkles, Zap, Users, Globe,
  GraduationCap, Star, ArrowRight, HelpCircle, ChevronDown,
  ChevronUp, BookOpen, Shield, Clock, Award, Rocket,
  Brain, Mic, FileText, BarChart3, Building2, BadgeCheck,
  Headphones
} from 'lucide-react';

interface Plan {
  id: string; name: string; tagline: string;
  monthly: string; annual: string; annualTotal: string;
  color: string; icon: React.ElementType;
  cta: string; ctaRoute: string;
  popular: boolean; enterprise: boolean;
}

interface FeatureGroup {
  group: string; icon: React.ElementType; color: string;
  features: { label: string; free: string | boolean; pro: string | boolean; enterprise: string | boolean }[];
}

const PLANS: Plan[] = [
  {
    id: 'free', name: 'Free Forever', tagline: 'Get started with no commitment',
    monthly: '$0', annual: '$0', annualTotal: '$0/year',
    color: '#64748b', icon: BookOpen,
    cta: 'Start Free — No Card', ctaRoute: ROUTES.SIGNUP,
    popular: false, enterprise: false,
  },
  {
    id: 'pro', name: 'Premium Pro', tagline: 'The complete language mastery toolkit',
    monthly: '$14', annual: '$9', annualTotal: '$108/year',
    color: '#3b82f6', icon: Zap,
    cta: 'Start 7-Day Free Trial', ctaRoute: ROUTES.SIGNUP,
    popular: true, enterprise: false,
  },
  {
    id: 'enterprise', name: 'Enterprise Fleet', tagline: 'Power an entire organisation',
    monthly: 'Custom', annual: 'Custom', annualTotal: 'Volume pricing',
    color: '#8b5cf6', icon: Building2,
    cta: 'Talk to Sales', ctaRoute: ROUTES.CONTACT,
    popular: false, enterprise: true,
  },
];

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    group: 'Core Learning', icon: Brain, color: '#3b82f6',
    features: [
      { label: 'Vocabulary flashcards',        free: '100 / month',         pro: 'Unlimited',          enterprise: 'Unlimited' },
      { label: 'AI conversation sessions',     free: '5 / day',             pro: 'Unlimited',          enterprise: 'Unlimited' },
      { label: 'Translation (languages)',      free: '5/day · 10 langs',    pro: 'Unlimited · 50+',    enterprise: 'Unlimited · 50+' },
      { label: 'Spaced-repetition engine',     free: 'Basic',               pro: 'Advanced AI',        enterprise: 'Advanced AI' },
      { label: 'Personalised learning path',   free: false,                 pro: true,                 enterprise: true },
    ],
  },
  {
    group: 'Speaking & Pronunciation', icon: Mic, color: '#8b5cf6',
    features: [
      { label: 'AI speaking coach',            free: false,                 pro: true,                 enterprise: true },
      { label: 'Real-time pronunciation AI',   free: false,                 pro: true,                 enterprise: true },
      { label: 'Live room access',             free: 'Read-only',           pro: 'Full',               enterprise: 'Full + Private' },
      { label: 'Native speaker sessions',      free: false,                 pro: '1 / month',          enterprise: 'Unlimited' },
    ],
  },
  {
    group: 'Exams & Certifications', icon: GraduationCap, color: '#10b981',
    features: [
      { label: 'Mock exams (IELTS/TOEFL/PTE)', free: '1 / month',           pro: 'Unlimited',          enterprise: 'Unlimited' },
      { label: 'AI-scored writing tasks',      free: false,                 pro: true,                 enterprise: true },
      { label: 'Digital certificates',         free: false,                 pro: true,                 enterprise: 'Branded certs' },
      { label: 'Certificate management',       free: false,                 pro: 'Self-service',       enterprise: 'Bulk + API' },
    ],
  },
  {
    group: 'Writing & Content', icon: FileText, color: '#f59e0b',
    features: [
      { label: 'Writing Studio',               free: false,                 pro: true,                 enterprise: true },
      { label: 'Grammar checker',              free: 'Basic',               pro: 'Advanced AI',        enterprise: 'Advanced AI' },
      { label: 'Email assistant',              free: false,                 pro: true,                 enterprise: true },
      { label: 'Tone optimizer',               free: false,                 pro: true,                 enterprise: true },
    ],
  },
  {
    group: 'Team & Enterprise', icon: Users, color: '#ec4899',
    features: [
      { label: 'Team analytics dashboard',     free: false,                 pro: false,                enterprise: true },
      { label: 'Custom learning programs',     free: false,                 pro: false,                enterprise: true },
      { label: 'SSO / SAML integration',       free: false,                 pro: false,                enterprise: true },
      { label: 'API access & webhooks',        free: false,                 pro: false,                enterprise: true },
      { label: 'Dedicated account manager',    free: false,                 pro: false,                enterprise: true },
    ],
  },
  {
    group: 'Support', icon: Headphones, color: '#64748b',
    features: [
      { label: 'Support channel',              free: 'Community forum',     pro: 'Priority email',     enterprise: '24/7 Phone + Slack' },
      { label: 'Response time',                free: '72h+',                pro: '< 4h',               enterprise: '< 1h' },
      { label: 'Onboarding',                   free: false,                 pro: 'Self-serve docs',    enterprise: 'Dedicated CSM' },
    ],
  },
];

const FAQS = [
  { q: 'Can I cancel my subscription at any time?',
    a: 'Yes — cancel anytime from your account settings with zero friction. You keep access until the end of your paid period and will never be charged again.' },
  { q: 'Is there really no credit card needed for the free plan?',
    a: 'Absolutely. The Free Forever plan is free forever — no credit card, no trial clock. Upgrade whenever you\'re ready.' },
  { q: 'What happens at the end of the 7-day Pro trial?',
    a: "We'll email you a reminder at day 5. If you add a payment method before day 7 your Pro access continues; otherwise you drop back to the free tier automatically." },
  { q: 'Can I switch between monthly and annual billing?',
    a: 'Yes. Switch to annual at any time — you\'ll be charged a prorated amount and immediately unlock the full annual discount.' },
  { q: 'Is there a student discount?',
    a: 'Yes! Students get 40% off Pro with a valid .edu email. Contact support to verify — approval takes under 24 hours.' },
  { q: 'How does Enterprise Fleet pricing work?',
    a: 'Enterprise is custom-quoted based on seat count, features, and contract length. Volume discounts and SLA-backed support included. Contact sales for a proposal within one business day.' },
  { q: 'What payment methods do you accept?',
    a: 'Visa, Mastercard, Amex, PayPal, and bank transfer (Enterprise only). All payments secured by Stripe with 256-bit SSL.' },
];

const TESTIMONIALS = [
  { initials: 'RP', name: 'Raj Patel', country: '🇦🇪', role: 'Entrepreneur', plan: 'Pro',
    planColor: '#3b82f6', planBg: '#eff6ff',
    text: 'Closed my first international deal after 3 months on Pro. The ROI vs. private tutoring is ridiculous — this cost me one coffee a week.' },
  { initials: 'SC', name: 'Sophie Chen', country: '🇸🇬', role: 'HR Director', plan: 'Enterprise',
    planColor: '#8b5cf6', planBg: '#f5f3ff',
    text: 'We rolled out Enterprise Fleet to 320 employees. The team dashboard and manager reporting made it easy to justify to leadership.' },
  { initials: 'YT', name: 'Yuki Tanaka', country: '🇯🇵', role: 'Graduate Student', plan: 'Pro',
    planColor: '#3b82f6', planBg: '#eff6ff',
    text: 'Pro paid for itself in week one. Unlimited mock IELTS tests with AI scoring are worth the price of the plan alone.' },
];

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

function FeatureCell({ val, planId }: { val: string | boolean; planId: string }) {
  if (val === false) return <div className="flex justify-center"><XCircle className="w-4 h-4 text-slate-300" /></div>;
  if (val === true) return (
    <div className="flex justify-center">
      <CheckCircle className={`w-4 h-4 ${planId === 'pro' ? 'text-blue-500' : planId === 'enterprise' ? 'text-violet-500' : 'text-emerald-500'}`} />
    </div>
  );
  return (
    <div className={`text-center text-xs font-semibold px-1 ${planId === 'pro' ? 'text-blue-700' : planId === 'enterprise' ? 'text-violet-700' : 'text-slate-600'}`}>
      {val}
    </div>
  );
}

const PRO_HIGHLIGHTS = [
  'Unlimited vocabulary & AI conversations',
  'Unlimited mock exams (IELTS/TOEFL/PTE)',
  'AI speaking coach + pronunciation AI',
  'Digital certificates + Writing Studio',
  '1 native speaker session / month',
  'Priority email support (< 4h)',
];
const FREE_HIGHLIGHTS = [
  '100 vocabulary cards / month',
  '5 AI conversations / day',
  '1 mock exam / month',
  'Community forum (read-only)',
];
const ENT_HIGHLIGHTS = [
  'Everything in Premium Pro',
  'Team analytics & manager dashboard',
  'SSO / SAML + API access',
  'Custom learning programs',
  'Unlimited native speaker sessions',
  'Dedicated account manager',
  '24/7 phone + Slack support',
];

const PLAN_HIGHLIGHTS: Record<string, string[]> = {
  free: FREE_HIGHLIGHTS, pro: PRO_HIGHLIGHTS, enterprise: ENT_HIGHLIGHTS,
};

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plansReveal       = useReveal();
  const compareReveal     = useReveal();
  const testimonialReveal = useReveal();
  const faqReveal         = useReveal();

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="hero-animated-bg relative pt-28 pb-28 overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-blue-200 mb-7 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Transparent pricing · No hidden fees · Cancel anytime
          </div>
          <h1 className="font-heading font-extrabold text-5xl lg:text-7xl text-white mb-6 animate-fade-in delay-100 leading-[1.05]">
            Simple Plans,<br /><span className="hero-gradient-text">Infinite Progress</span>
          </h1>
          <p className="text-xl text-blue-100/75 mb-10 max-w-xl mx-auto animate-fade-in delay-200">
            Start free forever. Upgrade when you're ready. Every paid plan comes with a full 7-day trial.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-1.5 animate-fade-in delay-300">
            <button onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${!annual ? 'bg-white text-slate-900 shadow-lg' : 'text-white/70 hover:text-white'}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${annual ? 'bg-white text-slate-900 shadow-lg' : 'text-white/70 hover:text-white'}`}>
              Annual
              <span className="text-[10px] font-extrabold bg-emerald-500 text-white px-2.5 py-0.5 rounded-full">Save 36%</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" className="w-full" preserveAspectRatio="none">
            <defs><linearGradient id="pwg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="1" />
            </linearGradient></defs>
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="url(#pwg)" />
          </svg>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-16 bg-slate-50 -mt-px">
        <div ref={plansReveal.ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => {
              const PlanIcon = plan.icon;
              const isHovered = hoveredPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${plansReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${
                    plan.popular
                      ? 'ring-2 ring-blue-400 shadow-2xl shadow-blue-500/20 md:-mt-4'
                      : plan.enterprise
                        ? 'ring-1 ring-violet-300 hover:ring-violet-400 hover:shadow-2xl'
                        : 'border border-slate-200 hover:shadow-xl hover:border-slate-300'
                  } ${isHovered && !plan.popular ? 'scale-[1.02]' : ''}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Popular accent */}
                  {plan.popular && (
                    <>
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-1.5 rounded-full shadow-xl whitespace-nowrap">
                          <Sparkles className="w-3 h-3" /> Most Popular
                        </span>
                      </div>
                    </>
                  )}

                  <div className={`${plan.enterprise ? 'bg-slate-900' : 'bg-white'} p-8 flex flex-col min-h-[580px]`}>
                    {/* Header */}
                    <div className={`mb-7 ${plan.popular ? 'pt-6' : ''}`}>
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
                        style={{ background: `${plan.color}20` }}>
                        <PlanIcon className="w-6 h-6" style={{ color: plan.color }} />
                      </div>
                      <h3 className={`font-heading font-extrabold text-2xl mb-1 ${plan.enterprise ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                      <p className={`text-sm ${plan.enterprise ? 'text-slate-400' : 'text-slate-500'}`}>{plan.tagline}</p>
                    </div>

                    {/* Price */}
                    <div className={`pb-7 mb-7 border-b ${plan.enterprise ? 'border-slate-700' : 'border-slate-100'}`}>
                      <div className="flex items-end gap-1.5">
                        <span className="font-heading font-extrabold text-5xl leading-none" style={{ color: plan.color }}>
                          {annual ? plan.annual : plan.monthly}
                        </span>
                        {plan.id !== 'enterprise' && (
                          <span className={`text-sm mb-1.5 ${plan.enterprise ? 'text-slate-400' : 'text-slate-400'}`}>/ month</span>
                        )}
                      </div>
                      {annual && plan.id === 'pro' && (
                        <div className="mt-1.5">
                          <span className="text-xs font-semibold text-slate-400">Billed as {plan.annualTotal} • </span>
                          <span className="text-xs font-extrabold text-emerald-600">Save $60 vs monthly</span>
                        </div>
                      )}
                      {plan.id === 'enterprise' && <p className="text-xs text-slate-400 mt-1.5">Volume pricing — contact sales</p>}
                      {plan.id === 'free' && <p className="text-xs text-slate-400 mt-1.5">Free forever — no credit card required</p>}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {PLAN_HIGHLIGHTS[plan.id].map(f => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.enterprise ? 'text-violet-400' : plan.popular ? 'text-blue-500' : 'text-emerald-500'}`} />
                          <span className={`text-sm ${plan.enterprise ? 'text-slate-300' : 'text-slate-700'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => navigate(plan.ctaRoute)}
                      className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all hover:scale-[1.02] ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50'
                          : plan.enterprise
                            ? 'bg-violet-600 hover:bg-violet-700 text-white'
                            : 'border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                      }`}>{plan.cta}
                    </button>
                    {plan.id === 'pro' && <p className="text-[11px] text-slate-400 text-center mt-3">No credit card required to start trial</p>}
                    {plan.id === 'enterprise' && <p className="text-[11px] text-slate-500 text-center mt-3">Custom billing · Volume discounts available</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-slate-400">
            {[
              { icon: Shield,     label: 'SOC 2 Certified' },
              { icon: Award,      label: 'ISO 27001' },
              { icon: Globe,      label: 'GDPR Compliant' },
              { icon: Clock,      label: '99.9% Uptime SLA' },
              { icon: BadgeCheck, label: '30-Day Money Back' },
            ].map(t => (
              <span key={t.label} className="flex items-center gap-2">
                <t.icon className="w-4 h-4 text-emerald-500" /> {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE MATRIX */}
      <section className="py-16 bg-white">
        <div ref={compareReveal.ref} className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${compareReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 mb-4">
              <BarChart3 className="w-3 h-3" /> Full Feature Matrix
            </span>
            <h2 className="font-heading font-bold text-4xl mt-3">Everything, compared.</h2>
            <p className="text-slate-500 mt-2 max-w-lg mx-auto">Every feature across all three plans — no fine print.</p>
          </div>

          <div className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-700 ${compareReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}>

            {/* Sticky header */}
            <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50">
              <div className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Feature</div>
              {PLANS.map(plan => (
                <div key={plan.id} className={`p-4 text-center border-l border-slate-200 ${plan.popular ? 'bg-blue-50' : ''}`}>
                  <div className="font-heading font-extrabold text-sm" style={{ color: plan.color }}>{plan.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    {annual ? plan.annual : plan.monthly}
                    {plan.id !== 'enterprise' && <span>/mo</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Feature groups */}
            {FEATURE_GROUPS.map(group => (
              <div key={group.group}>
                <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-100">
                  <div className="col-span-4 px-4 py-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${group.color}20` }}>
                      <group.icon className="w-3.5 h-3.5" style={{ color: group.color }} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">{group.group}</span>
                  </div>
                </div>
                {group.features.map((feat, fi) => (
                  <div key={feat.label}
                    className={`grid grid-cols-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors ${fi % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <div className="p-3.5 text-sm text-slate-700 font-medium">{feat.label}</div>
                    <div className="p-3.5 border-l border-slate-100 flex items-center justify-center">
                      <FeatureCell val={feat.free} planId="free" />
                    </div>
                    <div className="p-3.5 border-l border-slate-100 bg-blue-50/40 flex items-center justify-center">
                      <FeatureCell val={feat.pro} planId="pro" />
                    </div>
                    <div className="p-3.5 border-l border-slate-100 flex items-center justify-center">
                      <FeatureCell val={feat.enterprise} planId="enterprise" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-slate-50">
        <div ref={testimonialReveal.ref} className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-10 transition-all duration-700 ${testimonialReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading font-bold text-3xl">Customers love the value</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name}
                className={`bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${testimonialReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{t.initials}</div>
                  <div>
                    <div className="font-semibold text-sm text-slate-800">{t.name} {t.country}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                  <span className="ml-auto text-[10px] font-extrabold px-2.5 py-1 rounded-full"
                    style={{ background: t.planBg, color: t.planColor }}>{t.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div ref={faqReveal.ref} className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-10 transition-all duration-700 ${faqReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 mb-4">
              <HelpCircle className="w-3 h-3" /> FAQ
            </span>
            <h2 className="font-heading font-bold text-4xl mt-3">Frequently Asked</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-700 ${faqReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${openFaq === i ? 'border-blue-300 shadow-md shadow-blue-500/10' : 'border-slate-200'}`}
                style={{ transitionDelay: `${i * 50}ms` }}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-sm text-slate-800 pr-6">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">
            Still have questions?{' '}
            <Link to={ROUTES.CONTACT} className="text-blue-600 font-semibold hover:underline">Chat with us →</Link>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="cta-final-card text-center">
            <div className="cta-orb cta-orb-1" />
            <div className="cta-orb cta-orb-2" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-blue-200 mb-7">
                <Rocket className="w-3.5 h-3.5 text-amber-300" />
                Join 500,000+ learners — start free today
              </div>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-5">Start Speaking Fluently</h2>
              <p className="text-blue-100/75 text-lg mb-10 max-w-lg mx-auto">
                No credit card. Full 7-day Pro trial. Cancel anytime — no questions asked.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate(ROUTES.SIGNUP)} className="hero-btn-primary gap-2 inline-flex text-base">
                  <Zap className="w-5 h-5" /> Start Free Trial
                </button>
                <Link to={ROUTES.CONTACT} className="hero-btn-secondary gap-2 inline-flex items-center justify-center text-base">
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default Pricing;

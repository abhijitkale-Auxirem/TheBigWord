import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Award, BookOpen, Check, Cpu, Handshake, Users, Send } from 'lucide-react';
import { toast } from 'sonner';

const TIERS = [
  {
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    title: 'Academic Institutions',
    desc: 'Empower schools, universities, and language departments with customized AI curriculums and tutoring structures.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-indigo-500" />,
    title: 'Technology Providers',
    desc: 'Integrate our advanced pronunciation APIs, vocabulary tools, and speech-to-text components into your software.',
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-500" />,
    title: 'Corporate & Affiliate',
    desc: 'Offer professional language coaching benefits to enterprise workforces or earn commission on learner referrals.',
  },
];

const BENEFITS = [
  'Access to proprietary AI grading and speech feedback engines.',
  'Dedicated Partner Success Manager and onboarding program.',
  'Co-branded customized landing pages and custom white-labeling.',
  'Competitive commission splits and volume-based software pricing.',
  'Regular API service updates and priority technical assistance.',
  'Custom analytics reporting dashboards for student/employee progress.',
];

const Partners: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    partnerType: 'academic',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Partnership application submitted successfully! Our team will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        company: '',
        partnerType: 'academic',
        message: '',
      });
    }, 1200);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white font-medium mb-6 animate-fade-in">
            <Handshake className="w-4 h-4 text-blue-300" /> Partner Program
          </div>
          <h1 className="font-heading font-bold text-5xl text-white mb-6 leading-tight animate-fade-in delay-100">
            Let's Shape the Future of<br />
            <span className="text-emerald-300">Global Communication</span>
          </h1>
          <p className="text-blue-100/80 text-lg mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
            Partner with TheBigWord to bring state-of-the-art language learning, AI tools, and professional instruction to your school, enterprise, or software stack.
          </p>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-heading font-bold text-3xl">Partner Solutions Tailored for You</h2>
          <p className="text-muted-foreground text-sm">
            Whether you represent a global university, an enterprise team, or an app developer, we have programs suited to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-border p-8 hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6">
                  {tier.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{tier.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{tier.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-brand-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                Why Partner With Us?
              </div>
              <h2 className="font-heading font-bold text-3xl leading-tight">
                Unlock Educational Innovation and Revenue Opportunities
              </h2>
              <p className="text-muted-foreground text-sm">
                As a TheBigWord partner, you'll gain access to world-class software APIs and marketing tools to expand your program’s reach or optimize workforce learning.
              </p>
              <div className="space-y-3.5">
                {BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-600 leading-normal">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Logo/Visual panel */}
            <div className="bg-white rounded-3xl border border-border p-8 shadow-xl relative overflow-hidden flex flex-col justify-center items-center aspect-video md:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-emerald-50/30 -z-10" />
              <Award className="w-16 h-16 text-emerald-500 mb-4 animate-bounce-slow" />
              <div className="text-center space-y-2 max-w-xs">
                <div className="font-heading font-bold text-xl text-slate-800">Become a Certified Partner</div>
                <p className="text-xs text-muted-foreground">
                  Connect with our team to customize an alignment that meets your educational and developer requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      {/* <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-xl shadow-slate-100/50">
          <div className="text-center max-w-md mx-auto mb-10 space-y-2">
            <h2 className="font-heading font-bold text-2xl">Apply for Partnership</h2>
            <p className="text-xs text-muted-foreground">
              Provide your organization details and partner preferences. Our business development team will review your application.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700" htmlFor="name">Contact Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jane Doe"
                  className="w-full text-sm rounded-xl border border-border px-4 py-3 bg-brand-surface focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700" htmlFor="email">Work Email *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. jane@company.com"
                  className="w-full text-sm rounded-xl border border-border px-4 py-3 bg-brand-surface focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700" htmlFor="company">Company / Institution *</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Global Tech University"
                  className="w-full text-sm rounded-xl border border-border px-4 py-3 bg-brand-surface focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700" htmlFor="partnerType">Partner Type</label>
                <select
                  id="partnerType"
                  value={formData.partnerType}
                  onChange={e => setFormData({ ...formData, partnerType: e.target.value })}
                  className="w-full text-sm rounded-xl border border-border px-4 py-3 bg-brand-surface focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="academic">Academic Institution</option>
                  <option value="tech">Technology Provider (API)</option>
                  <option value="corporate">Corporate Benefits</option>
                  <option value="affiliate">Affiliate / Referrals</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700" htmlFor="message">Brief Message / Goals</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let us know what you would like to collaborate on..."
                className="w-full text-sm rounded-xl border border-border px-4 py-3 bg-brand-surface focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 gradient-primary text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? (
                <span>Submitting App...</span>
              ) : (
                <>
                  Submit Application <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section> */}
    </PublicLayout>
  );
};

export default Partners;

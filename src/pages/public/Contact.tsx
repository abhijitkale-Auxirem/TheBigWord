import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Mail, MapPin, MessageSquare, Clock, Send, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const CONTACT_INFO = [
  { icon: <Mail className="w-5 h-5 text-blue-500" />, title: 'Email Support', value: 'support@thebigword.ai', sub: 'We reply within 24 hours' },
  { icon: <MessageSquare className="w-5 h-5 text-emerald-500" />, title: 'Platform Live Chat', value: 'Available in dashboard', sub: 'Mon–Fri, 9am–6pm GMT' },
  { icon: <Clock className="w-5 h-5 text-purple-500" />, title: 'Typical Response', value: 'Under 12 hours', sub: 'For all priority tickets' },
  { icon: <MapPin className="w-5 h-5 text-orange-500" />, title: 'HQ Office Location', value: 'San Francisco, CA', sub: 'Global distributed network' },
];

const SUBJECTS = ['General Inquiry', 'Technical Support', 'Billing & Payments', 'Partnership', 'Press & Media', 'Report a Bug'];

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('Your message has been sent successfully! We will follow up shortly.');
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white font-medium mb-6">
            <Sparkles className="w-4 h-4 text-blue-300" /> Contact Support & Sales
          </div>
          <h1 className="font-heading font-bold text-5xl text-white mb-4 animate-fade-in">Get in Touch With Us</h1>
          <p className="text-blue-100/85 text-lg max-w-2xl mx-auto animate-fade-in delay-100">
            Have a question, feedback, or custom request? Our team is always here to assist you.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16 stagger-children">
          {CONTACT_INFO.map(c => (
            <div key={c.title} className="bg-white rounded-3xl border border-border p-6 text-center hover:shadow-xl hover:border-slate-300 transition-all">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">{c.icon}</div>
              <div className="font-heading font-bold text-sm text-slate-800 mb-1">{c.title}</div>
              <div className="text-sm text-foreground font-semibold mb-1">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-border p-8 md:p-10 shadow-xl shadow-slate-100/40 animate-fade-in">
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-6">Send Us a Message</h2>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">Full Name</Label>
                    <Input 
                      placeholder="Your name" 
                      value={form.name} 
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))} 
                      className="h-11 rounded-xl border-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-600 bg-brand-surface" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">Email Address</Label>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={form.email} 
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))} 
                      className="h-11 rounded-xl border-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-600 bg-brand-surface" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-slate-700">Topic / Subject</Label>
                  <select 
                    value={form.subject} 
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm bg-brand-surface outline-none focus:border-blue-600 transition-colors"
                  >
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-slate-700">Your Message</Label>
                  <textarea 
                    rows={6} 
                    value={form.message} 
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us how we can help you..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-brand-surface outline-none focus:border-blue-600 transition-colors resize-none" 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 gradient-primary text-white border-0 font-bold rounded-xl hover:opacity-95 shadow-lg shadow-primary/20"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  {loading ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-12 animate-fade-in-scale">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm shadow-emerald-50">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">Thank you for getting in touch. We will review your inquiry and follow up within 12 hours.</p>
                <Button onClick={() => setSent(false)} variant="outline" className="mt-8 rounded-xl px-6">Send Another Message</Button>
              </div>
            )}
          </div>

          {/* FAQ Side */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-heading font-bold text-2xl text-slate-900">Quick Answers</h3>
            <div className="space-y-4">
              {[
                { q: 'Is TheBigWord free to use?', a: 'Yes! We offer a free forever plan with core vocabulary and AI features. Pro plans unlock advanced AI tools, mock tests, and tutor credits.' },
                { q: 'How many languages are supported?', a: 'We support 50+ languages with full AI conversation coaching, localized pronunciation tools, and specialized tutoring resources.' },
                { q: 'Can I use it on mobile devices?', a: 'Absolutely. TheBigWord is fully responsive and operates seamlessly on Android, iOS, tablet, and desktop screens.' },
                { q: 'How do completion certificates work?', a: 'Pass standard course assessments or mock certification exams (IELTS/TOEFL) to receive an official shareable digital credential.' },
              ].map((faq, i) => (
                <div key={i} className="bg-brand-surface rounded-2xl p-5 border border-border">
                  <h4 className="font-semibold text-sm text-slate-800 mb-2">{faq.q}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contact;

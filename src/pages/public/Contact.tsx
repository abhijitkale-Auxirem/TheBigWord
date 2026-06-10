import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const CONTACT_INFO = [
  { icon: <Mail className="w-5 h-5 text-blue-500" />, title: 'Email Us', value: 'support@thebigword.ai', sub: 'We reply within 24 hours' },
  { icon: <MessageSquare className="w-5 h-5 text-emerald-500" />, title: 'Live Chat', value: 'Available on platform', sub: 'Mon–Fri, 9am–6pm GMT' },
  { icon: <Clock className="w-5 h-5 text-purple-500" />, title: 'Response Time', value: 'Under 24 hours', sub: 'For all email inquiries' },
  { icon: <MapPin className="w-5 h-5 text-orange-500" />, title: 'Headquarters', value: 'London, UK', sub: 'Globally distributed team' },
];

const SUBJECTS = ['General Inquiry', 'Technical Support', 'Billing & Payments', 'Partnership', 'Press & Media', 'Report a Bug'];

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We will get back to you soon.');
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-5xl text-white mb-4 animate-fade-in">Get in Touch</h1>
        <p className="text-blue-100/80 text-lg animate-fade-in delay-100">We'd love to hear from you. Send us a message!</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 stagger-children">
          {CONTACT_INFO.map(c => (
            <div key={c.title} className="bg-white rounded-2xl border border-border p-5 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-brand-surface rounded-xl flex items-center justify-center mx-auto mb-3">{c.icon}</div>
              <div className="font-semibold text-sm mb-1">{c.title}</div>
              <div className="text-sm text-foreground font-medium">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-border p-8 animate-fade-in">
            <h2 className="font-heading font-bold text-2xl mb-6">Send a Message</h2>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Full Name</Label>
                    <Input placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="h-11 rounded-xl" required />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Email</Label>
                    <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="h-11 rounded-xl" required />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Subject</Label>
                  <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full h-11 border border-input rounded-xl px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20">
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Message</Label>
                  <textarea rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us how we can help..."
                    className="w-full border border-input rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 resize-none" required />
                </div>
                <Button type="submit" disabled={loading}
                  className="w-full h-11 gradient-primary text-white border-0 font-semibold rounded-xl hover:opacity-90 shadow-lg shadow-primary/20">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-10 animate-fade-in-scale">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                <Button onClick={() => setSent(false)} variant="outline" className="mt-6 rounded-xl">Send Another</Button>
              </div>
            )}
          </div>

          {/* FAQ Side */}
          <div className="lg:col-span-2 animate-fade-in-right">
            <h3 className="font-heading font-bold text-xl mb-5">Quick Answers</h3>
            <div className="space-y-4">
              {[
                { q: 'Is TheBigWord free to use?', a: 'Yes! We offer a free forever plan with core features. Pro plans unlock advanced AI tools and certifications.' },
                { q: 'How many languages are supported?', a: 'We support 50+ languages with full AI coaching for English, Spanish, French, Mandarin, and Arabic.' },
                { q: 'Can I use it on mobile?', a: 'Absolutely. TheBigWord is fully responsive and works on any device.' },
                { q: 'How do certifications work?', a: 'Complete a course or mock test, pass the assessment, and receive a shareable digital certificate.' },
              ].map((faq, i) => (
                <div key={i} className="bg-brand-surface rounded-2xl p-5 border border-border">
                  <h4 className="font-semibold text-sm mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
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

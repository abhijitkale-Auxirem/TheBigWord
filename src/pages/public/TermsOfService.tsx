import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Scale, Users, CreditCard, MessageSquare, AlertCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Terms of Service</h1>
        <p className="text-blue-100/80 text-sm">Last Updated: June 11, 2026</p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-xl shadow-slate-100/30 space-y-8">
          
          {/* Intro Alert */}
          <div className="bg-slate-50 border border-border rounded-2xl p-5 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-normal">
              Please read these terms carefully. By accessing or using TheBigWord's web applications, AI services, and tutoring directories, you agree to be bound by these legal clauses. If you do not accept these terms, you may not register an account or use the platform.
            </div>
          </div>

          {/* Clauses */}
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> 1. Account Creation & Eligibility
            </h2>
            <p>
              To access specific features (such as dashboard tools, learning statistics, vocabulary trackers, and scheduled tutor calls), you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Providing accurate, current, and complete registration information.</li>
              <li>Maintaining the confidentiality of your credentials and account password.</li>
              <li>Immediately notifying our security team of any unauthorized profile entries.</li>
            </ul>
            <p>
              Users must be at least 13 years of age. If you are under 18, you must have parental or guardian consent to use paid platform features.
            </p>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" /> 2. Subscriptions, Payments & Refunds
            </h2>
            <p>
              Certain services, including advanced AI conversation coach minutes, corporate workspace accounts, and private tutor bookings, require premium credit-based purchases or subscription packages.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Pricing:</strong> Prices for all services are specified in the Pricing page. We reserve the right to alter pricing or subscription plans upon notice.</li>
              <li><strong>Billing:</strong> Recurring subscriptions are billed automatically at the beginning of each billing cycle (monthly or annually).</li>
              <li><strong>Cancellation & Refunds:</strong> You can cancel your subscription at any time via settings. Refund requests are subject to review and are generally granted if requested within 14 days of subscription initiation, provided platform services were not heavily utilized.</li>
            </ul>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> 3. Acceptable Platform Conduct
            </h2>
            <p>
              You agree not to use the platform to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Harass, abuse, threaten, or discriminate against other users, native speaker volunteers, or certified tutors.</li>
              <li>Attempt to scrape, harvest, or structurally duplicate platform lessons, vocabulary lists, or source layouts.</li>
              <li>Circumvent tutor marketplace billing rules by arranging external payment schedules.</li>
              <li>Deploy automated bots, spiders, or code scripts that interfere with backend services or mock API limits.</li>
            </ul>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" /> 4. Limitation of Liability & Disclaimers
            </h2>
            <p>
              TheBigWord services are provided on an "as is" and "as available" basis without any warranty, express or implied. We do not guarantee that tutoring availability will be uninterrupted, that the AI speech coaching responses will be error-free, or that you will achieve specific exam grades (e.g. IELTS thresholds).
            </p>
            <p>
              In no event shall TheBigWord Inc. be liable for any indirect, incidental, special, or consequential damages resulting from your platform usage.
            </p>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" /> 5. Termination & Modifications
            </h2>
            <p>
              We reserve the right to suspend or close your account at our sole discretion, without prior notice, if you breach these terms or engage in behavior that harms our community. We may update these terms from time to time; changes are effective immediately upon publishing.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TermsOfService;

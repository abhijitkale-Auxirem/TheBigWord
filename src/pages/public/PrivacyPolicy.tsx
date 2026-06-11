import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
        <p className="text-blue-100/80 text-sm">Last Updated: June 11, 2026</p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-xl shadow-slate-100/30 space-y-8">
          
          {/* Key Principles Summary */}
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm mb-1 text-slate-800">Secure Storage</h4>
                <p className="text-xs text-muted-foreground leading-normal">Your speech profiles and personal details are encrypted.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm mb-1 text-slate-800">No Selling Data</h4>
                <p className="text-xs text-muted-foreground leading-normal">We never sell your contact info or learning history to advertisers.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm mb-1 text-slate-800">Full Control</h4>
                <p className="text-xs text-muted-foreground leading-normal">Download or delete your account records instantly from Settings.</p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> 1. Information We Collect
            </h2>
            <p>
              We collect information that you directly provide to us, such as your name, email, payment details, learning preferences, and audio voice files when utilizing our AI speech coaching capabilities.
            </p>
            <p>
              Additionally, we automatically collect specific browser metadata, system preferences (including language setups), cookies, and feature interaction histories to optimize educational metrics.
            </p>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> 2. How We Use Your Data
            </h2>
            <p>
              TheBigWord processes collected data to deliver, customize, and refine our service:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Analyze pronunciations and speech grammar patterns using AI to offer tutoring feedback.</li>
              <li>Provide secure subscription and transaction billing services.</li>
              <li>Allow scheduled video and audio connection spaces between verified tutors and learners.</li>
              <li>Optimize website load speeds, layouts, and feature accessibility settings.</li>
            </ul>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> 3. Data Storage & Security
            </h2>
            <p>
              We prioritize customer safety. TheBigWord implements industry-standard technical controls, including Secure Socket Layer (SSL/TLS) encryption, row-level database structures, and restricted credential scopes. While we store database backups securely, no digital transfer protocol is 100% immune to breaches.
            </p>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" /> 4. Data Sharing & Third Parties
            </h2>
            <p>
              We share relevant data with trusted third parties strictly to run operations:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Payment Processors:</strong> We use Stripe to process payments; we do not store full credit card values on our local servers.</li>
              <li><strong>AI Infrastructure Partners:</strong> Audio and translation text may be evaluated by safe API endpoints under strict confidentiality agreements.</li>
              <li><strong>Tutors:</strong> Registered tutors will receive learner profiles, fluency levels, and target goals.</li>
            </ul>

            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> 5. Your Choices & Privacy Rights
            </h2>
            <p>
              Depending on your regional jurisdiction (such as GDPR in the European Union or CCPA in California), you have rights to review, retrieve, or request complete removal of your platform histories. If you wish to close your account or wipe your voice history, you can do so in the settings panel or by contacting our support team.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PrivacyPolicy;

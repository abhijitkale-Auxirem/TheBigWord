import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Globe, Clock, DollarSign, FileText, Filter, Search, ArrowRight } from 'lucide-react';

const PROJECTS = [
  { id: '1', client: 'MedTech Solutions', type: 'Medical', from: 'English', to: 'French', words: 3500, budget: '$245', deadline: 'Jun 15', urgent: true, desc: 'Clinical trial protocol translation for EU submission.' },
  { id: '2', client: 'LegalEagle Firm', type: 'Legal', from: 'Spanish', to: 'English', words: 6800, budget: '$476', deadline: 'Jun 18', urgent: false, desc: 'Contract and intellectual property documentation.' },
  { id: '3', client: 'ShopGlobal', type: 'Marketing', from: 'English', to: 'Arabic', words: 2200, budget: '$154', deadline: 'Jun 20', urgent: false, desc: 'Product descriptions and promotional copy.' },
  { id: '4', client: 'AutoMotive Corp', type: 'Technical', from: 'German', to: 'English', words: 8400, budget: '$588', deadline: 'Jun 22', urgent: false, desc: 'Automotive engineering manual localization.' },
  { id: '5', client: 'EduLearn Platform', type: 'Educational', from: 'English', to: 'Mandarin', words: 5100, budget: '$357', deadline: 'Jun 25', urgent: true, desc: 'eLearning course content for Chinese market.' },
];

const typeColors: Record<string, string> = {
  Medical: 'bg-red-100 text-red-700',
  Legal: 'bg-purple-100 text-purple-700',
  Marketing: 'bg-orange-100 text-orange-700',
  Technical: 'bg-blue-100 text-blue-700',
  Educational: 'bg-emerald-100 text-emerald-700',
};

const ProjectMarketplace: React.FC = () => {
  const [query, setQuery] = useState('');
  const displayed = PROJECTS.filter(p => !query || p.client.toLowerCase().includes(query.toLowerCase()) || p.type.toLowerCase().includes(query.toLowerCase()));

  return (
    <DashboardLayout title="Project Marketplace" subtitle="Browse and accept translation projects from global clients">
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by client, type, or language pair..."
          className="w-full h-12 pl-12 pr-4 border border-border rounded-2xl text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
      </div>

      <div className="space-y-4 stagger-children">
        {displayed.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors">{p.client}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[p.type]}`}>{p.type}</span>
                  {p.urgent && <span className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-full font-medium animate-pulse-slow">Urgent</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{p.from} → {p.to}</span>
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{p.words.toLocaleString()} words</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Due {p.deadline}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <div className="text-right">
                  <div className="font-heading font-bold text-xl text-primary">{p.budget}</div>
                  <div className="text-xs text-muted-foreground">Est. budget</div>
                </div>
                <button className="flex items-center gap-1.5 gradient-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-primary/20">
                  Accept Project <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ProjectMarketplace;

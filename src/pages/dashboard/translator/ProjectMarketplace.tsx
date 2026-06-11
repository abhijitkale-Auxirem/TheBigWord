import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Globe, Clock, DollarSign, FileText, Filter, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Project {
  id: string;
  client: string;
  type: string;
  from: string;
  to: string;
  words: number;
  budget: string;
  deadline: string;
  urgent: boolean;
  desc: string;
}

const PROJECTS: Project[] = [
  { id: '1', client: 'MedTech Solutions', type: 'Medical', from: 'English', to: 'French', words: 3500, budget: '$245', deadline: 'Jun 15', urgent: true, desc: 'Clinical trial protocol translation for EU submission.' },
  { id: '2', client: 'LegalEagle Firm', type: 'Legal', from: 'Spanish', to: 'English', words: 6800, budget: '$476', deadline: 'Jun 18', urgent: false, desc: 'Contract and intellectual property documentation.' },
  { id: '3', client: 'ShopGlobal', type: 'Marketing', from: 'English', to: 'Arabic', words: 2200, budget: '$154', deadline: 'Jun 20', urgent: false, desc: 'Product descriptions and promotional copy.' },
  { id: '4', client: 'AutoMotive Corp', type: 'Technical', from: 'German', to: 'English', words: 8400, budget: '$588', deadline: 'Jun 22', urgent: false, desc: 'Automotive engineering manual localization.' },
  { id: '5', client: 'EduLearn Platform', type: 'Educational', from: 'English', to: 'Mandarin', words: 5100, budget: '$357', deadline: 'Jun 25', urgent: true, desc: 'eLearning course content for Chinese market.' },
];

const typeColors: Record<string, string> = {
  Medical: 'bg-red-50 text-red-700 border-red-100',
  Legal: 'bg-purple-50 text-purple-700 border-purple-100',
  Marketing: 'bg-orange-50 text-orange-700 border-orange-100',
  Technical: 'bg-blue-50 text-blue-700 border-blue-100',
  Educational: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const ProjectMarketplace: React.FC = () => {
  const [query, setQuery] = useState('');

  // Fixed comprehensive multi-field search filtering evaluation
  const displayed = PROJECTS.filter(p => {
    if (!query) return true;
    const cleanQuery = query.toLowerCase().trim();
    
    return (
      p.client.toLowerCase().includes(cleanQuery) || 
      p.type.toLowerCase().includes(cleanQuery) ||
      p.from.toLowerCase().includes(cleanQuery) ||
      p.to.toLowerCase().includes(cleanQuery) ||
      `${p.from} ${p.to}`.toLowerCase().includes(cleanQuery)
    );
  });

  const handleAcceptProject = (project: Project) => {
    toast.success(`Project accepted! You are now assigned to ${project.client}.`);
  };

  return (
    <DashboardLayout title="Project Marketplace" subtitle="Browse and accept translation projects from global clients">
      {/* Search Bar container block */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder="Search by client, domain, or language (e.g. French, Spanish)..."
          className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400 transition-all shadow-sm" 
        />
      </div>

      {/* Main Marketplace Content Board */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                {['Client / Description', 'Domain / Type', 'Languages', 'Volume', 'Deadline', 'Estimated Budget', 'Action'].map(h => (
                  <th key={h} className="text-left text-[11px] font-bold text-slate-400 px-5 py-3.5 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {displayed.length > 0 ? (
                displayed.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Client & Short details column */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-800 text-sm tracking-tight">{p.client}</span>
                        {p.urgent && (
                          <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-md font-black uppercase tracking-wide shadow-sm">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-1 group-hover:text-slate-500 transition-colors">
                        {p.desc}
                      </p>
                    </td>

                    {/* Domain Pill Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold ${typeColors[p.type] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                        {p.type}
                      </span>
                    </td>

                    {/* Target Languages */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/60 px-2.5 py-1 rounded-md tracking-tight">
                        {p.from} <span className="text-slate-400 font-normal mx-0.5">→</span> {p.to}
                      </span>
                    </td>

                    {/* Word metrics tracking volume */}
                    <td className="px-5 py-4 whitespace-nowrap text-slate-600 font-semibold text-xs">
                      {p.words.toLocaleString()} words
                    </td>

                    {/* Target Delivery Deadlines */}
                    <td className="px-5 py-4 whitespace-nowrap text-slate-500 font-medium">
                      {p.deadline}
                    </td>

                    {/* Financial value index metrics */}
                    <td className="px-5 py-4 whitespace-nowrap text-slate-900 font-black text-sm">
                      {p.budget}
                    </td>

                    {/* Trigger Accept Action */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <Button 
                        size="sm"
                        onClick={() => handleAcceptProject(p)}
                        className="h-8 px-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm text-xs transition-all flex items-center gap-1.5"
                      >
                        Accept <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 bg-slate-50/30">
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                      <FileText className="w-8 h-8 stroke-[1.5]" />
                      <p className="font-medium text-slate-500 text-xs">No translation match targets found matching current criteria parameters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectMarketplace;
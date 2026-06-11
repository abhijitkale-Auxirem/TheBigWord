import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Globe, 
  Plus, 
  Sparkles,
  Building2,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Structuring corporate operational routes explicitly inside the component domain
const CORPORATE_ROUTES = {
  CORPORATE_DASHBOARD: '/dashboard/corporate',
  CORPORATE_ANALYTICS: '/dashboard/corporate/analytics',
  CORPORATE_PROGRAMS: '/dashboard/corporate/programs',
  CORPORATE_BILLINGS: '/dashboard/corporate/billings',
  CORPORATE_PROFILE: '/dashboard/corporate/profile',
  CORPORATE_SETTINGS: '/dashboard/corporate/settings',
};

interface TrainingProgram {
  name: string;
  enrolled: number;
  completed: number;
  progress: number;
  language: string;
}

interface PerformerNode {
  name: string;
  dept: string;
  score: number;
  courses: number;
}

const INITIAL_PROGRAMS: TrainingProgram[] = [
  { name: 'Business English Intensive', enrolled: 48, completed: 32, progress: 67, language: 'English' },
  { name: 'Communication Skills for Leaders', enrolled: 24, completed: 18, progress: 75, language: 'English' },
  { name: 'Spanish for Global Teams', enrolled: 12, completed: 5, progress: 42, language: 'Spanish' },
];

const TOP_PERFORMERS: PerformerNode[] = [
  { name: 'Sarah K.', dept: 'Marketing', score: 94, courses: 3 },
  { name: 'James L.', dept: 'Sales', score: 91, courses: 2 },
  { name: 'Mia P.', dept: 'HR', score: 88, courses: 4 },
  { name: 'Raj N.', dept: 'Tech', score: 85, courses: 3 },
];

const CorporateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [programsList, setProgramsList] = useState<TrainingProgram[]>(INITIAL_PROGRAMS);
  
  // Interactive action handlers linked to internal business logic
  const handleAddNewEmployee = () => {
    toast.info('Opening employee ingestion wizard.');
    // Navigate safely to the profile configuration sub-tree
    navigate(CORPORATE_ROUTES.CORPORATE_PROFILE);
  };

  const handleCreateProgram = () => {
    toast.info('Initializing program generator workspace pipeline...');
    navigate(CORPORATE_ROUTES.CORPORATE_PROGRAMS);
  };

  const handleManageProgramsLink = () => {
    navigate(CORPORATE_ROUTES.CORPORATE_PROGRAMS);
  };

  const handleProgramDetailsView = (programName: string) => {
    toast.success(`Loading telemetry parameters for: ${programName}`);
    navigate(CORPORATE_ROUTES.CORPORATE_ANALYTICS);
  };

  return (
    <DashboardLayout title="Corporate Strategy Control" subtitle="Oversee organizational cross-border language acquisition matrices">
      
      {/* High Density Flat Slate Header Panel Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 text-white relative overflow-hidden shadow-md select-none">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.03] text-9xl font-black hidden lg:block pointer-events-none">
          GLOBAL
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
              Enterprise Hub Account
            </span>
            <h2 className="font-heading font-black text-2xl mt-3 tracking-tight">GlobalTech Solutions</h2>
            <p className="text-slate-400 text-xs font-medium mt-1">
              84 workforce instances allocated · 3 programmatic tracks online · Period: Q2 2026
            </p>
          </div>
          
          {/* <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleAddNewEmployee}
              size="sm"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold h-8.5 rounded-xl shadow-sm"
            >
              <Users className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" /> Provision Employee
            </Button>
            <Button 
              onClick={handleCreateProgram}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 text-xs font-bold h-8.5 rounded-xl shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" /> Spawn Track
            </Button>
          </div> */}
        </div>
      </div>

      {/* Structured Metric Grid Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        {[
          { icon: <Users className="w-4 h-4 text-slate-800" />, label: 'Provisioned Seats', value: '84 Users', sub: '+12 inside current window', trendUp: true },
          { icon: <BookOpen className="w-4 h-4 text-slate-800" />, label: 'Active Matrix Tracks', value: '3 Active', sub: '2 nearing completion threshold', trendUp: false },
          { icon: <TrendingUp className="w-4 h-4 text-slate-800" />, label: 'Mean Completion Rate', value: '68.4%', sub: '+5.2% vs previous period', trendUp: true },
          { icon: <Award className="w-4 h-4 text-slate-800" />, label: 'Certificates Authorized', value: '55 Validated', sub: 'Q2 ledger baseline compliance', trendUp: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center shadow-inner mb-3">
                {stat.icon}
              </div>
              <div className="font-heading font-black text-xl text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
            <div className={`text-[10px] font-bold mt-2.5 pt-2 border-t border-slate-50 ${stat.trendUp ? 'text-emerald-600' : 'text-slate-400'}`}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Active Programs Data Table Workspace Column */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="flex items-center justify-between select-none px-1">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-slate-400" /> Track Execution Streams
            </h3>
            <button 
              onClick={handleManageProgramsLink}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-0.5 cursor-pointer"
            >
              Configure Map <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                    {['Track Identifier', 'Target Language', 'Allocated', 'Succeeded', 'In-Flight', 'Completion Factor', 'Actions Protocol'].map(h => (
                      <th key={h} className="text-left px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
                  {programsList.map(prog => (
                    <tr key={prog.name} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-4 py-3.5 whitespace-nowrap font-bold text-slate-800 tracking-tight">{prog.name}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap select-none">
                        <span className="text-[9px] uppercase font-extrabold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-blue-700">
                          {prog.language}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-600">{prog.enrolled}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-emerald-600">{prog.completed}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-400">{prog.enrolled - prog.completed}</td>
                      <td className="px-4 py-3.5 min-w-[140px]">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-800 mb-1 font-mono select-none">
                          <span>{prog.progress}%</span>
                        </div>
                        <div className="h-1 bg-slate-100 border border-slate-200/10 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full transition-all duration-300" style={{ width: `${prog.progress}%` }} />
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap select-none">
                        <button 
                          onClick={() => handleProgramDetailsView(prog.name)}
                          className="text-[11px] font-bold text-slate-900 hover:text-slate-600 inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          Telemetry <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side Column Panels: Performers + Global Index Metrics */}
        <div className="space-y-4">
          
          {/* Top Performers Card List Node */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 select-none">
              <Sparkles className="w-4 h-4 text-amber-500" /> Strategic Merit Standings
            </h3>
            
            <div className="space-y-3">
              {TOP_PERFORMERS.map((p, i) => {
                const isFirst = i === 0;
                return (
                  <div key={p.name} className="flex items-center gap-3 bg-slate-50/50 p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black font-mono select-none border shadow-sm ${
                      isFirst 
                        ? 'bg-amber-50 border-amber-200 text-amber-800' 
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}>
                      #{i + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate tracking-tight">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{p.dept} Division</div>
                    </div>
                    
                    <div className="text-right select-none">
                      <div className="text-xs font-mono font-black text-slate-900">{p.score}%</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{p.courses} Modules</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Indigo Vector Global Readiness Panel Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden select-none">
            <Globe className="w-8 h-8 mb-4 text-slate-400 opacity-80" />
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workforce Global Read Index</h4>
            
            <div className="font-heading font-black text-4xl mt-1 tracking-tighter">
              72<span className="text-xl text-slate-500 font-normal"> / 100 Base</span>
            </div>
            
            <p className="text-[11px] font-medium text-slate-400 mt-1.5 mb-4 leading-normal">
              Workforce is accurately tracking toward target parameters of <span className="font-bold text-white">85+</span> by Q3 2026.
            </p>
            
            <div className="h-1 bg-slate-800 rounded-full border border-slate-700/30 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full shadow-lg transition-all duration-500" style={{ width: '72%' }} />
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default CorporateDashboard;
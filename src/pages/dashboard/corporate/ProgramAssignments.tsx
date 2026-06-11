import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BookOpen, Users, Plus, ChevronRight, CheckCircle, Clock, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProgramNode {
  id: string;
  title: string;
  assignedTo: string;
  enrolled: number;
  completion: number;
  duration: string;
  status: 'active' | 'completing';
}

const INITIAL_PROGRAMS: ProgramNode[] = [
  { id: '1', title: 'Business English Mastery', assignedTo: 'Marketing, Sales', enrolled: 42, completion: 68, duration: '8 weeks', status: 'active' },
  { id: '2', title: 'Spanish for Business', assignedTo: 'Sales Team', enrolled: 18, completion: 45, duration: '12 weeks', status: 'active' },
  { id: '3', title: 'Executive Communication', assignedTo: 'Leadership', enrolled: 8, completion: 91, duration: '4 weeks', status: 'completing' },
  { id: '4', title: 'Technical English Writing', assignedTo: 'Engineering', enrolled: 30, completion: 22, duration: '6 weeks', status: 'active' },
];

const EMPLOYEES = ['Marketing Dept.', 'Sales Team', 'Engineering', 'HR & Admin', 'Leadership'];

const ProgramAssignments: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramNode[]>(INITIAL_PROGRAMS);
  const [showAssign, setShowAssign] = useState<boolean>(false);
  
  // Controlled form states
  const [selectedTitle, setSelectedTitle] = useState<string>('Business English Mastery');
  const [selectedDept, setSelectedDept] = useState<string>('Marketing Dept.');
  const [startDate, setStartDate] = useState<string>('');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      toast.error('Validation Warning: Please declare a deployment start date vector.');
      return;
    }

    // Map a clean new operational assignment entity node
    const newAssignment: ProgramNode = {
      id: (programs.length + 1).toString(),
      title: selectedTitle,
      assignedTo: selectedDept,
      enrolled: Math.floor(Math.random() * 25) + 5, // Simulating auto-enrolled seat values
      completion: 0,
      duration: '6 weeks', // Standard cohort baseline duration fallback
      status: 'active'
    };

    setPrograms(prev => [newAssignment, ...prev]);
    setShowAssign(false);
    setStartDate(''); // Clear form input
    
    toast.success(`Deployment Authorized: ${selectedTitle} assigned directly to ${selectedDept}.`);
  };

  return (
    <DashboardLayout title="Program Assignments" subtitle="Provision and map cohort language modules to specific active corporate segments">
      
      {/* Header Matrix Configuration Controls */}
      <div className="flex items-center justify-between mb-6 select-none">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-400" /> Active Assignment Tracks ({programs.length})
        </h3>
        
        {!showAssign && (
          <Button 
            onClick={() => setShowAssign(true)}
            size="sm"
            className="h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Provision New Track
          </Button>
        )}
      </div>

      {/* Slide-In Controlled Form Component Block Container */}
      {showAssign && (
        <form 
          onSubmit={handleCreateAssignment}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 shadow-inner animate-fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4 select-none">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" /> Provision Target Program Track
            </h4>
            <button 
              type="button"
              onClick={() => setShowAssign(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Module Title</label>
              <select 
                value={selectedTitle}
                onChange={e => setSelectedTitle(e.target.value)}
                className="w-full h-9 border border-slate-200 rounded-lg px-3 text-xs bg-white text-slate-700 font-medium outline-none focus:border-slate-400 transition-colors cursor-pointer"
              >
                <option>Business English Mastery</option>
                <option>Spanish for Business</option>
                <option>Mandarin Fundamentals</option>
                <option>Technical English Writing</option>
              </select>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Recipient Segment</label>
              <select 
                value={selectedDept} 
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full h-9 border border-slate-200 rounded-lg px-3 text-xs bg-white text-slate-700 font-medium outline-none focus:border-slate-400 transition-colors cursor-pointer"
              >
                {EMPLOYEES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Deployment Start Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full h-9 border border-slate-200 rounded-lg px-3 text-xs bg-white text-slate-700 font-mono outline-none focus:border-slate-400 transition-colors" 
              />
            </div>
          </div>

          <div className="flex gap-2 select-none">
            <Button 
              type="submit"
              size="sm"
              className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm"
            >
              Commit Assignment
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setShowAssign(false)} 
              className="h-8 px-4 border-slate-200 text-slate-500 font-bold text-xs bg-white rounded-lg hover:bg-slate-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Main Core Tracking Ledger Data Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 select-none">
                {['Program Identifier', 'Assigned Corporate Segment', 'Enrolled Capacity', 'Temporal Window', 'Completion Aggregation Index', 'Status Vector', 'Telemetry'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 px-5 py-3.5 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
              {programs.map(prog => {
                const isHighCompletion = prog.completion > 80;
                return (
                  <tr key={prog.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-5 py-4 font-bold text-slate-800 tracking-tight">{prog.title}</td>
                    <td className="px-5 py-4 text-slate-500 font-medium">{prog.assignedTo}</td>
                    <td className="px-5 py-4 text-slate-600 font-mono font-bold">{prog.enrolled} Units</td>
                    <td className="px-5 py-4 text-slate-400 font-medium">{prog.duration}</td>
                    <td className="px-5 py-4 min-w-[160px]">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-800 font-mono mb-1 select-none">
                        <span>{prog.completion}%</span>
                      </div>
                      <div className="h-1 bg-slate-100 border border-slate-200/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHighCompletion ? 'bg-emerald-600' : 'bg-slate-900'
                          }`} 
                          style={{ width: `${prog.completion}%` }} 
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap select-none">
                      {prog.status === 'completing' ? (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                          <CheckCircle className="w-2.5 h-2.5 stroke-[2.5]" /> Finalizing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                          <Clock className="w-2.5 h-2.5 stroke-[2.5]" /> In-Flight
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap select-none">
                      <button className="text-[11px] font-bold text-slate-900 hover:text-slate-600 inline-flex items-center gap-0.5 cursor-pointer">
                        Details <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProgramAssignments;
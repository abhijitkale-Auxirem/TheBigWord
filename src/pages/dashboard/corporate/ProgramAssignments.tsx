import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BookOpen, Users, Plus, ChevronRight, CheckCircle, Clock } from 'lucide-react';

const PROGRAMS = [
  { id: '1', title: 'Business English Mastery', assignedTo: 'Marketing, Sales', enrolled: 42, completion: 68, duration: '8 weeks', status: 'active' },
  { id: '2', title: 'Spanish for Business', assignedTo: 'Sales Team', enrolled: 18, completion: 45, duration: '12 weeks', status: 'active' },
  { id: '3', title: 'Executive Communication', assignedTo: 'Leadership', enrolled: 8, completion: 91, duration: '4 weeks', status: 'completing' },
  { id: '4', title: 'Technical English Writing', assignedTo: 'Engineering', enrolled: 30, completion: 22, duration: '6 weeks', status: 'active' },
];

const EMPLOYEES = ['All Employees', 'Marketing Dept.', 'Sales Team', 'Engineering', 'HR & Admin', 'Leadership'];

const ProgramAssignments: React.FC = () => {
  const [showAssign, setShowAssign] = useState(false);
  const [selectedDept, setSelectedDept] = useState('All Employees');

  return (
    <DashboardLayout title="Program Assignments" subtitle="Assign and manage language learning programs for your teams">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg">Active Programs ({PROGRAMS.length})</h3>
        <button onClick={() => setShowAssign(true)}
          className="flex items-center gap-2 gradient-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" /> Assign Program
        </button>
      </div>

      {showAssign && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 animate-fade-in">
          <h4 className="font-semibold mb-4">Assign New Program</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Program</label>
              <select className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white outline-none">
                <option>Business English Mastery</option>
                <option>Spanish for Business</option>
                <option>Mandarin Fundamentals</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Assign To</label>
              <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white outline-none">
                {EMPLOYEES.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Start Date</label>
              <input type="date" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white outline-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="gradient-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 shadow">Assign Now</button>
            <button onClick={() => setShowAssign(false)} className="border border-border text-sm font-medium px-5 py-2.5 rounded-xl hover:border-primary/30 transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4 stagger-children">
        {PROGRAMS.map(prog => (
          <div key={prog.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{prog.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prog.status === 'completing' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{prog.status}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{prog.assignedTo}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{prog.enrolled} enrolled</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{prog.duration}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-heading font-bold text-xl text-primary">{prog.completion}%</div>
                <div className="text-xs text-muted-foreground">avg completion</div>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${prog.completion > 80 ? 'gradient-emerald' : 'gradient-primary'} rounded-full`} style={{ width: `${prog.completion}%` }} />
            </div>
            <div className="flex items-center justify-end mt-3">
              <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                View Details <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ProgramAssignments;

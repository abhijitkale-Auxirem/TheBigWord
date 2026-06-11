import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Star, 
  MessageSquare, 
  Send, 
  Award, 
  ArrowLeft, 
  Users, 
  Sparkles,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface StudentNode {
  id: string;
  name: string;
  avatar: string;
  lang: string;
  level: string;
  sessions: number;
  lastSession: string;
  score: number;
  progress: string;
  notes: string;
}

const INITIAL_STUDENTS: StudentNode[] = [
  { id: '1', name: 'Alex Morgan', avatar: 'A', lang: 'Spanish', level: 'Intermediate', sessions: 12, lastSession: 'Jun 8', score: 78, progress: '+12%', notes: '' },
  { id: '2', name: 'Priya Sharma', avatar: 'P', lang: 'English', level: 'Advanced', sessions: 8, lastSession: 'Jun 7', score: 85, progress: '+8%', notes: '' },
  { id: '3', name: 'Carlos G.', avatar: 'C', lang: 'French', level: 'Beginner', sessions: 5, lastSession: 'Jun 5', score: 62, progress: '+22%', notes: '' },
  { id: '4', name: 'Yuki T.', avatar: 'Y', lang: 'Japanese', level: 'Intermediate', sessions: 15, lastSession: 'Jun 9', score: 91, progress: '+5%', notes: 'Excellent progress. Ready for advanced content.' },
];

const SKILLS = ['Speaking', 'Writing', 'Listening', 'Reading', 'Grammar', 'Vocabulary'];

const StudentEvaluations: React.FC = () => {
  const [studentsList, setStudentsList] = useState<StudentNode[]>(INITIAL_STUDENTS);
  const [selected, setSelected] = useState<string | null>(null);
  const [skillScores, setSkillScores] = useState<Record<string, number>>(
    SKILLS.reduce((acc, skill) => ({ ...acc, [skill]: 70 }), {})
  );
  const [feedback, setFeedback] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const student = selected ? studentsList.find(s => s.id === selected) : null;

  const handleSelectStudent = (id: string) => {
    setSelected(id);
    const targetStudent = studentsList.find(s => s.id === id);
    
    // Seed slider configuration values using student baseline or default score layers
    const baseline = targetStudent ? targetStudent.score : 70;
    setSkillScores(SKILLS.reduce((acc, skill) => ({ ...acc, [skill]: baseline }), {}));
    setFeedback(targetStudent?.notes || '');
  };

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !student) return;

    if (!feedback.trim()) {
      toast.error('Validation Warning: Please provide localized feedback commentary before submission.');
      return;
    }

    setSubmitting(true);
    toast.info(`Publishing grade variables for candidate: ${student.name}`);

    // Compute dynamic aggregate score values from form matrix array averages
    const totalScoreSum = Object.values(skillScores).reduce((a, b) => a + b, 0);
    const complexMeanScore = Math.round(totalScoreSum / SKILLS.length);

    // Simulate database network delivery latency
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Update state table logs dynamically 
    setStudentsList(prev => prev.map(s => {
      if (s.id === selected) {
        return {
          ...s,
          score: complexMeanScore,
          notes: feedback.trim(),
          lastSession: 'Today'
        };
      }
      return s;
    }));

    toast.success(`Evaluation framework committed. New mean index verified at ${complexMeanScore}%`);
    setSubmitting(false);
    setSelected(null); // Return back to directory view automatically
  };

  return (
    <DashboardLayout title="Student Progress Analytics" subtitle="Review performance models and publish capability criteria metrics">
      
      {!student ? (
        /* Left Column / Core Matrix Overview View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 select-none">
                  {['Student Profile', 'Track Target', 'Proficiency Matrix', 'Attendance Logs', 'Last Active Vector', 'Calculated Progress Tier', 'Actions Protocol'].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold text-slate-400 px-5 py-3 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs font-medium text-slate-700">
                {studentsList.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-100 font-bold text-[10px] select-none shadow-inner">
                          {s.avatar}
                        </div>
                        <span className="font-bold text-slate-800 tracking-tight">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap select-none">
                      <span className="text-[10px] uppercase font-bold bg-blue-50 border border-blue-200/50 px-2 py-0.5 rounded text-blue-700">
                        {s.lang}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 font-semibold select-none">{s.level}</td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono">{s.sessions} sessions</td>
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap font-medium">{s.lastSession}</td>
                    <td className="px-5 py-3.5 min-w-[160px]">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1 select-none">
                        <span className="text-slate-800 font-mono font-extrabold">{s.score}%</span>
                        <span className="text-emerald-600 inline-flex items-center gap-0.5 font-extrabold">
                          <TrendingUp className="w-2.5 h-2.5" /> {s.progress}
                        </span>
                      </div>
                      <div className="h-1 bg-slate-100 border border-slate-200/20 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-900 rounded-full transition-all duration-500" style={{ width: `${s.score}%` }} />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <button 
                        onClick={() => handleSelectStudent(s.id)}
                        className="h-6.5 px-3 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg text-[11px] font-bold shadow-sm transition-colors cursor-pointer select-none"
                      >
                        Evaluate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Evaluation Workspace Interface Form Card Component */
        <div className="max-w-2xl animate-fade-in">
          <button 
            onClick={() => setSelected(null)} 
            className="text-xs font-bold text-slate-400 hover:text-slate-700 mb-4 inline-flex items-center gap-1 bg-none border-0 p-0 cursor-pointer select-none transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Return back to data store logs
          </button>
          
          <form onSubmit={handleSubmitEvaluation} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 shadow-sm">
            
            {/* Context Identity Node */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none">
              <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-100 font-black text-sm shadow-sm">
                {student.avatar}
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900 tracking-tight">{student.name}</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  {student.lang} Track · {student.level} Threshold · {student.sessions} Total Completed Units
                </p>
              </div>
            </div>

            {/* Slider Capability Calibration Matrix Grid */}
            <div>
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 select-none">
                <Sliders className="w-4 h-4 text-slate-400" /> Competency Metrics Vectors (0–100)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {SKILLS.map(skill => (
                  <div key={skill} className="space-y-1 bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl group hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-center text-[11px] font-bold select-none">
                      <span className="text-slate-500 group-hover:text-slate-700">{skill} Parameter</span>
                      <span className="font-mono text-slate-900 font-extrabold text-xs">{skillScores[skill] || 0}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={skillScores[skill] || 0}
                      onChange={e => setSkillScores(prev => ({ ...prev, [skill]: Number(e.target.value) }))}
                      className="w-full accent-slate-950 h-1 bg-slate-200 rounded-lg cursor-pointer" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Textarea Documentation Block */}
            <div className="space-y-1.5">
              <label className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2 select-none">
                <MessageSquare className="w-4 h-4 text-slate-400" /> Local Diagnostic Log Commentary
              </label>
              <textarea 
                value={feedback} 
                onChange={e => setFeedback(e.target.value)} 
                rows={4}
                required
                placeholder="Insert localized strategic notes regarding phonology, structure acquisition, operational flaws, or milestone metrics here..."
                className="w-full border border-slate-200 focus:border-slate-400 rounded-xl p-3 text-xs font-medium text-slate-700 placeholder:text-slate-300 outline-none transition-all resize-none leading-relaxed" 
              />
            </div>

            {/* Submit Pipeline Interaction Element */}
            <Button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs h-10 rounded-xl shadow-sm flex items-center justify-center gap-2 select-none transition-opacity disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${submitting ? 'animate-pulse' : ''}`} /> 
              {submitting ? 'Commiting State Changes...' : 'Compile and Publish Assessment'}
            </Button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentEvaluations;
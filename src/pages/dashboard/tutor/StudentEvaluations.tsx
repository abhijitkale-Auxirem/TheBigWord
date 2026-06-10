import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Star, ChevronDown, MessageSquare, Send, Award } from 'lucide-react';

const STUDENTS = [
  { id: '1', name: 'Alex Morgan', avatar: 'A', lang: 'Spanish', level: 'Intermediate', sessions: 12, lastSession: 'Jun 8', score: 78, progress: '+12%', notes: '' },
  { id: '2', name: 'Priya Sharma', avatar: 'P', lang: 'English', level: 'Advanced', sessions: 8, lastSession: 'Jun 7', score: 85, progress: '+8%', notes: '' },
  { id: '3', name: 'Carlos G.', avatar: 'C', lang: 'French', level: 'Beginner', sessions: 5, lastSession: 'Jun 5', score: 62, progress: '+22%', notes: '' },
  { id: '4', name: 'Yuki T.', avatar: 'Y', lang: 'Japanese', level: 'Intermediate', sessions: 15, lastSession: 'Jun 9', score: 91, progress: '+5%', notes: 'Excellent progress. Ready for advanced content.' },
];

const SKILLS = ['Speaking', 'Writing', 'Listening', 'Reading', 'Grammar', 'Vocabulary'];

const StudentEvaluations: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [skillScores, setSkillScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');

  const student = selected ? STUDENTS.find(s => s.id === selected) : null;

  return (
    <DashboardLayout title="Student Evaluations" subtitle="Assess and provide feedback for your students">
      {!student ? (
        <div className="space-y-4 stagger-children">
          {STUDENTS.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 gradient-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{s.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{s.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">{s.lang}</span>
                        <span>{s.level}</span>
                        <span>{s.sessions} sessions</span>
                        <span>Last: {s.lastSession}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-heading font-bold text-xl text-primary">{s.score}</div>
                      <div className="text-xs text-emerald-500 font-medium">{s.progress}</div>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${s.score}%` }} />
                  </div>
                  {s.notes && <p className="text-xs text-muted-foreground mt-2 italic">"{s.notes}"</p>}
                </div>
                <button onClick={() => setSelected(s.id)}
                  className="flex-shrink-0 gradient-primary text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 shadow">
                  Evaluate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl animate-fade-in">
          <button onClick={() => setSelected(null)} className="text-sm text-muted-foreground hover:text-foreground mb-5 flex items-center gap-1">← Back to Students</button>
          <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">{student.avatar}</div>
              <div>
                <h2 className="font-heading font-bold text-xl">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.lang} · {student.level} · {student.sessions} sessions</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Skill Scores (0–100)</h3>
              <div className="grid grid-cols-2 gap-4">
                {SKILLS.map(skill => (
                  <div key={skill}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium">{skill}</span>
                      <span className="font-semibold text-primary">{skillScores[skill] || 0}</span>
                    </div>
                    <input type="range" min="0" max="100" value={skillScores[skill] || 0}
                      onChange={e => setSkillScores(prev => ({ ...prev, [skill]: Number(e.target.value) }))}
                      className="w-full accent-primary" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-2 block flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Written Feedback</label>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={4}
                placeholder="Write detailed feedback for the student..."
                className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>

            <button className="w-full gradient-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Send className="w-4 h-4" /> Submit Evaluation
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentEvaluations;

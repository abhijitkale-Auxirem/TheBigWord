import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ClipboardList, Clock, ChevronRight, Trophy, BarChart3, AlertCircle, CheckCircle, Play } from 'lucide-react';

const TESTS = [
  { id: 'ielts-reading', name: 'IELTS Reading', type: 'IELTS', duration: '60 min', questions: 40, difficulty: 'Advanced', status: 'available', lastScore: null },
  { id: 'ielts-writing', name: 'IELTS Writing Task 1 & 2', type: 'IELTS', duration: '60 min', questions: 2, difficulty: 'Advanced', status: 'completed', lastScore: 7.0 },
  { id: 'toefl-listening', name: 'TOEFL Listening Practice', type: 'TOEFL', duration: '41 min', questions: 28, difficulty: 'Advanced', status: 'available', lastScore: null },
  { id: 'pte-speaking', name: 'PTE Speaking & Writing', type: 'PTE', duration: '77 min', questions: 35, difficulty: 'Advanced', status: 'available', lastScore: null },
  { id: 'english-grammar', name: 'English Grammar Mastery', type: 'Grammar', duration: '30 min', questions: 50, difficulty: 'Intermediate', status: 'completed', lastScore: 88 },
  { id: 'vocab-advanced', name: 'Advanced Vocabulary Test', type: 'Vocabulary', duration: '25 min', questions: 40, difficulty: 'Advanced', status: 'in-progress', lastScore: null },
];

const typeColors: Record<string, string> = {
  IELTS: 'bg-blue-100 text-blue-700',
  TOEFL: 'bg-purple-100 text-purple-700',
  PTE: 'bg-indigo-100 text-indigo-700',
  Grammar: 'bg-emerald-100 text-emerald-700',
  Vocabulary: 'bg-orange-100 text-orange-700',
};

const TestingCenter: React.FC = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const SAMPLE_QUESTIONS = [
    { q: 'Choose the correct form: "She ___ to the store yesterday."', options: ['go', 'went', 'gone', 'going'], answer: 'went' },
    { q: 'Which word is a synonym for "eloquent"?', options: ['Silent', 'Articulate', 'Confused', 'Aggressive'], answer: 'Articulate' },
    { q: 'Identify the error: "The team have decided to postponed the meeting."', options: ['have decided', 'to postponed', 'the meeting', 'No error'], answer: 'to postponed' },
  ];

  if (activeTest) {
    const q = SAMPLE_QUESTIONS[currentQ];
    return (
      <DashboardLayout title="Testing Center" subtitle="Mock Assessment">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-muted-foreground">Question {currentQ + 1} of {SAMPLE_QUESTIONS.length}</span>
              <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl font-medium">
                <Clock className="w-4 h-4" /> 29:45
              </div>
            </div>
            <div className="h-1 bg-muted rounded-full mb-6">
              <div className="h-full gradient-primary rounded-full" style={{ width: `${((currentQ + 1) / SAMPLE_QUESTIONS.length) * 100}%` }} />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-6">{q.q}</h3>
            <div className="space-y-3 mb-8">
              {q.options.map(opt => (
                <button key={opt} onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: opt }))}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${answers[currentQ] === opt ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/30 hover:bg-brand-surface'}`}>
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setActiveTest(null); setCurrentQ(0); setAnswers({}); }}
                className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all">
                Quit Test
              </button>
              <button onClick={() => currentQ < SAMPLE_QUESTIONS.length - 1 ? setCurrentQ(q => q + 1) : setActiveTest(null)}
                disabled={!answers[currentQ]}
                className="flex-1 gradient-primary text-white font-semibold py-2.5 rounded-xl hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-primary/20">
                {currentQ < SAMPLE_QUESTIONS.length - 1 ? 'Next Question' : 'Submit Test'} →
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Testing Center" subtitle="Mock IELTS, TOEFL, PTE and language proficiency tests">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <ClipboardList className="w-5 h-5 text-blue-500" />, label: 'Tests Available', value: '24', bg: 'bg-blue-50' },
          { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, label: 'Completed', value: '2', bg: 'bg-emerald-50' },
          { icon: <Trophy className="w-5 h-5 text-yellow-500" />, label: 'Best Score', value: '88%', bg: 'bg-yellow-50' },
          { icon: <BarChart3 className="w-5 h-5 text-purple-500" />, label: 'Avg Score', value: '82%', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-border flex items-center gap-3`}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">{s.icon}</div>
            <div><div className="font-heading font-bold text-xl">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
          </div>
        ))}
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
        {TESTS.map(test => (
          <div key={test.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[test.type]}`}>{test.type}</span>
                  {test.status === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  {test.status === 'in-progress' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                </div>
                <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors">{test.name}</h3>
              </div>
              {test.lastScore !== null && (
                <div className="text-right flex-shrink-0">
                  <div className="font-heading font-bold text-lg text-primary">{test.lastScore}</div>
                  <div className="text-xs text-muted-foreground">Last score</div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{test.duration}</span>
              <span className="flex items-center gap-1"><ClipboardList className="w-3.5 h-3.5" />{test.questions} questions</span>
              <span>{test.difficulty}</span>
            </div>
            <button onClick={() => setActiveTest(test.id)}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                test.status === 'in-progress' ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200' : 'gradient-primary text-white hover:opacity-90 shadow-lg shadow-primary/20'
              }`}>
              <Play className="w-4 h-4" />
              {test.status === 'completed' ? 'Retake Test' : test.status === 'in-progress' ? 'Continue Test' : 'Start Test'}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TestingCenter;

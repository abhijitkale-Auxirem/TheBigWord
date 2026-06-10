import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Trophy, Download, CheckCircle, Clock, Star, Award, Lock, ChevronRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/types/user.types';

const EARNED: Certificate[] = [
  { id: '1', title: 'Business English Proficiency', issueDate: '2026-03-15', score: 92, language: 'English', level: 'Intermediate', verified: true },
  { id: '2', title: 'Vocabulary Mastery — 1000 Words', issueDate: '2026-01-20', score: 88, language: 'English', level: 'Advanced', verified: true },
  { id: '3', title: 'Communication Skills Foundation', issueDate: '2025-11-10', score: 95, language: 'English', level: 'Beginner', verified: true },
];

const UPCOMING_TESTS = [
  { title: 'IELTS Mock Exam', desc: 'Full simulation · 4 modules', date: 'Jun 15, 2026', difficulty: 'Advanced', ready: 72 },
  { title: 'TOEFL Practice Test', desc: 'iBT format · Reading & Writing', date: 'Jun 22, 2026', difficulty: 'Intermediate', ready: 55 },
  { title: 'PTE Academic Mock', desc: 'Computer-based · AI scored', date: 'Jul 5, 2026', difficulty: 'Advanced', ready: 40 },
];

const scoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-600 bg-emerald-100';
  if (score >= 75) return 'text-blue-600 bg-blue-100';
  return 'text-yellow-600 bg-yellow-100';
};

const Certifications: React.FC = () => {
  return (
    <DashboardLayout title="Certifications" subtitle="Earn and showcase your language credentials">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="gradient-primary rounded-2xl p-5 text-white">
          <Trophy className="w-8 h-8 mb-2 opacity-80" />
          <div className="font-heading font-bold text-3xl">3</div>
          <div className="text-sm text-blue-100">Certifications Earned</div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5">
          <GraduationCap className="w-8 h-8 mb-2 text-indigo-500" />
          <div className="font-heading font-bold text-3xl">3</div>
          <div className="text-sm text-muted-foreground">Tests Available</div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5">
          <Star className="w-8 h-8 mb-2 text-yellow-500" />
          <div className="font-heading font-bold text-3xl">91.7</div>
          <div className="text-sm text-muted-foreground">Avg. Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Earned Certificates */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-heading font-semibold text-lg">Earned Certificates</h3>
          {EARNED.map(cert => (
            <div key={cert.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm">{cert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.language} · {cert.level}</p>
                    </div>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${scoreColor(cert.score)}`}>
                      {cert.score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Issued {cert.issueDate}</span>
                      {cert.verified && (
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="text-xs border-primary/30 text-primary hover:bg-primary/5">
                      <Download className="w-3 h-3 mr-1.5" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Tests */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-heading font-semibold text-lg">Upcoming Tests</h3>
          {UPCOMING_TESTS.map(test => (
            <div key={test.title} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-sm">{test.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{test.desc}</p>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">{test.difficulty}</span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Readiness</span>
                  <span className="font-semibold text-primary">{test.ready}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${test.ready >= 70 ? 'gradient-emerald' : test.ready >= 50 ? 'gradient-primary' : 'gradient-gold'}`}
                    style={{ width: `${test.ready}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{test.date}</span>
                </div>
                <Button size="sm" className={`text-xs ${test.ready >= 70 ? 'gradient-primary text-white border-0' : 'border-muted text-muted-foreground'}`}>
                  {test.ready >= 70 ? 'Take Test' : 'Keep Practicing'}
                </Button>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-5">
            <Lock className="w-6 h-6 text-indigo-400 mb-2" />
            <h4 className="font-semibold text-sm mb-1">Professional Certifications</h4>
            <p className="text-xs text-muted-foreground mb-3">Unlock IELTS, TOEFL, and PTE official certifications with Pro plan.</p>
            <Button size="sm" className="w-full gradient-primary text-white border-0 text-xs">
              Upgrade to Pro <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Certifications;

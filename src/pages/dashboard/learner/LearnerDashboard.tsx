import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BookOpen, Flame, Trophy, BarChart3, Clock, Target, Star, Play, ChevronRight, Zap, Globe, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';

const COURSES = [
  { title: 'Business English Mastery', language: 'English', level: 'Intermediate', progress: 68, lessons: 40, completed: 27, instructor: 'Dr. James Wright', color: 'gradient-primary' },
  { title: 'IELTS Preparation', language: 'English', level: 'Upper-Intermediate', progress: 35, lessons: 60, completed: 21, instructor: 'Sarah Mitchell', color: 'gradient-card' },
  { title: 'Spanish for Beginners', language: 'Spanish', level: 'Beginner', progress: 20, lessons: 30, completed: 6, instructor: 'Maria Garcia', color: 'gradient-emerald' },
];

const WORD_OF_DAY = {
  word: 'Perspicacious',
  pronunciation: '/ˌpɜr·spɪˈkeɪ·ʃəs/',
  partOfSpeech: 'adjective',
  definition: 'Having a ready insight into things; shrewd. Showing a good ability to notice and understand things.',
  example: 'Her perspicacious analysis of the market trends impressed the entire board.',
  synonyms: ['shrewd', 'astute', 'perceptive', 'discerning'],
};

const STATS = [
  { icon: <Flame className="w-5 h-5 text-orange-500" />, label: 'Day Streak', value: '12', bg: 'bg-orange-50', border: 'border-orange-100' },
  { icon: <BookOpen className="w-5 h-5 text-blue-500" />, label: 'Words Learned', value: '1,248', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: <Trophy className="w-5 h-5 text-yellow-500" />, label: 'Points Earned', value: '2,450', bg: 'bg-yellow-50', border: 'border-yellow-100' },
  { icon: <Star className="w-5 h-5 text-purple-500" />, label: 'Certifications', value: '3', bg: 'bg-purple-50', border: 'border-purple-100' },
];

const UPCOMING = [
  { type: 'Lesson', title: 'Advanced Grammar Patterns', time: 'Today, 3:00 PM', icon: <BookOpen className="w-4 h-4" /> },
  { type: 'Mock Test', title: 'IELTS Speaking Practice', time: 'Tomorrow, 10:00 AM', icon: <MessageSquare className="w-4 h-4" /> },
  { type: 'Session', title: '1-on-1 with Tutor Sarah', time: 'Thu, 4:00 PM', icon: <Globe className="w-4 h-4" /> },
];

const LearnerDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout title="My Dashboard" subtitle="Track your language learning progress">
      {/* Welcome Banner */}
      <div className="gradient-hero rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-6 top-4 opacity-20 text-8xl font-heading font-bold hidden lg:block">学</div>
        <div className="relative z-10">
          <p className="text-blue-200 text-sm font-medium mb-1">{greeting} 👋</p>
          <h2 className="font-heading font-bold text-2xl mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h2>
          <p className="text-blue-100/80 text-sm mb-4">You are on a <span className="text-yellow-300 font-semibold">12-day streak</span>. Keep going to reach your weekly goal!</p>
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-white text-primary hover:bg-blue-50 font-semibold text-xs px-4">
              <Play className="w-3.5 h-3.5 mr-1.5" /> Continue Learning
            </Button>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <Target className="w-4 h-4 text-emerald-300" />
              <span className="text-xs font-medium">Daily Goal: 15 / 20 words</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map(stat => (
          <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-xl p-4 flex items-center gap-3`}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              {stat.icon}
            </div>
            <div>
              <div className="font-heading font-bold text-xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-lg">Active Courses</h3>
            <button className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {COURSES.map(course => (
            <div key={course.title} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {course.language.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm">{course.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{course.level} · by {course.instructor}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full flex-shrink-0">{course.progress}%</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{course.completed} / {course.lessons} lessons</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${course.color} rounded-full transition-all`} style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-4 w-full text-xs font-medium border-primary/30 text-primary hover:bg-primary/5">
                <Play className="w-3 h-3 mr-1.5" /> Continue Lesson
              </Button>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Word of the Day */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Word of the Day
              </h3>
              <span className="text-xs text-muted-foreground">Advanced</span>
            </div>
            <div className="gradient-primary rounded-xl p-4 text-white mb-3">
              <div className="font-heading font-bold text-xl mb-1">{WORD_OF_DAY.word}</div>
              <div className="text-xs text-blue-200">{WORD_OF_DAY.pronunciation} · {WORD_OF_DAY.partOfSpeech}</div>
            </div>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{WORD_OF_DAY.definition}</p>
            <p className="text-xs text-foreground italic bg-brand-surface rounded-lg p-2.5">{`"${WORD_OF_DAY.example}"`}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {WORD_OF_DAY.synonyms.map(s => (
                <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Upcoming
            </h3>
            <div className="space-y-3">
              {UPCOMING.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-brand-surface">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold truncate">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearnerDashboard;

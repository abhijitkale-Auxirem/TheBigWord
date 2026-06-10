import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BookOpen, Search, Play, Clock, Star, Filter, ChevronRight, Lock } from 'lucide-react';

const COURSES = [
  { id: '1', title: 'Complete Spanish for Beginners', lang: 'Spanish', level: 'Beginner', progress: 45, lessons: 40, completed: 18, instructor: 'Carlos Mendez', rating: 4.9, duration: '32h', img: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&q=80', enrolled: true },
  { id: '2', title: 'Business English Mastery', lang: 'English', level: 'Intermediate', progress: 72, lessons: 35, completed: 25, instructor: 'Dr. Sarah Chen', rating: 4.8, duration: '28h', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80', enrolled: true },
  { id: '3', title: 'French for Travelers', lang: 'French', level: 'Beginner', progress: 15, lessons: 25, completed: 4, instructor: 'Marie Dupont', rating: 4.7, duration: '18h', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', enrolled: true },
  { id: '4', title: 'IELTS Preparation Course', lang: 'English', level: 'Advanced', progress: 0, lessons: 50, completed: 0, instructor: 'Prof. James Clark', rating: 4.9, duration: '45h', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80', enrolled: false },
  { id: '5', title: 'Mandarin Chinese Level 1', lang: 'Mandarin', level: 'Beginner', progress: 0, lessons: 45, completed: 0, instructor: 'Mei Lin', rating: 4.8, duration: '40h', img: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80', enrolled: false },
  { id: '6', title: 'Advanced Grammar Workshop', lang: 'English', level: 'Advanced', progress: 0, lessons: 20, completed: 0, instructor: 'Emma Wilson', rating: 4.6, duration: '15h', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80', enrolled: false },
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CourseAcademy: React.FC = () => {
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [tab, setTab] = useState<'enrolled' | 'explore'>('enrolled');

  const displayed = COURSES.filter(c => {
    const matchEnroll = tab === 'enrolled' ? c.enrolled : !c.enrolled;
    const matchQ = !query || c.title.toLowerCase().includes(query.toLowerCase()) || c.lang.toLowerCase().includes(query.toLowerCase());
    const matchL = levelFilter === 'All' || c.level === levelFilter;
    return matchEnroll && matchQ && matchL;
  });

  return (
    <DashboardLayout title="Course Academy" subtitle="Your enrolled and available language courses">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses..."
            className="w-full h-10 pl-9 pr-4 border border-border rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="flex gap-2">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`px-3 py-2 text-xs font-medium rounded-xl transition-all ${levelFilter === l ? 'gradient-primary text-white shadow' : 'bg-white border border-border text-muted-foreground hover:border-primary/30'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-brand-surface p-1 rounded-xl w-fit mb-6">
        {(['enrolled', 'explore'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-white shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {t === 'enrolled' ? `My Courses (${COURSES.filter(c => c.enrolled).length})` : 'Explore All'}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {displayed.map(course => (
          <div key={course.id} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative aspect-video overflow-hidden">
              <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-primary ml-0.5" />
                </button>
              </div>
              {!course.enrolled && (
                <div className="absolute top-3 right-3 w-7 h-7 bg-black/40 rounded-full flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                {course.lang}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground bg-brand-surface px-2 py-0.5 rounded-full">{course.level}</span>
                <div className="flex items-center gap-1 text-xs text-yellow-500"><Star className="w-3.5 h-3.5 fill-yellow-400" />{course.rating}</div>
              </div>
              <h3 className="font-heading font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">by {course.instructor}</p>
              {course.enrolled ? (
                <>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{course.completed}/{course.lessons} lessons</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.lessons} lessons</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CourseAcademy;

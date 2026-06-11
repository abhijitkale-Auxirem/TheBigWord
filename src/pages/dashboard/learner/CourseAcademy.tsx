import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  BookOpen, 
  Search, 
  Play, 
  Clock, 
  Star, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  lang: string;
  level: string;
  progress: number;
  lessons: number;
  completed: number;
  instructor: string;
  rating: number;
  duration: string;
  img: string;
  enrolled: boolean;
}

const INITIAL_COURSES: Course[] = [
  { id: '1', title: 'Complete Spanish for Beginners', lang: 'Spanish', level: 'Beginner', progress: 45, lessons: 40, completed: 18, instructor: 'Carlos Mendez', rating: 4.9, duration: '32h', img: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&q=80', enrolled: true },
  { id: '2', title: 'Business English Mastery', lang: 'English', level: 'Intermediate', progress: 72, lessons: 35, completed: 25, instructor: 'Dr. Sarah Chen', rating: 4.8, duration: '28h', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80', enrolled: true },
  { id: '3', title: 'French for Travelers', lang: 'French', level: 'Beginner', progress: 15, lessons: 25, completed: 4, instructor: 'Marie Dupont', rating: 4.7, duration: '18h', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', enrolled: true },
  { id: '4', title: 'IELTS Preparation Course', lang: 'English', level: 'Advanced', progress: 0, lessons: 50, completed: 0, instructor: 'Prof. James Clark', rating: 4.9, duration: '45h', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80', enrolled: false },
  { id: '5', title: 'Mandarin Chinese Level 1', lang: 'Mandarin', level: 'Beginner', progress: 0, lessons: 45, completed: 0, instructor: 'Mei Lin', rating: 4.8, duration: '40h', img: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80', enrolled: false },
  { id: '6', title: 'Advanced Grammar Workshop', lang: 'English', level: 'Advanced', progress: 0, lessons: 20, completed: 0, instructor: 'Emma Wilson', rating: 4.6, duration: '15h', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80', enrolled: false },
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CourseAcademy: React.FC = () => {
  // Reactive Core States
  const [coursesState, setCoursesState] = useState<Course[]>(INITIAL_COURSES);
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [tab, setTab] = useState<'enrolled' | 'explore'>('enrolled');
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);

  // Dynamic Enrollment Controller
  const handleEnroll = (courseId: string) => {
    setCoursesState(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolled: true, progress: 0, completed: 0 };
      }
      return c;
    }));
    // Auto shift view directly to workspace tab to display the newly enrolled data row
    setTab('enrolled');
  };

  // Filter Pipeline Engine
  const displayedCourses = coursesState.filter(c => {
    const matchEnroll = tab === 'enrolled' ? c.enrolled : !c.enrolled;
    const matchQ = !query || c.title.toLowerCase().includes(query.toLowerCase()) || c.lang.toLowerCase().includes(query.toLowerCase()) || c.instructor.toLowerCase().includes(query.toLowerCase());
    const matchL = levelFilter === 'All' || c.level === levelFilter;
    return matchEnroll && matchQ && matchL;
  });

  return (
    <DashboardLayout title="Course Academy" subtitle="High-density management interface for your tracking analytics and training pipelines">
      
      {/* Control Panel: Search Filters & Parameters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
        
        {/* Search Parameter Inputs */}
        <div className="flex-1 relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search language streams, units, or instruction staff..."
            className="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-xl text-sm bg-white font-medium outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm" 
          />
        </div>

        {/* Level Filters Pill Belt Selector */}
        <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
          {LEVELS.map(l => (
            <button 
              key={l} 
              onClick={() => setLevelFilter(l)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                levelFilter === l 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Navigation Matrix Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-6 border border-slate-200/40">
        {(['enrolled', 'explore'] as const).map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              tab === t 
                ? 'bg-white shadow-sm text-slate-900 border border-slate-200/30' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t === 'enrolled' 
              ? `My Workspace (${coursesState.filter(c => c.enrolled).length})` 
              : 'Explore Global Curriculums'}
          </button>
        ))}
      </div>

      {/* Empty State Fallback Alert Box */}
      {displayedCourses.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl max-w-sm mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-sm">No courses found</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 px-4">
            No active rows match your criteria. Try adjusting your filter controls or searching for another term.
          </p>
          <button 
            onClick={() => { setQuery(''); setLevelFilter('All'); }} 
            className="text-xs font-bold text-blue-600 mt-4 hover:underline block mx-auto"
          >
            Reset Query Variables
          </button>
        </div>
      ) : (
        /* STRICTION: Exclusive High-Density Data Table Canvas */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-widest select-none">
                  <th className="py-3.5 px-5">Course Parameters</th>
                  <th className="py-3.5 px-4">Language</th>
                  <th className="py-3.5 px-4">Proficiency Level</th>
                  <th className="py-3.5 px-4">Metrics / Track Progress</th>
                  <th className="py-3.5 px-4">Rating Index</th>
                  <th className="py-3.5 px-5 text-right">Operational Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-sm">
                {displayedCourses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-50/40 transition-colors group">
                    
                    {/* Column 1: Course Description Specs & Thumbnail */}
                    <td className="py-4 px-5 max-w-[340px]">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-9 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 relative">
                          <img src={course.img} alt="" className="w-full h-full object-cover" />
                          {activePlaybackId === course.id && (
                            <div className="absolute inset-0 bg-blue-600/80 flex items-center justify-center text-white">
                              <Play className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
                            </div>
                          )}
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors tracking-tight">
                            {course.title}
                          </div>
                          <div className="text-xs text-slate-400 font-medium truncate">by {course.instructor}</div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Language Tag Flag */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                        {course.lang}
                      </span>
                    </td>

                    {/* Column 3: Level Specs */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-semibold text-slate-600">
                        {course.level}
                      </span>
                    </td>

                    {/* Column 4: Context Progress/Duration Processing Matrix */}
                    <td className="py-4 px-4 min-w-[200px]">
                      {course.enrolled ? (
                        <div className="max-w-[170px]">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {course.completed}/{course.lessons} Units</span>
                            <span className="text-blue-600">{course.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/10">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3.5 text-xs text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-300" /> {course.duration}</span>
                          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-slate-300" /> {course.lessons} Lessons</span>
                        </div>
                      )}
                    </td>

                    {/* Column 5: Performance Star Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100/50 px-2 py-0.5 rounded-md w-fit">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {course.rating}
                      </div>
                    </td>

                    {/* Column 6: Functional Event Action Controllers */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      {course.enrolled ? (
                        <button 
                          onClick={() => setActivePlaybackId(activePlaybackId === course.id ? null : course.id)}
                          className={`h-8 px-3.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                            activePlaybackId === course.id 
                              ? 'bg-amber-500 text-white shadow-sm ring-4 ring-amber-500/20' 
                              : 'bg-slate-900 text-white hover:bg-blue-600 shadow-sm'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" /> {activePlaybackId === course.id ? 'Active Session' : 'Resume Track'}
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button 
                            onClick={() => handleEnroll(course.id)}
                            className="h-8 px-3.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/40 transition-all inline-flex items-center gap-1"
                          >
                            Unlock Course <Sparkles className="w-3 h-3 text-blue-500" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CourseAcademy;
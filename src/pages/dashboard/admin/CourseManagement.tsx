import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BookOpen, Plus, Search, Edit2, Trash2, Eye, Users, Star, Clock } from 'lucide-react';

const COURSES = [
  { id: '1', title: 'Complete Spanish for Beginners', lang: 'Spanish', level: 'Beginner', enrolled: 8420, rating: 4.9, lessons: 40, status: 'published', instructor: 'Carlos Mendez' },
  { id: '2', title: 'Business English Mastery', lang: 'English', level: 'Intermediate', enrolled: 12800, rating: 4.8, lessons: 35, status: 'published', instructor: 'Dr. Sarah Chen' },
  { id: '3', title: 'IELTS Preparation Course', lang: 'English', level: 'Advanced', enrolled: 6200, rating: 4.9, lessons: 50, status: 'published', instructor: 'Emma Wilson' },
  { id: '4', title: 'Mandarin Chinese Level 1', lang: 'Mandarin', level: 'Beginner', enrolled: 5100, rating: 4.7, lessons: 45, status: 'published', instructor: 'Mei Lin' },
  { id: '5', title: 'French for Travelers', lang: 'French', level: 'Beginner', enrolled: 3800, rating: 4.7, lessons: 25, status: 'draft', instructor: 'Marie Dupont' },
];

const CourseManagement: React.FC = () => {
  const [query, setQuery] = useState('');
  const displayed = COURSES.filter(c => !query || c.title.toLowerCase().includes(query.toLowerCase()) || c.lang.toLowerCase().includes(query.toLowerCase()));

  return (
    <DashboardLayout title="Course Management" subtitle="Manage the learning content library">
      <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses..."
            className="w-full h-10 pl-9 pr-4 border border-border rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-brand-surface">
                {['Course', 'Language', 'Level', 'Enrolled', 'Rating', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map(c => (
                <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-brand-surface/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0"><BookOpen className="w-4 h-4 text-white" /></div>
                      <div><div className="text-sm font-medium">{c.title}</div><div className="text-xs text-muted-foreground">by {c.instructor}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">{c.lang}</span></td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{c.level}</td>
                  <td className="px-5 py-4 text-sm font-medium">{c.enrolled.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{c.rating}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-blue-500"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseManagement;

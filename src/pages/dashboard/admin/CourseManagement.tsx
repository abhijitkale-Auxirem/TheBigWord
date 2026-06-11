import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BookOpen, Plus, Search, Edit2, Trash2, Eye, Star, X, Save, Layers, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface CourseNode {
  id: string;
  title: string;
  lang: string;
  level: string;
  enrolled: number;
  rating: number;
  lessons: number;
  status: 'published' | 'draft';
  instructor: string;
}

const INITIAL_COURSES: CourseNode[] = [
  { id: '1', title: 'Complete Spanish for Beginners', lang: 'Spanish', level: 'Beginner', enrolled: 8420, rating: 4.9, lessons: 40, status: 'published', instructor: 'Carlos Mendez' },
  { id: '2', title: 'Business English Mastery', lang: 'English', level: 'Intermediate', enrolled: 12800, rating: 4.8, lessons: 35, status: 'published', instructor: 'Dr. Sarah Chen' },
  { id: '3', title: 'IELTS Preparation Course', lang: 'English', level: 'Advanced', enrolled: 6200, rating: 4.9, lessons: 50, status: 'published', instructor: 'Emma Wilson' },
  { id: '4', title: 'Mandarin Chinese Level 1', lang: 'Mandarin', level: 'Beginner', enrolled: 5100, rating: 4.7, lessons: 45, status: 'published', instructor: 'Mei Lin' },
  { id: '5', title: 'French for Travelers', lang: 'French', level: 'Beginner', enrolled: 3800, rating: 4.7, lessons: 25, status: 'draft', instructor: 'Marie Dupont' },
];

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<CourseNode[]>(INITIAL_COURSES);
  const [query, setQuery] = useState('');

  // Modal Overlay States
  const [inspectedCourse, setInspectedCourse] = useState<CourseNode | null>(null);
  const [editingCourse, setEditingCourse] = useState<CourseNode | null>(null);

  // Filter Pipeline Implementation
  const displayed = courses.filter(c => 
    !query || 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.lang.toLowerCase().includes(query.toLowerCase())
  );

  // DELETE FUNCTIONALITY
  const handleDeleteCourse = (id: string, title: string) => {
    const confirmDrop = window.confirm(`Are you sure you want to permanently remove "${title}" from the curriculum index?`);
    if (!confirmDrop) return;

    setCourses(prev => prev.filter(c => c.id !== id));
    toast.success(`Curriculum Purged: "${title}" successfully dropped from database layers.`);
    
    // Close inspector if the viewed element was purged
    if (inspectedCourse?.id === id) setInspectedCourse(null);
  };

  // EDIT SAVE COMPONENT ACTION
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    if (!editingCourse.title.trim() || !editingCourse.instructor.trim()) {
      toast.error('Validation Warning: Required fields cannot remain empty.');
      return;
    }

    setCourses(prev => prev.map(c => c.id === editingCourse.id ? editingCourse : c));
    
    // Sync active inspect viewport state cleanly
    if (inspectedCourse?.id === editingCourse.id) {
      setInspectedCourse(editingCourse);
    }

    setEditingCourse(null);
    toast.success(`Data Synced: "${editingCourse.title}" manifest configuration refreshed.`);
  };

  return (
    <DashboardLayout title="Content Library Registry" subtitle="Create, edit, inspect, and prune active curriculum nodes inside your workspace">
      
      {/* Control Input Header Line */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6 select-none">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[2.5]" />
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search courses or instruction language arrays..."
            className="w-full h-10 pl-9 pr-4 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 bg-white placeholder-slate-400 outline-none focus:border-slate-400 transition-colors shadow-sm" 
          />
        </div>
        <Button 
          onClick={() => toast.info('Module Creation: Dispatched request vector for canvas item initialization.')}
          className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Provision New Course
        </Button>
      </div>

      {/* Main Core Tracking Table Structure */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                {['Course Identity Segment', 'Target Language', 'Difficulty Metric', 'Enrolled Audience', 'Evaluation Rating', 'Deployment Status', 'Administrative Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
              {displayed.length > 0 ? (
                displayed.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 select-none shadow-sm">
                          <BookOpen className="w-4 h-4 text-white stroke-[2]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 tracking-tight">{c.title}</div>
                          <div className="text-[11px] font-medium text-slate-400 mt-0.5">Lead: {c.instructor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap select-none">
                      <span className="text-[9px] uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-md font-extrabold">
                        {c.lang}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-medium whitespace-nowrap">{c.level}</td>
                    <td className="px-5 py-4 font-mono font-bold text-slate-800 whitespace-nowrap">{c.enrolled.toLocaleString()} Units</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-800 font-mono select-none">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {c.rating}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap select-none">
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-extrabold border ${
                        c.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap select-none">
                      <div className="flex items-center gap-1.5">
                        <button 
                          title="SEE / Inspect Course Manifest"
                          onClick={() => setInspectedCourse(c)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <button 
                          title="EDIT Course Configuration Data"
                          onClick={() => setEditingCourse({ ...c })}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer shadow-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <button 
                          title="DELETE Course Module Vector"
                          onClick={() => handleDeleteCourse(c.id, c.title)}
                          className="p-1.5 rounded-lg border border-slate-200 text-rose-600 bg-white hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 font-medium select-none">
                    No curriculum records matched target tracking boundaries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. SEE ACTION - POPUP INSPECT MODAL LAYER */}
      {inspectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="bg-slate-950 px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold tracking-tight">Course Record View</span>
              </div>
              <button onClick={() => setInspectedCourse(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4 stroke-[2.5]" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-sm font-black text-slate-900 tracking-tight leading-tight">{inspectedCourse.title}</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-1 flex items-center gap-1"><User className="w-3 h-3" /> Instructor: {inspectedCourse.instructor}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Language Node</div>
                  <div className="text-xs font-bold text-slate-800">{inspectedCourse.lang}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Target Level</div>
                  <div className="text-xs font-bold text-slate-800">{inspectedCourse.level}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Curriculum Content</div>
                  <div className="text-xs font-bold text-slate-800 font-mono">{inspectedCourse.lessons} Active Lessons</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Subscribed Audience</div>
                  <div className="text-xs font-bold text-slate-800 font-mono">{inspectedCourse.enrolled.toLocaleString()} Units</div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-extrabold border ${inspectedCourse.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>{inspectedCourse.status}</span>
                <Button size="sm" onClick={() => { setEditingCourse({ ...inspectedCourse }); setInspectedCourse(null); }} className="h-7 text-[11px] font-bold bg-slate-900 text-white hover:bg-slate-800">Modify Data Structure</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EDIT ACTION - POPUP CONFIGURATION FORM MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleSaveEdit} className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="bg-slate-950 px-5 py-4 text-white flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold tracking-tight">Edit Curriculum Manifest Node</span>
              </div>
              <button type="button" onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4 stroke-[2.5]" /></button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <Label className="text-[10px] font-bold mb-1 block uppercase tracking-wider text-slate-400">Course Document Title</Label>
                <Input value={editingCourse.title} onChange={e => setEditingCourse(p => p ? ({ ...p, title: e.target.value }) : null)} className="h-9 text-xs font-bold text-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[10px] font-bold mb-1 block uppercase tracking-wider text-slate-400">Target Language Array</Label>
                  <Input value={editingCourse.lang} onChange={e => setEditingCourse(p => p ? ({ ...p, lang: e.target.value }) : null)} className="h-9 text-xs font-semibold text-slate-700" />
                </div>
                <div>
                  <Label className="text-[10px] font-bold mb-1 block uppercase tracking-wider text-slate-400">Instruction Difficulty</Label>
                  <select value={editingCourse.level} onChange={e => setEditingCourse(p => p ? ({ ...p, level: e.target.value }) : null)} className="w-full h-9 border border-slate-200 rounded-lg px-2 text-xs font-semibold bg-white text-slate-700 outline-none focus:border-slate-400">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[10px] font-bold mb-1 block uppercase tracking-wider text-slate-400">Lead Faculty Instructor</Label>
                  <Input value={editingCourse.instructor} onChange={e => setEditingCourse(p => p ? ({ ...p, instructor: e.target.value }) : null)} className="h-9 text-xs font-semibold text-slate-700" />
                </div>
                <div>
                  <Label className="text-[10px] font-bold mb-1 block uppercase tracking-wider text-slate-400">Active Lessons Count</Label>
                  <Input type="number" value={editingCourse.lessons} onChange={e => setEditingCourse(p => p ? ({ ...p, lessons: parseInt(e.target.value) || 0 }) : null)} className="h-9 text-xs font-mono font-semibold text-slate-700" />
                </div>
              </div>
              <div>
                <Label className="text-[10px] font-bold mb-1 block uppercase tracking-wider text-slate-400">Deployment Status Vector</Label>
                <select value={editingCourse.status} onChange={e => setEditingCourse(p => p ? ({ ...p, status: e.target.value as 'published' | 'draft' }) : null)} className="w-full h-9 border border-slate-200 rounded-lg px-2 text-xs font-bold bg-white text-slate-700 outline-none focus:border-slate-400 cursor-pointer">
                  <option value="published">Published (Live Archive)</option>
                  <option value="draft">Draft (Staging Layer)</option>
                </select>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 select-none">
              <Button type="button" variant="outline" onClick={() => setEditingCourse(null)} className="h-8 text-xs font-bold border-slate-200 text-slate-500 bg-white">Cancel</Button>
              <Button type="submit" className="h-8 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm">Save Manifest Changes</Button>
            </div>
          </form>
        </div>
      )}

    </DashboardLayout>
  );
};

export default CourseManagement;
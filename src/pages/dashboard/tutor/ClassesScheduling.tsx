import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Calendar, Clock, Users, Video, Star, MoreHorizontal, Plus, CheckCircle, XCircle } from 'lucide-react';

const SCHEDULE = [
  { id: '1', student: 'Alex Morgan', avatar: 'A', topic: 'Business Spanish - Advanced', time: '10:00 AM', duration: '60 min', date: 'Today', status: 'upcoming', type: 'Video', rating: null },
  { id: '2', student: 'Priya Sharma', avatar: 'P', topic: 'IELTS Speaking Practice', time: '2:00 PM', duration: '45 min', date: 'Today', status: 'upcoming', type: 'Video', rating: null },
  { id: '3', student: 'Carlos G.', avatar: 'C', topic: 'French Beginner Level 3', time: '4:30 PM', duration: '60 min', date: 'Tomorrow', status: 'upcoming', type: 'Video', rating: null },
  { id: '4', student: 'Yuki T.', avatar: 'Y', topic: 'Japanese Conversation', time: '11:00 AM', duration: '45 min', date: 'Jun 12', status: 'completed', type: 'Video', rating: 5 },
  { id: '5', student: 'Ahmed K.', avatar: 'A', topic: 'English Grammar Review', time: '9:00 AM', duration: '60 min', date: 'Jun 11', status: 'completed', type: 'Video', rating: 4 },
];

const AVAILABILITY = [
  { day: 'Monday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
  { day: 'Tuesday', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
  { day: 'Wednesday', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
  { day: 'Thursday', slots: ['10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'] },
  { day: 'Friday', slots: ['9:00 AM', '11:00 AM'] },
];

const ClassesScheduling: React.FC = () => {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'availability'>('upcoming');

  const filtered = SCHEDULE.filter(s => s.status === tab || tab === 'availability');

  return (
    <DashboardLayout title="Classes & Scheduling" subtitle="Manage your teaching schedule and availability">
      <div className="flex gap-1 bg-brand-surface p-1 rounded-xl w-fit mb-6">
        {(['upcoming', 'completed', 'availability'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}>
            {t === 'upcoming' ? `Upcoming (${SCHEDULE.filter(s => s.status === 'upcoming').length})` : t === 'completed' ? 'Completed' : 'Availability'}
          </button>
        ))}
      </div>

      {tab !== 'availability' ? (
        <div className="space-y-4 stagger-children">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 gradient-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{s.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-base">{s.student}</h3>
                      <p className="text-sm text-muted-foreground">{s.topic}</p>
                    </div>
                    {s.status === 'completed' && s.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(s.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{s.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.time} · {s.duration}</span>
                    <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" />{s.type}</span>
                  </div>
                </div>
                {s.status === 'upcoming' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-4 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 shadow-lg shadow-primary/20">Join</button>
                    <button className="p-2 border border-border rounded-xl hover:border-red-200 hover:text-red-500 text-muted-foreground transition-all">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Weekly Availability</h3>
            <button className="flex items-center gap-1.5 gradient-primary text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 shadow">
              <Plus className="w-3.5 h-3.5" /> Add Slot
            </button>
          </div>
          <div className="p-5 space-y-4">
            {AVAILABILITY.map(day => (
              <div key={day.day} className="flex items-start gap-4">
                <span className="font-medium text-sm w-20 flex-shrink-0 pt-1">{day.day}</span>
                <div className="flex flex-wrap gap-2">
                  {day.slots.map(slot => (
                    <div key={slot} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-xl">
                      <CheckCircle className="w-3 h-3" /> {slot}
                    </div>
                  ))}
                  <button className="flex items-center gap-1 text-xs text-muted-foreground border border-dashed border-border px-3 py-1.5 rounded-xl hover:border-primary/30 hover:text-primary transition-all">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ClassesScheduling;

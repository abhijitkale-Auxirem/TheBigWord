import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Star, 
  Plus, 
  CheckCircle2, 
  XCircle,
  VideoOff,
  UserCheck,
  PlusCircle,
  CalendarCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ScheduleItem {
  id: string;
  student: string;
  avatar: string;
  topic: string;
  time: string;
  duration: string;
  date: string;
  status: 'upcoming' | 'completed';
  type: string;
  rating: number | null;
  isDynamic?: boolean;
}

interface DayAvailability {
  day: string;
  slots: string[];
}

const STATIC_SCHEDULE: ScheduleItem[] = [
  { id: 'static-1', student: 'Alex Morgan', avatar: 'A', topic: 'Business Spanish - Advanced', time: '10:00 AM', duration: '60 min', date: 'Today', status: 'upcoming', type: 'Video', rating: null },
  { id: 'static-2', student: 'Priya Sharma', avatar: 'P', topic: 'IELTS Speaking Practice', time: '2:00 PM', duration: '45 min', date: 'Today', status: 'upcoming', type: 'Video', rating: null },
  { id: 'static-3', student: 'Carlos G.', avatar: 'C', topic: 'French Beginner Level 3', time: '4:30 PM', duration: '60 min', date: 'Tomorrow', status: 'upcoming', type: 'Video', rating: null },
  { id: 'static-4', student: 'Yuki T.', avatar: 'Y', topic: 'Japanese Conversation', time: '11:00 AM', duration: '45 min', date: 'Jun 12', status: 'completed', type: 'Video', rating: 5 },
  { id: 'static-5', student: 'Ahmed K.', avatar: 'A', topic: 'English Grammar Review', time: '9:00 AM', duration: '60 min', date: 'Jun 11', status: 'completed', type: 'Video', rating: 4 },
];

const INITIAL_AVAILABILITY: DayAvailability[] = [
  { day: 'Monday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
  { day: 'Tuesday', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
  { day: 'Wednesday', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
  { day: 'Thursday', slots: ['10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'] },
  { day: 'Friday', slots: ['9:00 AM', '11:00 AM'] },
];

interface BookingRecord {
  id: string;
  tutorName: string;
  learnerName: string;
  tutorSpecialty: string;
  time: string;
  date: string;
  status: string;
  rating: number | null;
}

const ClassesScheduling: React.FC = () => {
  const { user } = useAuthContext();
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'availability'>('upcoming');
  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>(STATIC_SCHEDULE);
  const [availability, setAvailability] = useState<DayAvailability[]>(INITIAL_AVAILABILITY);

  useEffect(() => {
    const stored = localStorage.getItem('tbw_tutor_bookings');
    let dynamicSchedule = [...STATIC_SCHEDULE];

    if (stored && user) {
      try {
        const allBookings = JSON.parse(stored) as BookingRecord[];
        const tutorBookings = allBookings.filter((b) => b.tutorName === user.name);

        if (tutorBookings.length > 0) {
          const mappedBookings: ScheduleItem[] = tutorBookings.map((b) => ({
            id: b.id,
            student: b.learnerName || 'Alex Morgan',
            avatar: (b.learnerName || 'A').charAt(0).toUpperCase(),
            topic: b.tutorSpecialty || 'General Session Focus',
            time: b.time || '12:00 PM',
            duration: '60 min',
            date: b.date || 'Today',
            status: (b.status === 'completed' ? 'completed' : 'upcoming') as 'upcoming' | 'completed',
            type: 'Video',
            rating: b.rating || null,
            isDynamic: true
          }));

          const nonCancelledMapped = mappedBookings.filter((b) => b.status !== 'cancelled');
          dynamicSchedule = [...nonCancelledMapped, ...STATIC_SCHEDULE];
        }
      } catch (err) {
        console.error('Data hydration failure inside tracking nodes', err);
      }
    }
    setScheduleList(dynamicSchedule);
  }, [user]);

  const handleCancelSession = (id: string) => {
    const stored = localStorage.getItem('tbw_tutor_bookings');
    if (stored) {
      const allBookings = JSON.parse(stored);
      const updated = (allBookings as BookingRecord[]).map((b) => b.id === id ? { ...b, status: 'cancelled' } : b);
      localStorage.setItem('tbw_tutor_bookings', JSON.stringify(updated));
    }
    
    // Fallback UI mutation for mock states
    setScheduleList(prev => prev.filter(item => item.id !== id));
    toast.success('Session cancellation token processed.');
  };

  const handleCompleteSession = (id: string) => {
    const stored = localStorage.getItem('tbw_tutor_bookings');
    if (stored) {
      const allBookings = JSON.parse(stored);
      const updated = (allBookings as BookingRecord[]).map((b) => b.id === id ? { ...b, status: 'completed' } : b);
      localStorage.setItem('tbw_tutor_bookings', JSON.stringify(updated));
    }

    // Mutate reactive model views immediately
    setScheduleList(prev => 
      prev.map(item => item.id === id ? { ...item, status: 'completed', rating: 5 } : item)
    );
    
    toast.success('Video room terminated. Unit pipeline moved to complete ledger.');
  };

  const handleAddGlobalSlot = () => {
    toast.info('Availability wizard launched. Select target calendar arrays to add broad rules.');
  };

  const handleAddDaySlot = (targetDay: string) => {
    const freshSlot = '5:00 PM';
    setAvailability(prev => 
      prev.map(d => {
        if (d.day === targetDay) {
          if (d.slots.includes(freshSlot)) return d;
          return { ...d, slots: [...d.slots, freshSlot].sort() };
        }
        return d;
      })
    );
    toast.success(`Appended tracking slot allocation (${freshSlot}) to ${targetDay}.`);
  };

  const filteredItems = scheduleList.filter(s => s.status === tab);
  const totalUpcomingCount = scheduleList.filter(s => s.status === 'upcoming').length;

  return (
    <DashboardLayout title="Instructor Logistics Panel" subtitle="Configure operational weekly blocks and verify routing streams">
      
      {/* High Density Tab Controls Section Header */}
      <div className="flex gap-1.5 bg-slate-50 border border-slate-200/60 p-1 rounded-xl w-fit mb-5 select-none">
        {(['upcoming', 'completed', 'availability'] as const).map(t => {
          const isActive = tab === t;
          return (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${
                isActive 
                  ? 'bg-slate-900 border border-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {t === 'upcoming' ? `Upcoming Tracks (${totalUpcomingCount})` : t === 'completed' ? 'Completed Logs' : 'Availability Blueprint'}
            </button>
          );
        })}
      </div>

      {/* Main Core Render Panel Grid switcher */}
      {tab !== 'availability' ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 select-none">
                  {['Student Identifier', 'Specialization Matrix', 'Calendar Node', 'Timeline', 'Window Size', 'Format', 'Evaluation State', 'Actions Protocol'].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold text-slate-400 px-5 py-3 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs font-medium text-slate-700">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-slate-400 font-medium select-none bg-slate-50/20">
                      <VideoOff className="w-6 h-6 mx-auto mb-2 text-slate-300" />
                      No active operational rows found matching context tier: <span className="font-bold text-slate-600">{tab}</span>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-100 font-bold text-[10px] select-none shadow-inner">
                            {s.avatar}
                          </div>
                          <span className="font-bold text-slate-800 tracking-tight">{s.student}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-semibold">{s.topic}</td>
                      <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap font-medium">{s.date}</td>
                      <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap font-medium">{s.time}</td>
                      <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap font-mono">{s.duration}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap select-none">
                        <span className="text-[10px] uppercase font-bold bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded text-slate-600">
                          {s.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {s.status === 'completed' && s.rating ? (
                          <div className="flex items-center gap-0.5 select-none" title={`Rated ${s.rating}/5 stars`}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${(s.rating && i < s.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] uppercase tracking-wider font-extrabold bg-blue-50 border border-blue-200/50 text-blue-700 px-2 py-0.5 rounded-md select-none">
                            {s.status}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-right">
                        {s.status === 'upcoming' ? (
                          <div className="flex items-center gap-1.5 select-none">
                            <button 
                              onClick={() => handleCompleteSession(s.id)}
                              className="h-6 px-2.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold border border-slate-800 hover:bg-slate-800 shadow-sm transition-colors"
                            >
                              Launch Link
                            </button>
                            <button 
                              title="Revoke session parameters" 
                              onClick={() => handleCancelSession(s.id)}
                              className="p-1 border border-slate-200 rounded-lg hover:border-rose-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50/50 transition-all cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-bold tracking-tight inline-flex items-center gap-1 select-none">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-500" /> Standard Cleared
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Availability Configuration Interface Box */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-fade-in">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Weekly Telemetry Distribution Matrix</h3>
            </div>
            
            <Button
              onClick={handleAddGlobalSlot}
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-7.5 rounded-xl shadow-sm inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Allocate Rule Block
            </Button>
          </div>
          
          <div className="p-5 space-y-4">
            {availability.map(day => (
              <div key={day.day} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-3.5 border-b border-slate-100 last:border-0 last:pb-0">
                <span className="font-bold text-xs text-slate-800 w-24 flex-shrink-0 select-none tracking-tight">
                  {day.day}
                </span>
                
                <div className="flex flex-wrap items-center gap-1.5">
                  {day.slots.map(slot => (
                    <div 
                      key={slot} 
                      className="flex items-center gap-1 bg-emerald-50/60 border border-emerald-200/50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-xl select-none"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" /> {slot}
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => handleAddDaySlot(day.day)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-400 border border-dashed border-slate-200 px-2.5 py-1 rounded-xl hover:border-slate-400 hover:text-slate-700 bg-white transition-all cursor-pointer shadow-sm"
                  >
                    <PlusCircle className="w-3 h-3 opacity-70" /> Append
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
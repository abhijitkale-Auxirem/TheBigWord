import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Search, 
  Star, 
  Globe, 
  Video, 
  MessageSquare, 
  ArrowLeft,
  Calendar,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Booking {
  id: string;
  learnerId: string;
  learnerName: string;
  tutorId: string;
  tutorName: string;
  tutorSpecialty: string;
  tutorImg: string;
  tutorRate: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Tutor {
  id: string;
  name: string;
  lang: string[];
  rating: number;
  reviews: number;
  rate: string;
  specialty: string;
  exp: string;
  available: boolean;
  img: string;
  lessons: number;
  tags: string[];
}

const TUTORS: Tutor[] = [
  { id: '1', name: 'Dr. Sarah Chen', lang: ['Mandarin', 'English'], rating: 4.9, reviews: 312, rate: '$45', specialty: 'Business Chinese', exp: '8 years', available: true, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', lessons: 1240, tags: ['Business', 'HSK Prep', 'Conversational'] },
  { id: '2', name: 'Carlos Mendez', lang: ['Spanish', 'English'], rating: 4.8, reviews: 248, rate: '$35', specialty: 'DELE Preparation', exp: '6 years', available: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', lessons: 890, tags: ['DELE', 'Grammar', 'Speaking'] },
  { id: '3', name: 'Marie Dupont', lang: ['French', 'English'], rating: 4.7, reviews: 195, rate: '$40', specialty: 'French Literature', exp: '10 years', available: false, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', lessons: 720, tags: ['DELF', 'Culture', 'Writing'] },
  { id: '4', name: 'Priya Sharma', lang: ['Hindi', 'English'], rating: 4.9, reviews: 156, rate: '$30', specialty: 'Bollywood Hindi', exp: '5 years', available: true, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', lessons: 540, tags: ['Conversational', 'Script', 'Culture'] },
  { id: '5', name: 'Ahmad Al-Rashid', lang: ['Arabic', 'English'], rating: 4.8, reviews: 203, rate: '$38', specialty: 'Modern Standard Arabic', exp: '7 years', available: true, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80', lessons: 780, tags: ['MSA', 'Quran Arabic', 'Business'] },
  { id: '6', name: 'Emma Wilson', lang: ['English', 'French'], rating: 4.9, reviews: 412, rate: '$50', specialty: 'IELTS Coaching', exp: '12 years', available: true, img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80', lessons: 2100, tags: ['IELTS', 'TOEFL', 'Business English'] },
];

const AVAILABLE_DATES = ['Mon Jun 15', 'Tue Jun 16', 'Wed Jun 17', 'Thu Jun 18'];
const AVAILABLE_TIMES = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'];

const TutorBooking: React.FC = () => {
  const { user } = useAuthContext();
  const [tab, setTab] = useState<'browse' | 'bookings'>('browse');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tbw_tutor_bookings');
    if (stored) {
      const allBookings = JSON.parse(stored) as Booking[];
      if (user) {
        setBookings(allBookings.filter(b => b.learnerId === user.id));
      } else {
        setBookings(allBookings);
      }
    }
  }, [user, tab]);

  const displayedTutors = TUTORS.filter(t =>
    !query || t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.lang.some(l => l.toLowerCase().includes(query.toLowerCase())) ||
    t.specialty.toLowerCase().includes(query.toLowerCase())
  );

  const currentTutor = selectedTutorId ? TUTORS.find(t => t.id === selectedTutorId) : null;

  const handleBookingSubmission = async () => {
    if (!selectedDate || !selectedTime || !currentTutor) {
      toast.error('Please assign both a operational date and timeline slot.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API storage pipeline handshake
    await new Promise(resolve => setTimeout(resolve, 800));

    const stored = localStorage.getItem('tbw_tutor_bookings');
    const existingBookings = stored ? JSON.parse(stored) : [];

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      learnerId: user?.id || '1',
      learnerName: user?.name || 'Alex Morgan',
      tutorId: currentTutor.id,
      tutorName: currentTutor.name,
      tutorSpecialty: currentTutor.specialty,
      tutorImg: currentTutor.img,
      tutorRate: currentTutor.rate,
      date: selectedDate,
      time: selectedTime,
      status: 'upcoming',
    };

    const updatedBookings = [newBooking, ...existingBookings];
    localStorage.setItem('tbw_tutor_bookings', JSON.stringify(updatedBookings));
    
    toast.success(`Session confirmed with ${currentTutor.name} for ${selectedDate} at ${selectedTime}`);
    setIsSubmitting(false);
    
    // Clear out booking matrix context
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedTutorId(null);
    setTab('bookings');
  };

  const handleCancelBooking = (bookingId: string) => {
    const stored = localStorage.getItem('tbw_tutor_bookings');
    if (stored) {
      const allBookings = JSON.parse(stored) as Booking[];
      const updated = allBookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
      localStorage.setItem('tbw_tutor_bookings', JSON.stringify(updated));
      toast.success('Session cancelled successfully.');
      if (user) {
        setBookings(updated.filter(b => b.learnerId === user.id));
      } else {
        setBookings(updated);
      }
    }
  };

  return (
    <DashboardLayout title="Instructor Registry" subtitle="Schedule 1-on-1 language matrix modules with certified specialists">
      {/* Tab Switcher */}
      <div className="flex gap-1 bg-brand-surface p-1 rounded-xl w-fit mb-6 select-none">
        <button 
          onClick={() => { setSelectedTutorId(null); setTab('browse'); }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tab === 'browse' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Browse Tutors
        </button>
        <button 
          onClick={() => { setSelectedTutorId(null); setTab('bookings'); }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tab === 'bookings' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
        >
          My Bookings ({bookings.filter(b => b.status === 'upcoming').length})
        </button>
      </div>

      {tab === 'browse' ? (
        !currentTutor ? (
          <>
            {/* High Density Filtering Input Controls */}
            <div className="relative mb-5 select-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder="Search by instructor name, target dialect matrix, or specialized curriculum..."
                className="w-full h-10 pl-11 pr-4 border border-slate-200 rounded-xl text-xs bg-white outline-none focus:ring-4 focus:ring-slate-500/5 focus:border-slate-400 font-medium shadow-inner transition-all" 
              />
            </div>

            {/* Core Structured Data Grid Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 select-none">
                      {['Instructor Portfolio', 'Target Curriculum', 'Dialect Array', 'Metrics Log', 'Rating Breakdown', 'Hourly Scale', 'Action Line'].map(h => (
                        <th key={h} className="text-left text-[10px] font-bold text-slate-400 px-5 py-3 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-xs font-medium text-slate-700">
                    {displayedTutors.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0 select-none">
                              <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                              {t.available && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 tracking-tight">{t.name}</div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <Briefcase className="w-3 h-3" /> Senior Coach ({t.exp})
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap text-slate-600 font-semibold">{t.specialty}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {t.lang.map(l => (
                              <span key={l} className="text-[9px] uppercase font-bold bg-slate-100 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md inline-flex items-center gap-1 select-none">
                                <Globe className="w-2.5 h-2.5 opacity-60" /> {l}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap text-[11px] text-slate-500">
                          <div className="font-bold text-slate-700">{t.lessons.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">Units Evaluated</div>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded-lg select-none">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[11px] font-bold text-amber-800">{t.rating}</span>
                            <span className="text-[10px] text-amber-600/70">({t.reviews})</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap text-slate-900 font-extrabold text-sm tracking-tight">{t.rate}<span className="text-[10px] text-slate-400 font-normal">/hr</span></td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <button 
                            onClick={() => setSelectedTutorId(t.id)}
                            disabled={!t.available}
                            className={`h-7.5 px-3.5 rounded-xl text-[11px] font-bold transition-all border shadow-sm ${
                              t.available 
                                ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800' 
                                : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            }`}
                          >
                            {t.available ? 'Configure Unit' : 'Unavailable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Configuration Calendar Pipeline Panel */
          <div className="max-w-xl bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-fade-in mx-auto">
            <button 
              onClick={() => { setSelectedTutorId(null); setSelectedDate(null); setSelectedTime(null); }} 
              className="h-7 px-2.5 text-xs font-bold text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm mb-5 select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" /> Registry Board
            </button>

            <div className="flex items-start gap-4 pb-4 border-b border-slate-100 mb-5">
              <img src={currentTutor.img} alt={currentTutor.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
              <div>
                <h2 className="font-bold text-base text-slate-800 tracking-tight">{currentTutor.name}</h2>
                <p className="text-slate-500 text-xs font-medium mt-0.5">{currentTutor.specialty} · Validation Node</p>
                <div className="flex items-center gap-1.5 mt-1.5 select-none">
                  <span className="inline-flex items-center gap-0.5 bg-amber-50 border border-amber-200/60 rounded px-1 text-[10px] font-bold text-amber-800">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {currentTutor.rating}
                  </span>
                  <span className="text-[11px] font-bold text-slate-800 tracking-tight">{currentTutor.rate}<span className="text-[10px] text-slate-400 font-medium">/hr</span></span>
                </div>
              </div>
            </div>

            {/* Calendar Select Layout Grid */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 select-none">
                  <Calendar className="w-3.5 h-3.5" /> 1. Select Calendar Integration Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_DATES.map(d => (
                    <button 
                      key={d} 
                      onClick={() => setSelectedDate(d)}
                      className={`p-2.5 border rounded-xl text-center text-xs font-bold transition-all shadow-sm ${
                        selectedDate === d 
                          ? 'bg-slate-900 border-slate-800 text-white' 
                          : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 select-none">
                  <Clock className="w-3.5 h-3.5" /> 2. Allocate Timeline Window
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_TIMES.map(t => (
                    <button 
                      key={t} 
                      onClick={() => setSelectedTime(t)}
                      className={`p-2 border rounded-xl text-center text-xs font-bold transition-all shadow-sm ${
                        selectedTime === t 
                          ? 'bg-slate-900 border-slate-800 text-white' 
                          : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Absolute Action Line Commands Trigger */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100 mt-2 select-none">
                <Button 
                  onClick={handleBookingSubmission}
                  disabled={isSubmitting || !selectedDate || !selectedTime}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-9.5 rounded-xl shadow-sm inline-flex items-center justify-center gap-1.5 order-2 sm:order-1"
                >
                  <Video className="w-3.5 h-3.5 text-slate-300" /> {isSubmitting ? 'Processing Pipeline...' : 'Commit Operational Booking'}
                </Button>
                
                <button 
                  onClick={() => toast.info(`Inbound channel open to message stream: ${currentTutor.name}`)}
                  className="h-9.5 px-4 text-xs font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm order-1 sm:order-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Channel Query
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* My Booked Sessions Grid Table */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 select-none">
                  {['Instructor Portfolio', 'Target Curriculum', 'Scheduled Date', 'Timeline Window', 'Hourly Scale', 'Status Node', 'Action Line'].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold text-slate-400 px-5 py-3 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs font-medium text-slate-700">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400 font-medium">
                      No active bookings found. Select "Browse Tutors" to schedule a session.
                    </td>
                  </tr>
                ) : (
                  bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={b.tutorImg} alt={b.tutorName} className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm" />
                          <div className="font-bold text-slate-800 tracking-tight">{b.tutorName}</div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-600 font-semibold">{b.tutorSpecialty}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-600 font-semibold">{b.date}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-600 font-semibold">{b.time}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-900 font-extrabold text-sm tracking-tight">{b.tutorRate}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          b.status === 'upcoming' 
                            ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                            : b.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {b.status === 'upcoming' && (
                          <button 
                            onClick={() => handleCancelBooking(b.id)}
                            className="h-7 px-3.5 rounded-xl text-[10px] font-bold border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-sm"
                          >
                            Cancel Session
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TutorBooking;
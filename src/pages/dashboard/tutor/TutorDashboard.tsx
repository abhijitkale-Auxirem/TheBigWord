import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Users, Star, DollarSign, Calendar, Clock, TrendingUp, ChevronRight, Video, MessageSquare, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';

const UPCOMING_CLASSES = [
  { student: 'Priya Sharma', time: 'Today, 2:00 PM', duration: '60 min', type: 'Business English', status: 'upcoming' },
  { student: 'Carlos M.', time: 'Today, 4:30 PM', duration: '45 min', type: 'IELTS Prep', status: 'upcoming' },
  { student: 'Aisha Rahman', time: 'Tomorrow, 10:00 AM', duration: '60 min', type: 'Conversation', status: 'scheduled' },
  { student: 'James Park', time: 'Thu, 3:00 PM', duration: '30 min', type: 'Grammar', status: 'scheduled' },
];

const RECENT_REVIEWS = [
  { student: 'Priya S.', rating: 5, comment: 'Excellent teaching! Very patient and clear.', date: '2 days ago' },
  { student: 'Carlos M.', rating: 5, comment: 'Helped me improve my IELTS score significantly.', date: '5 days ago' },
  { student: 'Wei L.', rating: 4, comment: 'Great sessions, very knowledgeable tutor.', date: '1 week ago' },
];

const TutorDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [upcomingClasses, setUpcomingClasses] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('tbw_tutor_bookings');
    let dynamicClasses = [...UPCOMING_CLASSES];

    if (stored && user) {
      const allBookings = JSON.parse(stored);
      const tutorBookings = allBookings.filter((b: any) => b.tutorName === user.name && b.status === 'upcoming');

      if (tutorBookings.length > 0) {
        const mappedBookings = tutorBookings.map((b: any) => ({
          id: b.id,
          student: b.learnerName || 'Alex Morgan',
          time: `${b.date}, ${b.time}`,
          duration: '60 min',
          type: b.tutorSpecialty,
          status: b.status,
          isDynamic: true
        }));

        dynamicClasses = [...mappedBookings, ...UPCOMING_CLASSES];
      }
    }
    setUpcomingClasses(dynamicClasses);
  }, [user]);

  const handleCompleteSession = (id: string) => {
    const stored = localStorage.getItem('tbw_tutor_bookings');
    if (stored) {
      const allBookings = JSON.parse(stored);
      const updated = allBookings.map((b: any) => b.id === id ? { ...b, status: 'completed' } : b);
      localStorage.setItem('tbw_tutor_bookings', JSON.stringify(updated));
      toast.success('Session completed.');
      
      const tutorBookings = updated.filter((b: any) => b.tutorName === user?.name && b.status === 'upcoming');
      const mappedBookings = tutorBookings.map((b: any) => ({
        id: b.id,
        student: b.learnerName || 'Alex Morgan',
        time: `${b.date}, ${b.time}`,
        duration: '60 min',
        type: b.tutorSpecialty,
        status: b.status,
        isDynamic: true
      }));
      setUpcomingClasses([...mappedBookings, ...UPCOMING_CLASSES]);
    } else {
      toast.info('Joining video room for mock session...');
    }
  };

  return (
    <DashboardLayout title="Tutor Dashboard" subtitle="Manage your classes and students">
      {/* Welcome + Earnings Banner */}
      <div className="gradient-hero rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-8 top-4 opacity-10 text-8xl font-heading font-bold hidden lg:block">教</div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1">Welcome back</p>
            <h2 className="font-heading font-bold text-2xl mb-1">{user?.name}</h2>
            <p className="text-blue-100/80 text-sm">You have <span className="font-semibold text-yellow-300">2 classes today</span> and 18 students this month.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="font-heading font-bold text-2xl">$1,840</div>
              <div className="text-xs text-blue-200">This Month</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="font-heading font-bold text-2xl">4.9</div>
              <div className="text-xs text-blue-200">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Users className="w-5 h-5 text-blue-500" />, label: 'Total Students', value: '142', bg: 'bg-blue-50' },
          { icon: <Calendar className="w-5 h-5 text-emerald-500" />, label: 'Classes This Month', value: '48', bg: 'bg-emerald-50' },
          { icon: <Star className="w-5 h-5 text-yellow-500" />, label: 'Rating', value: '4.9 / 5', bg: 'bg-yellow-50' },
          { icon: <Award className="w-5 h-5 text-purple-500" />, label: 'Students Certified', value: '37', bg: 'bg-purple-50' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4 flex items-center gap-3 border border-border`}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">{stat.icon}</div>
            <div>
              <div className="font-heading font-bold text-xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Upcoming Classes */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg">Upcoming Classes</h3>
            <button 
              onClick={() => navigate(ROUTES.TUTOR_SCHEDULE)}
              className="text-sm text-primary font-medium flex items-center gap-1"
            >
              View schedule <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-brand-surface text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {['Student', 'Class Type', 'Time', 'Duration', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  {upcomingClasses.map((cls, i) => (
                    <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-[10px]">
                            {cls.student.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-900">{cls.student}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-700 font-medium">{cls.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 font-semibold">{cls.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">{cls.duration}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${cls.status === 'upcoming' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                          {cls.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleCompleteSession(cls.id)}
                          className="h-7 text-[10px] px-2.5 border-primary/30 text-primary hover:bg-primary/5 flex-shrink-0"
                        >
                          <Video className="w-3 h-3 mr-1" /> Join
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reviews & Earnings */}
        <div className="lg:col-span-2 space-y-4">
          {/* Earnings Chart Placeholder */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" /> Earnings</h3>
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[60, 80, 45, 90, 70, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full gradient-primary rounded-t-sm" style={{ height: `${h}%` }} />
                  <span className="text-xs text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Weekly total</span>
              <span className="font-heading font-bold text-lg text-emerald-600">$460</span>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> Recent Reviews</h3>
            <div className="space-y-3">
              {RECENT_REVIEWS.map((r, i) => (
                <div key={i} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">{r.student}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.comment}</p>
                  <span className="text-xs text-muted-foreground/60">{r.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TutorDashboard;

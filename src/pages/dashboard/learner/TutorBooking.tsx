import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Search, Star, Globe, Calendar, Clock, Filter, Video, MessageSquare } from 'lucide-react';

const TUTORS = [
  { id: '1', name: 'Dr. Sarah Chen', lang: ['Mandarin', 'English'], rating: 4.9, reviews: 312, rate: '$45', specialty: 'Business Chinese', exp: '8 years', available: true, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', lessons: 1240, tags: ['Business', 'HSK Prep', 'Conversational'] },
  { id: '2', name: 'Carlos Mendez', lang: ['Spanish', 'English'], rating: 4.8, reviews: 248, rate: '$35', specialty: 'DELE Preparation', exp: '6 years', available: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', lessons: 890, tags: ['DELE', 'Grammar', 'Speaking'] },
  { id: '3', name: 'Marie Dupont', lang: ['French', 'English'], rating: 4.7, reviews: 195, rate: '$40', specialty: 'French Literature', exp: '10 years', available: false, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', lessons: 720, tags: ['DELF', 'Culture', 'Writing'] },
  { id: '4', name: 'Priya Sharma', lang: ['Hindi', 'English'], rating: 4.9, reviews: 156, rate: '$30', specialty: 'Bollywood Hindi', exp: '5 years', available: true, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', lessons: 540, tags: ['Conversational', 'Script', 'Culture'] },
  { id: '5', name: 'Ahmad Al-Rashid', lang: ['Arabic', 'English'], rating: 4.8, reviews: 203, rate: '$38', specialty: 'Modern Standard Arabic', exp: '7 years', available: true, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80', lessons: 780, tags: ['MSA', 'Quran Arabic', 'Business'] },
  { id: '6', name: 'Emma Wilson', lang: ['English', 'French'], rating: 4.9, reviews: 412, rate: '$50', specialty: 'IELTS Coaching', exp: '12 years', available: true, img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80', lessons: 2100, tags: ['IELTS', 'TOEFL', 'Business English'] },
];

const TutorBooking: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const displayed = TUTORS.filter(t =>
    !query || t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.lang.some(l => l.toLowerCase().includes(query.toLowerCase())) ||
    t.specialty.toLowerCase().includes(query.toLowerCase())
  );

  const tutor = selected ? TUTORS.find(t => t.id === selected) : null;

  return (
    <DashboardLayout title="Book a Tutor" subtitle="Connect with expert language tutors for 1-on-1 sessions">
      {!tutor ? (
        <>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, language, or specialty..."
              className="w-full h-12 pl-12 pr-4 border border-border rounded-2xl text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {displayed.map(t => (
              <div key={t.id} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                      {t.available && <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors">{t.name}</h3>
                      <p className="text-xs text-muted-foreground">{t.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold">{t.rating}</span>
                        <span className="text-xs text-muted-foreground">({t.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-heading font-bold text-primary">{t.rate}</div>
                      <div className="text-xs text-muted-foreground">/hour</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {t.lang.map(l => (
                      <span key={l} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Globe className="w-3 h-3" />{l}
                      </span>
                    ))}
                    {t.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-brand-surface text-muted-foreground px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{t.exp} experience</span>
                    <span>{t.lessons.toLocaleString()} lessons taught</span>
                  </div>

                  <button onClick={() => setSelected(t.id)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${t.available ? 'gradient-primary text-white hover:opacity-90 shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                    disabled={!t.available}>
                    {t.available ? 'Book Session' : 'Not Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-2xl animate-fade-in">
          <button onClick={() => setSelected(null)} className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1">← Back to tutors</button>
          <div className="bg-white rounded-2xl border border-border p-6 mb-5">
            <div className="flex items-start gap-4 mb-6">
              <img src={tutor.img} alt={tutor.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h2 className="font-heading font-bold text-xl">{tutor.name}</h2>
                <p className="text-muted-foreground text-sm">{tutor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tutor.rating}</span>
                  <span className="text-xs text-muted-foreground">· {tutor.reviews} reviews · {tutor.rate}/hr</span>
                </div>
              </div>
            </div>
            <h3 className="font-semibold mb-3">Select Date & Time</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['Mon Jun 10', 'Tue Jun 11', 'Wed Jun 12', 'Thu Jun 13'].map(d => (
                <button key={d} className="p-3 rounded-xl border border-border text-center hover:border-primary hover:bg-primary/5 transition-all text-xs font-medium">{d}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'].map(t => (
                <button key={t} className="p-2 rounded-xl border border-border text-xs hover:border-primary hover:bg-primary/5 transition-all font-medium">{t}</button>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 gradient-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                <Video className="w-4 h-4" /> Book Video Session
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-border font-semibold py-3 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all">
                <MessageSquare className="w-4 h-4" /> Message Tutor
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TutorBooking;

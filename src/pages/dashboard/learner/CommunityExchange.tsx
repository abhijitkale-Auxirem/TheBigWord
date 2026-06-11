import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Globe, Users, MessageSquare, Heart, Share2, Plus, Flame, Award, Search } from 'lucide-react';

const COMMUNITIES = [
  { id: 'es', flag: '🇪🇸', name: 'Spanish Speakers', members: 42800, posts: 1240, tag: 'español', active: true },
  { id: 'fr', flag: '🇫🇷', name: 'Francophone Circle', members: 31200, posts: 890, tag: 'français', active: false },
  { id: 'zh', flag: '🇨🇳', name: 'Mandarin Community', members: 58900, posts: 2100, tag: '中文', active: true },
  { id: 'ar', flag: '🇸🇦', name: 'Arabic Learners Hub', members: 24100, posts: 760, tag: 'عربي', active: false },
];

const POSTS = [
  { id: '1', user: 'Priya S.', avatar: 'P', community: '🇪🇸 Spanish', time: '10 min ago', content: 'Just had my first full conversation in Spanish with a native speaker! Cannot believe how far I have come in 3 months. TheBigWord vocabulary builder was a huge help!', likes: 47, comments: 12, liked: false },
  { id: '2', user: 'Carlos M.', avatar: 'C', community: '🇬🇧 English', time: '1 hour ago', content: 'Quick grammar question: Is it "I have been working here for 5 years" or "I am working here for 5 years"? The present perfect always trips me up!', likes: 23, comments: 31, liked: false },
  { id: '3', user: 'Yuki T.', avatar: 'Y', community: ' IELTS Prep', time: '3 hours ago', content: 'Scored Band 8 on my IELTS exam today! The mock tests here were almost identical to the real thing. So grateful for this community\'s support!', likes: 128, comments: 45, liked: true },
];

const CommunityExchange: React.FC = () => {
  const [posts, setPosts] = useState(POSTS);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  return (
    <DashboardLayout title="Global Language Community" subtitle="Connect, practice, and grow with learners worldwide">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Post Composer */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
              <div className="flex-1">
                <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
                  placeholder="Share your language learning progress, ask a question, or inspire others..."
                  rows={3}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none placeholder:text-muted-foreground" />
                <div className="flex items-center justify-between mt-3">
                 
                  <button disabled={!newPost.trim()}
                    className="gradient-primary text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-primary/20">
                    Post to Community
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow animate-fade-in">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{post.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{post.user}</span>
                    <span className="text-xs bg-brand-surface text-muted-foreground px-2 py-0.5 rounded-full">{post.community}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{post.time}</span>
                  </div>
                  <p className="text-sm text-foreground mt-2 leading-relaxed">{post.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <button onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${post.liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}>
                  <Heart className={`w-4 h-4 ${post.liked ? 'fill-red-500' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  <MessageSquare className="w-4 h-4" /> <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium ml-auto">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Communities */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Language Communities</h3>
            <div className="space-y-3">
              {COMMUNITIES.map(c => (
                <div key={c.id} className="flex items-center gap-3 hover:bg-brand-surface p-2 rounded-xl transition-colors cursor-pointer group">
                  <span className="text-xl">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.members.toLocaleString()} members</p>
                  </div>
                  <button className={`text-xs px-2.5 py-1 rounded-xl font-medium transition-all ${c.active ? 'bg-emerald-100 text-emerald-700' : 'border border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-primary'}`}>
                    {c.active ? 'Joined' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-yellow-500" /> Top Contributors</h3>
            {[
              { name: 'Yuki T.', pts: '8,920 pts', pos: 1 },
              { name: 'Carlos M.', pts: '7,450 pts', pos: 2 },
              { name: 'Priya S.', pts: '6,200 pts', pos: 3 },
            ].map(u => (
              <div key={u.name} className="flex items-center gap-3 mb-2 last:mb-0">
                <span className={`font-heading font-bold text-sm w-5 ${u.pos === 1 ? 'text-yellow-500' : u.pos === 2 ? 'text-gray-400' : 'text-amber-600'}`}>#{u.pos}</span>
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{u.name[0]}</div>
                <div className="flex-1"><p className="text-sm font-medium">{u.name}</p></div>
                <span className="text-xs font-semibold text-primary">{u.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunityExchange;

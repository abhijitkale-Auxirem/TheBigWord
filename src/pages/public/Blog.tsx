import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Clock, User, Tag, ArrowRight, Search } from 'lucide-react';

const POSTS = [
  { slug: 'master-english-vocab', title: 'How to Master English Vocabulary in 90 Days', excerpt: 'A science-backed approach using spaced repetition, context learning, and AI flashcards to build an impressive vocabulary.', category: 'Learning Tips', author: 'Dr. Sarah Chen', date: 'Jun 5, 2026', readTime: '8 min', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80', featured: true },
  { slug: 'ai-language-learning', title: 'The Future of AI in Language Learning', excerpt: 'How artificial intelligence is transforming how we learn languages, from personalized paths to real-time pronunciation coaching.', category: 'Technology', author: 'Alex Morgan', date: 'Jun 1, 2026', readTime: '6 min', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', featured: false },
  { slug: 'ielts-tips', title: 'Top 10 IELTS Preparation Tips for Band 8+', excerpt: 'Expert strategies from candidates who scored Band 8 and above. Learn which areas matter most and how to practice effectively.', category: 'Exam Prep', author: 'Yuki Tanaka', date: 'May 28, 2026', readTime: '10 min', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', featured: false },
  { slug: 'business-english', title: 'Business English: Phrases That Make You Sound Professional', excerpt: 'Upgrade your workplace communication with these essential phrases for meetings, emails, and presentations.', category: 'Business', author: 'Carlos Mendez', date: 'May 22, 2026', readTime: '7 min', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80', featured: false },
  { slug: 'spanish-beginner', title: 'Spanish for Absolute Beginners: Week 1 Guide', excerpt: 'Your complete first-week guide to Spanish — covering greetings, numbers, and essential everyday phrases with audio practice.', category: 'Spanish', author: 'Elena Rossi', date: 'May 18, 2026', readTime: '9 min', img: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80', featured: false },
  { slug: 'speaking-confidence', title: 'Overcome Speaking Anxiety in a Foreign Language', excerpt: 'Practical techniques to build speaking confidence including AI practice sessions, accountability partners, and mindset shifts.', category: 'Speaking', author: 'Priya Sharma', date: 'May 15, 2026', readTime: '5 min', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', featured: false },
];

const CATEGORIES = ['All', 'Learning Tips', 'Technology', 'Exam Prep', 'Business', 'Spanish', 'Speaking'];

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = POSTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeCategory !== 'All');

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-hero py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-5xl text-white mb-4 animate-fade-in">TheBigWord Blog</h1>
        <p className="text-blue-100/80 text-lg mb-8 animate-fade-in delay-100">Language tips, learning strategies, and expert insights.</p>
        <div className="max-w-md mx-auto relative animate-fade-in delay-200">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-white text-sm outline-none shadow-xl"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'gradient-primary text-white shadow-lg' : 'bg-white border border-border text-muted-foreground hover:border-primary/30'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured && activeCategory === 'All' && (
          <Link to={`/blog/${featured.slug}`} className="group block mb-10">
            <div className="rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center bg-white">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-4 w-fit">{featured.category}</span>
                <h2 className="font-heading font-bold text-2xl lg:text-3xl mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" />{featured.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {(activeCategory === 'All' ? rest : filtered).map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.category}</span>
                <h3 className="font-heading font-semibold text-base mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Blog;

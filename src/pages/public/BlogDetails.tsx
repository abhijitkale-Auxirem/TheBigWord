import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Clock, User, ArrowLeft, Tag, Share2, BookmarkPlus } from 'lucide-react';

const BlogDetails: React.FC = () => {
  const { slug } = useParams();

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
        <Link to={ROUTES.BLOG} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="mb-6">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">Learning Tips</span>
        </div>

        <h1 className="font-heading font-bold text-4xl lg:text-5xl mb-6 leading-tight">
          How to Master English Vocabulary in 90 Days
        </h1>

        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xs">S</div>
            Dr. Sarah Chen
          </span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min read</span>
          <span>June 5, 2026</span>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Share2 className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors"><BookmarkPlus className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden mb-10">
          <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80" alt="Blog cover"
            className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-lg max-w-none text-foreground space-y-5 leading-relaxed">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Building a rich vocabulary is one of the most powerful investments you can make in your language journey. With the right system, you can learn 1,000+ new words in just 90 days.
          </p>
          <h2 className="font-heading font-bold text-2xl mt-8 mb-4">1. Use Spaced Repetition</h2>
          <p>Spaced repetition is a scientifically proven method that shows you words at optimal intervals — right when you're about to forget them. Apps like TheBigWord's Vocabulary Builder use this algorithm to maximize retention.</p>
          <h2 className="font-heading font-bold text-2xl mt-8 mb-4">2. Learn Words in Context</h2>
          <p>Rather than memorizing isolated words, always learn them within sentences. When you see a word in action — in a real sentence reflecting how native speakers use it — your brain creates stronger memory connections.</p>
          <h2 className="font-heading font-bold text-2xl mt-8 mb-4">3. Aim for 10 Words Per Day</h2>
          <p>Ten words per day equals 900 words in 90 days. Spread across morning review (5 min), midday practice (5 min), and evening reinforcement (10 min) — this is entirely achievable without overwhelming yourself.</p>
          <h2 className="font-heading font-bold text-2xl mt-8 mb-4">4. Use AI Conversation Practice</h2>
          <p>TheBigWord's AI Conversation Coach lets you practice using new vocabulary in realistic dialogues. Active recall during conversation is 3x more effective than passive reading for long-term retention.</p>
          <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-brand-surface rounded-r-xl">
            <p className="text-lg font-medium italic">"Vocabulary is the backbone of language fluency. Master the words, and the grammar will follow."</p>
            <footer className="text-sm text-muted-foreground mt-2">— Dr. Sarah Chen, Language Acquisition Expert</footer>
          </blockquote>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-heading font-semibold text-lg mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['Vocabulary', 'English Learning', 'Study Tips', 'AI Learning', 'Spaced Repetition'].map(tag => (
              <span key={tag} className="text-sm bg-brand-surface border border-border px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default BlogDetails;

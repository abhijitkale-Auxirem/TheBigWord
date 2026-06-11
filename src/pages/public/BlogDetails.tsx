import React, { useState, useEffect } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { 
  Clock, 
  ArrowLeft, 
  Share2, 
  BookmarkPlus, 
  BookmarkCheck,
  Check, 
  Sparkles, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';


interface ContentBlock {
  type: 'paragraph' | 'heading' | 'blockquote';
  text: string;
}

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorInitial: string;
  authorTitle: string;
  readTime: string;
  date: string;
  imageUrl: string;
  summary: string;
  content: ContentBlock[];
  tags: string[];
}

// Knowledge Base containing full entries mapped to the exact slugs in Blog.tsx
const BLOG_DATA: Record<string, BlogPost> = {
  'master-english-vocab': {
    slug: 'master-english-vocab',
    title: 'How to Master English Vocabulary in 90 Days',
    category: 'Learning Tips',
    author: 'Dr. Sarah Chen',
    authorInitial: 'S',
    authorTitle: 'Language Acquisition Expert',
    readTime: '8 min read',
    date: 'June 5, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80',
    summary: 'Building a rich vocabulary is one of the most powerful investments you can make in your language journey. With the right system, you can learn 1,000+ new words in just 90 days.',
    content: [
      { type: 'heading', text: '1. Use Spaced Repetition' },
      { type: 'paragraph', text: "Spaced repetition is a scientifically proven method that shows you words at optimal intervals — right when you're about to forget them. Apps like TheBigWord's Vocabulary Builder use this algorithm to maximize retention." },
      { type: 'heading', text: '2. Learn Words in Context' },
      { type: 'paragraph', text: 'Rather than memorizing isolated words, always learn them within sentences. When you see a word in action — in a real sentence reflecting how native speakers use it — your brain creates stronger memory connections.' },
      { type: 'heading', text: '3. Aim for 10 Words Per Day' },
      { type: 'paragraph', text: 'Ten words per day equals 900 words in 90 days. Spread across morning review (5 min), midday practice (5 min), and evening reinforcement (10 min) — this is entirely achievable without overwhelming yourself.' },
      { type: 'heading', text: '4. Use AI Conversation Practice' },
      { type: 'paragraph', text: "TheBigWord's AI Conversation Coach lets you practice using new vocabulary in realistic dialogues. Active recall during conversation is 3x more effective than passive reading for long-term retention." },
      { type: 'blockquote', text: '"Vocabulary is the backbone of language fluency. Master the words, and the grammar will follow."' }
    ],
    tags: ['Vocabulary', 'English Learning', 'Study Tips', 'AI Learning', 'Spaced Repetition']
  },
  'ai-language-learning': {
    slug: 'ai-language-learning',
    title: 'The Future of AI in Language Learning',
    category: 'Technology',
    author: 'Alex Morgan',
    authorInitial: 'A',
    authorTitle: 'AI Research Lead',
    readTime: '6 min read',
    date: 'June 1, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80',
    summary: 'Discover how modern neural speech parsing bridges the gap between mechanical textbook exercises and real-world cultural conversation patterns.',
    content: [
      { type: 'heading', text: 'Breaking Down the Speaking Anxiety Barrier' },
      { type: 'paragraph', text: 'The absolute largest hurdle language learners face isn’t grammar processing rules—it is the psychological fear of structural judgment during open dialogue.' },
      { type: 'paragraph', text: 'By scaling real-time Large Language Models optimized for audio latency profiles, learners can access judgment-free environments tailored to simulate authentic coffee shop conversations or corporate job review interviews at any hour.' },
      { type: 'heading', text: 'Interactive Audio Pipelines' },
      { type: 'paragraph', text: 'The integration of low-latency voice synthesis and instant syntactic parsing allows the AI coach to offer instant tips on pronunciation. You get the benefits of a native speaker coach at a fraction of the cost, available 24/7.' }
    ],
    tags: ['AI Learning', 'Tech Innovation', 'Speaking Skills', 'EdTech']
  },
  'ielts-tips': {
    slug: 'ielts-tips',
    title: 'Top 10 IELTS Preparation Tips for Band 8+',
    category: 'Exam Prep',
    author: 'Yuki Tanaka',
    authorInitial: 'Y',
    authorTitle: 'IELTS Band 8.5 Graduate',
    readTime: '10 min read',
    date: 'May 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
    summary: 'A comprehensive collection of tips and study strategies from successful candidates who scored Band 8 or higher. Master the scoring criteria and practice smart.',
    content: [
      { type: 'heading', text: '1. Understand the Assessment Criteria' },
      { type: 'paragraph', text: 'The examiners grade you on four components: Lexical Resource, Grammatical Range & Accuracy, Coherence & Cohesion, and Fluency & Pronunciation. Know exactly what each band level requires before writing or speaking.' },
      { type: 'heading', text: '2. Practice Active Listening and Transcription' },
      { type: 'paragraph', text: 'Do not just play listening tasks in the background. Transcribe short news clips or academic discussions word-for-word. This sharpens your spelling, syntax awareness, and concentration.' },
      { type: 'heading', text: '3. Structure Your Writing Task 2 Properly' },
      { type: 'paragraph', text: 'Ensure you have a clear Introduction (with a clear thesis statement), two Main Body Paragraphs (using the PEEL structure: Point, Explanation, Example, Link), and a brief Conclusion. Cohesion scores represent 25% of your final writing band.' },
      { type: 'blockquote', text: '"IELTS is not just an English test; it is a communication and time-management strategy test."' }
    ],
    tags: ['IELTS', 'Exam Prep', 'Study Guides', 'Academic English']
  },
  'business-english': {
    slug: 'business-english',
    title: 'Business English: Phrases That Make You Sound Professional',
    category: 'Business',
    author: 'Carlos Mendez',
    authorInitial: 'C',
    authorTitle: 'Corporate Trainer',
    readTime: '7 min read',
    date: 'May 22, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80',
    summary: 'Upgrade your workplace communication with these essential phrases for meetings, negotiations, formal emails, and executive presentations.',
    content: [
      { type: 'heading', text: 'Softening Direct Commands' },
      { type: 'paragraph', text: "Instead of saying 'Do this task by Friday,' use collaborative alternatives like: 'Would you be able to finalize this task by Friday?' or 'Could we aim to get this task wrapped up by Friday?' Softened requests increase positive response rates." },
      { type: 'heading', text: 'Navigating Technical Disagreements' },
      { type: 'paragraph', text: "Express differences constructively using structures like: 'I see your point, however, have we considered the scalability implications?' or 'That is an interesting angle; my concern is how it impacts our timeline.'" },
      { type: 'heading', text: 'Providing Project Ticker Updates' },
      { type: 'paragraph', text: "Utilize robust business verbs: 'We have aligned our resources,' 'I will loop you in once it goes live,' or 'Let's touch base on Monday to sync up progress details.'" }
    ],
    tags: ['Business English', 'Workplace Culture', 'Communication Skills']
  },
  'spanish-beginner': {
    slug: 'spanish-beginner',
    title: 'Spanish for Absolute Beginners: Week 1 Guide',
    category: 'Spanish',
    author: 'Elena Rossi',
    authorInitial: 'E',
    authorTitle: 'Spanish Pedagogy Instructor',
    readTime: '9 min read',
    date: 'May 18, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=900&q=80',
    summary: 'Your complete first-week guide to Spanish. Learn conversational greetings, baseline numbers, gender rules, and essential everyday questions.',
    content: [
      { type: 'heading', text: '1. Mastering Pronunciation Keys' },
      { type: 'paragraph', text: "Unlike English, Spanish vowels are entirely consistent: A (ah), E (eh), I (ee), O (oh), U (oo). Pay special attention to double L ('ll' sounds like 'y' in most dialects) and the 'ñ' sound." },
      { type: 'heading', text: '2. Everyday Greetings' },
      { type: 'paragraph', text: "Start with simple phrases: '¡Hola! ¿Cómo estás?' (Hi, how are you?), 'Mucho gusto' (Nice to meet you), and '¿De dónde eres?' (Where are you from?)." },
      { type: 'heading', text: '3. Understanding Gender Matching' },
      { type: 'paragraph', text: "Nouns ending in 'o' are usually masculine (el gato), and nouns ending in 'a' are feminine (la gata). Adjectives must match the gender: 'el libro rojo' vs. 'la pluma roja'." }
    ],
    tags: ['Spanish', 'Beginners', 'Grammar Tips', 'Pronunciation']
  },
  'speaking-confidence': {
    slug: 'speaking-confidence',
    title: 'Overcome Speaking Anxiety in a Foreign Language',
    category: 'Speaking',
    author: 'Priya Sharma',
    authorInitial: 'P',
    authorTitle: 'Cognitive Linguist',
    readTime: '5 min read',
    date: 'May 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80',
    summary: 'Practical psychological techniques to conquer conversational fear. Practice safely with AI before moving to native speaker groups.',
    content: [
      { type: 'heading', text: 'Reframe Errors as Learning Milestones' },
      { type: 'paragraph', text: 'Errors are not signs of failure; they are data points showing that your brain is actively testing hypothesis blocks about language structures. Every native speaker makes mistakes too.' },
      { type: 'heading', text: 'Start with Low-Stress Simulators' },
      { type: 'paragraph', text: "Utilizing AI conversation coaches is an ideal step. AI agents don't judge, don't rush, and let you repeat sentences until you feel comfortable with pronunciation and pacing." },
      { type: 'heading', text: 'The Shadowing Technique' },
      { type: 'paragraph', text: "Listen to native speakers (audiobooks, podcasts, videos) and repeat what they say immediately after them. This helps develop mouth muscle memory, rhythm, and intonation without thinking about vocabulary." }
    ],
    tags: ['Confidence', 'Speaking', 'Mindset Shifts', 'AI Coaching']
  }
};

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Interaction states
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Normalization logic to look up posts case-insensitively, handling trailing slashes, decoding, and spaces.
  const normalizedSlug = slug ? decodeURIComponent(slug).trim().toLowerCase().replace(/\/$/, '') : '';
  const currentPost = normalizedSlug ? BLOG_DATA[normalizedSlug] : null;

  useEffect(() => {
    console.log("BlogDetails route slug:", slug, "Normalized slug:", normalizedSlug, "Post found:", !!currentPost);
  }, [slug, normalizedSlug, currentPost]);

  // Reading Progress Bar Hook
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        setReadingProgress((window.scrollY / scrollTotal) * 100);
      }
    };
    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, [slug]);

  // Copy to Clipboard Action Controller
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      toast.success('Share link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text string link parameters: ', err);
    }
  };

  // FALLBACK VIEW: Article Not Found screen
  if (!currentPost) {
    return (
      <PublicLayout>
        <section className="max-w-xl mx-auto px-6 py-24 text-center">
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
            📖
          </div>
          <h1 className="font-heading font-black text-3xl text-slate-900 tracking-tight mb-2">
            Article Not Found
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            The article key <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs">"{slug}"</code> does not point to an active database entry. Let's get you back on track.
          </p>
          <div className="space-y-3">
            <Link 
              to={ROUTES.BLOG} 
              className="inline-flex items-center justify-center gap-2 w-full h-11 text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-xl transition-colors shadow-md"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Main Feed
            </Link>
          </div>

          {/* Quick Recommend Block */}
          <div className="mt-12 pt-8 border-t border-slate-150 text-left">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Suggested Alternative Reading
            </h3>
            <button 
              onClick={() => navigate(`/blog/master-english-vocab`)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">Learning Tips</span>
                <h4 className="font-bold text-sm text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors">How to Master English Vocabulary in 90 Days</h4>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Top Reading Tracker Progress Pipeline */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 z-50 transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in relative">
        
        {/* Navigation Belt */}
        <Link 
          to={ROUTES.BLOG} 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" /> Back to Blog Feed
        </Link>

        {/* Category Header Tag */}
        <div className="mb-6">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
            {currentPost.category}
          </span>
        </div>

        {/* Document Title */}
        <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl mb-6 text-slate-900 tracking-tight leading-tight">
          {currentPost.title}
        </h1>

        {/* Metadata Belt Grid */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-200">
          <span className="flex items-center gap-2 font-medium text-slate-700">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border border-slate-200">
              {currentPost.authorInitial}
            </div>
            <div>
              <div className="leading-none text-slate-900 font-bold">{currentPost.author}</div>
              <span className="text-[10px] text-slate-400 font-medium">{currentPost.authorTitle}</span>
            </div>
          </span>
          
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <span className="flex items-center gap-1 text-xs font-semibold bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {currentPost.readTime}
          </span>
          
          <span className="text-xs font-medium">{currentPost.date}</span>
          
          {/* Action Module Utility Widgets */}
          <div className="ml-auto flex items-center gap-1.5">
            <button 
              onClick={handleShare}
              title="Copy link parameters to clipboard"
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 ${
                copied 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 text-xs font-bold px-3' 
                  : 'bg-white text-slate-500 hover:text-slate-900 border-slate-200 hover:shadow-sm'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Link Copied
                </>
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              title={isBookmarked ? "Remove Bookmark" : "Save Article Reference"}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked 
                  ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' 
                  : 'bg-white text-slate-500 hover:text-slate-900 border-slate-200 hover:shadow-sm'
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Feature Display Stage Image */}
        <div className="aspect-video rounded-2xl overflow-hidden mb-10 shadow-sm border border-slate-100 bg-slate-100">
          <img 
            src={currentPost.imageUrl} 
            alt={currentPost.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-102" 
          />
        </div>

        {/* Modular Content Mapping Engine */}
        <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6 leading-relaxed">
          
          {/* Always display core summary text block first */}
          <p className="text-lg sm:text-xl font-medium text-slate-500 leading-relaxed mb-6">
            {currentPost.summary}
          </p>

          {currentPost.content.map((block, index) => {
            switch (block.type) {
              case 'heading':
                return (
                  <h2 key={index} className="font-heading font-black text-xl sm:text-2xl text-slate-900 pt-4 mb-2 tracking-tight">
                    {block.text}
                  </h2>
                );
              case 'blockquote':
                return (
                  <blockquote key={index} className="border-l-4 border-blue-600 pl-6 py-2 my-6 bg-slate-50/80 rounded-r-xl border-dashed">
                    <p className="text-base sm:text-lg font-bold italic text-slate-800 leading-normal">{block.text}</p>
                    <footer className="text-xs text-slate-400 mt-2 font-semibold">— {currentPost.author}, {currentPost.authorTitle}</footer>
                  </blockquote>
                );
              case 'paragraph':
              default:
                return (
                  <p key={index} className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    {block.text}
                  </p>
                );
            }
          })}
        </div>

        {/* Dynamic Tag Matrix Router Grid */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
            Categorized Core Targets
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {currentPost.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </article>
    </PublicLayout>
  );
};

export default BlogDetails;
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { BookOpen, CheckCircle, XCircle, RotateCcw, ChevronRight, Zap, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabWord } from '@/types/user.types';
import { toast } from 'sonner';

const VOCAB_WORDS: VocabWord[] = [
  { id: '1', word: 'Perspicacious', definition: 'Having a ready insight; shrewd and discerning.', example: 'Her perspicacious analysis impressed the board.', difficulty: 'hard', mastered: false, category: 'Advanced', synonyms: ['shrewd', 'astute', 'perceptive'] },
  { id: '2', word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing.', example: 'He gave an eloquent speech at the conference.', difficulty: 'medium', mastered: true, category: 'Business', synonyms: ['articulate', 'fluent', 'expressive'] },
  { id: '3', word: 'Ameliorate', definition: 'To make something bad or unsatisfactory better.', example: 'The new policies will ameliorate working conditions.', difficulty: 'hard', mastered: false, category: 'Advanced', synonyms: ['improve', 'better', 'enhance'] },
  { id: '4', word: 'Concise', definition: 'Giving a lot of information clearly and in a few words.', example: 'Please be concise in your email responses.', difficulty: 'easy', mastered: true, category: 'Business', synonyms: ['brief', 'succinct', 'terse'] },
  { id: '5', word: 'Tenacious', definition: 'Tending to keep a firm hold of something; persistent.', example: 'She was tenacious in pursuing her goals.', difficulty: 'medium', mastered: false, category: 'Personality', synonyms: ['persistent', 'determined', 'resolute'] },
  { id: '6', word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically.', example: 'We need a pragmatic approach to solving this issue.', difficulty: 'medium', mastered: false, category: 'Business', synonyms: ['practical', 'realistic', 'sensible'] },
  { id: '7', word: 'Lucid', definition: 'Expressed clearly and easy to understand.', example: 'The professor gave a lucid explanation of the concept.', difficulty: 'easy', mastered: true, category: 'Academic', synonyms: ['clear', 'coherent', 'comprehensible'] },
  { id: '8', word: 'Meticulous', definition: 'Showing great attention to detail; very careful.', example: 'She was meticulous in preparing her presentation.', difficulty: 'medium', mastered: false, category: 'Personality', synonyms: ['careful', 'thorough', 'precise'] },
];

const CATEGORIES = ['All', 'Business', 'Academic', 'Advanced', 'Personality'];
const DIFFICULTIES = ['All', 'easy', 'medium', 'hard'];

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

const VocabularyBuilder: React.FC = () => {
  const [words, setWords] = useState<VocabWord[]>(VOCAB_WORDS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const filtered = words.filter(w =>
    (selectedCategory === 'All' || w.category === selectedCategory) &&
    (selectedDifficulty === 'All' || w.difficulty === selectedDifficulty)
  );

  const mastered = words.filter(w => w.mastered).length;
  const totalWords = words.length;

  const toggleMastered = (id: string) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, mastered: !w.mastered } : w));
    toast.success('Progress saved!');
  };

  const flashcardWords = filtered.filter(w => !w.mastered);

  const nextCard = () => {
    setShowDefinition(false);
    setCurrentIndex(prev => (prev + 1) % flashcardWords.length);
  };

  const markMastered = () => {
    const word = flashcardWords[currentIndex];
    toggleMastered(word.id);
    nextCard();
  };

  return (
    <DashboardLayout title="Vocabulary Builder" subtitle="Expand your vocabulary with smart learning">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Words', value: totalWords, icon: <BookOpen className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Mastered', value: mastered, icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Remaining', value: totalWords - mastered, icon: <Zap className="w-5 h-5 text-yellow-500" />, bg: 'bg-yellow-50' },
          { label: 'Progress', value: `${Math.round((mastered / totalWords) * 100)}%`, icon: <TrendingUp className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-50' },
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

      {/* Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button
            variant={!flashcardMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFlashcardMode(false)}
            className={!flashcardMode ? 'gradient-primary text-white border-0' : ''}
          >
            Word List
          </Button>
          <Button
            variant={flashcardMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setFlashcardMode(true); setCurrentIndex(0); setShowDefinition(false); }}
            className={flashcardMode ? 'gradient-primary text-white border-0' : ''}
          >
            Flashcard Mode
          </Button>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="text-xs border border-input rounded-lg px-3 py-1.5 bg-white outline-none focus:ring-2 focus:ring-primary/20"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="text-xs border border-input rounded-lg px-3 py-1.5 bg-white outline-none focus:ring-2 focus:ring-primary/20"
          >
            {DIFFICULTIES.map(d => <option key={d} className="capitalize">{d}</option>)}
          </select>
        </div>
      </div>

      {flashcardMode ? (
        /* Flashcard Mode */
        <div className="max-w-lg mx-auto">
          {flashcardWords.length === 0 ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">All words mastered!</h3>
              <p className="text-muted-foreground mb-4">Great job! You've mastered all words in this set.</p>
              <Button onClick={() => setFlashcardMode(false)} variant="outline">Back to Word List</Button>
            </div>
          ) : (
            <>
              <div className="text-center text-sm text-muted-foreground mb-4">
                Card {currentIndex + 1} of {flashcardWords.length}
              </div>
              <div
                className="bg-white rounded-2xl border border-border p-8 cursor-pointer min-h-[280px] flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setShowDefinition(!showDefinition)}
              >
                {!showDefinition ? (
                  <>
                    <div className="gradient-primary rounded-xl px-6 py-3 mb-4">
                      <span className="font-heading font-bold text-2xl text-white">{flashcardWords[currentIndex]?.word}</span>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${difficultyColors[flashcardWords[currentIndex]?.difficulty]}`}>
                      {flashcardWords[currentIndex]?.difficulty}
                    </span>
                    <p className="text-sm text-muted-foreground mt-4">Tap to reveal definition</p>
                  </>
                ) : (
                  <>
                    <div className="font-heading font-bold text-xl mb-3">{flashcardWords[currentIndex]?.word}</div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{flashcardWords[currentIndex]?.definition}</p>
                    <p className="text-sm text-foreground italic bg-brand-surface rounded-lg p-3 w-full">{`"${flashcardWords[currentIndex]?.example}"`}</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-3">
                      {flashcardWords[currentIndex]?.synonyms.map(s => (
                        <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-1 text-red-500 border-red-200 hover:bg-red-50" onClick={nextCard}>
                  <XCircle className="w-4 h-4 mr-1.5" /> Still Learning
                </Button>
                <Button className="flex-1 gradient-emerald text-white border-0 hover:opacity-90" onClick={markMastered}>
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Mastered!
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2 text-muted-foreground" onClick={nextCard}>
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Skip
              </Button>
            </>
          )}
        </div>
      ) : (
        /* Word List Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(word => (
            <div key={word.id} className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-md ${word.mastered ? 'border-emerald-200 bg-emerald-50/30' : 'border-border'}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-base">{word.word}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[word.difficulty]}`}>
                    {word.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => toggleMastered(word.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    word.mastered ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground/30 hover:border-emerald-400'
                  }`}
                >
                  {word.mastered && <CheckCircle className="w-4 h-4 text-white" />}
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{word.definition}</p>
              <p className="text-xs italic text-foreground/70 bg-brand-surface rounded-lg p-2 mb-3">{`"${word.example}"`}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {word.synonyms.slice(0, 2).map(s => (
                    <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{word.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default VocabularyBuilder;

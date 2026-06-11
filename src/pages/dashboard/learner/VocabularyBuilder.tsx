import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Zap, 
  TrendingUp, 
  Bookmark, 
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';
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
  easy: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  medium: 'bg-amber-50 text-amber-700 border-amber-200/60',
  hard: 'bg-rose-50 text-rose-700 border-rose-200/60',
};

const VocabularyBuilder: React.FC = () => {
  const [words, setWords] = useState<VocabWord[]>(VOCAB_WORDS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [previewExampleId, setPreviewExampleId] = useState<string | null>(null);

  const filtered = words.filter(w =>
    (selectedCategory === 'All' || w.category === selectedCategory) &&
    (selectedDifficulty === 'All' || w.difficulty === selectedDifficulty)
  );

  const mastered = words.filter(w => w.mastered).length;
  const totalWords = words.length;

  const toggleMastered = (id: string) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, mastered: !w.mastered } : w));
    toast.success('Status updated successfully!');
  };

  const flashcardWords = filtered.filter(w => !w.mastered);

  const nextCard = () => {
    setShowDefinition(false);
    setCurrentIndex(prev => (prev + 1) % flashcardWords.length);
  };

  const markMastered = () => {
    const word = flashcardWords[currentIndex];
    if (word) {
      toggleMastered(word.id);
      nextCard();
    }
  };

  return (
    <DashboardLayout title="Vocabulary Builder" subtitle="Expand your vocabulary with smart data logging metrics">
      
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Index', value: totalWords, icon: <BookOpen className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50/60 border-blue-100' },
          { label: 'Mastered', value: mastered, icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50/60 border-emerald-100' },
          { label: 'Remaining', value: totalWords - mastered, icon: <Zap className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50/60 border-amber-100' },
          { label: 'Efficiency Progress', value: `${Math.round((mastered / totalWords) * 100)}%`, icon: <TrendingUp className="w-5 h-5 text-indigo-500" />, bg: 'bg-indigo-50/60 border-indigo-100' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4 flex items-center gap-3 border`}>
            <div className="w-10 h-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center shadow-sm">{stat.icon}</div>
            <div>
              <div className="font-heading font-bold text-lg text-slate-800 tracking-tight">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Control Navigation Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
        <div className="flex gap-1.5 bg-slate-200/60 p-1 rounded-xl w-fit">
          <Button
            variant={!flashcardMode ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFlashcardMode(false)}
            className={`text-xs font-bold px-4 h-8 rounded-lg ${!flashcardMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Tabular Word List
          </Button>
          <Button
            variant={flashcardMode ? 'default' : 'ghost'}
            size="sm"
            onClick={() => { setFlashcardMode(true); setCurrentIndex(0); setShowDefinition(false); }}
            className={`text-xs font-bold px-4 h-8 rounded-lg ${flashcardMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Flashcard Mode
          </Button>
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="text-xs font-bold text-slate-600 border border-slate-200 rounded-xl px-3 h-9 bg-white outline-none focus:ring-4 focus:ring-slate-500/5 focus:border-slate-400 transition-all shadow-sm"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c} Category</option>)}
          </select>
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="text-xs font-bold text-slate-600 border border-slate-200 rounded-xl px-3 h-9 bg-white outline-none focus:ring-4 focus:ring-slate-500/5 focus:border-slate-400 transition-all shadow-sm capitalize"
          >
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>)}
          </select>
        </div>
      </div>

      {/* Primary Workspace View Area */}
      {flashcardMode ? (
        /* Flashcard Mode Canvas remains isolated & clean */
        <div className="max-w-md mx-auto">
          {flashcardWords.length === 0 ? (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-slate-800">All terms mastered!</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4 max-w-xs mx-auto">You've successfully cleared your active vocabulary study queues.</p>
              <Button onClick={() => setFlashcardMode(false)} variant="outline" size="sm" className="font-bold">Back to Table</Button>
            </div>
          ) : (
            <>
              <div className="text-center text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                Index card {currentIndex + 1} of {flashcardWords.length}
              </div>
              <div
                className="bg-white rounded-2xl border border-slate-200 p-8 cursor-pointer min-h-[260px] flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all relative group"
                onClick={() => setShowDefinition(!showDefinition)}
              >
                {!showDefinition ? (
                  <>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-2.5 mb-3.5 shadow-sm">
                      <span className="font-heading font-bold text-xl text-white tracking-tight">{flashcardWords[currentIndex]?.word}</span>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 border rounded-md font-bold ${difficultyColors[flashcardWords[currentIndex]?.difficulty]}`}>
                      {flashcardWords[currentIndex]?.difficulty}
                    </span>
                    <p className="text-xs text-slate-400 absolute bottom-4 font-semibold group-hover:text-slate-600 transition-colors">Tap card to flip definition</p>
                  </>
                ) : (
                  <div className="w-full animate-fade-in">
                    <div className="font-heading font-bold text-lg text-slate-800 mb-2">{flashcardWords[currentIndex]?.word}</div>
                    <p className="text-sm font-medium text-slate-500 mb-4 leading-relaxed max-w-sm mx-auto">{flashcardWords[currentIndex]?.definition}</p>
                    <p className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3 italic w-full">"{flashcardWords[currentIndex]?.example}"</p>
                    <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                      {flashcardWords[currentIndex]?.synonyms.map(s => (
                        <span key={s} className="text-[11px] font-bold bg-slate-100 border border-slate-200/60 text-slate-600 px-2.5 py-0.5 rounded-md">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1 text-slate-500 border-slate-200 hover:bg-slate-50 text-xs font-bold h-10" onClick={nextCard}>
                  <XCircle className="w-4 h-4 mr-1.5 text-slate-400" /> Keep Reviewing
                </Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10" onClick={markMastered}>
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Mastered!
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2 text-xs font-bold text-slate-400 hover:text-slate-600" onClick={nextCard}>
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Skip Parameter
              </Button>
            </>
          )}
        </div>
      ) : (
        /* STRICTION: New Standard High-Density Vocabulary Data Table Layout */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-sm">No lexical elements matched</h3>
              <p className="text-xs text-slate-400 mt-0.5">Try resetting configuration tags to see standard rows.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-widest select-none">
                    <th className="py-3 px-5 w-8">Status</th>
                    <th className="py-3 px-4">Lexical Term</th>
                    <th className="py-3 px-4">Definition Paradigm</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Synonyms</th>
                    <th className="py-3 px-5 text-right">In-Context Snippet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-sm">
                  {filtered.map(word => (
                    <tr 
                      key={word.id} 
                      className={`hover:bg-slate-50/40 transition-colors group ${
                        word.mastered ? 'bg-emerald-50/10' : ''
                      }`}
                    >
                      {/* Checkbox Trigger Toggle Action */}
                      <td className="py-3.5 px-5">
                        <button
                          onClick={() => toggleMastered(word.id)}
                          title={word.mastered ? "Mark as reviewing" : "Mark as mastered"}
                          className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                            word.mastered 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-slate-300 hover:border-emerald-500 bg-white'
                          }`}
                        >
                          {word.mastered && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      </td>

                      {/* Vocabulary Word Display */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap tracking-tight">
                        {word.word}
                      </td>

                      {/* Structural Word Definition details */}
                      <td className="py-3.5 px-4 max-w-[280px]">
                        <div className="text-xs font-medium text-slate-500 leading-relaxed truncate group-hover:whitespace-normal group-hover:text-slate-700 transition-all">
                          {word.definition}
                        </div>
                      </td>

                      {/* Colored Difficulty Flag */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border rounded-md ${difficultyColors[word.difficulty]}`}>
                          {word.difficulty}
                        </span>
                      </td>

                      {/* Structural Tag Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded-md">
                          {word.category}
                        </span>
                      </td>

                      {/* Synonyms Chips Row */}
                      <td className="py-3.5 px-4 max-w-[160px]">
                        <div className="flex flex-wrap gap-1">
                          {word.synonyms.map(s => (
                            <span key={s} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/40 px-1.5 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Context Popover Helper Tooltip Preview Toggle */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        {previewExampleId === word.id ? (
                          <div className="text-left bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 text-xs italic max-w-xs inline-block shadow-lg animate-fade-in relative z-10">
                            <span className="block not-italic text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Example Usage:</span>
                            "{word.example}"
                            <button 
                              onClick={() => setPreviewExampleId(null)} 
                              className="block text-[10px] not-italic text-amber-400 font-bold mt-1.5 hover:underline"
                            >
                              Close Snippet
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPreviewExampleId(word.id)}
                            className="h-7 px-2.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" /> View Usage
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default VocabularyBuilder;
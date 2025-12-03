import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { adminAPI, quizAPI } from '../../services/api';

interface QuizQuestion {
  id: string;
  quizId?: string;
  category: string;
  question: string;
  options: Array<{ text: string; isCorrect: boolean }>;
  image?: string | null;
  isPremium?: boolean;
}

interface QuizCard { id: string; title: string; category: string; image: string | null; questionCount: number; }

const defaultQuestion: Omit<QuizQuestion, 'id'> = {
  quizId: '',
  category: '',
  question: '',
  options: [
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
  ],
  image: '',
  isPremium: false
};

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Omit<QuizQuestion, 'id'>>(defaultQuestion);
  const [quizzes, setQuizzes] = useState<QuizCard[]>([]);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [newQuiz, setNewQuiz] = useState<{ title: string; category: string; image?: string | null }>({ title: '', category: '', image: '' });

  useEffect(() => {
    loadQuestions();
    (async () => {
      try {
        const res = await adminAPI.getQuizzes();
        setQuizzes(res.quizzes);
      } catch (e) {
        console.error('Failed to load quizzes', e);
      }
    })();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getQuestions();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async () => {
    try {
      // Validation
      if (!newQuestion.quizId || !newQuestion.category || !newQuestion.question) {
        alert('Please fill in all required fields');
        return;
      }

      // Check if at least one answer is correct
      const hasCorrectAnswer = newQuestion.options.some(opt => opt.isCorrect);
      if (!hasCorrectAnswer) {
        alert('Please mark at least one answer as correct');
        return;
      }

      const createdRes = await adminAPI.createQuestion(newQuestion);
      const created = createdRes.question;
      setQuestions([created as QuizQuestion, ...questions]);
      
      // Reset form
      setNewQuestion(defaultQuestion);
      setCreatingNew(false);
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  const handleUpdateQuestion = async () => {
    if (!editingQuestion) return;
    
    try {
      const updatedRes = await adminAPI.updateQuestion(editingQuestion.id, editingQuestion);
      const updated = updatedRes.question;
      setQuestions(questions.map(q => q.id === updated.id ? updated as QuizQuestion : q));
      setEditingQuestion(null);
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      await adminAPI.deleteQuestion(questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A3AD] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  const QuestionForm = ({ 
    question, 
    onChange, 
    onSave, 
    onCancel 
  }: { 
    question: Omit<QuizQuestion, 'id'> | QuizQuestion;
    onChange: (q: any) => void;
    onSave: () => void;
    onCancel: () => void;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Quiz</label>
          <select
            value={question.quizId || ''}
            onChange={(e) => onChange({ ...question, quizId: e.target.value })}
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
          >
            <option value="">Select quiz…</option>
            {quizzes.map(q => (
              <option key={q.id} value={q.id}>{q.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <input
            type="text"
            value={(question as any).category || ''}
            onChange={(e) => onChange({ ...question, category: e.target.value })}
            placeholder="e.g., Ibyapa"
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Ikibazo (Kinyarwanda)</label>
        <textarea
          value={(question as any).question || ''}
          onChange={(e) => onChange({ ...question, question: e.target.value })}
          rows={2}
          placeholder="Andika ikibazo hano..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-4">Ibisubizo</label>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[index].isCorrect = e.target.checked;
                  onChange({ ...question, options: newOptions });
                }}
                className="w-5 h-5 text-[#00A3AD] border-gray-300 rounded focus:ring-[#00A3AD]"
                title="Mark as correct answer"
              />
              <input
                type="text"
                value={option.text}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[index].text = e.target.value;
                  onChange({ ...question, options: newOptions });
                }}
                placeholder={`Ibisubizo ${index + 1}`}
                className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Image URL (Optional)</label>
        <input
          type="text"
          value={(question as any).image || ''}
          onChange={(e) => onChange({ ...question, image: e.target.value })}
          placeholder="https://..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
        />
      </div>


      <div className="flex space-x-4">
        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300"
        >
          <Save className="w-4 h-4" />
          <span>Save Question</span>
        </button>
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 dark:text-white mb-2">Quiz Questions</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage quiz questions ({questions.length} total)
            </p>
          </div>
          <button
            onClick={() => setCreatingNew(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Add Question</span>
          </button>
        </div>

        {/* Quizzes Manager */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white">Manage Quizzes</h3>
                <p className="text-gray-600 dark:text-gray-400">Create new quiz sets that questions can belong to</p>
              </div>
              <button
                onClick={() => setCreatingQuiz(!creatingQuiz)}
                className="px-4 py-2 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-lg"
              >
                {creatingQuiz ? 'Close' : 'Add Quiz'}
              </button>
            </div>

            {creatingQuiz && (
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newQuiz.category}
                  onChange={(e) => setNewQuiz({ ...newQuiz, category: e.target.value })}
                  className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={newQuiz.image || ''}
                  onChange={(e) => setNewQuiz({ ...newQuiz, image: e.target.value })}
                  className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                />
                <div className="md:col-span-3 flex justify-end">
                  <button
                    onClick={async () => {
                      if (!newQuiz.title || !newQuiz.category) {
                        alert('Please provide title and category');
                        return;
                      }
                      try {
                        const res = await adminAPI.createQuiz(newQuiz);
                        setQuizzes([res.quiz, ...quizzes]);
                        setNewQuiz({ title: '', category: '', image: '' });
                        setCreatingQuiz(false);
                      } catch (e) {
                        console.error('Failed to create quiz', e);
                      }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl"
                  >
                    Save Quiz
                  </button>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map(q => (
                <div key={q.id} className="border rounded-xl p-4 bg-white dark:bg-gray-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <img src={q.image || '/src/favicon_io/android-chrome-192x192.png'} alt="Quiz" className="w-8 h-8 rounded" />
                    <div>
                      <p className="text-gray-900 dark:text-white">{q.title}</p>
                      <p className="text-xs text-gray-500">{q.category} • {q.questionCount} questions</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Create New Question */}
        {creatingNew && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-gray-900 dark:text-white mb-4">Create New Question</h3>
            <QuestionForm
              question={newQuestion}
              onChange={setNewQuestion}
              onSave={handleCreateQuestion}
              onCancel={() => {
                setCreatingNew(false);
                setNewQuestion(defaultQuestion);
              }}
            />
          </motion.div>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              {editingQuestion?.id === question.id ? (
                <QuestionForm
                  question={editingQuestion}
                  onChange={setEditingQuestion}
                  onSave={handleUpdateQuestion}
                  onCancel={() => setEditingQuestion(null)}
                />
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-3 py-1 bg-[#00A3AD]/10 dark:bg-[#00A3AD]/20 text-[#00A3AD] rounded-full text-sm">
                          {question.category}
                        </span>
                        {question.isPremium && (
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm">
                            Pro
                          </span>
                        )}
                      </div>
                      <h3 className="text-gray-900 dark:text-white mb-1">
                        {question.question}
                      </h3>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingQuestion(question)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          option.isCorrect
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                            : 'bg-gray-50 dark:bg-gray-700/50'
                        }`}
                      >
                        {option.isCorrect && (
                          <span className="text-green-500">✓</span>
                        )}
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white">{option.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

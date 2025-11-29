import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { adminAPI } from '../../services/api';

interface QuizQuestion {
  id: string;
  category_en: string;
  category_kiny: string;
  question_en: string;
  question_kiny: string;
  options: Array<{
    text_en: string;
    text_kiny: string;
    isCorrect: boolean;
  }>;
  imageUrl?: string;
  isPremium: boolean;
}

const defaultQuestion: Omit<QuizQuestion, 'id'> = {
  category_en: '',
  category_kiny: '',
  question_en: '',
  question_kiny: '',
  options: [
    { text_en: '', text_kiny: '', isCorrect: false },
    { text_en: '', text_kiny: '', isCorrect: false },
    { text_en: '', text_kiny: '', isCorrect: false },
    { text_en: '', text_kiny: '', isCorrect: false }
  ],
  imageUrl: '',
  isPremium: false
};

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Omit<QuizQuestion, 'id'>>(defaultQuestion);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const data = await adminAPI.getQuestions();
      
      // Mock data
      const mockQuestions: QuizQuestion[] = [
        {
          id: '1',
          category_en: 'Traffic Signs',
          category_kiny: 'Ibyapa',
          question_en: 'What does a red octagonal sign mean?',
          question_kiny: 'Icyapa cy\'umutuku gifite imperuke 8 bikora iki?',
          options: [
            { text_en: 'Stop', text_kiny: 'Hagarara', isCorrect: true },
            { text_en: 'Yield', text_kiny: 'Hemba inzira', isCorrect: false },
            { text_en: 'No entry', text_kiny: 'Nta winjira', isCorrect: false },
            { text_en: 'Speed limit', text_kiny: 'Umuvuduko', isCorrect: false }
          ],
          isPremium: false
        },
        {
          id: '2',
          category_en: 'Speed Limits',
          category_kiny: 'Umuvuduko',
          question_en: 'What is the speed limit in urban areas?',
          question_kiny: 'Umuvuduko ntarengwa mu mujyi ni uwuhe?',
          options: [
            { text_en: '40 km/h', text_kiny: '40 km/h', isCorrect: false },
            { text_en: '50 km/h', text_kiny: '50 km/h', isCorrect: true },
            { text_en: '60 km/h', text_kiny: '60 km/h', isCorrect: false },
            { text_en: '70 km/h', text_kiny: '70 km/h', isCorrect: false }
          ],
          isPremium: false
        }
      ];
      
      setQuestions(mockQuestions);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async () => {
    try {
      // Validation
      if (!newQuestion.category_en || !newQuestion.question_en) {
        alert('Please fill in all required fields');
        return;
      }

      // Check if at least one answer is correct
      const hasCorrectAnswer = newQuestion.options.some(opt => opt.isCorrect);
      if (!hasCorrectAnswer) {
        alert('Please mark at least one answer as correct');
        return;
      }

      // TODO: Replace with actual API call
      // const created = await adminAPI.createQuestion(newQuestion);
      
      console.log('Creating question:', newQuestion);
      
      // Add to local state
      const created = { ...newQuestion, id: Date.now().toString() };
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
      // TODO: Replace with actual API call
      // await adminAPI.updateQuestion(editingQuestion.id, editingQuestion);
      
      console.log('Updating question:', editingQuestion);
      
      // Update local state
      setQuestions(questions.map(q => q.id === editingQuestion.id ? editingQuestion : q));
      setEditingQuestion(null);
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      // TODO: Replace with actual API call
      // await adminAPI.deleteQuestion(questionId);
      
      console.log('Deleting question:', questionId);
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
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Category (English)</label>
          <input
            type="text"
            value={question.category_en}
            onChange={(e) => onChange({ ...question, category_en: e.target.value })}
            placeholder="e.g., Traffic Signs"
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Category (Kinyarwanda)</label>
          <input
            type="text"
            value={question.category_kiny}
            onChange={(e) => onChange({ ...question, category_kiny: e.target.value })}
            placeholder="e.g., Ibyapa"
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Question (English)</label>
        <textarea
          value={question.question_en}
          onChange={(e) => onChange({ ...question, question_en: e.target.value })}
          rows={2}
          placeholder="Enter question in English..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Question (Kinyarwanda)</label>
        <textarea
          value={question.question_kiny}
          onChange={(e) => onChange({ ...question, question_kiny: e.target.value })}
          rows={2}
          placeholder="Enter question in Kinyarwanda..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-4">Options</label>
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
                value={option.text_en}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[index].text_en = e.target.value;
                  onChange({ ...question, options: newOptions });
                }}
                placeholder={`Option ${index + 1} (English)`}
                className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
              />
              <input
                type="text"
                value={option.text_kiny}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[index].text_kiny = e.target.value;
                  onChange({ ...question, options: newOptions });
                }}
                placeholder={`Option ${index + 1} (Kinyarwanda)`}
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
          value={question.imageUrl || ''}
          onChange={(e) => onChange({ ...question, imageUrl: e.target.value })}
          placeholder="https://..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={question.isPremium}
            onChange={(e) => onChange({ ...question, isPremium: e.target.checked })}
            className="w-5 h-5 text-[#00A3AD] border-gray-300 rounded focus:ring-[#00A3AD]"
          />
          <span className="text-gray-700 dark:text-gray-300">Premium Question (Pro only)</span>
        </label>
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
                          {question.category_en}
                        </span>
                        {question.isPremium && (
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm">
                            Pro
                          </span>
                        )}
                      </div>
                      <h3 className="text-gray-900 dark:text-white mb-1">
                        {question.question_en}
                      </h3>
                      <p className="text-[#00A3AD] text-sm">{question.question_kiny}</p>
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
                          <p className="text-gray-900 dark:text-white">{option.text_en}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.text_kiny}</p>
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

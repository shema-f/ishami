import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Award, Zap, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

interface QuizQuestion {
  id: number;
  category_en: string;
  category_kiny: string;
  question_kiny: string;
  question_en: string;
  options: Array<{
    text_kiny: string;
    text_en: string;
    isCorrect: boolean;
  }>;
  imageUrl?: string;
}

// Mock quiz data
const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    category_en: "Traffic Signs",
    category_kiny: "Ibyapa",
    question_kiny: "Icyapa gifite ibara ryera n'umutuku bikora iki?",
    question_en: "What does a red and white sign indicate?",
    options: [
      { text_kiny: "Ibibujijwe", text_en: "Prohibition", isCorrect: true },
      { text_kiny: "Umuburo", text_en: "Warning", isCorrect: false },
      { text_kiny: "Amakuru", text_en: "Information", isCorrect: false },
      { text_kiny: "Ibisabwa", text_en: "Mandatory", isCorrect: false }
    ]
  },
  {
    id: 2,
    category_en: "Speed Limits",
    category_kiny: "Umuvuduko",
    question_kiny: "Umuvuduko ntarengwa mu mujyi ni uwuhe?",
    question_en: "What is the maximum speed limit in the city?",
    options: [
      { text_kiny: "40 km/h", text_en: "40 km/h", isCorrect: false },
      { text_kiny: "50 km/h", text_en: "50 km/h", isCorrect: true },
      { text_kiny: "60 km/h", text_en: "60 km/h", isCorrect: false },
      { text_kiny: "70 km/h", text_en: "70 km/h", isCorrect: false }
    ]
  },
  {
    id: 3,
    category_en: "Right of Way",
    category_kiny: "Uburenganzira",
    question_kiny: "Ni nde ugomba guhembwa inzira ku rusasanya?",
    question_en: "Who has the right of way at an intersection?",
    options: [
      { text_kiny: "Imodoka iva iburyo", text_en: "Vehicle from the right", isCorrect: true },
      { text_kiny: "Imodoka iva ibumoso", text_en: "Vehicle from the left", isCorrect: false },
      { text_kiny: "Imodoka nini", text_en: "Larger vehicle", isCorrect: false },
      { text_kiny: "Imodoka yihuse", text_en: "Faster vehicle", isCorrect: false }
    ]
  },
  {
    id: 4,
    category_en: "Parking",
    category_kiny: "Guhagarika",
    question_kiny: "Ni iki kigomba kurangirwa mbere yo kuva mu modoka?",
    question_en: "What must you check before exiting your vehicle?",
    options: [
      { text_kiny: "Niba hari ibinyabiziga", text_en: "If there are other vehicles", isCorrect: false },
      { text_kiny: "Niba hari abantu", text_en: "If there are people", isCorrect: false },
      { text_kiny: "Niba hari amagare", text_en: "If there are bicycles", isCorrect: false },
      { text_kiny: "Byose byavuzwe haruguru", text_en: "All of the above", isCorrect: true }
    ]
  },
  {
    id: 5,
    category_en: "Emergency",
    category_kiny: "Akaga",
    question_kiny: "Ni iyihe nimero yo guhamagara polisi?",
    question_en: "What is the police emergency number?",
    options: [
      { text_kiny: "112", text_en: "112", isCorrect: false },
      { text_kiny: "113", text_en: "113", isCorrect: true },
      { text_kiny: "114", text_en: "114", isCorrect: false },
      { text_kiny: "911", text_en: "911", isCorrect: false }
    ]
  },
  // Questions 6-20 (Premium)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    category_en: "Advanced Rules",
    category_kiny: "Amategeko Akomeye",
    question_kiny: `Ikibazo ${i + 6} - Pro access required`,
    question_en: `Question ${i + 6} - Pro access required`,
    options: [
      { text_kiny: "Igisubizo A", text_en: "Answer A", isCorrect: true },
      { text_kiny: "Igisubizo B", text_en: "Answer B", isCorrect: false },
      { text_kiny: "Igisubizo C", text_en: "Answer C", isCorrect: false },
      { text_kiny: "Igisubizo D", text_en: "Answer D", isCorrect: false }
    ]
  }))
];

export default function Quiz() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes = 1200 seconds
  const [showPaywall, setShowPaywall] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQuizCompleted(true);
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (answered) return;

    // Check for paywall
    if (!user?.isPro && currentQuestion >= 5) {
      setShowPaywall(true);
      return;
    }

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (mockQuestions[currentQuestion].options[optionIndex].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeRunningOut = timeLeft <= 60;

  if (quizCompleted) {
    const percentage = Math.round((score / 20) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-gray-200/20 dark:border-gray-700/20 shadow-2xl"
        >
          <div className={`inline-flex p-6 rounded-full mb-6 ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
            {passed ? (
              <Award className="w-20 h-20 text-green-500" />
            ) : (
              <Clock className="w-20 h-20 text-orange-500" />
            )}
          </div>
          
          <h1 className="text-gray-900 dark:text-white mb-4">
            {passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your Score: <span className={`text-3xl ${passed ? 'text-green-500' : 'text-orange-500'}`}>{score}/20</span>
            <span className="block mt-2">({percentage}%)</span>
          </p>

          {passed ? (
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Excellent work! You're ready for the real driving test. Keep up the great work!
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              You need 70% to pass. Review the materials and try again. You got this!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setTimeLeft(1200);
                setQuizCompleted(false);
                setAnswered(false);
                setSelectedAnswer(null);
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              View Leaderboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer and Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Timer */}
              <div className={`flex items-center space-x-3 ${isTimeRunningOut ? 'animate-pulse' : ''}`}>
                <Clock className={`w-6 h-6 ${isTimeRunningOut ? 'text-[#FF6B6B]' : 'text-[#00A3AD]'}`} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time Left</p>
                  <p className={`text-2xl ${isTimeRunningOut ? 'text-[#FF6B6B]' : 'text-gray-900 dark:text-white'}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="flex-1 max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {currentQuestion + 1} of {mockQuestions.length}
                  </p>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#00A3AD] to-[#008891]"
                  />
                </div>
              </div>

              {/* Score */}
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-[#00A3AD]" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
                  <p className="text-2xl text-gray-900 dark:text-white">{score}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/20 dark:border-gray-700/20 shadow-2xl"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#00A3AD]/10 dark:bg-[#00A3AD]/20 rounded-full mb-6">
              <span className="text-sm text-[#00A3AD]">{question.category_en}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-[#00A3AD]">{question.category_kiny}</span>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-gray-900 dark:text-white mb-3">
                {question.question_en}
              </h2>
              <p className="text-[#00A3AD] text-lg">
                {question.question_kiny}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = option.isCorrect;
                const showResult = answered && isSelected;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: answered ? 1 : 1.02 }}
                    whileTap={{ scale: answered ? 1 : 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answered}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-[#00A3AD]'
                    } ${answered && 'cursor-not-allowed'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white mb-1">
                          {option.text_en}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {option.text_kiny}
                        </p>
                      </div>
                      {showResult && (
                        <div className="ml-4">
                          {isCorrect ? (
                            <CheckCircle className="w-8 h-8 text-green-500" />
                          ) : (
                            <XCircle className="w-8 h-8 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Next Button */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <button
                  onClick={handleNext}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl hover:shadow-[#00A3AD]/50 transition-all duration-300"
                >
                  {currentQuestion < mockQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPaywall(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="inline-flex p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-gray-900 dark:text-white mb-4">Unlock Pro Access</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You've completed 5 free questions! Unlock all 20 questions, unlimited quizzes, 
                and premium features for only <span className="text-[#00A3AD]">1,000 RWF</span>.
              </p>
              
              <div className="bg-[#00A3AD]/10 rounded-xl p-4 mb-6">
                <h3 className="text-gray-900 dark:text-white mb-3">Pro Features:</h3>
                <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-[#00A3AD] mr-2" />
                    Unlimited quiz attempts
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-[#00A3AD] mr-2" />
                    Full 3D simulation access
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-[#00A3AD] mr-2" />
                    Unlimited AI assistant questions
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-[#00A3AD] mr-2" />
                    Premium resources download
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300">
                  Upgrade Now - 1,000 RWF
                </button>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Award, Zap, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { quizAPI, paymentAPI } from '../services/api';

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: Array<{ text: string; isCorrect: boolean }>;
  image?: string | null;
}

interface QuizCard {
  id: string;
  title: string;
  category: string;
  image: string | null;
  questionCount: number;
}

 

export default function Quiz() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizCard[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizCard | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [paywallAfter, setPaywallAfter] = useState<number>(6);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [showPaywall, setShowPaywall] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<Array<{ questionId: string; selectedOption: number; isCorrect: boolean }>>([]);
  const [payPhone, setPayPhone] = useState('');
  const [paying, setPaying] = useState(false);
  const [txnId, setTxnId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'SUCCESS' | 'FAILED' | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQuizCompleted(true);
    }
  }, [timeLeft, quizCompleted]);

  useEffect(() => {
    (async () => {
      try {
        const res = await quizAPI.listQuizzes();
        setQuizzes(res.quizzes);
      } catch (error) {
        console.error('Failed to load quizzes:', error);
      }
    })();
  }, []);

  const startQuiz = async (quiz: QuizCard) => {
    try {
      if (!user) { navigate('/auth'); return; }
      const res = await quizAPI.getQuiz(quiz.id);
      setSelectedQuiz(quiz);
      setQuestions(res.questions);
      setPaywallAfter(res.paywallAfter || 6);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswered(false);
      setScore(0);
      setQuizCompleted(false);
      setShowPaywall(false);
      setTimeLeft(1200);
      setAnswers([]);
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (answered) return;

    // Paywall after question 6 for non-Pro
    if (!user?.isPro && currentQuestion >= paywallAfter) {
      setShowPaywall(true);
      return;
    }

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (questions[currentQuestion].options[optionIndex].isCorrect) {
      setScore(score + 1);
    }

    const q = questions[currentQuestion];
    const entry = { questionId: q.id, selectedOption: optionIndex, isCorrect: q.options[optionIndex].isCorrect };
    setAnswers(prev => {
      const idx = prev.findIndex(a => a.questionId === q.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = entry;
        return next;
      }
      return [...prev, entry];
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeRunningOut = timeLeft <= 60;

  useEffect(() => {
    (async () => {
      if (quizCompleted && user && selectedQuiz) {
        try {
          await quizAPI.submitQuiz({
            userId: user.id,
            answers,
            score,
            totalQuestions: questions.length,
            timeTakenSeconds: 1200 - timeLeft,
          });
        } catch (e) {
          console.error('Failed to submit quiz:', e);
        }
      }
    })();
  }, [quizCompleted]);

  if (selectedQuiz && quizCompleted) {
    const percentage = Math.round((score / 20) * 100);
    const passed = percentage >= 70;

    return (
      <div className="font-montserrat min-h-screen py-12 px-4 flex items-center justify-center">
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

  if (!selectedQuiz) {
    return (
      <div className="font-montserrat min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-900 dark:text-white mb-6">Hitamo Ikizamini</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Buri kizamini kigizwe n'ibibazo 20. Ifoto izashyirwa hano.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((q, idx) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow flex flex-col h-[320px]"
              >
                <img
                  src={`/src/assets/quiz${Math.min(idx + 1, 20)}.png`}
                  alt="Quiz"
                  className="w-full h-32 sm:h-36 md:h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-gray-900 dark:text-white mb-1 line-clamp-2">{q.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{q.category}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Ibibazo: {q.questionCount}</p>
                  <button onClick={() => startQuiz(q)} className="mt-auto w-full px-4 py-2 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl">Tangira</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="font-montserrat min-h-screen py-8 px-4">
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
                    {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
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
              <span className="text-sm text-[#00A3AD]">{selectedQuiz.category}</span>
            </div>

            {/* Image (if provided) */}
            {question.image && (
              <div className="mb-6">
                <img src={question.image as any} alt="Question" className="w-full max-h-64 object-contain rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
              </div>
            )}

            {/* Question */}
            <div className="mb-8">
              <p className="text-gray-900 dark:text-white text-lg">
                {question.question}
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
                          {option.text}
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

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center gap-3"
            >
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className={`px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-600'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!answered}
                className={`flex-1 px-8 py-4 rounded-xl transition-all duration-300 ${!answered ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300' : 'bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white hover:shadow-xl hover:shadow-[#00A3AD]/50'}`}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </motion.div>
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
                You've completed 6 free questions! Unlock all 20 questions, unlimited quizzes, 
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
                <input
                  type="tel"
                  placeholder="MTN phone (e.g. 0788xxxxxx)"
                  value={payPhone}
                  onChange={(e) => setPayPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                />
                <button
                  onClick={async () => {
                    if (!user) { navigate('/login'); return; }
                    if (!payPhone) { setPaymentError('Enter phone number'); return; }
                    try {
                      setPaying(true);
                      setPaymentError(null);
                      const res = await paymentAPI.initiatePayment({ userId: user.id, amount: 1000, phone: payPhone, provider: 'mtn', product: 'pro' });
                      setTxnId(res.transactionId);
                      setPaymentStatus('PENDING');
                      let tries = 0;
                      const iv = setInterval(async () => {
                        tries++;
                        try {
                          const s = await paymentAPI.checkStatus(res.transactionId);
                          setPaymentStatus(s.status);
                          if (s.status === 'SUCCESS') {
                            clearInterval(iv);
                            setPaying(false);
                            updateUser({ isPro: true });
                            setShowPaywall(false);
                          } else if (s.status === 'FAILED' || tries > 40) {
                            clearInterval(iv);
                            setPaying(false);
                          }
                        } catch {
                          clearInterval(iv);
                          setPaying(false);
                        }
                      }, 3000);
                    } catch (e: any) {
                      setPaying(false);
                      setPaymentError(e?.message || 'Payment failed');
                    }
                  }}
                  disabled={paying}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {paying ? 'Processing…' : 'Pay with MTN MoMo - 1,000 RWF'}
                </button>
                {paymentError && <div className="text-red-500 text-sm">{paymentError}</div>}
                {txnId && paymentStatus === 'PENDING' && <div className="text-sm text-gray-600 dark:text-gray-400">Awaiting MoMo approval on your phone…</div>}
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

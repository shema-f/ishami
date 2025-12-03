import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { aiAPI } from '../services/api';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  image?: string | null;
}

const suggestedPrompts = [
  "What does a red octagonal sign mean?",
  "Icyapa cy'umutuku gifite imperuke 8 bikora iki?",
  "How do I park on a hill?",
  "What's the speed limit in Kigali?",
  "Explain right-of-way rules",
  "Nibwo buryo bwo gusiganwa?"
];

const guardrailResponse = "Mwaramutse! I'm Moto-Sensei, your friendly Rwandan driving instructor. I can only help you with questions about Rwanda Traffic Rules and the Code de la Route. Please ask me something related to driving, traffic signs, or road safety! 🚗";

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Mwaramutse! 👋 I'm Moto-Sensei, your friendly Rwandan driving instructor! Ask me anything about traffic rules, road signs, or driving techniques. I'm here to help you pass that test! Turategure?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (response: { text: string; image?: string | null }) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setIsTyping(false);
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: response.text,
      isUser: false,
      timestamp: new Date(),
      image: response.image || null
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getMockResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    // Check if question is off-topic
    if (!lowerQ.includes('traffic') && !lowerQ.includes('road') && !lowerQ.includes('sign') && 
        !lowerQ.includes('drive') && !lowerQ.includes('park') && !lowerQ.includes('speed') &&
        !lowerQ.includes('umuhanda') && !lowerQ.includes('icyapa') && !lowerQ.includes('gutwara') &&
        !lowerQ.includes('gusiganwa') && !lowerQ.includes('guhagarara')) {
      return guardrailResponse;
    }

    // Mock responses for traffic-related questions
    if (lowerQ.includes('red') || lowerQ.includes('umutuku') || lowerQ.includes('stop')) {
      return "A red octagonal sign is a STOP sign (Icyapa cyo guhagarara). You must come to a complete stop before the white line or crosswalk, check for traffic, and proceed only when it's safe. Ni ngombwa guhagarara burundu!";
    }
    
    if (lowerQ.includes('speed') || lowerQ.includes('umuvuduko') || lowerQ.includes('limit')) {
      return "In Kigali city and urban areas, the speed limit is 50 km/h. On highways, it's 80-100 km/h depending on the road. Always watch for speed limit signs (Icyapa cy'umuvuduko). Remember: Umutekano urabanza!";
    }
    
    if (lowerQ.includes('park') || lowerQ.includes('guhagarika')) {
      return "When parking on a hill: Turn your wheels toward the curb if facing downhill, away from the curb if facing uphill. Always engage the parking brake (frein à main). Ntuzibagirwe gukoresha frein à main!";
    }
    
    if (lowerQ.includes('overtake') || lowerQ.includes('gusiganwa')) {
      return "Overtaking (gusiganwa) is only allowed when: 1) You have clear visibility, 2) The road marking permits it (no solid line), 3) You won't exceed the speed limit. Always signal before overtaking! Safety first - Umutekano ni ingenzi!";
    }
    
    return "That's a great question about Rwanda traffic rules! Based on the Code de la Route Rwanda, I recommend checking the specific section in your study materials. Remember to always prioritize safety (umutekano) and follow all traffic signs (ibyapa by'umuhanda). Want to test your knowledge with a quiz?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Check if user is Pro or within free limit
    if (!user?.isPro && questionCount >= 5) {
      setShowPaywall(true);
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setQuestionCount(prev => prev + 1);

    try {
      const res = await aiAPI.askQuestion(user ? user.id : 'anonymous', input, questionCount + 1);
      await simulateTyping({ text: res.text, image: res.image || null });
    } catch (e) {
      await simulateTyping({ text: "Ndakumbuye igisubizo. Ongera ugerageze nyuma." });
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative text-6xl">🧑🏿‍🏫</div>
            </div>
          </div>
          <h1 className="text-gray-900 dark:text-white mb-2">Moto-Sensei</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your Friendly Rwandan Driving Instructor AI
          </p>
          {!user?.isPro && (
            <p className="text-sm text-orange-500 mt-2">
              {5 - questionCount} free questions remaining
            </p>
          )}
        </motion.div>

        {/* Suggested Prompts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-3 text-center">Try asking:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-[#00A3AD] hover:text-white transition-all duration-300"
              >
                {prompt}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/20 dark:border-gray-700/20 shadow-2xl overflow-hidden"
        >
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                  {!message.isUser && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-2xl">🧑🏿‍🏫</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Moto-Sensei</span>
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="leading-relaxed">{message.text}</p>
                    {message.image && (
                      <div className="mt-3">
                        <img src={message.image} alt="Source" className="w-full max-h-64 object-contain rounded-xl border border-gray-200 dark:border-gray-600" />
                      </div>
                    )}
                    <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">🧑🏿‍🏫</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Moto-Sensei is typing...</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about traffic rules..."
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-lg hover:shadow-[#00A3AD]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
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
              <div className="inline-flex p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-orange-500" />
              </div>
              <h2 className="text-gray-900 dark:text-white mb-4">Upgrade to Pro</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You've used your 5 free questions! Unlock unlimited AI assistance, full quiz access, 
                and premium features for only <span className="text-[#00A3AD]">100 RWF</span>.
              </p>
              <div className="space-y-3">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300">
                  Upgrade Now - 100 RWF
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

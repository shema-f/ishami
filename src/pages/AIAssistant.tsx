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

const detectSentiment = (text: string): string => {
  const lower = text.toLowerCase();
  if (lower.match(/\b(stupid|hate|bad|useless|angry|ibi byawe|ntabwo|fuck|shit)\b/)) return 'angry';
  if (lower.match(/\b(thanks|thank|great|good|awesome|wow|neza|cyane|murakoze)\b/)) return 'happy';
  if (lower.match(/\b(hello|hi|hey|mwaramutse|mwiriwe|salut|boss|afande)\b/)) return 'saluting';
  return 'neutral';
};

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
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

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

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!user?.isPro && questionCount >= 5) {
      setShowPaywall(true);
      return;
    }
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const now = new Date();
    setMessages(prev => [...prev, { id: prev.length + 1, text: input, isUser: true, timestamp: now }]);
    const sentiment = detectSentiment(input);
    setInput('');
    setQuestionCount(prev => prev + 1);
    setIsLoading(true);
    const startIndex = Math.max(1, messages.length - 10);
    const history = messages.slice(startIndex).map(msg => ({
      role: msg.isUser ? 'user' : 'model',
      content: msg.text
    }));
    try {
      const res = await aiAPI.askAssistant(input, sentiment, history, controller.signal);
      await simulateTyping({ text: res.text, image: null });
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      const m = String(e?.message || '');
      const rateLimited = /429/.test(m) || /rate limit/i.test(m);
      const text = rateLimited ? "Wasabye byinshi icyarimwe. Ongeza gutegereza hanyuma wongere. #GerayoAmahoro" : "Seriveri ifite ikibazo. Ongera ugerageze nyuma y'akanya. #GerayoAmahoro";
      await simulateTyping({ text, image: null });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const shareToWhatsApp = (messageText: string) => {
    const appLink = "https://ishami.rw";
    const fullText = `🧑🏿‍🏫 *Inama ya Moto-Sensei (Ishami.rw):*\n\n${messageText}\n\n--- \n📍 *Koresha Ishami App nawe utsinde ikizamini:* ${appLink}`;
    const encodedMessage = encodeURIComponent(fullText);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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
                  {!message.isUser && (
                    <button
                      onClick={() => shareToWhatsApp(message.text)}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium text-sm mt-2"
                    >
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span>Sangiza kuri WhatsApp</span>
                    </button>
                  )}
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

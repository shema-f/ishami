import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignIn) {
        await login(email, password);
      } else {
        if (!username) {
          setError('Username is required');
          setLoading(false);
          return;
        }
        await signup(username, email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Animated Logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-br from-[#00A3AD]/20 to-purple-500/20 rounded-full blur-3xl"
            />
            
            <div className="relative z-10 text-center p-12">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-flex p-8 bg-gradient-to-br from-[#00A3AD] to-[#008891] rounded-3xl mb-8 shadow-2xl"
              >
                <Zap className="w-24 h-24 text-white" />
              </motion.div>
              
              <h1 className="text-gray-900 dark:text-white mb-4">
                Welcome to ISHAMI
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Master Rwanda Traffic Rules with AI-powered learning
              </p>
              
              <div className="space-y-4 text-left bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00A3AD]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#00A3AD]">✓</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white">Interactive Quizzes</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Test your knowledge with real exam questions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00A3AD]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#00A3AD]">✓</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white">AI Assistant</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Get instant answers from Moto-Sensei
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00A3AD]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#00A3AD]">✓</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white">Track Progress</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Monitor your learning journey and compete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/20 dark:border-gray-700/20 shadow-2xl"
        >
          {/* Toggle Buttons */}
          <div className="flex space-x-2 mb-8 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            <button
              onClick={() => {
                setIsSignIn(true);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
                isSignIn
                  ? 'bg-white dark:bg-gray-600 shadow-md text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignIn(false);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
                !isSignIn
                  ? 'bg-white dark:bg-gray-600 shadow-md text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-gray-900 dark:text-white mb-2">
            {isSignIn ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {isSignIn
              ? 'Sign in to continue your learning journey'
              : 'Join thousands of successful learners'}
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isSignIn && (
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required={!isSignIn}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isSignIn && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#00A3AD] border-gray-300 rounded focus:ring-[#00A3AD]"
                  />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-[#00A3AD] text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl hover:shadow-[#00A3AD]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : isSignIn ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Social Login Placeholders */}
          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span>🔵</span>
                <span className="text-gray-700 dark:text-gray-300">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span>📘</span>
                <span className="text-gray-700 dark:text-gray-300">Facebook</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#00A3AD] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#00A3AD] hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

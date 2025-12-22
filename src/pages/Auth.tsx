import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth as firebaseAuth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [forgotStatus, setForgotStatus] = useState('');
  
  const { login, signup, updateUser, socialLogin, googleIdTokenLogin, firebaseLogin } = useAuth();
  const navigate = useNavigate();
  const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
  const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '921766633773-ggb4nlq294cvaetc8gpa5cadh6sokecu.apps.googleusercontent.com';

  const handleSocial = (provider: 'google' | 'facebook') => {
    setError('');
    setLoading(true);
    const startUrl = `${API_BASE}/api/auth/${provider}/start`;
    const popup = window.open(startUrl, 'oauth', 'width=520,height=640');
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin === 'string') {
        const expectedOrigin = new URL(API_BASE).origin;
        if (e.origin !== expectedOrigin) return;
      }
      try {
        const data: any = e.data;
        if (data && data.type === 'oauth_success' && data.token && data.user) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          updateUser(data.user);
          window.removeEventListener('message', onMessage);
          clearTimeout(fallbackTimer);
          popup && popup.close();
          navigate('/');
        }
      } catch {}
      setLoading(false);
    };
    window.addEventListener('message', onMessage);

    const fallbackTimer = setTimeout(async () => {
      try {
        await socialLogin(provider);
        navigate('/');
      } catch (e: any) {
        setError(e?.message || `${provider} sign-in failed`);
      } finally {
        setLoading(false);
        window.removeEventListener('message', onMessage);
        popup && popup.close();
      }
    }, 8000);
  };

  const handleGoogleFirebaseSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(firebaseAuth, provider);
      const oauthCred = GoogleAuthProvider.credentialFromResult(cred);
      const idToken = oauthCred?.idToken;
      if (!idToken) {
        setError('Google sign-in did not return an ID token');
        setLoading(false);
        return;
      }
      await firebaseLogin(idToken);
      navigate('/');
    } catch (e: any) {
      setError(e?.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleGisSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      if (!(window as any).google) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://accounts.google.com/gsi/client';
          s.async = true;
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('Failed to load Google script'));
          document.head.appendChild(s);
        });
      }
      const google = (window as any).google;
      let handled = false;
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            if (response?.credential && !handled) {
              handled = true;
              await googleIdTokenLogin(response.credential);
              navigate('/');
            }
          } catch (e: any) {
            setError(e?.message || 'Google sign-in failed');
          } finally {
            setLoading(false);
          }
        },
      });
      const container = document.createElement('div');
      container.style.display = 'none';
      document.body.appendChild(container);
      google.accounts.id.renderButton(container, { theme: 'outline', size: 'large' });
      container.querySelector('div')?.dispatchEvent(new Event('click'));
    } catch (e: any) {
      setError(e?.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignIn) {
        if (!identifier) {
          setError('Email or phone is required');
          setLoading(false);
          return;
        }
        await login(identifier, password);
      } else {
        if (!username) {
          setError('Username is required');
          setLoading(false);
          return;
        }
        if (!identifier) {
          setError('Email or phone is required');
          setLoading(false);
          return;
        }
        const isEmail = identifier.includes('@');
        try {
          const check = await authAPI.checkIdentifier(identifier.trim());
          if (check?.exists) {
            setError('Account already exists. Please sign in.');
            setIsSignIn(true);
            setLoading(false);
            return;
          }
        } catch {}
        try {
          await signup(username, isEmail ? identifier : '', password, isEmail ? undefined : identifier);
        } catch (e: any) {
          const msg = String(e?.message || '').toLowerCase();
          if (msg.includes('account already exists')) {
            setError('Account already exists. Please sign in.');
            setIsSignIn(true);
            return;
          }
          throw e;
        }
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
              <motion.img
                src="/src/favicon_io/android-chrome-192x192.png"
                alt="ISHAMI"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex w-24 h-24 rounded-3xl mb-8 shadow-2xl"
              />
              
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
                Email or Phone
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email or phone (e.g., name@example.com or +2507xxxxxxx)"
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
                <button type="button" onClick={() => setShowForgot(true)} className="text-[#00A3AD] text-sm hover:underline">
                  Forgot password?
                </button>
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

          {showForgot && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email or Phone</label>
                <input
                  type="text"
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  placeholder="Enter email or phone"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    setForgotStatus('');
                    const res = await authAPI.forgotPassword(forgotIdentifier);
                    setForgotStatus(res.sent ? 'Reset link sent' : 'Request received');
                  } catch (e: any) {
                    setForgotStatus(e?.message || 'Request failed');
                  }
                }}
                className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Send Reset Link
              </button>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Reset Token</label>
                <input
                  type="text"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  placeholder="Paste token"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    setForgotStatus('');
                    await authAPI.resetPassword(resetToken, newPassword2);
                    setForgotStatus('Password updated');
                    setShowForgot(false);
                  } catch (e: any) {
                    setForgotStatus(e?.message || 'Reset failed');
                  }
                }}
                className="w-full py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300"
              >
                Reset Password
              </button>
              {forgotStatus && (
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">{forgotStatus}</div>
              )}
            </div>
          )}

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
              <button
                onClick={() => handleGoogleFirebaseSignIn()}
                className="flex items-center justify-center space-x-2 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.7 0 19.6-8.3 20-19v-4.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.3 16.3 18.8 14 24 14c3 0 5.7 1.1 7.8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 16.6 4 10.3 8.2 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.3l-6.2-5.1c-2 1.7-4.7 2.7-7.4 2.7-5.1 0-9.4-3.3-11-7.9l-6.6 5.1C9.9 39.8 16.5 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.5 5.7-6.5 7.2l6.2 5.1C37.8 37.7 44 32.9 44 24c0-1.2-.1-2.3-.4-3.5z"/>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Google</span>
              </button>
              <button
                onClick={() => handleSocial('facebook')}
                className="flex items-center justify-center space-x-2 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.437H7.078V12.07h3.047V9.41c0-3.008 1.792-4.668 4.533-4.668 1.313 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.93-1.953 1.887v2.253h3.328l-.532 3.493h-2.796V24C19.612 23.093 24 18.1 24 12.073z"/>
                </svg>
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

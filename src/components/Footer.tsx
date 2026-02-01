import { Facebook, Instagram, Youtube, Mail, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import ferrivoxLogo from '../assets/ferrivox.png';

export default function Footer() {
  const [quickOpen, setQuickOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <footer className="bg-white dark:bg-[#1A1A2E] border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/android-chrome-192x192.png" alt="ISHAMI" className="w-8 h-8 rounded-lg" />
              <h3 className="text-[#00A3AD]">ISHAMI App</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Master Rwanda Traffic Rules with interactive quizzes, AI assistance, and 3D simulations. 
              Menya Amategeko y'Umuhanda mu buryo bugezweho.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61550840841725"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#00A3AD] hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@ishami_quiz?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#00A3AD] hover:text-white transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/bruno_munezero?igsh=MWNyMnJ1b3hmbjg0dg=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#00A3AD] hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="http://www.youtube.com/@ishami012"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#00A3AD] hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
              <img src={ferrivoxLogo} alt="Ferrivox Ltd" className="w-6 h-6 rounded-md" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                In partnership with <span className="font-semibold">Ferrivox Ltd</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center justify-between md:mb-4">
              <h4 className="text-gray-900 dark:text-white">Quick Links</h4>
              <button
                type="button"
                aria-expanded={quickOpen}
                aria-controls="footer-quick-links"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                onClick={() => setQuickOpen((v) => !v)}
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${quickOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <ul
              id="footer-quick-links"
              className={`space-y-2 transition-all duration-300 overflow-hidden ${
                quickOpen ? 'opacity-100 max-h-96 mt-2 pointer-events-auto' : 'opacity-0 max-h-0 mt-0 pointer-events-none'
              } md:opacity-100 md:max-h-none md:mt-0 md:overflow-visible md:pointer-events-auto`}
            >
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Take Quiz
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <a href="https://wa.me/250798603694" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="flex items-center justify-between md:mb-4">
              <h4 className="text-gray-900 dark:text-white">Legal</h4>
              <button
                type="button"
                aria-expanded={legalOpen}
                aria-controls="footer-legal-links"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                onClick={() => setLegalOpen((v) => !v)}
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${legalOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <ul
              id="footer-legal-links"
              className={`space-y-2 transition-all duration-300 overflow-hidden ${
                legalOpen ? 'opacity-100 max-h-96 mt-2 pointer-events-auto' : 'opacity-0 max-h-0 mt-0 pointer-events-none'
              } md:opacity-100 md:max-h-none md:mt-0 md:overflow-visible md:pointer-events-auto`}
            >
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <a href="https://wa.me/250798603694" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#00A3AD] transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ISHAMI App. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
}

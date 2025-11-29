import { motion } from 'motion/react';
import { Home, Search } from 'lucide-react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="text-9xl mb-8"
        >
          🚧
        </motion.div>
        
        <h1 className="text-gray-900 dark:text-white mb-4">
          404 - Page Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          Oops! Looks like you took a wrong turn. This page doesn't exist.
          <span className="block mt-2 text-[#00A3AD]">
            Ntabwo iyi paji ibaho!
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl hover:shadow-[#00A3AD]/50 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Start Quiz</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

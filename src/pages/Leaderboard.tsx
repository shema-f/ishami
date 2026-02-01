import { motion } from 'motion/react';
import { Trophy, Medal, TrendingUp, Crown, Zap, Share2, Link as LinkIcon, Copy, Facebook } from 'lucide-react';
import { useEffect, useState } from 'react';
import { leaderboardAPI } from '../services/api';

type LeaderboardEntry = { userId: string; username: string; bestScore: number; quizCount: number; totalMarks: number; totalQuestions: number };
const formatName = (name: string) => name || 'Unknown';

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await leaderboardAPI.getLeaderboard(100);
        if (mounted) setEntries(res.leaderboard || []);
      } catch (e) {
        setError('Failed to load leaderboard');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/leaderboard`);
    }
  }, []);
  
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-600 dark:text-gray-400">#{rank}</span>;
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  const top3 = entries.slice(0, 3);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A3AD] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-gray-900 dark:text-white mb-4">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Top performers in Rwanda Traffic Rules mastery
            <span className="block mt-1 text-[#00A3AD]">
              Abanyeshuri Batanguye Mu Kumenya Amategeko
            </span>
          </p>
        </motion.div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200 px-4 py-3">
            {error}
          </div>
        )}

        {/* Motivational Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#00A3AD] to-[#008891] rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8" />
              <div>
                <h3 className="mb-1">Climb the Rankings!</h3>
                <p className="text-white/80">
                  Complete quizzes daily to maintain your streak and earn badges
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Updated in real-time</span>
            </div>
          </div>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 shadow-xl mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#00A3AD]" />
              <span className="text-gray-900 dark:text-white">Share this leaderboard</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent('ISHAMI App Leaderboard — Can you beat me?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('ISHAMI App Leaderboard — Can you beat me? ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white text-xs hover:bg-green-600"
              >
                <span className="font-semibold">WA</span>
                WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('ISHAMI App Leaderboard — Can you beat me?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500 text-white text-xs hover:bg-sky-600"
              >
                <span className="font-semibold">TG</span>
                Telegram
              </a>
              <button
                onClick={doCopy}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs"
              >
                <LinkIcon className="w-4 h-4" />
                Open Link
              </a>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {/* 2nd Place */}
          <div className="order-1 pt-12">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-gray-300 dark:border-gray-600 text-center"
            >
              <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-gray-900 dark:text-white mb-1">
                {formatName(top3[1]?.username || '')}
              </h3>
              <p className="text-2xl text-[#00A3AD]">{top3[1]?.bestScore ?? '-'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">best score</p>
            </motion.div>
          </div>

          {/* 1st Place */}
          <div className="order-2">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 border-2 border-yellow-300 text-center relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2">
                <Crown className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-white mb-1">
                {formatName(top3[0]?.username || '')}
              </h3>
              <p className="text-3xl text-white">{top3[0]?.bestScore ?? '-'}</p>
              <p className="text-sm text-yellow-100">best score</p>
            </motion.div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 pt-12">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-400 dark:border-orange-600 text-center"
            >
              <Medal className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="text-gray-900 dark:text-white mb-1">
                {formatName(top3[2]?.username || '')}
              </h3>
              <p className="text-2xl text-[#00A3AD]">{top3[2]?.bestScore ?? '-'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">best score</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">Rank</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">User</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Best Score</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Total Quizzes</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Total Marks</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Total Questions</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Average Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <motion.tr
                    key={entry.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      index + 1 <= 3 ? getRankBgColor(index + 1) : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${index + 1 <= 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {formatName(entry.username)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-lg ${index + 1 <= 3 ? 'text-white' : 'text-[#00A3AD]'}`}>
                        {entry.bestScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`${index + 1 <= 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {entry.quizCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`${index + 1 <= 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {entry.totalMarks}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`${index + 1 <= 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {entry.totalQuestions}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`${index + 1 <= 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {Math.round((entry.totalMarks / Math.max(1, entry.totalQuestions)) * 100)}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Think you can make it to the top?
          </p>
          <a
            href="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl hover:shadow-[#00A3AD]/50 transition-all duration-300 space-x-2"
          >
            <Trophy className="w-5 h-5" />
            <span>Start Climbing</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

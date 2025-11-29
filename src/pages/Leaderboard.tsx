import { motion } from 'motion/react';
import { Trophy, Medal, Award, TrendingUp, Zap, Star, Crown } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  totalQuizzes: number;
  streak: number;
  badges: string[];
  avatar: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "Jean Claude M.",
    score: 980,
    totalQuizzes: 50,
    streak: 15,
    badges: ["SignMaster", "SpeedDemon", "ParkingPro"],
    avatar: "👨🏿‍💼"
  },
  {
    rank: 2,
    username: "Divine U.",
    score: 950,
    totalQuizzes: 48,
    streak: 12,
    badges: ["SignMaster", "SafetyFirst"],
    avatar: "👩🏿‍🎓"
  },
  {
    rank: 3,
    username: "Patrick N.",
    score: 920,
    totalQuizzes: 45,
    streak: 10,
    badges: ["SignMaster", "QuizChampion"],
    avatar: "👨🏿‍🔧"
  },
  {
    rank: 4,
    username: "Aline U.",
    score: 890,
    totalQuizzes: 42,
    streak: 8,
    badges: ["SignMaster"],
    avatar: "👩🏿‍⚕️"
  },
  {
    rank: 5,
    username: "Eric H.",
    score: 870,
    totalQuizzes: 40,
    streak: 7,
    badges: ["SignMaster", "Consistent"],
    avatar: "👨🏿‍💻"
  },
  {
    rank: 6,
    username: "Marie K.",
    score: 850,
    totalQuizzes: 38,
    streak: 6,
    badges: ["SignMaster"],
    avatar: "👩🏿‍🏫"
  },
  {
    rank: 7,
    username: "David I.",
    score: 830,
    totalQuizzes: 36,
    streak: 5,
    badges: ["SignMaster"],
    avatar: "👨🏿‍🎓"
  },
  {
    rank: 8,
    username: "Grace M.",
    score: 810,
    totalQuizzes: 34,
    streak: 5,
    badges: ["SignMaster"],
    avatar: "👩🏿‍💼"
  },
  {
    rank: 9,
    username: "Samuel R.",
    score: 790,
    totalQuizzes: 32,
    streak: 4,
    badges: ["Beginner"],
    avatar: "👨🏿‍⚖️"
  },
  {
    rank: 10,
    username: "Linda N.",
    score: 770,
    totalQuizzes: 30,
    streak: 4,
    badges: ["Beginner"],
    avatar: "👩🏿‍🔬"
  }
];

const badgeIcons: { [key: string]: { icon: JSX.Element; color: string } } = {
  "SignMaster": { icon: <Award className="w-4 h-4" />, color: "text-yellow-500" },
  "SpeedDemon": { icon: <Zap className="w-4 h-4" />, color: "text-red-500" },
  "ParkingPro": { icon: <Star className="w-4 h-4" />, color: "text-blue-500" },
  "SafetyFirst": { icon: <Trophy className="w-4 h-4" />, color: "text-green-500" },
  "QuizChampion": { icon: <Crown className="w-4 h-4" />, color: "text-purple-500" },
  "Consistent": { icon: <TrendingUp className="w-4 h-4" />, color: "text-orange-500" },
  "Beginner": { icon: <Medal className="w-4 h-4" />, color: "text-gray-500" }
};

export default function Leaderboard() {
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
              <div className="text-5xl mb-3">{mockLeaderboard[1].avatar}</div>
              <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-gray-900 dark:text-white mb-1">
                {mockLeaderboard[1].username}
              </h3>
              <p className="text-2xl text-[#00A3AD]">{mockLeaderboard[1].score}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">points</p>
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
              <div className="text-6xl mb-3">{mockLeaderboard[0].avatar}</div>
              <h3 className="text-white mb-1">
                {mockLeaderboard[0].username}
              </h3>
              <p className="text-3xl text-white">{mockLeaderboard[0].score}</p>
              <p className="text-sm text-yellow-100">points</p>
            </motion.div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 pt-12">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-400 dark:border-orange-600 text-center"
            >
              <div className="text-5xl mb-3">{mockLeaderboard[2].avatar}</div>
              <Medal className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="text-gray-900 dark:text-white mb-1">
                {mockLeaderboard[2].username}
              </h3>
              <p className="text-2xl text-[#00A3AD]">{mockLeaderboard[2].score}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">points</p>
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
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Score</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Quizzes</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white">Streak</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">Badges</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboard.map((entry, index) => (
                  <motion.tr
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      entry.rank <= 3 ? getRankBgColor(entry.rank) : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{entry.avatar}</span>
                        <span className={`${entry.rank <= 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {entry.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-lg ${entry.rank <= 3 ? 'text-white' : 'text-[#00A3AD]'}`}>
                        {entry.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={entry.rank <= 3 ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                        {entry.totalQuizzes}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Zap className={`w-4 h-4 ${entry.rank <= 3 ? 'text-white' : 'text-orange-500'}`} />
                        <span className={entry.rank <= 3 ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                          {entry.streak}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {entry.badges.map((badge, badgeIndex) => (
                          <div
                            key={badgeIndex}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                              entry.rank <= 3
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-100 dark:bg-gray-700'
                            }`}
                            title={badge}
                          >
                            <span className={entry.rank <= 3 ? 'text-white' : badgeIcons[badge]?.color}>
                              {badgeIcons[badge]?.icon}
                            </span>
                            <span className={entry.rank <= 3 ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                              {badge}
                            </span>
                          </div>
                        ))}
                      </div>
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

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, DollarSign, BookOpen, TrendingUp, Award, 
  AlertTriangle, CheckCircle, Clock 
} from 'lucide-react';
import { adminAPI } from '../../services/api';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

interface AnalyticsData {
  totalUsers: number;
  proUsers: number;
  totalRevenue: number;
  todaySignups: number;
  todayQuizAttempts: number;
  conversionRate: number;
  paymentSuccessRate: number;
  topQuestions: Array<{
    id: string;
    question: string;
    failRate: number;
  }>;
  recentPayments: Array<{
    id: string;
    username: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    loadAnalytics();
  }, [user, navigate]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const data = await adminAPI.getAnalytics();
      
      // Mock data for demonstration
      const mockData: AnalyticsData = {
        totalUsers: 10547,
        proUsers: 1432,
        totalRevenue: 1432000,
        todaySignups: 47,
        todayQuizAttempts: 312,
        conversionRate: 13.6,
        paymentSuccessRate: 94.2,
        topQuestions: [
          {
            id: '1',
            question: 'What does a red octagonal sign mean?',
            failRate: 67
          },
          {
            id: '2',
            question: 'Speed limit in urban areas',
            failRate: 54
          },
          {
            id: '3',
            question: 'Right of way at roundabout',
            failRate: 48
          }
        ],
        recentPayments: [
          {
            id: '1',
            username: 'Jean Claude M.',
            amount: 1000,
            status: 'SUCCESS',
            date: new Date().toISOString()
          },
          {
            id: '2',
            username: 'Divine U.',
            amount: 1000,
            status: 'SUCCESS',
            date: new Date().toISOString()
          },
          {
            id: '3',
            username: 'Patrick N.',
            amount: 1000,
            status: 'PENDING',
            date: new Date().toISOString()
          }
        ]
      };
      
      setAnalytics(mockData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A3AD] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const statCards = [
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      change: `+${analytics.todaySignups} today`,
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Pro Users',
      value: analytics.proUsers.toLocaleString(),
      change: `${analytics.conversionRate}% conversion`,
      icon: <Award className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-700'
    },
    {
      title: 'Total Revenue',
      value: `${(analytics.totalRevenue / 1000).toFixed(1)}K RWF`,
      change: 'All time',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-green-700'
    },
    {
      title: 'Quiz Attempts',
      value: analytics.todayQuizAttempts.toLocaleString(),
      change: 'Today',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-700'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of ISHAMI platform performance
          </p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                  {card.icon}
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {card.title}
              </h3>
              <p className="text-2xl text-gray-900 dark:text-white mb-1">
                {card.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {card.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Payment Success Rate */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-gray-900 dark:text-white mb-4">
              Payment Success Rate
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analytics.paymentSuccessRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-700"
                  />
                </div>
              </div>
              <span className="text-2xl text-gray-900 dark:text-white">
                {analytics.paymentSuccessRate}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Excellent! Most payments are processing successfully.
            </p>
          </motion.div>

          {/* Conversion Rate */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-gray-900 dark:text-white mb-4">
              Free to Pro Conversion
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analytics.conversionRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-700"
                  />
                </div>
              </div>
              <span className="text-2xl text-gray-900 dark:text-white">
                {analytics.conversionRate}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {analytics.conversionRate > 10 ? 'Great conversion rate!' : 'Room for improvement'}
            </p>
          </motion.div>
        </div>

        {/* Top Failed Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 dark:text-white">
              Most Failed Questions
            </h3>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          
          <div className="space-y-4">
            {analytics.topQuestions.map((question, index) => (
              <div key={question.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 text-sm">
                    #{index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white mb-1">
                    {question.question}
                  </p>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500"
                      style={{ width: `${question.failRate}%` }}
                    />
                  </div>
                </div>
                <span className="text-red-500">{question.failRate}%</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            💡 Consider reviewing these questions or adding more explanation.
          </p>
        </motion.div>

        {/* Recent Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-gray-900 dark:text-white mb-6">
            Recent Payments
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">User</th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Time</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {payment.username}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {payment.amount} RWF
                    </td>
                    <td className="py-3 px-4">
                      {payment.status === 'SUCCESS' ? (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Success</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                      {new Date(payment.date).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

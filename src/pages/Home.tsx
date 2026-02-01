import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Zap, Brain, BookOpen, Trophy, Car, ChevronRight, Star, Mail } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { newsletterAPI } from '../services/api';
import FlipCard from '../components/FlipCard';
import TestimonialCarousel from '../components/TestimonialCarousel';

import { toast } from 'sonner';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await newsletterAPI.subscribe(email);
      if (res?.success) {
        setSubscribed(true);
        setEmail('');
        toast.success('Welcome to our newsletter! Thanks for subscribing.');
      }
    } catch {
      toast.error('Subscription failed. Please try again.');
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Interactive Quizzes',
      titleKiny: 'Ibizamini Bihuza',
      description: 'Test your knowledge with 20-minute timed quizzes based on real Rwanda traffic rules.',
      link: '/quiz',
      color: 'from-[#00A3AD] to-[#008891]'
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: '3D Driving Simulation',
      titleKiny: 'Imyitozo yo Gutwara',
      description: 'Practice real-world scenarios in immersive 3D environments.',
      link: '/simulation',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Assistant - Moto-Sensei',
      titleKiny: 'Umufasha wa AI',
      description: 'Get instant answers from your friendly Rwandan driving instructor.',
      link: '/ai-assistant',
      color: 'from-orange-500 to-orange-700'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Download Resources',
      titleKiny: 'Kuramo Ibyatanzwe',
      description: 'Access PDFs, videos, and images of traffic signs and rules.',
      link: '/resources',
      color: 'from-green-500 to-green-700'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A3AD]/10 to-purple-500/10 dark:from-[#00A3AD]/20 dark:to-purple-500/20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-gray-900 dark:text-white mb-4 sm:mb-6 text-balance">
                <span className="inline-block">KORA RIMWE - UTSINDE </span>
                <span className="block text-[#00A3AD] mt-2 text-balance">
                  Haranira kubona provisoire na permis mu gihe gito
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                Tandukana no guta umwanya mu ma auto ecole wiga kuko ISHAMI APP ikwigisha amategeko y'umuhanda Neza kandi vuba 
                Mu gihe gito. 
              </p>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/quiz"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl hover:shadow-[#00A3AD]/50 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Tangira imyitozo</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/ai-assistant"
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Brain className="w-5 h-5" />
                  <span>Baza Moto‑Sensei</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1641295437952-092f7e8b65ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSd2FuZGElMjB0cmFmZmljJTIwcm9hZHxlbnwxfHx8fDE3NjQzNjM1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Rwanda traffic road"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-gray-200/20 dark:border-gray-700/20"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-[#00A3AD]">10K+</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Students</div>
                  </div>
                  <div>
                    <div className="text-[#00A3AD]">500+</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Questions</div>
                  </div>
                  <div>
                    <div className="text-[#00A3AD]">95%</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Pass Rate</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sticky CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 p-3 z-40">
        <div className="max-w-7xl mx-auto flex gap-3">
          <Link
            to="/quiz"
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl text-center"
          >
            Tangira imyitozo
          </Link>
          <Link
            to="/ai-assistant"
            className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-600 text-center"
          >
            Baza Moto‑Sensei
          </Link>
        </div>
      </div>

      {/* Moto‑Sensei Intro Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#00A3AD]/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-gray-200/20 dark:border-gray-700/20 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00A3AD]/10 dark:bg-[#00A3AD]/20 flex items-center justify-center text-2xl">🧑‍🏫</div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-gray-900 dark:text-white mb-2 text-balance">Moto‑Sensei: Umwarimu wa AI (Artificial Intelligence) ugufasha kwiga 
                  amategeko y’umuhanda</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Koresha Moto Sensei ubaza ibibazo bijyanye n'amategeko y'umuhanda	usobanukirwe  kandi ugere ku ntego yawe yo kubona Permi.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link
                    to="/ai-assistant"
                    className="px-6 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl transition-all duration-300 text-center"
                  >
                    Baza Moto‑Sensei
                  </Link>
                  <Link
                    to="/quiz"
                    className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-600 text-center"
                  >
                    Tangira imyitozo
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#00A3AD] to-[#008891] text-white mb-3"><Zap className="w-6 h-6" /></div>
                <p className="text-gray-900 dark:text-white">Moto Sensei igufasha Kwiga vuba</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Ibibazo bifasha kumenya aho ukeneye kongera imbaraga.</p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white mb-3"><Star className="w-6 h-6" /></div>
                <p className="text-gray-900 dark:text-white">Moto Sensei Igufasha Kwihugura neza</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Iguha Inyigisho zisobanutse mu Kinyarwanda, ku rwego rwawe.</p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white mb-3"><Trophy className="w-6 h-6" /></div>
                <p className="text-gray-900 dark:text-white">Igufasha Gutsinda</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Intego: iyo ukoreshaje ai utsinda ikizami cya provisoire bwa mbere ugikora .</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 dark:text-white mb-4">Everything You Need to Pass</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive tools designed for effective learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={feature.link}
                  className="block h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-[#00A3AD] text-sm mb-2">{feature.titleKiny}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                  <div className="mt-4 flex items-center text-[#00A3AD] group-hover:translate-x-2 transition-transform">
                    <span className="text-sm">Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flip Cards Section - Interactive Learning */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[#00A3AD]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 dark:text-white mb-4">Test Your Knowledge</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Flip the cards to reveal answers - Hindura amakarita urebe ibisubizo
            </p>
          </div>

          <FlipCard />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 dark:text-white mb-4">What Our Students Say</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands of successful learners - Twinjire mu banyeshuri babishoboye
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Irembo Service CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="relative z-10 text-center text-white">
              <Trophy className="w-16 h-16 mx-auto mb-6" />
              <h2 className="mb-4">Need Help with Irembo Registration?</h2>
              <p className="mb-8 text-purple-100">
                We can help you get your exam code through Irembo services. 
                Fast, reliable, and secure assistance.
              </p>
              <Link
                to="/irembo"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all duration-300 space-x-2 group"
              >
                <span>Get Irembo Help</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-4 text-sm text-purple-200">
                Service Fee: 5,500 RWF | Processing Time: Within 8 hours
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 mx-auto mb-6 text-[#00A3AD]" />
          <h2 className="text-gray-900 dark:text-white mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get the latest traffic rules updates, study tips, and exclusive offers delivered to your inbox.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
            >
              <p className="text-green-600 dark:text-green-400">
                ✓ Thank you for subscribing! Check your email for confirmation.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl hover:shadow-[#00A3AD]/50 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#00A3AD] to-[#008891] p-12 rounded-3xl text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="mb-4">Ready to Master Traffic Rules?</h2>
              <p className="mb-8 text-lg">
                Join over 10,000 students who passed their driving test with ISHAMI
              </p>
              <Link
                to="/auth"
                className="inline-flex items-center px-10 py-5 bg-white text-[#00A3AD] rounded-xl hover:bg-gray-100 transition-all duration-300 space-x-2 group"
              >
                <span>Get Started Free</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Gamepad2, Car, MapPin, TrendingUp, RotateCw, Bell } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { toast } from 'react-hot-toast';
import { newsletterAPI } from '../services/api';

const scenarios = [
  {
    id: 1,
    title: "Démarrage Guide",
    titleKiny: "Gutangira Gutwara",
    description: "Learn proper vehicle starting procedures and initial controls",
    icon: <Play className="w-6 h-6" />,
    difficulty: "Beginner",
    status: "coming-soon"
  },
  {
    id: 2,
    title: "Circulation",
    titleKiny: "Kugendagenda",
    description: "Practice navigating through traffic and following traffic rules",
    icon: <Car className="w-6 h-6" />,
    difficulty: "Intermediate",
    status: "coming-soon"
  },
  {
    id: 3,
    title: "Corners & Turns",
    titleKiny: "Imfuruka",
    description: "Master turning techniques and corner navigation",
    icon: <RotateCw className="w-6 h-6" />,
    difficulty: "Intermediate",
    status: "coming-soon"
  },
  {
    id: 4,
    title: "Parking",
    titleKiny: "Guhagarika",
    description: "Perfect parallel, perpendicular, and angle parking",
    icon: <MapPin className="w-6 h-6" />,
    difficulty: "Advanced",
    status: "coming-soon"
  },
  {
    id: 5,
    title: "Highway Driving",
    titleKiny: "Gutwara kuri Highway",
    description: "Experience high-speed driving and overtaking scenarios",
    icon: <TrendingUp className="w-6 h-6" />,
    difficulty: "Advanced",
    status: "coming-soon"
  }
];

export default function Simulation() {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNotify = async () => {
    if (!notifyEmail) return;
    try {
      setLoading(true);
      await newsletterAPI.subscribe(notifyEmail);
      toast.success('You have been added to the waitlist!');
      setNotifyOpen(false);
      setNotifyEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to join waitlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Video */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Image/Video */}
          <div className="relative h-[500px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1677522375375-c035e66971b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjYXIlMjAzZCUyMG5lb258ZW58MXx8fHwxNzY0MzYzNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Cyberpunk 3D car driving simulation"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with Glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20"
              >
                <Gamepad2 className="w-20 h-20 text-[#00A3AD] mx-auto mb-6" />
                <h1 className="text-white mb-4">
                  3D Driving Simulation
                </h1>
                <h2 className="text-[#00A3AD] mb-6">
                  COMING SOON
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl">
                  Experience immersive 3D driving scenarios powered by cutting-edge technology. 
                  Practice real-world situations in a safe, virtual environment.
                </p>
                
                {/* Coming Soon Badge & Notify */}
                <div className="flex flex-col items-center gap-4">
                  <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] rounded-full">
                    <Play className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-white">Launching December 2024</span>
                  </div>

                  <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me When Ready
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Join the Waitlist</DialogTitle>
                        <DialogDescription>
                          Be the first to know when our 3D Driving Simulation launches. We'll send you an email when it's ready.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={notifyEmail}
                            onChange={(e) => setNotifyEmail(e.target.value)}
                            className="col-span-3"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleNotify} disabled={loading || !notifyEmail}>
                          {loading ? 'Subscribing...' : 'Notify Me'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Integration Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-2xl p-8 mb-12 border border-purple-200 dark:border-purple-700"
        >
          <h3 className="text-gray-900 dark:text-white mb-4">Unity WebGL Integration</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This simulation will be powered by <strong>Unity WebGL</strong>, allowing you to experience 
            realistic driving scenarios directly in your browser. Each scenario will be loaded dynamically 
            and integrated seamlessly into the ISHAMI platform.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
              <h4 className="text-gray-900 dark:text-white mb-2">For Developers</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Unity scenarios will be embedded using iframe or direct WebGL integration. 
                Backend API endpoints will handle scenario selection and score tracking.
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
              <h4 className="text-gray-900 dark:text-white mb-2">Score Tracking</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                POST to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/api/simulation/submit</code> 
                with userId, scenarioId, score, and mistakes for leaderboard integration.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scenarios Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 dark:text-white mb-4">Available Scenarios</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Master every aspect of driving with our comprehensive simulation modules
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 shadow-xl relative overflow-hidden group"
              >
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full">
                  Coming Soon
                </div>

                {/* Icon */}
                <div className="inline-flex p-4 bg-gradient-to-br from-[#00A3AD]/20 to-purple-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  {scenario.icon}
                </div>

                {/* Content */}
                <h3 className="text-gray-900 dark:text-white mb-2">{scenario.title}</h3>
                <p className="text-[#00A3AD] text-sm mb-3">{scenario.titleKiny}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {scenario.description}
                </p>

                {/* Difficulty Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    scenario.difficulty === 'Beginner'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : scenario.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {scenario.difficulty}
                  </span>
                  
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-lg cursor-not-allowed text-sm"
                  >
                    Locked
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#00A3AD] to-[#008891] rounded-3xl p-12 text-white"
        >
          <div className="text-center mb-12">
            <h2 className="mb-4">What to Expect</h2>
            <p className="text-white/90 text-lg">
              Our 3D simulation will provide an unparalleled learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/20 rounded-xl mb-4">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Realistic Physics</h3>
              <p className="text-white/80">
                Experience authentic vehicle handling and traffic behavior
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-white/20 rounded-xl mb-4">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Interactive Controls</h3>
              <p className="text-white/80">
                Keyboard, mouse, or gamepad support for natural control
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-white/20 rounded-xl mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Progress Tracking</h3>
              <p className="text-white/80">
                Detailed feedback and performance analytics for improvement
              </p>
            </div>
          </div>
        </motion.div>

        {/* Notify Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/20 dark:border-gray-700/20">
            <h3 className="text-gray-900 dark:text-white mb-4">Get Notified When It Launches</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to experience our 3D driving simulation
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3AD] text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl hover:shadow-xl hover:shadow-[#00A3AD]/50 transition-all duration-300"
              >
                Notify Me
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

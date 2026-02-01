import { Outlet } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Root() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const hasSeen = localStorage.getItem('ishami_install_prompt_seen');
      if (!hasSeen) {
        setShowInstall(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) setInstalled(true);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstall(false);
      localStorage.setItem('ishami_install_prompt_seen', 'true');
    }
  };

  const handleDismiss = () => {
    setShowInstall(false);
    localStorage.setItem('ishami_install_prompt_seen', 'true');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] dark:bg-[#1A1A2E] transition-colors duration-300">
      <Navigation />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />

      <AnimatePresence>
        {!installed && showInstall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#00A3AD] to-[#008891] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#00A3AD]/30">
                  <img src="/src/favicon_io/android-chrome-192x192.png" alt="ISHAMI" className="w-12 h-12 rounded-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Install ISHAMI App</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get the best experience by installing our app on your device. Works offline!
                </p>
                
                <div className="space-y-3">
                  <button 
                    onClick={installApp} 
                    className="w-full py-3 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl font-medium shadow-lg hover:shadow-[#00A3AD]/50 transition-all"
                  >
                    Install Now
                  </button>
                  <button 
                    onClick={handleDismiss} 
                    className="w-full py-3 bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

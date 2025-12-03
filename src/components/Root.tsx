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
      setShowInstall(true);
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
    }
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-6 right-6 z-50">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-[360px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img src="/src/favicon_io/android-chrome-192x192.png" alt="ISHAMI" className="w-8 h-8 rounded" />
                <div>
                  <p className="text-gray-900 dark:text-white">Install ISHAMI</p>
                  <p className="text-xs text-gray-500">Install as an app on your phone or desktop</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button onClick={installApp} className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00A3AD] to-[#008891] text-white rounded-xl">Install App</button>
                <button onClick={() => setShowInstall(false)} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl">Later</button>
              </div>
              <div className="mt-2 text-xs text-gray-500">Works on mobile and desktop (Chrome/Edge)</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

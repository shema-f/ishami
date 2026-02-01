import { motion } from 'motion/react';
import { Cookie, Lock, Smartphone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ferrivoxLogo from '../assets/ferrivox.png';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-[#1A1A2E]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#00A3AD] to-[#008891] p-8 text-white text-center">
            <div className="inline-flex p-3 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <Cookie className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-1">Cookie Policy</h1>
            <p className="text-white/80 mb-4">Politiki ya Cookies</p>
            <div className="mx-auto inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 text-white">
              <img src={ferrivoxLogo} alt="Ferrivox Ltd" className="w-6 h-6 rounded-md ring-1 ring-white/30" />
              <span className="text-xs">In partnership with Ferrivox Ltd</span>
            </div>
          </div>

          <div className="p-8">
            <Tabs defaultValue="english" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="kinyarwanda">Kinyarwanda</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="english" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#00A3AD]/10 flex items-center justify-center text-[#00A3AD]">
                      <Cookie className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. What are Cookies?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Cookies are small files used to remember your preferences.
                    </p>
                  </div>
                </section>

                <section className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#00A3AD]/10 flex items-center justify-center text-[#00A3AD]">
                      <Smartphone className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. How We Use Them</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>The ISHAMI APP uses local storage and cookies to keep you logged in.</li>
                      <li>Remember your "SOZA EXAM" scores and progress.</li>
                      <li>Ensure your "Saba Code" activation remains active on your device.</li>
                    </ul>
                  </div>
                </section>

                <section className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#00A3AD]/10 flex items-center justify-center text-[#00A3AD]">
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Security</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We do not store sensitive banking credentials in cookies or local storage.
                    </p>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="kinyarwanda" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#00A3AD]/10 flex items-center justify-center text-[#00A3AD]">
                      <Cookie className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Cookie ni iki?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Cookies ni utuntu duto tubika amakuru y’ingenzi ku byifuzo byawe kugira ngo porogaramu igukorere neza.
                    </p>
                  </div>
                </section>

                <section className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#00A3AD]/10 flex items-center justify-center text-[#00A3AD]">
                      <Smartphone className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Uko Duzikoresha</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>ISHAMI APP ikoresha local storage na cookies kugira ngo ugume winjiye (logged in).</li>
                      <li>Kwibuka amanota ya "SOZA EXAM" n’aho wageze mu masomo.</li>
                      <li>Kureba ko "Saba Code" yawe iguma gukora kuri telefoni yawe.</li>
                    </ul>
                  </div>
                </section>

                <section className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#00A3AD]/10 flex items-center justify-center text-[#00A3AD]">
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Umutekano</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ntabwo tubika PIN cyangwa amakuru y’ibanga ya banki muri cookies cyangwa local storage.
                    </p>
                  </div>
                </section>
              </TabsContent>
            </Tabs>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© {new Date().getFullYear()} ISHAMI App • Ferrivox Ltd Partnership</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

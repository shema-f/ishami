import { Outlet } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Root() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] dark:bg-[#1A1A2E] transition-colors duration-300">
      <Navigation />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

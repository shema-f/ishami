import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jean Claude Mugabo",
    location: "Kigali, Rwanda",
    rating: 5,
    text: "ISHAMI app yaranfashije cyane kumenya amategeko y'umuhanda. Nabashije ikizamini ku nzira ya mbere! The AI assistant is amazing.",
    avatar: "👨🏿‍💼"
  },
  {
    id: 2,
    name: "Uwase Divine",
    location: "Huye, Rwanda",
    rating: 5,
    text: "This app is exactly what I needed. The quizzes are challenging and the 3D simulation helped me understand parking better. Highly recommended!",
    avatar: "👩🏿‍🎓"
  },
  {
    id: 3,
    name: "Patrick Nkusi",
    location: "Musanze, Rwanda",
    rating: 5,
    text: "Ikizamini cy'iteka! The Pro version is worth every franc. I passed my driving test with 100% confidence thanks to ISHAMI.",
    avatar: "👨🏿‍🔧"
  },
  {
    id: 4,
    name: "Aline Umutoni",
    location: "Rubavu, Rwanda",
    rating: 5,
    text: "I love how the app teaches in both Kinyarwanda and English. The Irembo registration help saved me so much time and stress!",
    avatar: "👩🏿‍⚕️"
  },
  {
    id: 5,
    name: "Eric Habimana",
    location: "Kigali, Rwanda",
    rating: 5,
    text: "Best traffic rules learning app in Rwanda! The streak feature keeps me motivated to study every day. Murakoze ISHAMI!",
    avatar: "👨🏿‍💻"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative min-h-[300px] flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/20 dark:border-gray-700/20 shadow-xl">
              <div className="flex items-start space-x-4 mb-6">
                <div className="text-5xl">{testimonials[currentIndex].avatar}</div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonials[currentIndex].location}</p>
                  <div className="flex space-x-1 mt-2">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={goToPrevious}
          className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#00A3AD] w-8'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}

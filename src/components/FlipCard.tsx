import { useState } from 'react';
import { motion } from 'motion/react';

interface Question {
  id: number;
  question_kiny: string;
  question_en: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question_kiny: "Icyapa gifite ibara ryera n'umutuku bikora iki?",
    question_en: "What does a red and white sign mean?",
    options: ["Prohibition", "Warning", "Information", "Mandatory"],
    correctAnswer: 0
  },
  {
    id: 2,
    question_kiny: "Uburemere bwemewe ku modoka ni bungana iki?",
    question_en: "What is the maximum vehicle weight allowed?",
    options: ["2500kg", "3500kg", "4500kg", "5500kg"],
    correctAnswer: 1
  },
  {
    id: 3,
    question_kiny: "Ni igihe kihe ukwiye guhagarara ku cyapa cy'umutuku?",
    question_en: "When should you stop at a red light?",
    options: ["After crossing", "Before the line", "At the line", "Anywhere"],
    correctAnswer: 1
  },
  {
    id: 4,
    question_kiny: "Umuvuduko ntarengwa mu mujyi ni uwuhe?",
    question_en: "What is the speed limit in the city?",
    options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correctAnswer: 1
  }
];

export default function FlipCard() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sampleQuestions.map((question) => {
        const isFlipped = flippedCards.has(question.id);
        
        return (
          <div key={question.id} className="perspective-1000">
            <motion.div
              className="relative w-full h-80 cursor-pointer"
              onClick={() => toggleFlip(question.id)}
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Front of Card */}
              <div
                className="absolute inset-0 w-full h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 shadow-xl flex flex-col justify-center items-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-4xl mb-4">❓</div>
                <h3 className="text-gray-900 dark:text-white text-center mb-3">
                  {question.question_en}
                </h3>
                <p className="text-[#00A3AD] text-center text-sm mb-6">
                  {question.question_kiny}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Click to reveal answer</p>
              </div>

              {/* Back of Card */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#00A3AD] to-[#008891] rounded-2xl p-6 shadow-xl flex flex-col justify-center items-center text-white"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-center mb-4">Correct Answer:</h3>
                <div className="space-y-2 w-full">
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg text-center ${
                        idx === question.correctAnswer
                          ? 'bg-white text-[#00A3AD]'
                          : 'bg-white/20 text-white/60'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-4 text-white/80">Click to flip back</p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

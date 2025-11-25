import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ✅ Import your own local images here
import hero1 from "../../../assets/images/college 2.jpg";
import hero2 from "../../../assets/images/kid 3.jpg";
import hero3 from "../../../assets/images/kid 4.jpg";

const slides = [
  {
    id: 1,
    image: hero1,
    title: "AI-powered Assistance for Educators and Learners.",
    text: "Equip your students, educators, and institutions with dynamic tools that drive ongoing development and inspire enthusiasm for learning.",
  },
  {
    id: 2,
    image: hero2,
    title: "Transform the Classroom Experience.",
    text: "Use interactive tools and digital platforms to enhance student participation and creativity in modern classrooms.",
  },
  {
    id: 3,
    image: hero3,
    title: "Empower Teachers with Smart Insights.",
    text: "Make data-driven decisions to improve learning outcomes and monitor student progress effectively.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // change every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].id}
          className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12"
          style={{
            backgroundImage: `url(${slides[currentIndex].image})`,
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          <div className="relative z-10 text-white max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {slides[currentIndex].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6">
              {slides[currentIndex].text}
            </p>
            <a href="https://gesdeveloper.netlify.app/">
              <button className="bg-blue-400 text-black font-bold py-3 px-8 rounded-lg shadow hover:bg-blue-500 transition transform hover:scale-105">
                Experience the change now &gt;
              </button>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 flex justify-center w-full gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex ? "bg-blue-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

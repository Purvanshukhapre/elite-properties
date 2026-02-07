import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ANIMATION_PRESETS, 
  PREMIUM_COMPONENTS 
} from '../../design-system/premium-design-system';

const PremiumHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      title: "Manhattan Penthouse",
      subtitle: "Luxury Living in the Heart of New York",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: "$12,500,000",
      location: "Manhattan, NY",
      features: ["5 Beds", "4.5 Baths", "4,200 sq ft"]
    },
    {
      id: 2,
      title: "Beverly Hills Estate",
      subtitle: "Hollywood Hills Magnificence",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: "$8,750,000",
      location: "Beverly Hills, CA",
      features: ["6 Beds", "7 Baths", "8,500 sq ft"]
    },
    {
      id: 3,
      title: "London Mayfair Flat",
      subtitle: "Prime Central London Luxury",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: "£6,250,000",
      location: "Mayfair, London",
      features: ["4 Beds", "3.5 Baths", "2,800 sq ft"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentProperty = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images with Fade Transition */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0 
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundAttachment: 'fixed'
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-premium-onyx/80 via-premium-obsidian/40 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              className="text-white"
              {...ANIMATION_PRESETS.slideUp}
            >
              {/* Property Badge */}
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-premium-gold/20 backdrop-blur-sm border border-premium-gold/30 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-premium-gold mr-2 animate-pulse"></span>
                <span className="text-premium-gold font-medium">Featured Property</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {currentProperty.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-premium-platinum mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {currentProperty.subtitle}
              </motion.p>

              {/* Property Details */}
              <motion.div
                className="flex flex-wrap gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-premium-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-platinum">{currentProperty.location}</span>
                </div>
                
                {currentProperty.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-premium-platinum mx-3"></div>
                    <span className="text-premium-platinum">{feature}</span>
                  </div>
                ))}
              </motion.div>

              {/* Price */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-premium-gold mb-2">
                  {currentProperty.price}
                </div>
                <div className="text-premium-platinum">Premium Investment Opportunity</div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <button
                  style={PREMIUM_COMPONENTS.buttons.luxury.base}
                  whileHover={PREMIUM_COMPONENTS.buttons.luxury.hover}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center"
                  onClick={() => {}}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Virtual Tour
                </button>
                
                <button
                  style={PREMIUM_COMPONENTS.buttons.secondary.base}
                  whileHover={PREMIUM_COMPONENTS.buttons.secondary.hover}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center"
                  onClick={() => {}}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Advisor
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Property Preview */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="relative">
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-premium-gold/20 backdrop-blur-sm"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full bg-premium-amethyst/20 backdrop-blur-sm"
                  animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />

                {/* Stats Cards */}
                <div className="absolute top-10 right-0 space-y-4">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-premium-platinum text-sm">ROI Potential</div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-premium-platinum text-sm">Luxury Support</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-premium-gold w-8' 
                : 'bg-premium-platinum/50 hover:bg-premium-platinum'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default PremiumHero;
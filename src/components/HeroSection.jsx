import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaSearch, FaMapMarkerAlt, FaHome, FaBuilding, FaLandmark, FaArrowRight } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';
import { BRAND, COLORS } from '../constants/brand';

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-soft-gray">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="" // Optional: fallback image
        >
          <source src="/6026355_People_Person_3840x2160.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div> {/* Enhanced overlay for text readability */}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-blue rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-soft-highlight rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-secondary-blue rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <motion.div
            className="text-center max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative text-white"
              variants={itemVariants}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-white">
                {BRAND.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue to-secondary-blue opacity-30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            {/* Slogan */}
            <motion.p
              className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto font-light"
              variants={itemVariants}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {BRAND.slogan}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl max-w-4xl mx-auto mb-12 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.01, boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)' }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 to-secondary-blue/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex flex-col md:flex-row gap-2 relative z-10">
                <div className="flex-1 relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search by location, property type, or keyword..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent border-none outline-none text-text-primary placeholder-text-secondary"
                  />
                </div>
                <button className="bg-gradient-to-r from-primary-blue to-secondary-blue hover:from-secondary-blue hover:to-primary-blue text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden">
                  <span className="relative z-10">Search Properties</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary-blue to-primary-blue opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </div>
            </motion.div>


          </motion.div>
        </RevealOnScroll>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <span className="text-text-secondary text-sm mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-6 h-10 border-2 border-primary-blue rounded-full flex justify-center"
        >
          <motion.div
            className="w-1 h-3 bg-primary-blue rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
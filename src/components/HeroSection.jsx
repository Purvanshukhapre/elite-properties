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
        {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover hero-image-scale"
          poster="" // Optional: fallback image
        >
          <source src="/6026355_People_Person_3840x2160.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay for better text readability */}
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
            {/* Trusted Badge */}
            <motion.div
              className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              variants={itemVariants}
            >
              <span className="text-white text-sm font-medium">
                Trusted by 15,000+ buyers
              </span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white max-w-3xl text-left"
              variants={itemVariants}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-white">
                Find Homes That Match Your Life
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-xl md:text-2xl text-white mb-12 max-w-2xl font-light text-left"
              variants={itemVariants}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Buy, sell, or invest with confidence
            </motion.p>

            {/* Search Bar with Buy/Rent/Sell Toggle */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-4xl mx-auto mb-12 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              
              {/* Buy/Rent/Sell Toggle */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex bg-gray-100 rounded-lg p-1">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm">
                    Buy
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                    Rent
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                    Sell
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2 relative z-10">
                <div className="flex-1 relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search by location, property type, or keyword..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent border border-gray-200 rounded-lg outline-none text-text-primary placeholder-text-secondary"
                  />
                </div>
                <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden">
                  <span className="relative z-10">Search Properties</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
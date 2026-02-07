import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { fadeInUp, staggerContainer, TRANSITION_EASE } from '../../design-system/motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const HeroSection = () => {
  // Hero should always animate on mount, no need for scroll reveal
  // const { ref, controls } = useScrollReveal(); 

  return (
    <div className="relative min-h-screen overflow-hidden bg-premium-onyx">
      {/* Video Background with Parallax feel */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105" // Slight scale to avoid edge artifacts
        >
          <source src="/6026355_People_Person_3840x2160.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      <motion.div
        animate="show"
        variants={staggerContainer}
        className="relative z-20 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto"
      >
        {/* Trust Badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white/90 text-sm font-medium tracking-wide">
              #1 Global Luxury Marketplace
            </span>
          </div>
        </motion.div>

        {/* Hero Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1]"
            variants={fadeInUp}
          >
            Discover
            <br />
            <span className="text-premium-gold">Extraordinary</span>
            <br />
            Living
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Discover a curated collection of the world's most extraordinary properties.
          Experience real estate re-imagined for the modern investor.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link to="/properties" className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-premium-onyx rounded-xl font-bold uppercase text-sm tracking-wider hover:bg-premium-gold hover:text-white transition-all duration-300 shadow-2xl hover:shadow-premium-gold/50">
            <FaSearch className="group-hover:rotate-12 transition-transform" />
            Search Properties
          </Link>
          <Link to="/properties" className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-premium-onyx transition-all duration-300">
            Explore
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Search Bar - Minimal */}
        <motion.div variants={fadeInUp} className="max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by location, property type, or price..."
              className="w-full px-6 py-4 pr-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
            />
            <Link to="/properties" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-premium-gold rounded-xl hover:bg-premium-gold/90 transition-colors">
              <FaSearch className="text-white" />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
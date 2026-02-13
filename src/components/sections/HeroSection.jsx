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
    <div className="relative min-h-[95vh] overflow-hidden bg-premium-onyx">
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photorealistic-wooden-house-with-timber-structure.jpg"
          alt="Photorealistic Wooden House with Timber Structure"
          className="w-full h-full object-cover brightness-90"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
      </div>

      <motion.div
        animate="show"
        variants={staggerContainer}
        className="relative z-20 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto"
      >

        {/* Hero Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] tracking-wide"
            variants={fadeInUp}
          >
            Find Your
            <br />
            <span className="text-premium-gold">Dream Home</span>
            <br />
            Today
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Discover premium properties tailored to your lifestyle. 
          Your perfect home awaits in the most prestigious locations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link to="/properties" className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-premium-onyx rounded-xl font-bold uppercase text-sm tracking-wider hover:bg-premium-gold hover:text-white transition-all duration-250 shadow-2xl hover:shadow-premium-gold/50 hover:-translate-y-0.5">
            <FaSearch className="group-hover:rotate-12 transition-transform" />
            Search Properties
          </Link>
        </motion.div>

      </motion.div>


    </div>
  );
};

export default HeroSection;
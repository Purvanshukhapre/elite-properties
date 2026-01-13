import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { RevealOnScroll } from './ScrollAwareComponent';
import { COLORS } from '../constants/brand';

const CallToAction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-20 px-4 cta-gradient relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 to-[#1D4ED8]/20 opacity-30"
      />
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who found their perfect property with our help.
              Get personalized service and expert guidance today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                className="bg-white text-[#2563EB] font-bold py-4 px-8 rounded-xl hover:bg-opacity-90 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Start Your Search</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-[#2563EB] transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Schedule Consultation</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default CallToAction;
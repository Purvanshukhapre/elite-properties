import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaHome, FaDollarSign, FaChartLine, FaShieldAlt, FaUserTie, FaKey } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';
import { COLORS } from '../constants/brand';

const LuxuryHighlights = () => {
  const services = [
    {
      icon: <FaHome className="text-3xl" />,
      title: '10+ Years Experience',
      description: 'Proven track record of successful transactions',
      color: 'from-[#2563EB] to-[#1D4ED8]'
    },
    {
      icon: <FaDollarSign className="text-3xl" />,
      title: '25,000+ Properties Sold',
      description: 'Trusted by thousands of satisfied clients',
      color: 'from-[#2563EB] to-[#1D4ED8]'
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Local Market Experts',
      description: 'Deep knowledge of your area\'s real estate trends',
      color: 'from-[#2563EB] to-[#1D4ED8]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-16 px-4 bg-[#F1F5F9]">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Why Choose Us
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Professional real estate services with a personal touch
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
                whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${service.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-[#2563EB] transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-secondary">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default LuxuryHighlights;
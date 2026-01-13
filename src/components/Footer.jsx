import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars



import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BRAND, COLORS } from '../constants/brand';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, url: '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaInstagram />, url: '#', label: 'Instagram' },
    { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { title: 'Properties', links: ['Luxury Homes', 'Commercial', 'Investment', 'Off-Market'] },
    { title: 'Services', links: ['Buying', 'Selling', 'Investing', 'Consulting'] },
    { title: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Contact'] },
    { title: 'Resources', links: ['Market Reports', 'Blog', 'Guides', 'FAQs'] }
  ];

  const certifications = [
    { name: 'Luxury Estate Certified', year: '2024' },
    { name: 'Top Agent Award', year: '2023' },
    { name: 'Five Star Professional', year: '2022-2024' },
    { name: 'REALTOR International', year: 'Member' }
  ];

  // Animation variants
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
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="bg-gradient-to-t from-gray-50 to-white text-text-secondary py-16 px-4 border-t border-border-color">
      {/* Top Section - Brand Info */}
      <motion.div
        className="max-w-7xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-normal text-text-primary mb-4">{BRAND.name}</h3>
            <p className="text-text-secondary mb-4">
              {BRAND.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="p-3 bg-white rounded-full text-text-secondary hover:bg-gradient-to-r hover:from-primary-blue hover:to-secondary-blue hover:text-white transition-all border border-border-color shadow-sm hover:shadow-md"
                  whileHover={{ y: -3, scale: 1.05, borderColor: COLORS.accent.primaryBlue }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Certifications */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-4 rounded-xl border border-border-color shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <div className="text-xs text-primary-blue font-semibold uppercase tracking-wide">{cert.year}</div>
                  <div className="text-sm text-text-primary font-medium">{cert.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-8"
          >
            {quickLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-text-primary mb-4 relative inline-block">
                  {section.title}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-primary-blue to-secondary-blue"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </h4>
                <ul className="space-y-3 mt-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a 
                        href="#" 
                        className="text-text-secondary hover:text-primary-blue transition-colors text-sm flex items-center group"
                        whileHover={{ x: 5, color: '#2563EB' }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
          >
            <h4 className="font-semibold text-text-primary mb-4 relative inline-block">
              Contact Info
              <motion.div
                className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-primary-blue to-secondary-blue"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              />
            </h4>
            <div className="space-y-4 mt-4">
              <div className="flex items-start">
                <div className="p-2 bg-primary-blue/10 rounded-lg mr-3 mt-1">
                  <FaMapMarkerAlt className="text-primary-blue" />
                </div>
                <span className="text-text-secondary">123 Luxury Ave, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-primary-blue/10 rounded-lg mr-3">
                  <FaPhone className="text-primary-blue" />
                </div>
                <span className="text-text-secondary">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-primary-blue/10 rounded-lg mr-3">
                  <FaEnvelope className="text-primary-blue" />
                </div>
                <span className="text-text-secondary">info@premierestates.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="border-t border-border-color"></div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <div className="text-text-secondary text-sm">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved. Crafted with excellence for discerning clients.
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary"
          >
            <motion.a href="#" className="hover:text-primary-blue transition-colors" whileHover={{ scale: 1.02 }}>Privacy Policy</motion.a>
            <motion.a href="#" className="hover:text-primary-blue transition-colors" whileHover={{ scale: 1.02 }}>Terms of Service</motion.a>
            <motion.a href="#" className="hover:text-primary-blue transition-colors" whileHover={{ scale: 1.02 }}>Licensing</motion.a>
            <motion.a href="#" className="hover:text-primary-blue transition-colors" whileHover={{ scale: 1.02 }}>Sitemap</motion.a>
          </motion.div>
        </div>
        
        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-border-color text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-text-secondary">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-blue to-secondary-blue rounded-full flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold text-xs">A+</span>
              </div>
              <span>Better Business Bureau Rating</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-blue to-secondary-blue rounded-full flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold text-xs">5★</span>
              </div>
              <span>Google Reviews</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-blue to-secondary-blue rounded-full flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold text-xs">98%</span>
              </div>
              <span>Client Satisfaction</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
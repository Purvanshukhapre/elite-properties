import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars



import { FaBars, FaTimes, FaChevronDown, FaSearch, FaUser } from 'react-icons/fa';
import { BRAND, COLORS } from '../constants/brand';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Buy', href: '#' },
    { name: 'Rent', href: '#' },
    { name: 'Sell', href: '#' },
    { name: 'Agents', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Resources', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Sign In', href: '#' }
  ];

  // Determine navbar styles based on scroll position
  const isScrolled = scrollPosition > 100;
  const navbarBg = isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm' : 'bg-transparent';
  const logoColor = isScrolled ? 'text-text-primary' : 'text-white';
  const navTextColor = isScrolled ? 'text-text-secondary hover:text-primary-blue' : 'text-white hover:text-white/80';

  return (
    <nav className={`${navbarBg} fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      {/* Add padding to account for fixed navbar */}
      <div className="h-16"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className={`text-2xl font-bold ${logoColor} transition-colors duration-300 relative`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="relative z-10">{BRAND.name}</span>
            <motion.div 
              className="absolute inset-0 bg-primary-blue/10 rounded-lg blur-md -z-10"
              whileHover={{ scale: 1.2, opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`font-medium ${navTextColor} transition-colors relative ${isScrolled ? 'hover:text-primary-blue' : 'hover:text-white/80'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -1 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            <motion.button
              className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary-blue to-primary-blue opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-text-secondary hover:text-primary-blue hover:bg-white/10' : 'text-white hover:text-white/80 hover:bg-white/10'}`}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isScrolled ? 'text-text-secondary hover:text-primary-blue' : 'text-white hover:text-white/80'} hover:bg-primary-blue/10 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="w-full mt-4 bg-gradient-to-r from-primary-blue to-secondary-blue text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all relative overflow-hidden">
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
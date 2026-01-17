import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BRAND } from '../constants/brand';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sell', href: '/sell' },
    { name: 'Agents', href: '/agents' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  // Handle hash navigation
  const handleClick = (href, e) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  // Determine navbar styles based on scroll position and current page
  const isScrolled = scrollPosition > 100;
  const isAboutOrContact = location.pathname === '/about' || location.pathname === '/contact';
  const navbarBg = isScrolled || isAboutOrContact ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm' : 'bg-transparent';
  const logoColor = isScrolled || isAboutOrContact ? 'text-gray-900' : 'text-white';
  const navTextColor = isScrolled || isAboutOrContact ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white';

  return (
    <nav className={`${navbarBg} fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      {/* Add padding to account for fixed navbar */}
      <div className="h-12"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link 
            to="/"
            className={`text-xl font-bold ${logoColor} transition-colors duration-300 relative group`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="group-hover:text-blue-600 transition-colors">{BRAND.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium ${navTextColor} transition-all duration-300 relative text-sm group ${
                  location.pathname === item.href ? 'text-blue-600' : ''
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 relative overflow-hidden"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${isScrolled || isAboutOrContact ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:text-white hover:bg-white/10'}`}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-xl font-medium text-base transition-all duration-300 ${
                  location.pathname === item.href ? 'text-blue-600 bg-blue-50' : isScrolled || isAboutOrContact ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                } hover:translate-x-2`}
                onClick={(e) => handleClick(item.href, e)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/contact"
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
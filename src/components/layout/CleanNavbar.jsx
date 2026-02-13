import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHeart, FaEnvelope, FaUser, FaSearch, FaHome, FaChevronDown } from 'react-icons/fa';
import { BRAND } from '../constants/brand';
import { useAuth } from '../../context/AuthContext';

const CleanNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          setCloseTimeout(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeTimeout]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const openDropdown = (dropdownName) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(dropdownName);
  };

  const closeDropdown = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
      setCloseTimeout(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  const handleLogout = () => {
    logout();
    
    // Map protected routes to their public counterparts
    const routeMap = {
      '/home': '/',
      '/protected/agents': '/agents',
      '/protected/services': '/services',
      '/protected/about': '/about',
      '/protected/contact': '/contact',
      '/protected/profile': '/profile',
      '/protected/saved': '/saved',
      '/protected/enquiries': '/enquiries',
      '/protected/account': '/account',
      '/protected/activity': '/activity'
    };
    
    // Get the public version of the current route
    const publicRoute = routeMap[location.pathname] || '/';
    navigate(publicRoute);
  };

  // Navbar styling - white background with subtle border
  const navbarClasses = `fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white border-b border-gray-200 shadow-sm'
      : 'bg-white'
  }`;

  // Navigation item styling
  const navItemClasses = `relative font-medium px-3 py-2 transition-all duration-200 text-gray-700 hover:text-blue-600`;

  // Hover line effect styling
  const hoverLineClasses = `absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`;

  // Dropdown styling function
  const getDropdownClasses = (dropdownName) => `absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50 transition-all duration-200 ease-out transform translate-y-1 ${activeDropdown === dropdownName ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link 
            to="/home"
            className="text-xl font-bold text-gray-900 transition-colors duration-200 hover:text-blue-600"
            onClick={handleNavClick}
          >
            {BRAND.name}
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">






          {/* Services Dropdown */}
          <div className="dropdown-container relative"
            onMouseEnter={() => openDropdown('services')}
            onMouseLeave={closeDropdown}
          >
            <Link 
              to="/protected/services" 
              className={navItemClasses}
              onClick={handleNavClick}
            >
              Services
              <span className={hoverLineClasses}></span>
              <FaChevronDown className="ml-1 text-xs inline-block" />
            </Link>
            <div className={getDropdownClasses('services')}>
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Services</h3>
              </div>
              <Link to="/protected/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                Home Loans
              </Link>
              <Link to="/protected/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                Legal Services
              </Link>
              <Link to="/protected/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                Property Management
              </Link>
              <Link to="/protected/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                Interior Design
              </Link>
            </div>
          </div>
        </div>

        {/* Right: User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/protected/saved" 
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors relative"
            onClick={handleNavClick}
          >
            <FaHeart className="text-lg" />
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
              12
            </span>
          </Link>
          
          <Link 
            to="/protected/enquiries" 
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors relative"
            onClick={handleNavClick}
          >
            <FaEnvelope className="text-lg" />
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
              5
            </span>
          </Link>
          
          {/* User Avatar Dropdown */}
          <div className="dropdown-container relative"
            onMouseEnter={() => openDropdown('user')}
            onMouseLeave={closeDropdown}
          >
            <div className="cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                P
              </div>
              <FaChevronDown className="text-xs" />
            </div>
            <div className={getDropdownClasses('user')}>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900">Purvanshu</p>
                <p className="text-sm text-gray-500">user@eliteproperties.com</p>
              </div>
              <Link to="/protected/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                My Profile
              </Link>
              <Link to="/protected/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                Account Settings
              </Link>
              <Link to="/protected/activity" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                Activity Log
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg transition-colors text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            <FaSearch size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-3">

            <Link to="/protected/services" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={handleNavClick}>
              Services
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <Link to="/protected/saved" className="flex py-2 text-gray-700 hover:text-blue-600 transition-colors items-center" onClick={handleNavClick}>
                <FaHeart className="mr-2" /> Saved (12)
              </Link>
              <Link to="/protected/enquiries" className="flex py-2 text-gray-700 hover:text-blue-600 transition-colors items-center" onClick={handleNavClick}>
                <FaEnvelope className="mr-2" /> Enquiries (5)
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CleanNavbar;
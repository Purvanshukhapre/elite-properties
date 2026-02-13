import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt, FaHome, FaBuilding, FaGlobe, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const PremiumNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Navigation items for different user states
  const publicNavItems = [
    { name: 'Home', href: '/', icon: <FaHome className="w-4 h-4" /> },
    { name: 'Markets', href: '/markets', icon: <FaGlobe className="w-4 h-4" /> },
    { name: 'Services', href: '/services', icon: <FaBuilding className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <FaUser className="w-4 h-4" /> }
  ];

  const authenticatedNavItems = [
    { name: 'Home', href: '/', icon: <FaHome className="w-4 h-4" /> },
    { name: 'My Properties', href: '/user/my-properties', icon: <FaChartLine className="w-4 h-4" /> },
    { name: 'Saved', href: '/user/saved', icon: <FaGlobe className="w-4 h-4" /> },
    { name: 'Dashboard', href: '/user/dashboard', icon: <FaChartLine className="w-4 h-4" /> },
    { name: 'Notifications', href: '/user/notifications', icon: <FaChartLine className="w-4 h-4" /> },
    { name: 'Profile', href: '/user/profile', icon: <FaUser className="w-4 h-4" /> }
  ];

  const currentNavItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const isActiveRoute = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-premium-platinum/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-premium-sapphire to-premium-royal bg-clip-text text-transparent"
            >
              Elite Properties
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActiveRoute(item.href)
                      ? 'text-premium-sapphire bg-premium-sapphire/10'
                      : 'text-premium-onyx hover:text-premium-sapphire hover:bg-premium-ivory'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
                {isActiveRoute(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-premium-sapphire"
                    layoutId="navbar-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-premium-ivory hover:bg-premium-platinum/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-premium-sapphire to-premium-royal flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-medium text-premium-onyx">
                      {user?.name || 'User'}
                    </div>
                    <div className="text-xs text-premium-platinum">
                      {user?.role === 'admin' ? 'Administrator' : 'Investor'}
                    </div>
                  </div>
                  <FaChevronDown className={`w-3 h-3 text-premium-platinum transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-premium-platinum/20 z-50 overflow-hidden"
                    >
                      {/* User Header */}
                      <div className="p-5 bg-gradient-to-r from-premium-sapphire/5 to-premium-royal/5 border-b border-premium-platinum/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-premium-sapphire to-premium-royal flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-semibold text-premium-onyx">
                              {user?.name || 'User'}
                            </div>
                            <div className="text-sm text-premium-platinum">
                              {user?.email}
                            </div>
                            <div className="text-xs text-premium-sapphire font-medium mt-1">
                              {user?.role === 'admin' ? 'Administrator' : 'Premium Investor'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          to="/user/profile"
                          className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-premium-onyx hover:bg-premium-ivory transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUser className="w-4 h-4 text-premium-sapphire" />
                          <span>Profile Settings</span>
                        </Link>
                        
                        <Link
                          to="/user/dashboard"
                          className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-premium-onyx hover:bg-premium-ivory transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaChartLine className="w-4 h-4 text-premium-sapphire" />
                          <span>Dashboard</span>
                        </Link>
                      </div>

                      <div className="p-2 border-t border-premium-platinum/10">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-lg font-medium text-premium-onyx hover:text-premium-sapphire transition-colors"
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-premium-sapphire to-premium-royal text-white hover:shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-premium-onyx hover:bg-premium-ivory transition-colors"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-premium-platinum/20"
          >
            <div className="px-6 py-4 space-y-2">
              {currentNavItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActiveRoute(item.href)
                        ? 'text-premium-sapphire bg-premium-sapphire/10'
                        : 'text-premium-onyx hover:bg-premium-ivory'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}

              {isAuthenticated ? (
                <div className="pt-4 border-t border-premium-platinum/10 mt-4 space-y-2">
                  <Link
                    to="/user/profile"
                    className="block px-4 py-3 rounded-xl text-premium-onyx hover:bg-premium-ivory transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-premium-platinum/10 mt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 rounded-xl font-medium text-premium-onyx hover:bg-premium-ivory transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-premium-sapphire to-premium-royal text-white hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PremiumNavbar;
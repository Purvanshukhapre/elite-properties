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
    { name: 'Markets', href: '/markets', icon: <FaGlobe className="w-4 h-4" /> },
    { name: 'Services', href: '/services', icon: <FaBuilding className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <FaUser className="w-4 h-4" /> }
  ];

  const authenticatedNavItems = [
    { name: 'Home', href: '/user/home', icon: <FaHome className="w-4 h-4" /> },
    { name: 'Buy', href: '/user/buy', icon: <FaBuilding className="w-4 h-4" /> },
    { name: 'Rent', href: '/user/rent', icon: <FaBuilding className="w-4 h-4" /> },
    { name: 'Invest', href: '/user/invest', icon: <FaGlobe className="w-4 h-4" /> },
    { name: 'Visits', href: '/user/visits', icon: <FaUser className="w-4 h-4" /> },
    { name: 'Dashboard', href: '/user/dashboard', icon: <FaChartLine className="w-4 h-4" /> },
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
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 mr-2 sm:mr-4"
          >
            <Link
              to={isAuthenticated ? "/user/home" : "/"}
              className="flex flex-col leading-tight"
            >
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                ELITE
              </span>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-medium text-gray-500 tracking-[0.15em] uppercase">
                Properties
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Scrollable on medium screens */}
          <div className="hidden lg:flex items-center justify-center flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-0.5 xl:gap-1">
              {currentNavItems.map((item, index) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg font-medium text-xs xl:text-sm transition-all duration-200 whitespace-nowrap ${isActive
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      <span className="text-sm xl:text-base">{item.icon}</span>
                      <span>{item.name}</span>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Section - User/Auth */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {isAuthenticated ? (
              <div className="hidden lg:block relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                    {user?.name?.charAt(0) || 'U'}
                  </div>

                  {/* User Info - Hidden on smaller desktop screens */}
                  <div className="hidden xl:flex flex-col items-start min-w-0">
                    <span className="text-sm font-semibold text-gray-900 leading-none truncate max-w-[120px]">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 mt-0.5 truncate">
                      {user?.role === 'admin' ? 'Admin' : 'Investor'}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <FaChevronDown className="w-3 h-3 text-gray-400" />
                  </motion.div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="fixed inset-0 z-40"
                      />

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                      >
                        {/* User Header */}
                        <div className="px-4 py-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                              {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 truncate">
                                {user?.name || 'User'}
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {user?.email}
                              </div>
                              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span className="text-xs font-medium text-blue-700">
                                  {user?.role === 'admin' ? 'Administrator' : 'Investor'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link
                            to="/user/profile"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FaUser className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm">Profile Settings</div>
                              <div className="text-xs text-gray-500">Manage your account</div>
                            </div>
                          </Link>

                          <Link
                            to="/user/dashboard"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FaChartLine className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm">Dashboard</div>
                              <div className="text-xs text-gray-500">View analytics</div>
                            </div>
                          </Link>
                        </div>

                        <div className="p-2 border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                              <FaSignOutAlt className="w-4 h-4" />
                            </div>
                            <div className="text-left min-w-0">
                              <div className="font-medium text-sm">Sign Out</div>
                              <div className="text-xs text-red-400">See you soon!</div>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 xl:px-4 py-2 rounded-lg font-medium text-xs xl:text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 xl:px-4 py-2 rounded-lg font-medium text-xs xl:text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5 text-gray-700" />
              ) : (
                <FaBars className="w-5 h-5 text-gray-700" />
              )}
            </button>
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
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {currentNavItems.map((item, index) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${isActive
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {isAuthenticated ? (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                  {/* User Info Card */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate">
                        {user?.name || 'User'}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                    </div>
                  </div>

                  <Link
                    to="/user/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="w-4 h-4" />
                    <span className="font-medium text-sm">Profile Settings</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span className="font-medium text-sm">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default PremiumNavbar;
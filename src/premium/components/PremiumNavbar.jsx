import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaSearch, FaHeart, FaPlus, FaBuilding, 
  FaUser, FaBell, FaCog, FaSignOutAlt, FaBars, 
  FaTimes, FaChartLine, FaStar, FaEnvelope,
  FaChevronDown, FaMapMarkerAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { MEMBER_BRAND, MEMBER_TYPOGRAPHY } from '../constants/design-system';

const PremiumNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', href: '/premium', icon: FaHome, description: 'Your personalized dashboard' },
    { name: 'Explore', href: '/premium/explore', icon: FaSearch, description: 'Discover properties' },
    { name: 'My Properties', href: '/premium/my-properties', icon: FaBuilding, description: 'Manage your listings' },
    { name: 'Saved', href: '/premium/saved', icon: FaHeart, description: 'Your favorites' },
    { name: 'Post Property', href: '/premium/post', icon: FaPlus, description: 'List your property' },
    { name: 'Messages', href: '/premium/messages', icon: FaEnvelope, description: 'Communicate with owners' },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/premium" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">EP</span>
              </div>
              <div>
                <span className="text-gray-900 text-xl font-bold">Elite Properties</span>
                <span className="text-blue-600 text-xs ml-2 px-2 py-0.5 bg-blue-50 rounded-full font-medium">PREMIUM</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                
                {/* Subtle hover description */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                  isActive(item.href) ? 'opacity-100' : ''
                }`}>
                  {item.description}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search quick access */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <FaBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-500"></span>
            </button>

            {/* Quick explore button */}
            <Link
              to="/premium/explore"
              className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium text-sm"
            >
              <FaMapMarkerAlt className="mr-2 h-4 w-4" />
              Explore Properties
            </Link>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <FaChevronDown className="h-4 w-4" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                    <div className="mt-2 flex items-center text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Premium Member
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/premium/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaUser className="mr-3 h-4 w-4 text-gray-500" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/premium/alerts"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaBell className="mr-3 h-4 w-4 text-gray-500" />
                      Property Alerts
                    </Link>
                    <Link
                      to="/premium/help"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaCog className="mr-3 h-4 w-4 text-gray-500" />
                      Help & Support
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <FaSignOutAlt className="mr-3 h-4 w-4 text-gray-500" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 mt-2 rounded-lg shadow-lg">
            <div className="p-4 space-y-2">
              <div className="pb-3 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PremiumNavbar;
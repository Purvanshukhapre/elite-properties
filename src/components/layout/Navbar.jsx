import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { BRAND } from '../../constants/brand';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, setLoginIntent } = useAuth();
  const navigate = useNavigate();

  // Close dropdowns
  const closeDropdowns = () => {
    setIsDropdownOpen(false);
  };

  // Don't show navbar on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/verify-email';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAuthPage) {
    return null;
  }

  // Navigation items (different for logged in users)
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  // Handle navigation and close mobile menu
  const handleNavClick = () => {
    setIsMenuOpen(false);
    closeDropdowns();
    // Scroll to top when navigating to new page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Determine navbar styles based on current page and scroll state
  // Some pages might need dark text by default if they don't have a dark hero
  // Currently assuming all main pages start with a hero or adequate spacing.

  const getNavbarClasses = () => {
    if (isScrolled) {
      return 'bg-white/85 backdrop-blur-xl shadow-xl py-2.5';
    }
    return 'bg-white/70 backdrop-blur-xl py-4';
  };

  const getTextColorClass = () => {
    // Always use dark text since the background is now lightened
    return 'text-gray-900';
  };

  const textColor = getTextColorClass();
  const navbarClasses = getNavbarClasses();

  return (
    <nav className={`${navbarClasses} fixed top-0 left-0 right-0 z-50 transition-all duration-250 ease-out border border-white/30 rounded-2xl mx-6 mt-4 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-display font-bold ${textColor} transition-all duration-250 relative group flex items-center gap-2 ${isScrolled ? 'scale-95' : ''}`}
            onClick={handleNavClick}
          >
            {BRAND.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium ${textColor} transition-all duration-250 relative text-sm uppercase tracking-wide hover:text-premium-gold ${location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href)) ? 'text-premium-gold' : ''
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-premium-gold after:transition-all after:duration-250 after:scale-x-0 hover:after:scale-x-100 ${location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href)) ? 'after:scale-x-100' : ''}`}
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}

            {!isAuthenticated && (
              <button
                onClick={() => {
                  setLoginIntent('postProperty');
                  navigate('/login');
                  handleNavClick();
                }}
                className={`hidden lg:flex items-center gap-2 font-medium ${textColor} border border-current px-5 py-2 rounded-full transition-all duration-250 hover:-translate-y-0.5 hover:text-premium-gold text-xs uppercase tracking-widest mr-2 opacity-90 hover:opacity-100`}
              >
                Post Property
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setLoginIntent('postProperty');
                    navigate('/user/seller/post-property');
                    handleNavClick();
                  }}
                  className={`hidden lg:flex items-center gap-2 font-medium ${(location.pathname === '/user/seller/post-property' || location.pathname.startsWith('/user/seller')) ? 'text-premium-gold' : textColor} border border-current px-5 py-2 rounded-full transition-all duration-250 hover:-translate-y-0.5 hover:text-premium-gold text-xs uppercase tracking-widest mr-2 opacity-90 hover:opacity-100`}
                >
                  Post Property
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center space-x-1 ${textColor} hover:text-premium-gold transition-colors p-2 rounded-lg`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-premium-gold to-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                      {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <FaChevronDown size={12} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <p className="text-sm font-bold text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                        <Link to="/user/profile" className={`block px-4 py-3 text-sm transition-colors ${location.pathname.startsWith('/user/profile') ? 'text-premium-gold bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Profile</Link>
                        <Link to="/user/saved" className={`block px-4 py-3 text-sm transition-colors ${location.pathname.startsWith('/user/saved') ? 'text-premium-gold bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Saved Properties</Link>
                        <Link to="/user/viewed" className={`block px-4 py-3 text-sm transition-colors ${location.pathname.startsWith('/user/viewed') ? 'text-premium-gold bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Recently Viewed</Link>
                        <Link to="/user/enquiries" className={`block px-4 py-3 text-sm transition-colors ${location.pathname.startsWith('/user/enquiries') ? 'text-premium-gold bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Sent Enquiries</Link>
                        <button
                          onClick={() => {
                            logout();
                            handleNavClick();
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-100 hover:text-black transition-all duration-250 shadow-lg text-sm"
                onClick={handleNavClick}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${textColor}`}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-xl h-screen fixed inset-0 z-[60] pt-20 px-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`absolute top-6 right-6 p-2 ${textColor}`}
          >
            <FaTimes size={24} />
          </button>
          <div className="space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-2xl font-display font-bold ${location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href)) ? 'text-premium-gold' : textColor} hover:text-premium-gold transition-colors`}
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-8 border-t border-gray-100 space-y-4">
              {!isAuthenticated && (
                <button
                  onClick={() => {
                    setLoginIntent('postProperty');
                    navigate('/login');
                    handleNavClick();
                  }}
                  className={`block w-full border border-gray-900 ${textColor} font-bold py-3 rounded-xl text-center text-lg hover:bg-gray-50 transition-colors uppercase tracking-widest text-sm`}
                >
                  Post Property
                </button>
              )}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setLoginIntent('postProperty');
                      navigate('/user/seller/post-property');
                      handleNavClick();
                    }}
                    className={`block text-lg font-medium ${location.pathname.startsWith('/user/seller') ? 'text-premium-gold' : textColor} mb-4 border border-gray-900 py-3 rounded-xl text-center uppercase tracking-widest`}>
                    Post Property
                  </button>
                  <Link to="/user/profile" className={`block text-lg font-medium ${location.pathname.startsWith('/user/profile') ? 'text-premium-gold' : textColor} mb-4`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Profile</Link>
                  <Link to="/user/saved" className={`block text-lg font-medium ${location.pathname.startsWith('/user/saved') ? 'text-premium-gold' : textColor} mb-4`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Saved Properties</Link>
                  <Link to="/user/viewed" className={`block text-lg font-medium ${location.pathname.startsWith('/user/viewed') ? 'text-premium-gold' : textColor} mb-4`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Recently Viewed</Link>
                  <Link to="/user/enquiries" className={`block text-lg font-medium ${location.pathname.startsWith('/user/enquiries') ? 'text-premium-gold' : textColor} mb-4`} onClick={() => {setLoginIntent(null); handleNavClick();}}>Sent Enquiries</Link>
                  <button
                    onClick={() => {
                      logout();
                      handleNavClick();
                    }}
                    className="block text-lg font-medium text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setLoginIntent('postProperty');
                      navigate('/login');
                      handleNavClick();
                    }}
                    className="block w-full border border-gray-900 text-gray-900 font-bold py-3 rounded-xl text-center text-lg hover:bg-gray-50 transition-colors uppercase tracking-widest mb-4"
                  >
                    Post Property
                  </button>
                  <Link
                    to="/login"
                    className="block w-full bg-black text-white font-bold py-4 rounded-xl text-center text-lg shadow-lg"
                    onClick={handleNavClick}
                  >
                    Login / Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBell, FaSearch, FaUser, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AuthHeader = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    // Get current page title from path
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        if (!path || path === 'home') return 'Welcome Home';
        return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300">
            {/* Left: Page Title / Search */}
            <div className="flex items-center gap-8">
                <h1 className="text-xl font-serif-display font-semibold text-slate-900 tracking-tight">
                    {getPageTitle()}
                </h1>

                <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50 transition-all duration-300 w-80">
                    <FaSearch className="text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search properties, leads, or info..."
                        className="bg-transparent border-none outline-none text-sm text-slate-600 placeholder:text-slate-400 w-full"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-6">
                <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200">
                    <FaBell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-100"></div>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-50 transition-all duration-200"
                    >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200/50">
                            {user?.name?.charAt(0) || <FaUser size={14} />}
                        </div>
                        <div className="hidden sm:block text-left">
                            <div className="text-sm font-semibold text-slate-900 leading-none">{user?.name || 'Investor'}</div>
                            <div className="text-[11px] text-slate-500 mt-1 capitalize">{user?.role || 'Guest'}</div>
                        </div>
                        <FaChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isProfileMenuOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="fixed inset-0 z-[-1]"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
                                >
                                    <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                        <FaUser className="text-slate-400" />
                                        <span>View Profile</span>
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                        <FaCog className="text-slate-400" />
                                        <span>Account Settings</span>
                                    </button>
                                    <div className="my-2 border-t border-slate-50"></div>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <FaSignOutAlt className="text-red-400" />
                                        <span>Sign Out</span>
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

// Internal imports for the dropdown to work if not globally available
import { FaCog, FaSignOutAlt } from 'react-icons/fa';

export default AuthHeader;

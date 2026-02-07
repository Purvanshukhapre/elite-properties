import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome, FaSearch, FaKey, FaChartPie, FaHeart,
    FaCalendarCheck, FaUserCircle, FaPlusCircle,
    FaListAlt, FaChevronLeft, FaChevronRight, FaSignOutAlt,
    FaBell, FaCog, FaUser, FaUserTie
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AuthSidebar = ({ role = 'user' }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    const isSeller = role === 'seller';

    const menuItems = isSeller ? [
        { name: 'My Properties', icon: <FaListAlt />, path: '/user/seller/my-properties' },
        { name: 'My Leads', icon: <FaUserTie />, path: '/user/seller/leads' },
    ] : [
        { name: 'Home', icon: <FaHome />, path: '/user/home' },
        { name: 'Buy', icon: <FaSearch />, path: '/user/buy' },
        { name: 'Rent', icon: <FaKey />, path: '/user/rent' },
        { name: 'Invest', icon: <FaChartPie />, path: '/user/invest' },
        { name: 'Saved', icon: <FaHeart />, path: '/user/saved' },
        { name: 'Visits', icon: <FaCalendarCheck />, path: '/user/visits' },
        { name: 'Dashboard', icon: <FaListAlt />, path: '/user/dashboard' },
        { name: 'Profile', icon: <FaUserCircle />, path: '/user/profile' },
    ];

    const bottomItems = [
        { name: 'Settings', icon: <FaCog />, path: '/user/settings' },
        { name: 'Support', icon: <FaBell />, path: '/user/support' },
    ];

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? '80px' : '280px' }}
            className="fixed left-0 top-0 h-screen bg-slate-950 text-slate-300 border-r border-slate-900 z-50 flex flex-col transition-all duration-300 ease-in-out"
        >
            {/* Brand Label */}
            <div className="h-20 flex items-center px-6 mb-4">
                <Link to="/" className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex-shrink-0 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                        E
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="whitespace-nowrap"
                            >
                                <div className="text-sm font-bold text-white tracking-tight uppercase">Elite</div>
                                <div className="text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase leading-none">Properties</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-3 space-y-1 overflow-y-auto scrollbar-hide">
                <div className="px-3 mb-2 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                    {!isCollapsed ? (isSeller ? 'Seller Hub' : 'User Menu') : '...'}
                </div>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                ? 'bg-indigo-600/10 text-indigo-400'
                                : 'hover:bg-slate-900 text-slate-400 hover:text-slate-100'
                                }`}
                        >
                            <div className={`text-lg flex-shrink-0 ${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400'}`}>
                                {item.icon}
                            </div>
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="text-[14px] font-medium whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav-dot"
                                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                                />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-6 pb-2 px-3">
                    <div className="border-t border-slate-900"></div>
                </div>

                {bottomItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center gap-4 px-3 py-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition-all duration-200"
                    >
                        <div className="text-lg flex-shrink-0">{item.icon}</div>
                        {!isCollapsed && <span className="text-[14px] font-medium">{item.name}</span>}
                    </Link>
                ))}
            </nav>

            {/* User Session Footer */}
            <div className="p-4 bg-slate-900/40 border-t border-slate-900">
                <div className="flex items-center gap-3 overflow-hidden group/profile">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover/profile:border-indigo-500 transition-colors cursor-pointer">
                        <FaUser className="w-5 h-5" />
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex-grow min-w-0"
                            >
                                <div className="text-[13px] font-semibold text-white truncate">{user?.name || 'Investor'}</div>
                                <div className="text-[11px] text-slate-500 truncate lowercase">{isSeller ? 'Seller Account' : 'Standard Account'}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!isCollapsed && (
                        <button
                            onClick={logout}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                            title="Sign Out"
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-24 w-6 h-6 bg-slate-950 border border-slate-900 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 shadow-lg transform transition-transform hover:scale-110"
            >
                {isCollapsed ? <FaChevronRight size={10} /> : <FaChevronLeft size={10} />}
            </button>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </motion.aside>
    );
};

export default AuthSidebar;

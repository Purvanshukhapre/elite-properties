import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineHome,
    HiOutlineSearch,
    HiOutlineHeart,
    HiOutlineLightningBolt,
    HiOutlineUser,
    HiOutlinePlusCircle,
    HiOutlineBriefcase,
    HiOutlineShieldCheck,
    HiOutlineCog,
    HiOutlineLogout
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const LuxeDock = ({ role = 'user' }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(null);

    const isSeller = role === 'seller';

    const menuItems = isSeller ? [
        { id: 'post', label: 'Studio', icon: <HiOutlinePlusCircle />, path: '/user/seller/post-property' },
        { id: 'portfolio', label: 'Console', icon: <HiOutlineBriefcase />, path: '/user/seller/my-properties' },
        { id: 'vault', label: 'The Vault', icon: <HiOutlineShieldCheck />, path: '/user/settings' },
    ] : [
        { id: 'home', label: 'Home', icon: <HiOutlineHome />, path: '/user/home' },
        { id: 'buy', label: 'Exhibition', icon: <HiOutlineSearch />, path: '/user/buy' },
        { id: 'saved', label: 'Collection', icon: <HiOutlineHeart />, path: '/user/saved' },
        { id: 'intelligence', label: 'Intelligence', icon: <HiOutlineLightningBolt />, path: '/user/visits' },
        { id: 'profile', label: 'Identity', icon: <HiOutlineUser />, path: '/user/profile' },
    ];

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-fit">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-4 py-3 rounded-[2rem] flex items-center gap-2"
            >
                {/* Visual Glass Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-[2rem] pointer-events-none" />

                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            onMouseEnter={() => setIsHovered(item.id)}
                            onMouseLeave={() => setIsHovered(null)}
                            className="relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 group"
                        >
                            {/* Active Indicator Backdrop */}
                            {isActive && (
                                <motion.div
                                    layoutId="dock-bg"
                                    className="absolute inset-0 bg-slate-900 rounded-2xl shadow-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}

                            {/* Icon Wrapper */}
                            <div className={`relative z-10 text-2xl transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'} ${isActive ? 'scale-110' : 'group-hover:scale-125'} active:scale-95`}>
                                {item.icon}
                            </div>

                            {/* Label Popup */}
                            <AnimatePresence>
                                {isHovered === item.id && !isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                        animate={{ opacity: 1, y: -55, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                        className="absolute px-5 py-2 bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl pointer-events-none whitespace-nowrap shadow-2xl border border-white/20"
                                    >
                                        {item.label}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    );
                })}

                {/* Vertical Divider */}
                <div className="w-[1px] h-10 bg-white/10 mx-2" />

                {/* Meta Toggle (Vault shortcut) */}
                <NavLink
                    to="/user/settings"
                    className={({ isActive }) => `w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]' : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <HiOutlineCog className="text-2xl" />
                </NavLink>

                {/* Logout - Institutional Shutdown */}
                <button
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white/5 text-slate-400 hover:bg-rose-500 hover:text-white group/logout"
                    title="Terminate Session"
                >
                    <HiOutlineLogout className="text-2xl group-hover/logout:rotate-12 transition-transform" />
                </button>
            </motion.nav>
        </div>
    );
};

export default LuxeDock;

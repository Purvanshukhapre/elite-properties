import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LuxeDock from './LuxeDock';
import AuthFooter from './AuthFooter';

const UserLayout = () => {
    const location = useLocation();

    return (
        <div className="relative min-h-screen flex flex-col bg-[#FDFCFB] text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
            {/* Dynamic Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-rose-50/30 blur-[100px] rounded-full" />
            </div>

            {/* Immersive Stage - Full Bleed */}
            <main className="relative z-10 w-full flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full h-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
                <AuthFooter role="user" />
            </main>

            {/* Premium Navigation Hub */}
            <LuxeDock role="user" />
        </div>
    );
};

export default UserLayout;

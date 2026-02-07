import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LuxeDock from './LuxeDock';
import AuthFooter from './AuthFooter';

const SellerLayout = () => {
    const location = useLocation();

    return (
        <div className="relative min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 overflow-x-hidden selection:bg-slate-900 selection:text-white">
            {/* Minimalist Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-slate-200/40 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-50/30 blur-[120px] rounded-full" />
            </div>

            {/* Focused Workspace */}
            <main className="relative z-10 w-full flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.01 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-12">
                            <Outlet />
                        </div>
                    </motion.div>
                </AnimatePresence>
                <AuthFooter role="seller" />
            </main>

            {/* Premium Navigation Hub */}
            <LuxeDock role="seller" />
        </div>
    );
};

export default SellerLayout;

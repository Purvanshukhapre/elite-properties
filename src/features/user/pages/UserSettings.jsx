import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineLockClosed,
    HiOutlineBell,
    HiOutlineShieldCheck,
    HiOutlineTrash,
    HiOutlineChevronRight,
    HiOutlineEyeOff
} from 'react-icons/hi';

const UserSettings = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center pt-20 pb-40">
            <header className="w-full max-w-4xl px-6 py-12 border-b border-slate-100 mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <HiOutlineShieldCheck className="text-indigo-600" size={16} />
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Identity Control // Active Protocol</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif-display leading-none mb-6">
                    The <span className="italic text-slate-400">Settings.</span>
                </h1>
                <p className="text-slate-500 font-light text-lg max-w-lg leading-relaxed">
                    Manage your security preferences and personal data footprint within the project manifest.
                </p>
            </header>

            <main className="w-full max-w-4xl px-6 space-y-8">
                {[
                    { title: "Security Logic", desc: "Cryptographic verification and cipher parameters.", icon: <HiOutlineLockClosed />, items: ["Change Verification Cipher", "2FA Node Link"] },
                    { title: "Notifications", desc: "Pulse alerts and registry propagation signals.", icon: <HiOutlineBell />, items: ["Market Signal Alerts", "Identity Access Logs"] },
                    { title: "Privacy", desc: "Control your visibility across the global manifest.", icon: <HiOutlineEyeOff />, items: ["Institutional Masking", "Metadata Stripping"] }
                ].map((node, i) => (
                    <motion.section
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] border border-slate-100 p-10 hover:shadow-xl transition-all group"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="max-w-sm">
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-slate-950 group-hover:text-white transition-all">
                                    {node.icon}
                                </div>
                                <h3 className="text-3xl font-serif-display mb-4">{node.title}</h3>
                                <p className="text-slate-400 font-light text-sm leading-relaxed">{node.desc}</p>
                            </div>

                            <div className="flex-grow w-full space-y-3">
                                {node.items.map((item, idx) => (
                                    <button key={idx} className="w-full flex justify-between items-center p-6 bg-slate-50 hover:bg-white rounded-2xl transition-all group/item border border-transparent hover:border-slate-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest">{item}</span>
                                        <HiOutlineChevronRight className="text-slate-300 group-hover/item:translate-x-1" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                ))}

                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-10 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex flex-col md:flex-row justify-between items-center gap-8"
                >
                    <div>
                        <h3 className="text-2xl font-serif-display text-rose-600 mb-2">Registry Purge</h3>
                        <p className="text-sm text-rose-400 font-light">De-initialize your institutional presence and liquify all artifacts.</p>
                    </div>
                    <button className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-rose-700 transition-colors">
                        Execute Purge
                    </button>
                </motion.section>
            </main>
        </div>
    );
};

export default UserSettings;

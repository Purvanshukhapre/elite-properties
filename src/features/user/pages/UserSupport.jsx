import React from 'react';
import { motion } from 'framer-motion';
import {
    HiOutlineChatAlt2,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineExternalLink,
    HiOutlineArrowRight,
    HiOutlineQuestionMarkCircle
} from 'react-icons/hi';

const UserSupport = () => {
    const channels = [
        { id: 'chat', label: 'Priority Signal', desc: 'Real-time structural liaison for immediate resolution.', icon: <HiOutlineChatAlt2 />, action: 'Initialize Chat' },
        { id: 'mail', label: 'Formal Briefing', desc: 'Documented correspondence for architectural queries.', icon: <HiOutlineMail />, action: 'Send Briefing' },
        { id: 'phone', label: 'Audio Direct', desc: 'Direct biometric voice-link for high-tier mediation.', icon: <HiOutlinePhone />, action: 'Request Call' }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-950 flex flex-col pt-20">

            {/* CONCIERGE SUPPORT HEADER */}
            <header className="px-6 lg:px-12 py-16 border-b border-slate-100 flex flex-col md:flex-row justify-between items-end gap-12 bg-white/50 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Concierge Node // Active Mediation</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif-display leading-none mb-6">
                        Support <span className="italic text-slate-400">Direct.</span>
                    </h1>
                    <p className="text-slate-500 font-light text-xl max-w-lg leading-relaxed">
                        Access high-tier mediation and technical resolution protocols through the Elite concierge network.
                    </p>
                </div>
            </header>

            <main className="flex-grow p-6 lg:p-12 pb-40">
                <div className="max-w-7xl mx-auto space-y-24">

                    {/* CORE CHANNELS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {channels.map((chan, idx) => (
                            <motion.div
                                key={chan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-12 bg-slate-50 border border-slate-100 rounded-[3.5rem] hover:bg-white hover:shadow-2xl transition-all duration-700"
                            >
                                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 mb-10 shadow-sm border border-slate-50 group-hover:bg-slate-950 group-hover:text-white transition-all">
                                    {chan.icon}
                                </div>
                                <h3 className="text-3xl font-serif-display mb-4 text-slate-900">{chan.label}</h3>
                                <p className="text-slate-400 font-light text-lg mb-10 leading-relaxed">{chan.desc}</p>
                                <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-100 pb-2 group-hover:border-indigo-600 transition-all">
                                    {chan.action} <HiOutlineArrowRight />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* RESOURCE NODES */}
                    <div className="bg-slate-950 p-16 lg:p-24 rounded-[5rem] text-white flex flex-col lg:flex-row gap-24 items-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-8">
                                <HiOutlineQuestionMarkCircle className="text-indigo-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Knowledge Registry</span>
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-serif-display mb-10 leading-tight">Elite <br /> <span className="italic text-slate-500">Intelligence Base.</span></h2>
                            <p className="text-2xl text-white/40 font-light leading-relaxed mb-12">
                                Research structural protocols, market mechanics and acquisition guidelines within our high-density documentation hub.
                            </p>
                            <button className="px-12 py-7 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-6 hover:bg-indigo-100 transition-all">
                                Open Hub <HiOutlineExternalLink size={18} />
                            </button>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { title: 'Acquisition Logic', desc: 'Understanding the registry flow.' },
                                { title: 'Identity Verification', desc: 'Sovereign data protocols.' },
                                { title: 'Liquidity Patterns', desc: 'Market resonance mechanics.' },
                                { title: 'Structural Briefing', desc: 'Pre-acquisition reporting.' }
                            ].map((item, i) => (
                                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all cursor-pointer">
                                    <h4 className="text-xl font-serif-display mb-2">{item.title}</h4>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserSupport;

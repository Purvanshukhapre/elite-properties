import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowRight,
  HiOutlineChatAlt2,
  HiOutlineUserGroup,
} from 'react-icons/hi';

const UserHome = () => {
  const navigate = useNavigate();

  const signals = [
    { title: "Market Resonance", value: "84.2", unit: "pts", status: "Emerging" },
    { title: "Portfolio Velocity", value: "+12.4", unit: "%", status: "Optimal" },
    { title: "Strategic Liquidity", value: "Locked", unit: "", status: "Active" },
    { title: "Global Reach", value: "14", unit: "nodes", status: "Expanding" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col font-sans">

      {/* THE PROPHETIC HEADER */}
      <header className="relative pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover brightness-[0.9] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500">Authenticated Registry // User ID: EL-5092</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif-display leading-[0.95] mb-10 text-slate-950">
              Welcome back <br /> to the <span className="italic text-slate-400">Project.</span>
            </h1>
            <p className="text-slate-500 font-light text-xl max-w-xl leading-relaxed mb-12">
              Your global asset manifest is synchronized. Portfolio resonance is currently peak.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <button
                onClick={() => navigate('/user/buy')}
                className="px-12 py-6 bg-slate-950 text-white rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
              >
                Enter Exhibition Gate <HiOutlineArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/user/seller/post-property')}
                className="px-12 py-6 border border-slate-200 text-slate-950 rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-widest hover:border-slate-950 transition-all active:scale-95"
              >
                List an Asset <HiOutlineArrowRight size={18} className="text-slate-400" />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* THE SIGNAL GRID */}
      <section className="relative -mt-24 z-20 container mx-auto px-6 lg:px-24 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signals.map((signal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
              className="p-10 bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-[3rem] shadow-2xl hover:bg-white transition-all group"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-6">{signal.title}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-serif-display text-slate-950">{signal.value}</span>
                <span className="text-sm font-light text-slate-400">{signal.unit}</span>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">{signal.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONCIERGE DIRECT */}
      <section className="container mx-auto px-6 lg:px-24 mb-48">
        <div className="bg-slate-50 border border-slate-100 p-16 lg:p-24 rounded-[5rem] flex flex-col lg:flex-row gap-24 items-center relative overflow-hidden group">
          <div className="w-full lg:w-1/3 aspect-square rounded-[4rem] overflow-hidden shrink-0 border-8 border-white shadow-2xl">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" />
          </div>

          <div className="flex-grow">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-indigo-600 mb-6 block">Strategic Liaison</span>
            <h2 className="text-6xl font-serif-display mb-10 text-slate-950">Concierge <span className="italic text-slate-500">Direct.</span></h2>
            <p className="text-2xl text-slate-500 font-light leading-relaxed mb-12">
              Vikram Singh. Your dedicated market architect. Available for off-market negotiation and private acquisition briefings.
            </p>
            <div className="flex gap-8">
              <button className="flex items-center gap-4 px-10 py-6 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-800 transition-all">
                <HiOutlineChatAlt2 size={20} /> Initial Channel
              </button>
              <button className="flex items-center gap-4 px-10 py-6 border border-slate-200 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:border-slate-950 transition-colors">
                <HiOutlineUserGroup size={20} /> Request Sync
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER DECOR */}
      <section className="bg-slate-50 border-t border-slate-100 py-32">
        <div className="container mx-auto px-6 lg:px-24 text-center">
          <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12">Powered by the Elite Registry</h5>
          <div className="flex justify-center gap-16 opacity-30 grayscale">
            <div className="w-12 h-12 bg-slate-950 rounded-full" />
            <div className="w-12 h-12 bg-slate-950 rounded-full" />
            <div className="w-12 h-12 bg-slate-950 rounded-full" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default UserHome;
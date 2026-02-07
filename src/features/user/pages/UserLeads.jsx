import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import {
  HiOutlineChatAlt2,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineGlobe,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineTrendingUp,
  HiOutlineShieldCheck
} from 'react-icons/hi';

const UserLeads = () => {
  const [filter, setFilter] = useState('all');
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // No backend leads API in spec; initialize empty.
    setLeads([]);
  }, []);

  const getPropertyForLead = (propertyTitle) => {
    return { id: 0, title: propertyTitle || 'Unknown', image: '' };
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    return lead.status.toLowerCase() === filter;
  });

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-32">

      {/* SECTION 1: BOUNDED HEADER */}
      <header className="relative bg-slate-900 pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
            alt="Network"
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-900" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-indigo-500" />
              <span className="text-white/60 font-black tracking-[0.4em] uppercase text-[10px]">Global Acquisition Network</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif-display font-medium text-white leading-tight tracking-tight mb-8">
              Interaction <span className="italic text-indigo-300">Pulse.</span>
            </h1>
            <p className="text-lg text-white/70 font-light max-w-2xl leading-relaxed">
              A curated board of expressions of intent. Every inquiry is a gateway to a high-tier movement within your global portfolio.
            </p>
          </motion.div>
        </div>
      </header>

      {/* SECTION 2: INTELLIGENCE METRIC BAR (NEW) */}
      <section className="relative z-20 -mt-16 container mx-auto px-6 lg:px-24 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lead Velocity</p>
              <p className="text-3xl font-serif-display text-slate-900">+12.4% <span className="text-xs text-emerald-500 font-sans tracking-normal ml-2">↑</span></p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <HiOutlineTrendingUp size={24} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Reach</p>
              <p className="text-3xl font-serif-display text-slate-900">8 Regions</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <HiOutlineGlobe size={24} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Security Status</p>
              <p className="text-3xl font-serif-display text-slate-900 italic">Encrypted</p>
            </div>
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
              <HiOutlineShieldCheck size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BOARD CONTROLS & FEED */}
      <section className="container mx-auto px-6 lg:px-24 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 px-4">
          <div className="flex flex-wrap gap-4">
            {['all', 'new', 'contacted', 'qualified', 'closed'].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${filter === opt
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400 shadow-sm'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
            Current Tier: High-Response
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredLeads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 text-center bg-white border border-slate-100 rounded-[3rem]"
            >
              <h3 className="text-3xl font-serif-display text-slate-300">The cycle remains silent.</h3>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredLeads.map((lead, index) => {
                const property = getPropertyForLead(lead.propertyTitle);
                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col xl:flex-row"
                  >
                    {/* Property Preview Area */}
                    <div className="relative w-full xl:w-[450px] aspect-video xl:aspect-auto overflow-hidden shrink-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-8 left-8">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl ${lead.status === 'New' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-900'
                          }`}>
                          {lead.status}
                        </span>
                      </div>
                    </div>

                    {/* Lead Intelligence Content */}
                    <div className="p-10 lg:p-14 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                          <div>
                            <h3 className="text-4xl font-serif-display text-slate-900 mb-2">{lead.leadName}</h3>
                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                              Targeting: {lead.propertyTitle}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <HiOutlineClock className="text-indigo-400" size={14} />
                              <span>Received {lead.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border border-slate-100 italic text-slate-600 leading-relaxed text-lg">
                          "{lead.message}"
                        </div>
                      </div>

                      {/* HIGH CONTRAST CTAs (Zero Overlap) */}
                      <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="px-8 py-4 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center justify-center gap-3 min-w-[180px]"
                        >
                          <HiOutlinePhone size={16} />
                          <span>Call Agent</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="px-8 py-4 bg-indigo-600 text-white rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center justify-center gap-3 min-w-[180px]"
                        >
                          <HiOutlineChatAlt2 size={16} />
                          <span>Direct Message</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="px-8 py-4 border border-slate-200 text-slate-400 hover:text-slate-900 rounded-full font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3"
                        >
                          <span>View Full Intel</span>
                          <HiOutlineArrowRight size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 4: NETWORK INTELLIGENCE (NEW VERTICAL DEPTH) */}
      <section className="bg-slate-900 py-32 mb-32 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24 relative z-10">
          <div className="max-w-4xl">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-indigo-400 block mb-6">Network Intelligence</span>
            <h2 className="text-5xl md:text-7xl font-serif-display text-white mb-12">
              Global Interaction <br /><span className="italic text-indigo-300">Resonance.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <p className="text-lg text-slate-400 font-light leading-relaxed">
                  Your portfolio is currently attracting 42% higher interest from the APAC region compared to last quarter. Market sentiment suggests a pivot towards institutional residential assets.
                </p>
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
                  <h4 className="text-white font-serif-display text-xl mb-4">Sentiment Index</h4>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '78%' }}
                      transition={{ duration: 2 }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-4">78% Positive Engagement</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white">
                  <HiOutlineSparkles size={32} className="mb-6" />
                  <h4 className="text-2xl font-serif-display mb-4">Predictive Inbound</h4>
                  <p className="text-white/80 leading-relaxed mb-8 text-sm">
                    Based on your current interactions, we anticipate 4-5 high-value offers in the next 14 days for your South Mumbai listings.
                  </p>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl">
                    View Forecast Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserLeads;
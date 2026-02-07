import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import propertyAPI from '../../../api/property.api';
import { useEffect } from 'react';
import {
  HiOutlineViewGrid,
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineArrowRight,
  HiOutlinePlus
} from 'react-icons/hi';

const UserMyProperties = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const res = await propertyAPI.getMyProperties();
      const list = res?.data?.propertyPosts || [];
      if (mounted) setProperties(list);
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col pt-20">

      {/* THE OWNER'S CONSOLE HEADER */}
      <header className="px-6 lg:px-12 py-12 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row justify-between items-end gap-12 sticky top-0 z-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Institutional Console // Portfolio Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif-display leading-none mb-6">
            The <span className="italic text-slate-400">Console.</span>
          </h1>
          <p className="text-slate-500 font-light text-xl max-w-lg leading-relaxed">
            Manage your real estate artifacts and monitor liquidity resonance across the registry.
          </p>
        </div>

        <button
          onClick={() => navigate('/user/seller/post-property')}
          className="px-10 py-6 bg-slate-950 text-white rounded-[2rem] flex items-center gap-4 text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-emerald-600 transition-all border-4 border-white"
        >
          <HiOutlinePlus size={20} /> Initialize New Artifact
        </button>
      </header>

      {/* PORTFOLIO METRICS */}
      <section className="p-6 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl">
          {[
            { label: 'Total Equity Resonance', value: '$84.2M', unit: 'USD', icon: <HiOutlineLightningBolt />, color: 'text-indigo-600' },
            { label: 'Market Visibility', value: '4.2k', unit: 'signals', icon: <HiOutlineUserGroup />, color: 'text-emerald-600' },
            { label: 'Portfolio Velocity', value: '+14.5%', unit: 'yield', icon: <HiOutlineChartBar />, color: 'text-amber-600' }
          ].map((stat, i) => (
            <div key={i} className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center ${stat.color} mb-8`}>
                {stat.icon}
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-serif-display text-slate-900">{stat.value}</span>
                <span className="text-xs font-light text-slate-400">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVE ASSETS */}
      <main className="p-6 lg:p-12 pb-40">
        <div className="max-w-7xl">
          <div className="flex items-center gap-8 mb-16 border-b border-slate-100 pb-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'active' ? 'text-slate-950 scale-110' : 'text-slate-300 hover:text-slate-500'}`}
            >
              Active Registries (3)
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'text-slate-950 scale-110' : 'text-slate-300 hover:text-slate-500'}`}
            >
              Validation Node (1)
            </button>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {properties.map((prop, idx) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-[3.5rem] border border-slate-100 p-8 flex flex-col lg:flex-row items-center gap-12 group hover:shadow-[0_64px_128px_rgba(0,0,0,0.08)] transition-all"
                >
                  <div className="w-full lg:w-72 aspect-[4/3] rounded-[2.5rem] overflow-hidden shrink-0 border-4 border-slate-50">
                    <img src={prop.propertyPics?.[0] || 'https://placehold.co/800x600?text=Elite+Property'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Resonance</span>
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-serif-display text-slate-950">{prop.bhk} BHK {prop.propertyCategory}</h3>
                    <p className="text-slate-400 font-light text-sm max-w-md">{prop.locality}, {prop.city} • Portfolio ID: EL-{(idx + 1) * 1024}</p>
                    <div className="flex gap-8 pt-4">
                      <div className="text-center md:text-left">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Current Yield</p>
                        <p className="text-xl font-serif-display text-slate-900">12.4%</p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Engagement</p>
                        <p className="text-xl font-serif-display text-slate-900">42 Signals</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="px-10 py-5 bg-slate-50 text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-950 hover:text-white transition-all">
                      Manage Node
                    </button>
                    <button className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                      <HiOutlineArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserMyProperties;
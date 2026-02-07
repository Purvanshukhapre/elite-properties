import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  HiOutlineTrash,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineTrendingUp
} from 'react-icons/hi';

const UserSaved = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('canvas');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // No backend 'saved properties' API specified in the spec.
    // Start with an empty list until a proper API exists.
    setProperties([]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col pt-20">

      {/* THE CURATOR'S HEADER */}
      <header className="px-6 lg:px-12 py-12 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row justify-between items-end gap-8 sticky top-0 z-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <HiOutlineSparkles className="text-indigo-600" size={16} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Institutional Archive // Vault Selection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif-display leading-none mb-6">
            The <span className="italic text-slate-400">Collection.</span>
          </h1>
          <p className="text-slate-500 font-light text-xl max-w-lg leading-relaxed">
            Your personal cache of global architectural movements. Assets held for strategic consideration.
          </p>
        </div>

        {/* VIEW LOGIC */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setViewMode('canvas')}
            className={`p-4 rounded-xl transition-all ${viewMode === 'canvas' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <HiOutlineViewGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-4 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <HiOutlineViewList size={20} />
          </button>
        </div>
      </header>

      {/* THE ARCHIVE GRID */}
      <main className="flex-grow p-6 lg:p-12 pb-40">
        <div className={viewMode === 'canvas' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10' : 'max-w-5xl mx-auto'}>
          <AnimatePresence mode="popLayout">
            {properties.map((prop, idx) => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`group relative overflow-hidden bg-white border border-slate-100 transition-all duration-700 hover:z-20 ${viewMode === 'canvas' ? 'aspect-[4/5] rounded-[3rem] hover:rounded-[4rem] hover:shadow-[0_64px_128px_rgba(0,0,0,0.12)]' : 'flex gap-8 p-10 rounded-[2.5rem] mb-6 hover:shadow-xl'
                  }`}
              >
                {/* Visual Identity */}
                <div className={viewMode === 'canvas' ? 'absolute inset-0' : 'w-40 h-40 rounded-3xl overflow-hidden shrink-0'}>
                  <img src={prop.image} alt="" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                  {viewMode === 'canvas' && <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />}
                </div>

                {/* Information Layer */}
                <div className={viewMode === 'canvas' ? 'absolute inset-0 p-10 flex flex-col justify-between text-white' : 'flex-grow flex flex-col justify-center'}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${viewMode === 'canvas' ? 'bg-white/10 backdrop-blur-md text-white' : 'bg-slate-50 text-slate-500'}`}>
                        {prop.type}
                      </span>
                    </div>
                    <button className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${viewMode === 'canvas' ? 'bg-white/10 backdrop-blur-md hover:bg-rose-500' : 'bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500'}`}>
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>

                  <div className={viewMode === 'canvas' ? '' : 'flex justify-between items-end'}>
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${viewMode === 'canvas' ? 'text-white/60' : 'text-slate-400'}`}>{prop.location}</p>
                      <h3 className={`font-serif-display leading-tight mb-4 ${viewMode === 'canvas' ? 'text-4xl' : 'text-3xl text-slate-900'}`}>{prop.title}</h3>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className={`font-serif-display ${viewMode === 'canvas' ? 'text-3xl' : 'text-2xl text-indigo-600'}`}>{prop.price}</p>
                      {viewMode === 'list' && (
                        <button onClick={() => navigate(`/properties/${prop.id}`)} className="p-4 bg-slate-950 text-white rounded-2xl hover:bg-indigo-600 transition-all">
                          <HiOutlineArrowRight />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comparison Trigger (Hover State) */}
                {viewMode === 'canvas' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm bg-indigo-600/10">
                    <button
                      onClick={() => navigate(`/properties/${prop.id}`)}
                      className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      Audit Resolution
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* STICKY COMPARISON LEDGER */}
      <footer className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6">
        <div className="bg-white/80 backdrop-blur-3xl p-6 lg:p-8 rounded-[3rem] shadow-[0_64px_128px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-between group">
          <div className="flex items-center gap-10">
            <div className="flex -space-x-4">
              {properties.slice(0, 3).map((p, i) => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:translate-x-2 transition-transform">
                  <img src={p.image} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Asset Matrix</p>
              <p className="text-lg font-serif-display text-slate-900">Comparing 3 Strategic Nodes</p>
            </div>
          </div>
          <button className="px-8 py-5 bg-slate-950 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-4 hover:bg-indigo-600 transition-all">
            <HiOutlineTrendingUp size={16} /> Generate Contrast Report
          </button>
        </div>
      </footer>
    </div>
  );
};

export default UserSaved;
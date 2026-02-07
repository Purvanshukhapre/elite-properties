import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import propertyAPI from '../../../api/property.api';
import { useEffect } from 'react';
import {
  HiOutlineAdjustments,
  HiOutlineArrowRight,
  HiOutlineLocationMarker,
  HiOutlineCube,
  HiOutlineStar
} from 'react-icons/hi';

const UserBuy = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loadingProps, setLoadingProps] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoadingProps(true);
      const res = await propertyAPI.getAllProperties({ propertyType: 'buy' });

      if (res && res.success && res.data?.propertyPosts) {
        dataList = res.data.propertyPosts;
      }
      if (mounted) setProperties(dataList);
      setLoadingProps(false);
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  const filtered = Array.isArray(properties)
    ? (activeFilter === 'all' ? properties : properties.filter(p => (p.type || '').toLowerCase() === activeFilter))
    : [];

  const filterOptions = [
    { id: 'all', label: 'Universal' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'penthouse', label: 'Penthouses' }
  ];

  if (loadingProps) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col pt-20">

      {/* 0PX ARCHITECTURE: THE DISCOVERY HEADER */}
      <section className="px-6 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 bg-white/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-slate-900 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Global Exhibition // Market Edge</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif-display leading-none mb-6 text-slate-950">
            Exhibition <span className="italic text-slate-400">Hub.</span>
          </h1>
          <p className="text-slate-500 font-light text-xl max-w-lg leading-relaxed">
            Explore the world's most significant architectural assets. Filter by resonance and strategic location.
          </p>
        </div>

        {/* DYNAMIC FILTER PALETTE */}
        <div className="flex items-center gap-8 bg-slate-50 p-2 rounded-3xl border border-slate-100 overflow-x-auto no-scrollbar">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === opt.id ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-4" />
          <button className="flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-white rounded-2xl transition-colors">
            <HiOutlineAdjustments size={16} /> Filters
          </button>
        </div>
      </section>

      {/* THE EXHIBITION GALLERY: IMMERSIVE TILES */}
      <main className="flex-grow p-6 lg:p-12 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((prop, i) => (
              <motion.div
                key={prop._id || prop.id || i}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Immersive Stage */}
                <div className="relative aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 mb-10 transition-all duration-700">
                  <img
                    src={prop.propertyPics?.[0] || 'https://placehold.co/800x600?text=Elite+Property'}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                  {/* Status Badge */}
                  <div className="absolute top-10 right-10 flex gap-4">
                    <div className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-slate-950 text-[9px] font-black uppercase tracking-widest shadow-xl">
                      {prop.type}
                    </div>
                  </div>

                  {/* Bottom Metadata Info */}
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <HiOutlineLocationMarker className="text-white" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">{prop.locality}, {prop.city}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif-display leading-none mb-6">{prop.bhk} BHK {prop.propertyCategory}</h3>
                  </div>
                </div>

                {/* Content & Interaction */}
                <div className="px-6 flex flex-col md:flex-row justify-between items-end gap-12">
                  <div className="max-w-md">
                    <p className="text-slate-500 font-light text-xl leading-relaxed mb-10">
                      A masterpiece of {prop.type} architecture. {prop.beds} luxurious sectors across {prop.sqft} sqft of high-intent living space.
                    </p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <span className="flex items-center gap-2 text-indigo-600"><HiOutlineCube /> {prop.sqft} SQFT</span>
                      <span>High Residue Value</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Acquisition Price</p>
                      <p className="text-4xl font-serif-display text-slate-950">{prop.priceTag || `₹${prop.price?.toLocaleString()}`}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/properties/${prop.id}`)}
                      className="w-24 h-24 bg-slate-950 text-white rounded-[2rem] flex items-center justify-center hover:bg-indigo-600 transition-all shadow-2xl group/btn"
                    >
                      <HiOutlineArrowRight size={28} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default UserBuy;
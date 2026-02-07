import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineArrowRight
} from 'react-icons/hi';

const UserVisits = () => {
  const visits = [
    { id: 1, title: "Skyward Penthouse", location: "Worli, Mumbai", date: "Oct 14, 2024", time: "11:30 AM", status: "Confirmed" },
    { id: 2, title: "The Glass Pavilion", location: "Alibaug", date: "Oct 18, 2024", time: "04:00 PM", status: "Pending" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col pt-20">
      <header className="px-6 lg:px-12 py-12 border-b border-slate-100 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Tactile Perspective // Experience Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif-display leading-none mb-6">
            The <span className="italic text-slate-400">Itinerary.</span>
          </h1>
          <p className="text-slate-500 font-light text-lg max-w-lg leading-relaxed">
            Curate your personal journey through architectural rarity. Direct tactile engagement with the registry.
          </p>
        </div>
      </header>

      <main className="flex-grow p-6 lg:p-12 pb-40">
        <div className="max-w-4xl mx-auto space-y-8">
          {visits.map((visit, idx) => (
            <motion.div
              key={visit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center group hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-white rounded-3xl flex flex-col items-center justify-center text-center shadow-sm border border-slate-100">
                  <span className="text-2xl font-serif-display text-indigo-600 line-clamp-1">{visit.date.split(' ')[1].replace(',', '')}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400">{visit.date.split(' ')[0]}</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">{visit.location}</p>
                  <h3 className="text-3xl font-serif-display mb-2">{visit.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><HiOutlineClock /> {visit.time}</span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${visit.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {visit.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="mt-8 md:mt-0 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-indigo-600 transition-all">
                View Briefing <HiOutlineArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserVisits;
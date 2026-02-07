import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlinePencil,
  HiOutlineShieldCheck,
  HiOutlineKey,
  HiOutlineIdentification,
  HiOutlineMail,
  HiOutlinePhone
} from 'react-icons/hi';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Vikram Singh",
    email: "vikram@elite.io",
    phone: "+91 98765 43210",
    membership: "Institutional Tier 01",
    since: "January 2024"
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col items-center pt-20 pb-40 px-6">

      <header className="w-full max-w-4xl py-12 border-b border-slate-200 mb-20 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Identity Manifest // Certified Residency</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif-display leading-tight mb-8">
            The <span className="italic text-slate-400">Profile.</span>
          </h1>
        </div>

        <div className="relative group">
          <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-100 flex items-center justify-center text-indigo-600 border-4 border-white shadow-2xl overflow-hidden">
            <span className="text-4xl font-serif-display">VS</span>
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-xl hover:bg-indigo-600 transition-all">
            <HiOutlinePencil size={18} />
          </button>
        </div>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* IDENTITY FIELDS */}
        <div className="md:col-span-8 space-y-8">
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legal Nomenclature</label>
                <div className="flex items-center gap-4 text-xl font-light text-slate-900 border-b border-slate-50 pb-4">
                  <HiOutlineIdentification className="text-indigo-600" />
                  <span>{user.name}</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Institutional Email</label>
                <div className="flex items-center gap-4 text-xl font-light text-slate-900 border-b border-slate-50 pb-4">
                  <HiOutlineMail className="text-indigo-600" />
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Comm-Link</label>
                <div className="flex items-center gap-4 text-xl font-light text-slate-900 border-b border-slate-50 pb-4">
                  <HiOutlinePhone className="text-indigo-600" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-6 bg-slate-50 hover:bg-slate-950 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              Synchronize Identity Parameters
            </button>
          </div>
        </div>

        {/* STATUS CARDS */}
        <div className="md:col-span-4 space-y-8">
          <div className="p-10 bg-indigo-600 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <HiOutlineShieldCheck size={28} className="mb-6" />
            <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-2">Residency Status</p>
            <h4 className="text-2xl font-serif-display mb-8">{user.membership}</h4>
            <div className="pt-6 border-t border-white/20">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">Authenticated Since</p>
              <span className="text-md font-light">{user.since}</span>
            </div>
          </div>

          <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-950">
                <HiOutlineKey />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Auth Control</span>
            </div>
            <p className="text-sm font-light text-slate-500 mb-8 leading-relaxed">Your biometric signature and cryptographic keys are active.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b border-indigo-100 pb-1">
              Cycle Security Tokens
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi';

const AuthFooter = ({ role = 'user' }) => {
    const navigate = useNavigate();
    const isSeller = role === 'seller';

    const navigationLinks = isSeller ? [
        { label: 'CONSOLE', path: '/user/seller/my-properties' },
        { label: 'STUDIO', path: '/user/seller/post-property' }
    ] : [
        { label: 'HOME', path: '/user/home' },
        { label: 'EXHIBITION', path: '/user/buy' },
        { label: 'COLLECTION', path: '/user/saved' },
        { label: 'INTELLIGENCE', path: '/user/visits' }
    ];

    const managementLinks = [
        { label: 'IDENTITY', path: '/user/profile' },
        { label: 'THE VAULT', path: '/user/settings' }
    ];

    return (
        <footer className="bg-slate-50 text-slate-950 border-t border-slate-200 pt-32 pb-16 relative overflow-hidden">
            {/* Visual Decor */}
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-indigo-50/50 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32">
                    {/* Brand & Mission */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-4 mb-10 cursor-pointer group" onClick={() => navigate('/user/home')}>
                            <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center font-serif-display text-2xl italic text-white group-hover:bg-indigo-600 transition-all shadow-2xl">E</div>
                            <span className="text-[12px] font-black tracking-[0.6em] uppercase text-slate-900 group-hover:text-indigo-600 transition-colors">Elite Properties</span>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed font-light pr-12">
                            Curators of architectural rarity. Experience the pinnacle of sovereign real estate within our registry.
                        </p>
                    </div>

                    {/* Navigation - ROLE AWARE */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Institutional Access</h4>
                        <ul className="space-y-6">
                            {navigationLinks.map((item) => (
                                <li
                                    key={item.label}
                                    onClick={() => navigate(item.path)}
                                    className="text-[11px] font-black tracking-widest text-slate-500 hover:text-slate-950 transition-all cursor-pointer flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-4 h-px bg-indigo-600 transition-all opacity-0 group-hover:opacity-100" />
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Sovereign Control</h4>
                        <ul className="space-y-6">
                            {managementLinks.map((item) => (
                                <li
                                    key={item.label}
                                    onClick={() => navigate(item.path)}
                                    className="text-[11px] font-black tracking-widest text-slate-500 hover:text-slate-950 transition-all cursor-pointer flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-4 h-px bg-indigo-600 transition-all opacity-0 group-hover:opacity-100" />
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Cluster */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Direct Conduit</h4>
                        <div className="space-y-10">
                            <button
                                onClick={() => navigate('/user/support')}
                                className="group flex items-center gap-6 text-[10px] font-black tracking-[0.3em] text-slate-900 hover:text-indigo-600 transition-all"
                            >
                                CONTACT ADVISOR
                                <HiOutlineArrowRight className="group-hover:translate-x-3 transition-transform" />
                            </button>
                            <div className="flex items-center gap-4 py-4 px-6 bg-white rounded-[1.5rem] border border-slate-100 w-fit shadow-sm">
                                <HiOutlineShieldCheck className="text-emerald-500" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">VAULT ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
                        © 2026 // ELITE PROPERTIES GLOBAL REGISTRY
                    </div>
                    <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <span className="hover:text-slate-950 transition-colors cursor-pointer">Privacy Charter</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Sovereign Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AuthFooter;

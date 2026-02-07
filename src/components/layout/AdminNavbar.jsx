import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineChartSquareBar,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineShieldCheck
} from 'react-icons/hi';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navGroups = [
    {
      title: "OPERATIONS",
      items: [
        { label: "Command Center", path: "/admin/dashboard", icon: HiOutlineChartSquareBar },
        { label: "Assets Control", path: "/admin/properties", icon: HiOutlineOfficeBuilding },
        { label: "Operator Index", path: "/admin/users", icon: HiOutlineUserGroup }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full text-slate-300 font-sans">
      {/* BRANDING NODE */}
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-xl italic">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-lg leading-tight uppercase">Admin</span>
            <span className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">Core Architecture</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION STACK */}
      <nav className="flex-grow py-8 overflow-y-auto px-4 space-y-10 scrollbar-hide">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="px-4 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  to={item.disabled ? "#" : item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                    ${isActive(item.path)
                      ? 'bg-slate-800 text-white shadow-inner font-bold'
                      : 'hover:bg-slate-800/50 hover:text-white'}
                  `}
                >
                  <item.icon className={`text-xl ${isActive(item.path) ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="text-sm tracking-wide">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* OPERATOR STATUS */}
      <div className="p-6 bg-slate-950 border-t border-slate-800">
        <div className="flex items-center gap-4 mb-6 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user?.email || 'Administrator'}</p>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Level 04 Clearance</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-950/20 text-red-500 border border-red-900/50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-900/40 transition-all active:scale-[0.98]"
        >
          <HiOutlineLogout />
          Authorize Session End
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;

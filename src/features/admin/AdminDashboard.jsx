import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboardStatsAPI } from '../../api/admin.api';
import {
  HiOutlineCube,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker
} from 'react-icons/hi';

/**
 * AdminDashboard
 * Strict API-driven command center.
 * Renders ONLY fields provided by GET /api/admin/stats
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    activeProperties: 0,
    inactiveProperties: 0,
    propertiesByCategory: [],
    propertiesByCity: [],
    usersByCity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const response = await getAdminDashboardStatsAPI();
      if (response.success && response.data?.stats) {
        console.log("ADMIN STATS FROM API:", response.data.stats);
        setStats(response.data.stats);
      } else {
        console.warn("Admin dashboard: Failed to fetch stats or malformed response", response);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'TOTAL USERS', value: stats.totalUsers, icon: HiOutlineUserGroup, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'TOTAL PROPERTIES', value: stats.totalProperties, icon: HiOutlineCube, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'ACTIVE PROPERTIES', value: stats.activeProperties, icon: HiOutlineCheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'INACTIVE PROPERTIES', value: stats.inactiveProperties, icon: HiOutlineXCircle, color: 'text-red-600', bg: 'bg-red-50' }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Synchronizing Telemetry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* HEADER SECTION */}
      <section>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">System Overview</h1>
        <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Real-time Platform Metrics</p>
      </section>

      {/* PRIMARY METRICS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{card.label}</p>
              <p className={`text-4xl font-black ${card.color}`}>
                {card.value?.toLocaleString()}
              </p>
            </div>
            <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center ${card.color}`}>
              <card.icon className="text-2xl" />
            </div>
          </div>
        ))}
      </section>

      {/* DISTRIBUTION DATA STAGE */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CATEGORY DISTRIBUTION */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineOfficeBuilding className="text-indigo-600 text-xl" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Assets by Category</h2>
          </div>
          <div className="space-y-4">
            {stats.propertiesByCategory?.length > 0 ? (
              stats.propertiesByCategory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">{item._id || 'Unknown'}</span>
                  <div className="flex items-center gap-4 flex-1 mx-6">
                    <div className="h-1.5 flex-1 bg-slate-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${(item.count / stats.totalProperties) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-xs font-bold text-slate-400 uppercase text-center py-10">No category data available</p>
            )}
          </div>
        </div>

        {/* CITY DISTRIBUTION (PROPERTIES) */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineLocationMarker className="text-emerald-600 text-xl" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Assets by City</h2>
          </div>
          <div className="space-y-4">
            {stats.propertiesByCity?.length > 0 ? (
              stats.propertiesByCity.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-slate-600">{item._id || 'Unknown'}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-xs font-bold text-slate-400 uppercase text-center py-10">No city data available</p>
            )}
          </div>
        </div>

        {/* USER DISTRIBUTION BY CITY */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineUserGroup className="text-amber-600 text-xl" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Operators by City</h2>
          </div>
          <div className="space-y-4">
            {stats.usersByCity?.length > 0 ? (
              stats.usersByCity.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-bold text-slate-600">{item._id || 'Unknown'}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-xs font-bold text-slate-400 uppercase text-center py-10">No operator data available</p>
            )}
          </div>
        </div>

      </section>

      {/* ACTION NODES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/admin/properties" className="group p-8 bg-slate-900 rounded-[2rem] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Manage Inventory</h3>
            <p className="text-indigo-400 text-xs font-bold mt-1 uppercase tracking-widest">Process Verification Queue</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <HiOutlineCube className="text-2xl" />
          </div>
        </Link>
        <Link to="/admin/users" className="group p-8 bg-indigo-600 rounded-[2rem] shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Operator Index</h3>
            <p className="text-indigo-200 text-xs font-bold mt-1 uppercase tracking-widest">User Access & Permissions</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <HiOutlineUserGroup className="text-2xl" />
          </div>
        </Link>
      </section>
    </div>
  );
};

export default AdminDashboard;

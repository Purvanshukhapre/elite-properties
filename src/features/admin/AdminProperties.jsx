import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminPropertiesAPI, updatePropertyStatusAPI, deleteAdminPropertyAPI } from '../../api/admin.api';
import {
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineCurrencyRupee,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePhotograph,
  HiOutlineX,
  HiOutlineClipboardList,
  HiOutlineTrash
} from 'react-icons/hi';

/**
 * AdminProperties
 * Strict API-driven asset control.
 * Renders ONLY fields provided by GET /api/admin/properties
 */
const AdminProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const response = await getAdminPropertiesAPI();
    if (response.success && response.data?.propertyPosts) {
      setProperties(response.data.propertyPosts.map(p => ({ ...p, id: p.id || p._id })));
    } else {
      setProperties([]);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    const nextStatus = currentStatus === true ? 'inactive' : 'active';
    if (window.confirm(`Switch asset state to ${nextStatus.toUpperCase()}?`)) {
      const response = await updatePropertyStatusAPI(id, nextStatus);
      if (response.success) {
        fetchProperties();
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('PERMANENT: Purge this asset from the registry?')) {
      const response = await deleteAdminPropertyAPI(id);
      if (response.success) {
        fetchProperties();
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      {/* HEADER SECTION */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Asset Control</h1>
          <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">Listing Pipeline & Verification</p>
        </div>
      </section>

      {/* DATA STACK */}
      <section className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">City</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Created At</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {properties.map(item => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-5 text-sm font-bold text-slate-900 uppercase">{item.propertyType}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-600 uppercase tracking-tight">{item.propertyCategory}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-600 uppercase tracking-tight">{item.city}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">₹{item.price?.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${item.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-500">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/admin/properties/${item.id}`)}
                      className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                      title="View Details"
                    >
                      <HiOutlineClipboardList className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(item.id, item.isActive)}
                      className={`p-2 transition-colors ${item.isActive ? 'text-slate-300 hover:text-red-500' : 'text-slate-300 hover:text-emerald-500'}`}
                      title={item.isActive ? "Deactivate" : "Activate"}
                    >
                      {item.isActive ? <HiOutlineXCircle className="text-xl" /> : <HiOutlineCheckCircle className="text-xl" />}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-300 hover:text-red-600 transition-colors"
                      title="Delete Asset"
                    >
                      <HiOutlineTrash className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="px-8 py-10 text-center text-sm font-black text-slate-400 uppercase tracking-widest">
                    No registry entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Asset Database...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminProperties;

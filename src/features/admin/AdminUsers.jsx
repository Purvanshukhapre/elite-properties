import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminUsersAPI, deleteAdminUserAPI, getAdminUserByIdAPI } from '../../api/admin.api';
import {
  HiOutlineSearch,
  HiOutlineChevronRight,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineX,
  HiOutlineUserCircle
} from 'react-icons/hi';

/**
 * AdminUsers
 * Strict API-driven operator index.
 * Renders ONLY fields provided by GET /api/admin/users
 */
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await getAdminUsersAPI();
    if (response.success) {
      // Normalize response data
      const resData = response.data;
      const dataArray = Array.isArray(resData) ? resData : (resData?.users || resData?.data || []);
      setUsers(dataArray.map(u => ({ ...u, id: u.id || u._id })));
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('CRITICAL: Terminate operator access for this ID?')) {
      const response = await deleteAdminUserAPI(id);
      if (response.success) {
        fetchUsers();
        if (selectedUser?.id === id) setSelectedUser(null);
      }
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-slate-900 text-white',
      seller: 'bg-indigo-100 text-indigo-700',
      buyer: 'bg-slate-100 text-slate-700'
    };
    return (
      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${styles[role] || 'bg-slate-100'}`}>
        {role}
      </span>
    );
  };

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      {/* HEADER & FILTERS */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Operator Index</h1>
          <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">Personnel & Access Management</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search by Full Name or Email..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Electronic Mail</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Link</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Registration</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedUser?.id === user.id ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                        {user.fullName?.charAt(0)}
                      </div>
                      <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-600">{user.email}</td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-600">{user.phoneNo || 'N/A'}</td>
                  <td className="px-8 py-5">{getRoleBadge(user.role)}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-600">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                      className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <HiOutlineChevronRight className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-sm font-black text-slate-400 uppercase tracking-widest">
                    No matching operators found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Querying Operator Index...</p>
            </div>
          )}
        </div>
      </section>

      {/* DETAIL DRAWER */}
      {selectedUser && (
        <div className="fixed inset-y-0 right-0 w-[480px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[60] flex flex-col border-l border-slate-100 animate-slide-in">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-start mb-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
              >
                <HiOutlineX size={20} />
              </button>
              <button
                onClick={() => handleDelete(selectedUser.id)}
                className="px-6 py-2 bg-red-50 text-red-600 border border-red-100 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-100"
              >
                Terminate Access
              </button>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white text-3xl font-black italic shadow-xl shadow-indigo-200">
                {selectedUser.fullName?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedUser.fullName}</h2>
                <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-10 space-y-12">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operator Telemetry</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1.5 border-l-2 border-slate-100 pl-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <HiOutlineMail className="text-slate-900" /> Electronic Mail
                  </p>
                  <p className="text-sm font-bold text-slate-800">{selectedUser.email}</p>
                </div>
                <div className="space-y-1.5 border-l-2 border-slate-100 pl-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <HiOutlinePhone className="text-slate-900" /> Phone Link
                  </p>
                  <p className="text-sm font-bold text-slate-800">{selectedUser.phoneNo || 'NOT_REGISTERED'}</p>
                </div>
                <div className="space-y-1.5 border-l-2 border-slate-100 pl-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <HiOutlineCalendar className="text-slate-900" /> Registration Date
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div className="space-y-1.5 border-l-2 border-slate-100 pl-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Identifier</p>
                  <p className="text-[11px] font-mono font-bold text-slate-500">{selectedUser.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

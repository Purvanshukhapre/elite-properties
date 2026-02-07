import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'; // We'll refactor this to be more of a sidebar or dense header later
// Note: We deliberately do NOT use PageTransition here for "instant" feel

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64 flex-shrink-0 bg-slate-900 min-h-screen fixed left-0 top-0 bottom-0 z-50">
                <AdminNavbar compact={true} />
            </div>
            <main className="flex-grow ml-64 p-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

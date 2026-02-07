import React, { useState } from 'react';
import { 
  FaHome, FaBuilding, FaUsers, FaChartLine, FaEye, FaCheck, FaTimes
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('overview');

  // Mock data
  const stats = {
    totalProperties: 1247,
    pendingApprovals: 23,
    activeUsers: 8947,
    totalRevenue: '₹2.4M'
  };

  const recentActivities = [
    { id: 1, action: 'New property submitted', user: 'John Doe', time: '2 minutes ago', type: 'property' },
    { id: 2, action: 'User registered', user: 'Jane Smith', time: '15 minutes ago', type: 'user' },
    { id: 3, action: 'Property approved', user: 'Admin', time: '1 hour ago', type: 'approval' },
    { id: 4, action: 'Payment received', user: 'Robert Johnson', time: '2 hours ago', type: 'payment' }
  ];

  const pendingApprovals = [
    { id: 1, title: 'Luxury 3BHK Apartment', owner: 'Alice Cooper', submitted: '2 hours ago', status: 'pending' },
    { id: 2, title: 'Commercial Office Space', owner: 'Bob Builder', submitted: '4 hours ago', status: 'pending' },
    { id: 3, title: '2BHK Apartment for Rent', owner: 'Carol Designer', submitted: '1 day ago', status: 'pending' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Properties', value: stats.totalProperties, icon: FaBuilding, color: 'blue' },
          { title: 'Pending Approvals', value: stats.pendingApprovals, icon: FaEye, color: 'yellow' },
          { title: 'Active Users', value: stats.activeUsers, icon: FaUsers, color: 'green' },
          { title: 'Revenue', value: stats.totalRevenue, icon: FaChartLine, color: 'purple' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'property' ? 'bg-blue-500' :
                  activity.type === 'user' ? 'bg-green-500' :
                  activity.type === 'approval' ? 'bg-yellow-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {stats.pendingApprovals} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{property.title}</p>
                  <p className="text-xs text-gray-500">by {property.owner} • {property.submitted}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                    <FaCheck className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'overview':
        return renderOverview();
      case 'properties':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Property Management</h1>
            <div className="text-center py-12">
              <FaBuilding className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Property management interface with search, filters, and bulk actions</p>
            </div>
          </div>
        );
      case 'approvals':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Property Approvals</h1>
            <div className="text-center py-12">
              <FaEye className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Review and approve property listings before they go live</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>
            <div className="text-center py-12">
              <FaUsers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>
            <div className="text-center py-12">
              <FaChartLine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Detailed analytics and reporting dashboard</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h1>
            <div className="text-center py-12">
              <FaCog className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">System configuration and admin preferences</p>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
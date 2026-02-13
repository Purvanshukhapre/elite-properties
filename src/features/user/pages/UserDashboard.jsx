import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
// Dashboard stats: no dedicated user stats API in spec — initialize defaults

// Small presentational components declared at module scope (avoid creating during render)
export const StatCard = ({ title, value, change, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {change !== undefined && (
          <p className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '↗' : '↘'} {Math.abs(change)}% from last month
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </motion.div>
);

export const ActivityItem = ({ action, time }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
  >
    <div>
      <p className="text-sm font-medium text-gray-900">{action}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
  </motion.div>
);

const UserDashboard = () => {
  const stats = {
    totalProperties: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0,
    recentActivity: []
  };
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Performance data will be fetched from API when available. Start empty per project rules.
  const chartData = [];

  return (
    <div className="min-h-screen bg-app">
      {/* Header */}
      <div className="bg-card border-b border-premium-platinum/10">
        <div className="page-container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="typography-heading-1 mb-2 text-primary">
                Dashboard
              </h1>
              <p className="typography-body-medium text-secondary max-w-xl">
                Welcome back{user?.name ? `, ${user.name}` : ''}! Here's an overview of your property activity.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="premium-btn premium-btn-secondary !bg-white !text-red-600 !border !border-red-100 hover:!bg-red-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="py-8">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Properties"
              value={stats.totalProperties}
              change={12}
              icon="🏠"
              color="bg-blue-100"
            />
            <StatCard
              title="Active Listings"
              value={stats.activeListings}
              change={8}
              icon="📋"
              color="bg-green-100"
            />
            <StatCard
              title="Total Views"
              value={stats.totalViews.toLocaleString()}
              change={15}
              icon="👁️"
              color="bg-purple-100"
            />
            <StatCard
              title="Total Inquiries"
              value={stats.totalInquiries}
              change={22}
              icon="💬"
              color="bg-orange-100"
            />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl shadow-premium p-6 card-hover border border-premium-platinum/10"
            >
              <h3 className="typography-heading-3 mb-4 text-primary">
                Performance Overview
              </h3>
              <div className="space-y-4">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {data.month}
                    </span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-premium-sapphire h-2 rounded-full"
                            style={{ width: `${(data.views / 1700) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted w-12 text-right">
                          {data.views}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-premium-emerald/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-premium-emerald">
                        {data.inquiries}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-muted">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-premium-sapphire rounded-full mr-2"></div>
                  Views
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-premium-emerald rounded-full mr-2"></div>
                  Inquiries
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-2xl shadow-premium p-6 card-hover border border-premium-platinum/10"
            >
              <h3 className="typography-heading-3 mb-4 text-primary">
                Recent Activity
              </h3>
              <div className="space-y-1">
                {stats.recentActivity.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    action={activity.action}
                    time={activity.time}
                  />
                ))}
              </div>
              <button className="w-full mt-4 text-premium-sapphire text-sm font-medium hover:text-premium-royal transition-colors">
                View All Activity →
              </button>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-card rounded-2xl shadow-premium p-6 card-hover border border-premium-platinum/10"
          >
            <h3 className="typography-heading-3 mb-4 text-primary">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center p-4 bg-premium-sapphire/10 hover:bg-premium-sapphire/20 rounded-xl transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">➕</div>
                  <div className="text-sm font-medium text-premium-sapphire">Add Property</div>
                </div>
              </button>
              <button className="flex items-center justify-center p-4 bg-premium-emerald/10 hover:bg-premium-emerald/20 rounded-xl transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-premium-emerald">View Analytics</div>
                </div>
              </button>
              <button className="flex items-center justify-center p-4 bg-premium-amethyst/10 hover:bg-premium-amethyst rounded-xl hover:text-white transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-sm font-medium">Manage Leads</div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
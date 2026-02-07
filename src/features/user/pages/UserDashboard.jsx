import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const UserDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalInquiries: 0,
    recentActivity: []
  });

  useEffect(() => {
    // Initializing with zeroed values to resolve broken mock import
    setStats({
      totalProperties: 0,
      activeListings: 0,
      totalInquiries: 0,
      recentActivity: []
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const StatCard = ({ title, value, change, icon, color }) => (
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
          {change && (
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

  const ActivityItem = ({ action, time }) => (
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

  // Mock chart data (simplified representation)
  const chartData = [
    { month: 'Jan', views: 1200, inquiries: 45 },
    { month: 'Feb', views: 1350, inquiries: 52 },
    { month: 'Mar', views: 1180, inquiries: 38 },
    { month: 'Apr', views: 1420, inquiries: 61 },
    { month: 'May', views: 1380, inquiries: 55 },
    { month: 'Jun', views: 1650, inquiries: 72 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Grid */}
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Saved Properties"
              value={stats.totalProperties}
              change={12}
              icon="❤️"
              color="bg-pink-100"
            />
            <StatCard
              title="Scheduled Visits"
              value={stats.activeListings}
              change={-5}
              icon="📅"
              color="bg-blue-100"
            />
            <StatCard
              title="Recent Inquiries"
              value={stats.totalInquiries}
              change={22}
              icon="💬"
              color="bg-orange-100"
            />
            <StatCard
              title="Profile Completion"
              value="85%"
              change={5}
              icon="👤"
              color="bg-green-100"
            />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(data.views / 1700) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 w-12">
                          {data.views}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">
                        {data.inquiries}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Views
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Inquiries
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
              <button
                onClick={() => navigate('/user/visits')}
                className="w-full mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
              >
                View Full History →
              </button>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/user/buy')}
                className="flex items-center justify-center p-6 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔍</div>
                  <div className="text-sm font-semibold text-indigo-700">Search Properties</div>
                </div>
              </button>
              <button
                onClick={() => navigate('/user/saved')}
                className="flex items-center justify-center p-6 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">❤️</div>
                  <div className="text-sm font-semibold text-rose-700">View Favorites</div>
                </div>
              </button>
              <button
                onClick={() => navigate('/user/visits')}
                className="flex items-center justify-center p-6 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📅</div>
                  <div className="text-sm font-semibold text-emerald-700">Track Visits</div>
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
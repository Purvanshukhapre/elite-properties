import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { getMyProperties } from '../../../api/property.api';
import { FaHome, FaBell, FaEnvelope, FaEye, FaHeart, FaChartLine } from 'react-icons/fa';

const DashboardOverview = () => {
  const { isAuthenticated } = useAuth();
  const { notifications } = useApp();
  const [dashboardData, setDashboardData] = useState({
    properties: [],
    inquiries: 0,
    views: 0,
    saves: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user's properties
        const propertiesResponse = await getMyProperties();
        if (propertiesResponse.success) {
          const properties = propertiesResponse.data.properties || [];
          
          // Calculate dashboard metrics
          let totalInquiries = 0;
          let totalViews = 0;
          let totalSaves = 0;
          
          properties.forEach(property => {
            totalInquiries += property.inquiries?.length || 0;
            totalViews += property.views || 0;
            totalSaves += property.savedByCount || 0;
          });
          
          // Create recent activity from notifications and property events
          const recentActivity = [
            ...notifications.slice(0, 5).map(notif => ({
              id: `notif-${notif.id}`,
              type: 'notification',
              title: notif.title || 'Notification',
              message: notif.message,
              timestamp: new Date(notif.timestamp || notif.createdAt || Date.now()),
              icon: <FaBell className="text-blue-500" />
            })),
            ...properties.slice(0, 3).map(property => ({
              id: `prop-${property._id}`,
              type: 'property',
              title: property.title,
              message: `Property ${property.status || 'active'} with ${property.inquiries?.length || 0} inquiries`,
              timestamp: new Date(property.updatedAt || property.createdAt || Date.now()),
              icon: <FaHome className="text-green-500" />
            }))
          ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
          
          setDashboardData({
            properties,
            inquiries: totalInquiries,
            views: totalViews,
            saves: totalSaves,
            recentActivity
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, notifications]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          {dashboardData.properties.length > 0 ? (
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your properties.</p>
          ) : (
            <p className="text-gray-600 mt-2">Welcome! You don't have any properties listed yet. Would you like to list a property?</p>
          )}
        </div>

        {/* Stats Cards - Only show if user has properties */}
        {dashboardData.properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.properties.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaHome className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.inquiries}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FaEnvelope className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.views}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaEye className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Saves</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.saves}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <FaHeart className="text-red-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaChartLine className="text-blue-500" />
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.recentActivity.length > 0 ? (
                dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FaChartLine className="mx-auto text-gray-400 text-3xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No recent activity</h3>
                  <p className="text-gray-500">Your recent property activity will appear here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaBell className="text-yellow-500" />
                Recent Notifications
                {notifications.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {notifications.length > 0 ? (
                notifications.slice(0, 6).map((notification) => (
                  <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <FaBell className="text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {notification.title || 'Notification'}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notification.timestamp || notification.createdAt || new Date()).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FaBell className="mx-auto text-gray-400 text-3xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
                  <p className="text-gray-500">Your notifications will appear here.</p>
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-4 bg-gray-50">
                <a 
                  href="/user/notifications" 
                  className="block text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View all notifications
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="/user/properties" 
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FaHome className="text-blue-500 mr-2" />
              My Properties
            </a>
            {dashboardData.properties.length > 0 && (
              <a 
                href="/user/inquiries" 
                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <FaEnvelope className="text-green-500 mr-2" />
                Property Inquiries
              </a>
            )}
            <a 
              href="/user/saved" 
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <FaHeart className="text-red-500 mr-2" />
              Saved Properties
            </a>
            <a 
              href="/user/notifications" 
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
            >
              <FaBell className="text-yellow-500 mr-2" />
              Notifications
            </a>
            {dashboardData.properties.length === 0 && (
              <a 
                href="/user/post-property" 
                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
              >
                <FaHome className="text-purple-500 mr-2" />
                List Property
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
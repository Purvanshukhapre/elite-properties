import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [recentProperties] = useState([
    { id: 1, title: 'Luxury Villa in Beverly Hills', price: '₹15 Cr', location: 'Beverly Hills, CA', image: '/api/placeholder/300/200' },
    { id: 2, title: 'Modern Apartment in Manhattan', price: '₹8 Cr', location: 'Manhattan, NY', image: '/api/placeholder/300/200' },
    { id: 3, title: 'Penthouse in Dubai Marina', price: '₹20 Cr', location: 'Dubai Marina, UAE', image: '/api/placeholder/300/200' }
  ]);
  
  const [suggestedProperties] = useState([
    { id: 4, title: 'Seaside Mansion in Malibu', price: '₹25 Cr', location: 'Malibu, CA', image: '/api/placeholder/300/200' },
    { id: 5, title: 'Townhouse in London', price: '₹12 Cr', location: 'London, UK', image: '/api/placeholder/300/200' },
    { id: 6, title: 'Mountain Retreat in Switzerland', price: '₹18 Cr', location: 'Swiss Alps', image: '/api/placeholder/300/200' }
  ]);
  
  const [notifications] = useState([
    { id: 1, message: 'Your property listing has been approved', time: '2 hours ago', type: 'success' },
    { id: 2, message: 'New inquiry received for your property', time: '1 day ago', type: 'info' },
    { id: 3, message: 'Your subscription expires in 7 days', time: '3 days ago', type: 'warning' }
  ]);

  const quickActions = [
    { name: 'Post Property', icon: '🏠', link: '/user/post-property', color: 'from-premium-sapphire to-premium-royal' },
    { name: 'My Properties', icon: '🏢', link: '/user/properties', color: 'from-emerald-500 to-teal-600' },
    { name: 'My Leads', icon: '📈', link: '/user/leads', color: 'from-purple-500 to-indigo-600' },
    { name: 'Saved Properties', icon: '❤️', link: '/user/saved-properties', color: 'from-pink-500 to-rose-600' }
  ];

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-premium-onyx mb-2">
                Welcome Back, {user?.name || 'User'}!
              </h1>
              <p className="text-xl text-premium-platinum">
                Manage your luxury real estate portfolio
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-sm text-premium-onyx opacity-70">Member since</p>
              <p className="text-lg font-semibold text-premium-sapphire">Jan 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={action.link}
                className={`bg-gradient-to-br ${action.color} p-6 rounded-2xl text-white hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold">{action.name}</h3>
                <p className="text-white/80 text-sm mt-1">Manage your {action.name.toLowerCase()}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-premium-onyx mb-6">Notifications</h2>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`flex items-center justify-between p-4 rounded-xl border-l-4 ${
                  notification.type === 'success' ? 'border-green-500 bg-green-50' :
                  notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div>
                  <p className="font-medium text-premium-onyx">{notification.message}</p>
                  <p className="text-sm text-premium-platinum">{notification.time}</p>
                </div>
                <button className="text-premium-sapphire hover:text-premium-royal">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recently Viewed */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-premium-onyx">Recently Viewed</h2>
              <Link to="/user/recently-viewed" className="text-premium-sapphire hover:text-premium-royal font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentProperties.map(property => (
                <Link
                  key={property.id}
                  to={`/properties/${property.id}`}
                  className="flex items-center p-4 rounded-xl border border-premium-platinum/30 hover:border-premium-sapphire/50 transition-colors"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-premium-onyx">{property.title}</h3>
                    <p className="text-premium-sapphire font-bold">{property.price}</p>
                    <p className="text-sm text-premium-platinum">{property.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Suggested Properties */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-premium-onyx">Suggested For You</h2>
              <Link to="/properties" className="text-premium-sapphire hover:text-premium-royal font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {suggestedProperties.map(property => (
                <Link
                  key={property.id}
                  to={`/properties/${property.id}`}
                  className="flex items-center p-4 rounded-xl border border-premium-platinum/30 hover:border-premium-sapphire/50 transition-colors"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-premium-onyx">{property.title}</h3>
                    <p className="text-premium-sapphire font-bold">{property.price}</p>
                    <p className="text-sm text-premium-platinum">{property.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-premium-sapphire mb-2">12</div>
            <div className="text-premium-onyx font-medium">Properties Listed</div>
            <div className="text-sm text-premium-platinum">Active listings</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-emerald-500 mb-2">8</div>
            <div className="text-premium-onyx font-medium">Active Leads</div>
            <div className="text-sm text-premium-platinum">Potential buyers</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-purple-500 mb-2">24</div>
            <div className="text-premium-onyx font-medium">Saved Properties</div>
            <div className="text-sm text-premium-platinum">Favorites</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
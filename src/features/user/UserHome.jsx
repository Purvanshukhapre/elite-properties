import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const UserHome = () => {
  const { user } = useAuth();
  
  // Recommended properties for the user
  const [recommendedProperties] = useState([
    { id: 1, title: 'Luxury Villa in Beverly Hills', price: '₹15 Cr', location: 'Beverly Hills, CA', image: '/api/placeholder/300/200', type: 'Buy' },
    { id: 2, title: 'Modern Apartment in Manhattan', price: '₹8 Cr', location: 'Manhattan, NY', image: '/api/placeholder/300/200', type: 'Rent' },
    { id: 3, title: 'Penthouse in Dubai Marina', price: '₹20 Cr', location: 'Dubai Marina, UAE', image: '/api/placeholder/300/200', type: 'Invest' }
  ]);
  
  // Recently viewed properties
  const [recentlyViewed] = useState([
    { id: 4, title: 'Seaside Mansion in Malibu', price: '₹25 Cr', location: 'Malibu, CA', image: '/api/placeholder/300/200', type: 'Buy' },
    { id: 5, title: 'Townhouse in London', price: '₹12 Cr', location: 'London, UK', image: '/api/placeholder/300/200', type: 'Invest' }
  ]);
  
  // Quick action shortcuts
  const propertyActions = [
    { name: 'Buy', icon: '🏢', link: '/buy', color: 'from-blue-500 to-blue-600', description: 'Find properties to purchase' },
    { name: 'Rent', icon: '🏠', link: '/rent', color: 'from-emerald-500 to-teal-600', description: 'Find rentals & leases' },
    { name: 'Invest', icon: '💰', link: '/commercial', color: 'from-purple-500 to-indigo-600', description: 'Commercial & investment properties' }
  ];
  
  const actionShortcuts = [
    { name: 'Post Property', icon: '🏠', link: '/user/post-property', color: 'from-premium-sapphire to-premium-royal', description: 'List your property' },
    { name: 'My Properties', icon: '🏢', link: '/user/properties', color: 'from-emerald-500 to-teal-600', description: 'Manage listings' },
    { name: 'Leads', icon: '📈', link: '/user/leads', color: 'from-purple-500 to-indigo-600', description: 'Track inquiries' },
    { name: 'Saved', icon: '❤️', link: '/user/saved-properties', color: 'from-pink-500 to-rose-600', description: 'Favorite properties' },
    { name: 'Schedule Visit', icon: '📅', link: '/user/appointments', color: 'from-amber-500 to-orange-500', description: 'Manage viewings' },
    { name: 'Dashboard', icon: '📊', link: '/user/dashboard', color: 'from-gray-500 to-gray-600', description: 'View analytics' }
  ];
  
  // User insights
  const [insights] = useState({
    savedCount: 24,
    activeLeads: 8,
    propertiesListed: 12
  });

  return (
    <div className="min-h-screen bg-premium-pearl py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-premium-sapphire to-premium-royal rounded-3xl shadow-xl p-8 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome Back, {user?.name || 'User'}!
              </h1>
              <p className="text-xl opacity-90">
                Discover and manage premium real estate opportunities
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-sm opacity-70">Member since</p>
              <p className="text-lg font-semibold">Jan 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Property Discovery Section - PRIMARY */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-premium-onyx">Property Discovery</h2>
            <Link to="/properties" className="text-premium-sapphire hover:text-premium-royal font-medium">
              View All Properties
            </Link>
          </div>
          
          {/* Property Entry Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {propertyActions.map((action, index) => (
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
                  <p className="text-white/80 text-sm mt-1">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Recommended Properties */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-premium-onyx mb-6">Recommended For You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-premium-onyx">{property.title}</h4>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{property.type}</span>
                    </div>
                    <p className="text-premium-platinum text-sm mb-2">{property.location}</p>
                    <p className="text-2xl font-bold text-premium-sapphire">{property.price}</p>
                    <Link
                      to={`/properties/${property.id}`}
                      className="mt-4 block bg-premium-sapphire text-white text-center py-2 rounded-lg hover:bg-premium-royal transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Recently Viewed */}
          <div>
            <h3 className="text-2xl font-bold text-premium-onyx mb-6">Recently Viewed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentlyViewed.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-4 flex items-center hover:shadow-xl transition-shadow"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-bold text-premium-onyx">{property.title}</h4>
                    <p className="text-premium-platinum text-sm mb-1">{property.location}</p>
                    <p className="text-lg font-bold text-premium-sapphire">{property.price}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{property.type}</span>
                      <Link
                        to={`/properties/${property.id}`}
                        className="text-premium-sapphire hover:text-premium-royal text-sm font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Shortcuts - PRIMARY */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-premium-onyx mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionShortcuts.map((action, index) => (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={action.link}
                  className={`bg-gradient-to-br ${action.color} p-6 rounded-2xl text-white hover:shadow-xl transition-all duration-300 group flex items-center`}
                >
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{action.name}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Light Insights - SECONDARY */}
        <section>
          <h2 className="text-3xl font-bold text-premium-onyx mb-6">Your Property Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div className="text-4xl font-bold text-premium-sapphire mb-2">{insights.propertiesListed}</div>
              <div className="text-premium-onyx font-medium">Properties Listed</div>
              <div className="text-sm text-premium-platinum">Active on platform</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div className="text-4xl font-bold text-emerald-500 mb-2">{insights.activeLeads}</div>
              <div className="text-premium-onyx font-medium">Active Leads</div>
              <div className="text-sm text-premium-platinum">Potential buyers/inquiries</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div className="text-4xl font-bold text-purple-500 mb-2">{insights.savedCount}</div>
              <div className="text-premium-onyx font-medium">Saved Properties</div>
              <div className="text-sm text-premium-platinum">Properties you're interested in</div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserHome;
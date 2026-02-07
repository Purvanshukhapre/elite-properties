import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaSearch, FaHeart, FaPlus, FaChartLine, 
  FaStar, FaEye, FaBell, FaMapMarkerAlt, FaRupeeSign,
  FaBed, FaBath, FaRulerCombined, FaCertificate,
  FaArrowUp, FaUsers, FaCalendar, FaFilter, FaEnvelope
} from 'react-icons/fa';
import PremiumNavbar from '../components/PremiumNavbar';
import { MEMBER_BRAND, MEMBER_TYPOGRAPHY } from '../constants/design-system';

const PremiumHome = () => {
  const [userStats, setUserStats] = useState({
    savedProperties: 12,
    recentViews: 8,
    propertyAlerts: 3,
    messages: 5,
    propertiesPosted: 2
  });

  const [recommendedProperties, setRecommendedProperties] = useState([
    {
      id: 1,
      title: 'Luxury 3BHK Penthouse with Panoramic City Views',
      location: 'Mumbai, Maharashtra',
      price: 25000000,
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      amenities: ['parking', 'gym', 'security'],
      rating: 4.8,
      views: 1247,
      status: 'verified',
      postedBy: 'Verified Builder',
      daysAgo: 2
    },
    {
      id: 2,
      title: 'Modern 2BHK Flat Near Metro Station',
      location: 'Delhi, NCR',
      price: 4500000,
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: 'https://images.unsplash.com/photo-1575517114893-0925201b4f15?w=600&h=400&fit=crop',
      amenities: ['parking', 'elevator'],
      rating: 4.5,
      views: 892,
      status: 'new',
      postedBy: 'Individual Owner',
      daysAgo: 1
    },
    {
      id: 3,
      title: 'Spacious Villa with Private Garden',
      location: 'Bangalore, Karnataka',
      price: 12000000,
      type: 'villa',
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      amenities: ['garden', 'pool', 'security', 'parking'],
      rating: 4.9,
      views: 2156,
      status: 'premium',
      postedBy: 'Premium Developer',
      daysAgo: 5
    }
  ]);

  const [quickActions, setQuickActions] = useState([
    { 
      name: 'Explore Properties', 
      icon: FaSearch, 
      href: '/premium/explore', 
      color: 'blue', 
      description: 'Discover your dream property',
      stats: '12,000+ listings'
    },
    { 
      name: 'Post Property', 
      icon: FaPlus, 
      href: '/premium/post', 
      color: 'green', 
      description: 'List your property for sale',
      stats: 'Get verified buyers'
    },
    { 
      name: 'My Properties', 
      icon: FaHome, 
      href: '/premium/my-properties', 
      color: 'purple', 
      description: 'Manage your listings',
      stats: '2 active listings'
    },
    { 
      name: 'Saved Properties', 
      icon: FaHeart, 
      href: '/premium/saved', 
      color: 'red', 
      description: 'View your favorites',
      stats: '12 properties saved'
    },
  ]);

  const [marketInsights, setMarketInsights] = useState([
    { metric: 'Avg. Property Price', value: '₹45 Lakh', change: '+12%', trend: 'up' },
    { metric: 'Properties Sold', value: '1,247', change: '+8%', trend: 'up' },
    { metric: 'New Listings', value: '342', change: '+15%', trend: 'up' },
    { metric: 'Market Confidence', value: 'High', change: '+5%', trend: 'up' }
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      verified: { text: 'Verified', className: 'bg-green-100 text-green-800', icon: FaCertificate },
      new: { text: 'New', className: 'bg-blue-100 text-blue-800', icon: FaStar },
      premium: { text: 'Premium', className: 'bg-purple-100 text-purple-800', icon: FaStar }
    };
    
    const badge = badges[status] || badges.new;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
        <Icon className="mr-1 h-3 w-3" />
        {badge.text}
      </span>
    );
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Navbar */}
      <PremiumNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={MEMBER_TYPOGRAPHY.scale.display['3xl']}>
              Welcome to Your Premium Real Estate Experience
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Exclusive access to verified properties, personalized recommendations, 
              and professional real estate services tailored just for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/premium/explore" 
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaSearch className="inline mr-2 h-5 w-5" />
                Explore Properties
              </Link>
              <Link 
                to="/premium/post" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-400"
              >
                <FaPlus className="inline mr-2 h-5 w-5" />
                Post Property
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating stats */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Verified Properties', value: '12,500+' },
                { label: 'Active Buyers', value: '45,000+' },
                { label: 'Properties Sold', value: '8,900+' },
                { label: 'Happy Owners', value: '15,600+' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Personal Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            { icon: FaHeart, label: 'Saved Properties', value: userStats.savedProperties, color: 'red' },
            { icon: FaEye, label: 'Recently Viewed', value: userStats.recentViews, color: 'blue' },
            { icon: FaBell, label: 'Property Alerts', value: userStats.propertyAlerts, color: 'yellow' },
            { icon: FaEnvelope, label: 'Messages', value: userStats.messages, color: 'green' },
            { icon: FaHome, label: 'Properties Posted', value: userStats.propertiesPosted, color: 'purple' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center">
                  <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Market Insights</h2>
            <FaChartLine className="h-6 w-6 text-blue-600" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {marketInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{insight.metric}</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">{insight.value}</p>
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <FaArrowUp className={`mr-1 h-4 w-4 ${insight.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} />
                    {insight.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.name}
                  to={action.href}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${action.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-6 w-6 text-${action.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{action.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                  <div className="text-xs font-medium text-gray-500">{action.stats}</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recommended Properties */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
              <p className="text-gray-600 mt-1">Based on your preferences and browsing history</p>
            </div>
            <Link 
              to="/premium/explore" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(property.status)}
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
                      <FaHeart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                    </button>
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
                      <FaFilter className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    {property.daysAgo} days ago
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg ml-3">
                      <FaStar className="text-yellow-400 mr-1 h-4 w-4" />
                      <span className="text-sm font-semibold text-blue-700">
                        {property.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.views} views
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                      <FaBed className="mr-2 h-4 w-4 text-blue-500" />
                      <span>{property.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                      <FaBath className="mr-2 h-4 w-4 text-blue-500" />
                      <span>{property.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                      <FaRulerCombined className="mr-2 h-4 w-4 text-blue-500" />
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Posted by {property.postedBy}
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumHome;
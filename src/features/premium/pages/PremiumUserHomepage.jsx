import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaPlus, FaChartBar, FaUsers, FaMapMarkerAlt, FaHeart, FaEye, FaCalendarAlt, FaClock, FaMoneyBillWave, FaBuilding } from 'react-icons/fa';

const PremiumUserHomepage = () => {
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const stats = {
    totalProperties: 24,
    views: 1248,
    inquiries: 24,
    favorites: 8
  };
  
  const recentProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "New York, NY",
      price: "$1,250,000",
      image: "/api/placeholder/300/200",
      status: "Active",
      views: 124,
      inquiries: 8
    },
    {
      id: 2,
      title: "Luxury Beachfront Villa",
      location: "Miami, FL",
      price: "$3,500,000",
      image: "/api/placeholder/300/200",
      status: "Pending",
      views: 89,
      inquiries: 12
    },
    {
      id: 3,
      title: "Suburban Family Home",
      location: "Austin, TX",
      price: "$850,000",
      image: "/api/placeholder/300/200",
      status: "Active",
      views: 67,
      inquiries: 5
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Property Showing",
      property: "Modern Downtown Apartment",
      date: "Today, 2:00 PM",
      client: "John Smith"
    },
    {
      id: 2,
      title: "Contract Signing",
      property: "Luxury Beachfront Villa",
      date: "Tomorrow, 10:00 AM",
      client: "Sarah Johnson"
    },
    {
      id: 3,
      title: "Open House",
      property: "Suburban Family Home",
      date: "Feb 8, 1:00 PM",
      client: "Multiple Clients"
    }
  ];

  const quickActions = [
    {
      title: "Post New Property",
      icon: <FaPlus />,
      color: "from-blue-500 to-blue-600",
      onClick: () => navigate('/premium/post')
    },
    {
      title: "Buy Properties",
      icon: <FaHome />,
      color: "from-green-500 to-green-600",
      onClick: () => navigate('/premium/buy')
    },
    {
      title: "Rent Properties",
      icon: <FaMoneyBillWave />,
      color: "from-purple-500 to-purple-600",
      onClick: () => navigate('/premium/rent')
    },
    {
      title: "Sell Properties",
      icon: <FaBuilding />,
      color: "from-orange-500 to-orange-600",
      onClick: () => navigate('/premium/sell')
    }
  ];

  const handleActionClick = (action) => {
    action.onClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Premium Member!</h1>
              <p className="text-blue-100 mt-1">Ready to manage your premium real estate portfolio?</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => navigate('/premium/post')}
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                <FaPlus className="mr-2" /> Post Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Properties", value: stats.totalProperties, icon: <FaHome />, color: "blue" },
            { title: "Total Views", value: stats.views, icon: <FaEye />, color: "green" },
            { title: "Inquiries", value: stats.inquiries, icon: <FaUsers />, color: "purple" },
            { title: "Favorites", value: stats.favorites, icon: <FaHeart />, color: "red" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <div className={`text-${stat.color}-600 text-xl`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div 
                key={index}
                onClick={() => handleActionClick(action)}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer group hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-xl">
                    {action.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">Click to get started</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Properties */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
                <Link to="/premium/my-properties" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentProperties.map((property) => (
                <div key={property.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{property.title}</h3>
                      <p className="text-gray-600 text-sm flex items-center">
                        <FaMapMarkerAlt className="mr-1 text-xs" /> {property.location}
                      </p>
                      <p className="text-lg font-bold text-blue-600 mt-1">{property.price}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status}
                        </span>
                        <span className="flex items-center">
                          <FaEye className="mr-1" /> {property.views}
                        </span>
                        <span className="flex items-center">
                          <FaUsers className="mr-1" /> {property.inquiries}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                <Link to="/premium/schedule" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View Calendar
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{event.property}</p>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <FaClock className="mr-1" /> {event.date}
                      </p>
                      <p className="text-gray-700 text-sm mt-1">Client: {event.client}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Buy Properties",
                description: "Find your dream home",
                image: "/api/placeholder/400/250",
                route: "/premium/buy"
              },
              {
                title: "Rent Properties",
                description: "Discover rental opportunities",
                image: "/api/placeholder/400/250",
                route: "/premium/rent"
              },
              {
                title: "Sell Properties",
                description: "List your property for sale",
                image: "/api/placeholder/400/250",
                route: "/premium/sell"
              }
            ].map((category, index) => (
              <div 
                key={index}
                onClick={() => navigate(category.route)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer group hover:scale-105"
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                    Explore Now <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUserHomepage;
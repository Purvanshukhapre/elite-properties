import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa';

const AgentsPage = () => {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      phone: "(555) 123-4567",
      email: "sarah@eliteproperties.com",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 127,
      properties: 89,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      specialties: ["Luxury Homes", "Investment Properties"],
      featured: true
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Commercial Specialist",
      phone: "(555) 234-5678",
      email: "michael@eliteproperties.com",
      location: "Santa Monica, CA",
      rating: 4.8,
      reviews: 98,
      properties: 156,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      specialties: ["Commercial", "Retail Spaces"],
      featured: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "First-Time Buyer Expert",
      phone: "(555) 345-6789",
      email: "emily@eliteproperties.com",
      location: "Beverly Hills, CA",
      rating: 4.9,
      reviews: 203,
      properties: 134,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      specialties: ["First-Time Buyers", "Family Homes"],
      featured: false
    },
    {
      id: 4,
      name: "David Kim",
      title: "Luxury Property Specialist",
      phone: "(555) 456-7890",
      email: "david@eliteproperties.com",
      location: "Marina del Rey, CA",
      rating: 4.7,
      reviews: 86,
      properties: 72,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Luxury Estates", "Waterfront"],
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Same as Homepage */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="/1471930_People_3840x2160.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Meet Our Elite
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Agents
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
              Connect with top-performing agents who will help you buy, sell, or invest
            </p>
            
            {/* Trust Badge */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
              <p className="text-base">
                <span className="font-bold text-yellow-400">Trusted by 15,000+</span> clients
                <span className="mx-2">•</span>
                Top-Rated Real Estate Professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Listings */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Expert Agents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional agents with years of experience in the real estate market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* 3D Effect Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="relative">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    {agent.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                        Top Agent
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(agent.id)}
                      className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg group-hover:scale-110"
                    >
                      <FaHeart
                        className={`w-5 h-5 transition-colors ${
                          favorites.has(agent.id) ? 'text-red-500 fill-current' : 'text-gray-400 group-hover:text-red-500'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      <span className="text-sm">{agent.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-3">{agent.title}</p>
                    
                    <div className="flex items-center text-yellow-500 mb-3">
                      <FaStar className="mr-1 fill-current" />
                      <span className="font-semibold mr-2">{agent.rating}</span>
                      <span className="text-gray-600 text-sm">({agent.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <FaStar className="mr-1 text-blue-500" />
                      <span>{agent.properties} Properties Sold</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.specialties.map((specialty, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Link
                        to={`tel:${agent.phone}`}
                        className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
                      >
                        <FaPhone className="mr-2" />
                        Call
                      </Link>
                      <Link
                        to={`mailto:${agent.email}`}
                        className="flex-1 flex items-center justify-center border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-xl font-semibold hover:bg-blue-50 transform hover:-translate-y-1 transition-all"
                      >
                        <FaEnvelope className="mr-2" />
                        Email
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsPage;
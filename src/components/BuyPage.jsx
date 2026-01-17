import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const BuyPage = () => {
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

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      price: "$895,000",
      address: "456 Central Ave, Los Angeles, CA",
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Luxury Hillside Villa",
      price: "$2,450,000",
      address: "789 Summit Road, Beverly Hills, CA",
      beds: 5,
      baths: 4,
      sqft: 4200,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Charming Suburban Home",
      price: "$650,000",
      address: "321 Oak Street, Santa Monica, CA",
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Waterfront Luxury Apartment",
      price: "$1,750,000",
      address: "101 Seaside Blvd, Marina del Rey, CA",
      beds: 3,
      baths: 3,
      sqft: 2200,
      image: "https://images.unsplash.com/photo-1545239351-ef35f43d01b4?w=400&h=300&fit=crop",
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
              src="/6026347_People_Person_3840x2160.mp4"
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
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Home Today
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
              Discover the ideal property that matches your lifestyle and dreams
            </p>
            
            {/* Trust Badge */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
              <p className="text-base">
                <span className="font-bold text-yellow-400">Trusted by 15,000+</span> buyers
                <span className="mx-2">•</span>
                Find Homes That Match Your Life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our curated selection of homes available for purchase
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* 3D Effect Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    {property.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                        Featured
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg group-hover:scale-110"
                    >
                      <FaHeart
                        className={`w-5 h-5 transition-colors ${
                          favorites.has(property.id) ? 'text-red-500 fill-current' : 'text-gray-400 group-hover:text-red-500'
                        }`}
                      />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {property.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm space-x-4 pt-4 border-t border-gray-100">
                      <span className="flex items-center">
                        <FaBed className="mr-1 text-blue-500" />
                        {property.beds}
                      </span>
                      <span className="flex items-center">
                        <FaBath className="mr-1 text-blue-500" />
                        {property.baths}
                      </span>
                      <span className="flex items-center">
                        <FaRulerCombined className="mr-1 text-blue-500" />
                        {property.sqft} sqft
                      </span>
                    </div>
                    
                    <Link
                      to={`/property/${property.id}`}
                      className="mt-6 block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
                    >
                      View Details
                    </Link>
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

export default BuyPage;
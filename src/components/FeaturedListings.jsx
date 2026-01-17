import React, { useState } from 'react';
import { FaHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';

const FeaturedListings = () => {
  const [favorites, setFavorites] = useState({});
  
  const listings = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
      price: '$899,000',
      address: '123 Luxury Ave, Beverly Hills, CA',
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: 'House',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      price: '$650,000',
      address: '456 Modern St, Santa Monica, CA',
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: 'Condo',
      featured: false
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop',
      price: '$1,250,000',
      address: '789 Premium Rd, Malibu, CA',
      beds: 5,
      baths: 4,
      sqft: 3500,
      type: 'House',
      featured: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop',
      price: '$425,000',
      address: '321 Cozy Ln, Venice, CA',
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: 'Townhouse',
      featured: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
      price: '$750,000',
      address: '654 Elegant Pl, West Hollywood, CA',
      beds: 3,
      baths: 2.5,
      sqft: 2000,
      type: 'Penthouse',
      featured: true
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
      price: '$985,000',
      address: '987 Luxury Blvd, Pasadena, CA',
      beds: 4,
      baths: 3.5,
      sqft: 2800,
      type: 'House',
      featured: false
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full px-6 py-2 mb-6 border border-blue-200/50">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-blue-600 font-semibold text-sm">PREMIUM COLLECTION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Premium Listings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Carefully curated luxury properties selected for discerning buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/15 transform transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden hover:scale-[1.02]"
              >
                {/* Premium Effect Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="relative group-img">
                    <img
                      src={listing.image}
                      alt={listing.address}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(listing.id);
                      }}
                      className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300"
                    >
                      <FaHeart 
                        className={`w-5 h-5 ${favorites[listing.id] ? 'text-blue-600 fill-current' : 'text-gray-500 group-hover:text-white'}`} 
                      />
                    </button>
                    {listing.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        PREMIUM
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">{listing.type}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {listing.price}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {listing.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-5 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-blue-600 w-4 h-4" />
                      {listing.address}
                    </p>
                    
                    <div className="flex items-center text-gray-600 text-sm space-x-6 mb-6">
                      <span className="flex items-center">
                        <FaBed className="mr-2 text-blue-600 w-4 h-4" />
                        {listing.beds} beds
                      </span>
                      <span className="flex items-center">
                        <FaBath className="mr-2 text-blue-600 w-4 h-4" />
                        {listing.baths} baths
                      </span>
                      <span className="flex items-center">
                        <FaRulerCombined className="mr-2 text-blue-600 w-4 h-4" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                    
                    <div className="flex justify-between pt-6 border-t border-gray-100">
                      <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg">
                        View Details
                      </button>
                      <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg">
                        Schedule Tour
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default FeaturedListings;
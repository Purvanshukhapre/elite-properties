import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';
import { COLORS } from '../constants/brand';

const FeaturedListings = () => {
  const [favorites, setFavorites] = useState({});
  
  const listings = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-soft-gray to-white">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Featured Listings
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Handpicked properties that match your search criteria
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {listings.map((listing) => (
              <motion.div
                key={listing.id}
                variants={itemVariants}
                className="group bg-white rounded-2xl border border-border-color overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -10, scale: 1.02, borderColor: COLORS.accent.primaryBlue }}
              >
                <div className="relative group-img">
                  <img
                    src={listing.image}
                    alt={listing.address}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(listing.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-primary-blue hover:text-white transition-all duration-300 group-heart"
                  >
                    <FaHeart 
                      className={favorites[listing.id] ? 'text-primary-blue fill-current' : 'text-gray-400 group-hover:text-red-400'} 
                    />
                  </button>
                  {listing.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-primary-blue to-secondary-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-primary-blue/80 px-3 py-1 rounded-full text-sm font-medium">{listing.type}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-blue transition-colors cursor-pointer">
                      {listing.price}
                    </h3>
                    <span className="text-sm text-text-secondary bg-gray-100 px-2 py-1 rounded">
                      {listing.type}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary mb-3 flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-sm" />
                    {listing.address}
                  </p>
                  
                  <div className="flex items-center text-text-secondary text-sm space-x-4 mb-4">
                    <span className="flex items-center">
                      <FaBed className="mr-1" />
                      {listing.beds} beds
                    </span>
                    <span className="flex items-center">
                      <FaBath className="mr-1" />
                      {listing.baths} baths
                    </span>
                    <span className="flex items-center">
                      <FaRulerCombined className="mr-1" />
                      {listing.sqft} sqft
                    </span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-border-color">
                    <button className="text-primary-blue font-medium hover:text-secondary-blue transition-colors">
                      View Details
                    </button>
                    <button className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white px-4 py-2 rounded-lg hover:shadow-md transition-all">
                      Schedule Tour
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default FeaturedListings;
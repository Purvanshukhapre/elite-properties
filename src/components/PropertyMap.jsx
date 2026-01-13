import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';
import { COLORS } from '../constants/brand';

const PropertyMap = () => {
  const [hoveredPin, setHoveredPin] = useState(null);
  const [hoveredListing, setHoveredListing] = useState(null);

  // Sample property data with coordinates for the map
  const properties = [
    {
      id: 1,
      title: 'Modern Downtown Loft',
      price: '$750,000',
      address: '123 Main St, Downtown',
      lat: 34.0522,
      lng: -118.2437,
      beds: 2,
      baths: 2,
      sqft: 1200
    },
    {
      id: 2,
      title: 'Luxury Beachfront Villa',
      price: '$1,250,000',
      address: '456 Ocean Dr, Beachside',
      lat: 34.0422,
      lng: -118.2537,
      beds: 4,
      baths: 3.5,
      sqft: 2800
    },
    {
      id: 3,
      title: 'Suburban Family Home',
      price: '$899,000',
      address: '789 Oak Ln, Suburbia',
      lat: 34.0622,
      lng: -118.2337,
      beds: 4,
      baths: 3,
      sqft: 2400
    }
  ];

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
    <div className="py-16 px-4 bg-white">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Find Properties on the Map
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Browse listings and see their locations instantly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-xl border border-border-color overflow-hidden"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Simulated map with markers */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-text-secondary">Interactive Property Map</p>
                  </div>
                </div>
                
                {/* Property markers */}
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    className={`absolute cursor-pointer ${
                      hoveredPin === property.id ? 'z-10' : 'z-0'
                    }`}
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + (index % 2) * 30}%`,
                    }}
                    onMouseEnter={() => setHoveredPin(property.id)}
                    onMouseLeave={() => setHoveredPin(null)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaMapMarkerAlt 
                      className={`text-3xl ${
                        hoveredPin === property.id || hoveredListing === property.id
                          ? 'text-[#2563EB]' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Listings Section */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl border p-6 cursor-pointer transition-all duration-300 ${
                    hoveredPin === property.id || hoveredListing === property.id
                      ? 'border-[#2563EB] shadow-lg'
                      : 'border-gray-200'
                  }`}
                  onMouseEnter={() => {
                    setHoveredPin(property.id);
                    setHoveredListing(property.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredPin(null);
                    setHoveredListing(null);
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-text-primary">
                      {property.title}
                    </h3>
                    <span className="text-primary-blue font-bold">
                      {property.price}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-3">
                    {property.address}
                  </p>
                  
                  <div className="flex items-center text-text-secondary text-sm space-x-4">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default PropertyMap;
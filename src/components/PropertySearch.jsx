import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaSearch, FaMapMarkerAlt, FaHome, FaBuilding, FaLandmark, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { COLORS } from '../constants/brand';

const PropertySearch = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('any');
  const [priceRange, setPriceRange] = useState('any');
  const [beds, setBeds] = useState('any');
  const [baths, setBaths] = useState('any');

  const propertyTypes = [
    { value: 'any', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'land', label: 'Land' }
  ];

  const priceRanges = [
    { value: 'any', label: 'Any Price' },
    { value: '0-200000', label: '$0 - $200K' },
    { value: '200000-400000', label: '$200K - $400K' },
    { value: '400000-600000', label: '$400K - $600K' },
    { value: '600000-800000', label: '$600K - $800K' },
    { value: '800000+', label: '$800K+' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ location, propertyType, priceRange, beds, baths });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-white to-soft-gray">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-blue/5 to-secondary-blue/5 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            Find Your Perfect Home
          </h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Location Input */}
              <div className="relative lg:col-span-2">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Enter location, city, or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50"
                />
              </div>

              {/* Property Type */}
              <div>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full py-4 px-4 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent appearance-none bg-white transition-all duration-300 hover:border-primary-blue/50"
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full py-4 px-4 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent appearance-none bg-white"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-blue to-secondary-blue hover:from-secondary-blue hover:to-primary-blue text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <FaSearch className="mr-2 group-hover:scale-110 transition-transform" />
                    Search
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary-blue to-primary-blue opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border-color">
              <div className="flex items-center space-x-3">
                <FaBed className="text-text-secondary" />
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="flex-1 py-3 px-4 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent appearance-none bg-white transition-all duration-300 hover:border-primary-blue/50"
                >
                  <option value="any">Any Beds</option>
                  <option value="1">1+ Bed</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <FaBath className="text-text-secondary" />
                <select
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className="flex-1 py-3 px-4 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent appearance-none bg-white transition-all duration-300 hover:border-primary-blue/50"
                >
                  <option value="any">Any Baths</option>
                  <option value="1">1+ Bath</option>
                  <option value="2">2+ Baths</option>
                  <option value="3">3+ Baths</option>
                  <option value="4">4+ Baths</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <FaRulerCombined className="text-text-secondary" />
                <input
                  type="number"
                  placeholder="Min sqft"
                  className="flex-1 py-3 px-4 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-primary-blue/50"
                />
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertySearch;
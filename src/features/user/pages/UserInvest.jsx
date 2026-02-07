import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propertyAPI from '../../../api/property.api';
import { useEffect } from 'react';

const UserInvest = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('roi-high');

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const res = await propertyAPI.getAllProperties({ propertyCategory: 'investment' });
      const list = res?.data?.propertyPosts || [];
      if (mounted) setProperties(list);
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true;
    return property.investmentType.toLowerCase().replace(' ', '-') === filter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'roi-high') {
      return parseFloat(b.roi.replace('%', '')) - parseFloat(a.roi.replace('%', ''));
    }
    if (sortBy === 'roi-low') {
      return (a.roi || 0) - (b.roi || 0);
    }
    if (sortBy === 'price-low') {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortBy === 'price-high') {
      return (b.price || 0) - (a.price || 0);
    }
    return 0;
  });

  const filterOptions = [
    { value: 'all', label: 'All Investments' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'hospitality', label: 'Hospitality' }
  ];

  const InvestmentCard = ({ property, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Image with Premium Overlay */}
      <div className="relative">
        <img
          src={property.propertyPics?.[0] || 'https://placehold.co/800x600?text=Elite+Investment'}
          alt={property.bhk + ' BHK'}
          className="w-full h-56 object-cover"
        />
        {/* Investment Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.investmentType}
          </span>
        </div>
        {/* ROI Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            {property.roi} ROI
          </span>
        </div>
        {/* Premium Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
            PREMIUM INVESTMENT
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {property.bhk} BHK {property.propertyCategory} in {property.locality}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.locality}, {property.city}
        </div>

        {/* Investment Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-xs text-green-600 uppercase font-semibold mb-1">
              Annual Return
            </div>
            <div className="text-lg font-bold text-green-700">
              {property.annualReturn}
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-xs text-blue-600 uppercase font-semibold mb-1">
              Appreciation
            </div>
            <div className="text-lg font-bold text-blue-700">
              {property.appreciation}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {property.amenities?.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {property.propertyDetails}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {property.priceTag || `₹${property.price?.toLocaleString()}`}
            </div>
            <div className="text-xs text-gray-500">Investment Amount</div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Compare
            </button>
            <button
              onClick={() => navigate(`/properties/${property._id || property.id}`)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Investment Properties
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Discover high-yield investment opportunities in prime locations
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold">₹50Cr+</div>
                  <div className="text-sm text-purple-200">Total Investment Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">8.5%</div>
                  <div className="text-sm text-purple-200">Average ROI</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-purple-200">Happy Investors</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === option.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="roi-high">ROI: High to Low</option>
                <option value="roi-low">ROI: Low to High</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedProperties.length} investment opportunities
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No investment properties found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more investment opportunities.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedProperties.map((property, index) => (
                <InvestmentCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Investment Calculator CTA */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calculate Your Investment Returns
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Use our investment calculator to estimate potential returns
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Open Calculator
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserInvest;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propertyAPI from '../../../api/property.api';
import { useEffect } from 'react';

const UserRent = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');

  const [properties, setProperties] = useState([]);
  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const res = await propertyAPI.getAllProperties({ propertyType: 'rent' });
      const list = res?.data?.propertyPosts || [];
      if (mounted) setProperties(list);
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true;
    if (filter === 'furnished') return property.rentBadge === 'Furnished';
    if (filter === 'semi-furnished') return property.rentBadge === 'Semi-furnished';
    if (filter === 'unfurnished') return property.rentBadge === 'Unfurnished';
    return property.type.toLowerCase() === filter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-low') {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortBy === 'price-high') {
      return (b.price || 0) - (a.price || 0);
    }
    return 0;
  });

  const filterOptions = [
    { value: 'all', label: 'All Rentals' },
    { value: 'furnished', label: 'Furnished' },
    { value: 'semi-furnished', label: 'Semi-furnished' },
    { value: 'unfurnished', label: 'Unfurnished' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'villa', label: 'Villas' }
  ];

  const RentalCard = ({ property, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={property.propertyPics?.[0] || 'https://placehold.co/800x600?text=Elite+Property'}
          alt={`${property.bhk} BHK`}
          className="w-full h-48 object-cover"
        />
        {/* Rent Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${property.rentBadge === 'Furnished'
              ? 'bg-green-500 text-white'
              : property.rentBadge === 'Semi-furnished'
                ? 'bg-yellow-500 text-white'
                : 'bg-blue-500 text-white'
            }`}>
            {property.rentBadge}
          </span>
        </div>
        {/* Monthly Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Monthly
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {property.bhk} BHK {property.propertyCategory} in {property.locality}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.locality}, {property.city}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities?.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.propertyDetails}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {property.priceTag || `₹${property.price?.toLocaleString()}`}
            </div>
          </div>
          <button
            onClick={() => navigate(`/properties/${property._id || property.id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rent Properties
            </h1>
            <p className="text-lg text-gray-600">
              Find the perfect rental property for your needs
            </p>
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
                      ? 'bg-green-600 text-white'
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
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedProperties.length} rental properties
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No rental properties found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more rental options.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedProperties.map((property, index) => (
                <RentalCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Load More Button */}
      {sortedProperties.length > 0 && (
        <div className="pb-16 text-center">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Load More Rentals
          </button>
        </div>
      )}
    </div>
  );
};

export default UserRent;
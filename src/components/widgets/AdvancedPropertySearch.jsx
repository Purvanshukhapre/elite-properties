import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ANIMATION_PRESETS, 
  PREMIUM_COMPONENTS 
} from '../../design-system/premium-design-system';

const AdvancedPropertySearch = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    priceRange: [0, 10000000],
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    amenities: []
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const propertyTypes = [
    'Apartment', 'House', 'Penthouse', 'Villa', 'Townhouse', 'Condo'
  ];

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Balcony',
    'Smart Home', 'Wine Cellar', 'Home Theater', 'Private Chef', 'Concierge'
  ];

  const handleAmenityToggle = (amenity) => {
    setSearchParams(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search implementation would go here
    console.log('Search params:', searchParams);
  };

  return (
    <section className="py-16 bg-premium-ivory">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          {...ANIMATION_PRESETS.slideUp}
        >
          {/* Search Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-onyx mb-4">
              Find Your Perfect Property
            </h2>
            <p className="text-xl text-premium-platinum max-w-2xl mx-auto">
              Advanced search filters powered by AI to match your exact investment criteria
            </p>
          </div>

          {/* Main Search Form */}
          <motion.form
            onSubmit={handleSearch}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              {/* Location Search */}
              <div>
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City, neighborhood, or ZIP"
                    value={searchParams.location}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                    style={PREMIUM_COMPONENTS.inputs.premium.base}
                    className="w-full pl-10"
                    onFocus={(e) => e.target.style = { ...PREMIUM_COMPONENTS.inputs.premium.base, ...PREMIUM_COMPONENTS.inputs.premium.focus }}
                    onBlur={(e) => e.target.style = PREMIUM_COMPONENTS.inputs.premium.base}
                  />
                  <svg className="w-5 h-5 text-premium-platinum absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Price Range
                </label>
                <div className="relative">
                  <select
                    value={searchParams.priceRange[1]}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                    style={PREMIUM_COMPONENTS.inputs.premium.base}
                    className="w-full appearance-none"
                  >
                    <option value="1000000">Up to $1M</option>
                    <option value="5000000">Up to $5M</option>
                    <option value="10000000">Up to $10M</option>
                    <option value="20000000">Up to $20M</option>
                    <option value="50000000">Up to $50M</option>
                    <option value="100000000">Any Price</option>
                  </select>
                  <svg className="w-5 h-5 text-premium-platinum absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    value={searchParams.propertyType}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, propertyType: e.target.value }))}
                    style={PREMIUM_COMPONENTS.inputs.premium.base}
                    className="w-full appearance-none"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <svg className="w-5 h-5 text-premium-platinum absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <motion.button
                  type="submit"
                  style={PREMIUM_COMPONENTS.buttons.luxury.base}
                  whileHover={PREMIUM_COMPONENTS.buttons.luxury.hover}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Properties
                </motion.button>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-premium-sapphire font-medium hover:text-premium-royal transition-colors"
              >
                {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
                <svg className={`w-4 h-4 inline-block ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.form>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-premium-onyx mb-6">Advanced Filters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Bedrooms & Bathrooms */}
                <div>
                  <h4 className="font-semibold text-premium-onyx mb-4">Room Requirements</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-premium-platinum mb-2">Bedrooms</label>
                      <select
                        value={searchParams.bedrooms}
                        onChange={(e) => setSearchParams(prev => ({ ...prev, bedrooms: e.target.value }))}
                        style={PREMIUM_COMPONENTS.inputs.premium.base}
                        className="w-full"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-premium-platinum mb-2">Bathrooms</label>
                      <select
                        value={searchParams.bathrooms}
                        onChange={(e) => setSearchParams(prev => ({ ...prev, bathrooms: e.target.value }))}
                        style={PREMIUM_COMPONENTS.inputs.premium.base}
                        className="w-full"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-premium-onyx mb-4">Amenities</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenitiesList.map(amenity => (
                      <motion.label
                        key={amenity}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                          searchParams.amenities.includes(amenity)
                            ? 'bg-premium-sapphire border-premium-sapphire text-white'
                            : 'bg-white border-premium-platinum hover:border-premium-royal'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="checkbox"
                          checked={searchParams.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{amenity}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Saved Searches */}
              <div className="mt-8 pt-6 border-t border-premium-platinum/20">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-premium-onyx">Saved Searches</h4>
                  <button
                    style={PREMIUM_COMPONENTS.buttons.secondary.base}
                    whileHover={PREMIUM_COMPONENTS.buttons.secondary.hover}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm"
                  >
                    Save Current Search
                  </button>
                </div>
                <div className="mt-3 text-premium-platinum text-sm">
                  You have 3 saved searches
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Recommendations */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-6 py-3 rounded-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered Recommendations Available</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedPropertySearch;
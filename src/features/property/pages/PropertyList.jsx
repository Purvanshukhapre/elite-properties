import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import PageHeader from '../../../components/common/PageHeader';
import FeaturedPropertyCard from '../../../components/cards/FeaturedPropertyCard';
import { fadeInUp, staggerContainer } from '../../../design-system/motion';

const PropertyList = ({ initialType = "all", title = "Curated Portfolio", subtitle, backgroundImage }) => {
  const [filterType, setFilterType] = useState(initialType);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter properties to only show approved/active ones to regular users
  const approvedProperties = properties.filter(p => {
    // Show properties that are either approved/active or have no status (default to visible)
    // Hide properties with 'pending', 'under_review', 'rejected' status
    const status = p.propertyStatus || p.status || 'active';
    return ['active', 'available', 'approved', 'sold', 'rented'].includes(status.toLowerCase());
  });

  const filteredProperties = filterType === 'all'
    ? approvedProperties
    : approvedProperties.filter(p => p.type === filterType || (filterType === 'commercial' && p.type === 'commercial'));

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = { limit: 12, propertyType: filterType === 'all' ? undefined : filterType };
        const res = await (await import('../../../api/property.api')).default.getAllProperties(params);

        if (res && res.success && res.data?.propertyPosts) {
          setProperties(res.data.propertyPosts);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error('PropertyList fetch error:', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filterType]);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={title}
        subtitle={subtitle || "Explore our exclusive collection of hand-picked luxury properties."}
        backgroundImage={backgroundImage || "/photorealistic-wooden-house-with-timber-structure.jpg"}
      />

      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Type Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
            {['all', 'buy', 'rent', 'commercial'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${filterType === type
                  ? 'bg-white shadow-sm text-premium-onyx'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search/Filter Actions */}
          <div className="flex gap-4">
            <div className="relative flex-grow md:w-64">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search location..."
                className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-premium-gold/20 outline-none text-sm font-medium"
              />
            </div>
            <button className="bg-gray-50 p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
              <FaSlidersH />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property, idx) => (
              <div key={property._id || property.id || idx} className="h-[520px]">
                <FeaturedPropertyCard property={property} index={idx} />
              </div>
            ))}
          </motion.div>

          {loading ? (
            <div className="text-center py-32 text-gray-400">
              <p>Loading properties...</p>
            </div>
          ) : filteredProperties.length === 0 && (
            <div className="text-center py-32 text-gray-400">
              <p>No properties found matching your criteria.</p>
            </div>
          )}

          {/* Pagination / Load More */}
          <div className="mt-20 text-center">
            <button className="inline-block border border-gray-300 text-gray-900 px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-premium-onyx hover:text-white hover:border-premium-onyx transition-all duration-300">
              Load More Listings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyList;
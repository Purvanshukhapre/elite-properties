import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import propertyAPI from '../../api/property.api';
import { 
  ANIMATION_PRESETS, 
  PREMIUM_COMPONENTS 
} from '../../design-system/premium-design-system';

const SmartPropertyDiscovery = () => {
  const [activeFilter, setActiveFilter] = useState('featured');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: 'featured', label: 'Featured', icon: '⭐' },
    { id: 'new', label: 'New Listings', icon: '🆕' },
    { id: 'investment', label: 'Investment', icon: '📈' },
    { id: 'luxury', label: 'Luxury', icon: '💎' }
  ];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await propertyAPI.getAllProperties({ limit: 8 });
        const list = res?.data?.posts || res?.data || [];
        setProperties(list);
      } catch (err) {
        console.error('SmartPropertyDiscovery fetch error:', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const filteredProperties = properties.filter(property => 
    activeFilter === 'featured' || property.type === activeFilter
  );

  const PropertyCard = ({ property, index }) => (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      style={PREMIUM_COMPONENTS.cards.premium.base}
      whileHover={PREMIUM_COMPONENTS.cards.premium.hover}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-premium-gold text-premium-onyx px-3 py-1 rounded-full text-sm font-semibold">
            {property.roi} ROI
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-premium-onyx mb-2">{property.title}</h3>
        <p className="text-premium-platinum mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.location}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.map((feature, idx) => (
            <span key={idx} className="bg-premium-ivory text-premium-onyx px-2 py-1 rounded-lg text-sm">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-premium-gold">{property.price}</div>
          <button
            style={PREMIUM_COMPONENTS.buttons.primary.base}
            whileHover={PREMIUM_COMPONENTS.buttons.primary.hover}
            whileTap={{ scale: 0.95 }}
            className="text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-premium-ivory">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          {...ANIMATION_PRESETS.slideUp}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-premium-sapphire/10 mb-6">
            <span className="text-premium-sapphire font-medium">Smart Discovery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-premium-onyx mb-6">
            Discover Exceptional Properties
          </h2>
          <p className="text-xl text-premium-platinum max-w-3xl mx-auto">
            AI-powered recommendations tailored to your investment preferences and market insights
          </p>
        </motion.div>

        {/* Smart Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-premium-sapphire text-white shadow-lg'
                  : 'bg-white text-premium-onyx hover:bg-premium-ivory'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Property Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="animate-pulse">
                  <div className="h-64 bg-premium-platinum/20"></div>
                  <div className="p-6">
                    <div className="h-6 bg-premium-platinum/20 rounded mb-4"></div>
                    <div className="h-4 bg-premium-platinum/20 rounded mb-2"></div>
                    <div className="h-4 bg-premium-platinum/20 rounded w-3/4 mb-6"></div>
                    <div className="h-10 bg-premium-platinum/20 rounded"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            {...ANIMATION_PRESETS.staggerContainer}
          >
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </motion.div>
        )}

        {/* AI Insights Panel */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-premium-sapphire to-premium-royal rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">87%</div>
              <div className="text-premium-platinum">Market Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-premium-platinum">AI Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-premium-platinum">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartPropertyDiscovery;
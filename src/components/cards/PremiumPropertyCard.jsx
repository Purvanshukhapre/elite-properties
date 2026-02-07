import React from 'react';
import { motion } from 'framer-motion';
import {
  PREMIUM_COMPONENTS
} from '../../design-system/premium-design-system';

const PremiumPropertyCard = ({ property, index = 0, variant = 'default' }) => {
  const isLuxury = variant === 'luxury';

  // API Mapping & Fallbacks
  const id = property.id || property._id;
  const title = property.title || `${property.bhk} BHK in ${property.city}`;
  const image = property.propertyPics?.[0] || property.image || 'https://placehold.co/1200x800?text=Elite+Luxury';
  const price = property.priceTag || (property.price ? `₹${property.price.toLocaleString()}` : 'Price on Request');
  const location = property.location || `${property.locality}, ${property.city}`;
  const features = property.amenities || property.features || [];
  const roi = property.roi || '8.5%';
  const type = property.propertyCategory || property.type || 'Residential';
  const annualReturn = property.annualReturn || '12% Est.';
  const appreciation = property.appreciation || '15% YoY';

  const cardStyles = isLuxury
    ? PREMIUM_COMPONENTS.cards.luxury
    : PREMIUM_COMPONENTS.cards.premium;

  return (
    <motion.div
      className={`card-premium relative ${isLuxury ? '' : ''}`}
      style={cardStyles.base}
      whileHover={cardStyles.hover}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Property Image Gallery */}
      <div className="relative">
        <div className="card-image relative">
          <img
            src={image}
            alt={title}
            className="transition-transform duration-200"
          />

          {/* Soft overlay for readability */}
          <div className="card-overlay" aria-hidden="true"></div>

          {/* Premium Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-premium-gold text-premium-onyx px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {type}
            </div>
            {property.featured && (
              <div className="bg-premium-amethyst text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <motion.button
              className="btn-base btn-secondary text-sm px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/30 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Save property"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
              <span>Save</span>
            </motion.button>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4">
            <div className="px-4 py-2 rounded-xl font-bold text-lg" style={{ background: 'var(--primary-action)', color: '#fff' }}>
              {price}
            </div>
          </div>

          {/* ROI Indicator */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-premium-emerald text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              {roi} ROI
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className={`p-5 ${isLuxury ? 'pb-8' : ''}`}>
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-premium-onyx mb-2 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-premium-platinum">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm md:text-base line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex flex-wrap gap-2 mb-6 max-h-[80px] overflow-hidden">
          {features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider ${isLuxury
                ? 'bg-premium-gold/10 text-premium-gold border border-premium-gold/20'
                : 'bg-premium-ivory text-premium-onyx'
                }`}
            >
              {feature}
            </span>
          ))}
          {features.length > 3 && (
            <span className="px-3 py-1 rounded-lg text-[10px] font-medium bg-gray-100 text-gray-500 uppercase tracking-wider">
              +{features.length - 3} More
            </span>
          )}
        </div>

        {/* Property Description */}
        <p className="text-premium-platinum text-sm mb-6 line-clamp-2 min-h-[40px]">
          {description}
        </p>

        {/* Investment Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-3 rounded-xl ${isLuxury ? 'bg-premium-ivory' : 'bg-premium-platinum/10'}`}>
            <div className="text-[10px] text-premium-platinum uppercase tracking-wide mb-1 font-bold">
              Annual Return
            </div>
            <div className="text-lg font-black text-premium-emerald">
              {annualReturn}
            </div>
          </div>

          <div className={`p-3 rounded-xl ${isLuxury ? 'bg-premium-ivory' : 'bg-premium-platinum/10'
            }`}>
            <div className="text-[10px] text-premium-platinum uppercase tracking-wide mb-1 font-bold">
              Appreciation
            </div>
            <div className="text-lg font-black text-premium-sapphire">
              {appreciation}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            className="btn-base btn-primary flex-1"
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </motion.button>

          <motion.button
            className="btn-base btn-secondary w-44"
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Save
          </motion.button>
        </div>
      </div>

      {/* Luxury Footer (Only for luxury variant) */}
      {isLuxury && (
        <div className="px-6 pb-6">
          <div className="border-t border-premium-gold/20 pt-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-premium-platinum">Verified by Elite Properties</span>
              <div className="flex items-center text-premium-gold">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Premium Listing</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PremiumPropertyCard;
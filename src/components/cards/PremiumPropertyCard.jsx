import React from 'react';
import { motion } from 'framer-motion';
import { 
  PREMIUM_COMPONENTS 
} from '../../design-system/premium-design-system';

const PremiumPropertyCard = ({ property, index = 0, variant = 'default' }) => {
  const isLuxury = variant === 'luxury';
  
  const cardStyles = isLuxury 
    ? PREMIUM_COMPONENTS.cards.luxury 
    : PREMIUM_COMPONENTS.cards.premium;

  return (
    <motion.div
      className={`${isLuxury ? 'bg-premium-ivory' : 'bg-white'} rounded-2xl overflow-hidden shadow-lg`}
      style={cardStyles.base}
      whileHover={cardStyles.hover}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Property Image Gallery */}
      <div className="relative">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          
          {/* Image Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-premium-onyx/60 via-transparent to-transparent"></div>
          
          {/* Premium Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-premium-gold text-premium-onyx px-3 py-1 rounded-full text-sm font-semibold">
              {property.type}
            </div>
            {property.featured && (
              <div className="bg-premium-amethyst text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 space-y-2">
            <motion.button
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </motion.button>
            
            <motion.button
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          
          {/* Price Tag */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-premium-sapphire text-white px-4 py-2 rounded-xl font-bold text-lg shadow-xl">
              {property.price}
            </div>
          </div>
          
          {/* ROI Indicator */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-premium-emerald text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              {property.roi} ROI
            </div>
          </div>
        </div>
        
        {/* Image Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(3)].map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === 0 ? 'bg-white' : 'bg-white/50'
              }`}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Property Details */}
      <div className={`p-6 ${isLuxury ? 'pb-8' : ''}`}>
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-premium-onyx mb-2">
            {property.title}
          </h3>
          <div className="flex items-center text-premium-platinum">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm md:text-base">{property.location}</span>
          </div>
        </div>
        
        {/* Property Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {property.features.map((feature, idx) => (
            <span 
              key={idx}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                isLuxury 
                  ? 'bg-premium-gold/10 text-premium-gold border border-premium-gold/20' 
                  : 'bg-premium-ivory text-premium-onyx'
              }`}
            >
              {feature}
            </span>
          ))}
        </div>
        
        {/* Property Description */}
        {property.description && (
          <p className="text-premium-platinum text-sm mb-6 line-clamp-2">
            {property.description}
          </p>
        )}
        
        {/* Investment Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-3 rounded-xl ${
            isLuxury ? 'bg-premium-ivory' : 'bg-premium-platinum/10'
          }`}>
            <div className="text-xs text-premium-platinum uppercase tracking-wide mb-1">
              Annual Return
            </div>
            <div className="text-lg font-bold text-premium-emerald">
              {property.annualReturn}
            </div>
          </div>
          
          <div className={`p-3 rounded-xl ${
            isLuxury ? 'bg-premium-ivory' : 'bg-premium-platinum/10'
          }`}>
            <div className="text-xs text-premium-platinum uppercase tracking-wide mb-1">
              Appreciation
            </div>
            <div className="text-lg font-bold text-premium-sapphire">
              {property.appreciation}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            style={isLuxury 
              ? PREMIUM_COMPONENTS.buttons.luxury.base 
              : PREMIUM_COMPONENTS.buttons.primary.base
            }
            whileHover={isLuxury 
              ? PREMIUM_COMPONENTS.buttons.luxury.hover 
              : PREMIUM_COMPONENTS.buttons.primary.hover
            }
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </motion.button>
          
          <motion.button
            style={PREMIUM_COMPONENTS.buttons.secondary.base}
            whileHover={PREMIUM_COMPONENTS.buttons.secondary.hover}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
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
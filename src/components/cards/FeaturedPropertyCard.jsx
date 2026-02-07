import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const FeaturedPropertyCard = ({ property, index }) => {
    // API Mapping & Fallbacks
    const id = property._id || property.id;
    const title = `${property.bhk} BHK ${property.propertyCategory} in ${property.locality}`;
    const image = property.propertyPics?.[0] || 'https://placehold.co/800x600?text=Elite+Properties';
    const price = property.priceTag || (property.price ? `₹${property.price.toLocaleString()}` : 'Price on Request');
    const location = `${property.locality}, ${property.city}`;
    const bhk = property.bhk || 'N/A';
    const floors = property.floor || 'N/A';
    const size = property.buildArea ? `${property.buildArea} sqft` : 'N/A';
    const description = property.propertyDetails || 'No description available for this elite property.';

    return (
        <Link to={`/properties/${id}`} className="block h-full">
            <motion.div
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100 flex flex-col h-full cursor-pointer"
                whileHover={{ y: -5 }}
            >
                {/* Image Container - Fixed height for stability */}
                <div className="relative h-[280px] overflow-hidden bg-gray-200">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                        loading="lazy"
                    />

                    {/* Featured Badge */}
                    {property.featured && (
                        <div className="absolute top-4 left-4 bg-premium-gold text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                            Featured
                        </div>
                    )}
                </div>

                {/* Content Container - Flexible to push footer down */}
                <div className="flex flex-col flex-grow p-6">
                    {/* Title & Location */}
                    <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-premium-sapphire transition-colors line-clamp-1">
                            {title}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FaMapMarkerAlt className="mr-1.5 text-premium-gold flex-shrink-0" />
                            <span className="line-clamp-1">{location}</span>
                        </div>
                    </div>

                    {/* Price - Prominent */}
                    <div className="text-3xl font-bold text-premium-sapphire mb-4">
                        {price}
                    </div>

                    {/* Features - Icons */}
                    <div className="flex items-center gap-4 text-gray-600 text-sm mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center">
                            <FaBed className="mr-1.5 text-gray-400" />
                            <span className="font-medium">{bhk} BHK</span>
                        </div>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <div className="flex items-center">
                            <FaBath className="mr-1.5 text-gray-400" />
                            <span className="font-medium">{floors} Flr</span>
                        </div>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <div className="flex items-center">
                            <FaRulerCombined className="mr-1.5 text-gray-400" />
                            <span className="font-medium">{size}</span>
                        </div>
                    </div>

                    {/* Description - Truncated */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-grow">
                        {description}
                    </p>

                    {/* CTA - Spacer pushes this to bottom */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-premium-sapphire font-bold text-sm uppercase tracking-wider group-hover:text-premium-gold transition-colors">
                            View Details →
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default FeaturedPropertyCard;

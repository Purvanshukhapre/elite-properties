import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {
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
    
    const [hover, setHover] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    return (
        <Link to={`/properties/${id}`} className="block h-full">
            <div
                ref={cardRef}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500 ease-out border border-gray-100 flex flex-col h-full cursor-pointer"
                style={
                    {
                        transform: hover 
                            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
                            : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
                        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                        boxShadow: hover
                            ? '0 20px 40px rgba(0,0,0,0.1)' // Stronger shadow on hover
                            : '0 4px 6px rgba(0,0,0,0.05)' // Default shadow
                    }
                }
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => {
                    setHover(false);
                    setRotation({ x: 0, y: 0 });
                }}
                onMouseMove={(e) => {
                    if (!cardRef.current) return;
                    
                    const rect = cardRef.current.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg rotation
                    const rotateX = -((y - centerY) / centerY) * 10; // Invert for natural feel
                    
                    setRotation({ x: rotateX, y: rotateY });
                }}
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
            </div>
        </Link>
    );
};

export default FeaturedPropertyCard;

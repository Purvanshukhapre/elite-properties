import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SavedProperties = () => {
  const [savedProperties] = useState([
    {
      id: 1,
      title: 'Luxury Villa in Beverly Hills',
      price: '₹15 Cr',
      location: 'Beverly Hills, CA',
      image: '/api/placeholder/300/200',
      bedrooms: '4',
      bathrooms: '5',
      area: '4,500 sq ft',
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Modern Apartment in Manhattan',
      price: '₹8 Cr',
      location: 'Manhattan, NY',
      image: '/api/placeholder/300/200',
      bedrooms: '3',
      bathrooms: '2',
      area: '2,200 sq ft',
      addedDate: '2024-01-18'
    },
    {
      id: 3,
      title: 'Penthouse in Dubai Marina',
      price: '₹20 Cr',
      location: 'Dubai Marina, UAE',
      image: '/api/placeholder/300/200',
      bedrooms: '5',
      bathrooms: '6',
      area: '6,000 sq ft',
      addedDate: '2024-01-20'
    },
    {
      id: 4,
      title: 'Seaside Mansion in Malibu',
      price: '₹25 Cr',
      location: 'Malibu, CA',
      image: '/api/placeholder/300/200',
      bedrooms: '6',
      bathrooms: '7',
      area: '8,000 sq ft',
      addedDate: '2024-01-22'
    }
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-premium-onyx mb-2">Saved Properties</h1>
              <p className="text-xl text-premium-platinum">
                Your favorite properties for easy reference
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold text-premium-sapphire">
                {savedProperties.length} Saved
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map(property => (
            <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-red-50 transition-colors">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-premium-onyx leading-tight">
                    {property.title}
                  </h3>
                  <span className="text-2xl font-bold text-premium-sapphire">{property.price}</span>
                </div>
                
                <p className="text-premium-platinum mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {property.location}
                </p>
                
                <div className="flex justify-between text-sm text-premium-onyx mb-4">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>{property.area}</span>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-premium-platinum/30">
                  <span className="text-sm text-premium-platinum">
                    Saved on {formatDate(property.addedDate)}
                  </span>
                  <Link
                    to={`/properties/${property.id}`}
                    className="bg-premium-sapphire text-white px-4 py-2 rounded-lg font-medium hover:bg-premium-royal transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-premium-onyx mb-2">No saved properties</h3>
            <p className="text-premium-platinum mb-6">Start saving properties you're interested in</p>
            <Link
              to="/properties"
              className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;
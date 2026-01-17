import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart, FaExpand } from 'react-icons/fa';

const PropertyMap = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock property data with coordinates
  const properties = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      price: "$2,450,000",
      address: "123 Ocean Drive, Malibu, CA",
      beds: 5,
      baths: 4,
      sqft: 4200,
      lat: 34.0259, // Malibu coordinates
      lng: -118.7798,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Modern Downtown Condo",
      price: "$895,000",
      address: "456 Central Ave, Los Angeles, CA",
      beds: 2,
      baths: 2,
      sqft: 1200,
      lat: 34.0522, // Downtown LA coordinates
      lng: -118.2437,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Hillside Luxury Estate",
      price: "$3,750,000",
      address: "789 Summit Road, Beverly Hills, CA",
      beds: 6,
      baths: 5,
      sqft: 5800,
      lat: 34.0736, // Beverly Hills coordinates
      lng: -118.4004,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "Charming Suburban Home",
      price: "$650,000",
      address: "321 Maple Street, Santa Monica, CA",
      beds: 3,
      baths: 2,
      sqft: 1800,
      lat: 34.0195, // Santa Monica coordinates
      lng: -118.4912,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      featured: false
    }
  ];

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Properties on the Map
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our featured properties in prime locations across Southern California
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative">
          {/* Map Container - Using a simple map visualization */}
          <div className="h-96 md:h-[500px] w-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 relative">
            {/* Map grid lines */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>
            
            {/* City labels */}
            <div className="absolute top-4 left-4 text-sm font-semibold text-gray-700 bg-white/80 px-3 py-1 rounded-full">Los Angeles</div>
            <div className="absolute top-20 right-8 text-sm font-semibold text-gray-700 bg-white/80 px-3 py-1 rounded-full">Santa Monica</div>
            <div className="absolute bottom-20 left-10 text-sm font-semibold text-gray-700 bg-white/80 px-3 py-1 rounded-full">Beverly Hills</div>
            <div className="absolute bottom-10 right-20 text-sm font-semibold text-gray-700 bg-white/80 px-3 py-1 rounded-full">Malibu</div>
            
            {/* Property markers */}
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => handleMarkerClick(property)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${((property.lng + 118.8) / 0.6) * 100}%`,
                  top: `${((34.1 - property.lat) / 0.15) * 100}%`
                }}
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl ${
                    property.featured ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-blue-500 to-blue-700'
                  }`}>
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                  {property.featured && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  <div className="font-semibold">{property.title}</div>
                  <div className="text-yellow-400">{property.price}</div>
                </div>
              </button>
            ))}
            
            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Property List with Enhanced 3D Cards */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Properties</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => handleMarkerClick(property)}
                  className="bg-white rounded-2xl p-5 cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-200 relative overflow-hidden group"
                >
                  {/* 3D Effect Layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="relative mb-4 rounded-xl overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-40 object-cover"
                      />
                      {property.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                          Featured
                        </div>
                      )}
                      <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg group-hover:scale-110">
                        <FaHeart className="text-gray-400 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">{property.title}</h4>
                      <div className="text-2xl font-bold text-blue-600">{property.price}</div>
                      <div className="text-gray-600 text-sm line-clamp-1">{property.address}</div>
                      
                      <div className="flex items-center text-gray-600 text-sm space-x-4 pt-2 border-t border-gray-100">
                        <span className="flex items-center">
                          <FaBed className="mr-1 text-blue-500" />
                          {property.beds}
                        </span>
                        <span className="flex items-center">
                          <FaBath className="mr-1 text-blue-500" />
                          {property.baths}
                        </span>
                        <span className="flex items-center">
                          <FaRulerCombined className="mr-1 text-blue-500" />
                          {property.sqft} sqft
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property Detail Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 group-hover:scale-100">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{selectedProperty.title}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-3">{selectedProperty.price}</div>
                  <div className="flex items-center text-gray-600 mb-6">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    {selectedProperty.address}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <FaExpand className="w-6 h-6" />
                  </button>
                  <button className="p-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <FaHeart className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{selectedProperty.beds}</div>
                  <div className="text-gray-700 font-semibold">Bedrooms</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-green-600 mb-2">{selectedProperty.baths}</div>
                  <div className="text-gray-700 font-semibold">Bathrooms</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{selectedProperty.sqft}</div>
                  <div className="text-gray-700 font-semibold">Sq Ft</div>
                </div>
              </div>
              
              <div className="flex space-x-6">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  Schedule Tour
                </button>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-blue-50 transform hover:-translate-y-1 transition-all">
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PropertyMap;
import React, { useState } from 'react';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaShare, FaCamera, FaExpand } from 'react-icons/fa';

const PropertyDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState({});

  const property = {
    id: 1,
    title: "Stunning Luxury Villa with Ocean Views",
    price: "$2,450,000",
    address: "123 Ocean Drive, Malibu, CA 90265",
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4200,
    lotSize: "0.75 acres",
    yearBuilt: 2018,
    propertyType: "Single Family Home",
    description: "Experience luxury living in this stunning oceanfront villa featuring panoramic views, premium finishes, and world-class amenities. The open-concept design seamlessly blends indoor and outdoor living with floor-to-ceiling windows and multiple balconies overlooking the Pacific Ocean.",
    features: [
      "Ocean Views", "Smart Home Technology", "Wine Cellar", "Home Theater", 
      "Fitness Center", "Infinity Pool", "Gourmet Kitchen", "Master Suite",
      "Guest House", "3-Car Garage", "Fireplace", "Hardwood Floors"
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@premierestates.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    }
  };

  const toggleFavorite = () => {
    setFavorites(prev => ({
      ...prev,
      [property.id]: !prev[property.id]
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><a href="/" className="text-blue-600 hover:text-blue-800">Home</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-500">{property.title}</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Property Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2" />
                <span>{property.address}</span>
              </div>
              <div className="text-4xl font-bold text-blue-600">{property.price}</div>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button 
                onClick={toggleFavorite}
                className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 group"
              >
                <FaHeart 
                  className={`w-6 h-6 ${
                    favorites[property.id] 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400 group-hover:text-red-400'
                  }`} 
                />
              </button>
              <button className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200">
                <FaShare className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative">
          {/* 3D Effect Layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          <div className="relative">
            <div className="h-96 md:h-[500px] relative overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group">
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <FaBed className="mx-auto text-2xl text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <FaBath className="mx-auto text-2xl text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <FaRulerCombined className="mx-auto text-2xl text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
                    <div className="text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <FaExpand className="mx-auto text-2xl text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.lotSize}</div>
                    <div className="text-gray-600">Lot Size</div>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group">
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                <div className="h-64 bg-gray-200 rounded-xl relative overflow-hidden">
                  <img
                    src="https://maps.googleapis.com/maps/api/staticmap?center=34.0259,-118.7798&zoom=14&size=600x400&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUYU9r_QVwAxc3FoHE"
                    alt="Property Location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group">
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">Premier Estates</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Agent
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Schedule Tour
                  </button>
                </div>
              </div>
            </div>

            {/* Mortgage Calculator Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group">
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mortgage Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label>
                    <input
                      type="number"
                      defaultValue={property.price.replace(/[^0-9]/g, '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
                    <input
                      type="number"
                      defaultValue="20"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>30 Years</option>
                      <option>25 Years</option>
                      <option>20 Years</option>
                      <option>15 Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      defaultValue="6.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Estimated Monthly Payment:</span>
                      <span className="text-xl font-bold text-blue-600">$8,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Properties Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group">
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Properties</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
                      <img
                        src={`https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=80&fit=crop&crop=entropy`}
                        alt={`Similar property ${item}`}
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">Luxury Home #{item}</div>
                        <div className="text-blue-600 text-sm font-medium">${(2000000 + item * 100000).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">4 bd | 3 ba | 2,500 sqft</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
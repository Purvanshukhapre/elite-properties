import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined, 
  FaCar, FaHeart, FaShareAlt, FaPhone, FaWhatsapp, FaImage,
  FaCheck, FaStar, FaUser, FaCalendar, FaClock, FaArrowLeft,
   FaExpand, FaTag, FaShieldAlt, FaLightbulb
} from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import PremiumNavbar from '../components/PremiumNavbar';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [loadingProperty, setLoadingProperty] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoadingProperty(true);
      try {
        const propertyAPI = (await import('../../api/property.api')).default;
        const res = await propertyAPI.getPropertyById(id);
        const data = res?.data || null;
        setProperty(data);
      } catch (err) {
        console.error('PropertyDetails fetch error:', err);
        setProperty(null);
      } finally {
        setLoadingProperty(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleContact = () => {
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumNavbar />

      {loadingProperty ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-500">Loading property...</p>
        </div>
      ) : !property ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-500">Property not found.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Search
        </button>

        {/* Property Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <FaArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <FaArrowRight className="h-5 w-5 text-gray-700" />
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
              
              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleSave}
                  className={`p-3 rounded-full shadow-lg transition-all ${
                    isSaved 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 hover:bg-white text-gray-700'
                  }`}
                >
                  <FaHeart className="h-5 w-5" />
                </button>
                <button className="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all">
                  <FaShareAlt className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Thumbnail gallery */}
            <div className="flex gap-2 p-4 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {property.for === 'sale' ? formatPrice(property.price) : `${formatPrice(property.rent)}/mo`}
                    </div>
                    {property.for === 'rent' && property.maintenance && (
                      <div className="text-sm text-gray-600">
                        + ₹{property.maintenance.toLocaleString()} maintenance
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {property.type}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {property.for === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {property.availability}
                  </span>
                </div>

                {/* Property Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FaBed className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{property.bhk} BHK</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FaBath className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FaRulerCombined className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{property.builtArea} sqft</div>
                    <div className="text-sm text-gray-600">Built-up</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FaCar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{property.parking}</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About this Property</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheck className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheck className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Places */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Places</h3>
                  <div className="space-y-3">
                    {property.nearby.map((place, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="h-4 w-4 text-blue-500 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{place.name}</div>
                            <div className="text-sm text-gray-600 capitalize">{place.type}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">{place.distance}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="lg:w-80">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <FaUser className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{property.owner.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        {property.owner.verified && (
                          <span className="text-green-600 mr-1">
                            <FaShieldAlt className="h-3 w-3" />
                          </span>
                        )}
                        Verified Owner
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="h-4 w-4 mr-2" />
                      Response: {property.owner.responseTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendar className="h-4 w-4 mr-2" />
                      Member since: {property.owner.joinedSince}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleContact}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      <FaPhone className="h-4 w-4 mr-2 inline" />
                      Call
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all">
                      <FaWhatsapp className="h-4 w-4 mr-2 inline" />
                      WhatsApp
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <FaStar className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">4.8 (127 reviews)</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {property.stats.views} views • {property.stats.saves} saves • {property.stats.inquiries} inquiries
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive Map would be embedded here</p>
              <p className="text-sm text-gray-500 mt-1">Google Maps integration for property location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Owner</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
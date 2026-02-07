import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined, 
  FaCar, FaHeart, FaFilter, FaSort, FaList, FaThLarge,
  FaCheck, FaTimes, FaSlidersH, FaSearch, FaHome, FaBuilding, FaStar
} from 'react-icons/fa';
import PremiumNavbar from '../components/PremiumNavbar';
import propertyAPI from '../../api/property.api';

const PropertySearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bhk: searchParams.get('bhk') || '',
    furnishing: searchParams.get('furnishing') || '',
    amenities: [],
    sortBy: searchParams.get('sortBy') || 'relevance'
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        propertyType: filters.propertyType || undefined,
        city: filters.location || undefined,
        bhk: filters.bhk || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        isFurnished: filters.furnishing ? (filters.furnishing === 'Fully Furnished') : undefined
      };

      try {
        const res = await propertyAPI.getAllProperties(params);
        const list = res?.data?.posts || res?.data || [];
        setProperties(list);
        // If API returns pagination, map totalPages accordingly
        const tp = res?.data?.totalPages || 1;
        setTotalPages(tp);
      } catch (err) {
        console.error('Property search fetch error:', err);
        setProperties([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [filters, currentPage]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const formatPrice = (price, isRent = false) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getStatusBadge = (postedDays) => {
    if (postedDays <= 1) {
      return { text: 'New', className: 'bg-green-100 text-green-800' };
    } else if (postedDays <= 3) {
      return { text: 'Recent', className: 'bg-blue-100 text-blue-800' };
    }
    return { text: `${postedDays} days ago`, className: 'bg-gray-100 text-gray-800' };
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(property.postedDays).className}`}>
            {getStatusBadge(property.postedDays).text}
          </span>
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
          <FaHeart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </button>
        {property.owner.verified && (
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <FaCheck className="mr-1" />
            Verified
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
            {property.title}
          </h3>
          <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg ml-3">
            <FaStar className="text-yellow-400 mr-1 h-4 w-4" />
            <span className="text-sm font-semibold text-blue-700">
              {property.rating}
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaMapMarkerAlt className="mr-2 h-4 w-4" />
          <span>{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-blue-600">
            {property.for === 'sale' 
              ? formatPrice(property.price) 
              : `${formatPrice(property.rent, true)}/mo`}
          </div>
          <div className="text-sm text-gray-500">
            {property.views} views
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <FaBed className="mr-2 h-4 w-4 text-blue-500" />
            <span>{property.bhk} BHK</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <FaBath className="mr-2 h-4 w-4 text-blue-500" />
            <span>{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <FaRulerCombined className="mr-2 h-4 w-4 text-blue-500" />
            <span>{property.area} sqft</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            View Details
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  const PropertyListItem = ({ property }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex">
        <div className="w-48 h-32 relative flex-shrink-0">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(property.postedDays).className}`}>
              {getStatusBadge(property.postedDays).text}
            </span>
          </div>
          {property.owner.verified && (
            <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <FaCheck className="mr-1" />
              Verified
            </div>
          )}
        </div>
        
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg ml-3">
              <FaStar className="text-yellow-400 mr-1 h-4 w-4" />
              <span className="text-sm font-semibold text-blue-700">
                {property.rating}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <FaMapMarkerAlt className="mr-2 h-4 w-4" />
            <span>{property.location}</span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-xl font-bold text-blue-600">
              {property.for === 'sale' 
                ? formatPrice(property.price) 
                : `${formatPrice(property.rent, true)}/mo`}
            </div>
            <div className="text-sm text-gray-500">
              {property.views} views
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <FaBed className="mr-1 h-4 w-4 text-blue-500" />
              <span>{property.bhk} BHK</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaBath className="mr-1 h-4 w-4 text-blue-500" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaRulerCombined className="mr-1 h-4 w-4 text-blue-500" />
              <span>{property.area} sqft</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.slice(0, 4).map((amenity, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                +{property.amenities.length - 4} more
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              View Details
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Search by location, property name, or landmark..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaFilter className="mr-2" />
                Filters
              </button>
              
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="views">Most Viewed</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} hover:bg-blue-50 transition-colors`}
                >
                  <FaThLarge className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} hover:bg-blue-50 transition-colors`}
                >
                  <FaList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House/Villa</option>
                      <option value="commercial">Commercial</option>
                      <option value="plot">Plot/Land</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">BHK</label>
                    <select
                      value={filters.bhk}
                      onChange={(e) => handleFilterChange('bhk', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any BHK</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        placeholder="Min"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        placeholder="Max"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
                    <select
                      value={filters.furnishing}
                      onChange={(e) => handleFilterChange('furnishing', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any</option>
                      <option value="unfurnished">Unfurnished</option>
                      <option value="semi-furnished">Semi-Furnished</option>
                      <option value="fully-furnished">Fully Furnished</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="space-y-2">
                      {['Lift', 'Parking', 'Security', 'Gym', 'Pool', 'WiFi', 'Garden', 'Club House'].map(amenity => (
                        <label key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                            className="mr-2 rounded"
                          />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setFilters({
                      location: '',
                      propertyType: '',
                      minPrice: '',
                      maxPrice: '',
                      bhk: '',
                      furnishing: '',
                      amenities: [],
                      sortBy: 'relevance'
                    })}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {properties.length} Properties Found
              </h2>
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {properties.map(property => 
                  viewMode === 'grid' 
                    ? <PropertyCard key={property.id} property={property} />
                    : <PropertyListItem key={property.id} property={property} />
                )}
              </div>
            )}

            {!loading && properties.length === 0 && (
              <div className="text-center py-12">
                <FaSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => setFilters({
                    location: '',
                    propertyType: '',
                    minPrice: '',
                    maxPrice: '',
                    bhk: '',
                    furnishing: '',
                    amenities: [],
                    sortBy: 'relevance'
                  })}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && properties.length > 0 && (
              <div className="flex items-center justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
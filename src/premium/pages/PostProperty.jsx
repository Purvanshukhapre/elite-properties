import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaMapMarkerAlt, FaRupeeSign, FaCar, FaBed, 
  FaBath, FaRulerCombined, FaImages, FaMap, FaCheck,
  FaChevronLeft, FaChevronRight, FaCamera, FaUpload
} from 'react-icons/fa';
import PremiumNavbar from '../components/PremiumNavbar';

const PostProperty = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    propertyFor: '', // 'sale' or 'rent'
    propertyType: '',
    city: '',
    locality: '',
    landmark: '',
    
    // Property Details
    bhk: '',
    bathrooms: '',
    balconies: '',
    furnishing: '',
    builtArea: '',
    carpetArea: '',
    floor: '',
    totalFloors: '',
    parking: 'none',
    availabilityDate: '',
    
    // Pricing
    price: '',
    maintenance: '',
    securityDeposit: '',
    ageOfProperty: '',
    facing: '',
    
    // Amenities
    amenities: [],
    
    // Media
    photos: [],
    description: '',
    
    // Location
    latitude: null,
    longitude: null,
    mapAddress: ''
  });

  const [errors, setErrors] = useState({});
  
  const propertyTypes = [
    'Apartment', 'Independent House/Villa', 'Penthouse', 'Studio Apartment',
    'Residential Land', 'Commercial Land', 'Office Space', 'Shop', 'Warehouse'
  ];
  
  const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
  
  const amenitiesOptions = [
    'Lift', 'Power Backup', 'Security Guard', 'Children\'s Play Area', 
    'Gym', 'Swimming Pool', 'Parking', 'Garden', 'Club House', 
    'Internet/WiFi', 'AC', 'Water Purifier', 'Hospital', 'School',
    'Shopping Mall', 'Bank', 'Restaurant', 'Airport', 'Railway Station'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Basic Info
        if (!formData.propertyFor) newErrors.propertyFor = 'Please select property for';
        if (!formData.propertyType) newErrors.propertyType = 'Please select property type';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.locality) newErrors.locality = 'Locality is required';
        break;
        
      case 2: // Property Details
        if (!formData.bhk) newErrors.bhk = 'BHK is required';
        if (!formData.bathrooms) newErrors.bathrooms = 'Number of bathrooms is required';
        if (!formData.builtArea) newErrors.builtArea = 'Built area is required';
        break;
        
      case 3: // Pricing
        if (!formData.price) newErrors.price = 'Price is required';
        if (formData.propertyFor === 'rent' && !formData.securityDeposit) {
          newErrors.securityDeposit = 'Security deposit is required for rent';
        }
        break;
        
      case 4: // Description & Photos
        if (!formData.description) newErrors.description = 'Description is required';
        if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < 5) {
        setStep(step + 1);
      } else {
        // Submit form
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Call real API to create property
      const propertyAPI = (await import('../../api/property.api')).default;
      const res = await propertyAPI.createProperty(formData);
      if (res?.success) {
        // Optionally upload photos if API requires separate endpoint (not implemented here)
        navigate('/premium/post/success');
      } else {
        setErrors({ submit: res?.message || 'Failed to post property. Please try again.' });
      }
    } catch (error) {
      console.error('PostProperty submit error:', error);
      setErrors({ submit: 'Failed to post property. Please try again.' });
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            num <= step 
              ? 'bg-blue-600 text-white border-2 border-blue-600' 
              : 'bg-white text-gray-500 border-2 border-gray-300'
          }`}>
            {num}
          </div>
          {num < 5 && (
            <div className={`w-16 h-1 ${
              num < step ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property For</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleInputChange('propertyFor', 'sale')}
            className={`p-4 border rounded-lg text-center ${
              formData.propertyFor === 'sale'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <FaHome className="mx-auto mb-2" />
            <span>Sale</span>
          </button>
          <button
            type="button"
            onClick={() => handleInputChange('propertyFor', 'rent')}
            className={`p-4 border rounded-lg text-center ${
              formData.propertyFor === 'rent'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <FaHome className="mx-auto mb-2" />
            <span>Rent</span>
          </button>
        </div>
        {errors.propertyFor && <p className="text-red-500 text-sm mt-1">{errors.propertyFor}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
        <select
          value={formData.propertyType}
          onChange={(e) => handleInputChange('propertyType', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Property Type</option>
          {propertyTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter city"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Locality</label>
          <input
            type="text"
            value={formData.locality}
            onChange={(e) => handleInputChange('locality', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter locality"
          />
          {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
          <input
            type="text"
            value={formData.landmark}
            onChange={(e) => handleInputChange('landmark', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nearby landmark"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">BHK</label>
          <select
            value={formData.bhk}
            onChange={(e) => handleInputChange('bhk', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5">5+ BHK</option>
          </select>
          {errors.bhk && <p className="text-red-500 text-sm mt-1">{errors.bhk}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
          <select
            value={formData.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
          {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Balconies</label>
          <select
            value={formData.balconies}
            onChange={(e) => handleInputChange('balconies', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="0">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
          <select
            value={formData.furnishing}
            onChange={(e) => handleInputChange('furnishing', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            {furnishingOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Built-up Area (sq ft)</label>
          <input
            type="number"
            value={formData.builtArea}
            onChange={(e) => handleInputChange('builtArea', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter built-up area"
          />
          {errors.builtArea && <p className="text-red-500 text-sm mt-1">{errors.builtArea}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sq ft)</label>
          <input
            type="number"
            value={formData.carpetArea}
            onChange={(e) => handleInputChange('carpetArea', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter carpet area"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Floor Number</label>
          <select
            value={formData.floor}
            onChange={(e) => handleInputChange('floor', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Floor</option>
            <option value="0">Ground Floor</option>
            <option value="1">1st Floor</option>
            <option value="2">2nd Floor</option>
            <option value="3">3rd Floor</option>
            <option value="4">4th Floor</option>
            <option value="5">5th Floor</option>
            <option value="6">6th Floor</option>
            <option value="7">7th Floor</option>
            <option value="8">8th Floor</option>
            <option value="9">9th Floor</option>
            <option value="10">10th Floor</option>
            <option value="11">11th Floor</option>
            <option value="12">12th Floor</option>
            <option value="13">13th Floor</option>
            <option value="14">14th Floor</option>
            <option value="15">15th Floor</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
          <select
            value={formData.totalFloors}
            onChange={(e) => handleInputChange('totalFloors', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Total Floors</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
        <div className="grid grid-cols-3 gap-4">
          {['none', 'open', 'covered', 'both'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleInputChange('parking', type)}
              className={`p-3 border rounded-lg text-center capitalize ${
                formData.parking === type
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <FaCar className="mx-auto mb-1" />
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {formData.propertyFor === 'sale' ? 'Sale Price (₹)' : 'Monthly Rent (₹)'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaRupeeSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter price"
            />
          </div>
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance (₹)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaRupeeSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={formData.maintenance}
              onChange={(e) => handleInputChange('maintenance', e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter maintenance"
            />
          </div>
        </div>
      </div>

      {formData.propertyFor === 'rent' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit (₹)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaRupeeSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={formData.securityDeposit}
              onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter security deposit"
            />
          </div>
          {errors.securityDeposit && <p className="text-red-500 text-sm mt-1">{errors.securityDeposit}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age of Property (years)</label>
          <select
            value={formData.ageOfProperty}
            onChange={(e) => handleInputChange('ageOfProperty', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Age</option>
            <option value="0-1">0-1 years (New Construction)</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10-15">10-15 years</option>
            <option value="15+">15+ years</option>
            <option value="ready-to-move">Ready to Move</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facing Direction</label>
          <select
            value={formData.facing}
            onChange={(e) => handleInputChange('facing', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Facing</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="northeast">North-East</option>
            <option value="northwest">North-West</option>
            <option value="southeast">South-East</option>
            <option value="southwest">South-West</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your property, nearby amenities, special features, etc."
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {amenitiesOptions.map(amenity => (
            <button
              key={amenity}
              type="button"
              onClick={() => handleAmenityToggle(amenity)}
              className={`p-3 border rounded-lg text-left ${
                formData.amenities.includes(amenity)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${
                  formData.amenities.includes(amenity)
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-400'
                }`}>
                  {formData.amenities.includes(amenity) && (
                    <FaCheck className="w-3 h-3 text-white text-xs" />
                  )}
                </div>
                <span className="text-sm">{amenity}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <FaCamera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Upload property photos</p>
          <p className="text-sm text-gray-500 mb-4">JPG, PNG up to 5MB each</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              handleInputChange('photos', [...formData.photos, ...files]);
            }}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <FaUpload className="mr-2" />
            Select Photos
          </label>
          <p className="text-xs text-gray-500 mt-2">Upload at least 3 photos for better visibility</p>
          {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos}</p>}
        </div>
        
        {formData.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Property ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newPhotos = [...formData.photos];
                    newPhotos.splice(index, 1);
                    handleInputChange('photos', newPhotos);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Preview Your Listing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Property For:</span> {formData.propertyFor === 'sale' ? 'Sale' : 'Rent'}</p>
              <p><span className="font-medium">Type:</span> {formData.propertyType}</p>
              <p><span className="font-medium">Location:</span> {formData.locality}, {formData.city}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">BHK:</span> {formData.bhk}</p>
              <p><span className="font-medium">Bathrooms:</span> {formData.bathrooms}</p>
              <p><span className="font-medium">Area:</span> {formData.builtArea} sq ft</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Price:</span> ₹{parseInt(formData.price).toLocaleString()}</p>
              {formData.maintenance && <p><span className="font-medium">Maintenance:</span> ₹{parseInt(formData.maintenance).toLocaleString()}</p>}
              {formData.securityDeposit && <p><span className="font-medium">Security:</span> ₹{parseInt(formData.securityDeposit).toLocaleString()}</p>}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Photos</h4>
            <p className="text-sm">{formData.photos.length} photos uploaded</p>
            <p className="text-sm text-gray-600">{formData.amenities.length} amenities selected</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-sm text-gray-600">{formData.description.substring(0, 100)}...</p>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> By submitting this listing, you agree to our terms and conditions. 
          Your property will be reviewed and published within 24 hours.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Property</h1>
            <p className="text-gray-600">Fill in the details to create your property listing</p>
          </div>
          
          {renderStepIndicator()}
          
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
            {renderCurrentStep()}
            
            {errors.submit && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{errors.submit}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                  step === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FaChevronLeft className="mr-2" />
                Previous
              </button>
              
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800"
              >
                {step === 5 ? 'Submit Property' : 'Next'}
                {step !== 5 && <FaChevronRight className="ml-2" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;
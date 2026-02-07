import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postPropertyAPI } from '../../api/property.api';
import { useAuth } from '../../context/AuthContext';

const PostPropertyForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    // Basic Details
    propertyTitle: '',
    propertyType: '',
    transactionType: '',
    category: '',
    bhkType: '',
    propertyAge: '',
    
    // Location
    city: '',
    locality: '',
    societyBuilding: '',
    fullAddress: '',
    landmark: '',
    pincode: '',
    
    // Size & Layout
    builtUpArea: '',
    carpetArea: '',
    floorNumber: '',
    totalFloors: '',
    facing: '',
    
    // Pricing
    expectedPrice: '',
    pricePerSqft: '',
    maintenanceCharges: '',
    bookingAmount: '',
    securityDeposit: '',
    negotiable: false,
    
    // Furnishing & Availability
    furnishingStatus: '',
    availableFrom: '',
    preferredTenants: '',
    ownershipType: '',
    
    // Amenities
    amenities: [],
    
    // Media
    propertyImages: [],
    floorPlan: null,
    video: null,
    
    // Legal & Notes
    reraNumber: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const propertyTypes = ['Apartment', 'Independent House', 'Villa', 'Penthouse', 'Studio Apartment', 'Builder Floor', 'Farm House'];
  const transactionTypes = ['Sell', 'Rent', 'Lease'];
  const categories = ['Residential', 'Commercial', 'Plot'];
  const bhkOptions = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+'];
  const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Fully-Furnished'];
  const tenantOptions = ['Family', 'Bachelor', 'Student', 'Any'];
  const ownershipOptions = ['Freehold', 'Leasehold', 'Co-operative Society', 'Others'];
  const directions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

  const amenitiesList = [
    'Lift', 'Parking', 'Power Backup', 'Security', 'Gym', 
    'Swimming Pool', 'Garden', 'Club House', 'CCTV', 'Water Supply',
    'Hospital', 'School', 'Shopping Mall', 'Restaurant', 'Bank'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      propertyImages: [...prev.propertyImages, ...files]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic Details Validation
    if (!formData.propertyTitle.trim()) newErrors.propertyTitle = 'Property title is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.transactionType) newErrors.transactionType = 'Transaction type is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.bhkType) newErrors.bhkType = 'BHK type is required';
    
    // Location Validation
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.locality.trim()) newErrors.locality = 'Locality is required';
    if (!formData.fullAddress.trim()) newErrors.fullAddress = 'Full address is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (formData.pincode && formData.pincode.length !== 6) newErrors.pincode = 'Pincode must be 6 digits';
    
    // Size & Layout Validation
    if (!formData.builtUpArea) newErrors.builtUpArea = 'Built-up area is required';
    if (!formData.floorNumber) newErrors.floorNumber = 'Floor number is required';
    if (!formData.totalFloors) newErrors.totalFloors = 'Total floors is required';
    
    // Pricing Validation
    if (!formData.expectedPrice) newErrors.expectedPrice = 'Expected price is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Prepare form data for API submission
      const submitData = {
        ...formData,
        userId: user.id,
        postedBy: user.name,
        postedByEmail: user.email,
        createdAt: new Date().toISOString(),
        status: 'pending' // Default status
      };
      
      // Submit to API
      const response = await postPropertyAPI(submitData);
      
      if (response.success) {
        // Redirect to success page
        navigate('/user/post-property/success');
      } else {
        alert('Failed to post property. Please try again.');
      }
    } catch (error) {
      console.error('Error posting property:', error);
      alert('Error posting property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-premium-onyx mb-4">Post Your Property</h1>
            <p className="text-xl text-premium-platinum max-w-2xl mx-auto">
              Reach verified buyers and get the best price for your property
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-premium-sapphire text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="ml-2 text-sm font-medium text-premium-onyx">Basic Details</span>
              </div>
              <div className="flex-1 h-1 bg-premium-platinum/30 mx-4"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-premium-platinum text-premium-onyx rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="ml-2 text-sm text-premium-platinum">Location</span>
              </div>
              <div className="flex-1 h-1 bg-premium-platinum/30 mx-4"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-premium-platinum text-premium-onyx rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="ml-2 text-sm text-premium-platinum">Pricing</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Basic Details Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Basic Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="propertyTitle"
                    value={formData.propertyTitle}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.propertyTitle ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                    placeholder="Enter property title"
                  />
                  {errors.propertyTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.propertyTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.propertyType ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                  >
                    <option value="">Select Property Type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.propertyType && (
                    <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Transaction Type *
                  </label>
                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.transactionType ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                  >
                    <option value="">Select Transaction Type</option>
                    {transactionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.transactionType && (
                    <p className="text-red-500 text-sm mt-1">{errors.transactionType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.category ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    BHK Type *
                  </label>
                  <select
                    name="bhkType"
                    value={formData.bhkType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.bhkType ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                  >
                    <option value="">Select BHK Type</option>
                    {bhkOptions.map(bhk => (
                      <option key={bhk} value={bhk}>{bhk}</option>
                    ))}
                  </select>
                  {errors.bhkType && (
                    <p className="text-red-500 text-sm mt-1">{errors.bhkType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Property Age
                  </label>
                  <input
                    type="text"
                    name="propertyAge"
                    value={formData.propertyAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="e.g., 2 years old"
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.city ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Locality *
                  </label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.locality ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                    placeholder="Enter locality"
                  />
                  {errors.locality && (
                    <p className="text-red-500 text-sm mt-1">{errors.locality}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Society/Building
                  </label>
                  <input
                    type="text"
                    name="societyBuilding"
                    value={formData.societyBuilding}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter society or building name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.pincode ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                    placeholder="Enter 6-digit pincode"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Full Address *
                  </label>
                  <textarea
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fullAddress ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                    placeholder="Enter complete address"
                  />
                  {errors.fullAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullAddress}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter nearby landmark"
                  />
                </div>
              </div>
            </div>

            {/* Size & Layout Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Size & Layout</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Built-up Area (sq ft) *
                  </label>
                  <input
                    type="number"
                    name="builtUpArea"
                    value={formData.builtUpArea}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.builtUpArea ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                    placeholder="Enter built-up area"
                  />
                  {errors.builtUpArea && (
                    <p className="text-red-500 text-sm mt-1">{errors.builtUpArea}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Carpet Area (sq ft)
                  </label>
                  <input
                    type="number"
                    name="carpetArea"
                    value={formData.carpetArea}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter carpet area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Floor Number *
                  </label>
                  <select
                    name="floorNumber"
                    value={formData.floorNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.floorNumber ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                  >
                    <option value="">Select Floor</option>
                    {[...Array(50)].map((_, i) => (
                      <option key={i} value={i === 0 ? 'Ground' : i}>{i === 0 ? 'Ground' : i}</option>
                    ))}
                  </select>
                  {errors.floorNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.floorNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Total Floors *
                  </label>
                  <select
                    name="totalFloors"
                    value={formData.totalFloors}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.totalFloors ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                  >
                    <option value="">Select Total Floors</option>
                    {[...Array(50)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  {errors.totalFloors && (
                    <p className="text-red-500 text-sm mt-1">{errors.totalFloors}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Facing
                  </label>
                  <select
                    name="facing"
                    value={formData.facing}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                  >
                    <option value="">Select Facing</option>
                    {directions.map(dir => (
                      <option key={dir} value={dir}>{dir}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Expected Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="expectedPrice"
                    value={formData.expectedPrice}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.expectedPrice ? 'border-red-500' : 'border-premium-platinum/30'
                    } focus:ring-2 focus:ring-premium-sapphire focus:border-transparent`}
                    placeholder="Enter expected price"
                  />
                  {errors.expectedPrice && (
                    <p className="text-red-500 text-sm mt-1">{errors.expectedPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Price per Sq Ft (₹)
                  </label>
                  <input
                    type="number"
                    name="pricePerSqft"
                    value={formData.pricePerSqft}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter price per sq ft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Maintenance Charges (₹)
                  </label>
                  <input
                    type="number"
                    name="maintenanceCharges"
                    value={formData.maintenanceCharges}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter maintenance charges"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Booking Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="bookingAmount"
                    value={formData.bookingAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter booking amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter security deposit"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="negotiable"
                      checked={formData.negotiable}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full relative transition-colors ${
                      formData.negotiable ? 'bg-premium-sapphire' : 'bg-premium-platinum/30'
                    }`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        formData.negotiable ? 'transform translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-premium-onyx">Price Negotiable</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Furnishing & Availability Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Furnishing & Availability</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Furnishing Status
                  </label>
                  <select
                    name="furnishingStatus"
                    value={formData.furnishingStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                  >
                    <option value="">Select Furnishing Status</option>
                    {furnishingOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Preferred Tenants
                  </label>
                  <select
                    name="preferredTenants"
                    value={formData.preferredTenants}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                  >
                    <option value="">Select Tenant Type</option>
                    {tenantOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Ownership Type
                  </label>
                  <select
                    name="ownershipType"
                    value={formData.ownershipType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                  >
                    <option value="">Select Ownership Type</option>
                    {ownershipOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Amenities</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {amenitiesList.map(amenity => (
                  <label key={amenity} className="flex items-center p-3 border border-premium-platinum/30 rounded-xl hover:border-premium-sapphire/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                      formData.amenities.includes(amenity) 
                        ? 'bg-premium-sapphire border-premium-sapphire text-white' 
                        : 'border-premium-platinum/50'
                    }`}>
                      {formData.amenities.includes(amenity) && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-premium-onyx">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Media</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Property Images (Multiple)
                  </label>
                  <div className="border-2 border-dashed border-premium-platinum/30 rounded-xl p-8 text-center hover:border-premium-sapphire/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="property-images"
                    />
                    <label htmlFor="property-images" className="cursor-pointer">
                      <div className="text-premium-sapphire mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-premium-onyx font-medium">Click to upload property images</p>
                      <p className="text-premium-platinum text-sm">Supports JPG, PNG, maximum 10MB each</p>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-premium-onyx mb-2">
                      Floor Plan (Optional)
                    </label>
                    <div className="border-2 border-dashed border-premium-platinum/30 rounded-xl p-8 text-center hover:border-premium-sapphire/50 transition-colors">
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id="floor-plan"
                      />
                      <label htmlFor="floor-plan" className="cursor-pointer">
                        <div className="text-premium-sapphire mb-2">
                          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-premium-onyx font-medium">Upload floor plan</p>
                        <p className="text-premium-platinum text-sm">PDF or Image format</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-premium-onyx mb-2">
                      Video (Optional)
                    </label>
                    <div className="border-2 border-dashed border-premium-platinum/30 rounded-xl p-8 text-center hover:border-premium-sapphire/50 transition-colors">
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        id="property-video"
                      />
                      <label htmlFor="property-video" className="cursor-pointer">
                        <div className="text-premium-sapphire mb-2">
                          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-premium-onyx font-medium">Upload property video</p>
                        <p className="text-premium-platinum text-sm">MP4, MOV, maximum 100MB</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Notes Section */}
            <div className="border-b border-premium-platinum/20 pb-10">
              <h2 className="text-2xl font-bold text-premium-onyx mb-6">Legal & Notes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    RERA Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="reraNumber"
                    value={formData.reraNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Enter RERA registration number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-premium-onyx mb-2">
                    Property Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                    placeholder="Describe your property, nearby facilities, special features, etc."
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-premium-ivory rounded-xl">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-premium-onyx">
                    I agree to the Terms and Conditions and confirm that all information provided is accurate and truthful.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Post Property'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostPropertyForm;
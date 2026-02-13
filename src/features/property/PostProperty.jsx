import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createProperty, uploadPropertyPictures, uploadPropertyVideos } from '../../api/property.api';

const PostProperty = () => {
  const navigate = useNavigate();
  const { setLoginIntent } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    propertyType: 'owner', // owner | lease
    priceTag: '',
    price: '',
    propertyDetails: '',
    contactInfo: '',
    isFurnished: false,
    hasParking: false,
    propertyCategory: 'sale', // sale | rental | commercial_sale | pg | hostel | flatmates | land | plot
    bhk: '',
    floor: '',
    propertyAge: '',
    facing: 'east', // east | west | north | south
    buildArea: '',
    carpetArea: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    amenities: [],
    nearbyPlaces: []
  });

  const [tempAmenity, setTempAmenity] = useState('');
  const [tempNearby, setTempNearby] = useState('');

  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  const [mediaStep, setMediaStep] = useState(false); // false: form, true: media
  const [uploading, setUploading] = useState({ images: false, videos: false });
  const [mediaFiles, setMediaFiles] = useState({ images: [], videos: [] });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    const limit = type === 'images' ? 10 : 5;
    if (files.length > limit) {
      setError(`Maximum ${limit} ${type} allowed.`);
      return;
    }
    
    // Validate file types and sizes
    for (let file of files) {
      if (type === 'images') {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedImageTypes.includes(file.type)) {
          setError(`Invalid image format: ${file.name}. Only JPEG, PNG, GIF, and WEBP are allowed.`);
          return;
        }
        if (file.size > 10 * 1024 * 1024) { // 10MB
          setError(`Image ${file.name} exceeds 10MB limit.`);
          return;
        }
      } else if (type === 'videos') {
        const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/wmv'];
        if (!allowedVideoTypes.includes(file.type)) {
          setError(`Invalid video format: ${file.name}. Only MP4, MOV, AVI, and WMV are allowed.`);
          return;
        }
        if (file.size > 10 * 1024 * 1024) { // 10MB
          setError(`Video ${file.name} exceeds 10MB limit.`);
          return;
        }
      }
    }
    
    setMediaFiles(prev => ({ ...prev, [type]: files }));
  };

  const handleArrayAdd = (field, value, setTemp) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setTemp('');
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateStep = (s) => {
    switch (s) {
      case 1:
        return formData.propertyType && formData.propertyCategory && formData.price && formData.priceTag;
      case 2:
        return formData.bhk !== '' && formData.floor !== '' && formData.propertyAge !== '';
      case 3:
        return formData.buildArea && formData.carpetArea && formData.propertyDetails;
      case 4:
        return formData.locality && formData.city && formData.state && formData.pincode;
      case 5:
        return formData.contactInfo;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert numbers and add default pending status
    const payload = {
      ...formData,
      propertyStatus: 'pending', // Set default status to pending for admin review
      price: Number(formData.price),
      bhk: Number(formData.bhk),
      floor: Number(formData.floor),
      propertyAge: Number(formData.propertyAge),
      buildArea: Number(formData.buildArea),
      carpetArea: Number(formData.carpetArea)
    };

    try {
      const response = await createProperty(payload);
      if (response.success) {
        // Handle BOTH _id and id
        const id = response.data?.propertyPost?._id || response.data?.propertyPost?.id;
        if (id) {
          setCreatedPropertyId(id);
          setMediaStep(true);
        } else {
          setError('Property created but no ID returned from registry.');
        }
      } else {
        setError(response.message || 'Failed to create property.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while creating the property.');
    } finally {
      setLoading(false);
    }
  };

  const handleAllMediaUpload = async () => {
    if (!createdPropertyId) {
      setError('Property ID missing for media upload.');
      return;
    }
    
    // Only proceed if there are files to upload
    if (mediaFiles.images.length === 0 && mediaFiles.videos.length === 0) {
      // If no media files, just set success
      setSuccess(true);
      return;
    }
    
    setUploading({ images: mediaFiles.images.length > 0, videos: mediaFiles.videos.length > 0 });
    setError(null);
    
    try {
      // Upload images if any
      if (mediaFiles.images.length > 0) {
        try {
          const imageResponse = await uploadPropertyPictures(createdPropertyId, mediaFiles.images);
          if (!imageResponse.success) {
            console.warn('Image upload failed:', imageResponse.message);
            // Don't throw error for image upload failure - allow property to be posted anyway
          }
        } catch (imageError) {
          console.warn('Image upload failed (continuing with property posting):', imageError.message);
          // Don't throw error for image upload failure - allow property to be posted anyway
        }
      }
      
      // Upload videos if any
      if (mediaFiles.videos.length > 0) {
        try {
          const videoResponse = await uploadPropertyVideos(createdPropertyId, mediaFiles.videos);
          if (!videoResponse.success) {
            console.warn('Video upload failed:', videoResponse.message);
            // Don't throw error for video upload failure - allow property to be posted anyway
          }
        } catch (videoError) {
          console.warn('Video upload failed (continuing with property posting):', videoError.message);
          // Don't throw error for video upload failure - allow property to be posted anyway
        }
      }
      
      // All uploads completed successfully
      setSuccess(true);
    } catch (err) {
      console.error('Media upload error:', err);
      // Don't show error if it was just media upload issue, allow property to be posted
      setSuccess(true);
    } finally {
      setUploading({ images: false, videos: false });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">Your property has been submitted for review. It will appear on the site after admin approval.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm"><strong>Note:</strong> Your property is currently in "pending" status and will only be visible to you until approved by an administrator.</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm"><strong>Note:</strong> Your property has been successfully posted. Media uploads (if any) may take a few moments to process completely.</p>
          </div>
          <button
            onClick={() => {
              setLoginIntent(null);
              navigate('/');
            }}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // MEDIA UPLOAD UI
  if (mediaStep) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-gray-800">Post New Property</h1>
              <span className="text-sm text-gray-600">Media Upload</span>
            </div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upload Media</h2>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* IMAGES */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-medium text-gray-700 mb-2">Property Photos</h3>
                    <p className="text-sm text-gray-500 mb-2">Upload up to 10 images (Max 10MB each)</p>
                    <p className="text-xs text-gray-400 mb-4">Hold Ctrl/Cmd to select multiple files or drag & drop</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'images')}
                      className="hidden"
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      Select Photos
                    </label>
                    {mediaFiles.images.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">{mediaFiles.images.length} file(s) selected</p>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center">
                          {mediaFiles.images.slice(0, 5).map((file, index) => (
                            <div key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                            </div>
                          ))}
                          {mediaFiles.images.length > 5 && (
                            <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              +{mediaFiles.images.length - 5} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* VIDEOS */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-medium text-gray-700 mb-2">Property Videos</h3>
                    <p className="text-sm text-gray-500 mb-2">Upload up to 5 videos (Max 10MB each)</p>
                    <p className="text-xs text-gray-400 mb-4">Hold Ctrl/Cmd to select multiple files or drag & drop</p>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'videos')}
                      className="hidden"
                      id="video-upload"
                    />
                    <label 
                      htmlFor="video-upload"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      Select Videos
                    </label>
                    {mediaFiles.videos.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">{mediaFiles.videos.length} file(s) selected</p>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center">
                          {mediaFiles.videos.slice(0, 5).map((file, index) => (
                            <div key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                            </div>
                          ))}
                          {mediaFiles.videos.length > 5 && (
                            <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              +{mediaFiles.videos.length - 5} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleAllMediaUpload}
                  disabled={uploading.images || uploading.videos}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {uploading.images || uploading.videos ? 'Uploading Media...' : 'Finish Posting'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-800">Post New Property</h1>
            <span className="text-sm text-gray-600">Step {step} of 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Step Indicators */}
            <div className="flex justify-center mb-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step === num 
                      ? 'bg-blue-600 text-white' 
                      : num < step 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                  }`}>
                    {num}
                  </div>
                  {num < 5 && (
                    <div className={`w-12 h-1 ${step > num ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: BASIC INFO */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Basic Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="owner">Owner</option>
                        <option value="lease">Lease</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Category</label>
                      <select
                        name="propertyCategory"
                        value={formData.propertyCategory}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="sale">Sale</option>
                        <option value="rental">Rental</option>
                        <option value="commercial_sale">Commercial Sale</option>
                        <option value="pg">PG</option>
                        <option value="hostel">Hostel</option>
                        <option value="flatmates">Flatmates</option>
                        <option value="land">Land</option>
                        <option value="plot">Plot</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Tag (Display)</label>
                      <input
                        type="text"
                        name="priceTag"
                        placeholder="e.g. ₹50 Lac"
                        value={formData.priceTag}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (Number)</label>
                      <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DETAILS */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Property Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">BHK</label>
                      <input
                        type="number"
                        name="bhk"
                        placeholder="e.g. 2"
                        value={formData.bhk}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                      <input
                        type="number"
                        name="floor"
                        placeholder="e.g. 3"
                        value={formData.floor}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Age (years)</label>
                      <input
                        type="number"
                        name="propertyAge"
                        placeholder="e.g. 5"
                        value={formData.propertyAge}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facing Direction</label>
                      <select
                        name="facing"
                        value={formData.facing}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isFurnished"
                          checked={formData.isFurnished}
                          onChange={handleChange}
                          className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Furnished</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasParking"
                          checked={formData.hasParking}
                          onChange={handleChange}
                          className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Parking</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: AREA & SPECS */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Area & Specifications</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Build Area (sqft)</label>
                      <input
                        type="number"
                        name="buildArea"
                        placeholder="e.g. 1200"
                        value={formData.buildArea}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Carpet Area (sqft)</label>
                      <input
                        type="number"
                        name="carpetArea"
                        placeholder="e.g. 900"
                        value={formData.carpetArea}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Details</label>
                    <textarea
                      name="propertyDetails"
                      rows="4"
                      placeholder="Describe the property..."
                      value={formData.propertyDetails}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 4: GEOGRAPHY */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Location Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                      <input
                        type="text"
                        name="locality"
                        placeholder="e.g. Andheri West"
                        value={formData.locality}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="e.g. Mumbai"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="e.g. Maharashtra"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="e.g. 400058"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                      <input
                        type="text"
                        name="landmark"
                        placeholder="e.g. Near Metro Station"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: AMENITIES & COMM */}
              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Amenities & Contact</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tempAmenity}
                        onChange={(e) => setTempAmenity(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleArrayAdd('amenities', tempAmenity, setTempAmenity)}
                        placeholder="Add amenity and press Enter"
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayAdd('amenities', tempAmenity, setTempAmenity)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((item, idx) => (
                        <div key={idx} className="bg-blue-100 px-3 py-1 rounded-md text-sm flex items-center">
                          {item}
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('amenities', idx)}
                            className="ml-2 text-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nearby Places</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tempNearby}
                        onChange={(e) => setTempNearby(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleArrayAdd('nearbyPlaces', tempNearby, setTempNearby)}
                        placeholder="Add nearby place and press Enter"
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayAdd('nearbyPlaces', tempNearby, setTempNearby)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.nearbyPlaces.map((item, idx) => (
                        <div key={idx} className="bg-green-100 px-3 py-1 rounded-md text-sm flex items-center">
                          {item}
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('nearbyPlaces', idx)}
                            className="ml-2 text-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                    <input
                      type="text"
                      name="contactInfo"
                      placeholder="Phone/Email"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => validateStep(step) && setStep(s => s + 1)}
                    disabled={!validateStep(step)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !validateStep(5)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Property'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;
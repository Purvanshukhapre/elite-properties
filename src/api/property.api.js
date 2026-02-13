import axiosInstance from './axiosInstance';

// Property API functions strictly matching backend spec
export const getAllProperties = async (params = {}) => {
  try {
    // Exclude pending properties from public listings by default, but allow override
    const queryParams = { ...params };
    // Only set default status to 'approved' if no propertyStatus is provided
    if (!queryParams.propertyStatus) {
      queryParams.propertyStatus = 'approved';
    }
    const response = await axiosInstance.get('/api/property/posts', { params: queryParams });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get properties error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get properties', error };
  }
};

export const getPropertyById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/property/posts/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get property by ID error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get property', error };
  }
};

export const getMyProperties = async () => {
  try {
    const response = await axiosInstance.get('/api/property/posts/user/my-posts');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get my properties error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get my properties', error };
  }
};

export const createProperty = async (propertyData) => {
  try {
    const response = await axiosInstance.post('/api/property/posts', propertyData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Create property error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to create property', error };
  }
};

export const updateProperty = async (id, propertyData) => {
  try {
    const response = await axiosInstance.put(`/api/property/posts/${id}`, propertyData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Update property error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to update property', error };
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/property/posts/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Delete property error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to delete property', error };
  }
};

export const uploadPropertyPictures = async (propertyId, pictures = []) => {
  try {
    // Validate pictures before upload
    if (!propertyId) {
      throw new Error('Property ID is required for picture upload');
    }
    
    if (!pictures || pictures.length === 0) {
      throw new Error('No pictures provided for upload');
    }

    // Check file sizes (backend allows max 10MB per image)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    for (let i = 0; i < pictures.length; i++) {
      const picture = pictures[i];
      if (picture.size > maxSize) {
        throw new Error(`Picture "${picture.name}" exceeds 10MB limit. Please compress the image.`);
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(picture.type)) {
        throw new Error(`Picture "${picture.name}" has unsupported format. Only JPEG, PNG, GIF, WEBP are allowed.`);
      }
    }

    const formData = new FormData();
    pictures.forEach((p) => formData.append('pictures', p));

    // Increase timeout for image uploads
    const response = await axiosInstance.post(`/api/property/upload/pictures/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000 // 2 minute timeout for image uploads
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Upload property pictures error:', error);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      return { 
        success: false, 
        message: 'Upload timed out. Image files are too large or network connection is slow. Please try compressing the images or try again later.' 
      };
    }
    
    if (error.response?.status === 500) {
      return { 
        success: false, 
        message: 'Server error during upload. The images might be too large or the server is temporarily unavailable. Please try again later or compress the images.' 
      };
    }
    
    return { 
      success: false, 
      message: error.response?.data?.message || error.message || 'Failed to upload pictures. Please check file size and format.' 
    };
  }
};

export const uploadPropertyVideos = async (propertyId, videos = []) => {
  try {
    // Validate videos before upload
    if (!propertyId) {
      throw new Error('Property ID is required for video upload');
    }
    
    if (!videos || videos.length === 0) {
      throw new Error('No videos provided for upload');
    }

    // Check file sizes (backend allows max 10MB per video)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      if (video.size > maxSize) {
        throw new Error(`Video "${video.name}" exceeds 10MB limit. Please compress or split the video.`);
      }
      
      // Check file type
      const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/wmv'];
      if (!allowedTypes.includes(video.type)) {
        throw new Error(`Video "${video.name}" has unsupported format. Only MP4, MOV, AVI, WMV are allowed.`);
      }
    }

    const formData = new FormData();
    videos.forEach((v) => formData.append('videos', v));

    // Increase timeout for video uploads
    const response = await axiosInstance.post(`/api/property/upload/videos/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 300000 // 5 minute timeout for video uploads (increased from 120s)
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Upload property videos error:', error);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      return { 
        success: false, 
        message: 'Upload timed out. Video file is too large or network connection is slow. Please try compressing the video or try again later.' 
      };
    }
    
    if (error.response?.status === 500) {
      return { 
        success: false, 
        message: 'Server error during upload. The video might be too large or the server is temporarily unavailable. Please try again later or compress the video.' 
      };
    }
    
    return { 
      success: false, 
      message: error.response?.data?.message || error.message || 'Failed to upload videos. Please check file size and format.' 
    };
  }
};

export const deletePropertyPicture = async (propertyId, pictureUrl) => {
  try {
    const response = await axiosInstance.delete(`/api/property/pictures/${propertyId}`, { data: { pictureUrl } });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Delete property picture error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to delete picture', error };
  }
};

export const deletePropertyVideo = async (propertyId, videoUrl) => {
  try {
    const response = await axiosInstance.delete(`/api/property/videos/${propertyId}`, { data: { videoUrl } });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Delete property video error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to delete video', error };
  }
};

// Property Statistics API function
export const getPropertyStats = async () => {
  try {
    const response = await axiosInstance.get('/api/property/stats');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get property stats error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get property stats', error };
  }
};

// User Viewed Properties API function
export const getUserViewedProperties = async () => {
  try {
    const response = await axiosInstance.get('/api/property/posts/viewed');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get user viewed properties error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get viewed properties', error };
  }
};

// Send Enquiry API function
export const sendEnquiry = async (enquiryData) => {
  try {
    const response = await axiosInstance.post('/api/enquiries/send', enquiryData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Send enquiry error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to send enquiry', error };
  }
};

// User Sent Enquiries API function
export const getSentEnquiries = async () => {
  try {
    const response = await axiosInstance.get('/api/enquiries/sent');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get sent enquiries error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get sent enquiries', error };
  }
};

// Property Owner Received Enquiries API function
export const getReceivedEnquiries = async () => {
  try {
    const response = await axiosInstance.get('/api/enquiries/received');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get received enquiries error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get received enquiries', error };
  }
};

// Saved Properties API functions
export const saveProperty = async (propertyId) => {
  try {
    const response = await axiosInstance.post(`/api/property/posts/${propertyId}/save`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Save property error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to save property', error };
  }
};

export const unsaveProperty = async (propertyId) => {
  try {
    const response = await axiosInstance.delete(`/api/property/posts/${propertyId}/unsave`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Unsave property error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to unsave property', error };
  }
};

export const getSavedProperties = async () => {
  try {
    const response = await axiosInstance.get('/api/property/posts/saved');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get saved properties error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get saved properties', error };
  }
};

const propertyAPI = {
  getAllProperties,
  getPropertyById,
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyPictures,
  uploadPropertyVideos,
  deletePropertyPicture,
  deletePropertyVideo,
  getPropertyStats,
  sendEnquiry,
  getUserViewedProperties,
  getSentEnquiries,
  saveProperty,
  unsaveProperty,
  getSavedProperties
};

export default propertyAPI;

// Also provide a named export for compatibility with other modules
export { propertyAPI };
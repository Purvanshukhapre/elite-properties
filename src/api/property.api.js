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
    const formData = new FormData();
    pictures.forEach((p) => formData.append('pictures', p));
    // Temporarily increase timeout for this request
    const response = await axiosInstance.post(`/api/property/upload/pictures/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000 // 60 second timeout for image uploads
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Upload property pictures error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to upload pictures', error };
  }
};

export const uploadPropertyVideos = async (propertyId, videos = []) => {
  try {
    const formData = new FormData();
    videos.forEach((v) => formData.append('videos', v));
    // Temporarily increase timeout for this request
    const response = await axiosInstance.post(`/api/property/upload/videos/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000 // 120 second timeout for video uploads
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Upload property videos error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to upload videos', error };
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
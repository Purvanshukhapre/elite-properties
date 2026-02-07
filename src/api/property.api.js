import axiosInstance from './axiosInstance';

// Property API functions strictly matching backend spec
export const getAllProperties = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/api/property/posts', { params });
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
    const response = await axiosInstance.post(`/api/property/upload/pictures/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
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
    const response = await axiosInstance.post(`/api/property/upload/videos/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
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
  deletePropertyVideo
};

export default propertyAPI;

// Also provide a named export for compatibility with other modules
export { propertyAPI };
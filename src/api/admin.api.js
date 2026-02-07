import axiosInstance from './axiosInstance';

// Admin API functions — using exact /api paths per backend spec
export const adminLoginAPI = async (credentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Admin login error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Admin login failed',
      error
    };
  }
};

export const getAdminDashboardStatsAPI = async () => {
  try {
    const response = await axiosInstance.get('/api/admin/stats');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get admin stats error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get stats', error };
  }
};

export const getAdminPropertiesAPI = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/api/admin/properties', { params });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get admin properties error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get properties', error };
  }
};

export const updatePropertyStatusAPI = async (propertyId, propertyStatus) => {
  try {
    const response = await axiosInstance.put(`/api/admin/properties/${propertyId}/status`, { propertyStatus });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Update property status error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to update property status', error };
  }
};

export const deleteAdminPropertyAPI = async (propertyId) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/properties/${propertyId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Delete admin property error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to delete property', error };
  }
};

export const getAdminUsersAPI = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/api/admin/users', { params });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get admin users error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get users', error };
  }
};

export const getAdminUserByIdAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/admin/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get admin user error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get user', error };
  }
};

export const deleteAdminUserAPI = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Delete admin user error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to delete user', error };
  }
};

// Backward-compatible export
export const adminAPI = {
  login: adminLoginAPI,
  getDashboardStats: getAdminDashboardStatsAPI,
  getProperties: getAdminPropertiesAPI,
  updatePropertyStatus: updatePropertyStatusAPI,
  deleteProperty: deleteAdminPropertyAPI,
  getUsers: getAdminUsersAPI,
  getUserById: getAdminUserByIdAPI,
  deleteUser: deleteAdminUserAPI
};
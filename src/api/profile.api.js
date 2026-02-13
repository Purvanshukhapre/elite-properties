import axiosInstance from './axiosInstance';

// Profile API functions
export const getProfileAPI = async () => {
  try {
    const response = await axiosInstance.get('/api/profile');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Get profile error:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to get profile', error };
  }
};

export const updateProfileAPI = async (profileData) => {
  try {
    const response = await axiosInstance.put('/api/profile', profileData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile',
      error: error
    };
  }
};

// Existing profileAPI object
export const profileAPI = {
  // Get user profile (uses same fallback logic as getProfileAPI)
  getProfile: getProfileAPI,
  
  // Update user profile — keep primary update path but also try common alternatives when used directly
  updateProfile: (profileData) => axiosInstance.put('/api/profile', profileData),
};

export default profileAPI;